import { useId } from 'react'
import { cn } from '../../utils/cn'
import { useNewsletterForm } from '../../utils/useNewsletterForm'

// Email + "Subscribe" row (measured: 53px tall, button 120 / 180px wide) used by every newsletter
// sign-up. Validates in JS (noValidate), shows the error inline, returns focus to the field on
// error and announces the result through a polite live region. Nothing is sent (see the hook).
export default function NewsletterForm({ className }) {
  const { email, error, done, inputRef, onChange, onSubmit } = useNewsletterForm()
  const uid = useId()
  const errorId = `${uid}-error`

  return (
    <div className={cn('w-full md:max-w-[481px]', className)}>
      <form noValidate onSubmit={onSubmit} className="relative flex w-full">
        <label htmlFor={`${uid}-email`} className="sr-only">
          Email address
        </label>
        <input
          ref={inputRef}
          id={`${uid}-email`}
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="email"
          placeholder="your@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="h-[53px] w-full appearance-none rounded-none bg-white py-4 pr-[136px] pl-4 font-display text-base/none text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:pr-[196px]"
        />
        <button
          type="submit"
          className="absolute inset-y-1 right-1 w-[120px] cursor-pointer bg-ink px-4 font-display text-[18px]/none text-cream transition-opacity duration-300 hover:opacity-85 md:w-[180px] md:text-[20px]/none"
        >
          Subscribe
        </button>
      </form>
      {error && (
        <p id={errorId} className="mt-2 w-fit bg-error px-2 py-1 text-white type-badge">
          {error}
        </p>
      )}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          done ? 'mt-2 w-fit bg-white px-2 py-1 text-ink type-badge' : 'sr-only',
        )}
      >
        {done ? 'Thank you for subscribing! (Demo form: nothing was sent.)' : ''}
      </p>
    </div>
  )
}
