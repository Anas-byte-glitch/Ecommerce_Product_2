import { site } from '../../config/site'
import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

const format = new Intl.NumberFormat(site.locale)

// Counts from 0 to `value` once, when it scrolls into view (~1.1s, ease-out; measured on the
// reference). Reduced motion shows the final number. Screen readers always get the final value.
export default function CountUp({ value, suffix = '', className }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return undefined
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  const shown = reduceMotion ? value : current
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{`${format.format(value)}${suffix}`}</span>
      <span aria-hidden="true">{`${format.format(shown)}${suffix}`}</span>
    </p>
  )
}
