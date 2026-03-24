import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePecView } from "../state/pecView";

export default function Usage() {
  const navigate = useNavigate();
  const { view } = usePecView();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (view === "residential") setPageTitle("Usage - Residential View");
    else if (view === "portfolio") setPageTitle("Usage - Portfolio View");
    else if (view === "pecInternal") setPageTitle("Usage - PEC Internal View");
  }, [view]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 pb-32 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="m-0 text-3xl font-semibold">{pageTitle}</h1>
        <div className="opacity-60">Utility consumption analytics</div>
      </div>

      {/* Electricity Trend */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Electricity Trend</CardTitle>
        </CardHeader>

        <CardContent className="flex items-end gap-2.5 h-30 mb-3">
          <div className="bg-green-500 w-1.5" style={{ height: "60%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "75%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "68%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "82%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "90%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "78%" }} />
          <div className="bg-green-500 w-1.5" style={{ height: "85%" }} />
        </CardContent>

        <div className="text-green-400 font-semibold">▲ +4.2% month-on-month</div>
      </Card>

      {/* Water Trend */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Water Trend</CardTitle>
        </CardHeader>

        <CardContent className="flex items-end gap-2.5 h-30 mb-3">
          <div className="bg-sky-400 w-1.5" style={{ height: "55%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "52%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "48%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "45%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "42%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "40%" }} />
          <div className="bg-sky-400 w-1.5" style={{ height: "38%" }} />
        </CardContent>

        <div className="text-red-400 font-semibold">▼ -1.8% month-on-month</div>
      </Card>

      {/* Cost Projection */}
      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Projected Monthly Cost</CardTitle>
        </CardHeader>

        <div className="text-3xl font-extrabold mb-1">R 195,000</div>

        <div className="opacity-70">
          Estimated electricity spend next billing cycle
        </div>
      </Card>

      {/* AI Insight */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insight</CardTitle>
        </CardHeader>

        <div className="opacity-75 leading-relaxed">
          Weekend electricity consumption spikes detected. Investigate HVAC
          scheduling or tenant after-hours usage patterns.
        </div>
      </Card>

      {/* Bottom Nav */}
      <div
        className="fixed left-4 right-4 bottom-4 grid grid-cols-4 gap-2.5 p-2.5 rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-lg"
      >
        <Button variant="ghost" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button variant="ghost" className="bg-muted/10" disabled>
          Usage
        </Button>
        <Button variant="ghost" onClick={() => navigate("/bills")}>
          Bills
        </Button>
        <Button variant="ghost" onClick={() => navigate("/support")}>
          Support
        </Button>
      </div>
    </div>
  );
}