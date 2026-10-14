import { site } from '../../config/site'
import { placeholders } from '../../assets/placeholders'
import { photoOr } from '../../assets/photos'
import { getProductsBySlugs } from '../../data/products'
import Container from '../ui/Container'
import MediaBanner from '../ui/MediaBanner'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'
import ProductGrid from '../product/ProductGrid'

const BEST_SELLERS = ['marlow-line-necklace', 'tessa-tennis-bracelet', 'rhett-cuban-chain', 'fenn-curb-bracelet']

// 4 best sellers + the "Icons" banner as a 2-column cell of the same grid
// (3 columns from 1200px: banner next to the 4th card; 2 columns below: banner on its own row).
export default function BestSellers() {
  return (
    <section className="pt-section-sm lg:pt-section">
      <Container className="flex flex-col gap-16 md:gap-8">
        <SectionHeader
          eyebrow="Best Sellers"
          title="Our Top Picks Right Now"
          action={{ label: 'Show All', to: '/shop', className: 'w-[160px]' }}
          headerClassName="w-full md:max-w-[515px]"
        />
        <ProductGrid products={getProductsBySlugs(BEST_SELLERS)}>
          <Reveal className="col-span-2 h-[460px] md:h-[398px] lg:h-[439px]">
            <MediaBanner
              image={photoOr('banner-bestsellers', placeholders.bannerWide)}
              title={`${site.name} Daily Essentials`}
              cta={{ label: 'Shop Best Sellers', to: '/shop' }}
              className="h-full"
            />
          </Reveal>
        </ProductGrid>
      </Container>
    </section>
  )
}
