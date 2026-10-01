import { Link } from 'react-router-dom'
import { useCartSummary } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import CartEmpty from '../components/cart/CartEmpty'
import CartLine from '../components/cart/CartLine'
import FreeShippingNote from '../components/cart/FreeShippingNote'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'

function Row({ label, value, strong = false }) {
  return (
    <div className={strong ? 'flex justify-between text-ink type-h6-lg' : 'flex justify-between text-ink-soft type-body'}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

// /cart: lines on the left, sticky order summary on the right from 1200px; stacked below.
// No shared sections on this page.
export default function Cart() {
  const summary = useCartSummary()
  const empty = summary.lines.length === 0

  return (
    <section className="pt-[180px] pb-section-sm lg:pb-section">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Your Cart</Eyebrow>
          <h1 className="text-ink type-display">Shopping Cart</h1>
        </div>

        {empty ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
            <ul className="divide-y divide-mist border-y border-mist lg:flex-1" aria-label="Cart items">
              {summary.lines.map((line) => (
                <CartLine key={line.slug} line={line} size="large" />
              ))}
            </ul>

            <aside aria-label="Order summary" className="flex flex-col gap-6 bg-smoke p-6 lg:sticky lg:top-24 lg:w-[452px]">
              <h2 className="text-ink type-h6-lg">Order summary</h2>
              <dl className="flex flex-col gap-3">
                <Row label={`Subtotal (${summary.count} ${summary.count === 1 ? 'item' : 'items'})`} value={formatPrice(summary.subtotal)} />
                <Row label="Shipping" value={summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping)} />
                <div className="border-t border-mist pt-3">
                  <Row label="Total" value={formatPrice(summary.total)} strong />
                </div>
              </dl>
              <FreeShippingNote summary={summary} />
              <div className="flex flex-col items-center gap-4">
                <Button to="/checkout" className="w-full">
                  Checkout
                </Button>
                <Link to="/shop" className="text-ink underline underline-offset-4 type-eyebrow hover:text-ink-hover">
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </section>
  )
}
