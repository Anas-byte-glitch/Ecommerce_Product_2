import { Suspense, useEffect } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import LiveAnnouncer from './LiveAnnouncer'
import CartDrawer from '../cart/CartDrawer'
import SearchDrawer from '../search/SearchDrawer'
import { site } from '../../config/site'

// Document title: the brand name on every page (as on the reference), or the deepest route's
// `handle.title(params)` + " - brand" (product pages: "Aurora Bar Necklace - <brand>").
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
      <a
        href="#main"
        className="fixed top-2 left-2 z-[100] -translate-y-[200%] bg-ink px-4 py-2 text-cream type-link-lg focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <LiveAnnouncer />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Fallback keeps a full-screen block so the footer never jumps into view while a page chunk loads. */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <SearchDrawer />
    </>
  )
}
