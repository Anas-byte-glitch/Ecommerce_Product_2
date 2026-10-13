import JournalCard from '../components/journal/JournalCard'
import SharedSections from '../components/shared/SharedSections'
import Container from '../components/ui/Container'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { journals } from '../data/journals'

// No filters or pagination on the reference: the featured article, then the others in a grid.
export default function Journals() {
  const featured = journals.find((journal) => journal.featured) ?? journals[0]
  const others = journals.filter((journal) => journal !== featured)

  return (
    <>
      <section className="px-4 pt-[180px] md:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8">
          <SectionHeader eyebrow="Journals" title="Notes on the modern elegance" titleAs="h1" headerClassName="w-full max-w-[780px]" />
          <Reveal>
            <JournalCard journal={featured} featured />
          </Reveal>
        </div>
      </section>

      <section className="py-section-sm lg:py-section">
        <Container className="flex flex-col gap-8">
          <SectionHeader eyebrow="Explore more journals" title="Timeless Stories" headerClassName="w-full max-w-[843px]" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((journal) => (
              <Reveal key={journal.slug}>
                <JournalCard journal={journal} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <SharedSections />
    </>
  )
}
