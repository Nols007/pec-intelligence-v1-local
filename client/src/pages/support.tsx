
import React, { useMemo, useState } from "react";
import { nowTimestamp } from "../lib/demoData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";

type Ticket = {
  id: string;
  issue: string;
  desc: string;
  createdAt: string; // local time string
};

const STORAGE_KEY = "pec_support_tickets_v1";

function loadTickets(): Ticket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Ticket[];
  } catch {
    return [];
  }
}

function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export default function Support() {
  const [issue, setIssue] = useState<string>("Meter reading issue");
  const [desc, setDesc] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tickets, setTickets] = useState<Ticket[]>(() => loadTickets());

  const sorted = useMemo(() => [...tickets].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)), [tickets]);

  function submit() {
    setError("");

    const trimmed = desc.trim();
    if (!trimmed) {
      setError("Please type a short description before submitting.");
      return;
    }

    const t: Ticket = {
      id: `${Date.now()}`,
      issue,
      desc: trimmed,
      createdAt: nowTimestamp(), // device-local timestamp (your requirement)
    };

    const next = [t, ...tickets];
    setTickets(next);
    saveTickets(next);
    setDesc("");
  }

  return (
    <div className="p-4 min-h-screen bg-background text-foreground">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Support</CardTitle>
          <p className="text-muted-foreground">Log a ticket (demo) — stored on this device only.</p>
        </CardHeader>

        <CardContent>
          <div className="mb-4 font-semibold">Select your issue</div>
          <select
            className="w-full rounded-md border border-border bg-background text-foreground p-2"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          >
            <option>Meter reading issue</option>
            <option>Incorrect bill / invoice</option>
            <option>Payment query</option>
            <option>Water leak / burst pipe</option>
            <option>Electricity outage</option>
            <option>General query</option>
          </select>

          <div className="mt-6 mb-4 font-semibold">Short description</div>
          <textarea
            className="w-full rounded-md border border-border bg-background text-foreground p-2 resize-y min-h-[80px]"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Type a short description…"
          />

          {error ? (
            <div className="mt-3 p-2 font-semibold text-destructive">{error}</div>
          ) : null}
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button variant="destructive" onClick={submit}>
            Submit ticket
          </Button>
          <Button
            variant="default"
            onClick={() => {
              const sure = confirm("Clear all demo tickets on this device?");
              if (!sure) return;
              setTickets([]);
              saveTickets([]);
            }}
          >
            Clear demo tickets
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-xl mx-auto">
        <h2 className="text-lg font-extrabold mb-3">Logged tickets</h2>

        {sorted.length === 0 ? (
          <div className="text-muted-foreground font-semibold">No tickets yet.</div>
        ) : (
          <div className="grid gap-4">
            {sorted.map((t) => (
              <Card key={t.id} className="p-4">
                <div className="flex justify-between items-baseline gap-3">
                  <div className="font-extrabold text-lg">{t.issue}</div>
                  <div className="text-muted-foreground font-bold">{t.createdAt}</div>
                </div>
                <div className="mt-2 font-semibold text-muted-foreground">{t.desc}</div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
