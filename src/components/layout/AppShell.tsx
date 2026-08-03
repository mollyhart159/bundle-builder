import type { ReactNode } from 'react'

export function AppShell({ builder, review }: { builder: ReactNode; review: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1213px] flex-col gap-6 lg:flex-row lg:items-start lg:gap-[13px]">
        {builder}
        {review}
      </div>
    </div>
  )
}
