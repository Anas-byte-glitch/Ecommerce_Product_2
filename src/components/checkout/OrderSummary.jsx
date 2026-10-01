import { formatPrice } from '../../utils/formatPrice'

function Row({ label, value, strong = false }) {
  return (
    <div className={strong ? 'flex justify-between text-ink type-h6-lg' : 'flex justify-between text-ink-soft type-body'}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

// Lines (thumbnail, name, quantity, line total) + subtotal / shipping / total. Prices always show.
// Takes either a live cart summary or a placed order (same shape).
export default function OrderSummary({ summary, title = 'Order summary', className }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-6 bg-smoke p-6">
        <h2 className="text-ink type-h6-lg">{title}</h2>
        <ul className="flex flex-col gap-4">
          {summary.lines.map((line) => (
            <li key={line.slug} className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden bg-mist">
                <img src={line.product.images[0]} alt="" className="absolute inset-0 size-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-ink type-h6">{line.product.name}</p>
                <p className="text-ink-soft type-badge">Qty {line.quantity}</p>
              </div>
              <p className="shrink-0 text-ink type-body">{formatPrice(line.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <dl className="flex flex-col gap-3 border-t border-mist pt-4">
          <Row label="Subtotal" value={formatPrice(summary.subtotal)} />
          <Row label="Shipping" value={summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping)} />
          <div className="border-t border-mist pt-3">
            <Row label="Total" value={formatPrice(summary.total)} strong />
          </div>
        </dl>
      </div>
    </div>
  )
}
