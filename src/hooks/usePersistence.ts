import { useCallback, useEffect, useRef, useState } from 'react'
import type { BundleState } from '../types/bundle'
import { STORAGE_KEY } from '../state/initialState'
import { useBundle } from './useBundle'

// A saved snapshot could predate a shape change or be hand-edited in devtools,
// so validate before trusting it as a HYDRATE payload.
function isValidBundleState(value: unknown): value is BundleState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.quantities === 'object' &&
    candidate.quantities !== null &&
    typeof candidate.activeVariant === 'object' &&
    candidate.activeVariant !== null &&
    typeof candidate.selectedPlanId === 'string' &&
    typeof candidate.openStep === 'number'
  )
}

export function usePersistence() {
  const { state, dispatch } = useBundle()
  const hydrated = useRef(false)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    if (hydrated.current) return
    hydrated.current = true

    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      const parsed: unknown = JSON.parse(raw)
      if (isValidBundleState(parsed)) {
        dispatch({ type: 'HYDRATE', state: parsed })
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [dispatch])

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 2000)
  }, [state])

  return { save, justSaved }
}
