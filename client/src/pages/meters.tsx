import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Meters() {
  const { view } = usePecView();

  return (
    <div className="p-4 min-h-screen grid gap-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        Meters ({view === "residential" ? "Residential" : view === "portfolio" ? "Portfolio" : "PEC Internal"})
      </h1>
      <p className="text-muted-foreground text-lg">Demo placeholder</p>

      <Card className="bg-background border-border">
        <CardContent className="grid gap-4 p-4">
          <MeterRow name="Electricity Meter" meta="Prepaid • demo" value="Last read: 12,430 kWh" />
          <MeterRow name="Water Meter" meta="Municipal • demo" value="Last read: 884 kL" />
        </CardContent>
      </Card>

      <div className="mt-auto flex flex-wrap gap-3">
        <Button variant="outline" asChild className="flex-grow sm:flex-grow-0">
          <Link to="/home">← Return to Overview</Link>
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
  fontWeight: "900",
};