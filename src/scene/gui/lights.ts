// src/scene/gui/lights.ts
import * as THREE from "three";
import type { App } from "../types";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export function mountLightsGUI(gui: any, app: App) {
  const { lights, scene } = app;
  const { key, fill, rim, hemi } = lights;

  const fLight = gui.addFolder("Lights");

  // Helpers
  const keyH = new RectAreaLightHelper(key);
  const fillH = new RectAreaLightHelper(fill);
  key.add(keyH);
  fill.add(fillH);
  const rimH = new THREE.DirectionalLightHelper(rim, 0.4);
  const hemiH = new THREE.HemisphereLightHelper(hemi, 0.4);
  scene.add(rimH, hemiH);

  const toggles = { helpers: true };
  fLight
    .add(toggles, "helpers")
    .name("Show Helpers")
    .onChange((v: boolean) => {
      keyH.visible = fillH.visible = rimH.visible = hemiH.visible = v;
    });

  // Intensities
  fLight.add(key, "intensity", 0, 80, 0.1).name("Key Intensity");
  fLight.add(fill, "intensity", 0, 30, 0.1).name("Fill Intensity");
  fLight.add(rim, "intensity", 0, 5, 0.01).name("Rim Intensity");
  fLight.add(hemi, "intensity", 0, 2, 0.01).name("Hemi Intensity");

  // Colors
  const colors = {
    key: `#${key.color.getHexString()}`,
    fill: `#${fill.color.getHexString()}`,
    rim: `#${rim.color.getHexString()}`,
    hemiSky: `#${hemi.color.getHexString()}`,
    hemiGround: `#${hemi.groundColor.getHexString()}`,
  };
  fLight
    .addColor(colors, "key")
    .name("Key Color")
    .onChange((v: string) => key.color.set(v));
  fLight
    .addColor(colors, "fill")
    .name("Fill Color")
    .onChange((v: string) => fill.color.set(v));
  fLight
    .addColor(colors, "rim")
    .name("Rim Color")
    .onChange((v: string) => rim.color.set(v));
  fLight
    .addColor(colors, "hemiSky")
    .name("Hemi Sky")
    .onChange((v: string) => {
      hemi.color.set(v);
      hemiH.update();
    });
  fLight
    .addColor(colors, "hemiGround")
    .name("Hemi Ground")
    .onChange((v: string) => {
      (hemi as any).groundColor.set(v);
      hemiH.update();
    });

  // Positions
  const keyPos = fLight.addFolder("Key Position");
  keyPos
    .add(key.position, "x", -4, 4, 0.01)
    .name("x")
    .onChange(() => (keyH as any).update());
  keyPos
    .add(key.position, "y", 0.2, 5, 0.01)
    .name("y")
    .onChange(() => (keyH as any).update());
  keyPos
    .add(key.position, "z", -1, 4, 0.01)
    .name("z")
    .onChange(() => (keyH as any).update());

  const fillPos = fLight.addFolder("Fill Position");
  fillPos
    .add(fill.position, "x", -4, 4, 0.01)
    .name("x")
    .onChange(() => (fillH as any).update());
  fillPos
    .add(fill.position, "y", 0.2, 5, 0.01)
    .name("y")
    .onChange(() => (fillH as any).update());
  fillPos
    .add(fill.position, "z", -1, 5, 0.01)
    .name("z")
    .onChange(() => (fillH as any).update());

  const rimPos = fLight.addFolder("Rim Position");
  rimPos.add(rim.position, "x", -6, 6, 0.01).onChange(() => rimH.update());
  rimPos.add(rim.position, "y", -1, 6, 0.01).onChange(() => rimH.update());
  rimPos.add(rim.position, "z", -6, 6, 0.01).onChange(() => rimH.update());

  const hemiPos = fLight.addFolder("Hemi Position");
  hemiPos.add(hemi.position, "x", -6, 6, 0.01).onChange(() => hemiH.update());
  hemiPos.add(hemi.position, "y", -1, 6, 0.01).onChange(() => hemiH.update());
  hemiPos.add(hemi.position, "z", -6, 6, 0.01).onChange(() => hemiH.update());

  // Rect size + rotation
  const sizeKey = fLight.addFolder("Key Size");
  sizeKey
    .add(key, "width", 0.1, 10, 0.05)
    .onChange(() => (keyH as any).update());
  sizeKey
    .add(key, "height", 0.1, 10, 0.05)
    .onChange(() => (keyH as any).update());

  const sizeFill = fLight.addFolder("Fill Size");
  sizeFill
    .add(fill, "width", 0.1, 10, 0.05)
    .onChange(() => (fillH as any).update());
  sizeFill
    .add(fill, "height", 0.1, 10, 0.05)
    .onChange(() => (fillH as any).update());

  const toDeg = (r: number) => THREE.MathUtils.radToDeg(r);
  const toRad = (d: number) => THREE.MathUtils.degToRad(d);
  const rKey = {
    x: toDeg(key.rotation.x),
    y: toDeg(key.rotation.y),
    z: toDeg(key.rotation.z),
  };
  const rFill = {
    x: toDeg(fill.rotation.x),
    y: toDeg(fill.rotation.y),
    z: toDeg(fill.rotation.z),
  };
  const rotKey = fLight.addFolder("Key Rotation (deg)");
  const rotFill = fLight.addFolder("Fill Rotation (deg)");
  rotKey
    .add(rKey, "x", -180, 180, 1)
    .onChange((v: number) => (key.rotation.x = toRad(v)));
  rotKey
    .add(rKey, "y", -180, 180, 1)
    .onChange((v: number) => (key.rotation.y = toRad(v)));
  rotKey
    .add(rKey, "z", -180, 180, 1)
    .onChange((v: number) => (key.rotation.z = toRad(v)));
  rotFill
    .add(rFill, "x", -180, 180, 1)
    .onChange((v: number) => (fill.rotation.x = toRad(v)));
  rotFill
    .add(rFill, "y", -180, 180, 1)
    .onChange((v: number) => (fill.rotation.y = toRad(v)));
  rotFill
    .add(rFill, "z", -180, 180, 1)
    .onChange((v: number) => (fill.rotation.z = toRad(v)));

  // Rim target (aim)
  if (!rim.target.parent) {
    rim.target.position.set(0, 1, 0);
    scene.add(rim.target);
  }
  const tgt = {
    x: rim.target.position.x,
    y: rim.target.position.y,
    z: rim.target.position.z,
  };
  const rimTgt = fLight.addFolder("Rim Target");
  rimTgt.add(tgt, "x", -5, 5, 0.01).onChange((v: number) => {
    rim.target.position.x = v;
    rim.target.updateMatrixWorld();
    rimH.update();
  });
  rimTgt.add(tgt, "y", -5, 5, 0.01).onChange((v: number) => {
    rim.target.position.y = v;
    rim.target.updateMatrixWorld();
    rimH.update();
  });
  rimTgt.add(tgt, "z", -5, 5, 0.01).onChange((v: number) => {
    rim.target.position.z = v;
    rim.target.updateMatrixWorld();
    rimH.update();
  });

  // Visibility
  const vis = { key: true, fill: true, rim: true, hemi: true };
  const fv = fLight.addFolder("Visibility");
  fv.add(vis, "key").onChange((v: boolean) => (key.visible = v));
  fv.add(vis, "fill").onChange((v: boolean) => (fill.visible = v));
  fv.add(vis, "rim").onChange((v: boolean) => (rim.visible = v));
  fv.add(vis, "hemi").onChange((v: boolean) => (hemi.visible = v));
}
