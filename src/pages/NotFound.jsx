import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import TextReveal from '../components/ui/TextReveal'

// Unknown routes, product / collection / journal slugs and /404 all land here.
// Measured on the reference: huge "404" (238/190.4 desktop, 140/112 tablet, 94/75.2 phone) +
// one "Explore Collections" button, no shared sections.
export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-12 px-4 pb-[120px] pt-[180px] md:px-6 lg:px-8 lg:pb-[140px]">
      <TextReveal
        as="h1"
        text="404"
        onMount
        className="w-full text-center font-display text-[94px] leading-[75.2px] tracking-[-1.88px] text-ink md:text-[140px] md:leading-[112px] md:tracking-[-2.8px] lg:text-[238px] lg:leading-[190.4px] lg:tracking-[-4.76px]"
      />
      <Reveal>
        <Button to="/shop">Explore Collections</Button>
      </Reveal>
    </section>
  )
}
