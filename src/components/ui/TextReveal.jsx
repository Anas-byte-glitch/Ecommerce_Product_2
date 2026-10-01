import { motion, useReducedMotion } from 'motion/react'
import { wordEffect } from '../../utils/motion'

// Heading whose words blur/fade/slide in one after another (Framer text effect, "word"
// tokenization). Trigger on mount (hero) or when the heading enters the viewport.
export default function TextReveal({
  as = 'h2',
  text,
  onMount = false,
  startDelay = 0.2,
  hidden = wordEffect.hidden,
  visible = wordEffect.visible,
  stagger = wordEffect.stagger,
  transition = wordEffect.transition,
  className,
}) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }
  const MotionTag = motion[as]

  const trigger = onMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0 } }

  return (
    <MotionTag className={className} initial="hidden" {...trigger}>
      {words.map((word, index) => (
        <span key={index}>
          <motion.span
            className="inline-block"
            variants={{ hidden, visible }}
            transition={{ ...transition, delay: startDelay + index * stagger }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </MotionTag>
  )
}
