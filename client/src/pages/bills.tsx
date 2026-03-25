

import React from "react";
import { useNavigate } from "react-router-dom";
import { usePecView } from "../state/pecView";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Bills() {
  const { view } = usePecView();
  const navigate = useNavigate();

  // Define user-friendly view label
  const viewLabel =
    view === "residential"
      ? "Residential"
      : view === "portfolio"
      ? "Portfolio"
      : "PEC Internal";

  return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif", color: "var(--foreground)", background: "var(--background)" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px",
          textAlign: "left",
        }}
        className="pb-32"
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 className="text-3xl font-semibold tracking-tight">
            Bills ({viewLabel})
          </h1>
        </div>

        {/* Description */}
        <p style={{ marginBottom: "24px" }} className="text-muted-foreground">
          Welcome to your bills overview. Monitor your latest statements and key billing information in one place.
        </p>

        {/* Latest Statement Card */}
        <Card className="mb-5 border-border bg-card/80 backdrop-blur-sm" style={{ width: "100%" }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
              Latest Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mt-2 text-4xl font-extrabold text-indigo-100">
              R 1,455.20
            </p>
            <p className="mt-1 text-sm text-indigo-300">
              Due Date: 25th of this month
            </p>
            <p className="mt-3 text-sm text-indigo-300">
              Your current bill reflects consumption trends and recent utility activity. For detailed usage, visit the Usage page.
            </p>
          </CardContent>
        </Card>

        {/* Billing Summary Card */}
        <Card className="mb-5 border-border bg-card/80 backdrop-blur-sm" style={{ width: "100%" }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
              Billing Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-indigo-300 text-sm">
              <li>Electricity: R 890.50</li>
              <li>Water: R 410.30</li>
              <li>Gas: R 154.40</li>
            </ul>
          </CardContent>
        </Card>

        {/* Return to Overview */}
        <div className="mt-10 mb-4 flex justify-start">
          <Button
            variant="outline"
            className="opacity-90 hover:opacity-100"
            onClick={() => navigate("/home")}
          >
            ← Return to Overview
          </Button>
        </div>
      </div>
    </main>
  );
}
