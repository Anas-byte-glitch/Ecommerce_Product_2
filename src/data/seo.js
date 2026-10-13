import { site } from '../config/site'

// Meta descriptions (≈ 120–160 characters, original wording). The brand, return window and
// currency-free facts come from src/config/site.js; titles live on the routes (App.jsx `handle`).
export const pageDescriptions = {
  home: `${site.name} makes everyday jewelry made to be layered, lived in and kept: necklaces, rings, bracelets and earrings for women and men.`,
  shop: `Browse every ${site.name} piece in one place. Filter by type, sort by what is new or most loved, and find your next favourite.`,
  favourites: `Your saved ${site.name} pieces, kept in one list so you can come back to them when you are ready.`,
  cart: `Review the pieces in your ${site.name} cart before checking out.`,
  checkout: `Checkout at ${site.name}.`,
  about: `The story, materials and beliefs behind ${site.name}, and why we design jewelry to last well beyond a single season.`,
  contact: `Questions about an order, sizing or care? Write to the ${site.name} team and read our most common answers.`,
  journals: `Stories, styling ideas and care guides from the ${site.name} journal: how to wear, layer and look after jewelry you will keep for years.`,
  terms: `The terms that apply when you browse or buy from ${site.name}, covering orders, payment, shipping, returns and use of this website.`,
  privacy: `How ${site.name} collects, uses and protects your personal information, and the choices you have about your data.`,
  refund: `Returns, exchanges and refunds at ${site.name}: ${site.returnWindowDays} days to send an item back, and what to do if something arrives damaged.`,
  notFound: `This page could not be found. Head back to ${site.name} and keep browsing.`,
}

export const audienceDescription = (audience) =>
  `${audience.label} at ${site.name}: ${audience.title.toLowerCase()}. Explore every collection in one place.`

export const collectionDescription = (collection) =>
  `${collection.title} by ${site.name}: ${collection.products.length} carefully made ${collection.products.length === 1 ? 'piece' : 'pieces'} for everyday wear, from first look to final detail.`

export const productDescriptionForMeta = (product) =>
  `${product.name}: ${product.categoryLabel.toLowerCase()} from ${site.name}. ${product.description ?? ''}`.trim()
