import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

const variants = {
  dark: 'bg-ink text-cream',
  light: 'bg-white text-ink',
}

// Square button, 12px 32px padding, Switzer 500 20/26 (18px below 1200px).
// Renders a router <Link> with `to`, an <a> with `href`, otherwise a <button>.
export default function Button({ variant = 'dark', to, href, className, children, ...props }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2.5 px-8 py-3 type-link-lg transition-opacity duration-300 hover:opacity-85 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
