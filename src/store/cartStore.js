import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Minimal cart: the drawer and full behaviour come in a later phase.
export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [], // { slug, quantity }
      addItem: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.slug === slug)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return { items: [...state.items, { slug, quantity }] }
        }),
      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'glintura-cart' },
  ),
)

export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
