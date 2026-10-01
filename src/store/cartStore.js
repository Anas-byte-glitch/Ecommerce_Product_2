import { useMemo } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { site } from '../config/site'
import { getProduct } from '../data/products'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 10

const clamp = (quantity) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.round(quantity) || MIN_QUANTITY))

// Saved lines whose product no longer exists (or with a broken quantity) are dropped on load.
const sanitize = (items) =>
  Array.isArray(items)
    ? items.filter((item) => item && getProduct(item.slug)).map((item) => ({ ...item, quantity: clamp(item.quantity) }))
    : []

// Cart lines are { slug, quantity } (1–10). The drawer's open state is not persisted.
export const useCartStore = create()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.slug === slug)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.slug === slug ? { ...item, quantity: clamp(item.quantity + quantity) } : item,
              ),
            }
          }
          return { items: [...state.items, { slug, quantity: clamp(quantity) }] }
        }),
      updateQuantity: (slug, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.slug === slug ? { ...item, quantity: clamp(quantity) } : item)),
        })),
      removeItem: (slug) => set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'glintura-cart',
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({ ...current, items: sanitize(persisted?.items) }),
    },
  ),
)

// Pure helpers (also used by the selector hooks below).
export const getLineTotal = (line) => (getProduct(line.slug)?.price ?? 0) * line.quantity

export function summarizeCart(items) {
  const lines = items
    .map((item) => ({ ...item, product: getProduct(item.slug) }))
    .filter((line) => line.product)
    .map((line) => ({ ...line, lineTotal: line.product.price * line.quantity }))
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)
  const freeShipping = subtotal >= site.freeShippingThreshold
  const shipping = subtotal === 0 || freeShipping ? 0 : site.flatShipping
  return {
    lines,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShipping,
    // Amount still needed for free shipping (0 once unlocked).
    remainingForFreeShipping: Math.max(0, site.freeShippingThreshold - subtotal),
  }
}

export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

// { lines, count, subtotal, shipping, total, freeShipping, remainingForFreeShipping }
export function useCartSummary() {
  const items = useCartStore((state) => state.items)
  return useMemo(() => summarizeCart(items), [items])
}
