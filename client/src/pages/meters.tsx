import React from "react";
import { useNavigate } from "react-router-dom";
import { usePecView } from "../state/pecView";
import PageContainer from "../layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

type MeterContent = {
  title: string;
  subtitle: string;
  electricityReading: string;
  waterReading: string;
  insight: string;
};

function getMeterContent(view: "residential" | "portfolio" | "pecInternal"): MeterContent {
  if (view === "portfolio") {
    return {
      title: "Meters (Portfolio)",
      subtitle: "Meter-level monitoring and latest readings",
      electricityReading: "248,730 kWh",
      waterReading: "4,860.2 kL",
      insight:
        "Portfolio meter readings indicate stable site-level monitoring coverage with no major variance outside expected operational thresholds.",
    };
  }

  if (view === "pecInternal") {
    return {
      title: "Meters (PEC Internal)",
      subtitle: "Meter-level monitoring and latest readings",
      electricityReading: "92 Active Meter Points",
      waterReading: "41 Active Water Points",
      insight:
        "Internal monitoring indicates strong telemetry visibility across active sites, with a small number of meters requiring validation follow-up.",
    };
  }

  return {
    title: "Meters (Residential)",
    subtitle: "Meter-level monitoring and latest readings",
    electricityReading: "7,842 kWh",
    waterReading: "186.4 kL",
    insight:
      "Meter readings indicate stable household consumption patterns with no abnormal variance detected in the current cycle.",
  };
}

export default function Meters() {
  const { view } = usePecView();
  const navigate = useNavigate();

  const content = getMeterContent(view);

  return (
    <PageContainer
      title={content.title}
      subtitle={content.subtitle}
    >
      {/* Electricity */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Electricity Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{content.electricityReading}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Last recorded reading
          </div>
        </CardContent>
      </Card>

      {/* Water */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Water Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{content.waterReading}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Last recorded reading
          </div>
        </CardContent>
      </Card>

      {/* Insight */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Monitoring Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            {content.insight}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="pt-2">
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          className="opacity-90 hover:opacity-100"
        >
          ← Return to Overview
        </Button>
      </div>
    </PageContainer>
  );
}