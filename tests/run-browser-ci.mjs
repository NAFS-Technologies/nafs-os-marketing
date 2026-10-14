import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { cp, mkdir, writeFile } from 'node:fs/promises'

const port = Number(process.env.SITE_TEST_PORT ?? 3100)
const baseUrl = `http://127.0.0.1:${port}`
const received = new Set()

const sink = createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/stats') {
    response.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ count: received.size }))

    return
  }

  let raw = ''

  for await (const chunk of request) {
    raw += chunk

    if (raw.length > 20_000) {
      response.writeHead(413).end()

      return
    }
  }

  try {
    const lead = JSON.parse(raw)

    if (lead.businessName === 'Webhook failure fixture') {
      response.writeHead(500).end('Synthetic receiver failure')

      return
    }

    if (request.headers['idempotency-key'] !== lead.requestId) {
      response.writeHead(400).end('Missing retry identity')

      return
    }

    received.add(lead.requestId)
    response.writeHead(204).end()
  } catch {
    response.writeHead(400).end()
  }
})

await cp('.next/static', '.next/standalone/.next/static', { recursive: true })
await cp('public', '.next/standalone/public', { recursive: true })
await cp('src/content/blog', '.next/standalone/src/content/blog', { recursive: true })
sink.listen(0, '127.0.0.1')
await once(sink, 'listening')

const sinkUrl = `http://127.0.0.1:${sink.address().port}`
const environment = { ...process.env, HOSTNAME: '127.0.0.1', PORT: String(port), SITE_BASE_URL: baseUrl, TEST_LEAD_SINK_URL: sinkUrl, NAFS_LEAD_WEBHOOK_URL: `${sinkUrl}/lead`, NAFS_LEAD_WEBHOOK_TOKEN: '', NEXT_TELEMETRY_DISABLED: '1' }
const server = spawn(process.execPath, ['.next/standalone/server.js'], { env: environment, stdio: ['ignore', 'pipe', 'pipe'] })
const output = []

server.stdout.on('data', data => { output.push(data.toString()); process.stdout.write(data) })
server.stderr.on('data', data => { output.push(data.toString()); process.stderr.write(data) })

async function run(file) {
  const child = spawn(process.execPath, [file], { env: environment, stdio: 'inherit' })
  const [code] = await once(child, 'exit')

  if (code !== 0) throw new Error(`${file} failed with exit ${code}`)
}

try {
  let ready = false

  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (server.exitCode !== null) throw new Error('Next.js exited before readiness')

    try {
      ready = (await fetch(baseUrl)).ok
    } catch {
      ready = false
    }

    if (ready) break
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  if (!ready) throw new Error('Next.js did not become ready')

  const failures = []

  for (const file of ['tests/site-interactions.mjs', 'tests/experience-acceptance.mjs', 'tests/mobile-browser-acceptance.mjs']) {
    try {
      await run(file)
    } catch (error) {
      failures.push(String(error))
    }
  }

  if (failures.length) throw new Error(failures.join('\n'))
} finally {
  server.kill('SIGTERM')
  sink.closeAllConnections()
  sink.close()
  await mkdir('test-results', { recursive: true })
  await writeFile('test-results/next-server.log', output.join(''))
}
