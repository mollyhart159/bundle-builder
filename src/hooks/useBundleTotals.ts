import { useMemo } from 'react'
import productsData from '../data/products.json'
import plansData from '../data/plans.json'
import type { Category, PlanOption, Product } from '../types/bundle'
import { computeTotals, selectedCountForCategory } from '../lib/pricing'
import { useBundle } from './useBundle'

const products = productsData as Product[]
const plans = plansData as PlanOption[]

export function useBundleTotals() {
  const { state } = useBundle()

  return useMemo(() => computeTotals(state, products, plans), [state])
}

export function useCategorySelectedCount(category: Category) {
  const { state } = useBundle()

  return useMemo(
    () => selectedCountForCategory(products, state.quantities, category),
    [state.quantities, category],
  )
}

export { products, plans }
