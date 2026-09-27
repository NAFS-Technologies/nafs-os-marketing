'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function EventTicker({ events }: { events: readonly { name: string; meta: string; status: string }[] }) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || isPaused) return

    const timer = window.setInterval(() => setActive(value => (value + 1) % events.length), 2600)

    return () => window.clearInterval(timer)
  }, [events.length, isPaused, reduceMotion])

  const event = events[active]

  return (
    <div
      role='region'
      aria-label='Live NAFS activity'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={blurEvent => {
        if (!blurEvent.currentTarget.contains(blurEvent.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
      className='overflow-hidden rounded-[22px] border border-[#e3e3df] bg-white shadow-[0_24px_80px_rgba(20,20,20,.055)] sm:rounded-[26px]'
    >
      <div className='flex flex-col justify-between gap-2 border-b border-[#ecece8] px-5 py-4 sm:flex-row sm:items-center sm:px-7'>
        <div className='flex items-center gap-3'>
          <span className='size-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,.08)]' />
          <span className='text-sm font-semibold text-[#333]'>Live activity</span>
        </div>
        <span className='break-words text-sm text-[#8f8f8a]'>Northstar Retail · Order #10482</span>
      </div>

      <div className='grid lg:grid-cols-[1.25fr_.75fr]'>
        <div className='border-b border-[#ecece8] p-5 sm:p-7 lg:border-b-0 lg:border-r'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
              aria-live='polite'
              aria-atomic='true'
            >
              <p className='font-mono text-[11px] font-semibold text-violet-700 sm:text-[12px]'>{event.name}</p>
              <h3 className='mt-4 text-3xl font-medium tracking-[-0.04em] text-[#171717] sm:text-4xl'>{event.status}</h3>
              <div className='mt-6 rounded-2xl border border-[#eeeeea] bg-[#fafaf8] p-5'>
                <p className='text-sm font-semibold text-[#333]'>What NAFS recorded</p>
                <p className='mt-3 break-words text-base leading-7 text-[#62625d]'>{event.meta}</p>
              </div>
              <div className='mt-6 grid gap-3 sm:grid-cols-3'>
                {[
                  ['Business', 'Northstar Retail'],
                  ['Step', `${active + 1} of ${events.length}`],
                  ['Reference', '#10482']
                ].map(([label, value]) => (
                  <div key={label} className='rounded-xl border border-[#ecece8] bg-white p-4'>
                    <p className='text-xs font-medium uppercase tracking-[.08em] text-[#aaa]'>{label}</p>
                    <p className='mt-2 text-sm font-semibold text-[#333]'>{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='bg-[#fafaf8] p-5 sm:p-7'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-sm font-semibold text-[#333]'>What happens next</p>
            <span className='text-xs font-medium text-[#999994]'>{isPaused ? 'Paused' : 'Live'}</span>
          </div>
          <div className='mt-5 space-y-3'>
            {events.map((item, index) => (
              <button
                key={item.name}
                type='button'
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={index === active ? 'w-full rounded-2xl border border-[#111] bg-[#111] p-4 text-left text-white shadow-[0_10px_26px_rgba(0,0,0,.12)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2' : 'w-full rounded-2xl border border-[#e5e5e1] bg-white p-4 text-left transition duration-200 hover:-translate-y-px hover:border-[#cfcfca] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 focus-visible:ring-offset-2'}
              >
                <div className='flex items-center justify-between gap-3'>
                  <span className={index === active ? 'min-w-0 truncate font-mono text-[11px] text-violet-300' : 'min-w-0 truncate font-mono text-[11px] text-violet-700'}>{item.name}</span>
                  <span className={index === active ? 'shrink-0 text-xs font-semibold text-white/58' : 'shrink-0 text-xs font-semibold text-[#888883]'}>0{index + 1}</span>
                </div>
                <p className={index === active ? 'mt-2 text-sm font-semibold text-white' : 'mt-2 text-sm font-semibold text-[#333]'}>{item.status}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
