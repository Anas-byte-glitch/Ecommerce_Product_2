import { useEffect } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CartDrawer from '../cart/CartDrawer'
import { site } from '../../config/site'

// Document title: the brand name on every page (as on the reference), or the deepest route's
// `handle.title(params)` + " - brand" (product pages: "Aurora Bar Necklace - Glintura").
export default function Layout() {
  const matches = useMatches()
  const match = matches[matches.length - 1]
  const pageTitle = match?.handle?.title?.(match.params)
  const title = pageTitle ? `${pageTitle} - ${site.name}` : site.name

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
