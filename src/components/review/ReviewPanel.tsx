import { useBundleTotals } from '../../hooks/useBundleTotals'
import { ReviewSection } from './ReviewSection'
import { ReviewSummary } from './ReviewSummary'

export function ReviewPanel() {
  const totals = useBundleTotals()

  return (
    <aside className="w-full rounded-[10px] bg-[#EDF4FF] p-5 pt-[15px] lg:w-[399px]">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Review</p>
      <h2 className="mt-[5px] text-xl font-bold text-slate-900">Your security system</h2>
      <p className="mt-1 text-sm text-slate-500">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-4 space-y-5 border-t border-slate-200 pt-4">
        {totals.sections.map((section) => (
          <ReviewSection key={section.category} section={section} />
        ))}
      </div>

      <ReviewSummary totals={totals} />
    </aside>
  )
}
