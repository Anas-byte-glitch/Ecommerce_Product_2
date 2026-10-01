import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { mainNav } from '../../config/site'
import { useUiStore } from '../../store/uiStore'
import { useWishlistCount } from '../../store/wishlistStore'
import { useCartCount, useCartStore } from '../../store/cartStore'
import { cn } from '../../utils/cn'
import Wordmark from '../ui/Wordmark'
import MobileMenu from './MobileMenu'

const HIDE_AFTER = 70 // px scrolled before the bar may hide (≈ its height)
const HIDDEN_OFFSET = -85 // measured translateY when hidden
// The reference icons are Phosphor *bold* (stroke 24/256 of the icon size) = lucide stroke 2.25.
const ICON_STROKE = 2.25

function Counter({ value, className }) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute grid size-5 place-items-center rounded-pill bg-accent text-cream type-counter',
        className,
      )}
    >
      {value}
    </span>
  )
}

export default function Navbar() {
  const navOverHero = useUiStore((state) => state.navOverHero)
  const wishlistCount = useWishlistCount()
  const cartCount = useCartCount()
  const openCart = useCartStore((state) => state.openDrawer)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  // Hide on scroll down, show on scroll up; switch to the dark variant after 100vh.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setPastHero(y >= window.innerHeight)
      if (y <= 0) setHidden(false)
      else if (y > lastY) setHidden(y > HIDE_AFTER)
      else if (y < lastY) setHidden(false)
      lastY = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Lock page scroll while the menu covers the screen.
  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', menuOpen)
    if (!menuOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const dark = !navOverHero || pastHero || menuOpen
  const linkTone = dark
    ? 'text-ink hover:text-ink-hover'
    : 'text-white hover:text-white-hover'

  return (
    // will-change: own compositing layer, like the reference nav (also gives the same
    // subpixel glyph positioning in Chromium).
    <motion.header
      className="fixed inset-x-0 top-0 z-50 will-change-transform"
      initial={false}
      animate={{ y: hidden && !menuOpen ? HIDDEN_OFFSET : 0 }}
      transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
    >
      <nav
        aria-label="Main"
        className={cn(
          'transition-colors duration-300',
          dark ? 'bg-white text-ink' : 'bg-transparent text-white',
        )}
      >
        {/* Desktop: Left links · wordmark · Right icons, spread with justify-between (not centred). */}
        <div className="flex h-nav items-center justify-between px-4 md:px-6 lg:px-8">
          <ul className="hidden items-center gap-4 lg:flex">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={cn('block w-fit type-nav transition-colors duration-300', linkTone)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            aria-label="Home"
            onClick={() => setMenuOpen(false)}
            className={cn(
              'type-wordmark transition-colors duration-300',
              dark ? 'text-ink' : 'text-cream',
            )}
          >
            <Wordmark />
          </Link>

          {/* lg width = the reference's 5-icon cluster (User + Country are not built), so the
              wordmark lands where it does on the reference (x = 701.5 at 1440px). */}
          <div className="flex items-center justify-end gap-4 md:gap-6 lg:w-[196px]">
            {/* The search drawer is built in a later phase. */}
            <button type="button" aria-label="Search" className="relative size-5 cursor-pointer">
              <Search size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </button>

            <Link
              to="/favourite"
              aria-label={`Favourites (${wishlistCount})`}
              className="relative hidden size-5 lg:block"
            >
              <Heart size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
              <Counter value={wishlistCount} className="-top-2 left-[11px]" />
            </Link>

            <button
              type="button"
              aria-label={`Cart (${cartCount})`}
              aria-haspopup="dialog"
              onClick={() => {
                setMenuOpen(false)
                openCart()
              }}
              className="relative size-5 cursor-pointer"
            >
              <ShoppingCart size={20} strokeWidth={ICON_STROKE} aria-hidden="true" />
              <Counter value={cartCount} className="-top-2.5 left-2.5 font-medium" />
            </button>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-6 cursor-pointer place-items-center lg:hidden"
            >
              {menuOpen ? (
                <X size={24} strokeWidth={ICON_STROKE} aria-hidden="true" />
              ) : (
                <Menu size={24} strokeWidth={ICON_STROKE} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && <MobileMenu onNavigate={() => setMenuOpen(false)} />}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
