interface NextStepButtonProps {
  label: string
  onClick: () => void
}

export function NextStepButton({ label, onClick }: NextStepButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
    >
      Next: {label}
    </button>
  )
}
