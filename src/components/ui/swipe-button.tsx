'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface SwipeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

function PrimarySwipeButton({ children, asChild = false, className, ...props }: SwipeButtonProps) {
  return (
    <Button
      asChild={asChild}
      className={cn(
        'ring-primary/60 [a]:hover:bg-primary relative h-10 overflow-hidden rounded-full border-0 px-6 text-base shadow-[inset_0_-3px_6px_0px_rgba(255,255,255,0.90)] ring-2 duration-500 text-shadow-xs hover:shadow-[inset_0_-3px_6px_-2px_rgba(255,255,255,0.90)] active:translate-y-0 dark:shadow-[inset_0_-3px_6px_0px_rgba(0,0,0,0.60)] dark:hover:shadow-[inset_0_-3px_6px_-2px_rgba(0,0,0,0.60)]',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

function SecondarySwipeButton({ children, asChild = false, className, ...props }: SwipeButtonProps) {
  return (
    <Button
      asChild={asChild}
      className={cn(
        'bg-primary/10 ring-primary/70 hover:bg-primary/10 [a]:hover:bg-primary/10 text-primary relative h-10 overflow-hidden rounded-full border-0 px-6 text-base shadow-[inset_0_-3px_6px_0px_rgba(30,184,206,0.30)] ring-2 duration-500 hover:shadow-[inset_0_-3px_6px_-2px_rgba(30,184,206,0.10)]',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export { PrimarySwipeButton, SecondarySwipeButton, type SwipeButtonProps }
