import React from "react";
import { useNavigate } from "react-router-dom";
import { usePecView } from "../state/pecView";
import PageContainer from "../layout/PageContainer";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

type UsageContent = {
  title: string;
  electricityTrend: string;
  electricityPositive: boolean;
  waterTrend: string;
  waterPositive: boolean;
  projectedCost: string;
  projectedLabel: string;
  insightTitle: string;
  insightBody: string;
};

function getUsageContent(view: "residential" | "portfolio" | "pecInternal"): UsageContent {
  if (view === "portfolio") {
    return {
      title: "Usage - Portfolio View",
      electricityTrend: "+6.8% month-on-month",
      electricityPositive: true,
      waterTrend: "-0.9% month-on-month",
      waterPositive: false,
      projectedCost: "R 842,500",
      projectedLabel: "Estimated portfolio utility spend next billing cycle",
      insightTitle: "Portfolio demand variation suggests an opportunity to optimise peak usage",
      insightBody:
        "Consumption patterns across multiple sites indicate an opportunity to reduce peak demand exposure and improve efficiency at portfolio level.",
    };
  }

  if (view === "pecInternal") {
    return {
      title: "Usage - PEC Internal View",
      electricityTrend: "+2.1% month-on-month",
      electricityPositive: true,
      waterTrend: "+0.4% month-on-month",
      waterPositive: false,
      projectedCost: "R 1,240,000",
      projectedLabel: "Estimated internal operational utility exposure",
      insightTitle: "PEC Internal view indicates cross-site monitoring opportunities",
      insightBody:
        "Cross-site monitoring highlights operational opportunities to standardise performance visibility and improve utility management decisions.",
    };
  }

  return {
    title: "Usage - Residential View",
    electricityTrend: "+4.2% month-on-month",
    electricityPositive: true,
    waterTrend: "-1.8% month-on-month",
    waterPositive: false,
    projectedCost: "R 195,000",
    projectedLabel: "Estimated electricity spend next billing cycle",
    insightTitle: "Weekend electricity consumption spikes detected",
    insightBody:
      "Weekend electricity consumption spikes detected. Investigate HVAC scheduling or tenant after-hours usage patterns.",
  };
}

type SegmentButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function SegmentButton({ active, onClick, children }: SegmentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200",
        active
          ? "border border-white/10 bg-white/12 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.28)]"
          : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function Usage() {
  const navigate = useNavigate();
  const { view, setView } = usePecView();

  const content = getUsageContent(view);

  return (
    <PageContainer title={content.title} subtitle="Utility consumption analytics">
      {/* Premium View Toggle */}
      <div>
        <div className="inline-flex w-full rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <SegmentButton active={view === "residential"} onClick={() => setView("residential")}>
            Residential
          </SegmentButton>

          <SegmentButton active={view === "portfolio"} onClick={() => setView("portfolio")}>
            Portfolio
          </SegmentButton>

          <SegmentButton active={view === "pecInternal"} onClick={() => setView("pecInternal")}>
            PEC Internal
          </SegmentButton>
        </div>
      </div>

      {/* Electricity Trend */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Electricity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={
              content.electricityPositive
                ? "text-xl font-bold text-green-400"
                : "text-xl font-bold text-red-400"
            }
          >
            {content.electricityPositive ? "▲" : "▼"} {content.electricityTrend}
          </div>
        </CardContent>
      </Card>

      {/* Water Trend */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Water Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={
              content.waterPositive
                ? "text-xl font-bold text-green-400"
                : "text-xl font-bold text-red-400"
            }
          >
            {content.waterPositive ? "▲" : "▼"} {content.waterTrend}
          </div>
        </CardContent>
      </Card>

      {/* Efficiency Opportunity */}
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
        <div className="text-sm font-semibold text-emerald-400">
          Potential efficiency opportunity identified
        </div>

        <div className="mt-1 text-xl font-bold text-emerald-300">
          {view === "residential" && "R 18,200"}
          {view === "portfolio" && "R 842,500"}
          {view === "pecInternal" && "R 1,240,000+"}
        </div>

        <div className="mt-1 text-xs text-muted-foreground">
          Estimated optimisation potential based on current usage patterns
        </div>
      </div>

      {/* Projected Monthly Cost */}
      <Card className="border border-gray-700 bg-gray-900 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
            Projected Monthly Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-extrabold tracking-tight text-indigo-100">
            {content.projectedCost}
          </div>
          <div className="mt-2 text-indigo-300">{content.projectedLabel}</div>
        </CardContent>
      </Card>

      {/* Intelligence Insight */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
            {content.insightTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-indigo-300">{content.insightBody}</div>
        </CardContent>
      </Card>

      {/* Return to Overview */}
      <div className="flex justify-start pt-2">
        <Button
          variant="outline"
          className="opacity-90 hover:opacity-100"
          onClick={() => navigate("/home")}
        >
          ← Return to Overview
        </Button>
      </div>
    </PageContainer>
  );
}
