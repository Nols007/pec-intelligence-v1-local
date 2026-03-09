import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "client",
  plugins: [react()],
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