import { formatPrice } from '../../utils/formatPrice'

// One line under the subtotal: how much is left for free shipping, or that it is unlocked.
export default function FreeShippingNote({ summary }) {
  return (
    <p className="text-ink-soft type-body" aria-live="polite">
      {summary.freeShipping
        ? "You've unlocked free shipping"
        : `Add ${formatPrice(summary.remainingForFreeShipping)} more for free shipping`}
    </p>
  )
}
