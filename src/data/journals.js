import { placeholders } from '../assets/placeholders'
import { site } from '../config/site'

// Journal articles read from the reference (2026-10-01): metadata, excerpt and the full body.
// Body blocks: { type: 'heading' | 'paragraph', text } or { type: 'list', items }.
// `date` is ISO (UTC), shown as "Mar 12, 2026" (see formatJournalDate).
export const journals = [
  {
    slug: 'the-art-of-everyday-elegance',
    tag: "Styling",
    date: '2026-03-12',
    readTime: "6 min",
    title: "The Art of Everyday Elegance",
    excerpt: "Discover how thoughtfully chosen jewelry transforms everyday moments into expressions of timeless elegance.",
    featured: true,
    image: placeholders.journalFeatured,
    body: [
      { type: 'heading', text: "Elegance Begins with Simplicity" },
      { type: 'paragraph', text: "Luxury isn't reserved for special occasions. It exists in the quiet confidence of wearing pieces that complement your individuality every single day. While fashion trends evolve with each season, refined jewelry remains a constant—adding depth, personality, and sophistication without demanding attention. Whether you're dressing for a morning meeting, a relaxed brunch, or an evening celebration, carefully selected jewelry becomes an extension of your personal style rather than simply an accessory." },
      { type: 'heading', text: "Choosing Pieces That Tell Your Story" },
      { type: 'paragraph', text: "The most memorable jewelry collections are built over time. Instead of chasing every trend, focus on versatile essentials that effortlessly adapt to different occasions. A delicate pendant necklace, polished hoop earrings, a refined bracelet, or a timeless ring can become everyday signatures you'll wear for years. These foundational pieces create a wardrobe that feels cohesive while allowing room to express individuality through seasonal additions." },
      { type: 'heading', text: "Mastering the Balance" },
      { type: 'paragraph', text: "Creating an elegant look is about harmony rather than abundance. Layer necklaces with varying lengths to create subtle dimension. Pair statement earrings with minimal necklaces, or let a bold bracelet become the focal point while keeping the rest understated. True sophistication comes from knowing what to leave out." },
      { type: 'heading', text: "Jewelry That Lives With You" },
      { type: 'paragraph', text: `Beautiful jewelry isn't meant to remain inside a jewelry box. Every piece collects memories—from celebrations and milestones to ordinary afternoons that unexpectedly become unforgettable. Over time, jewelry becomes deeply personal, carrying stories that extend far beyond its design. At ${site.name}, we believe the finest jewelry isn't simply worn. It's lived in.` },
    ],
  },
  {
    slug: 'caring-for-jewelry-that-lasts',
    tag: "Care Guide",
    date: '2026-04-04',
    readTime: "5 min",
    title: "Caring for Jewelry That Lasts",
    excerpt: "Simple care routines can preserve the beauty, brilliance, and longevity of your favorite jewelry.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Preserve the Beauty You Love" },
      { type: 'paragraph', text: "Exceptional craftsmanship deserves thoughtful care. While premium materials are designed to last, daily exposure to moisture, perfumes, cosmetics, and environmental elements can gradually affect their appearance. Developing a few simple habits helps maintain both shine and structural integrity." },
      { type: 'heading', text: "Everyday Care Matters" },
      { type: 'paragraph', text: "Before applying perfume, lotion, or hairspray, allow products to fully absorb before putting on your jewelry. After wearing your favorite pieces, gently wipe them with a soft microfiber cloth to remove oils and dust accumulated throughout the day. This small routine takes only moments but significantly extends the life of your jewelry." },
      { type: 'heading', text: "Proper Storage" },
      { type: 'paragraph', text: "Store each piece individually inside a soft pouch or lined jewelry box. Separating necklaces prevents tangles, while storing rings and bracelets individually helps minimize scratches. Keep your collection away from direct sunlight, humidity, and excessive heat whenever possible. A dedicated jewelry organizer protects both appearance and craftsmanship." },
      { type: 'heading', text: "Creating Lasting Memories" },
      { type: 'paragraph', text: "Jewelry often celebrates life's most meaningful moments. By caring for each piece with intention, you're preserving more than precious materials—you're protecting the memories and milestones they represent. Timeless jewelry deserves timeless care." },
    ],
  },
  {
    slug: 'building-a-timeless-jewelry-collection',
    tag: "Guide",
    date: '2026-05-18',
    readTime: "8 min",
    title: "Building a Timeless Jewelry Collection",
    excerpt: "A thoughtfully curated jewelry collection is built on timeless essentials that remain beautiful through every season.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Invest in Timeless Design" },
      { type: 'paragraph', text: "The strongest jewelry collections aren't the largest—they're the most versatile. Instead of following rapidly changing trends, begin with foundational pieces that naturally complement your everyday wardrobe. These essentials create endless styling possibilities while remaining relevant year after year. Quality always outlives quantity." },
      { type: 'heading', text: "Start with the Essentials" },
      { type: 'paragraph', text: "Every timeless collection benefits from a few signature pieces:" },
      { type: 'list', items: ["A classic pendant necklace", "Polished hoop earrings", "Everyday stud earrings", "A refined tennis bracelet", "A minimalist statement ring"] },
      { type: 'paragraph', text: "These designs transition effortlessly from casual mornings to elegant evenings." },
      { type: 'heading', text: "Add Personality with Intention" },
      { type: 'paragraph', text: "Once your essentials are established, introduce pieces that reflect your personal style. Layer different chain lengths, experiment with textures, or incorporate subtle statement pieces that add individuality without overwhelming your look. A curated collection evolves naturally, becoming more meaningful with every addition." },
      { type: 'heading', text: "Jewelry That Grows with You" },
      { type: 'paragraph', text: `The most treasured collections are never completed overnight. Each piece marks a chapter—celebrating achievements, relationships, milestones, and unforgettable memories. Over time, your jewelry becomes a visual story of your journey. At ${site.name}, we design jewelry intended to accompany every stage of that story.` },
    ],
  },
  {
    slug: 'why-timeless-design-never-fades',
    tag: "Editorial",
    date: '2026-06-09',
    readTime: "7 min",
    title: "Why Timeless Design Never Fades",
    excerpt: "While trends come and go, timeless design continues to define elegance across every generation.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Beyond Seasonal Trends" },
      { type: 'paragraph', text: "Fashion constantly reinvents itself, introducing new colors, silhouettes, and aesthetics every year. Yet certain jewelry designs continue to feel effortlessly modern regardless of changing trends. Their beauty lies in thoughtful proportions, refined craftsmanship, and understated sophistication. True luxury isn't temporary—it endures." },
      { type: 'heading', text: "The Value of Enduring Craftsmanship" },
      { type: 'paragraph', text: "Timeless jewelry begins long before it's worn. Every detail—from balanced proportions to carefully selected materials—is designed with longevity in mind. Quality craftsmanship ensures each piece maintains its elegance through years of everyday wear. Luxury is measured not by excess, but by intention." },
      { type: 'heading', text: "Confidence Over Complexity" },
      { type: 'paragraph', text: "The most elegant pieces never compete for attention. Instead, they complement the wearer, adding quiet confidence and refinement to every outfit. Whether paired with tailored clothing or relaxed essentials, timeless jewelry always feels appropriate. Its versatility is precisely what makes it indispensable." },
      { type: 'heading', text: "A Legacy of Everyday Luxury" },
      { type: 'paragraph', text: `At ${site.name}, we believe jewelry should transcend passing trends. Our collections are designed to become lasting companions—pieces chosen not just for today, but for the years, celebrations, and memories still to come. Because true elegance is never defined by a season. It is defined by time.` },
    ],
  },
]

export const getJournal = (slug) => journals.find((j) => j.slug === slug)

// "Previous" / "Next" article in list order (undefined at the ends).
export const getAdjacentJournals = (slug) => {
  const index = journals.findIndex((j) => j.slug === slug)
  return { previous: journals[index - 1], next: journals[index + 1] }
}

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
export const formatJournalDate = (iso) => dateFormat.format(new Date(iso))
