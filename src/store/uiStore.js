import { create } from 'zustand'

// `navOverHero`: the current page starts with a full-screen dark hero, so the
// navbar uses its transparent "light" variant until the hero is scrolled past.
export const useUiStore = create()((set) => ({
  navOverHero: false,
  setNavOverHero: (value) => set({ navOverHero: value }),
}))
