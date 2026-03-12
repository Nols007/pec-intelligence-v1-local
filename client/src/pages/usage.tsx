import { useNavigate } from "react-router-dom";

export default function Usage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#050607,#0b0d10)",
        color: "#fff",
        padding: "24px 24px 120px 24px",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "30px" }}>Usage Intelligence</h1>
        <div style={{ opacity: 0.6 }}>Utility consumption analytics</div>
      </div>

      {/* Electricity Trend */}
      <div style={card}>
        <div style={cardTitle}>Electricity Trend</div>

        <div style={graph}>
          <div style={{ height: "60%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "75%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "68%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "82%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "90%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "78%", background: "#22c55e", width: "6%" }} />
          <div style={{ height: "85%", background: "#22c55e", width: "6%" }} />
        </div>

        <div style={trendUp}>▲ +4.2% month-on-month</div>
      </div>

      {/* Water Trend */}
      <div style={card}>
        <div style={cardTitle}>Water Trend</div>

        <div style={graph}>
          <div style={{ height: "55%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "52%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "48%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "45%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "42%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "40%", background: "#38bdf8", width: "6%" }} />
          <div style={{ height: "38%", background: "#38bdf8", width: "6%" }} />
        </div>

        <div style={trendDown}>▼ -1.8% month-on-month</div>
      </div>

      {/* Cost Projection */}
      <div style={card}>
        <div style={cardTitle}>Projected Monthly Cost</div>

        <div style={bigValue}>R 195,000</div>

        <div style={{ opacity: 0.7 }}>
          Estimated electricity spend next billing cycle
        </div>
      </div>

      {/* AI Insight */}
      <div style={card}>
        <div style={cardTitle}>AI Insight</div>

        <div style={{ opacity: 0.75, lineHeight: 1.5 }}>
          Weekend electricity consumption spikes detected. Investigate HVAC
          scheduling or tenant after-hours usage patterns.
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          left: 16,
          right: 16,
          bottom: 16,
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          padding: "10px",
          borderRadius: "18px",
          background: "rgba(18,18,20,0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <button style={navButton} onClick={() => navigate("/home")}>
          Home
        </button>

        <button style={navButtonActive}>Usage</button>

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

const card = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "18px",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: 700,
  marginBottom: "12px",
};

const graph = {
  display: "flex",
  alignItems: "flex-end",
  gap: "8px",
  height: "120px",
  marginBottom: "12px",
};

const bigValue = {
  fontSize: "32px",
  fontWeight: 800,
  marginBottom: "6px",
};

const trendUp = {
  color: "#4ade80",
  fontWeight: 600,
};

const trendDown = {
  color: "#f87171",
  fontWeight: 600,
};

const navButton = {
  background: "transparent",
  color: "rgba(255,255,255,0.7)",
  border: "none",
  borderRadius: "12px",
  padding: "12px 8px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

const navButtonActive = {
  ...navButton,
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
};