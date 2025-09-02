// src/scene/gui/effects.ts
import type { App } from "../types";

export function mountEffectsGUI(gui: any, { effects }: App) {
  const { bloom, vignette } = effects;
  const f = gui.addFolder("Effects");

  f.add(bloom, "intensity", 0.0, 0.8, 0.01).name("Bloom Intensity");
  f.add((bloom as any).luminanceMaterial, "threshold", 0.0, 1.5, 0.01).name(
    "Bloom Threshold"
  );
  f.add((bloom as any).luminanceMaterial, "smoothing", 0.0, 1.0, 0.01).name(
    "Bloom Smooth"
  );

  const v = { enabled: true, offset: 0.25, darkness: 0.6 };
  f.add(v, "enabled")
    .name("Vignette")
    .onChange((on: boolean) => (vignette.blendMode.opacity.value = on ? 1 : 0));
  f.add(v, "offset", 0, 1, 0.01).onChange(
    (val: number) => ((vignette as any).offset = val)
  );
  f.add(v, "darkness", 0, 1.5, 0.01).onChange(
    (val: number) => ((vignette as any).darkness = val)
  );
}
