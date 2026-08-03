import { useContext } from 'react'
import { BundleContext } from '../state/bundleContextInstance'

export function useBundle() {
  const ctx = useContext(BundleContext)
  if (!ctx) {
    throw new Error('useBundle must be used within a BundleProvider')
  }
  return ctx
}
