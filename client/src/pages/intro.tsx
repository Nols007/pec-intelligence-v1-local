import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pecLogo from "../assets/pec-logo.png";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #1a1a1a 0%, #0b0b0b 45%, #000000 100%)",
        color: "#ffffff",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <img
        src={pecLogo}
        alt="PEC Utility Management"
        style={{
          width: "220px",
          marginBottom: "24px",
          filter: "drop-shadow(0 0 24px rgba(255,255,255,0.18))",
        }}
      />

      <h1
        style={{
          fontSize: "34px",
          fontWeight: 700,
          letterSpacing: "0.02em",
          margin: 0,
        }}
      >
        PEC Intelligence
      </h1>

      <p
        style={{
          opacity: 0.8,
          marginTop: "10px",
          marginBottom: "28px",
          fontSize: "15px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Smart Utility Insights
      </p>

      <div
        style={{
          width: "220px",
          height: "6px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.12)",
          overflow: "hidden",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #22c55e, #3b82f6, #7c3aed)",
            boxShadow: "0 0 18px rgba(59,130,246,0.55)",
            animation: "pulseBar 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "15px",
          color: "rgba(255,255,255,0.65)",
          margin: 0,
        }}
      >
        Loading...
      </p>

      <style>{`
        @keyframes pulseBar {
          0% { opacity: 0.55; transform: scaleX(0.96); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.55; transform: scaleX(0.96); }
        }
      `}</style>
    </div>
  );
}