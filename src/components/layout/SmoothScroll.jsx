import { useEffect } from 'react'

// Lenis smooth scrolling (wheel/trackpad/keyboard; touch keeps native momentum). Skipped under
// prefers-reduced-motion. Lenis is loaded after first paint so it stays out of the LCP path.
// Drawers / the mobile menu lock the page with `overflow-hidden` on <html>: Lenis is paused then.
// Inner scrollers carry `data-lenis-prevent` so they keep their own native scrolling.
export let lenisInstance = null

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let cancelled = false
    let raf = 0
    let observer
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), anchors: false })
      lenisInstance = lenis
      const loop = (time) => {
        lenis.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      const sync = () => {
        if (document.documentElement.classList.contains('overflow-hidden')) lenis.stop()
        else lenis.start()
      }
      observer = new MutationObserver(sync)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      sync()
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      observer?.disconnect()
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])
  return null
}
