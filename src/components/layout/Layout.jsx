import { Suspense, useEffect } from 'react'
import { Outlet, useLocation, useMatches } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import LiveAnnouncer from './LiveAnnouncer'
import CartDrawer from '../cart/CartDrawer'
import SearchDrawer from '../search/SearchDrawer'
import { site } from '../../config/site'
import { applySeo } from '../../seo/applySeo'

// Document head per route: title = brand (as on the reference) or the deepest route's
// `handle.title(params)` + " - brand"; description / noindex / JSON-LD from `handle.seo(params)` (App.jsx).
export default function Layout() {
  const matches = useMatches()
  const { pathname } = useLocation()
  const match = matches[matches.length - 1]
  const pageTitle = match?.handle?.title?.(match.params)
  const title = pageTitle ? `${pageTitle} - ${site.name}` : site.name
  const seo = match?.handle?.seo?.(match.params) ?? {}
  const description = seo.description ?? site.description
  const noindex = seo.noindex ?? false
  const jsonLdKey = JSON.stringify(seo.jsonLd ?? [])

  // Title, description, canonical, Open Graph, robots and route JSON-LD (src/seo).
  useEffect(() => {
    applySeo({ title, description, path: pathname, noindex, jsonLd: JSON.parse(jsonLdKey) })
  }, [title, description, pathname, noindex, jsonLdKey])

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
      {/* While a page chunk loads, a full-screen block stands in for page AND footer, so the footer
          never jumps into view when the page arrives (layout shift). */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <main id="main" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
      <CartDrawer />
      <SearchDrawer />
    </>
  )
}
