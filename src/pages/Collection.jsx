import { useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import SectionHeader from '../components/ui/SectionHeader'
import ProductGrid from '../components/product/ProductGrid'
import SharedSections from '../components/shared/SharedSections'
import { getCollection } from '../data/collections'
import { getProductsBySlugs } from '../data/products'
import NotFound from './NotFound'

// A collection that doesn't belong to the audience in the URL is a 404.
export default function Collection({ audience }) {
  const { collection: slug } = useParams()
  const collection = getCollection(audience, slug)
  if (!collection) return <NotFound />

  const products = getProductsBySlugs(collection.products)

  return (
    <>
      <section className="px-4 pt-[180px] md:px-6 lg:px-8">
        <SectionHeader eyebrow={collection.label} title={collection.title} align="center" />
      </section>
      <section className="py-section-sm lg:py-section">
        <Container>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <EmptyState
              title="This Collection Is Coming Soon"
              cta={{ label: 'Explore Collections', to: `/${audience}-category` }}
            />
          )}
        </Container>
      </section>
      <SharedSections />
    </>
  )
}
