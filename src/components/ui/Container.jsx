import { cn } from '../../utils/cn'

// max-width 1440px, side padding 16 / 24 / 32px (phone / tablet / desktop).
export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-site px-4 md:px-6 lg:px-8', className)} {...props}>
      {children}
    </Tag>
  )
}
