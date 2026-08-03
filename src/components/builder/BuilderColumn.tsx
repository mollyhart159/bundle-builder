import type { ReactNode } from 'react'
import { STEPS } from '../../data/steps'
import { useBundle } from '../../hooks/useBundle'
import { plans, products, useCategorySelectedCount } from '../../hooks/useBundleTotals'
import type { Category, StepConfig } from '../../types/bundle'
import { PlanOptionCard } from './PlanOptionCard'
import { ProductGrid } from './ProductGrid'
import { StepAccordionItem } from './StepAccordionItem'

function CategoryStepBody({ category }: { category: Category }) {
  const categoryProducts = products.filter((product) => product.category === category)
  return <ProductGrid products={categoryProducts} />
}

function PlanStepBody() {
  const { state, dispatch } = useBundle()

  return (
    <div className="flex flex-col gap-3">
      {plans.map((plan) => (
        <PlanOptionCard
          key={plan.id}
          plan={plan}
          isSelected={state.selectedPlanId === plan.id}
          onSelect={() => dispatch({ type: 'SELECT_PLAN', planId: plan.id })}
        />
      ))}
    </div>
  )
}

function StepAccordionEntry({
  step,
  nextStepTitle,
  children,
}: {
  step: StepConfig
  nextStepTitle?: string
  children: ReactNode
}) {
  const categoryCount = useCategorySelectedCount(
    step.key === 'plan' ? 'cameras' : (step.key as Category),
  )
  const selectedCount = step.key === 'plan' ? 1 : categoryCount

  return (
    <StepAccordionItem step={step} selectedCount={selectedCount} nextStepTitle={nextStepTitle}>
      {children}
    </StepAccordionItem>
  )
}

export function BuilderColumn() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white lg:w-[768px]">
      {STEPS.map((step, index) => (
        <StepAccordionEntry key={step.id} step={step} nextStepTitle={STEPS[index + 1]?.title}>
          {step.key === 'plan' ? <PlanStepBody /> : <CategoryStepBody category={step.key} />}
        </StepAccordionEntry>
      ))}
    </div>
  )
}
