import { site } from '../../config/site'
import { beliefs, stats } from '../../data/about'
import Container from '../ui/Container'
import CountUp from '../ui/CountUp'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

// "Our Beliefs": header, four numbered rows separated by 1px rules (heading left, text right
// from 810px; stacked on phones) and the four count-up statistics (4 across, 2 × 2 on phones).
export default function Beliefs() {
  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-8">
        <SectionHeader gap="gap-2.5" eyebrow="Our Beliefs" title={`${site.name} beliefs`} headerClassName="w-full max-w-[700px]" />
        <ol className="flex flex-col gap-4 md:gap-6">
          {beliefs.map((item, index) => (
            <Reveal as="li" key={item.title} className="flex flex-col gap-4">
              {index > 0 && <div aria-hidden="true" className="h-px w-full bg-[#aa9d8d]" />}
              <div className="flex flex-col gap-4 py-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-4 md:flex-1">
                  <span className="text-muted type-eyebrow">{String(index + 1).padStart(2, '0')}.</span>
                  <h3 className="text-ink type-h6-lg">{item.title}</h3>
                </div>
                <p className="text-ink-soft type-body-lg md:flex-1 lg:max-w-[560px] lg:flex-none">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <dl className="grid grid-cols-2 gap-4 md:flex md:gap-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-4 text-center md:flex-1">
              <dd className="order-1 text-[#1c1c1a]">
                <CountUp value={stat.value} suffix={stat.suffix} className="type-stat" />
              </dd>
              <dt className="order-2 w-full text-[#666] type-stat-label">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
