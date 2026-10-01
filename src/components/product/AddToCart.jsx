import { useEffect, useRef, useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { cn } from '../../utils/cn'

const base =
  'flex h-10 w-full cursor-pointer items-center justify-center px-8 type-eyebrow transition-colors duration-300'

// "Add to Cart" (dark) + "Buy Now" (light grey) — the reference's Shopify purchase buttons,
// which never finish loading in the sandbox. Both add `quantity` to the cart; the clicked
// button reads "Added" for 1.5s. Checkout is not built yet (Buy Now behaves like Add to Cart).
export default function AddToCart({ slug, quantity }) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(null)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const add = (which) => {
    addItem(slug, quantity)
    setAdded(which)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <button type="button" onClick={() => add('cart')} className={cn(base, 'bg-ink text-cream hover:bg-ink-hover')}>
        <span aria-live="polite">{added === 'cart' ? 'Added' : 'Add to Cart'}</span>
      </button>
      <button type="button" onClick={() => add('buy')} className={cn(base, 'bg-mist text-ink hover:bg-white-hover')}>
        <span aria-live="polite">{added === 'buy' ? 'Added' : 'Buy Now'}</span>
      </button>
    </div>
  )
}
