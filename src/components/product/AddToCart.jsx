import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { cn } from '../../utils/cn'

const base =
  'flex h-10 w-full cursor-pointer items-center justify-center px-8 type-eyebrow transition-colors duration-300'

// "Add to Cart" (dark) + "Buy Now" (light grey) — the reference's Shopify purchase buttons,
// which never finish loading in the sandbox. Add to Cart adds `quantity`, opens the cart drawer
// and reads "Added" for 1.5s. Buy Now adds the same and goes straight to /checkout (no drawer).
export default function AddToCart({ slug, quantity }) {
  const addItem = useCartStore((state) => state.addItem)
  const openDrawer = useCartStore((state) => state.openDrawer)
  const navigate = useNavigate()
  const [added, setAdded] = useState(null)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const add = () => {
    addItem(slug, quantity)
    openDrawer()
    setAdded('cart')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(null), 1500)
  }

  const buyNow = () => {
    addItem(slug, quantity)
    navigate('/checkout')
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <button type="button" onClick={add} className={cn(base, 'bg-ink text-cream hover:bg-ink-hover')}>
        <span aria-live="polite">{added === 'cart' ? 'Added' : 'Add to Cart'}</span>
      </button>
      <button type="button" onClick={buyNow} className={cn(base, 'bg-mist text-ink hover:bg-white-hover')}>
        Buy Now
      </button>
    </div>
  )
}
