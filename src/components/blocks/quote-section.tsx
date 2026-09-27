import { TextReveal } from '../ui/text-reveal'

const QuoteSection = () => {
  return (
    <TextReveal>
      Thousands of users trust our{' '}
      <img src='/images/quote-image-1.webp' alt='avatar 1' className='h-9 rounded-full sm:h-10 lg:h-15 xl:h-18' /> app
      to track{' '}
      <img src='/images/quote-image-2.webp' alt='avatar 2' className='h-9 rounded-full sm:h-10 lg:h-15 xl:h-18' />{' '}
      expenses and stay on top of their financial goals.
    </TextReveal>
  )
}

export default QuoteSection
