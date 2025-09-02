// lights.ts — unchanged except: add a target for rim so GUI can aim it
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three-stdlib";
import type { Lights } from "./types";

export function createLights(scene: THREE.Scene): Lights {
  RectAreaLightUniformsLib.init();

  const key = new THREE.RectAreaLight(0xfff2d6, 35, 3.2, 2.0);
  key.name = "keyLight";
  key.position.set(2.2, 2.8, 1.6);
  key.lookAt(0, 1.0, 0);
  scene.add(key);

  const fill = new THREE.RectAreaLight(0xf5e9d1, 8, 2.4, 1.6);
  fill.name = "fillLight";
  fill.position.set(0.6, 1.6, 2.8);
  fill.lookAt(0, 1.0, 0);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 1.15);
  rim.name = "rimLight";
  rim.position.set(-2.4, 2.8, -2.0);
  // make target adjustable via GUI
  if (!rim.target.parent) {
    rim.target.position.set(0, 1, 0);
    scene.add(rim.target);
  }
  scene.add(rim);

  const hemi = new THREE.HemisphereLight(0xfff7ea, 0x140d08, 0.25);
  hemi.name = "hemi";
  scene.add(hemi);

  return { key, fill, rim, hemi };
}
