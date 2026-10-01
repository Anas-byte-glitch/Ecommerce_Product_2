import { Link } from 'react-router-dom'
import ImageHero from '../components/shared/ImageHero'
import SharedSections from '../components/shared/SharedSections'
import Container from '../components/ui/Container'
import ProductGrid from '../components/product/ProductGrid'
import { products } from '../data/products'
import { useWishlistStore } from '../store/wishlistStore'

// Shows only the saved products (catalogue order). The reference lists all 25 because its filter
// relies on Shopify product IDs, which are blocked in the sandbox — see DESIGN_NOTES §19.
export default function Favourites() {
  const saved = useWishlistStore((state) => state.items)
  const items = products.filter((product) => saved.includes(product.slug))

  return (
    <>
      <ImageHero label="Favourites" title="Your Loved Collection" />
      <div className="relative bg-white will-change-transform">
        <section className="py-section-sm lg:py-section">
          <Container>
            {items.length > 0 ? (
              <ProductGrid products={items} />
            ) : (
              <div className="flex flex-col items-center gap-6 p-6 text-center">
                <h2 className="text-ink type-h4">Nothing here yet</h2>
                <p className="max-w-[420px] text-ink-soft type-body">
                  Tap the heart on any piece to save it here.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center bg-ink px-8 py-3 text-cream type-link-lg transition-opacity duration-300 hover:opacity-85"
                >
                  Explore Collections
                </Link>
              </div>
            )}
          </Container>
        </section>
        <SharedSections />
      </div>
    </>
  )
}
