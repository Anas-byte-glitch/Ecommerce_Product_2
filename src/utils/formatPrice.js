import { site } from '../config/site'

const formatter = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: site.currency,
})

export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return ''
  return formatter.format(amount)
}
