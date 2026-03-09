import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        background: "#ffffff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src="/src/assets/pec-logo.png"
        alt="PEC"
        style={{
          width: "150px",
          marginBottom: "30px",
        }}
      />

      <h1 style={{ fontSize: "32px", fontWeight: "700" }}>
        PEC Intelligence
      </h1>

      <p style={{ opacity: 0.7, marginTop: "6px" }}>
        Live Utility Snapshot
      </p>

      <div style={{ marginTop: "30px", fontSize: "16px", lineHeight: "1.8" }}>
        Electricity usage ↑12% <br />
        Water usage normal <br />
        System status stable
      </div>
    </div>
  );
}