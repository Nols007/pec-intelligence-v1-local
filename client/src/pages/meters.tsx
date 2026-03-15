import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Meters() {
  const { view } = usePecView();

  return (
    <div className="grid gap-4">
      <h1 className="text-[2.875rem] font-extrabold leading-none">
        Meters ({view === "residential" ? "Residential" : "Portfolio"})
      </h1>
      <p className="opacity-75">Demo placeholder</p>

      <Card className="bg-background border-border">
        <CardContent className="grid gap-3 p-4">
          <MeterRow name="Electricity Meter" meta="Prepaid • demo" value="Last read: 12,430 kWh" />
          <MeterRow name="Water Meter" meta="Municipal • demo" value="Last read: 884 kL" />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <Link to="/dashboard">← Back to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">← Home</Link>
        </Button>
      </div>
    </div>
  );
}

function MeterRow(props: { name: string; meta: string; value: string }) {
  return (
    <Card className="bg-background/40 border-border border">
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between gap-2">
          <div className="font-extrabold">{props.name}</div>
          <div className="opacity-70 font-semibold">{props.meta}</div>
        </div>
        <div className="opacity-85 mt-2">{props.value}</div>
      </CardContent>
    </Card>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
};
