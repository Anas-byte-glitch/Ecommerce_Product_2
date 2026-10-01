import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { site } from '../config/site'
import { getProduct, getProductsBySlugs } from '../data/products'
import { getProductTestimonials } from '../data/testimonials'
import { formatPrice } from '../utils/formatPrice'
import Accordion from '../components/ui/Accordion'
import Eyebrow from '../components/ui/Eyebrow'
import AddToCart from '../components/product/AddToCart'
import FavouriteButton from '../components/product/FavouriteButton'
import HorizontalCard from '../components/product/HorizontalCard'
import ProductGallery from '../components/product/ProductGallery'
import ProductTestimonials from '../components/product/ProductTestimonials'
import QuantityStepper from '../components/product/QuantityStepper'
import SharedSections from '../components/shared/SharedSections'
import NotFound from './NotFound'

// Keyed by slug so quantity / gallery / accordion state resets between products.
export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  return <ProductView key={slug} product={product} />
}

function ProductView({ product }) {
  const [quantity, setQuantity] = useState(1)
  const matches = getProductsBySlugs(product.matchWith ?? [])
  // The PDP badge is singular ("Best Seller") and only shown for best sellers.
  const badge = product.badge === 'Best Sellers' ? 'Best Seller' : null

  return (
    <>
      <section className="bg-white pt-[180px]">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-6 lg:px-8">
          <div className="w-full lg:sticky lg:top-6 lg:flex-1">
            <ProductGallery images={product.gallery} name={product.name} badge={badge} />
          </div>

          <div className="flex w-full flex-col gap-8 lg:sticky lg:top-0 lg:flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="mb-1 flex h-[34px] items-center gap-2 md:mb-0">
                  <Eyebrow>{product.categoryLabel}</Eyebrow>
                  {/* Stock-status slot (28px, 4px dot): the reference's Shopify stock indicator. */}
                  <span aria-hidden="true" className="grid h-[30px] w-7 place-items-center">
                    <span className="size-1 rounded-pill bg-[#969696]" />
                  </span>
                  <FavouriteButton slug={product.slug} name={product.name} />
                </div>
                <h1 className="max-w-[550px] text-ink type-h5">{product.name}</h1>
                <p className="max-w-[550px] text-ink-soft type-body">{product.description}</p>
              </div>
              <div className="flex h-8 items-center justify-between gap-4">
                <p className="text-ink type-h6">
                  {site.showPrices && (
                    <>
                      {formatPrice(product.price)}
                      {product.compareAtPrice && (
                        <s className="ml-2 text-muted">{formatPrice(product.compareAtPrice)}</s>
                      )}
                    </>
                  )}
                </p>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>
              <AddToCart slug={product.slug} quantity={quantity} />
            </div>

            <Accordion
              items={[
                { title: 'Description', content: product.details },
                { title: 'Materials / Composition', content: product.materials },
                { title: 'Dimensions & Fit', content: product.dimensions },
                { title: 'Care', content: product.care },
              ]}
            />

            <div className="flex flex-col gap-4">
              <h2 className="text-ink-soft type-quote">Perfect match with</h2>
              <div className="flex flex-col gap-4">
                {matches.map((match) => (
                  <HorizontalCard key={match.slug} product={match} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTestimonials reviews={getProductTestimonials(product.slug)} productName={product.name} />
      <SharedSections />
    </>
  )
}
