import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../utils/cn'
import TextReveal from './TextReveal'

const PANEL_EASE = [0, 0.4, 0.22, 0.99]

// Image tile linking to a page. ≥810px: hovering (or focusing) slides a blurred dark panel up
// (0.6s tween) and the title words + a "Shop Now" button appear (they only exist while active,
// like the reference). Phones: title always visible over a dark gradient, no button.
// `className` sets the size; `titleClassName` the hover title size (h2 for 800px tiles, h3 for 500px).
export default function HoverTile({ title, to, image, className, titleClassName = 'type-h2' }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(false)

  return (
    <Link
      to={to}
      aria-label={`${title} collection`}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn('relative flex w-full items-center justify-center overflow-hidden', className)}
    >
      <img src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />

      {/* Phone */}
      <div aria-hidden="true" className="absolute inset-0 z-8 bg-card-fade md:hidden" />
      <p className="relative z-10 text-center text-cream type-h2 md:hidden">{title}</p>

      {/* Tablet / desktop */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ top: active ? '-2.4%' : '102.4%' }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: PANEL_EASE }}
        className="absolute left-[-1.27%] z-8 hidden h-[105%] w-[102%] rounded-lg bg-overlay backdrop-blur-[4px] md:block"
      />
      {active && (
        <div aria-hidden="true" className="relative z-10 hidden w-full flex-col items-center gap-4 md:flex">
          <TextReveal
            as="p"
            text={title}
            onMount
            startDelay={0}
            stagger={0.15}
            hidden={{ opacity: 0, filter: 'blur(4px)', y: 12 }}
            transition={{ duration: 1, ease: [0.12, 0.23, 0.17, 0.98] }}
            className={cn('w-full text-center text-cream', titleClassName)}
          />
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 35, mass: 2, stiffness: 125 }}
            className="inline-flex bg-white px-8 py-3 text-ink type-link-lg"
          >
            Shop Now
          </motion.span>
        </div>
      )}
    </Link>
  )
}
