import { useReducedMotion } from 'motion/react'
import { placeholders } from '../../assets/placeholders'
import { site } from '../../config/site'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import TextReveal from '../ui/TextReveal'
import Image from '../ui/Image'

// Full-bleed, viewport-tall media block. The reference plays a video here; we show a poster
// placeholder, or a muted looping video when `site.homeVideoSrc` is set (poster only under
// prefers-reduced-motion).
export default function AboutVideo() {
  const reduceMotion = useReducedMotion()
  const showVideo = Boolean(site.homeVideoSrc) && !reduceMotion

  return (
    <section className="py-section-sm lg:py-section">
      <div className="relative h-screen w-full overflow-hidden">
        {showVideo ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={site.homeVideoSrc}
            poster={placeholders.aboutPoster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Image src={placeholders.aboutPoster} alt="" className="absolute inset-0 size-full object-cover" />
        )}
        <div aria-hidden="true" className="absolute inset-0 z-1 bg-fade-up" />

        <div className="absolute inset-0 z-4 flex flex-col items-start justify-between p-4 md:inset-auto md:inset-x-0 md:bottom-0 md:justify-center md:gap-8 md:p-6 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:p-8">
          <div className="flex w-full flex-col items-start gap-2 md:max-w-[739px] lg:flex-1">
            <Reveal>
              <Eyebrow tone="dark">About Us</Eyebrow>
            </Reveal>
            <TextReveal text="Designed for the Way You Dress Today" className="w-full text-cream type-display" />
          </div>
          <Reveal className="shrink-0">
            <Button to="/about" variant="light">
              Read Our Story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
