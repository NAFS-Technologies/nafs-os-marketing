import LogoSvg from '@/assets/svg/logo'
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-3', className)}>
    <LogoSvg className='size-9 shrink-0' aria-hidden='true' />
    <span className='text-2xl font-semibold tracking-[-0.04em]'>NAFS</span>
  </div>
)

export default Logo
