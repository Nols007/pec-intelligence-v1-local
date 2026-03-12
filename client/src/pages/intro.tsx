import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pecLogo from "../assets/pec-logo.png";

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000); // 5 seconds for demo

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #101114 0%, #06070a 45%, #000000 100%)",
          color: "#ffffff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeInSplash 1s ease-out",
          }}
        >
          <img
            src={pecLogo}
            alt="PEC Utility Management"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              marginBottom: "26px",
              filter: "drop-shadow(0 0 28px rgba(255,255,255,0.18)) drop-shadow(0 0 60px rgba(59,130,246,0.15))",
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 7vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.98)",
            }}
          >
            PEC Intelligence
          </h1>

          <p
            style={{
              marginTop: "14px",
              marginBottom: "34px",
              fontSize: "clamp(14px, 3.2vw, 18px)",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Smart Utility Insights
          </p>

          <div
            style={{
              width: "100%",
              maxWidth: "260px",
              height: "8px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.14)",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "100%",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #22c55e, #3b82f6, #7c3aed)",
                boxShadow: "0 0 14px rgba(59,130,246,0.45)",
                animation: "loadingPulse 1.8s ease-in-out infinite",
                transformOrigin: "left center",
              }}
            />
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(14px, 3vw, 16px)",
              color: "rgba(255,255,255,0.58)",
            }}
          >
            Loading...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInSplash {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes loadingPulse {
          0% {
            opacity: 0.55;
            transform: scaleX(0.94);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.55;
            transform: scaleX(0.94);
          }
        }
      `}</style>
    </>
  );
}