import { cn } from '../../utils/cn'

// "/ Label /" — accent colour on light backgrounds, mist on dark ones.
export default function Eyebrow({ tone = 'light', className, children }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 type-eyebrow',
        tone === 'light' ? 'text-accent' : 'text-mist',
        className,
      )}
    >
      <span aria-hidden="true">/</span>
      <span>{children}</span>
      <span aria-hidden="true">/</span>
    </p>
  )
}
