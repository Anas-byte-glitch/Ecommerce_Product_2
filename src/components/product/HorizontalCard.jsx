import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { formatPrice } from '../../utils/formatPrice'

// "Perfect match with" row: 160px square image + info (category top, title/price bottom).
export default function HorizontalCard({ product }) {
  const [image, hoverImage = image] = product.images
  return (
    <Link to={`/product/${product.slug}`} className="group flex h-40 w-full items-start gap-4">
      <div className="relative size-40 shrink-0 overflow-hidden bg-mist">
        <img src={image} alt={product.name} loading="lazy" className="absolute inset-0 z-2 size-full object-cover transition-opacity duration-500 ease-card group-hover:opacity-0" />
        <img src={hoverImage} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 z-1 size-full object-cover" />
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-between p-2">
        <p className="text-ink-soft type-badge">{product.categoryLabel}</p>
        <div className="flex max-w-[220px] flex-col gap-2">
          <h3 className="text-ink type-h6">{product.name}</h3>
          <div className="flex items-center gap-2">
            {site.showPrices && <span className="text-ink-soft type-body">{formatPrice(product.price)}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
