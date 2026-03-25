import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Meters() {
  const { view } = usePecView();
  const navigate = useNavigate();

  return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif", color: "var(--foreground)", background: "var(--background)" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px",
          textAlign: "left",
        }}
        className="pb-24"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground" style={{ marginBottom: "24px" }}>
          Meters ({view === "residential" ? "Residential" : view === "portfolio" ? "Portfolio" : "PEC Internal"})
        </h1>
        <p className="text-muted-foreground text-lg" style={{ marginBottom: "24px" }}>
          Demo placeholder
        </p>

        <Card className="bg-background border-border" style={{ width: "100%" }}>
          <CardContent className="grid gap-4 p-4">
            <MeterRow name="Electricity Meter" meta="Prepaid • demo" value="Last read: 12,430 kWh" />
            <MeterRow name="Water Meter" meta="Municipal • demo" value="Last read: 884 kL" />
          </CardContent>
        </Card>

        <div className="mt-auto flex flex-wrap gap-3" style={{ marginTop: "24px" }}>
          <Button asChild variant="outline" className="flex-grow sm:flex-grow-0">
            <Button onClick={() => navigate("/home")}>← Return to Overview</Button>
          </Button>
        </div>
      </div>
    </main>
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