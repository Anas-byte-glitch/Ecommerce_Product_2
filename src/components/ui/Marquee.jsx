import { Children, useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react'
import { cn } from '../../utils/cn'

// Endless horizontal ticker moving left at `speed` px/s (`hoverSpeed` while hovered, like the
// reference). Copies of the items fill the width; the copies are `inert` so links and screen
// readers only see one set. Under prefers-reduced-motion it renders a single static row.
// It also pauses while it holds keyboard focus.
export default function Marquee({ speed = 40, hoverSpeed = speed, gapClassName = 'gap-4', align = 'center', className, itemClassName, children }) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef(null)
  const groupRef = useRef(null)
  const [copies, setCopies] = useState(2)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const x = useMotionValue(0)
  const groupWidth = useRef(0)
  const items = Children.toArray(children)

  useEffect(() => {
    const container = containerRef.current
    const group = groupRef.current
    if (!container || !group) return undefined

    const measure = () => {
      // One set of items + the gap that follows it = the distance after which the loop repeats.
      const next = group.nextElementSibling
      groupWidth.current = next ? next.offsetLeft - group.offsetLeft : group.offsetWidth
      const needed = Math.ceil(container.offsetWidth / Math.max(groupWidth.current, 1)) + 1
      setCopies(Math.max(2, needed))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    observer.observe(group)
    return () => observer.disconnect()
  }, [copies])

  useAnimationFrame((_, delta) => {
    if (reduceMotion || focused || !groupWidth.current) return
    const distance = ((hovered ? hoverSpeed : speed) * Math.min(delta, 100)) / 1000
    let next = x.get() - distance
    if (next <= -groupWidth.current) next += groupWidth.current
    x.set(next)
  })

  const alignClass = { start: 'items-start', center: 'items-center', end: 'items-end' }[align]
  const group = (copy) => (
    <div
      key={copy}
      ref={copy === 0 ? groupRef : undefined}
      inert={copy > 0}
      aria-hidden={copy > 0 || undefined}
      className={cn('flex shrink-0', alignClass, gapClassName)}
    >
      {items.map((item, index) => (
        <div key={index} className={cn('shrink-0', itemClassName)}>
          {item}
        </div>
      ))}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-hidden', className)}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <motion.div className={cn('flex w-max', alignClass, gapClassName)} style={{ x }}>
        {Array.from({ length: reduceMotion ? 1 : copies }, (_, copy) => group(copy))}
      </motion.div>
    </div>
  )
}
