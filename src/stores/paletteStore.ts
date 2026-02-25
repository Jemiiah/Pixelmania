import { create } from 'zustand'
import { COOLDOWN_MS } from '@/lib/constants.ts'

interface PaletteState {
  selectedColor: number
  cooldownEnd: number | null

  selectColor: (index: number) => void
  startCooldown: () => void
  clearCooldown: () => void
  isCooldownActive: () => boolean
}

export const usePaletteStore = create<PaletteState>((set, get) => ({
  selectedColor: 0,
  cooldownEnd: null,

  selectColor: (index) => set({ selectedColor: index }),

  startCooldown: () =>
    set({ cooldownEnd: Date.now() + COOLDOWN_MS }),

  clearCooldown: () => set({ cooldownEnd: null }),

  isCooldownActive: () => {
    const { cooldownEnd } = get()
    if (cooldownEnd === null) return false
    return Date.now() < cooldownEnd
  },
}))
