// src/scene/gui/index.ts
import GUI from "lil-gui";
import type { App } from "../types";
import { mountRenderGUI } from "./render";
import { mountCameraGUI } from "./camera";
import { mountEffectsGUI } from "./effects";
import { mountMaterialsGUI } from "./materials";
import { mountLightsGUI } from "./lights";
import { mountObjectGUI } from "./object";

export function setupDebugUI(app: App) {
  const gui = new GUI({ title: "Durra Debug" });

  // mountRenderGUI(gui, app);
  mountCameraGUI(gui, app);
  // mountEffectsGUI(gui, app);
  // mountMaterialsGUI(gui, app);
  // mountLightsGUI(gui, app); // lights live here now
  mountObjectGUI(gui, app);

  // Keep composer sized if you tweak things that might affect layout
  gui.onFinishChange(() =>
    app.effects.composer.setSize(innerWidth, innerHeight)
  );
}
