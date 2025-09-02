import * as THREE from "three";
import { RGBELoader } from "three-stdlib";

export async function loadEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const hdr = await new RGBELoader().loadAsync(
    `${import.meta.env.BASE_URL}hdr/royal_hall_2k.hdr`
  );
  const envMap = pmrem.fromEquirectangular(hdr).texture;

  scene.environment = envMap;
  scene.background = null;

  hdr.dispose();
  pmrem.dispose();
}
