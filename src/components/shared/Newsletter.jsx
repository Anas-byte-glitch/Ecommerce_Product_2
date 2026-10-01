import { placeholders } from '../../assets/placeholders'
import { cn } from '../../utils/cn'
import TextReveal from '../ui/TextReveal'

// Newsletter sign-up over a full-bleed, viewport-tall image (shared). UI only for now:
// the form does not submit anywhere yet (validation comes in a later phase).
export default function Newsletter({ className }) {
  return (
    <section aria-label="Newsletter" className={cn('relative bg-white pt-4 pb-section-sm lg:pb-section', className)}>
      <div className="relative flex h-screen w-full flex-col justify-end overflow-hidden">
        <img src={placeholders.newsletterWide} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 z-1 bg-fade-up" />

        <div className="relative z-3 flex h-full flex-col p-4 md:h-auto md:p-6 lg:p-8">
          <div className="flex w-full flex-1 flex-col items-start justify-between md:max-w-[540px] md:justify-center md:gap-6">
            <div className="flex w-full flex-col gap-2">
              <TextReveal text="The Next Spotlight Could Be Yours" className="w-full text-cream type-h2" />
              <p className="text-balance text-mist type-body">
                Join our newsletter for exclusive updates and the opportunity to be featured
                alongside our growing community.
              </p>
            </div>
            <form
              className="relative flex w-full md:max-w-[481px]"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                className="h-[53px] w-full appearance-none rounded-none bg-white py-4 pr-[136px] pl-4 font-display text-base/none text-ink outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:pr-[196px]"
              />
              <button
                type="submit"
                className="absolute inset-y-1 right-1 w-[120px] cursor-pointer bg-ink px-4 font-display text-[18px]/none text-cream transition-opacity duration-300 hover:opacity-85 md:w-[180px] md:text-[20px]/none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
