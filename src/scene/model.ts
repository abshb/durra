// src/scene/model.ts
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export async function loadBottle(
  scene: THREE.Scene
): Promise<{ bottle: THREE.Object3D }> {
  const gltf = await new GLTFLoader().loadAsync(
    `${import.meta.env.BASE_URL}models/durra_bottle_hero.glb`
  );
  const bottle = gltf.scene;

  // Reset and apply offset
  bottle.position.set(0, 0, 0);

  // Normals & shadows
  bottle.traverse((obj: any) => {
    if (!obj.isMesh) return;
    if (!obj.geometry.attributes.normal) obj.geometry.computeVertexNormals();
    obj.castShadow = true;
    obj.receiveShadow = false;
  });

  scene.add(bottle);

  return { bottle };
}
