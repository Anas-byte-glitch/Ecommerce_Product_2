import { site } from '../config/site'

// About page texts (original placeholder wording — adapt it to your own story).
export const beliefs = [
  {
    title: 'Where We Began',
    text: `${site.name} started with a simple idea: jewelry should feel personal. We design clean, lasting pieces that suit the way real people live, work and get dressed throughout the day.`,
  },
  {
    title: 'What We Believe',
    text: 'Good jewelry should outlast fashion. We aim for calm shapes, honest materials and a fit that feels just right, on the first day you wear a piece and on the thousandth.',
  },
  {
    title: 'How We Make It',
    text: 'We choose each metal with care, test every clasp and finish every surface by hand. Nothing here is meant to sit in a drawer: our pieces are made to be worn daily, loved for years and handed on to someone who will love them.',
  },
  {
    title: 'Our Promise',
    text: 'Each item is checked before it leaves us, made from sound materials with steady craftsmanship, so that it keeps its look, its comfort and its value.',
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
    text: 'Bright, cool and endlessly adaptable, sterling silver gives a clean polish that suits both quiet weekdays and dressed-up evenings out.',
  },
  {
    title: 'Gold',
    text: 'Warm, glowing and generous, our gold-tone pieces bring a gentle, lasting richness to anything you wear them with, day or night.',
  },
  {
    title: 'Titanium',
    text: 'Very light yet remarkably tough, titanium resists scratches and keeps its colour, which makes it a comfortable choice for everyday use.',
  },
]

// Reading order on desktop is column by column: 01, 03 (left) and 02, 04 (right) — the
// `column` field says where each card goes around the tall image.
export const reasons = [
  { n: '01.', title: 'Honest Materials Only', column: 'left', text: 'We pick metals and finishes that hold up well, so each piece stays good-looking through daily wear.' },
  { n: '02.', title: 'Comfort First', column: 'right', text: 'Smooth edges, even weight and clasps that hold: comfort comes first, always.' },
  { n: '03.', title: 'Shapes That Last', column: 'left', text: 'Simple forms drawn from classic jewelry-making, chosen because they never feel dated.' },
  { n: '04.', title: 'Finished By Hand, Always', column: 'right', text: 'Every surface is checked and polished with patience, for a smooth and quietly luxurious feel.' },
]

export const founder = {
  name: 'Maren Ashby',
  role: 'Founder',
  quote: `" ${site.name} exists because lovely jewelry deserves to be worn on ordinary days, not kept in a drawer for a special one"`,
}
