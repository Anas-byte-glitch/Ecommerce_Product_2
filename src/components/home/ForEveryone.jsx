import { placeholders } from '../../assets/placeholders'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import HoverTile from '../ui/HoverTile'

const CARDS = [
  { title: "Women's", to: '/women-category', image: placeholders.genderWomen },
  { title: "Men's", to: '/men-category', image: placeholders.genderMen },
]

// Also used on /shop with its own eyebrow/title: `bottomSpace` adds the 140/120px bottom padding that
// the home page gets from the ticker below it.
export default function ForEveryone({ eyebrow = 'For Everyone', title = 'Style knows no gender', bottomSpace = false }) {
  return (
    <section className={bottomSpace ? 'py-section-sm lg:py-section' : 'pt-section-sm lg:pt-section'}>
      <div className="flex flex-col gap-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          align="center"
          className="mx-auto w-full max-w-site px-4 md:px-6 lg:px-8"
        />
        <div className="flex flex-col lg:flex-row">
          {CARDS.map((card) => (
            <Reveal key={card.to} className="w-full lg:flex-1">
              <HoverTile {...card} className="h-[460px] md:h-[800px]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
