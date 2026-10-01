import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, Menu, ShoppingCart, X } from 'lucide-react'
import { mainNav } from '../../config/site'
import { useUiStore } from '../../store/uiStore'
import { useWishlistCount } from '../../store/wishlistStore'
import { useCartCount } from '../../store/cartStore'
import { cn } from '../../utils/cn'
import Wordmark from '../ui/Wordmark'
import MobileMenu from './MobileMenu'

const HIDE_AFTER = 70 // px scrolled before the bar may hide (≈ its height)
const HIDDEN_OFFSET = -85 // measured translateY when hidden

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
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
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
        <div className="relative flex h-nav items-center justify-between px-4 md:px-6 lg:px-8">
          <ul className="hidden items-center gap-4 lg:flex">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={cn('type-nav transition-colors duration-300', linkTone)}
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
              'type-wordmark transition-colors duration-300 lg:absolute lg:left-1/2 lg:-translate-x-1/2',
              dark ? 'text-ink' : 'text-cream',
            )}
          >
            <Wordmark />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to="/favourite"
              aria-label={`Favourites (${wishlistCount})`}
              className="relative hidden size-5 lg:block"
            >
              <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
              <Counter value={wishlistCount} className="-top-2 left-[11px]" />
            </Link>

            {/* The cart drawer is built in a later phase. */}
            <button
              type="button"
              aria-label={`Cart (${cartCount})`}
              className="relative size-5 cursor-pointer"
            >
              <ShoppingCart size={20} strokeWidth={1.5} aria-hidden="true" />
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
                <X size={24} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
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
