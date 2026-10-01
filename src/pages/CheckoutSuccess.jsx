import { Navigate } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import OrderSummary from '../components/checkout/OrderSummary'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'

// Thank-you page for the order kept in memory; after a refresh there is no order → home.
export default function CheckoutSuccess() {
  const order = useOrderStore((state) => state.lastOrder)
  if (!order) return <Navigate to="/" replace />

  return (
    <section className="pt-[180px] pb-section-sm lg:pb-section">
      <Container className="flex flex-col items-center gap-12">
        <div className="flex max-w-[640px] flex-col items-center gap-4 text-center">
          <Eyebrow>Order Confirmed</Eyebrow>
          <h1 className="text-ink type-display">Thank You</h1>
          <p className="text-ink-soft type-body-lg">
            Your order <strong className="font-bold text-ink">{order.id}</strong> has been placed. A
            confirmation would be sent to {order.customer.email}.
          </p>
          <p className="text-ink-soft type-body">Payment: {order.payment}</p>
        </div>
        <OrderSummary summary={order} title={`Order ${order.id}`} className="w-full max-w-[640px]" />
        <Button to="/shop">Continue shopping</Button>
      </Container>
    </section>
  )
}
