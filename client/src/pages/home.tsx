import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type PropertyKey = "menlyn" | "waterfall" | "sandton";

type PropertyData = {
  name: string;
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

const properties: Record<PropertyKey, PropertyData> = {
  menlyn: {
    name: "Menlyn Shopping Centre",
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
    name: "Waterfall Estate",
    subtitle: "Midrand · Residential Estate",
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
      "Water usage is trending higher than expected for a residential profile. Review possible irrigation leakage or weekend peak draw.",
    alerts: [
      { title: "Possible water leak pattern detected", severity: "high" },
      { title: "Electricity demand remains within expected range", severity: "low" },
      { title: "Weekend water usage anomaly flagged", severity: "medium" },
    ],
  },
  sandton: {
    name: "Sandton Office Tower",
    subtitle: "Johannesburg · Commercial Office",
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
      "Overall utility profile is improving. Electricity and water are trending downward, but gas consumption should be reviewed against occupancy schedules.",
    alerts: [
      { title: "Electricity efficiency trend improving", severity: "low" },
      { title: "Gas consumption variance above baseline", severity: "medium" },
      { title: "No critical utility incidents detected", severity: "low" },
    ],
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<PropertyKey>("menlyn");

  const data = useMemo(() => properties[selectedProperty], [selectedProperty]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#050607,#0b0d10)",
        color: "#fff",
        padding: "24px 24px 140px 24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 6px 0" }}>PEC Intelligence</h1>
        <div style={{ opacity: 0.6 }}>Utility Performance Dashboard</div>
      </div>

      {/* Property Selector */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ ...sectionLabel, marginBottom: "10px" }}>Selected Property</div>

        <div style={selectorWrap}>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value as PropertyKey)}
            style={selectorStyle}
          >
            <option value="menlyn">Menlyn Shopping Centre</option>
            <option value="waterfall">Waterfall Estate</option>
            <option value="sandton">Sandton Office Tower</option>
          </select>
        </div>

        <div style={{ marginTop: "10px", opacity: 0.65, fontSize: "14px" }}>
          {data.subtitle}
        </div>
      </div>

      {/* Alerts */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ ...sectionLabel, marginBottom: "12px" }}>Active Alerts</div>

        <div style={{ display: "grid", gap: "12px" }}>
          {data.alerts.map((alert, index) => (
            <div key={index} style={alertCard(alert.severity)}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={alertDot(alert.severity)} />
                <div style={{ fontWeight: 700 }}>{alert.title}</div>
              </div>
              <div style={alertSeverity(alert.severity)}>
                {alert.severity === "high"
                  ? "High priority"
                  : alert.severity === "medium"
                  ? "Medium priority"
                  : "Monitoring"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Utility Cards */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "1fr",
        }}
      >
        <div style={cardStyle}>
          <div style={labelStyle}>Electricity</div>
          <div style={valueStyle}>{data.electricity}</div>
          <div style={data.electricityUp ? trendUp : trendDown}>
            {data.electricityTrend}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Water</div>
          <div style={valueStyle}>{data.water}</div>
          <div style={data.waterUp ? trendUp : trendDown}>{data.waterTrend}</div>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Gas</div>
          <div style={valueStyle}>{data.gas}</div>
          <div style={data.gasUp ? trendUp : trendDown}>{data.gasTrend}</div>
        </div>
      </div>

      {/* AI Insight */}
      <div
        style={{
          marginTop: "32px",
          padding: "20px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: "8px" }}>AI Insight</div>
        <div style={{ opacity: 0.72, lineHeight: 1.5 }}>{data.insight}</div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "32px" }}>
        <div style={{ fontWeight: 700, marginBottom: "12px" }}>Quick Actions</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <button style={actionButton} onClick={() => navigate("/usage")}>
            View Usage
          </button>

          <button style={actionButton} onClick={() => navigate("/bills")}>
            View Bills
          </button>

          <button style={actionButton} onClick={() => navigate("/meters")}>
            Meters
          </button>

          <button style={actionButton} onClick={() => navigate("/support")}>
            Support
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
  );
}

const sectionLabel: React.CSSProperties = {
  fontSize: "14px",
  opacity: 0.7,
  fontWeight: 700,
  letterSpacing: "0.02em",
};

const selectorWrap: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  overflow: "hidden",
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