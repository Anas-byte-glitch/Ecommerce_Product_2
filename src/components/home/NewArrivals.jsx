import { placeholders } from '../../assets/placeholders'
import { getProductsBySlugs } from '../../data/products'
import Container from '../ui/Container'
import MediaBanner from '../ui/MediaBanner'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import ProductGrid from '../product/ProductGrid'

const NEW_ARRIVALS = ['elara-crystal-necklace', 'ivy-twist-ring', 'knox-rope-bracelet', 'ryder-black-stud']

const COLUMN = 'grid-cols-2 lg:grid-cols-1'
const COLUMN_SIZE = 'lg:max-w-[350px] lg:flex-1'

// Desktop: 2 cards stacked (350px column) · promo card (966px tall) · 2 cards stacked.
// Tablet / phone: 2 cards side by side · promo · 2 cards side by side (16px gaps).
export default function NewArrivals() {
  const products = getProductsBySlugs(NEW_ARRIVALS)

  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-8">
        <SectionHeader eyebrow="New Arrivals" title="Our Latest Obsessions" headerClassName="w-full" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <ProductGrid products={products.slice(0, 2)} columns={COLUMN} className={COLUMN_SIZE} />
          <Reveal className="h-[460px] md:h-[466px] lg:h-[966px] lg:flex-1">
            <MediaBanner
              image={placeholders.promoTall}
              title="Discover The Collection"
              cta={{ label: 'Explore Collections', to: '/shop' }}
              className="h-full"
              contentClassName="lg:max-w-[408px] lg:flex-col lg:items-start"
              titleClassName="lg:flex-none"
            />
          </Reveal>
          <ProductGrid products={products.slice(2)} columns={COLUMN} className={COLUMN_SIZE} />
        </div>
      </Container>
    </section>
  )
}
