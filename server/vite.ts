import type { Express } from "express";
import type http from "node:http";
import { createServer as createViteServer, type ViteDevServer } from "vite";

export async function setupVite(app: Express, server: http.Server): Promise<ViteDevServer> {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "spa",
  });

  app.use(vite.middlewares);
  return vite;
}