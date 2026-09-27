'use client'

import Link from 'next/link'

import { ChevronRightIcon, ChevronUpIcon } from 'lucide-react'

import { PrimarySwipeButton, SecondarySwipeButton } from '@/components/ui/swipe-button'
import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

import HeroBadge from '@/components/blocks/hero-section/hero-badge'

import InfoIcon from '@/assets/svg/info-icon'
import StarBadge from '@/assets/svg/star-badge'

const HeroSection = () => {
  return (
    <section className='relative -mt-20 overflow-hidden bg-[url(/images/bg-pattern.webp)] pt-28 sm:pt-36 lg:pt-44'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'>
        {/* Hero Content */}
        <div className='flex flex-col items-center gap-4 text-center'>
          <HeroBadge />
          <MotionPreset
            component='h1'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.2}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-2xl font-semibold sm:text-3xl lg:text-6xl'
          >
            Take Control of Your Money
          </MotionPreset>
          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.4}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-muted-foreground max-w-4xl text-xl'
          >
            Track every expense, set meaningful goals, and get instant insights that help you make smarter financial
            decisions. With our app, you&rsquo;re always in charge.
          </MotionPreset>
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-wrap items-center gap-4'
          >
            <PrimarySwipeButton className='group grow gap-2' asChild>
              <Link href='#'>
                Download now
                <ChevronRightIcon className='transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </PrimarySwipeButton>
            <SecondarySwipeButton className='grow' asChild>
              <Link href='#pricing'>See pricing</Link>
            </SecondarySwipeButton>
          </MotionPreset>
        </div>

        <div className='relative flex w-full items-end justify-center pt-19'>
          {/* Floating card 1 */}
          <MotionPreset
            fade
            motionProps={{
              animate: {
                x: [-2, 4, -2],
                opacity: 1
              },
              transition: {
                x: {
                  duration: 2.1,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                opacity: {
                  duration: 0.7,
                  delay: 1.2
                }
              }
            }}
            className='bg-card absolute top-[3.5%] left-[19%] flex -rotate-3 items-center gap-2 rounded-lg border px-3 py-1.5 max-lg:hidden'
          >
            <img src='/images/brand-logo/amazon.webp' alt='Amazon logo' className='size-4 dark:hidden' />
            <img
              src='/images/brand-logo/amazon-dark.webp'
              alt='Amazon logo dark'
              className='hidden size-4 dark:inline-block'
            />
            <span className='font-medium'>Amazon</span>
            <span className='text-muted-foreground text-xs font-light'>Shopping</span>
            <span className='text-destructive ml-6 text-sm'>$800</span>
          </MotionPreset>

          {/* Floating card 2 */}
          <MotionPreset
            fade
            motionProps={{
              animate: {
                y: [4, -4, 4],
                x: [-2, 0, -2],
                opacity: 1
              },
              transition: {
                y: {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                x: {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                opacity: {
                  duration: 0.7,
                  delay: 1.2
                }
              }
            }}
            className='bg-card absolute top-[16.4%] left-3 flex -rotate-3 items-center gap-1.5 rounded-full px-3 py-2 max-lg:hidden'
          >
            <span className='grid size-10 place-content-center rounded-full border shadow-sm'>
              <InfoIcon className='size-5.5' />
            </span>
            <div className='flex flex-col'>
              <span className='font-medium'>Expense limit is near 🤔</span>
              <span className='text-muted-foreground text-xs'>1:20</span>
            </div>
          </MotionPreset>

          {/* Floating card 3 */}
          <MotionPreset
            fade
            motionProps={{
              animate: {
                y: [-4, 4, -4],
                opacity: 1
              },
              transition: {
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                opacity: {
                  duration: 0.7,
                  delay: 1.2
                }
              }
            }}
            className='bg-card absolute top-[7.5%] right-[10.5%] flex rotate-3 flex-col gap-1 rounded-xl border px-3 py-4 shadow-xl max-lg:hidden'
          >
            <span className='text-muted-foreground text-sm'>Total expenses in 2 month</span>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-4xl font-semibold'>$13k</span>
              <span className='flex h-5 items-center gap-1 rounded-full bg-green-600/10 px-1 text-green-600 dark:bg-green-400/10 dark:text-green-400'>
                <span className='text-sm'>+38%</span>
                <ChevronUpIcon className='size-4' />
              </span>
            </div>
          </MotionPreset>

          {/* Floating card 4 */}
          <MotionPreset
            fade
            motionProps={{
              animate: {
                x: [6, -4, 6],
                y: [0, 2, 0],
                opacity: 1
              },
              transition: {
                x: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut'
                },
                opacity: {
                  duration: 0.7,
                  delay: 1.2
                }
              }
            }}
            className='bg-card absolute top-[21.75%] right-6 grid size-10.5 rotate-12 place-content-center rounded-full max-lg:hidden'
          >
            <StarBadge />
          </MotionPreset>

          {/* Card Behind 1 */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down' }}
            delay={1}
            transition={{ duration: 0.7 }}
            className='bg-background absolute right-1/2 bottom-0 aspect-square w-[28%] translate-x-[-78%] -rotate-2 rounded-md opacity-50 max-sm:hidden'
          />

          {/* Card Behind 2 */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down' }}
            delay={1}
            transition={{ duration: 0.7 }}
            className='bg-background absolute bottom-0 left-1/2 aspect-square w-[28%] translate-x-[78%] rotate-2 rounded-md opacity-50 max-sm:hidden'
          />

          {/* Widget card left */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down' }}
            delay={0.9}
            transition={{ duration: 0.7 }}
            className='absolute right-1/2 bottom-0 w-[32.25%] translate-x-[-38%] max-sm:hidden'
          >
            <img src='/images/widget-left.webp' alt='Widget Left' className='dark:hidden' />
            <img src='/images/widget-left-dark.webp' alt='Widget Left' className='hidden dark:inline-block' />
          </MotionPreset>

          {/* Widget card right */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down' }}
            delay={0.9}
            transition={{ duration: 0.7 }}
            className='absolute bottom-0 left-1/2 w-[32.25%] translate-x-[38%] max-sm:hidden'
          >
            <img src='/images/widget-right.webp' alt='Widget Right' className='dark:hidden' />
            <img src='/images/widget-right-dark.webp' alt='Widget Right' className='hidden dark:inline-block' />
          </MotionPreset>

          {/* Mobile Phone */}
          <MotionPreset
            fade
            blur
            slide={{ direction: 'down' }}
            delay={0.8}
            transition={{ duration: 0.7 }}
            className='w-full max-w-[37.5%] min-w-xs'
          >
            <img src='/images/hero-mobile.webp' alt='Mobile Phone' className='dark:hidden' />
            <img src='/images/hero-mobile-dark.webp' alt='Mobile Phone Dark' className='hidden dark:inline-block' />
          </MotionPreset>
        </div>
        <div className='from-background absolute inset-x-0 bottom-0 h-16 bg-linear-to-t to-transparent' />
      </div>

      {/* Background Marquee */}
      <Marquee duration={50} gap={0} className='absolute inset-0 -z-1 p-0'>
        <img src='/images/cloud-image.webp' alt='Cloud image' className='inset-0 opacity-60 dark:hidden' />

        <img
          src='/images/cloud-image-dark.webp'
          alt='Cloud image dark'
          className='inset-0 hidden opacity-40 dark:inline-block'
        />
      </Marquee>
    </section>
  )
}

export default HeroSection
