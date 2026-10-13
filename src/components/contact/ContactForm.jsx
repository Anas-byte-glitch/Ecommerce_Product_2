import { useRef, useState } from 'react'
import { placeholders } from '../../assets/placeholders'
import { cn } from '../../utils/cn'
import { isValidEmail, isValidPhone } from '../../utils/validation'
import Image from '../ui/Image'

const FIELDS = [
  { id: 'name', label: 'Name', placeholder: 'JANE SMITH', type: 'text', autoComplete: 'name', required: true },
  { id: 'phone', label: 'Phone', placeholder: '+01 1523 150 151', type: 'tel', autoComplete: 'tel', required: true },
  { id: 'email', label: 'Email', placeholder: 'JANE@SMITH.CO', type: 'email', autoComplete: 'email', required: true },
  { id: 'message', label: 'Your Message', placeholder: 'YOUR TEXT', required: false },
]
const empty = { name: '', phone: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.phone.trim()) errors.phone = 'Phone is required'
  else if (!isValidPhone(values.phone)) errors.phone = 'Enter a valid phone number (digits, spaces, + ( ) - only)'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address'
  return errors
}

const control =
  'w-full appearance-none rounded-none border-0 bg-transparent font-display text-base leading-[19.2px] text-ink placeholder:text-muted focus:outline-none'

// Photo (660 × stretches to the form on desktop; 0.73 ratio above the form below 1200px) next to
// the form. The reference uses browser validation and a hosted forms endpoint; this template has
// NO backend: a valid submit sends nothing anywhere — it only shows the "Thank You" state (in
// place of the photo, like the reference), the button reads "Thank you" and the form resets.
// Wire `onSubmit` to your own service to send real messages (see docs).
export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const formRef = useRef(null)

  const change = (id) => (event) => {
    const next = { ...values, [id]: event.target.value }
    setValues(next)
    setDone(false)
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const first = FIELDS.find((field) => found[field.id])
    if (first) {
      formRef.current?.querySelector(`#contact-${first.id}`)?.focus()
      return
    }
    // Nothing is sent: there is no backend in this template.
    setValues(empty)
    setErrors({})
    setSubmitted(false)
    setDone(true)
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      <div className="relative aspect-[736/1006] w-full overflow-hidden bg-mist lg:aspect-auto lg:w-[660px] lg:shrink-0">
        {done ? (
          <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white p-6 text-center">
            <h2 className="text-ink type-h2">Thank You</h2>
            <p className="max-w-[360px] text-ink-soft type-body">
              Your message was received (demo form: nothing is actually sent).
            </p>
          </div>
        ) : (
          <Image src={placeholders.promoTall} alt="" className="absolute inset-0 size-full object-cover" />
        )}
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-6 p-4 lg:flex-1">
        {FIELDS.map((field) => {
          const id = `contact-${field.id}`
          const error = errors[field.id]
          const props = {
            id,
            name: field.id,
            value: values[field.id],
            onChange: change(field.id),
            placeholder: field.placeholder,
            required: field.required,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? `${id}-error` : undefined,
          }
          return (
            <div key={field.id} className="flex flex-col gap-2.5">
              <label htmlFor={id} className="text-ink type-h6-lg">
                {field.label}
              </label>
              <div
                className={cn(
                  'bg-mist/30 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent',
                  field.type ? 'flex h-14 items-center px-4' : 'h-[200px] p-4',
                  error && 'outline-1 -outline-offset-1 outline-error',
                )}
              >
                {field.type ? (
                  <input type={field.type} autoComplete={field.autoComplete} className={cn(control, 'h-6')} {...props} />
                ) : (
                  <textarea className={cn(control, 'h-full resize-none')} {...props} />
                )}
              </div>
              {error && (
                <p id={`${id}-error`} className="text-error type-body">
                  {error}
                </p>
              )}
            </div>
          )
        })}
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center bg-ink px-8 py-3 text-cream type-link-lg transition-opacity duration-300 hover:opacity-85"
        >
          {done ? 'Thank you' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
