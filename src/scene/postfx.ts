import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  VignetteEffect,
} from "postprocessing";
import * as THREE from "three";
import type { Effects } from "./types";

export function createComposer(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): Effects {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new BloomEffect({
    intensity: 0.2,
    luminanceThreshold: 0.8,
    luminanceSmoothing: 0.25,
  });

  const vignette = new VignetteEffect({
    eskil: false,
    offset: 0.25,
    darkness: 0.6,
  });

  composer.addPass(new EffectPass(camera, bloom, vignette));
  return { composer, bloom, vignette };
}
