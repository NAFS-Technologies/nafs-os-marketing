'use client'

import type { ReactNode } from 'react'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export function PageReveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('motion-reduce:opacity-100! motion-reduce:transform-none!', className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -48px' }}
      transition={{
        duration: 0.56,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
