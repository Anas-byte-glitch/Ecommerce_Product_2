import { Fragment } from 'react'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/ui/Reveal'
import TextReveal from '../components/ui/TextReveal'
import { site } from '../config/site'
import legal from '../data/legal'
import NotFound from './NotFound'

// One layout for /terms, /privacy-policy and /refund-policy. The texts are a template (not legal
// advice) and live in src/data/legal.js. No shared sections on these pages (as on the reference).
const body = 'text-ink-soft type-body'

function Rich({ text }) {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-bold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

function Block({ block, first }) {
  if (block.type === 'heading') {
    return (
      <h2 className="mt-10 text-ink-soft font-display text-[22.08px] leading-[26.496px] md:text-[28px] md:leading-[30.8px] md:tracking-[-0.56px] lg:text-[32px] lg:leading-[35.2px] lg:tracking-[-0.64px]">
        {block.text}
      </h2>
    )
  }
  const spacing = first ? '' : 'mt-5'
  if (block.type === 'list') {
    return (
      <ul className={`list-disc pl-5 ${body}`}>
        {block.items.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'contact') {
    return (
      <p className={`${spacing} ${body}`}>
        <strong className="font-bold">{site.name}</strong>
        <br />
        <strong className="font-bold">Email:</strong>{' '}
        <a href={`mailto:${site.contactEmail}`} className="text-ink hover:underline">
          {site.contactEmail}
        </a>
        <br />
        <strong className="font-bold">Business Hours:</strong> {site.businessHours}
      </p>
    )
  }
  return (
    <p className={`${spacing} ${body}`}>
      <Rich text={block.text} />
    </p>
  )
}

export default function Legal({ type }) {
  const page = legal[type]
  if (!page) return <NotFound />

  return (
    <>
      <section className="px-4 pt-[180px] md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Reveal className="flex items-center">
            <Eyebrow>{page.crumb}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            text={page.title}
            className="w-full text-center text-ink type-display"
          />
        </div>
      </section>

      <section className="px-4 py-section-sm md:px-6 lg:px-8 lg:py-section">
        <div className="mx-auto md:px-[50px] lg:max-w-[836px] lg:px-0">
          {page.blocks.map((block, i) => (
            <Block key={i} block={block} first={i === 0} />
          ))}
        </div>
      </section>
    </>
  )
}
