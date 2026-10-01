import { cn } from '../../utils/cn'

const variants = {
  light: 'bg-white text-ink-soft', // product card ("Best Sellers")
  dark: 'bg-ink text-cream', // product page ("Best Seller")
}

export default function Badge({ variant = 'light', className, children }) {
  return (
    <span className={cn('inline-flex items-center px-4 py-2 type-badge', variants[variant], className)}>
      {children}
    </span>
  )
}
