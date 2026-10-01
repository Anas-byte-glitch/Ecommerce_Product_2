import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { placeholders } from '../../assets/placeholders'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import TextReveal from '../ui/TextReveal'

const CARDS = [
  { title: "Women's", to: '/women-category', image: placeholders.genderWomen },
  { title: "Men's", to: '/men-category', image: placeholders.genderMen },
]

// Hover (≥810px): a blurred dark panel slides up from below the card (0.6s tween), and the
// title words + a "Shop Now" button appear (they only exist while hovered, as on the
// reference). Phones: title always visible over a dark gradient, no button.
const PANEL_EASE = [0, 0.4, 0.22, 0.99]

function GenderCard({ title, to, image }) {
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
      className="relative flex h-[460px] w-full items-center justify-center overflow-hidden md:h-[800px]"
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
            className="w-full text-center text-cream type-h2"
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

export default function ForEveryone() {
  return (
    <section className="pt-section-sm lg:pt-section">
      <div className="flex flex-col gap-8">
        <SectionHeader
          eyebrow="For Everyone"
          title="Style knows no gender"
          align="center"
          className="mx-auto w-full max-w-site px-4 md:px-6 lg:px-8"
        />
        <div className="flex flex-col lg:flex-row">
          {CARDS.map((card) => (
            <Reveal key={card.to} className="w-full lg:flex-1">
              <GenderCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
