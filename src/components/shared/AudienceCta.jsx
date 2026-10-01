import { placeholders } from '../../assets/placeholders'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import TextReveal from '../ui/TextReveal'

// Viewport-tall image block that points to the other audience ("For Him" on the women's page).
// The content box is 645px wide with 32px left padding, centred — as on the reference, so on
// phones it ends at the right edge of the screen.
export default function AudienceCta({ label, title, cta, to, image = placeholders.bannerWide }) {
  return (
    <section className="py-section-sm lg:py-section">
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <img src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 z-1 bg-fade-up opacity-90" />
        <div className="relative z-10 flex w-full max-w-[645px] flex-col items-center gap-8 pl-8">
          <div className="flex w-full flex-col items-center gap-2.5">
            <Reveal>
              <Eyebrow tone="dark">{label}</Eyebrow>
            </Reveal>
            <TextReveal text={title} className="w-full text-balance text-center text-cream type-h2" />
          </div>
          <Reveal>
            <Button to={to} variant="light">
              {cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
