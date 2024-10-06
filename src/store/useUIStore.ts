import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Section =
  | 'contact'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'styling'
  | 'preview'
  | 'export'

interface UIState {
  activeSection: number
  isLoading: boolean
  error: string | null
  setActiveSection: (section: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeSection: 0,
      isLoading: false,
      error: null,
      setActiveSection: (section) => set({ activeSection: section }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'ui-store',
    }
  )
)

export const sections: { id: Section; label: string }[] = [
  { id: 'contact', label: 'Contact Information' },
  { id: 'summary', label: 'Professional Summary' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'awards', label: 'Awards' },
  { id: 'styling', label: 'Resume Styling' },
  { id: 'preview', label: 'Resume Preview' },
  { id: 'export', label: 'Export Resume' },
] 