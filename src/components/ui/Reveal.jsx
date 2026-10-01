import { motion, useReducedMotion } from 'motion/react'
import { appearSpring } from '../../utils/motion'

// Fades its children in once when half of the block is in view (Framer "appear" effect:
// opacity 0 → 1, spring 1.5s, 0.2s delay, threshold 0.5). `onMount` animates on load instead.
export default function Reveal({ as = 'div', delay = 0.2, amount = 0.5, onMount = false, className, children, ...props }) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as]

  if (reduceMotion) {
    const Static = as
    return (
      <Static className={className} {...props}>
        {children}
      </Static>
    )
  }

  const trigger = onMount
    ? { animate: { opacity: 1 } }
    : { whileInView: { opacity: 1 }, viewport: { once: true, amount } }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0 }}
      transition={appearSpring(delay)}
      {...trigger}
      {...props}
    >
      {children}
    </Tag>
  )
}
