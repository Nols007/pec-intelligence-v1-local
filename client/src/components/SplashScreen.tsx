import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white animate-fadeIn">
      <div className="text-center space-y-6">

        {/* PEC Logo */}
        <div className="flex justify-center">
          <img
            src="/src/assets/pec-logo.png"
            alt="PEC Logo"
            className="w-28 opacity-90"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-wide">
          PEC Intelligence
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm tracking-widest">
          Smart Utility Insights
        </p>

        {/* Loading */}
        <div className="pt-6 text-gray-500 animate-pulse">
          Loading…
        </div>

      </div>
    </div>
  );
}