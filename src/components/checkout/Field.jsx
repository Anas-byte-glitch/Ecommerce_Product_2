import { cn } from '../../utils/cn'

const control =
  'h-12 w-full appearance-none rounded-none border bg-white px-4 font-body text-base text-ink placeholder:text-muted'

// Labelled input / select with an inline error (aria-invalid + aria-describedby).
export default function Field({ id, label, error, as = 'input', className, children, ...props }) {
  const Control = as
  const errorId = `${id}-error`
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-ink type-eyebrow">
        {label}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(control, error ? 'border-error' : 'border-mist')}
        {...props}
      >
        {children}
      </Control>
      {error && (
        <p id={errorId} className="text-error type-body">
          {error}
        </p>
      )}
    </div>
  )
}
