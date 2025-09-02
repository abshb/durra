// src/scene/gui/render.ts
import type { App } from "../types";

export function mountRenderGUI(gui: any, { renderer }: App) {
  const f = gui.addFolder("Render");
  f.add(renderer, "toneMappingExposure", 0.6, 1.6, 0.01).name("Exposure");

  const dprObj = { dpr: renderer.getPixelRatio() };
  f.add(dprObj, "dpr", 0.75, Math.min(devicePixelRatio, 2), 0.05)
    .name("Pixel Ratio")
    .onChange((v: number) => renderer.setPixelRatio(v));
}
