'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'

import { CheckCircle2Icon, LoaderCircleIcon } from 'lucide-react'

type FieldName = 'name' | 'businessName' | 'email' | 'phone' | 'monthlyOrders' | 'interest' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>
type SubmissionState = { status: 'idle' | 'submitting' | 'success' | 'error'; message: string }

const fieldNames: FieldName[] = ['name', 'businessName', 'email', 'phone', 'monthlyOrders', 'interest', 'message']
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@nafsos.com'
const fieldLabelClassName = 'block min-w-0 pt-5 text-sm font-semibold text-[#555551]'
const inputClassName = 'mt-2 h-12 w-full min-w-0 rounded-xl border border-[#dcdcd8] bg-white px-4 text-base text-[#171717] shadow-[0_1px_0_rgba(20,20,20,.02)] outline-none transition placeholder:text-[#aaa] focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 aria-invalid:border-rose-500 aria-invalid:focus:ring-rose-500/10'
const textareaClassName = 'mt-2 min-h-36 w-full resize-y rounded-xl border border-[#dcdcd8] bg-white px-4 py-3 text-base leading-7 text-[#171717] shadow-[0_1px_0_rgba(20,20,20,.02)] outline-none transition placeholder:text-[#aaa] focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 aria-invalid:border-rose-500'

const textFields = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', placeholder: 'Name', maxLength: 100 },
  { name: 'businessName', label: 'Business name', type: 'text', autoComplete: 'organization', placeholder: 'Company or brand', maxLength: 120 },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com', maxLength: 160 },
  { name: 'phone', label: 'Phone or WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: '+880 1XXXXXXXXX', maxLength: 30 }
] as const

export const DemoRequestForm = () => {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const activeRequestRef = useRef<AbortController | null>(null)
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})

  useEffect(() => () => {
    activeRequestRef.current?.abort()
    activeRequestRef.current = null
  }, [])

  useEffect(() => {
    if (submission.status !== 'error' && submission.status !== 'success') return

    const firstError = fieldNames.find(name => errors[name])
    const field = firstError ? formRef.current?.elements.namedItem(firstError) : null

    if (field instanceof HTMLElement) field.focus()
    else statusRef.current?.focus()
  }, [submission.status, errors])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Guard the same tick as the click; disabled state alone cannot prevent rapid duplicate submissions.
    if (activeRequestRef.current || submission.status === 'success') return

    const form = event.currentTarget
    const formData = new FormData(form)
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)

    activeRequestRef.current = controller
    setErrors({})
    setSubmission({ status: 'submitting', message: 'Sending your request…' })

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        signal: controller.signal
      })

      const payload: unknown = await response.json().catch(() => null)

      if (activeRequestRef.current !== controller) return

      const result = payload && typeof payload === 'object' ? payload as Record<string, unknown> : null
      const message = typeof result?.message === 'string' ? result.message : ''

      if (!response.ok || result?.accepted !== true) {
        const fieldErrors: FieldErrors = {}

        if (response.status === 400 && result?.errors && typeof result.errors === 'object') {
          const returnedErrors = result.errors as Record<string, unknown>

          for (const name of fieldNames) {
            if (typeof returnedErrors[name] === 'string') fieldErrors[name] = returnedErrors[name]
          }
        }

        setErrors(fieldErrors)
        setSubmission({ status: 'error', message: (!response.ok && message) || 'We could not confirm delivery. Please email us before sending again.' })

        return
      }

      form.reset()
      setSubmission({ status: 'success', message: message || 'Thanks. Your walkthrough request has been received.' })
    } catch {
      if (activeRequestRef.current !== controller) return
      setSubmission({ status: 'error', message: 'We could not confirm delivery. Your details are still here. Please email us before sending again.' })
    } finally {
      window.clearTimeout(timeout)
      if (activeRequestRef.current === controller) activeRequestRef.current = null
    }
  }

  const isSubmitting = submission.status === 'submitting'

  const fieldProps = (name: FieldName) => ({
    id: `${id}-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined
  })

  const fieldError = (name: FieldName) => errors[name] ? (
    <span id={`${id}-${name}-error`} className='mt-2 block text-sm font-medium text-rose-700'>{errors[name]}</span>
  ) : null

  return (
    <form ref={formRef} onSubmit={handleSubmit} aria-busy={isSubmitting} aria-labelledby={`${id}-title`} className='rounded-[24px] border border-[#e1e1dd] bg-white p-5 text-[#171717] shadow-[0_28px_90px_rgba(20,20,20,.065)] sm:rounded-[28px] sm:p-8'>
      <div className='border-b border-[#ecece8] pb-6'>
        <p className='text-xs font-semibold uppercase tracking-[.1em] text-violet-700'>Product walkthrough</p>
        <h3 id={`${id}-title`} className='mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#171717]'>{submission.status === 'success' ? 'Your walkthrough request is received.' : 'Tell us what is hardest to run today.'}</h3>
        <p className='mt-3 text-sm leading-6 text-[#676762]'>{submission.status === 'success' ? 'We will follow up using the contact details you provided.' : 'All fields are required except the additional details.'}</p>
      </div>

      <fieldset hidden={submission.status === 'success'} disabled={isSubmitting || submission.status === 'success'} className='min-w-0 border-0 p-0 disabled:opacity-70'>
        <legend className='sr-only'>Your business and walkthrough requirements</legend>
        <div className='grid gap-x-5 sm:grid-cols-2'>
          {textFields.map(({ name, label, ...input }) => (
            <label key={name} htmlFor={`${id}-${name}`} className={fieldLabelClassName}>
              <span>{label}</span>
              <input {...input} {...fieldProps(name)} className={inputClassName} name={name} inputMode={name === 'phone' ? 'tel' : name === 'email' ? 'email' : undefined} required />
              {fieldError(name)}
            </label>
          ))}
          <label htmlFor={`${id}-monthlyOrders`} className={fieldLabelClassName}>
            <span>Monthly orders</span>
            <select {...fieldProps('monthlyOrders')} className={inputClassName} name='monthlyOrders' defaultValue='' required>
              <option value='' disabled>Select a range</option>
              <option value='under-500'>Under 500</option>
              <option value='500-2000'>500–2,000</option>
              <option value='2000-5000'>2,000–5,000</option>
              <option value='5000-15000'>5,000–15,000</option>
              <option value='15000-plus'>15,000+</option>
            </select>
            {fieldError('monthlyOrders')}
          </label>
          <label htmlFor={`${id}-interest`} className={fieldLabelClassName}>
            <span>What would you most like to fix?</span>
            <select {...fieldProps('interest')} className={inputClassName} name='interest' defaultValue='' required>
              <option value='' disabled>Choose the closest problem</option>
              <option value='orders-delivery'>Orders get stuck between teams</option>
              <option value='stock-accuracy'>We do not trust our stock numbers</option>
              <option value='cod-payments'>COD and payment matching takes too much work</option>
              <option value='purchasing'>We buy inventory too late or without enough information</option>
              <option value='reporting'>Management cannot get a current answer quickly</option>
              <option value='staff-process'>Too much depends on specific staff knowing the process</option>
              <option value='multiple-problems'>Several of these are connected</option>
            </select>
            {fieldError('interest')}
          </label>
        </div>

        <label htmlFor={`${id}-message`} className={fieldLabelClassName}>
          <span>What happens today when this problem occurs? <span className='font-normal'>(optional)</span></span>
          <textarea {...fieldProps('message')} className={textareaClassName} name='message' placeholder='Tell us where the work slows down, gets repeated or becomes unclear.' maxLength={1500} />
          {fieldError('message')}
        </label>

        <div className='hidden' aria-hidden='true'>
          <label>Company website<input type='text' name='companyWebsite' tabIndex={-1} autoComplete='off' /></label>
        </div>
      </fieldset>

      <div className='mt-7 flex flex-col gap-4 border-t border-[#ecece8] pt-6 sm:flex-row sm:items-center sm:justify-between'>
        <p className='max-w-sm text-sm leading-6 text-[#676762]'>We use these details only to prepare a walkthrough that fits your business.</p>
        <button type='submit' disabled={isSubmitting || submission.status === 'success'} className='inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,.12)] transition duration-200 hover:-translate-y-px hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto'>
          {isSubmitting ? <><LoaderCircleIcon aria-hidden='true' className='size-4 animate-spin motion-reduce:animate-none' /> Sending</> : submission.status === 'success' ? <><CheckCircle2Icon aria-hidden='true' className='size-4' /> Request received</> : 'Plan my walkthrough →'}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} className='mt-4 min-h-6 rounded-lg text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55' role='status' aria-live='polite' aria-atomic='true'>
        {submission.message ? <p className={submission.status === 'error' ? 'text-rose-700' : submission.status === 'success' ? 'text-emerald-700' : 'text-[#676762]'}>{submission.message}</p> : null}
      </div>
      <p className='mt-3 text-sm leading-6 text-[#676762]'>Prefer email? <a href={`mailto:${contactEmail}`} className='break-all rounded-sm font-semibold text-violet-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55'>{contactEmail}</a></p>
    </form>
  )
}
