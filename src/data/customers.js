import { placeholders } from '../assets/placeholders'
import { site } from '../config/site'

// "Featured Customers" strip. Product names are as shown on the reference.
export const customers = [
  { id: 'ethan-parker', name: 'Ethan Parker', product: 'Titan Link Bracelet' },
  { id: 'noah-bennett', name: 'Noah Bennett', product: 'Atlas Signet Ring' },
  { id: 'emma-carter', name: 'Emma Carter', product: 'Aurora Bar Necklace' },
  { id: 'olivia-brooks', name: 'Olivia Brooks', product: 'Aurora Bar Necklace' },
  { id: 'sophia-mitchell', name: 'Sophia Mitchell', product: 'Luna Hoop Earrings' },
  { id: 'charlotte-hayes', name: 'Charlotte Hayes', product: 'Nova Signet Ring' },
].map((customer) => ({ ...customer, image: placeholders.square, link: site.instagram }))
