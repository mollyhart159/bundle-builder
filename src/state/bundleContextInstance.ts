import { createContext, type Dispatch } from 'react'
import type { BundleAction, BundleState } from '../types/bundle'

export interface BundleContextValue {
  state: BundleState
  dispatch: Dispatch<BundleAction>
}

export const BundleContext = createContext<BundleContextValue | null>(null)
