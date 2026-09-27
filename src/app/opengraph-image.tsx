import { ImageResponse } from 'next/og'

export const alt = 'NAFS — Everything behind modern commerce'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const stack = ['PostgreSQL', 'Nango', 'Flexprice', 'Cloudflare']

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '54px 62px', background: '#fafaf8', color: '#111111', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ display: 'flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', background: '#111111', color: '#ffffff', fontSize: 15, fontWeight: 700 }}>N</div><span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.04em' }}>NAFS</span></div>
        <span style={{ fontSize: 12, color: '#8b8b86' }}>Commerce operating system</span>
      </div>

      <div style={{ marginTop: 52, display: 'flex', gap: 48, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', width: '60%', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, lineHeight: .94, letterSpacing: '-0.065em', fontWeight: 650 }}><span>Everything behind</span><span>modern commerce.</span></div>
          <p style={{ marginTop: 24, maxWidth: 640, color: '#73736f', fontSize: 18, lineHeight: 1.5 }}>Run commerce, connect your tools, automate work and build new revenue on one platform.</p>
        </div>
        <div style={{ display: 'flex', width: '40%', flexDirection: 'column', borderTop: '1px solid #dededb' }}>
          {[['900+', 'apps and APIs supported through Nango'], ['B2B', 'launch under your brand'], ['PARTNERS', 'referrals, services and commissions']].map(([value, label]) => <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e8e4', padding: '15px 0' }}><span style={{ fontSize: 23, fontWeight: 650, letterSpacing: '-.04em' }}>{value}</span><span style={{ maxWidth: 170, textAlign: 'right', color: '#8b8b86', fontSize: 10, lineHeight: 1.45 }}>{label}</span></div>)}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #dededb', paddingTop: 18 }}>
        <span style={{ marginRight: 8, color: '#aaa', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.14em' }}>built on</span>
        {stack.map(name => <span key={name} style={{ display: 'flex', border: '1px solid #e2e2de', padding: '8px 12px', color: '#555551', fontSize: 10 }}>{name}</span>)}
      </div>
    </div>,
    size
  )
}
