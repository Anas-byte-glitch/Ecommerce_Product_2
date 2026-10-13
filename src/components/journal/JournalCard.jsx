import { Link } from 'react-router-dom'
import { formatJournalDate } from '../../data/journals'
import { cn } from '../../utils/cn'
import Image from '../ui/Image'

// Journal card. `featured` = the wide "Long" card of the list hero (image + info side by side from
// 810px, stacked on phones); default = grid card (image 416px tall, 382 on phones, then meta row).
// Hover: the image scales to 1.1 inside its box (0.6s) while the tag stays put.
export default function JournalCard({ journal, featured = false }) {
  const image = (
    <div className={cn('relative overflow-hidden bg-mist', featured ? 'h-[350px] w-full md:h-[480px] md:w-[452px] lg:w-[664px]' : 'h-[382px] md:h-[416px]')}>
      <Image
        src={journal.image}
        alt=""
       
        className="absolute inset-0 size-full object-cover transition-transform duration-600 ease-card group-hover:scale-110"
      />
      <div className="absolute inset-x-0 top-0 p-4">
        <span
          className={cn(
            'inline-flex items-center bg-white px-4 py-2',
            featured ? 'text-ink type-eyebrow' : 'text-ink-soft type-badge',
          )}
        >
          {journal.tag}
        </span>
      </div>
    </div>
  )

  if (featured) {
    return (
      <Link to={`/journals/${journal.slug}`} className="group flex w-full flex-col bg-[#f7f7f7] md:min-h-[480px] md:flex-row md:justify-between md:bg-mist">
        {image}
        <div className="flex flex-col justify-between gap-8 p-6 md:flex-1 md:gap-0">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 md:max-w-[459px] md:flex-1">
              <p className="text-ink type-eyebrow">{formatJournalDate(journal.date)}</p>
              <h2 className="text-ink type-h4">{journal.title}</h2>
            </div>
            <p className="shrink-0 self-start text-ink type-eyebrow">{journal.readTime}</p>
          </div>
          <p className="text-ink-soft type-body lg:max-w-[430px]">{journal.excerpt}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/journals/${journal.slug}`} className="group flex w-full flex-col gap-6">
      {image}
      <div className="flex justify-between px-2">
        <div className="flex w-[221px] flex-col gap-2">
          <p className="text-ink-soft type-badge">{formatJournalDate(journal.date)}</p>
          <h3 className="text-ink type-h6">{journal.title}</h3>
        </div>
        <p className="shrink-0 self-start text-ink-soft type-badge">{journal.readTime}</p>
      </div>
    </Link>
  )
}
