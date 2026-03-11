import { useEffect } from "react";

interface SplashProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000); // 5 seconds for demo

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center space-y-6">

        {/* PEC Logo */}
        <div className="flex justify-center">
          <img
            src="/pec-logo.png"
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