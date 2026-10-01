import { useNavOverHero } from '../../utils/useNavOverHero'
import Container from './Container'
import Eyebrow from './Eyebrow'

// Dark full-screen stand-in for pages whose real hero is an image (navbar "light" state).
function HeroPlaceholder({ eyebrow, title }) {
  useNavOverHero()
  return (
    <section className="flex h-svh items-end bg-ink pt-section-sm pb-8 text-white md:pb-12 lg:pt-section lg:pb-14">
      <Container className="flex flex-col gap-4">
        {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
        <h1 className="type-display">{title}</h1>
      </Container>
    </section>
  )
}

// Title-only page used until each page is built in its own phase.
export default function PagePlaceholder({ eyebrow, title, hero = false, children }) {
  if (hero) return <HeroPlaceholder eyebrow={eyebrow} title={title} />

  return (
    <section className="pt-section-sm pb-section-sm lg:pt-section lg:pb-section">
      <Container className="flex flex-col items-center gap-4 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-ink type-display">{title}</h1>
        {children}
      </Container>
    </section>
  )
}
