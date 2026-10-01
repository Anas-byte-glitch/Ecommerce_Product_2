import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      items: [], // product slugs
      toggle: (slug) =>
        set((state) => ({
          items: state.items.includes(slug)
            ? state.items.filter((s) => s !== slug)
            : [...state.items, slug],
        })),
      has: (slug) => get().items.includes(slug),
      count: () => get().items.length,
      clear: () => set({ items: [] }),
    }),
    { name: 'glintura-wishlist' },
  ),
)

export const useWishlistCount = () => useWishlistStore((state) => state.items.length)
