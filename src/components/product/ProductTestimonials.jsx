import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ShoppingBag } from 'lucide-react'
import Container from '../ui/Container'

const SLIDE_MS = 7000

// Product reviews: one at a time, centred (max 936px), changing every ~7s; three 2px progress
// bars (450px wide row, 358 on phones) fill while a review is shown and switch slides on click.
// Under prefers-reduced-motion nothing auto-advances.
export default function ProductTestimonials({ reviews, productName }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion || reviews.length < 2) return undefined
    const timer = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, reduceMotion, reviews.length])

  if (!reviews.length) return null
  const review = reviews[index]

  return (
    <section aria-label="Customer reviews" className="relative bg-white py-section-sm lg:py-section">
      <Container className="flex flex-col items-center gap-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
            className="flex w-full max-w-[936px] flex-col items-center gap-4 text-center"
          >
            <figcaption className="flex flex-col items-center gap-[5px]">
              <span className="text-ink type-h6-lg">{review.name}</span>
              <span className="flex h-[26px] items-center gap-[5px] text-ink-soft type-body">
                <ShoppingBag size={24} strokeWidth={1.5} aria-hidden="true" className="mt-0.5" />
                {productName}
              </span>
            </figcaption>
            <blockquote className="w-full text-ink type-h4">{review.quote}</blockquote>
          </motion.figure>
        </AnimatePresence>

        <div className="flex w-full gap-2.5 md:w-[450px]">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1} of ${reviews.length}`}
              aria-current={i === index}
              className="-my-2 flex-1 cursor-pointer py-2"
            >
              {/* 2px track (#9A948E) with the ink fill; the button adds an 8px hit area above/below. */}
              <span className="relative block h-0.5 overflow-hidden bg-[#9a948e]">
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-ink"
                    initial={{ width: reduceMotion ? '100%' : '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: reduceMotion ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}
