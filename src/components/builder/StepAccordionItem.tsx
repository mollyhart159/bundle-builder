import type { ReactNode } from 'react'
import type { StepConfig } from '../../types/bundle'
import { useBundle } from '../../hooks/useBundle'
import { ChevronIcon, StepIcon } from '../icons/StepIcons'
import { NextStepButton } from './NextStepButton'

interface StepAccordionItemProps {
  step: StepConfig
  selectedCount: number
  nextStepTitle?: string
  children: ReactNode
}

export function StepAccordionItem({
  step,
  selectedCount,
  nextStepTitle,
  children,
}: StepAccordionItemProps) {
  const { state, dispatch } = useBundle()
  const isOpen = state.openStep === step.id

  const toggle = () => dispatch({ type: 'SET_OPEN_STEP', stepId: step.id })

  return (
    <div className="border-t border-slate-200 first:border-t-0">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Step {step.id} of 4
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
            <StepIcon icon={step.icon} className="h-5 w-5 shrink-0 text-slate-700" />
            {step.title}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-indigo-600">
          {selectedCount} selected
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {isOpen && (
        <div className="bg-[#EDF4FF] px-4 pb-5 pt-1 sm:px-5">
          {children}
          {nextStepTitle && (
            <div className="mt-4">
              <NextStepButton
                label={nextStepTitle}
                onClick={() => dispatch({ type: 'SET_OPEN_STEP', stepId: step.id + 1 })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
