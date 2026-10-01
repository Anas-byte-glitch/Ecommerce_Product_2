import Button from '../ui/Button'

// Shared empty state for the drawer and /cart.
export default function CartEmpty({ onNavigate }) {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="flex flex-col gap-2">
        <h3 className="text-ink type-h6-lg">Your cart is empty</h3>
        <p className="text-ink-soft type-body">Have a look at our pieces and find your signature.</p>
      </div>
      <Button to="/shop" onClick={onNavigate}>
        Continue shopping
      </Button>
    </div>
  )
}
