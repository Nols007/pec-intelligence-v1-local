import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pecLogo from "../assets/pec-logo.png";
import { usePecView } from "../state/pecView";

type ViewMode = "residential" | "portfolio" | "pecInternal";

type ScopeKey =
  | "homeMain"
  | "unit12"
  | "unit23"
  | "menlyn"
  | "waterfall"
  | "sandton"
  | "watchdog"
  | "regional"
  | "critical";

type ScopeData = {
  title: string;
  subtitle: string;
  electricity: string;
  electricityTrend: string;
  electricityUp: boolean;
  water: string;
  waterTrend: string;
  waterUp: boolean;
  gas: string;
  gasTrend: string;
  gasUp: boolean;
  insight: string;
  alerts: { title: string; severity: "high" | "medium" | "low" }[];
};

const residentialScopes: Record<"homeMain" | "unit12" | "unit23", ScopeData> = {
  homeMain: {
    title: "My Home",
    subtitle: "Residential Account · Main View",
    electricity: "388 kWh",
    electricityTrend: "▲ 6% vs last month",
    electricityUp: true,
    water: "12.4 kL",
    waterTrend: "▼ 3% vs last month",
    waterUp: false,
    gas: "—",
    gasTrend: "No gas connection",
    gasUp: true,
    insight:
      "Electricity usage is slightly elevated compared to last month. Review evening peak usage and appliance scheduling.",
    alerts: [
      { title: "Possible abnormal evening consumption detected", severity: "medium" },
      { title: "Water usage remains stable", severity: "low" },
      { title: "Projected bill slightly above average", severity: "medium" },
    ],
  },
  unit12: {
    title: "Unit 12",
    subtitle: "Residential Unit · Estate View",
    electricity: "421 kWh",
    electricityTrend: "▲ 9% vs last month",
    electricityUp: true,
    water: "10.8 kL",
    waterTrend: "▼ 1% vs last month",
    waterUp: false,
    gas: "—",
    gasTrend: "No gas connection",
    gasUp: true,
    insight:
      "Unit 12 shows a stronger electricity increase than expected. Compare occupancy pattern against previous billing period.",
    alerts: [
      { title: "Above-normal monthly electricity increase", severity: "high" },
      { title: "Water remains within expected household range", severity: "low" },
      { title: "No meter communication issues detected", severity: "low" },
    ],
  },
  unit23: {
    title: "Unit 23",
    subtitle: "Residential Unit · Estate View",
    electricity: "356 kWh",
    electricityTrend: "▼ 2% vs last month",
    electricityUp: false,
    water: "15.2 kL",
    waterTrend: "▲ 11% vs last month",
    waterUp: true,
    gas: "—",
    gasTrend: "No gas connection",
    gasUp: true,
    insight:
      "Water usage has increased materially. Leak detection or irrigation timing should be reviewed.",
    alerts: [
      { title: "Possible water leak pattern detected", severity: "high" },
      { title: "Electricity trend improving", severity: "low" },
      { title: "Weekend water variance flagged", severity: "medium" },
    ],
  },
};

const portfolioScopes: Record<"menlyn" | "waterfall" | "sandton", ScopeData> = {
  menlyn: {
    title: "Menlyn Shopping Centre",
    subtitle: "Pretoria · Retail Portfolio",
    electricity: "R 182,420",
    electricityTrend: "▲ 4.2% this month",
    electricityUp: true,
    water: "R 46,310",
    waterTrend: "▼ 1.8% this month",
    waterUp: false,
    gas: "R 28,905",
    gasTrend: "▲ 0.9% this month",
    gasUp: true,
    insight:
      "Electricity usage increased slightly compared to last month. Investigate HVAC load during peak afternoon periods.",
    alerts: [
      { title: "Abnormal weekday peak demand detected", severity: "high" },
      { title: "Water consumption stable with mild improvement", severity: "low" },
      { title: "Opportunity to reduce after-hours HVAC usage", severity: "medium" },
    ],
  },
  waterfall: {
    title: "Waterfall Estate",
    subtitle: "Midrand · Residential Estate Portfolio",
    electricity: "R 96,880",
    electricityTrend: "▲ 2.1% this month",
    electricityUp: true,
    water: "R 61,240",
    waterTrend: "▲ 6.4% this month",
    waterUp: true,
    gas: "R 12,540",
    gasTrend: "▼ 0.6% this month",
    gasUp: false,
    insight:
      "Water usage is trending higher than expected for a residential estate profile. Review irrigation and leak events.",
    alerts: [
      { title: "Possible estate water leak pattern detected", severity: "high" },
      { title: "Electricity demand remains within expected range", severity: "low" },
      { title: "Weekend water usage anomaly flagged", severity: "medium" },
    ],
  },
  sandton: {
    title: "Sandton Office Tower",
    subtitle: "Johannesburg · Commercial Office Portfolio",
    electricity: "R 143,700",
    electricityTrend: "▼ 1.2% this month",
    electricityUp: false,
    water: "R 32,890",
    waterTrend: "▼ 2.7% this month",
    waterUp: false,
    gas: "R 18,420",
    gasTrend: "▲ 1.4% this month",
    gasUp: true,
    insight:
      "Overall utility profile is improving. Electricity and water are trending downward, but gas usage should be reviewed against occupancy schedules.",
    alerts: [
      { title: "Electricity efficiency trend improving", severity: "low" },
      { title: "Gas consumption variance above baseline", severity: "medium" },
      { title: "No critical utility incidents detected", severity: "low" },
    ],
  },
};

const internalScopes: Record<"watchdog" | "regional" | "critical", ScopeData> = {
  watchdog: {
    title: "Watchdog Reports",
    subtitle: "PEC Internal · Automated Monitoring View",
    electricity: "27 Sites",
    electricityTrend: "5 anomalies detected",
    electricityUp: true,
    water: "14 Sites",
    waterTrend: "3 leak risks flagged",
    waterUp: true,
    gas: "4 Sites",
    gasTrend: "1 variance flagged",
    gasUp: true,
    insight:
      "Watchdog monitoring indicates abnormal electricity and water patterns across multiple sites. Automated exception reporting should be prioritised.",
    alerts: [
      { title: "5 site-level energy anomalies require review", severity: "high" },
      { title: "3 possible water leak events pending validation", severity: "high" },
      { title: "1 gas variance outside normal baseline", severity: "medium" },
    ],
  },
  regional: {
    title: "Regional Branch View",
    subtitle: "PEC Internal · Operations Summary",
    electricity: "48 Active Sites",
    electricityTrend: "92% healthy telemetry",
    electricityUp: true,
    water: "31 Water Points",
    waterTrend: "4 sites require attention",
    waterUp: true,
    gas: "9 Gas Points",
    gasTrend: "All online",
    gasUp: true,
    insight:
      "Regional telemetry health is strong overall. A small group of sites still require meter communication follow-up and usage investigation.",
    alerts: [
      { title: "4 sites need branch follow-up", severity: "medium" },
      { title: "Telemetry health remains above target", severity: "low" },
      { title: "No critical regional service incident detected", severity: "low" },
    ],
  },
  critical: {
    title: "Critical Alerts",
    subtitle: "PEC Internal · Priority Incident Queue",
    electricity: "3 Critical",
    electricityTrend: "Immediate response required",
    electricityUp: true,
    water: "2 Critical",
    waterTrend: "Leak / burst risk",
    waterUp: true,
    gas: "1 Critical",
    gasTrend: "Consumption spike",
    gasUp: true,
    insight:
      "Critical incident queue shows multiple urgent utility exceptions. Escalation workflows and response coordination should be prioritised.",
    alerts: [
      { title: "Critical electricity spike at priority site", severity: "high" },
      { title: "Burst / leak probability elevated at 2 water sites", severity: "high" },
      { title: "Gas spike requires urgent validation", severity: "high" },
    ],
  },
};
const viewHelperText: Record<ViewMode, string> = {
  residential: "Residential = single property view",
  portfolio: "Portfolio = multi-site client view",
  pecInternal: "PEC Internal = operational intelligence view",
};

export default function Home() {
  const { view, setView } = usePecView();
  const navigate = useNavigate();
  const [scope, setScope] = useState<ScopeKey>("menlyn");

  const currentOptions = useMemo(() => {
    if (view === "residential") {
      return [
        { value: "homeMain", label: "My Home" },
        { value: "unit12", label: "Unit 12" },
        { value: "unit23", label: "Unit 23" },
      ] as const;
    }

    if (view === "portfolio") {
      return [
        { value: "menlyn", label: "Menlyn Shopping Centre" },
        { value: "waterfall", label: "Waterfall Estate" },
        { value: "sandton", label: "Sandton Office Tower" },
      ] as const;
    }

    return [
      { value: "watchdog", label: "Watchdog Reports" },
      { value: "regional", label: "Regional Branch View" },
      { value: "critical", label: "Critical Alerts" },
    ] as const;
  }, [view]);

  useEffect(() => {
    if (view === "residential") setScope("homeMain");
    else if (view === "portfolio") setScope("menlyn");
    else if (view === "pecInternal") setScope("watchdog");
  }, [view]);

  const safeScope = useMemo<ScopeKey>(() => {
    const allowed = currentOptions.map((option) => option.value);
    return allowed.includes(scope as any) ? scope : currentOptions[0].value;
  }, [scope, currentOptions]);

  const data = useMemo<ScopeData>(() => {
    if (view === "residential") {
      return residentialScopes[safeScope as keyof typeof residentialScopes];
    }
    if (view === "portfolio") {
      return portfolioScopes[safeScope as keyof typeof portfolioScopes];
    }
    return internalScopes[safeScope as keyof typeof internalScopes];
  }, [view, safeScope]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#050607,#0b0d10)",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px",
          textAlign: "left",
        }}
      >
        <div className="mb-10">
          <div className="flex items-center gap-4">
            <img
              src={pecLogo}
              alt="PEC"
              className="h-14 w-auto object-contain opacity-95"
            />
            <div>
              <h1 className="m-0 text-5xl font-extrabold tracking-wide text-white leading-tight">
                PEC Intelligence
              </h1>
              <p className="mt-2 text-base font-semibold uppercase tracking-widest text-green-400">
                Operational Utility Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* View Mode */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ ...sectionLabel, marginBottom: "6px" }}>View Mode</div>
          <div style={selectorWrap}>
            <div style={selectorChevron}>▾</div>

            <select
              value={view}
              onChange={(e) => setView(e.target.value as ViewMode)}
              style={selectorStyle}
            >
              <option value="residential">Residential</option>
              <option value="portfolio">Portfolio</option>
              <option value="pecInternal">PEC Internal</option>
            </select>
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#f87171",
            }}
          >
            {viewHelperText[view]}
          </div>
        </div>

        {/* Scope */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ ...sectionLabel, marginBottom: "6px" }}>Scope</div>
          <div style={selectorWrap}>
            <div style={selectorChevron}>▼</div>
            <select
              value={safeScope}
              onChange={(e) => setScope(e.target.value as ScopeKey)}
              style={selectorStyle}
            >
              {currentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#f87171",
            }}
          >
            {data.subtitle}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ ...sectionLabel, marginBottom: "12px" }}>Active Alerts</div>
          <div className="grid gap-3">
            {/* 💰 VALUE / IMPACT CARD */}
            <div
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(16,185,129,0.2)",
                background: "rgba(16,185,129,0.08)",
                width: "100%",
              }}
            >
              <div style={{ fontWeight: 700, color: "#34d399" }}>
                💰 Efficiency opportunity identified
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  marginTop: "4px",
                  color: "#6ee7b7",
                }}
              >
                {view === "residential" && "R 18,200 potential saving"}
                {view === "portfolio" && "R 842,500 opportunity identified"}
                {view === "pecInternal" && "R 1,240,000+ optimisation exposure"}
              </div>

              <div
                style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}
              >
                Based on current consumption behaviour and detected patterns
              </div>
            </div>
            {data.alerts.map((alert, index) => (
              <div key={index} style={alertCard(alert.severity)}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={alertDot(alert.severity)} />
                  <div style={{ fontWeight: 700 }}>{alert.title}</div>
                </div>
                <div style={alertSeverity(alert.severity)}>
                  {alert.severity === "high"
                    ? "High priority"
                    : alert.severity === "medium"
                    ? "Medium priority"
                    : "Monitoring"}
                  <p className="text-sm font-medium text-emerald-400">
                    Potential efficiency opportunity identified across current
                    utility activity.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utility Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div style={{ ...cardStyle, width: "100%" }}>
            <div style={labelStyle}>Electricity</div>
            <div style={valueStyle}>{data.electricity}</div>
            <div style={data.electricityUp ? trendUp : trendDown}>
              {data.electricityTrend}
            </div>
          </div>

          <div style={{ ...cardStyle, width: "100%" }}>
            <div style={labelStyle}>Water</div>
            <div style={valueStyle}>{data.water}</div>
            <div style={data.waterUp ? trendUp : trendDown}>{data.waterTrend}</div>
          </div>

          <div style={{ ...cardStyle, width: "100%" }}>
            <div style={labelStyle}>Gas</div>
            <div style={valueStyle}>{data.gas}</div>
            <div style={data.gasUp ? trendUp : trendDown}>{data.gasTrend}</div>
          </div>
        </div>

        {/* AI Insight */}
        <div
          className="mt-8 p-6 rounded-xl bg-white/5"
          style={{ marginTop: "28px" }}
        >
          <div className="font-bold mb-2">Intelligence Insight</div>
          <p className="opacity-70 leading-relaxed">{data.insight}</p>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: "28px" }}>
          <div className="font-bold mb-4">Quick Actions</div>
          <div className="grid grid-cols-2 gap-3">
            <button style={actionButton} onClick={() => navigate("/usage")}>
              View Insights
            </button>

            <button style={actionButton} onClick={() => navigate("/bills")}>
              View Bills
            </button>

            <button style={actionButton} onClick={() => navigate("/meters")}>
              Meters
            </button>

            <button style={actionButton} onClick={() => navigate("/support")}>
              Service
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: "max(16px, env(safe-area-inset-bottom))",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            padding: "10px",
            borderRadius: "18px",
            background: "rgba(18,18,20,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <button style={navButtonActive} onClick={() => navigate("/home")}>
            Home
          </button>
          <button style={navButton} onClick={() => navigate("/usage")}>
            Usage
          </button>
          <button style={navButton} onClick={() => navigate("/bills")}>
            Bills
          </button>
          <button style={navButton} onClick={() => navigate("/support")}>
            Support
          </button>
        </div>
      </div>
    </main>
  );
}

const sectionLabel: React.CSSProperties = {
  fontSize: "14px",
  opacity: 0.7,
  fontWeight: 700,
  letterSpacing: "0.02em",
};

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

const cardStyle: React.CSSProperties = {
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  opacity: 0.65,
  marginBottom: "6px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 800,
};

const trendUp: React.CSSProperties = {
  color: "#4ade80",
  marginTop: "6px",
  fontWeight: 600,
};

const trendDown: React.CSSProperties = {
  color: "#f87171",
  marginTop: "6px",
  fontWeight: 600,
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

const navButton: React.CSSProperties = {
  background: "transparent",
  color: "rgba(255,255,255,0.7)",
  border: "none",
  borderRadius: "12px",
  padding: "12px 8px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

const navButtonActive: React.CSSProperties = {
  ...navButton,
  background: "rgba(255,255,255,0.08)",
  color: "#ffffff",
};

const alertCard = (severity: "high" | "medium" | "low"): React.CSSProperties => ({
  padding: "16px",
  borderRadius: "14px",
  background:
    severity === "high"
      ? "rgba(127,29,29,0.22)"
      : severity === "medium"
      ? "rgba(120,53,15,0.22)"
      : "rgba(21,128,61,0.16)",
  border:
    severity === "high"
      ? "1px solid rgba(248,113,113,0.32)"
      : severity === "medium"
      ? "1px solid rgba(251,191,36,0.24)"
      : "1px solid rgba(74,222,128,0.2)",
});

const alertDot = (severity: "high" | "medium" | "low"): React.CSSProperties => ({
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  background:
    severity === "high"
      ? "#f87171"
      : severity === "medium"
      ? "#fbbf24"
      : "#4ade80",
  flexShrink: 0,
});

const alertSeverity = (severity: "high" | "medium" | "low"): React.CSSProperties => ({
  marginTop: "8px",
  fontSize: "13px",
  fontWeight: 700,
  color:
    severity === "high"
      ? "#fca5a5"
      : severity === "medium"
      ? "#fcd34d"
      : "#86efac",
});