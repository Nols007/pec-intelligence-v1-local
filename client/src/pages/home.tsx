import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#050607,#0b0d10)",
        color: "#fff",
        padding: "24px 24px 120px 24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", margin: "0 0 6px 0" }}>
          PEC Intelligence
        </h1>
        <div style={{ opacity: 0.6 }}>Utility Performance Dashboard</div>
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
          <div style={valueStyle}>R 182,420</div>
          <div style={trendUp}>▲ 4.2% this month</div>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Water</div>
          <div style={valueStyle}>R 46,310</div>
          <div style={trendDown}>▼ 1.8% this month</div>
        </div>

        <div style={cardStyle}>
          <div style={labelStyle}>Gas</div>
          <div style={valueStyle}>R 28,905</div>
          <div style={trendUp}>▲ 0.9% this month</div>
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
        <div style={{ opacity: 0.72, lineHeight: 1.5 }}>
          Electricity usage increased slightly compared to last month.
          Investigate HVAC load during peak afternoon periods.
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "32px" }}>
        <div style={{ fontWeight: 700, marginBottom: "12px" }}>
          Quick Actions
        </div>

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
          bottom: 16,
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