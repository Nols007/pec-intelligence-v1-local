import React, { useMemo, useState } from "react";
import { nowTimestamp } from "../lib/demoData";

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
    <div>
      <div className="h1">Support</div>
      <div className="sub">Log a ticket (demo) — stored on this device only.</div>

      <div className="card cardPad">
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Select your issue</div>
        <select className="select" value={issue} onChange={(e) => setIssue(e.target.value)}>
          <option>Meter reading issue</option>
          <option>Incorrect bill / invoice</option>
          <option>Payment query</option>
          <option>Water leak / burst pipe</option>
          <option>Electricity outage</option>
          <option>General query</option>
        </select>

        <div style={{ height: 12 }} />

        <div style={{ fontWeight: 900, marginBottom: 8 }}>Short description</div>
        <textarea
          className="textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Type a short description…"
        />

        {error ? (
          <div className="errorBox" style={{ marginTop: 12, fontWeight: 750 }}>
            {error}
          </div>
        ) : null}

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <button className="btn btnRed" onClick={submit}>
            Submit ticket
          </button>
          <button
            className="btn"
            onClick={() => {
              const sure = confirm("Clear all demo tickets on this device?");
              if (!sure) return;
              setTickets([]);
              saveTickets([]);
            }}
          >
            Clear demo tickets
          </button>
        </div>
      </div>

      <div className="divider" />

      <div style={{ fontSize: 22, fontWeight: 950, marginBottom: 10 }}>Logged tickets</div>

      {sorted.length === 0 ? (
        <div className="muted" style={{ fontWeight: 700 }}>No tickets yet.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {sorted.map((t) => (
            <div key={t.id} className="card cardPad">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                <div style={{ fontSize: 18, fontWeight: 950 }}>{t.issue}</div>
                <div className="muted" style={{ fontWeight: 800 }}>{t.createdAt}</div>
              </div>
              <div style={{ marginTop: 8, fontWeight: 750, color: "rgba(255,255,255,0.80)" }}>
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}