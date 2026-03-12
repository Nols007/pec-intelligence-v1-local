import { useState } from "react";
import SectionBlock from "@/components/style-guide/SectionBlock";
import CompareRow from "@/components/style-guide/CompareRow";
import TokenSwatch from "@/components/style-guide/TokenSwatch";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import PecViewToggle from "@/components/PecViewToggle";

const TOC_SECTIONS = [
  { id: "typography",    label: "Typography" },
  { id: "colours",       label: "Colours" },
  { id: "buttons",       label: "Buttons" },
  { id: "cards",         label: "Cards" },
  { id: "inputs",        label: "Inputs" },
  { id: "selects",       label: "Selects" },
  { id: "toggles",       label: "Toggles" },
  { id: "alerts",        label: "Alerts" },
  { id: "dialogs",       label: "Dialogs" },
  { id: "navigation",    label: "Navigation" },
  { id: "data-display",  label: "Data Display" },
  { id: "layout",        label: "Layout" },
];

const TOKEN_SWATCHES = [
  { name: "background",       value: "hsl(var(--background))",       displayColor: "var(--background)" },
  { name: "foreground",       value: "hsl(var(--foreground))",       displayColor: "var(--foreground)" },
  { name: "card",             value: "hsl(var(--card))",             displayColor: "var(--card)" },
  { name: "card-foreground",  value: "hsl(var(--card-foreground))",  displayColor: "var(--card-foreground)" },
  { name: "popover",          value: "hsl(var(--popover))",          displayColor: "var(--popover)" },
  { name: "popover-fg",       value: "hsl(var(--popover-foreground))", displayColor: "var(--popover-foreground)" },
  { name: "primary",          value: "hsl(var(--primary))",          displayColor: "var(--primary)" },
  { name: "primary-fg",       value: "hsl(var(--primary-foreground))", displayColor: "var(--primary-foreground)" },
  { name: "secondary",        value: "hsl(var(--secondary))",        displayColor: "var(--secondary)" },
  { name: "secondary-fg",     value: "hsl(var(--secondary-foreground))", displayColor: "var(--secondary-foreground)" },
  { name: "muted",            value: "hsl(var(--muted))",            displayColor: "var(--muted)" },
  { name: "muted-fg",         value: "hsl(var(--muted-foreground))", displayColor: "var(--muted-foreground)" },
  { name: "accent",           value: "hsl(var(--accent))",           displayColor: "var(--accent)" },
  { name: "accent-fg",        value: "hsl(var(--accent-foreground))", displayColor: "var(--accent-foreground)" },
  { name: "destructive",      value: "hsl(var(--destructive))",      displayColor: "var(--destructive)" },
  { name: "destructive-fg",   value: "hsl(var(--destructive-foreground))", displayColor: "var(--destructive-foreground)" },
  { name: "ring",             value: "hsl(var(--ring))",             displayColor: "var(--ring)" },
  { name: "chart-1",          value: "hsl(var(--chart-1))",          displayColor: "var(--chart-1)" },
  { name: "chart-2",          value: "hsl(var(--chart-2))",          displayColor: "var(--chart-2)" },
  { name: "chart-3",          value: "hsl(var(--chart-3))",          displayColor: "var(--chart-3)" },
  { name: "chart-4",          value: "hsl(var(--chart-4))",          displayColor: "var(--chart-4)" },
  { name: "chart-5",          value: "hsl(var(--chart-5))",          displayColor: "var(--chart-5)" },
  { name: "sidebar",          value: "hsl(var(--sidebar))",          displayColor: "var(--sidebar)" },
  { name: "status-online",    value: "hsl(var(--status-online))",    displayColor: "var(--status-online)" },
  { name: "status-away",      value: "hsl(var(--status-away))",      displayColor: "var(--status-away)" },
  { name: "status-busy",      value: "hsl(var(--status-busy))",      displayColor: "var(--status-busy)" },
  { name: "status-offline",   value: "hsl(var(--status-offline))",   displayColor: "var(--status-offline)" },
];

const INLINE_SWATCHES = [
  { name: "green",              value: "#4ade80",                    displayColor: "#4ade80" },
  { name: "red",                value: "#f87171",                    displayColor: "#f87171" },
  { name: "alert-high-bg",      value: "rgba(127,29,29,0.22)",      displayColor: "rgba(127,29,29,0.22)" },
  { name: "alert-medium-bg",    value: "rgba(120,53,15,0.22)",      displayColor: "rgba(120,53,15,0.22)" },
  { name: "alert-low-bg",       value: "rgba(21,128,61,0.16)",      displayColor: "rgba(21,128,61,0.16)" },
  { name: "surface",            value: "rgba(255,255,255,0.05)",    displayColor: "rgba(255,255,255,0.05)" },
  { name: "surface-alt",        value: "rgba(255,255,255,0.06)",    displayColor: "rgba(255,255,255,0.06)" },
  { name: "border",             value: "rgba(255,255,255,0.08)",    displayColor: "rgba(255,255,255,0.08)" },
  { name: "border-alt",         value: "rgba(255,255,255,0.12)",    displayColor: "rgba(255,255,255,0.12)" },
];

export default function StyleGuide() {
  const [isDark, setIsDark] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();

  const bg = isDark ? "#0d0d0d" : "#f5f5f5";
  const fg = isDark ? "#ffffff" : "#000000";
  const tocBg = isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.92)";
  const tocBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const anchorColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const anchorHoverColor = isDark ? "#fff" : "#000";
  const toggleBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  // Local copies of selector styles from home.tsx
  const selectorWrap: React.CSSProperties = {
    position: "relative",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    overflow: "hidden",
  };

  const selectorChevron: React.CSSProperties = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    opacity: 0.7,
    fontSize: "12px",
  };

  const selectorStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    color: "#fff",
    border: "none",
    outline: "none",
    padding: "16px",
    fontSize: "16px",
    fontWeight: 700,
    appearance: "none",
    WebkitAppearance: "none",
  };

  const actionButton: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: fg,
        fontFamily: "inherit",
      }}
    >
      {/* Sticky TOC */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: tocBg,
          borderBottom: `1px solid ${tocBorder}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 24px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", opacity: 0.5, marginRight: "4px", textTransform: "uppercase" }}>
          Style Guide
        </span>

        {TOC_SECTIONS.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: anchorColor,
              textDecoration: "none",
              padding: "3px 8px",
              borderRadius: "6px",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = anchorHoverColor; (e.target as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = anchorColor; (e.target as HTMLElement).style.background = "transparent"; }}
          >
            <span style={{ opacity: 0.4, marginRight: "2px" }}>{i + 1}.</span>{label}
          </a>
        ))}

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => setIsDark(d => !d)}
            style={{
              cursor: "pointer",
              background: toggleBg,
              border: "none",
              borderRadius: "8px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 700,
              color: fg,
              letterSpacing: "0.02em",
            }}
          >
            {isDark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
            PEC Intelligence — Style Guide
          </div>
          <div style={{ opacity: 0.5, fontSize: "14px" }}>
            Living reference of all design tokens, components, and patterns used in the app.
          </div>
        </div>

        {/* ── Section 1: Typography ── */}
        <SectionBlock
          id="typography"
          title="1. Typography"
          description="Heading sizes, body text, and text utility classes used across the app."
          isDark={isDark}
        >
          <CompareRow
            label="Display — 70px / 950"
            status="USED"
            appNote="home.tsx — hero headline"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "28px", fontWeight: 950, lineHeight: 1 }}>shadcn h1</span>}
            appSlot={<span style={{ fontSize: "70px", fontWeight: 950, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Heading 1 — 54px / 950"
            status="USED"
            appNote="dashboard.tsx — main title"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "24px", fontWeight: 900 }}>shadcn h1</span>}
            appSlot={<span style={{ fontSize: "54px", fontWeight: 950, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Heading 2 — 46px / 950"
            status="USED"
            appNote="meters.tsx, pages — section titles"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "20px", fontWeight: 800 }}>shadcn h2</span>}
            appSlot={<span style={{ fontSize: "46px", fontWeight: 950, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Heading 3 — 32px / 800"
            status="USED"
            appNote="cards, panels"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "18px", fontWeight: 700 }}>shadcn h3</span>}
            appSlot={<span style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Heading 4 — 28px / 800"
            status="USED"
            appNote="subheadings"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "16px", fontWeight: 700 }}>shadcn h4</span>}
            appSlot={<span style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Section label — 22px / 950"
            status="USED"
            appNote="section headings"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "14px", fontWeight: 900 }}>shadcn h5</span>}
            appSlot={<span style={{ fontSize: "22px", fontWeight: 950, lineHeight: 1 }}>Aa</span>}
          />
          <CompareRow
            label="Body text — 14px / 400"
            status="USED"
            appNote="general body copy"
            isDark={isDark}
            shadcnSlot={<span style={{ fontSize: "14px" }}>The quick brown fox jumps over the lazy dog.</span>}
            appSlot={<span style={{ fontSize: "14px", lineHeight: 1.6 }}>The quick brown fox jumps over the lazy dog.</span>}
          />
          <CompareRow
            label="Muted text"
            status="USED"
            appNote="opacity: 0.55–0.75 pattern"
            isDark={isDark}
            shadcnSlot={<span className="text-muted-foreground" style={{ fontSize: "14px" }}>Muted via Tailwind token</span>}
            appSlot={<span style={{ fontSize: "14px", opacity: 0.6 }}>Muted via inline opacity</span>}
          />
          <CompareRow
            label="Inline heading — fontWeight 950"
            status="USED"
            appNote="meter names, row labels"
            isDark={isDark}
            shadcnSlot={<span style={{ fontWeight: 700, fontSize: "14px" }}>shadcn bold</span>}
            appSlot={<span style={{ fontWeight: 950, fontSize: "14px" }}>App ultrabold 950</span>}
          />
          <CompareRow
            label="CardTitle"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={<CardTitle>Card Title</CardTitle>}
            note="shadcn CardTitle not used — app uses custom inline heading styles"
          />
          <CompareRow
            label="CardDescription"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={<CardDescription>Card description text here</CardDescription>}
            note="shadcn CardDescription not used — app uses opacity-based muted text"
          />
        </SectionBlock>

        {/* ── Section 2: Colours ── */}
        <SectionBlock
          id="colours"
          title="2. Colours"
          description="Tailwind CSS custom token colours and inline-only colour values."
          isDark={isDark}
        >
          {/* Token swatches sub-section */}
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", opacity: 0.5, textTransform: "uppercase", marginBottom: "16px" }}>
              CSS Variable Tokens
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {TOKEN_SWATCHES.map(s => (
                <TokenSwatch
                  key={s.name}
                  name={s.name}
                  value={s.value}
                  displayColor={s.displayColor}
                  isDark={isDark}
                  source="token"
                />
              ))}
            </div>
          </div>

          {/* Inline colours sub-section */}
          <div style={{ padding: "20px", borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", opacity: 0.5, textTransform: "uppercase", marginBottom: "16px" }}>
              Inline-only Colours (not in token system)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {INLINE_SWATCHES.map(s => (
                <TokenSwatch
                  key={s.name}
                  name={s.name}
                  value={s.value}
                  displayColor={s.displayColor}
                  isDark={isDark}
                  source="inline"
                />
              ))}
            </div>
          </div>
        </SectionBlock>

        {/* ── Placeholder Sections 3–4 ── */}
        {[
          { id: "buttons", title: "3. Buttons" },
          { id: "cards",   title: "4. Cards" },
        ].map(s => (
          <SectionBlock key={s.id} id={s.id} title={s.title} isDark={isDark}>
            <div style={{ padding: "20px", opacity: 0.4 }}>Coming soon…</div>
          </SectionBlock>
        ))}

        {/* ── Section 5: Inputs & Textarea ── */}
        <SectionBlock
          id="inputs"
          title="5. Inputs & Textarea"
          description="Text input, textarea, and label components."
          isDark={isDark}
        >
          <CompareRow
            label="Text Input"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={<Input placeholder="Type here…" />}
            appSlot={
              <input
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "16px",
                  color: "#fff",
                  fontSize: "16px",
                  width: "100%",
                }}
                placeholder="Type here…"
              />
            }
            note="No shadcn Input used in app"
          />
          <CompareRow
            label="Textarea"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={<Textarea placeholder="Describe your issue…" />}
            appSlot={
              <textarea
                className="textarea"
                placeholder="Describe…"
                style={{ width: "100%", minHeight: "80px" }}
              />
            }
            appNote="support.tsx — className &quot;textarea&quot; (CSS class undefined)"
          />
          <CompareRow
            label="Label"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Label htmlFor="demo">Field label</Label>
                <Input id="demo" placeholder="Value" />
              </div>
            }
          />
          <div style={{ padding: "12px 20px 20px" }}>
            <div style={{ padding: "12px 16px", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "10px", fontSize: "13px", lineHeight: 1.6 }}>
              ⚠️ <strong>Bug / Gap:</strong> <code>.textarea</code> and <code>.select</code> classNames used in{" "}
              <code>support.tsx</code> have no CSS definition — these styles are missing from{" "}
              <code>index.css</code>.
            </div>
          </div>
        </SectionBlock>

        {/* ── Section 6: Selects & Dropdowns ── */}
        <SectionBlock
          id="selects"
          title="6. Selects & Dropdowns"
          description="Native select, shadcn Select, and DropdownMenu components."
          isDark={isDark}
        >
          <CompareRow
            label="Select"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                </SelectContent>
              </Select>
            }
            appSlot={
              <div style={selectorWrap}>
                <div style={selectorChevron}>▼</div>
                <select style={selectorStyle}>
                  <option>Residential</option>
                  <option>Portfolio</option>
                </select>
              </div>
            }
            appNote="home.tsx — selectorStyle"
          />
          <CompareRow
            label="DropdownMenu"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu ▾</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        </SectionBlock>

        {/* ── Section 7: Toggles & Checkboxes ── */}
        <SectionBlock
          id="toggles"
          title="7. Toggles & Checkboxes"
          description="Switch, Checkbox, RadioGroup, Slider, and PecViewToggle components."
          isDark={isDark}
        >
          <CompareRow
            label="Switch"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Switch id="demo-switch" />
                <Label htmlFor="demo-switch">Enable notifications</Label>
              </div>
            }
          />
          <CompareRow
            label="Checkbox"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Checkbox id="demo-cb" />
                <Label htmlFor="demo-cb">Accept terms</Label>
              </div>
            }
          />
          <CompareRow
            label="RadioGroup"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <RadioGroup defaultValue="a">
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <RadioGroupItem value="a" id="r1" />
                  <Label htmlFor="r1">Option A</Label>
                  <RadioGroupItem value="b" id="r2" />
                  <Label htmlFor="r2">Option B</Label>
                </div>
              </RadioGroup>
            }
          />
          <CompareRow
            label="Slider"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={<Slider defaultValue={[50]} max={100} step={1} className="w-48" />}
          />
          <CompareRow
            label="PecViewToggle"
            status="USED"
            isDark={isDark}
            appSlot={<PecViewToggle />}
            appNote="PecViewToggle.tsx — custom toggle"
            shadcnSlot={<span style={{ opacity: 0.4, fontSize: "13px" }}>no shadcn equivalent</span>}
          />
        </SectionBlock>

        {/* ── Section 8: Alerts & Notifications ── */}
        <SectionBlock
          id="alerts"
          title="8. Alerts & Notifications"
          description="Alert variants, Badge, and Toast notification components."
          isDark={isDark}
        >
          <CompareRow
            label="Alert — Default"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can now add components.</AlertDescription>
              </Alert>
            }
          />
          <CompareRow
            label="Alert — Destructive"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
            }
          />
          <CompareRow
            label="Badge"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            }
          />
          <CompareRow
            label="Toast (fire on click)"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Button onClick={() => toast({ title: "Toast fired", description: "This is a shadcn toast" })}>
                Fire Toast
              </Button>
            }
            note="use-toast.ts exists but Toaster never used in app"
          />
        </SectionBlock>

        {/* ── Section 9: Dialogs & Overlays ── */}
        <SectionBlock
          id="dialogs"
          title="9. Dialogs & Overlays"
          description="Dialog, AlertDialog, Sheet overlays and native confirm() pattern."
          isDark={isDark}
        >
          <CompareRow
            label="Dialog"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>This is a modal dialog.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
          />
          <CompareRow
            label="AlertDialog"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Open Alert Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          />
          <CompareRow
            label="Sheet"
            status="UNUSED"
            isDark={isDark}
            shadcnSlot={
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>This slides up from the bottom.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            }
          />
          <CompareRow
            label="window.confirm()"
            status="USED"
            isDark={isDark}
            appSlot={
              <button
                style={actionButton}
                onClick={() => window.confirm("Are you sure?")}
              >
                Clear tickets (confirm)
              </button>
            }
            appNote="support.tsx current pattern"
            shadcnSlot={<span style={{ opacity: 0.4, fontSize: "13px" }}>no shadcn equivalent</span>}
          />
        </SectionBlock>

        {/* ── Placeholder Sections 10–12 ── */}
        {[
          { id: "navigation",   title: "10. Navigation" },
          { id: "data-display", title: "11. Data Display" },
          { id: "layout",       title: "12. Layout" },
        ].map(s => (
          <SectionBlock key={s.id} id={s.id} title={s.title} isDark={isDark}>
            <div style={{ padding: "20px", opacity: 0.4 }}>Coming soon…</div>
          </SectionBlock>
        ))}

        <Toaster />
      </div>
    </div>
  );
}
