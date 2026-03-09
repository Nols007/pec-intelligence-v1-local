import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";

export default function Bills() {
  const { view } = usePecView();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ fontSize: 46, fontWeight: 950, lineHeight: 1 }}>
        Bills ({view === "residential" ? "Residential" : "Portfolio"})
      </div>
      <div style={{ opacity: 0.75 }}>Demo placeholder</div>

      <div
        className="card"
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontWeight: 900 }}>Latest statement (demo)</div>
        <div style={{ marginTop: 10, fontSize: 34, fontWeight: 950 }}>R 1,455.20</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>Due: 25th (demo)</div>
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