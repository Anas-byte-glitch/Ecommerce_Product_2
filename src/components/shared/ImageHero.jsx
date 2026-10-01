import { motion, useReducedMotion } from 'motion/react'
import { placeholders } from '../../assets/placeholders'
import { useNavOverHero } from '../../utils/useNavOverHero'
import Eyebrow from '../ui/Eyebrow'
import TextReveal from '../ui/TextReveal'

// Overlay gradients measured per page on the reference (top fade / clear middle / black bottom).
const fades = {
  shop: 'bg-[linear-gradient(180deg,#000_0%,rgb(0_0_0/0)_41%,#000_100%)]',
  women:
    'bg-[linear-gradient(180deg,#000_-28%,rgb(0_0_0/0.73)_-10%,rgb(0_0_0/0)_63%,#000_104%)]',
  men: 'bg-[linear-gradient(180deg,#000_-44%,rgb(0_0_0/0)_41%,#000_100%)]',
}

// Full-screen hero for /shop, /women-category and /men-category: pinned (position: fixed) while
// the page content scrolls over it, label + display heading bottom-left (heading max-w 680,
// 878 with `wide` — the women's page).
// Pages render it first, then wrap everything else in `relative bg-white`.
export default function ImageHero({ image = placeholders.heroWide, label, title, fade = 'shop', wide = false }) {
  useNavOverHero()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section
        aria-label={label}
        className="fixed inset-x-0 top-0 z-0 flex h-screen flex-col justify-end overflow-hidden px-4 pt-section-sm pb-8 md:px-6 md:pb-12 lg:px-8 lg:pt-section lg:pb-14"
      >
        <div className="absolute inset-0">
          <motion.img
            src={image}
            alt=""
            className="size-full object-cover"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div aria-hidden="true" className={`absolute inset-0 ${fades[fade]}`} />
        </div>
        <div className={`relative z-10 flex w-full flex-col ${wide ? 'max-w-[878px]' : 'max-w-[680px]'} items-start gap-2`}>
          <Eyebrow tone="dark">{label}</Eyebrow>
          <TextReveal as="h1" text={title} onMount startDelay={0.5} className="w-full text-cream type-display" />
        </div>
      </section>
      <div aria-hidden="true" className="h-screen" />
    </>
  )
}
