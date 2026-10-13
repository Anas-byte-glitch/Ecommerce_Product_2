import { site } from '../config/site'

// Texts read from the reference About page (2026-10-01).
export const beliefs = [
  {
    title: 'Our Story',
    text: `Born from a passion for modern elegance, ${site.name} creates timeless jewelry that celebrates individuality through thoughtful design and exceptional craftsmanship.`,
  },
  {
    title: 'Our Philosophy',
    text: 'To redefine everyday luxury through thoughtfully designed jewelry that transcends trends, celebrates individuality, and remains timeless across every generation.',
  },
  {
    title: 'Our Craft',
    text: 'From carefully selected materials to meticulous finishing, every detail reflects our pursuit of quality. We create jewelry with purpose—pieces that are meant to be worn often, cherished deeply, and passed on with meaning.',
  },
  {
    title: 'Our Standards',
    text: 'Every piece is crafted with premium materials, refined by skilled artisans, and carefully inspected to ensure lasting beauty, comfort, and quality.',
  },
]

// Final values of the count-up (0 → value, formatted with thousands separators).
export const stats = [
  { value: 2000, suffix: '+', label: 'Happy Customers' },
  { value: 25, suffix: '+', label: 'Collection' },
  { value: 15, suffix: '+', label: 'Country Served' },
  { value: 25, suffix: '+', label: 'Product Designed' },
]

export const materials = [
  {
    title: 'Silver',
    text: 'Timeless and versatile, sterling silver offers a brilliant shine with a refined finish. Designed for everyday elegance and lasting style.',
  },
  {
    title: 'Gold',
    text: 'Warm, radiant, and effortlessly luxurious. Our gold pieces are crafted to add a touch of sophistication to every occasion.',
  },
  {
    title: 'Titanium',
    text: 'Exceptionally lightweight yet incredibly strong, titanium is built for everyday comfort with outstanding durability and a modern finish.',
  },
]

// Reading order on desktop is column by column: 01, 03 (left) and 02, 04 (right) — the
// `column` field says where each card goes around the tall image.
export const reasons = [
  { n: '01.', title: 'Premium Materials', column: 'left', text: 'Only carefully selected metals and finishes are used to ensure lasting beauty and everyday durability.' },
  { n: '02.', title: 'Made To Last', column: 'right', text: 'Designed for daily wear with exceptional durability, comfort, and lasting quality.' },
  { n: '03.', title: 'Timeless Design', column: 'left', text: 'Modern silhouettes inspired by classic craftsmanship that never go out of style.' },
  { n: '04.', title: 'Crafted With Care', column: 'right', text: 'Every piece is finished with precision and attention to detail for a refined, luxurious feel.' },
]

export const founder = {
  name: 'Maren Ashby',
  role: 'Founder',
  quote: `" ${site.name} was built on the belief that beautiful jewelry should be worn, loved, and remembered not saved for special occasions"`,
}
