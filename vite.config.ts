import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,

    // Replit hostnames like *.worf.replit.dev
    allowedHosts: true,

    // Fix ENOSPC watcher crashes on Replit
    watch: {
      usePolling: true,
      interval: 300,
      ignored: [
        "**/.git/**",
        "**/node_modules/**",
        "**/dist/**",
        "**/.cache/**",
        "**/.bun/**",
        "**/.replit/**",
      ],
    },
  },
});