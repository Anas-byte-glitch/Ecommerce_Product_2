import { useEffect, useRef, useState } from 'react'
import { useCartCount } from '../../store/cartStore'
import { useWishlistCount } from '../../store/wishlistStore'

// Polite, visually hidden live region: announces cart / favourites count changes to screen
// readers (the navbar badges are only numbers). Silent on first render.
export default function LiveAnnouncer() {
  const cart = useCartCount()
  const wishlist = useWishlistCount()
  const previous = useRef({ cart, wishlist })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const before = previous.current
    previous.current = { cart, wishlist }
    if (cart !== before.cart) setMessage(`Cart updated: ${cart} ${cart === 1 ? 'item' : 'items'}`)
    else if (wishlist !== before.wishlist) setMessage(`Favourites updated: ${wishlist} ${wishlist === 1 ? 'item' : 'items'}`)
  }, [cart, wishlist])

  return (
    <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </p>
  )
}
