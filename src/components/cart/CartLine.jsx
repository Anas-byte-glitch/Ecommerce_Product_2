import { Link } from 'react-router-dom'
import { useCartStore, MAX_QUANTITY } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import { cn } from '../../utils/cn'
import QuantityStepper from '../product/QuantityStepper'

// One cart line: square thumbnail (96px in the drawer, 160px on /cart from 810px), name (links
// to the product), category, quantity stepper, remove, line total. Prices always show here.
export default function CartLine({ line, size = 'small', onNavigate }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const { product } = line
  const href = `/product/${product.slug}`

  return (
    <li className="flex gap-4 py-4">
      <Link
        to={href}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden="true"
        className={cn('relative shrink-0 overflow-hidden bg-mist', size === 'large' ? 'size-24 md:size-40' : 'size-24')}
      >
        <img src={product.images[0]} alt="" className="absolute inset-0 size-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-ink-soft type-badge">{product.categoryLabel}</p>
            <Link to={href} onClick={onNavigate} className="text-ink type-h6 hover:text-ink-hover">
              {product.name}
            </Link>
          </div>
          <p className="shrink-0 text-ink type-body">{formatPrice(line.lineTotal)}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="bg-mist p-px">
            <QuantityStepper
              value={line.quantity}
              max={MAX_QUANTITY}
              onChange={(quantity) => updateQuantity(product.slug, quantity)}
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.slug)}
            className="cursor-pointer text-ink-soft underline underline-offset-4 type-badge hover:text-ink"
            aria-label={`Remove ${product.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}
