import { useReducer, type ReactNode } from 'react'
import { bundleReducer } from './bundleReducer'
import { BundleContext } from './bundleContextInstance'
import { initialState } from './initialState'

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bundleReducer, initialState)

  return (
    <BundleContext.Provider value={{ state, dispatch }}>{children}</BundleContext.Provider>
  )
}
