import express from "express";
import http from "node:http";

import { serveStatic } from "./static";
import { setupVite } from "./vite";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check (helps confirm server is reachable)
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

async function start() {
  const server = http.createServer(app);

  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // IMPORTANT (Replit): always listen on process.env.PORT
  const rawPort = process.env.PORT;
  const port = rawPort ? Number(rawPort) : 5000;

  if (!Number.isFinite(port)) {
    throw new Error(`Invalid PORT: "${rawPort}"`);
  }

  // Helpful error handling (prevents silent crashes)
  server.on("error", (err: any) => {
    if (err?.code === "EADDRINUSE") {
      console.error(
        `[server] Port ${port} is already in use (EADDRINUSE). This usually means a previous run is still active.`
      );
      console.error(
        `[server] Fix: Click "Stop" in Replit, wait 2–5 seconds, then click "Run" once.`
      );
    } else {
      console.error("[server] Server error:", err);
    }
    process.exit(1);
  });

  // Graceful shutdown (reduces “stuck port” incidents)
  const shutdown = () => {
    server.close(() => process.exit(0));
    // fallback in case close hangs
    setTimeout(() => process.exit(0), 2000).unref();
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  server.listen(port, "0.0.0.0", () => {
    console.log(
      `[server] listening on http://0.0.0.0:${port} (NODE_ENV=${process.env.NODE_ENV ?? "development"})`
    );
  });
}

start().catch((err) => {
  console.error("[server] failed to start:", err);
  process.exit(1);
});