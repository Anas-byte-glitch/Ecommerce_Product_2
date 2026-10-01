import { create } from 'zustand'

// The last placed order, kept in memory only (not persisted): a refresh of the success page
// loses it on purpose and the page redirects home.
export const useOrderStore = create()((set) => ({
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
}))
