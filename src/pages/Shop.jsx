import ForEveryone from '../components/home/ForEveryone'
import { placeholders } from '../assets/placeholders'
import { photoOr } from '../assets/photos'
import ImageHero from '../components/shared/ImageHero'
import SharedSections from '../components/shared/SharedSections'

export default function Shop() {
  return (
    <>
      <ImageHero image={photoOr('hero-shop', placeholders.heroWide)} label="Shop" title="Find Pieces That Feel Like You" />
      <div className="relative bg-white will-change-transform">
        <ForEveryone eyebrow="Shop By Category" title="Find your starting point" bottomSpace />
        <SharedSections />
      </div>
    </>
  )
}
