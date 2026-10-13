// ─────────────────────────────────────────────────────────────────────────────
// STORE SETTINGS — the one place to edit. Every component reads from this file.
//
//  name / wordmark      Brand name used in the navbar, footer, titles, legal texts and emails.
//                       The wordmark shows `start` upright and `end` in italic (start + end = name).
//  tagline              Footer sentence under the logo.
//  description          Default meta description (injected into index.html at build time).
//  siteUrl              Public address of the shop, no trailing slash (used for canonical/sitemap files).
//  locale / currency    Intl formatting for every price: e.g. 'en-US'/'USD', 'de-DE'/'EUR', 'en-GB'/'GBP'.
//  currencyDisplay      'symbol' ($, €), 'code' (USD) or 'name' (US dollars).
//  showPrices           Show the price under product-card titles (product page, cart, checkout always do).
//  freeShippingThreshold / flatShipping
//                       Free shipping from this subtotal (in the currency above), else a flat fee.
//  deliveryEstimate     Text shown next to "Standard delivery" at checkout.
//  returnWindowDays / damageReportDays / refundTime
//                       Quoted in the legal pages (/refund-policy, /terms).
//  contactEmail / contactPhone / officeAddress / businessHours
//                       Shown on /contact and in the legal pages (placeholders — replace them).
//  social               Social links (footer, featured customers).
//  orderPrefix          Demo order numbers look like "ORV-4K7Q2M".
//  homeVideoSrc         Optional looping video for the home About block ('' = still image).
//  footerCta            The dark button under the footer tagline.
// ─────────────────────────────────────────────────────────────────────────────
export const site = {
  name: 'Orvelle',
  // The wordmark renders `start` upright and `end` in italic ("Orve" + "lle").
  wordmark: { start: 'Orve', end: 'lle' },
  tagline: 'Discover timeless jewelry designed to become part of your everyday story',
  description: 'Timeless jewelry designed to become part of your everyday story.',
  siteUrl: 'https://example.com',
  social: { instagram: 'https://instagram.com' },
  locale: 'en-US',
  currency: 'USD',
  currencyDisplay: 'symbol',
  // Neutral payment labels (no brand logos). Order matters: the 3rd pill is the widest.
  payments: ['Card', 'Bank', 'Pay Later', 'Wallet', 'Cash'],
  // Show a placeholder price under product-card titles (the reference shows none).
  showPrices: true,
  // Contact details shown on /contact — clearly fake placeholders, replace with your own.
  contactEmail: 'hello@example.com',
  contactPhone: '+1 000 000 0000',
  officeAddress: 'Example Studio, 100 Placeholder Avenue, Sample City, ST 00000, Country',
  // Used by the legal pages (src/data/legal.js) — adjust to your real policy.
  returnWindowDays: 30,
  damageReportDays: 7,
  refundTime: '5–10 business days',
  businessHours: 'Monday – Friday, 9:00 AM – 6:00 PM',
  // Cart placeholders (in the currency above): free shipping from this subtotal, otherwise a flat rate.
  freeShippingThreshold: 150,
  flatShipping: 8,
  deliveryEstimate: '3–5 business days',
  // Order numbers look like "GLN-4K7Q2M" (demo checkout).
  orderPrefix: 'ORV',
  // Optional background video for the home "About Us" block (muted, looping). Empty = poster only.
  homeVideoSrc: '',
  // Dark button under the footer tagline (stands in for the reference's "Buy template").
  footerCta: { label: 'Shop Now', to: '/shop' },
}

// Prefix for localStorage keys (cart, wishlist), derived from the brand name.
export const storagePrefix = site.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const mainNav = [
  { label: 'Collections', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journals' },
  { label: 'Contact', to: '/contact' },
]

// Shared by the footer and the mobile menu.
export const footerColumns = [
  {
    title: 'Navigation',
    links: [
      { label: "Women's Collection", to: '/women-category' },
      { label: "Men's Collection", to: '/men-category' },
      { label: 'Favourites', to: '/favourite' },
      // Fourth slot = the reference's "My Account" (Shopify), which is not built.
      { label: 'Collections', to: '/shop' },
    ],
  },
  {
    title: 'Pages',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Journals', to: '/journals' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Others',
    links: [
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Instagram', href: site.social.instagram },
    ],
  },
]
