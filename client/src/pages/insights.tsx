import React from "react";
import { Link } from "react-router-dom";

export default function Insights() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Link
        to="/home"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: 800,
          opacity: 0.8,
        }}
      >
        ← Back to Home
      </Link>

      <div style={{ fontSize: 28, fontWeight: 900 }}>
        Insights
      </div>

      <div
        style={{
          padding: 18,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontWeight: 800 }}>
          Electricity usage stable across last 3 cycles.
        </div>

        <div style={{ opacity: 0.7, marginTop: 6 }}>
          Average monthly usage: 381 kWh.
        </div>
      </div>
    </div>
  );
}