import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import type {
  EffectComposer,
  BloomEffect,
  VignetteEffect,
} from "postprocessing";

export type Lights = {
  key: THREE.RectAreaLight;
  fill: THREE.RectAreaLight;
  rim: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
};

export type Effects = {
  composer: EffectComposer;
  bloom: BloomEffect;
  vignette: VignetteEffect;
};

export type Materials = {
  glassMat?: THREE.MeshPhysicalMaterial | null;
  metalMat?: THREE.MeshPhysicalMaterial | null;
};

export type App = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  lights: Lights;
  effects: Effects;
  bottle?: THREE.Object3D;
  materials: Materials;
};
