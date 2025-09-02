// src/scene/gui/materials.ts
import type { App } from "../types";

export function mountMaterialsGUI(gui: any, { materials }: App) {
  const f = gui.addFolder("Materials");

  if (materials.glassMat) {
    const m = materials.glassMat!;
    const gm = {
      roughness: m.roughness,
      transmission: m.transmission ?? 1,
      thickness: m.thickness ?? 1.6,
      ior: m.ior ?? 1.5,
      clearcoat: m.clearcoat ?? 1,
      clearcoatRoughness: m.clearcoatRoughness ?? 0.02,
    };
    const g = f.addFolder("Glass");
    g.add(gm, "roughness", 0.0, 0.3, 0.001).onChange(
      (v: number) => (m.roughness = v)
    );
    g.add(gm, "transmission", 0.0, 1.0, 0.01).onChange(
      (v: number) => (m.transmission = v)
    );
    g.add(gm, "thickness", 0.0, 5.0, 0.01).onChange(
      (v: number) => (m.thickness = v)
    );
    g.add(gm, "ior", 1.0, 2.0, 0.01).onChange((v: number) => (m.ior = v));
    g.add(gm, "clearcoat", 0.0, 1.0, 0.01).onChange(
      (v: number) => (m.clearcoat = v)
    );
    g.add(gm, "clearcoatRoughness", 0.0, 0.3, 0.001).onChange(
      (v: number) => (m.clearcoatRoughness = v)
    );
  }

  if (materials.metalMat) {
    const m = materials.metalMat!;
    const mm = {
      color: "#" + m.color.getHexString(),
      roughness: m.roughness,
      metalness: m.metalness,
      clearcoat: m.clearcoat ?? 0.25,
      clearcoatRoughness: m.clearcoatRoughness ?? 0.12,
    };
    const g = f.addFolder("Metal");
    g.addColor(mm, "color").onChange((v: string) => m.color.set(v));
    g.add(mm, "roughness", 0.05, 0.6, 0.005).onChange(
      (v: number) => (m.roughness = v)
    );
    g.add(mm, "metalness", 0.5, 1.0, 0.01).onChange(
      (v: number) => (m.metalness = v)
    );
    g.add(mm, "clearcoat", 0.0, 1.0, 0.01).onChange(
      (v: number) => (m.clearcoat = v)
    );
    g.add(mm, "clearcoatRoughness", 0.0, 0.5, 0.005).onChange(
      (v: number) => (m.clearcoatRoughness = v)
    );
  }
}
