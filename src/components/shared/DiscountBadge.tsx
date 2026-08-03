export function DiscountBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-0 top-0 rounded-br-lg rounded-tl-[10px] bg-indigo-700 px-2.5 py-1 text-xs font-semibold text-white">
      {label}
    </span>
  )
}
