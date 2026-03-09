import React from "react";
import { Link, useLocation } from "react-router-dom";

type Item = { to: string; label: string; icon: string };

const items: Item[] = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/usage", label: "Usage", icon: "⚡" },
  { to: "/bills", label: "Bills", icon: "🧾" },
  { to: "/meters", label: "Meters", icon: "🔧" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "10px 12px",
        background: "rgba(0,0,0,0.78)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 8,
        }}
      >
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              style={{
                textDecoration: "none",
                padding: "10px 6px",
                borderRadius: 14,
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.12)",
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                color: "white",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              <div style={{ fontSize: 16, lineHeight: "16px" }}>{it.icon}</div>
              <div style={{ opacity: active ? 1 : 0.85 }}>{it.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}