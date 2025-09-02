import * as THREE from "three";

export function frameObject(
  object: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls: any,
  margin = 1.35
) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const fovY = THREE.MathUtils.degToRad(camera.fov);
  const fovX = 2 * Math.atan(Math.tan(fovY / 2) * camera.aspect);

  const distY = (size.y * 0.5) / Math.tan(fovY / 2);
  const distX = (size.x * 0.5) / Math.tan(fovX / 2);
  const dist = margin * Math.max(distX, distY);

  const dir = new THREE.Vector3()
    .subVectors(camera.position, controls.target)
    .normalize();
  camera.position.copy(center).addScaledVector(dir, dist);

  camera.near = Math.max(0.001, dist / 100);
  camera.far = dist * 50;
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.minDistance = dist * 0.2;
  controls.maxDistance = dist * 5;
  controls.update();
}
