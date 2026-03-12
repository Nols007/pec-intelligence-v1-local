# Style Guide Page — Implementation Plan

## Purpose

A hidden reference page at `/style-guide` (not linked from the main app, URL-only access) that:

- Audits every UI pattern currently used in the app
- Shows **shadcn/ui** component alongside the **current inline-style equivalent** side by side
- Labels each component as **USED** (appears in at least one page) or **UNUSED** (shadcn component installed but never imported)
- Provides interactive demos (dialogs open, dropdowns work, toasts fire)
- Includes a **light / dark mode toggle** (isolated to this page — app remains dark-only)
- Serves as a long-running reference for building new pages consistently

## Branch

`feature/style-guide`

---

## Key Findings from Audit

### The Gap

| Layer | Installed | Actually Used |
|---|---|---|
| shadcn/ui components | 40+ | 0 |
| Tailwind classes | Fully configured | Only in `SplashScreen.tsx` |
| Inline `style={{}}` | — | Every page |
| CSS class names (`.card`, `.btn`, etc.) | Used in `support.tsx` | Not defined in any CSS file — likely phantom |

### Duplicated Patterns (rationalisation targets)

| Pattern | Instances |
|---|---|
| Bottom nav | 3× (home.tsx inline, usage.tsx inline, BottomNav.tsx component) |
| Card container | 4+ (dashboard Card fn, home utility cards, meters MeterRow, advisory/insights cards) |
| Link/pill button | 3× different `linkStyle` / `actionButton` / `pillStyle` constants |
| Alert/severity card | 1× implementation in home.tsx (high/medium/low) |
| Section label | 2× (`sectionLabel` in home.tsx, unlabelled inline in usage.tsx) |

---

## File Structure

```
client/src/
  pages/
    style-guide.tsx          ← Main style guide page (new)
  components/
    style-guide/
      SectionBlock.tsx       ← Reusable section wrapper (label, anchor, USED/UNUSED badge)
      CompareRow.tsx         ← Side-by-side comparison container
      TokenSwatch.tsx        ← Colour token swatch for the colour section
```

---

## Section Plan (Ordered)

### Phase 1 — Foundations

#### 1. Typography
- All heading sizes used in the app (fontSize 70px, 54px, 46px, 32px, 28px, 22px)
- Body paragraph, `.muted`, subtitle, section label
- Font weight scale (700, 800, 900, 950)
- **UNUSED:** shadcn's `CardTitle`, `CardDescription` patterns
- **USED:** inline `h1` styles, `div` with fontSize + fontWeight

#### 2. Colours & Design Tokens
- Full palette swatchboard from `tailwind.config.ts`
  - `primary`, `secondary`, `muted`, `accent`, `destructive`
  - `card`, `popover`, `sidebar` surfaces
  - `chart-1` through `chart-5`
  - `status.online/away/busy/offline`
- Raw hex colours used inline across pages:
  - Trend up: `#4ade80` / `#22c55e`
  - Trend down: `#f87171`
  - Alert high: `rgba(127,29,29,0.22)` border `rgba(248,113,113,0.32)`
  - Alert medium: amber family
  - Alert low: green family
  - Surface: `rgba(255,255,255,0.05)`, `rgba(255,255,255,0.06)`
  - Border: `rgba(255,255,255,0.08)`, `rgba(255,255,255,0.12)`, `rgba(255,255,255,0.14)`

#### 3. Buttons
Variants to show:
| Variant | shadcn | Inline equivalent in app |
|---|---|---|
| Primary / default | `<Button>` | `actionButton` (home.tsx) — **USED** |
| Destructive | `<Button variant="destructive">` | `.btnRed` (support.tsx) — **USED** |
| Outline | `<Button variant="outline">` | `linkStyle` (bills/meters/advisory) — **USED** |
| Ghost | `<Button variant="ghost">` | `navButton` (home/usage) — **USED** |
| Secondary | `<Button variant="secondary">` | No equivalent — **UNUSED** |
| Pill / rounded | `<Button className="rounded-full">` | `pillStyle` (dashboard.tsx) — **USED** |
| Sizes: sm, default, lg, icon | All shadcn sizes | — |
| Disabled state | — | — |
| With icon | — | — |

#### 4. Cards
| Variant | shadcn | Inline equivalent |
|---|---|---|
| Standard card | `<Card>` + Header/Content/Footer | `cardStyle` (home.tsx) — **USED** |
| Card with meta | — | dashboard `Card` component — **USED** |
| Nested inner row | — | `MeterRow` (meters.tsx) — **USED** |
| Alert card high | — | `alertCard("high")` — **USED** |
| Alert card medium | — | `alertCard("medium")` — **USED** |
| Alert card low | — | `alertCard("low")` — **USED** |

---

### Phase 2 — Form Controls

#### 5. Text Inputs & Textarea
- shadcn `<Input>` — **UNUSED**
- shadcn `<Textarea>` — **UNUSED** (app uses `<textarea className="textarea">` — class not defined)
- shadcn `<Label>` — **UNUSED**
- shadcn `<Form>` + react-hook-form — **UNUSED**

#### 6. Selects & Dropdowns
- shadcn `<Select>` — **UNUSED**
- shadcn `<DropdownMenu>` — **UNUSED**
- shadcn `<Command>` (combobox) — **UNUSED**
- App current: raw `<select className="select">` (support.tsx) and `<select style={selectorStyle}>` (home.tsx) — both **USED**

#### 7. Toggles & Checkboxes
- shadcn `<Switch>` — **UNUSED**
- shadcn `<Checkbox>` — **UNUSED**
- shadcn `<RadioGroup>` — **UNUSED**
- shadcn `<Slider>` — **UNUSED**
- App custom: `PecViewToggle` component (residential/portfolio) — **USED**

---

### Phase 3 — Feedback

#### 8. Alerts & Notifications
- shadcn `<Alert>` (default + destructive) — **UNUSED**
- shadcn `<Badge>` — **UNUSED**
- App current: inline `alertCard()` pattern (home.tsx) — **USED** (high/medium/low)
- shadcn `<Toast>` / `<Toaster>` — **UNUSED** (Toaster installed in `components/ui/toaster.tsx`)

#### 9. Dialogs & Overlays
- shadcn `<Dialog>` — **UNUSED** (interactive — clicking opens it)
- shadcn `<AlertDialog>` — **UNUSED** (interactive — confirm dialog demo)
- shadcn `<Sheet>` — **UNUSED** (slides in from bottom/side)
- shadcn `<Drawer>` — **UNUSED** (mobile-style)
- shadcn `<Popover>` — **UNUSED** (anchored)
- shadcn `<HoverCard>` — **UNUSED**
- App current: `window.confirm()` (support.tsx "Clear demo tickets") — **USED**

---

### Phase 4 — Navigation & Data Display

#### 10. Navigation Patterns
- shadcn `<Tabs>` — **UNUSED**
- shadcn `<NavigationMenu>` — **UNUSED**
- shadcn `<Breadcrumb>` — **UNUSED**
- shadcn `<Pagination>` — **UNUSED**
- App custom: `BottomNav` component — **USED** (also reimplemented inline in home.tsx and usage.tsx — **DUPLICATE**)
- App custom: `PecViewToggle` — **USED**

#### 11. Data Display
- shadcn `<Table>` — **UNUSED**
- shadcn `<Accordion>` — **UNUSED**
- shadcn `<Collapsible>` — **UNUSED**
- shadcn `<Separator>` — **UNUSED**
- shadcn `<Progress>` — **UNUSED**
- shadcn `<Skeleton>` — **UNUSED**
- shadcn `<Avatar>` — **UNUSED**
- App current: bar chart (div-based, usage.tsx) — **USED**

#### 12. Layout & Spacing
- Border radius tokens (lg=9px, md=6px, sm=3px) vs inline values (14px, 16px, 18px, 22px used across app)
- Surface opacity scale
- Grid patterns (1-col, 2-col action grid from home.tsx)
- Page container (`max-width: 980px`, `.page` class)
- Bottom nav safe area padding
- `PageContainer.tsx` layout component — **UNUSED** (exists but no pages import it)

---

## Technical Implementation Notes

### Light/Dark Toggle
- Add a `useState` toggle local to the `StyleGuide` page
- Apply `data-theme="light"` or `data-theme="dark"` to the page wrapper
- This is isolated — main app remains dark-only

### Section Wrapper Pattern
```tsx
<SectionBlock
  id="buttons"
  title="Buttons"
  description="..."
>
  <CompareRow
    label="Primary Button"
    appUsage="USED — home.tsx actionButton"
    shadcn={<Button>Click me</Button>}
    current={<button style={actionButton}>Click me</button>}
  />
</SectionBlock>
```

### Routing
- Add to `App.tsx`: `<Route path="/style-guide" element={<StyleGuide />} />`
- No link from any nav — URL-only access

---

## Iterative Delivery Order

| Phase | Sections | Status |
|---|---|---|
| 1 — Foundations | Typography, Colours, Buttons, Cards | ⬜ Todo |
| 2 — Forms | Inputs, Textarea, Select, Dropdowns, Toggles | ⬜ Todo |
| 3 — Feedback | Alerts, Badge, Toast, Dialogs, Overlays | ⬜ Todo |
| 4 — Nav & Data | Tabs, Navigation, Table, Accordion, Layout | ⬜ Todo |

---

## Acceptance Criteria

- [ ] Page accessible at `http://localhost:3000/style-guide`
- [ ] Not linked from any nav or page in the main app
- [ ] Each section has anchor links from a sticky table of contents at top
- [ ] Each component shows shadcn version + current app version side by side
- [ ] Every component clearly labelled as **USED** or **UNUSED** with source file noted
- [ ] Interactive components (dialogs, toasts, dropdowns) are wired up and functional
- [ ] Light/dark mode toggle works, isolated to this page
- [ ] All 4 phases delivered
