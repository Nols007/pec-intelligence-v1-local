import { Routes, Route, Navigate } from "react-router-dom";

import Intro from "./pages/intro";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Usage from "./pages/usage";
import Bills from "./pages/bills";
import Meters from "./pages/meters";
import Support from "./pages/support";
import NotFound from "./pages/not-found";
import Advisory from "./pages/advisory";
import StyleGuide from "./pages/style-guide";
import Insights from "./pages/insights";
import BottomNav from "./layout/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Routes>
        {/* Intro / Splash */}
        <Route path="/" element={<Intro />} />
        
      {/* Main app */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/usage" element={<Usage />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/support" element={<Support />} />
      <Route path="/meters" element={<Meters />} />
      <Route path="/advisory" element={<Advisory />} />
      <Route path="/insights" element={<Insights />} />
      
      {/* Optional: if anything links to /payment in BottomNav */}
      <Route path="/payment" element={<Navigate to="/bills" replace />} />

      {/* style-guide */}
      <Route path="/style-guide" element={<StyleGuide />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>

          <BottomNav />
    </div>
  );
}
