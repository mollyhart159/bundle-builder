import type { BundleState, Category, PlanOption, Product } from '../types/bundle'
import { parseLineKey } from '../utils/lineKey'

export interface LineItem {
  key: string
  product: Product
  variantId: string
  variantLabel?: string
  showVariantLabel: boolean
  qty: number
  unitPrice: number
  unitComparePrice?: number
  lineTotal: number
  lineComparePrice: number
}

export interface CategorySection {
  category: Category
  label: string
  lines: LineItem[]
}

export interface BundleTotals {
  sections: CategorySection[]
  selectedPlan: PlanOption
  productTotal: number
  productComparePrice: number
  cartTotal: number
  cartComparePrice: number
  savings: number
  financingMonthly: number
}

const CATEGORY_LABELS: Record<Category, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
}

const CATEGORY_ORDER: Category[] = ['cameras', 'sensors', 'accessories']

export function buildLineItems(state: BundleState, products: Product[]): LineItem[] {
  const productsById = new Map(products.map((product) => [product.id, product]))

  return Object.entries(state.quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { productId, variantId } = parseLineKey(key)
      const product = productsById.get(productId)
      if (!product) return null

      const variant = product.variants?.find((v) => v.id === variantId)
      const unitComparePrice = product.comparePrice ?? product.price
      const lineComparePrice = unitComparePrice * qty

      const line: LineItem = {
        key,
        product,
        variantId,
        variantLabel: variant?.label,
        showVariantLabel: false,
        qty,
        unitPrice: product.price,
        unitComparePrice: product.comparePrice,
        lineTotal: product.price * qty,
        lineComparePrice,
      }
      return line
    })
    .filter((line): line is LineItem => line !== null)
}

// Only worth showing when a product has more than one active variant line
// at once (e.g. Red x2 and Blue x1) — otherwise it's noise on the product name.
function markVariantLabels(lines: LineItem[]): LineItem[] {
  const linesPerProduct = new Map<string, number>()
  for (const line of lines) {
    linesPerProduct.set(line.product.id, (linesPerProduct.get(line.product.id) ?? 0) + 1)
  }

  return lines.map((line) => ({
    ...line,
    showVariantLabel: Boolean(line.variantLabel) && (linesPerProduct.get(line.product.id) ?? 0) > 1,
  }))
}

export function groupByCategory(lines: LineItem[]): CategorySection[] {
  const withVariantLabels = markVariantLabels(lines)

  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    lines: withVariantLabels.filter((line) => line.product.category === category),
  })).filter((section) => section.lines.length > 0)
}

export function selectedCountForCategory(
  products: Product[],
  quantities: BundleState['quantities'],
  category: Category,
): number {
  const categoryProductIds = new Set(
    products.filter((product) => product.category === category).map((product) => product.id),
  )

  const selectedProductIds = new Set(
    Object.entries(quantities)
      .filter(([key, qty]) => {
        const { productId } = parseLineKey(key)
        return qty > 0 && categoryProductIds.has(productId)
      })
      .map(([key]) => parseLineKey(key).productId),
  )

  return selectedProductIds.size
}

export function computeTotals(
  state: BundleState,
  products: Product[],
  plans: PlanOption[],
): BundleTotals {
  const lines = buildLineItems(state, products)
  const sections = groupByCategory(lines)
  const selectedPlan = plans.find((plan) => plan.id === state.selectedPlanId) ?? plans[0]

  const productTotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)
  const productComparePrice = lines.reduce((sum, line) => sum + line.lineComparePrice, 0)

  const cartTotal = productTotal + selectedPlan.price
  const cartComparePrice = productComparePrice + (selectedPlan.comparePrice ?? selectedPlan.price)
  const savings = cartComparePrice - cartTotal
  // Financed against the hardware total only — the plan fee is already monthly.
  const financingMonthly = Math.round((productTotal / 12) * 100) / 100

  return {
    sections,
    selectedPlan,
    productTotal,
    productComparePrice,
    cartTotal,
    cartComparePrice,
    savings,
    financingMonthly,
  }
}
