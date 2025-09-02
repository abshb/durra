// src/scene/Scene.ts
import * as THREE from "three";
import { createRenderer } from "./renderer";
import { loadEnvironment } from "./environment";
import { createLights } from "./lights";
import { createControls } from "./controls";
import { loadBottle } from "./model";
import { createComposer } from "./postfx";
import { setupDebugUI } from "./gui/index";
import type { App } from "./types";
import { loadPreset, applyPreset } from "./camera/presets";

export async function initScene({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): Promise<App> {
  const renderer = createRenderer(canvas);

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x281e15);
  scene.background = null;
  // Telephoto feel for product shots (value may be overridden by preset)

  const camera = new THREE.PerspectiveCamera(
    28,
    innerWidth / innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.3, 3);

  await loadEnvironment(renderer, scene);

  const lights = createLights(scene);

  // Load model (keeps Blender materials)
  const { bottle } = await loadBottle(scene);
  bottle.rotation.y = Math.PI;

  const effects = createComposer(renderer, scene, camera);
  renderer.setClearAlpha(0);
  const controls = createControls(camera, renderer.domElement);

  const materials = { glassMat: null, metalMat: null } as const;

  // Compose App object once so we can pass it around cleanly
  const app: App = {
    renderer,
    scene,
    camera,
    controls,
    lights,
    effects,
    bottle,
    materials,
  };

  // Apply saved (or default) preset at startup
  applyPreset(app, loadPreset());

  // Maintain composition on resize (and re-apply current preset)
  addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    effects.composer.setSize(innerWidth, innerHeight);
    applyPreset(app, loadPreset());
  });

  // Live-apply when GUI saves a preset (no refresh needed)
  addEventListener("camera-preset-saved", (e: any) => {
    applyPreset(app, e.detail);
  });

  // Optional GUI (only if ?debug)
  if (new URLSearchParams(location.search).has("debug")) {
    setupDebugUI({
      renderer,
      scene,
      camera,
      controls,
      lights,
      effects,
      bottle,
      materials,
    });
  }

  // Loop
  const render = () => {
    controls.update();
    effects.composer.render();
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  return app;
}
