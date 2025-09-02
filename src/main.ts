// src/main.ts
import { initScene } from "./scene/Scene";

async function main() {
  const canvas = document.getElementById("webgl");

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas element #webgl not found or not a canvas");
  }
  const app = await initScene({ canvas });
}

main().catch((err) => {
  console.error("Error initializing scene:", err);
});
