// Shared form validation (checkout, contact). Client-side only.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/

export const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim())
export const isValidPhone = (value) => PHONE_PATTERN.test(value.trim()) && value.replace(/\D/g, '').length >= 7
