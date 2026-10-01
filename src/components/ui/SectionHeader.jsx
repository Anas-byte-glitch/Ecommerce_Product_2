import { cn } from '../../utils/cn'
import Button from './Button'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import TextReveal from './TextReveal'

// "/ Label /" + large heading (+ optional "Show All"-style button), as on the reference:
// eyebrow → heading gap 16px; the button sits bottom-right from 810px, under the heading
// (24px gap) on phones. `action` = { label, to, variant?, className? }. Headings use the display size and balanced wrapping.
export default function SectionHeader({
  eyebrow,
  title,
  action,
  align = 'left',
  tone = 'light',
  className,
  headerClassName,
  eyebrowClassName,
  titleClassName,
}) {
  const centered = align === 'center'

  const header = (
    <div
      className={cn(
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start',
        headerClassName,
      )}
    >
      {eyebrow && (
        <Reveal className={cn('flex items-center', eyebrowClassName)}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        text={title}
        className={cn(
          'w-full text-balance type-display',
          tone === 'light' ? 'text-ink' : 'text-cream',
          titleClassName,
        )}
      />
    </div>
  )

  if (!action) return <div className={className}>{header}</div>

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-0',
        className,
      )}
    >
      {header}
      <Reveal className="shrink-0">
        <Button to={action.to} variant={action.variant ?? 'dark'} className={action.className}>
          {action.label}
        </Button>
      </Reveal>
    </div>
  )
}
