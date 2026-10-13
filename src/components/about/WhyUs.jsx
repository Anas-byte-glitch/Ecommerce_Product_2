import { placeholders } from '../../assets/placeholders'
import { reasons } from '../../data/about'
import Container from '../ui/Container'
import MediaBanner from '../ui/MediaBanner'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

function ReasonCard({ reason }) {
  return (
    <Reveal>
      <article className="flex h-[460px] flex-col justify-between bg-mist p-6 md:h-[494px]">
        <div className="flex max-w-[320px] flex-col gap-2.5">
          <p className="text-muted type-link-lg">{reason.n}</p>
          <h3 className="text-ink type-h4">{reason.title}</h3>
        </div>
        <p className="text-ink-soft type-body-lg">{reason.text}</p>
      </article>
    </Reveal>
  )
}

// "Why Us": four numbered cards around a tall image. Desktop: [01, 03] · image · [02, 04];
// tablet: two cards / image / two cards (rows); phone: one column each. Gaps 10px.
export default function WhyUs() {
  const column = (name) => reasons.filter((reason) => reason.column === name)
  const group = 'grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:w-[400px] lg:shrink-0 lg:grid-cols-1'

  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-8">
        <SectionHeader
          gap="gap-2.5"
          eyebrow="Why Us"
          title="Why People Choose Us"
          align="center"
          className="mx-auto w-full max-w-[846px]"
        />
        <div className="flex flex-col gap-2.5 lg:flex-row">
          <div className={group}>
            {column('left').map((reason) => (
              <ReasonCard key={reason.n} reason={reason} />
            ))}
          </div>
          <Reveal className="h-[460px] md:h-[466px] lg:h-[998px] lg:flex-1">
            <MediaBanner
              image={placeholders.promoTall}
              title="Made to Stand Out Quietly"
              cta={{ label: 'Browse Collections', to: '/shop' }}
              className="h-full"
              contentClassName="lg:flex-col lg:items-start"
              titleClassName="lg:flex-none"
            />
          </Reveal>
          <div className={group}>
            {column('right').map((reason) => (
              <ReasonCard key={reason.n} reason={reason} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
