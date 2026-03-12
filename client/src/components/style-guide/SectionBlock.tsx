import React from "react";

interface SectionBlockProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  isDark: boolean;
}

export default function SectionBlock({ id, title, description, children, isDark }: SectionBlockProps) {
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const textMuted = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const bg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const titleColor = isDark ? "#fff" : "#000";

  return (
    <section
      id={id}
      style={{
        marginBottom: "56px",
        scrollMarginTop: "80px",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <a href={`#${id}`} style={{ textDecoration: "none" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 800,
              color: titleColor,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
        </a>
      </div>

      {description && (
        <p
          style={{
            margin: "0 0 20px 0",
            color: textMuted,
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}

      <div
        style={{
          borderRadius: "12px",
          border: `1px solid ${border}`,
          background: bg,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </section>
  );
}
