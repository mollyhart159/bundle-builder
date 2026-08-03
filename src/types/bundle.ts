export type Category = 'cameras' | 'sensors' | 'accessories'

export interface Variant {
  id: string
  label: string
  swatch: string
}

export interface Product {
  id: string
  category: Category
  name: string
  description?: string
  learnMoreUrl?: string
  badge?: string
  comparePrice?: number
  price: number
  image: string
  required?: boolean
  variants?: Variant[]
}

export interface PlanOption {
  id: string
  name: string
  comparePrice?: number
  price: number
  billingPeriod: 'mo'
}

export type StepKey = 'cameras' | 'plan' | 'sensors' | 'accessories'

export interface StepConfig {
  id: 1 | 2 | 3 | 4
  key: StepKey
  title: string
  icon: 'camera' | 'shield' | 'sensor' | 'grid'
}

export interface BundleState {
  quantities: Record<string, number>
  activeVariant: Record<string, string>
  selectedPlanId: string
  openStep: number
}

export type BundleAction =
  | { type: 'SET_QTY'; productId: string; variantId: string; qty: number }
  | { type: 'SET_ACTIVE_VARIANT'; productId: string; variantId: string }
  | { type: 'SELECT_PLAN'; planId: string }
  | { type: 'SET_OPEN_STEP'; stepId: number }
  | { type: 'HYDRATE'; state: BundleState }
