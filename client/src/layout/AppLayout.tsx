import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PecViewToggle from "../components/PecViewToggle";
import { usePecView } from "../state/pecView";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { view } = usePecView();

  const subtitle = useMemo(() => {
    return view === "residential"
      ? "Residential complex unit view • demo mode • data stored on this device only."
      : "Portfolio view • demo mode • data stored on this device only.";
  }, [view]);

  const isHome = location.pathname === "/";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        paddingBottom: 112, // space for bottom nav later
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 18px 10px" }}>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 260 }}>
            <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.02 }}>
              PEC V1 Preview
            </div>

            <div style={{ marginTop: 8, opacity: 0.8 }}>
              Innovation in progress.
            </div>

            <div style={{ marginTop: 10, opacity: 0.75 }}>{subtitle}</div>

            {!isHome && (
              <div style={{ marginTop: 14 }}>
                <Link
                  to="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  ← Home
                </Link>
              </div>
            )}
          </div>

          <div style={{ minWidth: 280, flex: "0 0 auto" }}>
            <PecViewToggle />
          </div>
        </div>

        <div style={{ marginTop: 18, opacity: 0.55 }}>
          <span style={{ fontWeight: 800 }}>Route:</span> {location.pathname}
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "12px 18px 40px" }}>
        {children}
      </div>
    </div>
  );
}