import { placeholders } from '../../assets/placeholders'
import { cn } from '../../utils/cn'
import TextReveal from '../ui/TextReveal'
import NewsletterForm from './NewsletterForm'
import Image from '../ui/Image'

// Newsletter sign-up over a full-bleed, viewport-tall image (shared). The form is the shared
// <NewsletterForm /> (UI only, nothing is sent). The reference's footer has no form.
export default function Newsletter({ className }) {
  return (
    <section aria-label="Newsletter" className={cn('relative bg-white pt-4 pb-section-sm lg:pb-section', className)}>
      <div className="relative flex h-screen w-full flex-col justify-end overflow-hidden">
        <Image src={placeholders.newsletterWide} alt="" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 z-1 bg-fade-up" />

        <div className="relative z-3 flex h-full flex-col p-4 md:h-auto md:p-6 lg:p-8">
          <div className="flex w-full flex-1 flex-col items-start justify-between md:max-w-[540px] md:justify-center md:gap-6">
            <div className="flex w-full flex-col gap-2">
              <TextReveal text="Get Early News and Be Featured" className="w-full text-cream type-h2" />
              <p className="text-balance text-mist type-body">
                Subscribe for first looks at new pieces, occasional offers and the chance to
                appear in our customer gallery.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
