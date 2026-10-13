import { placeholders } from '../assets/placeholders'
import { site } from '../config/site'

// "Featured Customers" strip (invented placeholder customers — replace with real, consenting customers).
// `product` must be the name of a product in products.js.
export const customers = [
  { id: 'jonas-keller', name: 'Jonas Keller', product: 'Jasper Link Bracelet' },
  { id: 'amir-rahimi', name: 'Amir Rahimi', product: 'Corvin Signet Ring' },
  { id: 'hannah-ellery', name: 'Hannah Ellery', product: 'Tessa Line Necklace' },
  { id: 'imogen-pryce', name: 'Imogen Pryce', product: 'Marlow Pearl Pendant' },
  { id: 'dalia-reyes', name: 'Dalia Reyes', product: 'Calla Hoop Earrings' },
  { id: 'esme-calloway', name: 'Esme Calloway', product: 'Wren Open Ring' },
].map((customer) => ({ ...customer, image: placeholders.portrait, link: site.social.instagram }))
