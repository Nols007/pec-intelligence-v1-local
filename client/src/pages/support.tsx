import React, { useMemo, useState } from "react";
import { nowTimestamp } from "../lib/demoData";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif", color: "var(--foreground)", background: "var(--background)" }}>
      <div
        className="p-4 pb-24"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "24px",
          textAlign: "left",
        }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ marginBottom: "24px" }}>Support</h1>
        <p className="text-muted-foreground text-lg" style={{ marginBottom: "24px" }}>
          Log a ticket (demo) — stored on this device only.
        </p>

        <Card>
          <CardContent className="grid gap-4">
            <div>
              <label htmlFor="issue-select" className="block mb-2 font-semibold">
                Select your issue
              </label>
              <select
                id="issue-select"
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
            </div>

            <div>
              <label htmlFor="desc-textarea" className="block mt-4 mb-2 font-semibold">
                Short description
              </label>
              <textarea
                id="desc-textarea"
                className="w-full rounded-md border border-border bg-background text-foreground p-2 resize-y min-h-[80px]"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Type a short description…"
              />
              {error ? (
                <div className="mt-3 p-2 font-semibold text-destructive">{error}</div>
              ) : null}
            </div>
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

        <div>
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

        <div className="flex gap-3 justify-center" style={{ marginTop: "24px" }}>
          <Button onClick={() => navigate("/home")}>← Return to Overview</Button>
        </div>
      </div>
    </main>
  );
}
