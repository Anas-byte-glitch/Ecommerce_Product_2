import ForEveryone from '../components/home/ForEveryone'
import ImageHero from '../components/shared/ImageHero'
import SharedSections from '../components/shared/SharedSections'

export default function Shop() {
  return (
    <>
      <ImageHero label="Shop" title="Discover Your Signature Style" />
      <div className="relative bg-white will-change-transform">
        <ForEveryone eyebrow="Shop By Category" title="Choose your category" bottomSpace />
        <SharedSections />
      </div>
    </>
  )
}
