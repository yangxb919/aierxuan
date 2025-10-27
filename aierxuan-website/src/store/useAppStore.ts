import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LanguageCode, Theme, AppError } from '@/types'

interface AppState {
  // UI State
  theme: Theme
  sidebarOpen: boolean
  loading: boolean
  error: AppError | null
  contactModalOpen: boolean

  // Language State
  language: LanguageCode

  // User State
  user: any | null
  isAuthenticated: boolean

  // Actions
  setTheme: (theme: Theme) => void
  setSidebarOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: AppError | null) => void
  setLanguage: (language: LanguageCode) => void
  setUser: (user: any | null) => void
  setContactModalOpen: (open: boolean) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  theme: 'system' as Theme,
  sidebarOpen: false,
  loading: false,
  error: null,
  contactModalOpen: false,
  language: 'en' as LanguageCode, // Default to English as per MVP doc
  user: null,
  isAuthenticated: false,
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTheme: (theme) => set({ theme }),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      setLanguage: (language) => set({ language }),

      setUser: (user) => set({
        user,
        isAuthenticated: !!user
      }),

      setContactModalOpen: (contactModalOpen) => set({ contactModalOpen }),

      reset: () => set(initialState),
    }),
    {
      name: 'aierxuan-app-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)

// Selectors for better performance
export const useTheme = () => useAppStore((state) => state.theme)
export const useLanguage = () => useAppStore((state) => state.language)
export const useLoading = () => useAppStore((state) => state.loading)
export const useError = () => useAppStore((state) => state.error)
export const useUser = () => useAppStore((state) => state.user)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen)
export const useContactModalOpen = () => useAppStore((state) => state.contactModalOpen)
