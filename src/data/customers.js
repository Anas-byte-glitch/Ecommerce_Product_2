import { placeholders } from '../assets/placeholders'
import { site } from '../config/site'

// "Featured Customers" strip (invented placeholder customers — replace with real, consenting customers).
// `product` must be the name of a product in products.js.
export const customers = [
  { id: 'jonas-keller', name: 'Jonas Keller', product: 'Quill Link Bracelet' },
  { id: 'amir-rahimi', name: 'Amir Rahimi', product: 'Pia Signet Ring' },
  { id: 'hannah-ellery', name: 'Hannah Ellery', product: 'Marlow Line Necklace' },
  { id: 'imogen-pryce', name: 'Imogen Pryce', product: 'Isla Pearl Pendant' },
  { id: 'dalia-reyes', name: 'Dalia Reyes', product: 'Corvin Hoop Earrings' },
  { id: 'esme-calloway', name: 'Esme Calloway', product: 'Wren Open Ring' },
].map((customer) => ({ ...customer, image: placeholders.portrait, link: site.social.instagram }))
