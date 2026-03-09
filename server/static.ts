import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";

export function serveStatic(app: Express) {
  // Vite production build output is typically "dist"
  const distPath = path.resolve(process.cwd(), "dist");
  const indexHtmlPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(distPath) || !fs.existsSync(indexHtmlPath)) {
    throw new Error(
      `Production build not found. Expected ${indexHtmlPath}. ` +
        `Run "npm run build" first.`
    );
  }

  // Serve static assets (but don't auto-serve index, we handle SPA fallback ourselves)
  app.use(express.static(distPath, { index: false }));

  // SPA fallback (Express-safe wildcard)
  app.get("*", (_req, res) => {
    res.sendFile(indexHtmlPath);
  });
}