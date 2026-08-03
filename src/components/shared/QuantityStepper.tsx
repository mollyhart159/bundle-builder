import { MinusIcon, PlusIcon } from '../icons/StepIcons'

interface QuantityStepperProps {
  qty: number
  min?: number
  max?: number
  disabled?: boolean
  onChange: (qty: number) => void
  size?: 'sm' | 'md'
  'aria-label'?: string
}

export function QuantityStepper({
  qty,
  min = 0,
  max = 99,
  disabled = false,
  onChange,
  size = 'md',
  'aria-label': ariaLabel = 'Quantity',
}: QuantityStepperProps) {
  const decrementDisabled = disabled || qty <= min
  const incrementDisabled = disabled || qty >= max

  const buttonSize = size === 'sm' ? 'h-6 w-6' : 'h-7 w-7'

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className={`${buttonSize} flex items-center justify-center rounded border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white`}
        onClick={() => onChange(Math.max(min, qty - 1))}
        disabled={decrementDisabled}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span className="w-4 text-center text-sm font-medium text-slate-900">{qty}</span>
      <button
        type="button"
        className={`${buttonSize} flex items-center justify-center rounded border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white`}
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={incrementDisabled}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  )
}
