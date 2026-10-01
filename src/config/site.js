// Brand + navigation config. Change the brand here; every component reads from this file.
export const site = {
  name: 'Glintura',
  // The wordmark renders `start` upright and `end` in italic ("Glin" + "tura").
  wordmark: { start: 'Glin', end: 'tura' },
  tagline: 'Discover timeless jewelry designed to become part of your everyday story',
  instagram: 'https://instagram.com',
  locale: 'en-US',
  currency: 'USD',
  // Neutral payment labels (no brand logos).
  payments: ['Card', 'Wallet', 'Bank', 'Pay Later', 'Cash'],
}

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
      { label: 'Instagram', href: site.instagram },
      { label: '404', to: '/404' },
    ],
  },
]
