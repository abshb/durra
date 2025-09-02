import type * as THREE from "three";
import { OrbitControls } from "three-stdlib";

export function createControls(
  camera: THREE.PerspectiveCamera,
  dom: HTMLCanvasElement
) {
  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 0.2;
  controls.maxDistance = 12.0;
  controls.target.set(0, 1.0, 0);
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 0.6;
  controls.update();
  return controls;
}
