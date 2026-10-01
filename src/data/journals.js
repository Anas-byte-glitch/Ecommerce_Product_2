import { placeholders } from '../assets/placeholders'

// Article bodies come in the Journal phase.
export const journals = [
  {
    slug: 'the-art-of-everyday-elegance',
    tag: 'Styling',
    date: '2026-03-12',
    readTime: '6 min',
    title: 'The Art of Everyday Elegance',
    featured: true,
    image: placeholders.journalFeatured,
  },
  {
    slug: 'caring-for-jewelry-that-lasts',
    tag: 'Care Guide',
    date: '2026-04-04',
    readTime: '5 min',
    title: 'Caring for Jewelry That Lasts',
    image: placeholders.journal,
  },
  {
    slug: 'building-a-timeless-jewelry-collection',
    tag: 'Guide',
    date: '2026-05-18',
    readTime: '8 min',
    title: 'Building a Timeless Jewelry Collection',
    image: placeholders.journal,
  },
  {
    slug: 'why-timeless-design-never-fades',
    tag: 'Editorial',
    date: '2026-06-09',
    readTime: '7 min',
    title: 'Why Timeless Design Never Fades',
    image: placeholders.journal,
  },
]

export const getJournal = (slug) => journals.find((j) => j.slug === slug)
