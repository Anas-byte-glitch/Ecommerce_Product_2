import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ImageHero from '../components/shared/ImageHero'
import { site } from '../config/site'
import { formatJournalDate, getAdjacentJournals, getJournal } from '../data/journals'
import { cn } from '../utils/cn'
import NotFound from './NotFound'

const ICON = 2.25

function ArticleBody({ body }) {
  return (
    <div className="flex flex-col">
      {body.map((block, index) => {
        const first = index === 0
        if (block.type === 'heading') {
          return (
            <h2 key={index} className={cn('text-ink-soft type-quote', first ? '' : 'mt-10')}>
              {block.text}
            </h2>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="mt-8 list-disc pl-5 md:pl-6 text-ink-soft type-body-lg">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={index} className={cn('text-ink-soft type-body-lg', first ? '' : 'mt-5')}>
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

function AdjacentLink({ journal, direction }) {
  const next = direction === 'next'
  const Arrow = next ? ArrowRight : ArrowLeft
  return (
    <div className={cn('flex w-full flex-col gap-2.5 md:w-[230px]', next ? 'items-end text-right' : 'items-start text-left')}>
      <Link
        to={`/journals/${journal.slug}`}
        className="flex items-center gap-2 text-[#9a948e] type-eyebrow hover:text-ink"
        aria-label={`${next ? 'Next' : 'Previous'} article: ${journal.title}`}
      >
        {!next && <Arrow size={16} strokeWidth={ICON} aria-hidden="true" />}
        {next ? 'Next' : 'Previous'}
        {next && <Arrow size={16} strokeWidth={ICON} aria-hidden="true" />}
      </Link>
      <p className="max-w-[200px] text-ink type-h6-lg md:max-w-none">{journal.title}</p>
    </div>
  )
}

// One template for all articles: pinned hero (label, title, excerpt), meta row, body, previous /
// next. Unknown slug → 404. No shared sections on the reference's article pages.
export default function JournalArticle() {
  const { slug } = useParams()
  const journal = getJournal(slug)
  if (!journal) return <NotFound />
  const { previous, next } = getAdjacentJournals(slug)

  return (
    <>
      <ImageHero
        label={`${site.name} Editorial`}
        title={journal.title}
        excerpt={journal.excerpt}
        fade="article"
      />
      <div className="relative bg-white will-change-transform">
        <article className="flex flex-col items-center gap-section-sm px-4 py-section-sm md:px-6 lg:gap-section lg:px-8 lg:py-section">
          <div className="flex w-full max-w-[1200px] flex-col gap-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <Link to="/journals" className="flex items-center gap-2 text-[#9a948e] type-eyebrow hover:text-ink">
                <ArrowLeft size={16} strokeWidth={ICON} aria-hidden="true" />
                All Journals
              </Link>
              <div className="flex gap-4 text-ink-soft type-eyebrow md:gap-6">
                <span>{journal.tag}</span>
                <time dateTime={journal.date}>{formatJournalDate(journal.date)}</time>
                <span>{journal.readTime}</span>
              </div>
            </div>
            <ArticleBody body={journal.body} />
          </div>

          <nav aria-label="More journals" className="flex w-full max-w-site flex-col gap-4 md:flex-row md:justify-between">
            {previous ? <AdjacentLink journal={previous} direction="previous" /> : <span className="hidden md:block" />}
            {next && <AdjacentLink journal={next} direction="next" />}
          </nav>
        </article>
      </div>
    </>
  )
}
