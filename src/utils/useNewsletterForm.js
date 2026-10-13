import { useRef, useState } from 'react'
import { isValidEmail } from './validation'

// State + handlers for every newsletter sign-up form (single source of truth).
// UI ONLY: nothing is sent anywhere — this template has no backend. A valid submit just resets
// the field and flips `done` to true. To collect real sign-ups, call your own service inside
// `onSubmit` right before `setDone(true)`.
export function useNewsletterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const inputRef = useRef(null)

  const validate = (value) => {
    if (!value.trim()) return 'Please enter your email address.'
    if (!isValidEmail(value)) return 'Please enter a valid email address.'
    return ''
  }

  const onChange = (event) => {
    setEmail(event.target.value)
    setDone(false)
    if (error) setError(validate(event.target.value))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const found = validate(email)
    setError(found)
    if (found) {
      inputRef.current?.focus()
      return
    }
    setEmail('')
    setDone(true)
  }

  return { email, error, done, inputRef, onChange, onSubmit }
}
