import * as THREE from "three";

export function makeStreaksTexture(
  renderer: THREE.WebGLRenderer,
  w = 1024,
  h = 1024,
  bands = 5
) {
  const cvs = document.createElement("canvas");
  cvs.width = w;
  cvs.height = h;
  const ctx = cvs.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < bands; i++) {
    const y = (i + 1) * (h / (bands + 1));
    const g = ctx.createLinearGradient(0, y - h * 0.12, 0, y + h * 0.12);
    g.addColorStop(0.0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, "rgba(255,224,190,0.18)");
    g.addColorStop(1.0, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, y - h * 0.12, w, h * 0.24);
  }
  const tex = new THREE.CanvasTexture(cvs);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export function createStreaks(renderer: THREE.WebGLRenderer) {
  const texture = makeStreaksTexture(renderer);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.9,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), material);
  mesh.position.set(0, 1.2, -2.9);
  mesh.rotation.z = THREE.MathUtils.degToRad(-18);
  return { mesh, material };
}
