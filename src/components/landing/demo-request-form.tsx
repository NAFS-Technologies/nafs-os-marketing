'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { CheckCircle2Icon, LoaderCircleIcon } from 'lucide-react'

import { currentCampaignContext, emitMarketingEvent } from '@/lib/marketing-telemetry'
import { siteConfig } from '@/lib/site-config'

import '@/app/marketing-forms.css'

type FieldName = 'name' | 'businessName' | 'email' | 'phone' | 'monthlyOrders' | 'interest' | 'message'
type Submission = { status: 'idle' | 'submitting' | 'success' | 'error'; message: string }

const fields: FieldName[] = ['name', 'businessName', 'email', 'phone', 'monthlyOrders', 'interest', 'message']

const textFields = [
  { name: 'name' as const, label: 'Your name', type: 'text', autoComplete: 'name', maxLength: 100 },
  { name: 'businessName' as const, label: 'Business name', type: 'text', autoComplete: 'organization', maxLength: 120 },
  { name: 'email' as const, label: 'Work email', type: 'email', autoComplete: 'email', maxLength: 160 },
  { name: 'phone' as const, label: 'Phone or WhatsApp', type: 'tel', autoComplete: 'tel', maxLength: 30 }
]

export function DemoRequestForm() {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const activeRequest = useRef<AbortController | null>(null)
  const started = useRef(false)
  const requestIdentity = useRef<{ fingerprint: string; id: string } | null>(null)
  const [submission, setSubmission] = useState<Submission>({ status: 'idle', message: '' })
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const pending = submission.status === 'submitting'
  const completed = submission.status === 'success'

  useEffect(() => () => {
    activeRequest.current?.abort()
    activeRequest.current = null
  }, [])

  useEffect(() => {
    const first = fields.find(name => errors[name])
    const input = first ? formRef.current?.elements.namedItem(first) : null

    if (input instanceof HTMLElement) input.focus()
    else if (submission.status === 'success' || submission.status === 'error') statusRef.current?.focus()
  }, [errors, submission.status])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (activeRequest.current || completed) return

    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    const fingerprint = JSON.stringify(values)
    const identity = requestIdentity.current?.fingerprint === fingerprint ? requestIdentity.current : { fingerprint, id: crypto.randomUUID() }
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 12_000)

    requestIdentity.current = identity
    activeRequest.current = controller
    setErrors({})
    setSubmission({ status: 'submitting', message: 'Sending your request…' })

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, requestId: identity.id, attribution: currentCampaignContext() }),
        signal: controller.signal
      })

      const payload: unknown = await response.json().catch(() => null)

      if (activeRequest.current !== controller) return

      const result = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {}

      if (response.status !== 202 || result.accepted !== true) {
        const nextErrors: Partial<Record<FieldName, string>> = {}

        if (result.errors && typeof result.errors === 'object') {
          const returned = result.errors as Record<string, unknown>

          for (const name of fields) {
            if (typeof returned[name] === 'string') nextErrors[name] = returned[name].slice(0, 200)
          }
        }

        setErrors(nextErrors)
        setSubmission({ status: 'error', message: typeof result.message === 'string' ? result.message.slice(0, 300) : 'We could not confirm delivery. Your details are kept below. Please contact us by email before trying again.' })

        return
      }

      form.reset()
      setSubmission({ status: 'success', message: 'Your request was delivered. We will contact you to arrange a walkthrough. No meeting has been booked automatically.' })
      emitMarketingEvent('lead_submit_success', 'walkthrough')
    } catch {
      if (activeRequest.current === controller) setSubmission({ status: 'error', message: 'We could not confirm delivery. Your details are kept below. Please contact us by email before trying again.' })
    } finally {
      window.clearTimeout(timer)

      if (activeRequest.current === controller) activeRequest.current = null
    }
  }

  const fieldProps = (name: FieldName) => ({ id: `${id}-${name}`, 'aria-invalid': errors[name] ? true as const : undefined, 'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined })
  const errorFor = (name: FieldName) => errors[name] ? <span className='m-field-error' id={`${id}-${name}-error`}>{errors[name]}</span> : null

  return (
    <form ref={formRef} method='post' action='/api/demo-request' className='m-lead-form' aria-labelledby={`${id}-title`} aria-busy={pending} onSubmit={handleSubmit} onFocusCapture={() => {
      if (!started.current) {
        started.current = true
        emitMarketingEvent('lead_started', 'walkthrough')
      }
    }}>
      <span className='m-eyebrow'>Book a walkthrough</span><h3 id={`${id}-title`}>Let’s understand your operation.</h3><p className='m-form-intro'>A little context helps us show the parts that matter to you.</p>
      <fieldset disabled={pending || completed}><legend className='sr-only'>Your contact and business details</legend><div className='m-form-grid'>{textFields.map(field => <label key={field.name} htmlFor={`${id}-${field.name}`}>{field.label}<input {...fieldProps(field.name)} name={field.name} type={field.type} autoComplete={field.autoComplete} maxLength={field.maxLength} required className='text-base' />{errorFor(field.name)}</label>)}</div>
        <label htmlFor={`${id}-monthlyOrders`}>Approximate monthly orders<select {...fieldProps('monthlyOrders')} name='monthlyOrders' required defaultValue=''>
          <option value='' disabled>Select an order range</option><option value='under-500'>Under 500</option><option value='500-2000'>500–2,000</option><option value='2000-5000'>2,000–5,000</option><option value='5000-15000'>5,000–15,000</option><option value='15000-plus'>15,000+</option>
        </select>{errorFor('monthlyOrders')}</label>
        <label htmlFor={`${id}-interest`}>What would you most like to fix?<select {...fieldProps('interest')} name='interest' required defaultValue=''>
          <option value='' disabled>Choose the closest need</option><option value='orders-delivery'>Orders, warehouse work or delivery</option><option value='stock-accuracy'>Stock accuracy and inventory</option><option value='cod-payments'>Payments and COD settlements</option><option value='purchasing'>Purchasing and replenishment</option><option value='reporting'>Reporting and management visibility</option><option value='staff-process'>Team access and operating process</option><option value='multiple-problems'>Several connected workflows</option><option value='b2b'>A B2B offering for client businesses</option><option value='partners'>A partnership with NAFS</option>
        </select>{errorFor('interest')}</label>
        <label htmlFor={`${id}-message`}>Anything else we should know? <span className='m-field-optional'>Optional</span><textarea {...fieldProps('message')} name='message' rows={4} maxLength={1500} placeholder='Your current tools, the difficult handoff, or the workflow you want to discuss.' />{errorFor('message')}</label>
        <div hidden aria-hidden='true'><label htmlFor={`${id}-website`}>Leave this field empty<input id={`${id}-website`} name='companyWebsite' autoComplete='off' tabIndex={-1} /></label></div>
      </fieldset>
      <p className='m-form-disclosure'>We use these details to respond to this inquiry through our configured lead-delivery service. Do not include passwords, customer records or other sensitive data. Optional campaign labels are included only with analytics consent.</p>
      <button type='submit' className='m-button m-submit' disabled={pending || completed}>{pending ? <><LoaderCircleIcon size={18} aria-hidden='true' className='animate-spin motion-reduce:animate-none' />Sending</> : completed ? <><CheckCircle2Icon size={18} aria-hidden='true' />Request received</> : 'Plan my walkthrough'}</button>
      <div ref={statusRef} className='m-form-status' tabIndex={-1} role='status' aria-live='polite' aria-atomic='true' data-state={submission.status}>{submission.message}</div>
      <p className='m-form-fallback'>Prefer email? <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
      <noscript><p>Please email {siteConfig.contactEmail}. Online submission requires JavaScript.</p></noscript>
    </form>
  )
}
