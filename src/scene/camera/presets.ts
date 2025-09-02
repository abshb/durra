// src/scene/camera/presets.ts
import * as THREE from "three";
import type { App } from "../types";

export type CameraPreset = {
  fov: number;
  fill: number;
  yOffset: number;
  elevation: number;
};

const STORAGE_KEY = "durra_camera_preset_v1";

export const ProductPreset: CameraPreset = {
  fov: 28,
  fill: 0.45, // slightly zoomed out
  yOffset: 0.1,
  elevation: 8,
};

export function loadPreset(): CameraPreset {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...ProductPreset };
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.fov === "number" &&
      typeof parsed?.fill === "number" &&
      typeof parsed?.yOffset === "number" &&
      typeof parsed?.elevation === "number"
    ) {
      return parsed as CameraPreset;
    }
  } catch {
    // ignore parse errors, fall back to default
  }
  return { ...ProductPreset };
}

export function savePreset(p: CameraPreset) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  // notify listeners (Scene.ts listens to apply live)
  dispatchEvent(new CustomEvent("camera-preset-saved", { detail: p }));
}

function reframeObject(
  obj: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls: any,
  preset: CameraPreset
) {
  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  const height = Math.max(1e-6, box.max.y - box.min.y);

  controls.target.set(0, center.y + preset.yOffset, 0);

  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  const baseDist = height / (2 * preset.fill) / Math.tan(fovRad / 2);

  const elev = THREE.MathUtils.degToRad(preset.elevation);
  const y = controls.target.y + baseDist * Math.sin(elev);
  const z = baseDist * Math.cos(elev);

  camera.position.set(0, y, z);
  camera.lookAt(controls.target);
  camera.updateProjectionMatrix();
  controls.update();
}

// Public: apply a preset to the running app
export function applyPreset(app: App, preset: CameraPreset) {
  const { camera, controls, bottle } = app;
  if (!bottle) return;
  camera.fov = preset.fov;
  reframeObject(bottle, camera as THREE.PerspectiveCamera, controls, preset);
}
