import type { Product } from '../../types/bundle'
import { useBundle } from '../../hooks/useBundle'
import { DEFAULT_VARIANT_ID, lineKey } from '../../utils/lineKey'
import { ProductPlaceholder } from '../icons/ProductPlaceholder'
import { DiscountBadge } from '../shared/DiscountBadge'
import { PriceTag } from '../shared/PriceTag'
import { QuantityStepper } from '../shared/QuantityStepper'
import { VariantSelector } from './VariantSelector'

export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useBundle()

  const activeVariantId = product.variants
    ? (state.activeVariant[product.id] ?? product.variants[0].id)
    : DEFAULT_VARIANT_ID

  const qty = state.quantities[lineKey(product.id, activeVariantId)] ?? 0
  const isSelected = qty > 0

  return (
    <div
      className={`relative flex flex-col gap-3 rounded-xl border bg-white p-4 transition-colors ${
        isSelected ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'
      }`}
    >
      {product.badge && <DiscountBadge label={product.badge} />}

      <div className="flex gap-3">
        <ProductPlaceholder image={product.image} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
          {product.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{product.description}</p>
          )}
          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="mt-0.5 inline-block text-xs font-medium text-indigo-600 hover:underline"
            >
              Learn More
            </a>
          )}
        </div>
      </div>

      {product.variants && (
        <VariantSelector
          variants={product.variants}
          activeVariantId={activeVariantId}
          onSelect={(variantId) =>
            dispatch({ type: 'SET_ACTIVE_VARIANT', productId: product.id, variantId })
          }
        />
      )}

      <div className="mt-auto flex items-end justify-between">
        <QuantityStepper
          qty={qty}
          disabled={product.required}
          aria-label={`${product.name} quantity`}
          onChange={(nextQty) =>
            dispatch({
              type: 'SET_QTY',
              productId: product.id,
              variantId: activeVariantId,
              qty: nextQty,
            })
          }
        />
        <PriceTag price={product.price} comparePrice={product.comparePrice} />
      </div>
    </div>
  )
}
