# SHADCN/UI Adoption on Home Page — Implementation Plan (PEC Intelligence V1)

## 0) Quick clarification: why your local branch differed from `origin/main`

When I searched for `client/src/pages/style-guide.tsx` earlier I was on **`feature/local-changes`**, which was branched off an **older** `main` commit (`218d32f`).

`origin/main` is now at `8871794` and **does contain** `client/src/pages/style-guide.tsx` plus related `components/style-guide/*`.

So the difference wasn’t “local main vs remote main” — it was **feature branch vs updated main**. If you want `feature/local-changes` to include the style guide work, you’ll need to `git merge main` (or rebase) into your feature branch.

---

## 1) What the new Style Guide page tells us (key takeaways)

The style guide (`client/src/pages/style-guide.tsx`) is effectively an audit of “current app UI patterns” vs “shadcn/ui equivalents”. Key findings relevant to the Home page:

1. **Token system gap (important)**
   - The guide flags that Tailwind is configured to use shadcn token CSS variables (e.g. `--background`, `--foreground`, `--primary`), **but these variables are not defined in CSS**.
   - Until `client/src/index.css` defines those vars (dark + light), shadcn components will not render with intended colours.

2. **Homepage is mostly inline-styled**
   - Home uses inline styles for `Card`, `Alert` panels, `Button`s, selects, and nav.

3. **There are known duplication targets**
   - Bottom navigation exists multiple times (canonical `BottomNav.tsx` + inline grids in pages).
   - Card containers and “pill/link/button” patterns vary across pages.

4. **shadcn/ui components are present in the repo**
   - There are already many shadcn components under `client/src/components/ui/*`.

---

## 2) Goal (deliverable definition)

Upgrade **Home page (`client/src/pages/home.tsx`)** to use shadcn/ui components (and Tailwind utility classes) instead of inline CSS, while:

- Preserving existing routing + data logic (View Mode + Scope + alerts + insight)
- Preserving the dark, executive, premium mobile feel
- Reducing duplication (especially bottom nav)
- Avoiding a big-bang rewrite across the entire app

**Success criteria**
- Home page renders with shadcn components + tokens consistently (dark mode)
- No regression in navigation and role/scope switching
- iPhone Safari layout remains clean (safe-area, fixed nav, scroll)

---

## 3) Proposed component mapping (Home page)

### Header
- Current: `<h1>` + subtitle with opacity
- Target:
  - Use typography classes (Tailwind) + optionally `CardHeader` patterns if wrapped.
  - Keep it simple to avoid over-componentising.

### View Mode / Scope selectors
- Current: native `<select>` + custom wrapper (inline CSS)
- Target:
  - Replace each with **shadcn `<Select>`** (`components/ui/select.tsx`)
  - Provide grouped options and consistent trigger styling.
  - Ensure the chosen option still updates `viewMode` and `scope` correctly.

### Alerts
- Current: custom “alert card” div with colored dot and severity label
- Target options:
  1. Use **shadcn `<Alert>`** with:
     - `variant="destructive"` for high
     - custom classNames for medium/low as in style guide
  2. Or use `Card` + `Badge` if we want a more dashboard-like list

Recommended: **Alert** for semantics + speed.

### Utility Cards (Electricity/Water/Gas)
- Current: 3 div cards with label/value/trend
- Target:
  - Use **shadcn `<Card>`** with `CardHeader` + `CardContent`
  - Trend line can use a small `Badge` or simple text with tokenised colours

### AI Insight panel
- Current: single div with background overlay
- Target:
  - Use a **Card** with title row + muted body
  - Optionally add an icon later (but avoid new dependencies)

### Quick Actions
- Current: 2-column grid of inline-styled `<button>`
- Target:
  - Use **shadcn `<Button>`** with variants:
    - primary/secondary/outline depending on hierarchy
  - Consider `size="lg"` for thumb friendliness

### Bottom Nav
- Current: inline fixed bottom grid
- Target:
  - Replace with canonical **`<BottomNav />`** component
  - Ensure padding bottom on page content accounts for fixed nav height

---

## 4) Implementation sequence (task breakdown)

### Phase A — Foundations (tokens + consistency)
1. **Define shadcn token CSS variables** in `client/src/index.css`
   - Add `:root` (light) and `.dark` (dark) blocks (or just dark for demo)
   - Ensure Tailwind token classes like `bg-background`, `text-foreground`, `border-border` render correctly
   - Validate with the Style Guide page

2. **Confirm Tailwind dark mode strategy**
   - If using `.dark` class: ensure `document.documentElement.classList` is set somewhere (optional)
   - For demo: can keep always-dark by default (but tokens must exist)

Deliverable: Style guide token swatches and cards look correct.

### Phase B — Home page migration to shadcn components
3. **Refactor layout scaffolding (minimal risk)**
   - Replace inline `div` background/padding with Tailwind classes
   - Preserve the overall gradient background

4. **Replace View Mode selector with shadcn Select**
   - `SelectTrigger` should feel like the existing premium selector
   - Ensure `handleModeChange()` remains unchanged

5. **Replace Scope selector with shadcn Select**
   - Populate options from `currentOptions`
   - Keep `safeScope` logic intact

6. **Replace Alerts list**
   - Map severity -> className/variant
   - Maintain the “severity label” (High/Medium/Monitoring) either as `AlertDescription` or `Badge`

7. **Replace Utility Cards**
   - Convert each to `<Card>` with consistent spacing
   - Keep trend up/down colour semantics; preferably via tokens (e.g. `text-green-400`, `text-red-400`) or introduce `--status-*` tokens later

8. **Replace AI Insight panel**
   - Convert to Card
   - Optionally add a subtle “AI” badge

9. **Replace Quick Actions buttons**
   - Use `<Button>`
   - Ensure they remain 2-column and thumb-sized

10. **Remove inline Bottom Nav and use `<BottomNav />`**
   - Verify safe-area + spacing on iPhone Safari

Deliverable: Home page uses shadcn components, minimal inline styling remains.

### Phase C — Cleanup & guardrails
11. **Remove now-unused style objects** from `home.tsx`
12. **Visual regression pass**
   - Desktop + mobile sizes
   - iPhone Safari safe-area inset
13. **Follow-up (optional, but high ROI)**
   - Consolidate duplicate nav usage on `usage.tsx` too (per rationalisation list)

---

## 5) Risks / watch-outs during implementation

- **Token CSS vars missing** is the #1 blocker for shadcn looking “right”. Fix that first.
- **Select popover positioning on mobile**: ensure the portal/container doesn’t clip within parent overflow.
- **Fixed bottom nav**: must ensure content has enough bottom padding.
- **Avoid dependency creep**: we already have the shadcn primitives in `components/ui/`.

---

## 6) Suggested next step (your choice)

Pick one:
1. **Low-risk foundation first**: I implement token CSS vars + verify style guide renders correctly.
2. **Direct home refactor**: I refactor Home to shadcn components (but will look off if tokens are missing).
