import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { lenisInstance } from './SmoothScroll'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
