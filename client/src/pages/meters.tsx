import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";

export default function Meters() {
  const { view } = usePecView();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ fontSize: 46, fontWeight: 950, lineHeight: 1 }}>
        Meters ({view === "residential" ? "Residential" : "Portfolio"})
      </div>
      <div style={{ opacity: 0.75 }}>Demo placeholder</div>

      <div
        className="card"
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          display: "grid",
          gap: 12,
        }}
      >
        <MeterRow name="Electricity Meter" meta="Prepaid • demo" value="Last read: 12,430 kWh" />
        <MeterRow name="Water Meter" meta="Municipal • demo" value="Last read: 884 kL" />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/dashboard" style={linkStyle}>← Back to Dashboard</Link>
        <Link to="/" style={linkStyle}>← Home</Link>
      </div>
    </div>
  );
}

function MeterRow(props: { name: string; meta: string; value: string }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 950 }}>{props.name}</div>
        <div style={{ opacity: 0.7, fontWeight: 700 }}>{props.meta}</div>
      </div>
      <div style={{ marginTop: 8, opacity: 0.85 }}>{props.value}</div>
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