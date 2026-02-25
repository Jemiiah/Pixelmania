import { create } from 'zustand'
import type { Toast, SidebarPanel } from '@/lib/types'

interface UIState {
  sidebarOpen: boolean
  sidebarPanel: SidebarPanel
  toasts: Toast[]
  isMobile: boolean

  toggleSidebar: () => void
  setSidebarPanel: (panel: SidebarPanel) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  setIsMobile: (val: boolean) => void
}

let toastCounter = 0

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  sidebarPanel: 'leaderboard',
  toasts: [],
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setSidebarPanel: (panel) =>
    set({ sidebarPanel: panel, sidebarOpen: panel !== null }),

  addToast: (toast) => {
    const id = `toast-${++toastCounter}`
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    const duration = toast.duration ?? 4000
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, duration)
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  setIsMobile: (val) => set({ isMobile: val }),
}))
