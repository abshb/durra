import { defineConfig } from "vite";

export default defineConfig({
  base: "/durra/", // must match your repo name
  server: { host: true, port: 5173 },
  assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.ktx2"],
});
