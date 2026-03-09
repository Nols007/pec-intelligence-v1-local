import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ fontSize: 44, fontWeight: 950, lineHeight: 1 }}>
        Page not found
      </div>
      <div style={{ opacity: 0.8 }}>
        No route matches: <span style={{ fontWeight: 900 }}>{location.pathname}</span>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/" style={linkStyle}>← Home</Link>
        <Link to="/dashboard" style={linkStyle}>Go to Dashboard</Link>
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