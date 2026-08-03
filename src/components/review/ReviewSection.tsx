import type { CategorySection } from '../../lib/pricing'
import { ReviewLineItem } from './ReviewLineItem'

export function ReviewSection({ section }: { section: CategorySection }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {section.label}
      </h3>
      <div className="mt-1 divide-y divide-slate-100">
        {section.lines.map((line) => (
          <ReviewLineItem key={line.key} line={line} />
        ))}
      </div>
    </div>
  )
}
