import React from "react";

type UsageStatus = "USED" | "UNUSED" | "DUPLICATE";

interface CompareRowProps {
  label: string;
  /** e.g. "home.tsx — actionButton" */
  appNote?: string;
  status: UsageStatus;
  /** The shadcn/ui version */
  shadcnSlot: React.ReactNode;
  /** The current app inline-style version (omit if nothing exists in the app) */
  appSlot?: React.ReactNode;
  isDark: boolean;
  /** Optional extra note shown below */
  note?: string;
}

const STATUS_STYLES: Record<UsageStatus, { bg: string; color: string; label: string }> = {
  USED:      { bg: "rgba(34,197,94,0.15)",  color: "#4ade80", label: "● USED"      },
  UNUSED:    { bg: "rgba(251,191,36,0.15)", color: "#fbbf24", label: "○ UNUSED"    },
  DUPLICATE: { bg: "rgba(239,68,68,0.15)",  color: "#f87171", label: "⚠ DUPLICATE" },
};

export default function CompareRow({
  label,
  appNote,
  status,
  shadcnSlot,
  appSlot,
  isDark,
  note,
}: CompareRowProps) {
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const labelColor = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const noteColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
  const headerBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const colBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const colLabelColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const panelBg = isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)";

  const { bg: statusBg, color: statusColor, label: statusLabel } = STATUS_STYLES[status];

  return (
    <div
      style={{
        borderBottom: `1px solid ${border}`,
      }}
    >
      {/* Row header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 16px",
          background: headerBg,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "14px",
            color: labelColor,
            flex: 1,
            minWidth: 0,
          }}
        >
          {label}
        </span>

        {appNote && (
          <span style={{ fontSize: "12px", color: noteColor }}>
            {appNote}
          </span>
        )}

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 8px",
            borderRadius: "999px",
            background: statusBg,
            color: statusColor,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Side-by-side panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: appSlot ? "1fr 1fr" : "1fr",
        }}
      >
        {/* shadcn panel */}
        <div
          style={{
            padding: "20px 16px",
            borderRight: appSlot ? `1px solid ${colBorder}` : undefined,
            background: panelBg,
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: colLabelColor,
              letterSpacing: "0.08em",
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            shadcn/ui
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {shadcnSlot}
          </div>
        </div>

        {/* App (current) panel */}
        {appSlot && (
          <div
            style={{
              padding: "20px 16px",
              background: panelBg,
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: colLabelColor,
                letterSpacing: "0.08em",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              Current app
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              {appSlot}
            </div>
          </div>
        )}
      </div>

      {/* Optional bottom note */}
      {note && (
        <div
          style={{
            padding: "8px 16px 10px",
            fontSize: "12px",
            color: noteColor,
            fontStyle: "italic",
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}
