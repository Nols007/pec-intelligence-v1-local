import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";

export default function Dashboard() {
  const { view } = usePecView();

  const title = useMemo(() => {
    return view === "residential" ? "Residential Dashboard" : "Portfolio Dashboard";
  }, [view]);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ fontSize: 54, fontWeight: 950, lineHeight: 1 }}>
        {title}
      </div>
      <div style={{ opacity: 0.75 }}>Unit-level overview • demo mode</div>

      <div style={{ display: "grid", gap: 12 }}>
        <Card labelLeft="Current Balance" labelRight="Estimated, demo mode" value="R 842.35" />
        <Card labelLeft="Month Spend" labelRight="So far this month" value="R 612.90" />
        <Card labelLeft="Electricity" labelRight="This month (demo)" value="388 kWh" />
        <Card labelLeft="Water" labelRight="This month (demo)" value="12.4 kL" />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        <Link to="/usage" style={pillStyle}>Usage</Link>
        <Link to="/bills" style={pillStyle}>Bills</Link>
        <Link to="/meters" style={pillStyle}>Meters</Link>
      </div>
    </div>
  );
}

function Card(props: { labelLeft: string; labelRight: string; value: string }) {
  return (
    <div
      className="card"
      style={{
        padding: 18,
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>{props.labelLeft}</div>
        <div style={{ opacity: 0.7, fontWeight: 700 }}>{props.labelRight}</div>
      </div>

      <div style={{ marginTop: 10, fontSize: 54, fontWeight: 950, letterSpacing: -1 }}>
        {props.value}
      </div>
    </div>
  );
}

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
};