import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { site } from '../../config/site'

// The reference sets the same document title (the brand name) on every page.
export default function Layout() {
  useEffect(() => {
    document.title = site.name
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
