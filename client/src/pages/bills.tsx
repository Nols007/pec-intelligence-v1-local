import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Bills() {
  const { view } = usePecView();

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-4xl font-extrabold leading-tight text-foreground">
        Bills ({view === "residential" ? "Residential" : "Portfolio"})
      </h1>
      <p className="text-muted-foreground">Demo placeholder</p>

      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Latest statement (demo)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mt-2 text-3xl font-extrabold text-foreground">R 1,455.20</p>
          <p className="mt-1 text-muted-foreground">Due: 25th (demo)</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" className="whitespace-nowrap">
          <Link to="/dashboard">← Back to Dashboard</Link>
        </Button>
        <Button asChild variant="outline" className="whitespace-nowrap">
          <Link to="/">← Home</Link>
        </Button>
      </div>
    </div>
  );
}
