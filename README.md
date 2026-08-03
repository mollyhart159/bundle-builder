# Bundle Builder

A frontend take-home: a two-column security-system bundle builder rebuilt from a Figma
design. Left: a 4-step accordion product builder. Right: a live-updating order review
panel. Built with **Vite + React 19 + TypeScript + Tailwind CSS**.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # type-checks and produces a production build in dist/
npm run preview  # serves the production build locally
```

No backend and no environment variables are required — all product/plan data is a
local JSON file (`src/data/products.json`, `src/data/plans.json`).

## Project structure

```
src/
├── types/bundle.ts        # Product, Variant, PlanOption, BundleState, actions
├── data/                  # products.json, plans.json, steps.ts (data-driven, no hardcoded markup)
├── state/                 # BundleContext + useReducer + seed initialState
├── hooks/                 # useBundle, useBundleTotals (derived pricing), usePersistence
├── lib/pricing.ts         # pure functions: line totals, category grouping, cart totals
├── utils/                 # currency formatting, quantity-map key helper
└── components/
    ├── layout/             # responsive two-column AppShell
    ├── builder/            # accordion, product cards, variant chips, plan cards
    ├── review/             # review panel, sections, line items, summary
    ├── shared/             # QuantityStepper, DiscountBadge, PriceTag (reused by both columns)
    └── icons/              # inline SVG icons + placeholder product illustrations
```

State lives in a single `useReducer` store (`BundleContext`), keyed so that every
`(productId, variantId)` pair carries its own independent quantity. The card's stepper
always reads/writes whichever variant is currently "active" for that product; the review
panel ignores "active" entirely and lists every variant with qty > 0 as its own line —
so switching the active color chip never drops an already-quantified variant. Both the
product card and the review line item render the exact same `<QuantityStepper>` and
dispatch the same `SET_QTY` action, so the two can't drift out of sync.

No component exceeds ~110 lines. The largest file overall is `lib/pricing.ts` at 146
lines — pure calculation logic, not markup. The codebase stays well under the
500-line-per-component ceiling by decomposition rather than by padding.

## Decisions & tradeoffs

- **Pricing ground truth.** The source Figma mock's numbers don't reconcile with
  themselves: the product card's per-unit price for a "Save 12%"-badged item reproduces
  that exact 12% discount, but the review panel's literal total for that same item at
  quantity 2 implies a different unit price entirely. Since the app has to genuinely
  recalculate totals as quantities change, both can't be true. I treated the **card's
  per-unit price as ground truth** (it's independently verifiable via the badge
  percentage) and let the review panel compute real, internally-consistent totals from
  `unit price × qty`. The initial seeded total therefore won't pixel-match the mock's own
  static review-panel numbers — it's arithmetically correct instead.
- **Financing figure.** The "as low as $X/mo" pill is computed as `productTotal / 12`
  (rounded to cents) — the one-time hardware total only, since the plan fee is already
  billed monthly and isn't something you'd finance. The mock's own figure doesn't
  reconcile with its own total either (same root cause as above), so there's no formula
  to reverse-engineer; this is a reasonable placeholder for a real financing-partner
  calculation.
- **Plan step (Step 2).** Only one selected plan ("Cam Unlimited") appears in the
  screenshots — Step 2's expanded state wasn't provided. I added a second, unselected
  "No Monthly Plan" option so the step represents a real choice, implemented as a
  single-select (not quantity-based, since a monthly plan isn't something you buy
  multiples of).
- **Required item (Sense Hub).** Modeled as `required: true` — its stepper is fully
  disabled and locked at qty 1, matching the "disabled steppers" fidelity requirement.
- **Variant label in the review panel.** Shown only when a product has more than one
  active variant at once (e.g., White ×1 and Grey ×2 of the same camera) — otherwise
  it's omitted to match the design's plain product-name rows.
- **Product images.** No exported Figma assets were available, only screenshots, so
  each product renders a small self-contained SVG placeholder illustration rather than a
  cropped screenshot or an external image dependency.
- **Checkout.** Placeholder only, per the spec — clicking it shows an inline message; there's no real destination.
- **Persistence.** "Save my system for later" writes the full bundle state to
  `localStorage` only on click (not on every change), and it's read back once on mount.
  Reloading the page (or returning later) restores the exact configuration you left.

## What I didn't build

- No backend/API (the JSON-file approach is explicitly allowed as the non-bonus path).
- No automated test suite — verification was done by manually driving the app through
  every interaction requirement (variant switching, stepper sync, accordion behavior,
  live totals, persistence) in a real browser.
