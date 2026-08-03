import type { StepConfig } from '../../types/bundle'

interface StepIconProps {
  icon: StepConfig['icon']
  className?: string
}

export function StepIcon({ icon, className = 'h-5 w-5' }: StepIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (icon) {
    case 'camera':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <circle cx="12" cy="13.5" r="3.2" />
          <path d="M8 7l1.4-2.5h5.2L16 7" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3z" />
        </svg>
      )
    case 'sensor':
      return (
        <svg {...common}>
          <path d="M12 8a4 4 0 0 1 4 4" />
          <path d="M12 4a8 8 0 0 1 8 8" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="6" height="6" rx="1.2" />
          <rect x="14.5" y="3.5" width="6" height="6" rx="1.2" />
          <rect x="3.5" y="14.5" width="6" height="6" rx="1.2" />
          <rect x="14.5" y="14.5" width="6" height="6" rx="1.2" />
        </svg>
      )
    default:
      return null
  }
}

export function ChevronIcon({ open, className = 'h-4 w-4' }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function MinusIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className={className}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function TruckIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
      <path d="M13 9h4l3 3v4h-2" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </svg>
  )
}

export function BadgeSealIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5l1.9 1.5 2.4-.3 1 2.2 2.2 1-.3 2.4 1.5 1.9-1.5 1.9.3 2.4-2.2 1-1 2.2-2.4-.3L12 21.5l-1.9-1.5-2.4.3-1-2.2-2.2-1 .3-2.4L3.3 12l1.5-1.9-.3-2.4 2.2-1 1-2.2 2.4.3L12 2.5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
