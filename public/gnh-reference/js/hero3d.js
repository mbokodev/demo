/* Groupe Nouvel Horizon — hexagone 3D du hero (Three.js) */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const hero = document.querySelector('[data-hero3d]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

if (hero && !reduce && webglOK()) {
  try { init(); } catch (e) { hero.classList.remove('is-3d'); }
}

function init() {
  const canvas = hero.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x0A1633, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  /* ----- Arrière-plan : ciel, lever de lumière dorée et ligne d'horizon ----- */
  const bgUniforms = {
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uSun: { value: new THREE.Vector2(0.7, 0.42) },
    uRise: { value: 0 },
  };
  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      depthWrite: false,
      depthTest: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }`,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime, uAspect, uRise;
        uniform vec2 uSun;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
          vec3 deep = vec3(0.018, 0.038, 0.105);
          vec3 navy = vec3(0.042, 0.09, 0.21);
          vec3 gold = vec3(1.0, 0.56, 0.0);
          float h = uSun.y;
          vec3 col = mix(deep, navy, smoothstep(0.0, 0.9, uv.y));
          vec2 d = (uv - uSun) * vec2(uAspect, 1.0);
          float r = length(d);
          float above = smoothstep(h - 0.002, h + 0.002, uv.y);
          // lever de lumière (halo)
          float rise = uRise;
          float halo = exp(-r * 5.5) * 0.42 + exp(-r * 16.0) * 0.7;
          col += gold * halo * rise * mix(0.25, 1.0, above);
          // rayons très subtils
          float ang = atan(d.y, d.x);
          float rays = pow(0.5 + 0.5 * sin(ang * 18.0 + uTime * 0.05), 8.0) * exp(-r * 2.4) * above;
          col += gold * rays * 0.06 * rise;
          // ligne d'horizon lumineuse
          float dy = abs(uv.y - h);
          float fadeX = exp(-abs(d.x) * 2.8);
          float line = exp(-dy * 1400.0) * 1.6 + exp(-dy * 90.0) * 0.22;
          col += gold * line * (0.015 + 0.985 * fadeX) * (0.35 + 0.65 * rise);
          // sous l'horizon : reflet doux
          float refl = exp(-abs(d.x) * 2.2) * exp(-(h - uv.y) * 7.0) * (1.0 - above);
          col += gold * refl * 0.12 * rise;
          // arcs concentriques fins
          float ring = abs(fract(r * 4.5 - uTime * 0.015) - 0.5);
          col += gold * smoothstep(0.012, 0.0, ring) * 0.035 * above * exp(-r * 1.2) * rise;
          // vignette + grain
          float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(uAspect * 0.8, 1.0)));
          col *= mix(0.65, 1.0, vig);
          col += (hash(uv * 900.0 + uTime) - 0.5) * 0.012;
          gl_FragColor = vec4(col, 1.0);
        }`,
    })
  );
  bg.frustumCulled = false;
  bg.renderOrder = -10;
  scene.add(bg);

  /* ----- Hexagone : trois facettes (losanges) = trois divisions ----- */
  const R = 1.9;
  const V = [];
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 2 + k * Math.PI / 3;
    V.push(new THREE.Vector2(Math.cos(a) * R, Math.sin(a) * R));
  }
  const tints = [0x183a8c, 0x0b1d4a, 0x24489e];
  const facets = [];
  const group = new THREE.Group();
  const inner = new THREE.Group();
  group.add(inner);
  scene.add(group);

  const goldLine = new THREE.LineBasicMaterial({ color: 0xF2B21C, transparent: true, opacity: 0.95 });
  for (let k = 0; k < 3; k++) {
    const p0 = new THREE.Vector2(0, 0), p1 = V[(2 * k) % 6], p2 = V[(2 * k + 1) % 6], p3 = V[(2 * k + 2) % 6];
    const c = new THREE.Vector2().add(p0).add(p1).add(p2).add(p3).multiplyScalar(0.25);
    const shrink = (p) => p.clone().sub(c).multiplyScalar(0.955).add(c);
    const shape = new THREE.Shape([shrink(p0), shrink(p1), shrink(p2), shrink(p3)]);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3, curveSegments: 1 });
    geo.translate(0, 0, -0.275);
    const mat = new THREE.MeshPhysicalMaterial({
      color: tints[k], metalness: 0.25, roughness: 0.16,
      transmission: 0.38, thickness: 1.2, ior: 1.5,
      clearcoat: 1, clearcoatRoughness: 0.06,
      envMapIntensity: 1.25, attenuationColor: new THREE.Color(0x0A1633), attenuationDistance: 2.5,
      specularIntensity: 1,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), goldLine);
    const f = new THREE.Group();
    f.add(mesh); f.add(edges);
    f.userData.dir = new THREE.Vector3(c.x, c.y, 0).normalize();
    f.userData.spin = (k - 1) * 0.35;
    inner.add(f);
    facets.push(f);
  }
  // contour doré extérieur (anneau hexagonal fin)
  const ringPts = V.concat([V[0]]).map(p => new THREE.Vector3(p.x * 1.16, p.y * 1.16, 0));
  const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color: 0xF2A900, transparent: true, opacity: 0.22 }));
  inner.add(ring);

  // poussière lumineuse discrète
  const N = 140;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.3) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xF6D27A, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dust);

  // lumières
  scene.add(new THREE.AmbientLight(0x6f86c9, 0.35));
  const key = new THREE.DirectionalLight(0xffe2a0, 2.2); key.position.set(3, 2, 5); scene.add(key);
  const rim = new THREE.PointLight(0xF2A900, 30, 20, 2); rim.position.set(0, -2.2, -3); scene.add(rim);
  const fill = new THREE.DirectionalLight(0x8fb0ff, 0.6); fill.position.set(-4, 3, 2); scene.add(fill);

  /* ----- Mise en page selon le format ----- */
  let W = 1, H = 1, wide = true;
  const layout = () => {
    const r = hero.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    wide = camera.aspect > 1.05;
    const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const vw = vh * camera.aspect;
    let x, y, s;
    if (wide) { x = vw * 0.24; y = vh * 0.07; s = Math.min(1.05, vh / 8.2); }
    else { x = 0; y = vh * 0.22; s = Math.min(0.92, vw / 6.0); }
    if (hero.classList.contains("guar-3d")) { x = 0; y = 0; s = Math.min(1.05, vh / 6.0); }
    group.position.set(x, y, 0);
    group.scale.setScalar(s);
    camera.updateProjectionMatrix();
    // position du soleil en coordonnées écran
    const p = new THREE.Vector3(x, y - 2.15 * s, 0).project(camera);
    bgUniforms.uSun.value.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
    bgUniforms.uAspect.value = camera.aspect;
    rim.position.set(x, y - 2.4 * s, -3);
  };
  layout();
  let rT;
  const ro = new ResizeObserver(() => { clearTimeout(rT); rT = setTimeout(layout, 60); });
  ro.observe(hero);

  /* ----- Interactions : souris, toucher, gyroscope, défilement ----- */
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  let hover = 0, hoverT = 0, scrollP = 0;
  const near = (cx, cy) => {
    const p = group.position.clone().project(camera);
    const sx = (p.x * 0.5 + 0.5) * W, sy = (1 - (p.y * 0.5 + 0.5)) * H;
    const rad = Math.min(W, H) * 0.28;
    const r = hero.getBoundingClientRect();
    return Math.hypot(cx - r.left - sx, cy - r.top - sy) < rad;
  };
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    hoverT = near(e.clientX, e.clientY) ? 1 : 0;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { hoverT = 0; });
  hero.addEventListener('touchstart', (e) => { const t = e.touches[0]; hoverT = near(t.clientX, t.clientY) ? 1 : 0.4; }, { passive: true });
  hero.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    target.x = (t.clientX / window.innerWidth - 0.5) * 2;
    target.y = (t.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });
  hero.addEventListener('touchend', () => { hoverT = 0; }, { passive: true });

  let gyro = false;
  const onOrient = (e) => {
    if (e.gamma == null) return;
    gyro = true;
    target.x = Math.max(-1, Math.min(1, e.gamma / 30));
    target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
  };
  const DOE = window.DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission === 'function') {
    // iOS : la permission doit être demandée lors d'un geste de l'utilisateur
    const ask = () => {
      DOE.requestPermission().then((s) => { if (s === 'granted') window.addEventListener('deviceorientation', onOrient); }).catch(() => {});
      hero.removeEventListener('touchend', ask);
    };
    hero.addEventListener('touchend', ask, { once: true });
  } else if (DOE && 'ontouchstart' in window) {
    window.addEventListener('deviceorientation', onOrient);
  }

  const onScroll = () => {
    const r = hero.getBoundingClientRect();
    scrollP = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----- Boucle de rendu (en pause hors écran) ----- */
  const clock = new THREE.Clock();
  let raf = 0, visible = true, started = false, t0 = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (!t0) t0 = t;
    const intro = Math.min(1, (t - t0) / 2.6);
    const ease = 1 - Math.pow(1 - intro, 3);

    cur.x += (target.x - cur.x) * Math.min(1, dt * (gyro ? 3 : 2.4));
    cur.y += (target.y - cur.y) * Math.min(1, dt * (gyro ? 3 : 2.4));
    hover += (hoverT - hover) * Math.min(1, dt * 3);

    // séparation : intro (assemblage) + survol + défilement (se sépare puis se réassemble)
    const scrollSplit = Math.sin(Math.min(1, scrollP * 1.6) * Math.PI) * 0.55;
    const breathe = (Math.sin(t * 0.7) * 0.5 + 0.5) * 0.04;
    const split = (1 - ease) * 1.6 + hover * 0.34 + scrollSplit + breathe;
    facets.forEach((f) => {
      f.position.copy(f.userData.dir).multiplyScalar(split);
      f.position.z = Math.sin(split * 1.2) * f.userData.spin * 0.6;
      f.rotation.z = f.userData.spin * split * 0.18;
    });

    inner.rotation.y = t * 0.22 + cur.x * 0.45;
    inner.rotation.x = Math.sin(t * 0.35) * 0.12 + cur.y * 0.3 + 0.12;
    group.position.y += (Math.sin(t * 0.9) * 0.0016);
    group.rotation.z = Math.sin(t * 0.25) * 0.03;
    ring.rotation.z = -t * 0.05;

    dust.rotation.y = t * 0.01;
    dust.position.y = Math.sin(t * 0.2) * 0.1;

    bgUniforms.uTime.value = t;
    bgUniforms.uRise.value = 0.55 + 0.45 * ease + Math.sin(t * 0.4) * 0.03;

    renderer.render(scene, camera);
    if (!started) { started = true; hero.classList.add('is-3d'); }
  };
  const start = () => { if (!raf && visible && !document.hidden) { clock.getDelta(); raf = requestAnimationFrame(tick); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop(); hero.classList.remove('is-3d'); });
  start();
}
