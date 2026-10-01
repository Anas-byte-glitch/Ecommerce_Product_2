import { motion, useReducedMotion } from 'motion/react'
import { placeholders } from '../../assets/placeholders'
import { useNavOverHero } from '../../utils/useNavOverHero'
import { appearSpring } from '../../utils/motion'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import TextReveal from '../ui/TextReveal'

// Full-screen hero, pinned (position: fixed) while the rest of the page scrolls over it,
// like the reference. "Crafted For Legacy" is the second heading, bottom-right (top of the
// bottom block on phones). Appear timings come from the reference's page data.
function Appear({ delay, className, children }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={appearSpring(delay)}
    >
      {children}
    </motion.div>
  )
}

export default function HomeHero() {
  useNavOverHero()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section
        aria-label="Exclusive Collection"
        className="fixed inset-x-0 top-0 z-0 flex h-screen flex-col overflow-hidden px-4 pt-section-sm pb-8 md:px-6 md:pb-12 lg:px-8 lg:pt-section lg:pb-14"
      >
        <div className="absolute inset-0">
          <motion.img
            src={placeholders.heroWide}
            alt=""
            className="size-full object-cover"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-hero-fade" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-start justify-between">
          <div className="flex w-full max-w-[640px] flex-col items-start gap-2">
            <Appear delay={0.3}>
              <Eyebrow tone="dark">Exclusive Collection</Eyebrow>
            </Appear>
            <TextReveal
              as="h1"
              text="Beyond Ordinary Elegance"
              onMount
              startDelay={0.5}
              className="w-full text-balance text-cream type-display"
            />
          </div>

          <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-end md:justify-center md:gap-16 lg:justify-between lg:gap-0">
            <div className="order-1 flex w-full flex-col items-start gap-4 overflow-hidden md:order-0 md:flex-1 lg:max-w-[540px]">
              <Appear delay={0.7} className="w-full">
                <p className="text-balance text-cream type-body-lg">
                  A curated collection of necklaces, rings, bracelets, and earrings designed to
                  become your signature.
                </p>
              </Appear>
              <Appear delay={0.9} className="w-full md:max-w-[460px]">
                <Button to="/shop" variant="light" className="w-full">
                  Shop New Arrivals
                </Button>
              </Appear>
            </div>

            <div className="order-0 flex w-full flex-col items-end md:order-1 md:flex-1 lg:max-w-[481px]">
              <TextReveal
                as="p"
                text="Crafted For Legacy"
                onMount
                startDelay={0.5}
                className="w-full text-balance text-left text-cream type-display md:text-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Takes the hero's place in the flow; the page content scrolls over the pinned hero. */}
      <div aria-hidden="true" className="h-screen" />
    </>
  )
}
