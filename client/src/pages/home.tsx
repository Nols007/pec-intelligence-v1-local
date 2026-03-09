import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ opacity: 0.75 }}>
        Demo mode • Data stored on this device only.
      </div>

      {/* PEC Intelligence */}
      <div
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          display: "grid",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900 }}>
          PEC Intelligence
        </div>

        <IntelligenceRow label="Alert" count={2} color="#f59e0b" />
        <div style={{
          paddingLeft: 18,
          fontSize: 13,
          opacity: 0.8,
          display: "grid",
          gap: 6
        }}>
          <div>• Electricity usage 22% above last cycle</div>
          <div>• Possible abnormal consumption detected</div>
        </div>
        <IntelligenceRow label="Advisory" count={1} color="#3b82f6" />
        <IntelligenceRow label="Insight" count={4} color="#22c55e" />
      </div>

      {/* Utility Snapshot */}
      <div
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          display: "grid",
          gap: 14,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900 }}>
          Utility Snapshot
        </div>

        <SnapshotCard
          title="Electricity"
          value="388 kWh"
          insight="↑ 6% vs last month"
        />

        <SnapshotCard
          title="Water"
          value="12.4 kL"
          insight="↓ 3% vs last month"
        />

        <SnapshotCard
          title="Projected Bill"
          value="R 1,455"
          insight="Estimated for current cycle"
        />

        <SnapshotCard
          title="System Status"
          value="Normal operation"
          insight="No abnormal usage detected"
        />
      </div>

      {/* Quick Links */}
      <div
        style={{
          padding: 16,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>
          Quick Links
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <Link to="/dashboard" style={linkStyle}>
            Open Dashboard
          </Link>

          <Link to="/usage" style={linkStyle}>
            Explore Usage Trends
          </Link>

          <Link to="/bills" style={linkStyle}>
            Review Billing
          </Link>

          <Link to="/meters" style={linkStyle}>
            Monitor Meters
          </Link>
        </div>
      </div>
    </div>
  );
}

function IntelligenceRow(props: {
  label: string;
  count: number;
  color: string;
}) {
  const path =
    props.label === "Alert"
      ? "/alerts"
      : props.label === "Advisory"
      ? "/advisory"
      : "/insights";

  return (
    <Link
      to={path}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: 14,
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontWeight: 800,
        textDecoration: "none",
        color: "white",
      }}
    >
      <span>
        {props.label === "Alert" && "⚠ "}
        {props.label === "Advisory" && "💡 "}
        {props.label === "Insight" && "📊 "}
        {props.label}
      </span>

      {props.count > 0 && (
        <span
          style={{
            background: props.color,
            color: "black",
            borderRadius: 999,
            padding: "2px 10px",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          {props.count}
        </span>
      )}
    </Link>
  );
}

function SnapshotCard(props: {
  title: string;
  value: string;
  insight: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ fontWeight: 900 }}>{props.title}</div>

      <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6 }}>
        {props.value}
      </div>

      <div style={{ marginTop: 6, opacity: 0.75 }}>
        {props.insight}
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.25)",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
};