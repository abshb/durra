// src/scene/gui/object.ts
import * as THREE from "three";
import type { App } from "../types";

export function mountObjectGUI(gui: any, app: App) {
  const obj: THREE.Object3D | null = app.bottle ?? null; // change if you want a different object
  const f = gui.addFolder("Object");

  if (!obj) {
    f.add({ note: "No object found (app.bottle is null)" }, "note");
    return;
  }

  // Position controls (x, y, z)
  const pos = obj.position;
  f.add(pos, "x", -5, 5, 0.0001).name("x");
  f.add(pos, "y", -5, 5, 0.0001).name("y");
  f.add(pos, "z", -5, 5, 0.0001).name("z");
}
