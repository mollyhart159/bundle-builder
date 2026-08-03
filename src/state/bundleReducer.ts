import type { BundleAction, BundleState, Product } from '../types/bundle'
import { DEFAULT_VARIANT_ID, lineKey } from '../utils/lineKey'
import products from '../data/products.json'

const productsById = new Map<string, Product>(
  (products as Product[]).map((product) => [product.id, product]),
)

// SET_QTY enforces the required-item floor per-key, but HYDRATE replaces the
// whole state at once (e.g. from a hand-edited localStorage value), so it
// needs to re-apply that floor across every required product.
function enforceRequiredFloors(
  quantities: BundleState['quantities'],
): BundleState['quantities'] {
  const next = { ...quantities }

  for (const product of productsById.values()) {
    if (!product.required) continue

    const variantIds = product.variants?.map((variant) => variant.id) ?? [DEFAULT_VARIANT_ID]
    for (const variantId of variantIds) {
      const key = lineKey(product.id, variantId)
      if (!(next[key] > 0)) {
        next[key] = 1
      }
    }
  }

  return next
}

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case 'SET_QTY': {
      const { productId, variantId, qty } = action
      const product = productsById.get(productId)
      const min = product?.required ? 1 : 0
      const nextQty = Math.max(min, qty)

      return {
        ...state,
        quantities: {
          ...state.quantities,
          [lineKey(productId, variantId)]: nextQty,
        },
      }
    }

    case 'SET_ACTIVE_VARIANT': {
      return {
        ...state,
        activeVariant: {
          ...state.activeVariant,
          [action.productId]: action.variantId,
        },
      }
    }

    case 'SELECT_PLAN': {
      return { ...state, selectedPlanId: action.planId }
    }

    case 'SET_OPEN_STEP': {
      return { ...state, openStep: action.stepId }
    }

    case 'HYDRATE': {
      return {
        ...action.state,
        quantities: enforceRequiredFloors(action.state.quantities),
      }
    }

    default:
      return state
  }
}
