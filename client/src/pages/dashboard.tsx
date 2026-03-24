import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import BottomNav from "@/layout/BottomNav";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePecView } from "../state/pecView";

type DashboardView = "residential" | "portfolio" | "pecInternal";

function OverviewCard(props: {
  labelLeft: string;
  labelRight: string;
  value: string;
}) {
  return (
    <Card className="rounded-2xl border-border/60 bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-extrabold tracking-tight">
            {props.labelLeft}
          </CardTitle>
          <CardDescription className="text-right text-xs font-semibold text-muted-foreground">
            {props.labelRight}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-[40px] font-extrabold leading-none tracking-tight sm:text-[54px]">
          {props.value}
        </div>
      </CardContent>
    </Card>
  );
}

// Replace the entire Dashboard component with a redirect to /home

import { Navigate } from "react-router-dom";

export default function Dashboard() {
  return <Navigate to="/home" replace />;
}
