import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Store = {
  isOpen: boolean
  toggle: () => void
}

/* const useSidebarStore = create<Store>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))
export default useSidebarStore */

const useSidebarStore = create<Store>()(
  persist(
    (set, get) => ({
      isOpen: false,
      toggle: () => set({ isOpen: !get().isOpen }),
      /*  addABear: () => set({ bears: get().bears + 1 }), */
    }),
    {
      name: 'sidebar-storage', // name of the item in the storage (must be unique)
      /* storage: createJSONStorage(() => sessionStorage), */ // (optional) by default, 'localStorage' is used
    }
  )
)
export default useSidebarStore
