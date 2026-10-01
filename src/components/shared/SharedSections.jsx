import ContinueJourney from './ContinueJourney'
import FeaturedCustomers from './FeaturedCustomers'
import Newsletter from './Newsletter'

// The three sections that sit above the footer on most pages, in the reference order.
export default function SharedSections() {
  return (
    <>
      <ContinueJourney />
      <FeaturedCustomers />
      <Newsletter />
    </>
  )
}
