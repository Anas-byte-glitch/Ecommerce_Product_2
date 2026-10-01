import { Minus, Plus } from 'lucide-react'

// 165 × 32 white control: − / value / + (40px hit areas). Minus is disabled at 1.
export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  const buttonClass =
    'grid size-10 shrink-0 cursor-pointer place-items-center text-ink disabled:cursor-default disabled:text-muted'
  return (
    <div className="flex h-8 w-[165px] items-center justify-between bg-white px-2" role="group" aria-label="Quantity">
      <button type="button" className={buttonClass} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="font-display text-base/none font-semibold text-ink">
        {value}
      </output>
      <button type="button" className={buttonClass} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  )
}
