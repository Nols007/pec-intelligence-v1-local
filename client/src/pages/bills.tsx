import React from "react";
import { Link } from "react-router-dom";
import { usePecView } from "../state/pecView";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Bills() {
  const { view } = usePecView();

  return (
    <div className="p-4 min-h-screen grid gap-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        Bills ({view === "residential" ? "Residential" : view === "portfolio" ? "Portfolio" : "PEC Internal"})
      </h1>
      <p className="text-muted-foreground text-lg">Demo placeholder</p>

      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>Latest statement (demo)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="mt-2 text-3xl font-extrabold text-foreground">R 1,455.20</p>
          <p className="mt-1 text-muted-foreground">Due: 25th (demo)</p>
        </CardContent>
      </Card>

      <div className="mt-auto flex flex-wrap gap-3">
        <Button asChild variant="outline" className="flex-grow sm:flex-grow-0">
          <Link to="/home">← Return to Overview</Link>
        </Button>
      </div>
    </div>
  );
}
