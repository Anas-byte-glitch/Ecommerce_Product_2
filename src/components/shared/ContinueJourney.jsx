import { getProductsBySlugs, journeyProducts } from '../../data/products'
import { cn } from '../../utils/cn'
import Container from '../ui/Container'
import SectionHeader from '../ui/SectionHeader'
import ProductGrid from '../product/ProductGrid'

// "Continue Your Journey" product strip (shared). A static grid: 3 cards from 1200px (only the
// first three are shown, as on the reference), 2 × 2 below. No top padding: on the reference
// the previous section's bottom padding provides the space.
export default function ContinueJourney({ products = journeyProducts, className }) {
  const items = getProductsBySlugs(products)

  return (
    <section className={cn('relative bg-white', className)}>
      <Container className="flex flex-col gap-16 md:gap-8">
        <SectionHeader
          eyebrow="Explore more products"
          title="Continue Your Journey"
          action={{ label: 'Show All', to: '/shop', className: 'w-[160px]' }}
          headerClassName="w-full md:max-w-[575px]"
        />
        <ProductGrid products={items} itemClassName="lg:[&:nth-child(n+4)]:hidden" />
      </Container>
    </section>
  )
}
