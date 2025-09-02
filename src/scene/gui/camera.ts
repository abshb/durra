// src/scene/gui/camera.ts
import type { App } from "../types";
import {
  ProductPreset,
  loadPreset,
  savePreset,
  applyPreset,
  type CameraPreset,
} from "../camera/presets";

export function mountCameraGUI(gui: any, app: App) {
  const { camera, controls, bottle } = app;
  const f = gui.addFolder("Camera");

  // Start from saved (or default) preset
  const state: CameraPreset = { ...loadPreset() };

  const apply = () => {
    if (!bottle) return;
    applyPreset(app, state);
  };

  // Controls
  f.add(state, "fov", 22, 32, 0.1).name("FOV (tele)").onChange(apply);

  f.add(state, "yOffset", -0.3, 0.3, 0.001)
    .name("Vertical Offset")
    .onChange(apply);

  f.add(state, "elevation", -10, 30, 0.1).name("Elevation °").onChange(apply);

  // Expanded range to allow meaningful zoom-out
  f.add(state, "fill", 0.3, 1.0, 0.01).name("Frame Fill").onChange(apply);

  const actions = {
    productPreset: () => {
      Object.assign(state, ProductPreset);
      apply();
    },
    slightZoomOut: () => {
      state.fill = Math.max(0.3, state.fill - 0.05);
      apply();
    },
    centerX: () => {
      controls.target.x = 0;
      camera.position.x = 0;
      camera.lookAt(controls.target);
      controls.update();
    },
    save: () => {
      savePreset(state); // persists + fires "camera-preset-saved"
      apply(); // apply immediately in this session
      console.info("[Camera] preset saved", state);
      // OPTIONAL: also POST to backend for multi-device persistence
      // fetch("/api/camera-preset", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(state),
      // }).catch(() => {});
    },
    resetToSaved: () => {
      Object.assign(state, loadPreset());
      apply();
    },
  };

  f.add(actions, "productPreset").name("Apply Product Preset");
  f.add(actions, "slightZoomOut").name("Slight Zoom Out");
  f.add(actions, "centerX").name("Center X");
  f.add(actions, "save").name("💾 Save (apply site-wide)");
  f.add(actions, "resetToSaved").name("↩ Revert to Saved");

  if (bottle) apply(); // reflect current saved preset on open
}
