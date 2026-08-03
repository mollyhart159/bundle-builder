import type { Variant } from '../../types/bundle'

interface VariantSelectorProps {
  variants: Variant[]
  activeVariantId: string
  onSelect: (variantId: string) => void
}

export function VariantSelector({ variants, activeVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Color">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
              isActive
                ? 'border-slate-400 bg-slate-50 text-slate-900'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span
              className="h-3 w-3 rounded-full border border-black/10"
              style={{ backgroundColor: variant.swatch }}
              aria-hidden
            />
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}
