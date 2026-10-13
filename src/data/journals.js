import { placeholders } from '../assets/placeholders'
import { site } from '../config/site'

// Journal articles (original placeholder articles — replace them with your own).
// Body blocks: { type: 'heading' | 'paragraph', text } or { type: 'list', items }.
// `date` is ISO (UTC), shown as "Mar 12, 2026" (see formatJournalDate).
export const journals = [
  {
    slug: 'dressing-up-an-ordinary-day',
    tag: "Styling",
    date: '2026-03-12',
    readTime: "6 min",
    title: "Dressing Up an Ordinary Day",
    excerpt: "See how a few well-chosen pieces can lift a regular day and make your usual outfits feel more like you.",
    featured: true,
    image: placeholders.journalFeatured,
    body: [
      { type: 'heading', text: "Start With Something Simple" },
      { type: 'paragraph', text: "You do not need an occasion to wear something lovely. The jewelry that earns its place is the kind you put on without thinking, because it feels like part of you. Styles shift every season, yet a good chain or a neat pair of hoops keeps working, adding a little polish and character without asking for attention. Whether you are heading to a meeting, a long lunch or a night out, the right pieces do not decorate an outfit so much as finish it, quietly and in your own voice." },
      { type: 'heading', text: "Pick Pieces With a Purpose" },
      { type: 'paragraph', text: "The best collections grow slowly. Rather than following every trend, begin with versatile basics that move easily between settings. A slim pendant, a pair of smooth hoops, a comfortable bracelet or a ring you love can all become signatures that stay with you for years. Together they form a base that makes getting dressed easier, because each piece already agrees with the others and with most of what hangs in your wardrobe." },
      { type: 'heading', text: "Keep Balance in Mind" },
      { type: 'paragraph', text: "A confident look usually has one point of interest. If you wear a bold ring, let the earrings stay small. If the necklace is long and eye-catching, keep your wrists simple. Mixing gold and silver is fine too, as long as the proportions feel calm. Trust your eye, and leave a little space around each piece so it can be seen." },
      { type: 'heading', text: "Wear It, Don't Save It" },
      { type: 'paragraph', text: "Jewelry looks best when it is worn and enjoyed. Treat your favourite pieces as part of your routine rather than something to bring out once a year. Each wear adds a small memory, and with gentle care the pieces you choose today will still look right on you long into the future, ready to be handed on to someone who will enjoy them just as much." },
    ],
  },
  {
    slug: 'keeping-your-jewelry-bright',
    tag: "Care Guide",
    date: '2026-04-04',
    readTime: "5 min",
    title: "Keeping Your Jewelry Bright",
    excerpt: "A few easy habits keep metal gleaming and stones clear, so your favourite pieces look their best for longer.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Make It the Last Step" },
      { type: 'paragraph', text: "Perfume, hairspray and lotion all leave a film on metal and stones, and over time that film dulls the shine. Get into the habit of dressing first and putting your jewelry on afterwards. When you get home, take it off before you cook, clean or relax, so everyday life does not wear it down." },
      { type: 'heading', text: "Clean Gently" },
      { type: 'paragraph', text: "A soft, dry cloth is the simplest tool you own. Wipe each piece after wearing to remove skin oils and dust. When something needs more, use lukewarm water with a drop of mild soap, then rinse and dry it completely. Avoid harsh polishes and abrasive brushes, because they can scratch finishes that are meant to stay smooth." },
      { type: 'heading', text: "Store It Well" },
      { type: 'paragraph', text: "Give every piece its own space. Soft pouches or lined boxes stop chains from tangling and metals from rubbing against each other, which is how most light scratches begin. Keep your jewelry somewhere dry and cool, away from direct sun, steamy bathrooms and heating vents. A small silica packet in the box helps in humid weather, and a quick look through your collection every few months means problems are spotted early, so each piece is ready whenever you reach for it." },
      { type: 'heading', text: "Know When to Rest It" },
      { type: 'paragraph', text: "Take pieces off for swimming, workouts, gardening and heavy cleaning. Water, sweat, chlorine and strong chemicals are the main reasons finishes wear early, and they are easy to avoid with a few seconds of planning. A few minutes of care now saves a great deal of fading later on." },
    ],
  },
  {
    slug: 'how-to-build-a-collection-that-lasts',
    tag: "Guide",
    date: '2026-05-18',
    readTime: "8 min",
    title: "How to Build a Collection That Lasts",
    excerpt: "A well-edited jewelry box grows over time. Here is how to choose pieces you will reach for again and again.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Begin With the Basics" },
      { type: 'paragraph', text: "Every strong collection starts with a handful of pieces that work with almost everything. Think about what you already wear most, then choose jewelry that suits those clothes and fits your routine. Comfort matters just as much as looks, since the pieces you enjoy wearing are the ones you will actually wear." },
      { type: 'heading', text: "The Essentials" },
      { type: 'paragraph', text: "If you are not sure where to begin, a short list is a good place to start:" },
      {
        type: 'list',
        items: [
          "A fine chain with a small pendant",
          "Smooth, medium hoop earrings",
          "Simple everyday studs",
          "A slim, comfortable bracelet",
          "One ring you love wearing alone",
        ],
      },
      { type: 'paragraph', text: "Between them these pieces cover most moods and outfits, and each can be built on later." },
      { type: 'heading', text: "Choose Quality Over Quantity" },
      { type: 'paragraph', text: "A few well-made pieces will give you more than a drawer full of cheap ones. Look at the clasp, the finish and the weight. Ask what the piece is made from and how to look after it. Good jewelry is built to be worn often, and it should still feel good on the fortieth day as it did on the first." },
      { type: 'heading', text: "Let It Grow Naturally" },
      { type: 'paragraph', text: "Once the basics are in place, add new pieces slowly. A gift, a souvenir from a trip or something that simply caught your eye can each find a place. Notice what you reach for most and build around that. A collection that reflects your real life will always feel more personal, and more worn, than one assembled to tick off a list." },
    ],
  },
  {
    slug: 'why-simple-shapes-stay-modern',
    tag: "Editorial",
    date: '2026-06-09',
    readTime: "7 min",
    title: "Why Simple Shapes Stay Modern",
    excerpt: "Fashions change quickly, but clean, honest design keeps its appeal. Here is why restraint lasts.",
    image: placeholders.journal,
    body: [
      { type: 'heading', text: "Less, Done Well" },
      { type: 'paragraph', text: "The designs we still admire decades later are rarely the most elaborate. They are the ones where every line has a reason. A smooth hoop, a plain band or a slim chain asks nothing of the eye, and that calm is exactly why it never feels out of date. When there is nothing to distract you, proportion and finish do all the talking." },
      { type: 'heading', text: "Craft You Can Feel" },
      { type: 'paragraph', text: "Simple shapes leave nowhere to hide, so the quality has to be real. A clasp must close with a satisfying click, an edge must feel smooth against the skin and a surface must catch light evenly. These small details are what turn a plain design into something that feels special every time you put it on." },
      { type: 'heading', text: "Pieces That Adapt" },
      { type: 'paragraph', text: "Restrained jewelry fits many lives. The same slim chain works with a shirt, a knit or an evening dress, and it sits well beside other pieces. Because it never competes, it can be worn alone or layered, so your style can change without your jewelry box having to change with it." },
      { type: 'heading', text: "Built to Be Kept" },
      { type: 'paragraph', text: "When a design stays relevant, there is little reason to replace it. People keep what they love, repair it when it needs help and pass it on. That slower, more thoughtful way of owning things is what timeless design really means, and it is the idea behind everything we make here, from the first sketch to the final polish." },
    ],
  },
]

export const getJournal = (slug) => journals.find((j) => j.slug === slug)

// "Previous" / "Next" article in list order (undefined at the ends).
export const getAdjacentJournals = (slug) => {
  const index = journals.findIndex((j) => j.slug === slug)
  return { previous: journals[index - 1], next: journals[index + 1] }
}

const dateFormat = new Intl.DateTimeFormat(site.locale, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
export const formatJournalDate = (iso) => dateFormat.format(new Date(iso))
