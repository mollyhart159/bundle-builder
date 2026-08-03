import type { LineItem } from '../../lib/pricing'
import { useBundle } from '../../hooks/useBundle'
import { ProductPlaceholder } from '../icons/ProductPlaceholder'
import { PriceTag } from '../shared/PriceTag'
import { QuantityStepper } from '../shared/QuantityStepper'

export function ReviewLineItem({ line }: { line: LineItem }) {
  const { dispatch } = useBundle()
  const { product, variantId, variantLabel, showVariantLabel, qty } = line

  return (
    <div className="flex gap-3 py-2">
      <ProductPlaceholder image={product.image} className="mt-0.5 h-9 w-9" />
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-slate-700">
          {product.name}
          {showVariantLabel && <span className="text-slate-400"> — {variantLabel}</span>}
        </p>
        <div className="mt-1.5 flex items-center justify-between">
          <QuantityStepper
            qty={qty}
            min={product.required ? 1 : 0}
            disabled={product.required}
            size="sm"
            aria-label={`${product.name} quantity`}
            onChange={(nextQty) =>
              dispatch({ type: 'SET_QTY', productId: product.id, variantId, qty: nextQty })
            }
          />
          <PriceTag price={line.lineTotal} comparePrice={line.lineComparePrice} size="sm" />
        </div>
      </div>
    </div>
  )
}
