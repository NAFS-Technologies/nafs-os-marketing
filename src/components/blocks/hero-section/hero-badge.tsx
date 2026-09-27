'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'

const badges = [
  {
    words: '10,000+ happy clients',
    color: 'bg-yellow-500'
  },
  {
    words: '98% Customer Satisfaction',
    color: 'bg-sky-500'
  },
  {
    words: '100,000+ Expenses Tracked',
    color: 'bg-red-500'
  },
  {
    words: '500,000+ Transactions Secured',
    color: 'bg-green-500'
  }
]

const HeroBadge = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % badges.length)
    }, 3600)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <motion.span
      layout
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, layout: { duration: 0.3 } }}
      className='flex items-center gap-2 px-2 py-0.5'
    >
      <span className={cn('size-2.5 rounded-xs', badges[currentIndex].color)} />
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentIndex}
          layout
          initial='hidden'
          animate='show'
          exit='exit'
          variants={{
            hidden: { opacity: 1 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.03
              }
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.3 }
            }
          }}
          transition={{ layout: { duration: 0.3 } }}
          className='inline-flex text-sm'
        >
          {badges[currentIndex].words.split('').map((char, i) => (
            <motion.span
              key={i}
              layout
              variants={{
                hidden: { opacity: 0, filter: 'blur(10px)', width: 0 },
                show: {
                  opacity: 1,
                  filter: 'blur(0px)',
                  width: 'auto',
                  transition: {
                    duration: 0.3,
                    width: { duration: 0.3 }
                  }
                },
                exit: {
                  opacity: 0,
                  filter: 'blur(10px)',
                  width: 0,
                  transition: {
                    duration: 0.3,
                    width: { duration: 0.3 }
                  }
                }
              }}
              className={cn('inline-block overflow-hidden', char === ' ' && 'w-[0.25em]')}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

export default HeroBadge
