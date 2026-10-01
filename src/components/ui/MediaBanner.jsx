import { cn } from '../../utils/cn'
import Button from './Button'

// Image block with a smooth black-to-clear gradient from the bottom, an h3-size title
// (max 360px) and a light button. Default layout = the reference "Short" variant on phones
// (16px padding, title top / button bottom) and the "Default" variant from 810px (24px
// padding, title bottom-left / button bottom-right). Override with `contentClassName`.
export default function MediaBanner({ image, title, cta, className, contentClassName, titleClassName, titleAs: Title = 'h2' }) {
  return (
    <div className={cn('relative flex w-full overflow-hidden', className)}>
      <img src={image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 z-1 bg-fade-up" />
      <div
        className={cn(
          'relative z-10 flex w-full max-w-[392px] flex-col items-start justify-between p-4',
          'md:max-w-none md:flex-row md:items-end md:p-6',
          contentClassName,
        )}
      >
        <Title className={cn('w-full text-cream type-h3 md:max-w-[360px] md:flex-1', titleClassName)}>{title}</Title>
        {cta && (
          <Button to={cta.to} variant="light" className="shrink-0">
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  )
}
