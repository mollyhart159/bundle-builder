import type { PlanOption } from '../../types/bundle'
import { PriceTag } from '../shared/PriceTag'

interface PlanOptionCardProps {
  plan: PlanOption
  isSelected: boolean
  onSelect: () => void
}

export function PlanOptionCard({ plan, isSelected, onSelect }: PlanOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex w-full items-center justify-between rounded-xl border bg-white p-4 text-left transition-colors ${
        isSelected ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            isSelected ? 'border-indigo-600' : 'border-slate-300'
          }`}
        >
          {isSelected && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
        </span>
        <span className="text-sm font-semibold text-slate-900">{plan.name}</span>
      </div>
      <PriceTag
        price={plan.price}
        comparePrice={plan.comparePrice}
        size="sm"
        suffix={`/${plan.billingPeriod}`}
      />
    </button>
  )
}
