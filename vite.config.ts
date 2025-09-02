// vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  base: "/durra/",
  server: { host: true, port: 5173 },
  assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.ktx2"],
});
