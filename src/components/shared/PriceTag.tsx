import { formatCurrency } from '../../utils/currency'

interface PriceTagProps {
  price: number
  comparePrice?: number
  align?: 'left' | 'right'
  size?: 'sm' | 'md'
  suffix?: string
}

export function PriceTag({ price, comparePrice, align = 'right', size = 'md', suffix }: PriceTagProps) {
  const isFree = price === 0
  const priceClass = size === 'sm' ? 'text-sm' : 'text-[15px]'

  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'} leading-tight`}>
      {comparePrice !== undefined && comparePrice > price && (
        <span className="text-xs text-red-500 line-through">
          {formatCurrency(comparePrice)}
          {suffix}
        </span>
      )}
      <span className={`${priceClass} font-semibold ${isFree ? 'text-indigo-600' : 'text-slate-900'}`}>
        {isFree ? 'FREE' : `${formatCurrency(price)}${suffix ?? ''}`}
      </span>
    </div>
  )
}
