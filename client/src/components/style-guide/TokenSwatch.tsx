import React from "react";

interface TokenSwatchProps {
  name: string;
  value: string;
  /** CSS-resolved display colour — can be a raw hex, rgba, or a Tailwind CSS var expression */
  displayColor?: string;
  isDark: boolean;
  source?: "token" | "inline";
}

export default function TokenSwatch({ name, value, displayColor, isDark, source = "token" }: TokenSwatchProps) {
  const labelColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const sublabelColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "120px" }}>
      <div
        style={{
          width: "100%",
          height: "64px",
          borderRadius: "10px",
          background: displayColor ?? value,
          border: `1px solid ${border}`,
          flexShrink: 0,
        }}
      />
      <div style={{ fontSize: "12px", fontWeight: 700, color: labelColor, wordBreak: "break-word" }}>
        {name}
      </div>
      <div style={{ fontSize: "10px", color: sublabelColor, wordBreak: "break-all" }}>
        {value}
      </div>
      {source === "inline" && (
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#fbbf24",
            opacity: 0.9,
          }}
        >
          inline only
        </div>
      )}
    </div>
  );
}
