import { placeholders } from '../../assets/placeholders'
import { founder } from '../../data/about'
import Container from '../ui/Container'
import Reveal from '../ui/Reveal'
import TextReveal from '../ui/TextReveal'

// Founder portrait (circle 260px, 168px on phones; the 2:3 photo is 71% of the width so the
// grey shows on both sides, as on the reference), name + role, large centred quote.
export default function FounderQuote() {
  return (
    <section className="py-section-sm md:py-section">
      <Container className="flex flex-col items-center gap-8">
        <Reveal className="flex flex-col items-center gap-4">
          <div className="relative flex size-[168px] items-center justify-center overflow-hidden rounded-pill bg-mist md:size-[260px]">
            <img src={placeholders.promoTall} alt={`Portrait of ${founder.name}`} className="aspect-[2/3] h-[106%] object-cover" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-ink-soft type-quote">{founder.name}</p>
            <p className="text-muted type-body-lg">{founder.role}</p>
          </div>
        </Reveal>
        <blockquote className="w-full max-w-[960px]">
          <TextReveal as="p" text={founder.quote} className="text-center text-ink type-h4" />
        </blockquote>
      </Container>
    </section>
  )
}
