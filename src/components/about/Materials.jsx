import { materials } from '../../data/about'
import { placeholders } from '../../assets/placeholders'
import Container from '../ui/Container'
import HoverTile from '../ui/HoverTile'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

const images = [placeholders.genderWomen, placeholders.genderMen, placeholders.genderWomen]

// "Our materials": three tiles (458.67 × 494 desktop, 2 + 1 on tablet, stacked 358 × 460 on
// phones, no gaps). Hover shows the material name and its text.
export default function Materials() {
  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-8">
        <SectionHeader gap="gap-2.5" eyebrow="Our materials" title="Made With Patience" headerClassName="w-full max-w-[686px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => (
            <Reveal key={material.title}>
              <HoverTile title={material.title} description={material.text} image={images[index]} className="h-[460px] md:h-[494px]" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
