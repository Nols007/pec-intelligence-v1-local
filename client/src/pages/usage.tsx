import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";

export default function Usage() {
  const { view } = usePecView();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ fontSize: 46, fontWeight: 950, lineHeight: 1 }}>
        Usage ({view === "residential" ? "Residential" : "Portfolio"})
      </div>
      <div style={{ opacity: 0.75 }}>
        Consumption charts & trends (demo placeholder)
      </div>

      <div
        className="card"
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18 }}>Coming next:</div>
        <ul style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.7 }}>
          <li>Daily electricity & water trend</li>
          <li>Bill projection vs budget</li>
          <li>Alerts when abnormal usage is detected</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/dashboard" style={linkStyle}>← Back to Dashboard</Link>
        <Link to="/" style={linkStyle}>← Home</Link>
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
};