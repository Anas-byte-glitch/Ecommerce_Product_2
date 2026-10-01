import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { formatPrice } from '../../utils/formatPrice'
import { cn } from '../../utils/cn'
import Badge from '../ui/Badge'
import FavouriteButton from './FavouriteButton'

// Product card (reference "Desktop" variant from 810px, "Mobile" below):
// image box 440px tall (200px on phones), badge top-left (hidden on phones), favourite top-right,
// second image cross-fades in on hover; title + category label underneath.
export default function ProductCard({ product, className }) {
  const [image, hoverImage = image] = product.images

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn('group flex w-full flex-col items-start gap-3', className)}
    >
      <div className="relative h-[200px] w-full overflow-hidden bg-mist md:h-[440px]">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 z-2 size-full object-cover transition-opacity duration-500 ease-card group-hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 z-1 size-full object-cover opacity-0 transition-opacity duration-500 ease-card group-hover:opacity-100"
        />
        <div className="absolute inset-x-3 top-3 z-3 flex h-[34px] items-center justify-end">
          {product.badge && <Badge className="mr-auto hidden md:inline-flex">{product.badge}</Badge>}
          <FavouriteButton slug={product.slug} name={product.name} />
        </div>
      </div>

      {/* Phones: category above the title (4px gap); from 810px: title left, category right. */}
      <div className="flex w-full flex-col gap-1 px-2 md:flex-row md:items-start md:justify-between md:gap-0">
        <div className="order-1 flex w-full flex-col gap-2 md:max-w-[220px] md:flex-1">
          <h3 className="text-ink type-h6">{product.name}</h3>
          {/* Empty 0px row keeps the reference's 8px gap under the title when prices are off. */}
          <div className="flex items-center gap-2">
            {site.showPrices && (
              <>
                <span className="text-ink-soft type-body">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <s className="text-muted type-body">{formatPrice(product.compareAtPrice)}</s>
                )}
              </>
            )}
          </div>
        </div>
        <p className="order-0 w-fit text-ink-soft type-badge md:order-1 md:text-right">{product.categoryLabel}</p>
      </div>
    </Link>
  )
}
