import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { site } from '../config/site'
import { useCartStore, useCartSummary } from '../store/cartStore'
import { useOrderStore } from '../store/orderStore'
import { formatPrice } from '../utils/formatPrice'
import { cn } from '../utils/cn'
import Field from '../components/checkout/Field'
import OrderSummary from '../components/checkout/OrderSummary'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'

const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Other']
const FIELDS = ['email', 'name', 'phone', 'address', 'city', 'postalCode', 'country']
const LABELS = {
  email: 'Email',
  name: 'Full name',
  phone: 'Phone',
  address: 'Address',
  city: 'City',
  postalCode: 'Postal code',
  country: 'Country',
}
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9\s().-]{7,20}$/

function validate(values) {
  const errors = {}
  for (const field of FIELDS) {
    if (!values[field].trim()) errors[field] = `${LABELS[field]} is required`
  }
  if (!errors.email && !EMAIL.test(values.email.trim())) errors.email = 'Enter a valid email address'
  if (!errors.phone && (!PHONE.test(values.phone.trim()) || values.phone.replace(/\D/g, '').length < 7)) {
    errors.phone = 'Enter a valid phone number (digits, spaces, + ( ) - only)'
  }
  return errors
}

const orderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const random = Array.from(crypto.getRandomValues(new Uint32Array(6)), (n) => chars[n % chars.length]).join('')
  return `${site.orderPrefix}-${random}`
}

function Section({ title, children }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 text-ink type-h6-lg">{title}</legend>
      {children}
    </fieldset>
  )
}

// Demo checkout: client-side validation only, no payment details are ever collected.
export default function Checkout() {
  const summary = useCartSummary()
  const clearCart = useCartStore((state) => state.clearCart)
  const setLastOrder = useOrderStore((state) => state.setLastOrder)
  const navigate = useNavigate()
  const formRef = useRef(null)
  const placed = useRef(false)
  const [values, setValues] = useState({ email: '', name: '', phone: '', address: '', city: '', postalCode: '', country: '' })
  const [payment, setPayment] = useState('card')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (summary.lines.length === 0 && !placed.current) return <Navigate to="/cart" replace />

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    // After the first submit, errors update live (and clear once fixed).
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const first = FIELDS.find((field) => found[field])
    if (first) {
      formRef.current?.querySelector(`#${first}`)?.focus()
      return
    }
    placed.current = true
    setLastOrder({
      id: orderId(),
      createdAt: new Date().toISOString(),
      customer: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])),
      payment: payment === 'card' ? 'Card (demo)' : 'Cash on delivery',
      lines: summary.lines,
      count: summary.count,
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      total: summary.total,
    })
    clearCart()
    navigate('/checkout/success')
  }

  const field = (id, props = {}) => (
    <Field id={id} label={LABELS[id]} value={values[id]} onChange={update(id)} error={errors[id]} {...props} />
  )

  return (
    <section className="pt-[180px] pb-section-sm lg:pb-section">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="text-ink type-display">Complete Your Order</h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-10 lg:flex-1">
            <Section title="Contact">
              {field('email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
            </Section>

            <Section title="Delivery">
              {field('name', { autoComplete: 'name' })}
              {field('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
              {field('address', { autoComplete: 'street-address' })}
              <div className="grid gap-4 md:grid-cols-2">
                {field('city', { autoComplete: 'address-level2' })}
                {field('postalCode', { autoComplete: 'postal-code' })}
              </div>
              {field('country', {
                as: 'select',
                autoComplete: 'country-name',
                children: [
                  <option key="" value="">
                    Select a country
                  </option>,
                  ...COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )),
                ],
              })}
            </Section>

            <Section title="Shipping method">
              <div className="flex items-center justify-between border border-mist bg-white px-4 py-3">
                <span className="text-ink type-body">Standard delivery (3–5 business days)</span>
                <span className="text-ink type-body">{summary.shipping === 0 ? 'Free' : formatPrice(summary.shipping)}</span>
              </div>
            </Section>

            <Section title="Payment">
              <p className="text-ink-soft type-body">
                This is a demo checkout: no payment is taken and no card details are collected.
              </p>
              {[
                { value: 'card', label: 'Card (demo)' },
                { value: 'cod', label: 'Cash on delivery' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 border bg-white px-4 py-3 text-ink type-body',
                    payment === option.value ? 'border-ink' : 'border-mist',
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={payment === option.value}
                    onChange={() => setPayment(option.value)}
                    className="size-4 accent-ink"
                  />
                  {option.label}
                </label>
              ))}
            </Section>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center bg-ink px-8 py-3 text-cream type-link-lg transition-opacity duration-300 hover:opacity-85"
            >
              Place order · {formatPrice(summary.total)}
            </button>
          </form>

          <OrderSummary summary={summary} className="lg:sticky lg:top-24 lg:w-[452px]" />
        </div>
      </Container>
    </section>
  )
}
