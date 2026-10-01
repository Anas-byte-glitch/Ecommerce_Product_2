import { useCartStore, useCartSummary } from '../../store/cartStore'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'
import Drawer from '../ui/Drawer'
import CartEmpty from './CartEmpty'
import CartLine from './CartLine'
import FreeShippingNote from './FreeShippingNote'

// Mounted once in Layout; opened from the navbar cart icon and after Add to Cart / Buy Now.
export default function CartDrawer() {
  const open = useCartStore((state) => state.isDrawerOpen)
  const close = useCartStore((state) => state.closeDrawer)
  const summary = useCartSummary()
  const empty = summary.lines.length === 0

  return (
    <Drawer
      open={open}
      onClose={close}
      title={`Cart (${summary.count})`}
      footer={
        !empty && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-ink type-h6">
              <span>Subtotal</span>
              <span>{formatPrice(summary.subtotal)}</span>
            </div>
            <FreeShippingNote summary={summary} />
            <div className="flex flex-col gap-2">
              <Button to="/checkout" onClick={close} className="w-full">
                Checkout
              </Button>
              <Button to="/cart" variant="muted" onClick={close} className="w-full">
                View cart
              </Button>
            </div>
          </div>
        )
      }
    >
      {empty ? (
        <CartEmpty onNavigate={close} />
      ) : (
        <ul className="divide-y divide-mist">
          {summary.lines.map((line) => (
            <CartLine key={line.slug} line={line} onNavigate={close} />
          ))}
        </ul>
      )}
    </Drawer>
  )
}
