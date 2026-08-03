interface ProductPlaceholderProps {
  image: string
  className?: string
}

const BG_COLORS: Record<string, string> = {
  'camera-dome': '#eef1f5',
  'camera-pan': '#eef1f5',
  'camera-floodlight': '#eef1f5',
  'camera-doorbell': '#e7e9ee',
  'camera-battery': '#eef1f5',
  'sensor-motion': '#eef2f0',
  'sensor-hub': '#eef2f0',
  'accessory-microsd': '#eef0f5',
}

export function ProductPlaceholder({ image, className = 'h-16 w-16' }: ProductPlaceholderProps) {
  const bg = BG_COLORS[image] ?? '#eef1f5'

  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-lg`}
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="h-3/4 w-3/4" fill="none" stroke="#4b5563" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {renderGlyph(image)}
      </svg>
    </div>
  )
}

function renderGlyph(image: string) {
  switch (image) {
    case 'camera-dome':
      return (
        <>
          <circle cx="20" cy="20" r="11" />
          <circle cx="20" cy="20" r="4.5" fill="#4b5563" />
        </>
      )
    case 'camera-pan':
      return (
        <>
          <rect x="13" y="10" width="14" height="12" rx="4" />
          <rect x="15" y="26" width="10" height="4" rx="1.5" />
          <path d="M10 6a14 14 0 0 1 20 0" />
        </>
      )
    case 'camera-floodlight':
      return (
        <>
          <rect x="8" y="16" width="10" height="8" rx="2" />
          <rect x="22" y="16" width="10" height="8" rx="2" />
          <path d="M20 24v6" />
        </>
      )
    case 'camera-doorbell':
      return (
        <>
          <rect x="14" y="6" width="12" height="28" rx="4" />
          <circle cx="20" cy="15" r="2.4" fill="#4b5563" />
        </>
      )
    case 'camera-battery':
      return (
        <>
          <rect x="15" y="7" width="10" height="26" rx="5" />
          <circle cx="20" cy="16" r="2.4" fill="#4b5563" />
        </>
      )
    case 'sensor-motion':
      return (
        <>
          <rect x="10" y="12" width="20" height="16" rx="3" />
          <path d="M15 20a5 5 0 0 1 10 0" />
        </>
      )
    case 'sensor-hub':
      return (
        <>
          <rect x="7" y="17" width="26" height="8" rx="3" />
          <path d="M14 17v-3M20 17v-3M26 17v-3" />
        </>
      )
    case 'accessory-microsd':
      return (
        <>
          <path d="M13 6h11l4 4v24a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
          <path d="M15 6v6h6V6" />
        </>
      )
    default:
      return <rect x="10" y="10" width="20" height="20" rx="3" />
  }
}
