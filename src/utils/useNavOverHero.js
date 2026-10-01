import { useEffect } from 'react'
import { useUiStore } from '../store/uiStore'

// Call from a page whose first section is a full-screen hero.
export function useNavOverHero() {
  const setNavOverHero = useUiStore((state) => state.setNavOverHero)

  useEffect(() => {
    setNavOverHero(true)
    return () => setNavOverHero(false)
  }, [setNavOverHero])
}
