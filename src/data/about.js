import { site } from '../config/site'

// About page texts (original placeholder wording — adapt it to your own story).
export const beliefs = [
  {
    title: 'Where We Began',
    text: `${site.name} started with a simple idea: jewelry should feel personal. We design clean, lasting pieces that suit the way people really live and dress.`,
  },
  {
    title: 'What We Believe',
    text: 'Good jewelry should outlast fashion. We aim for calm shapes, honest materials and a fit that feels right on the first day and the thousandth.',
  },
  {
    title: 'How We Make It',
    text: 'We choose metals with care, test every clasp and finish each surface by hand. Our pieces are made to be worn daily, loved for years and handed down when the time comes.',
  },
  {
    title: 'Our Promise',
    text: 'Each item is checked before it leaves us, using sound materials and steady craftsmanship, so that it keeps its look, its comfort and its value.',
  },
]

// Final values of the count-up (0 → value, formatted with thousands separators).
export const stats = [
  { value: 3000, suffix: '+', label: 'Customers Served' },
  { value: 14, suffix: '+', label: 'Collections' },
  { value: 20, suffix: '+', label: 'Countries Shipped To' },
  { value: 25, suffix: '+', label: 'Pieces In Range' },
]

export const materials = [
  {
    title: 'Silver',
    text: 'Bright, cool and endlessly adaptable, sterling silver gives a clean polish that suits both quiet days and dressed-up evenings.',
  },
  {
    title: 'Gold',
    text: 'Warm, glowing and generous, our gold-tone pieces bring a gentle richness to anything you wear them with.',
  },
  {
    title: 'Titanium',
    text: 'Very light yet remarkably tough, titanium resists scratches and keeps its colour, which makes it a comfortable choice for daily use.',
  },
]

// Reading order on desktop is column by column: 01, 03 (left) and 02, 04 (right) — the
// `column` field says where each card goes around the tall image.
export const reasons = [
  { n: '01.', title: 'Honest Materials', column: 'left', text: 'We pick metals and finishes that hold up, so each piece stays good-looking through daily wear.' },
  { n: '02.', title: 'Built For Daily Wear', column: 'right', text: 'Comfort comes first: smooth edges, balanced weight and clasps that stay put.' },
  { n: '03.', title: 'Calm, Lasting Shapes', column: 'left', text: 'Simple forms drawn from classic jewelry-making, chosen because they never feel dated.' },
  { n: '04.', title: 'Finished By Hand', column: 'right', text: 'Every surface is checked and polished with patience, for a smooth and quietly luxurious feel.' },
]

export const founder = {
  name: 'Maren Ashby',
  role: 'Founder',
  quote: `" ${site.name} exists because lovely jewelry deserves to be worn on ordinary days, not kept in a drawer for a special one"`,
}
