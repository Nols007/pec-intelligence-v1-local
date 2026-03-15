import { useMemo } from "react";
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

type DashboardView = "residential" | "portfolio";

export default function Dashboard() {
  const { view, setView } = usePecView();

  const title = useMemo(() => {
    return view === "residential"
      ? "Residential Dashboard"
      : "Portfolio Dashboard";
  }, [view]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="page">
        <div className="mb-6">
          <h1 className="text-[42px] font-extrabold leading-[1.02] tracking-tight sm:text-[54px]">
            {title}
          </h1>
          <div className="mt-2 text-sm font-semibold text-muted-foreground">
            Unit-level overview • demo mode
          </div>
        </div>

        {/* View */}
        <div className="mb-6">
          <Card className="rounded-2xl border-border/60 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold tracking-[0.02em] text-muted-foreground">
                View
              </CardTitle>
              <CardDescription className="text-xs font-semibold text-muted-foreground">
                Switch between residential and portfolio dashboards.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Select
                value={view}
                onValueChange={(value) => setView(value as DashboardView)}
              >
                <SelectTrigger className="h-12 rounded-2xl border-border bg-background text-base font-bold text-foreground ring-offset-background focus:ring-ring/30">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <div className="mb-7">
          <Alert className="rounded-2xl border-border/60 bg-card/50 text-foreground">
            <AlertTitle className="text-base font-bold">Demo mode</AlertTitle>
            <AlertDescription className="mt-2 text-sm text-muted-foreground">
              Values shown are placeholders for UI review.
            </AlertDescription>
          </Alert>
        </div>

        {/* Overview cards */}
        <div className="grid gap-3">
          <OverviewCard
            labelLeft="Current Balance"
            labelRight="Estimated, demo mode"
            value="R 842.35"
          />
          <OverviewCard
            labelLeft="Month Spend"
            labelRight="So far this month"
            value="R 612.90"
          />
          <OverviewCard
            labelLeft="Electricity"
            labelRight="This month (demo)"
            value="388 kWh"
          />
          <OverviewCard
            labelLeft="Water"
            labelRight="This month (demo)"
            value="12.4 kL"
          />
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <div className="mb-3 text-base font-bold">Quick Actions</div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-border bg-card/50 text-foreground hover:bg-accent"
            >
              <Link to="/usage">Usage</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-border bg-card/50 text-foreground hover:bg-accent"
            >
              <Link to="/bills">Bills</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-2xl border-border bg-card/50 text-foreground hover:bg-accent"
            >
              <Link to="/meters">Meters</Link>
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

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