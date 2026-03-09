import React from "react";
import { usePecView } from "../state/pecView";

export default function PecViewToggle() {
  const { view, setView } = usePecView();

  const isRes = view === "residential";
  const isPort = view === "portfolio";

  return (
    <div
      className="card"
      style={{
        padding: 8,
        borderRadius: 999,
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <button
        className="btn"
        onClick={() => setView("residential")}
        style={{
          flex: 1,
          borderRadius: 999,
          padding: "10px 12px",
          background: isRes ? "white" : "transparent",
          color: isRes ? "black" : "rgba(255,255,255,0.8)",
          fontWeight: 800,
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        Residential
      </button>

      <button
        className="btn"
        onClick={() => setView("portfolio")}
        style={{
          flex: 1,
          borderRadius: 999,
          padding: "10px 12px",
          background: isPort ? "white" : "transparent",
          color: isPort ? "black" : "rgba(255,255,255,0.8)",
          fontWeight: 800,
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        Portfolio
      </button>
    </div>
  );
}