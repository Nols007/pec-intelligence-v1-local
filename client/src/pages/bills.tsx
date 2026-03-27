import React from "react";
import { useNavigate } from "react-router-dom";
import { usePecView } from "../state/pecView";
import PageContainer from "../layout/PageContainer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

type BillsContent = {
  title: string;
  subtitle: string;
  latestStatement: string;
  dueDate: string;
  summaryItems: string[];
  description: string;
};

function getBillsContent(view: "residential" | "portfolio" | "pecInternal"): BillsContent {
  if (view === "portfolio") {
    return {
      title: "Bills (Portfolio)",
      subtitle: "Latest statements and key billing information",
      latestStatement: "R 842,500",
      dueDate: "Due this billing cycle",
      summaryItems: [
        "Electricity: R 512,300",
        "Water: R 214,600",
        "Gas: R 115,600",
      ],
      description:
        "Monitor consolidated portfolio utility charges and review billing patterns across multiple sites.",
    };
  }

  if (view === "pecInternal") {
    return {
      title: "Bills (PEC Internal)",
      subtitle: "Latest statements and key billing information",
      latestStatement: "R 1,240,000",
      dueDate: "Internal exposure summary",
      summaryItems: [
        "Electricity: R 760,000",
        "Water: R 320,000",
        "Gas: R 160,000",
      ],
      description:
        "Track internal utility exposure and monitor operational billing visibility across managed sites.",
    };
  }

  return {
    title: "Bills (Residential)",
    subtitle: "Latest statements and key billing information",
    latestStatement: "R 3,980.40",
    dueDate: "Due Date: 25th of this month",
    summaryItems: [
      "Electricity: R 2,460.10",
      "Water: R 1,120.30",
      "Gas: R 400.00",
    ],
    description:
      "Monitor your latest household utility charges and review billing trends in one place.",
  };
}

export default function Bills() {
  const { view } = usePecView();
  const navigate = useNavigate();

  const content = getBillsContent(view);

  return (
    <PageContainer title={content.title} subtitle={content.subtitle}>
      {/* Description */}
      <p className="text-muted-foreground">
        {content.description}
      </p>

      {/* Latest Statement Card */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
            Latest Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-indigo-100">
            {content.latestStatement}
          </p>
          <p className="mt-1 text-sm text-indigo-300">
            {content.dueDate}
          </p>
          <p className="mt-3 text-sm text-indigo-300">
            Current billing reflects recent consumption trends and account activity.
          </p>
        </CardContent>
      </Card>

      {/* Billing Summary Card */}
      <Card className="border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-indigo-400 dark:text-indigo-300">
            Billing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-indigo-300">
            {content.summaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
