import HomeHero from '../components/home/HomeHero'
import BestSellers from '../components/home/BestSellers'
import ForEveryone from '../components/home/ForEveryone'
import FeaturesTicker from '../components/home/FeaturesTicker'
import NewArrivals from '../components/home/NewArrivals'
import AboutVideo from '../components/home/AboutVideo'
import ContinueJourney from '../components/shared/ContinueJourney'
import FeaturedCustomers from '../components/shared/FeaturedCustomers'
import Newsletter from '../components/shared/Newsletter'

export default function Home() {
  return (
    <>
      <HomeHero />
      {/* Positioned + opaque, so everything after the pinned hero scrolls over it. */}
      <div className="relative bg-white">
        <BestSellers />
        <ForEveryone />
        <FeaturesTicker />
        <NewArrivals />
        <AboutVideo />
        <ContinueJourney />
        <FeaturedCustomers />
        <Newsletter />
      </div>
    </>
  )
}
