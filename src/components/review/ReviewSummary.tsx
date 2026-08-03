import { useState } from 'react'
import type { BundleTotals } from '../../lib/pricing'
import { usePersistence } from '../../hooks/usePersistence'
import { formatCurrency } from '../../utils/currency'
import { BadgeSealIcon, TruckIcon } from '../icons/StepIcons'
import { PriceTag } from '../shared/PriceTag'

export function ReviewSummary({ totals }: { totals: BundleTotals }) {
  const { selectedPlan, cartTotal, cartComparePrice, savings, financingMonthly } = totals
  const { save, justSaved } = usePersistence()
  const [checkoutClicked, setCheckoutClicked] = useState(false)

  return (
    <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">{selectedPlan.name}</span>
        <PriceTag
          price={selectedPlan.price}
          comparePrice={selectedPlan.comparePrice}
          suffix={`/${selectedPlan.billingPeriod}`}
          size="sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-slate-700">
          <TruckIcon className="h-5 w-5 text-emerald-600" />
          Fast Shipping
        </span>
        <PriceTag price={0} comparePrice={5.99} size="sm" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <BadgeSealIcon className="h-10 w-10 shrink-0 text-indigo-700" />
          <div>
            <p className="text-sm font-semibold text-slate-900">30-day hassle-free returns</p>
            <p className="text-xs text-slate-500">
              If you're not totally in love with the product, we will refund you 100%.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="rounded bg-indigo-700 px-2 py-0.5 text-xs font-semibold text-white">
            as low as {formatCurrency(financingMonthly)}/mo
          </span>
          <div className="flex items-baseline gap-2">
            {cartComparePrice > cartTotal && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrency(cartComparePrice)}
              </span>
            )}
            <span className="text-2xl font-bold text-slate-900">{formatCurrency(cartTotal)}</span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="text-right text-sm font-medium text-emerald-600">
          Congrats! You're saving {formatCurrency(savings)} on your security bundle!
        </p>
      )}

      <button
        type="button"
        onClick={() => setCheckoutClicked(true)}
        className="w-full rounded-lg bg-indigo-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
      >
        Checkout
      </button>
      {checkoutClicked && (
        <p className="text-center text-xs text-slate-500">
          This is a prototype — there's no checkout flow to send you to.
        </p>
      )}

      <button
        type="button"
        onClick={save}
        className="block w-full text-center text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700"
      >
        Save my system for later
      </button>
      {justSaved && (
        <p className="text-center text-xs text-emerald-600">
          Saved — reload the page anytime to pick up where you left off.
        </p>
      )}
    </div>
  )
}
