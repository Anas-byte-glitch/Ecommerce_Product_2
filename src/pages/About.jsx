import Beliefs from '../components/about/Beliefs'
import FounderQuote from '../components/about/FounderQuote'
import Materials from '../components/about/Materials'
import WhyUs from '../components/about/WhyUs'
import FeaturesTicker from '../components/home/FeaturesTicker'
import ImageHero from '../components/shared/ImageHero'
import SharedSections from '../components/shared/SharedSections'

export default function About() {
  return (
    <>
      <ImageHero label="About Us" title="The Meaning Behind Every Piece" fade="about" />
      <div className="relative bg-white will-change-transform">
        <Beliefs />
        <Materials />
        <WhyUs />
        <FeaturesTicker />
        <FounderQuote />
        <SharedSections />
      </div>
    </>
  )
}
