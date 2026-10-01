import Button from './Button'

// Boxed message with a button ("This Collection Is Coming Soon").
export default function EmptyState({ title, cta }) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-[514px] flex-col items-center gap-6">
        <h2 className="text-balance text-center text-ink type-h4">{title}</h2>
        <Button to={cta.to}>{cta.label}</Button>
      </div>
    </div>
  )
}
