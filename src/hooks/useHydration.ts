import { useState, useEffect } from 'react'
import { useResumeStore } from '@/store/useResumeStore'

export function useHydration() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        await useResumeStore.persist.rehydrate()
        setHydrated(true)
      } catch (err) {
        console.error('Hydration failed:', err)
        // Still set hydrated to true to allow fallback rendering
        setHydrated(true)
      }
    }
    init()
  }, [])

  return hydrated
} 