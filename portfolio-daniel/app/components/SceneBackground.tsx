"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * One fixed canvas behind the whole document, one draw call.
 *
 * Every point has two homes: a spot on the hero orb (a sphere of points with a
 * thin orbit ring) and a spot in the terrain field that sits behind the rest
 * of the page. `uMorph` follows the scroll through the hero and walks each
 * point from the first home to the second — the ring peels off first, then the
 * sphere, while the points that were never part of the orb fade in where they
 * land. At the top of the page only the orb is visible.
 *
 * Scroll is written to a ref by the listener and read in the render loop, so
 * scrolling never goes through React state.
 */

const KIND_SPHERE = 0;
const KIND_RING = 1;
const KIND_FIELD = 2;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerAmp;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFade;
  uniform float uMorph;
  uniform mat4  uSphereMatrix;
  uniform mat4  uRingMatrix;

  attribute float aRand;
  attribute vec3  aOrb;
  attribute float aKind;

  varying float vT;
  varying float vHeight;
  varying float vFade;
  varying float vGlow;
  varying float vOrbAlpha;
  varying float vLat;
  varying float vSide;
  varying float vTwinkle;

  const float PULSE_PERIOD = 3.5;
  const vec2  PULSE_ORIGIN = vec2(6.0, -14.0);

  float terrain(vec2 p, float t) {
    float h  = sin(p.x * 0.18 + t * 0.16) * cos(p.y * 0.14 - t * 0.11) * 0.90;
    h += sin((p.x + p.y) * 0.09 - t * 0.08) * 0.55;
    h += sin(p.y * 0.33 + t * 0.19) * 0.20;
    return h;
  }

  void main() {
    bool isSphere = aKind < 0.5;
    bool isRing = aKind > 0.5 && aKind < 1.5;
    bool isOrb = aKind < 1.5;

    // ── where the point ends up: the terrain field ──────────
    vec3 field = position;
    vec2 cell = field.xz;
    float h = terrain(cell, uTime);

    // a slow swell following the cursor, never a splash
    float d = distance(cell, uPointer);
    float near = exp(-d * 0.22) * uPointerAmp;
    h += sin(d * 0.5 - uTime * 0.75) * exp(-d * 0.1) * 0.7 * uPointerAmp;

    // sonar ping: a ring rolls out across the field every few seconds and
    // lifts and lights the points it passes
    float phase = fract(uTime / PULSE_PERIOD);
    float band = distance(cell, PULSE_ORIGIN) - phase * 70.0;
    float ping = exp(-band * band * 0.35) * (1.0 - phase);
    h += ping * 0.3;
    field.y += h;

    // ── where it starts: on the orb ─────────────────────────
    mat4 orbMatrix = isRing ? uRingMatrix : uSphereMatrix;
    // field-only points have no orb position; normalize(0) would be NaN and
    // the NaN would survive the mix into their colour, hiding them for good
    vec3 n = isOrb ? normalize(aOrb) : vec3(0.0, 1.0, 0.0);
    vec3 local = aOrb;
    // the sphere's surface breathes in slow bands so it never looks static
    if (isSphere) {
      local += n * sin(n.y * 7.0 + uTime * 0.9) * sin(n.x * 5.0 - uTime * 0.6) * 0.07;
    }
    vec3 orb = (orbMatrix * vec4(local, 1.0)).xyz;
    vec3 nWorld = normalize(mat3(orbMatrix) * n);

    // field-only points rise into place from just below
    if (!isOrb) orb = field - vec3(0.0, 2.0, 0.0);

    // ── the morph: ring leaves first, then the sphere ───────
    float delay = isRing ? aRand * 0.3
                : isSphere ? 0.25 + aRand * 0.5
                : 0.35 + aRand * 0.45;
    float t = clamp((uMorph * 1.3 - delay) / 0.5, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 world = mix(orb, field, t);
    // orb points travel on an arc rather than a straight line
    if (isOrb) world.y += sin(t * 3.14159) * 1.6;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = -mv.z;

    vT = t;
    vHeight = clamp(h * 0.45 + 0.5, 0.0, 1.0);
    vGlow = clamp(ping * 0.45 + near * 0.9, 0.0, 1.0);
    vLat = n.y * 0.5 + 0.5;
    vSide = smoothstep(-26.0, 26.0, cell.x);
    vTwinkle = 0.75 + 0.25 * sin(uTime * (0.8 + aRand * 1.6) + aRand * 60.0);

    // back hemisphere stays faint, which is what makes it read as a volume
    float facing = smoothstep(-0.7, 0.6, normalize(mat3(viewMatrix) * nWorld).z);
    vOrbAlpha = isSphere ? mix(0.18, 1.0, facing) * 0.85
              : isRing ? 0.38
              : 0.0;

    // horizon fog, plus a short fade so dots never pop in at the camera
    vFade = smoothstep(95.0, 30.0, dist) * smoothstep(1.5, 6.0, dist) * uFade;

    float fieldSize = uSize * (0.6 + aRand * 0.75) * (1.0 + vHeight * 0.9 + vGlow * 1.1) * (16.0 / dist);
    float orbSize = 2.6 * (0.7 + aRand * 0.7) * (10.0 / dist);
    if (isRing) orbSize *= 0.75;
    gl_PointSize = uPixelRatio * mix(orbSize, fieldSize, t);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorMid;
  uniform vec3 uColorAlt;
  uniform vec3 uColorHot;
  uniform vec3 uOrbA;
  uniform vec3 uOrbB;

  varying float vT;
  varying float vHeight;
  varying float vFade;
  varying float vGlow;
  varying float vOrbAlpha;
  varying float vLat;
  varying float vSide;
  varying float vTwinkle;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d2 = dot(c, c);
    if (d2 > 0.25) discard;
    float mask = smoothstep(0.25, 0.015, d2);

    // field: crests go cyan on the left, violet on the right
    vec3 crest = mix(uColorMid, uColorAlt, vSide);
    vec3 fieldCol = mix(uColorLow, crest, smoothstep(0.25, 0.9, vHeight));
    fieldCol = mix(fieldCol, uColorHot, vGlow * 0.85);
    float fieldAlpha = ((0.6 + vHeight * 0.6) * vTwinkle + vGlow * 0.6) * vFade;

    // orb: violet at the south pole, cyan at the north
    vec3 orbCol = mix(uOrbA, uOrbB, vLat);
    float orbAlpha = vOrbAlpha;

    vec3 col = mix(orbCol, fieldCol, vT);
    float alpha = mix(orbAlpha, fieldAlpha, vT);
    gl_FragColor = vec4(col, mask * alpha);
  }
`;

function fibonacciSphere(count: number, radius: number, out: Float32Array, at: number[]) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  at.forEach((idx, i) => {
    const y = count > 1 ? 1 - (i / (count - 1)) * 2 : 0;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    out[idx * 3] = Math.cos(t) * r * radius;
    out[idx * 3 + 1] = y * radius;
    out[idx * 3 + 2] = Math.sin(t) * r * radius;
  });
}

function orbitRing(radius: number, out: Float32Array, at: number[]) {
  for (const idx of at) {
    const t = Math.random() * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * 0.18;
    out[idx * 3] = Math.cos(t) * r;
    out[idx * 3 + 1] = (Math.random() - 0.5) * 0.04;
    out[idx * 3 + 2] = Math.sin(t) * r;
  }
}

export default function SceneBackground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const heroVeilRef = useRef<HTMLDivElement>(null);
  const fieldVeilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL — the page still reads on its own
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearAlpha(0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    camera.position.set(0, 3.4, 12);
    scene.add(camera);

    // ── the orb's two frames, parented to the camera so it stays centred ──
    // tilt follows the cursor, spin is constant; the ring has its own tilt
    const orbTilt = new THREE.Object3D();
    const sphereSpin = new THREE.Object3D();
    const ringTilt = new THREE.Object3D();
    const ringSpin = new THREE.Object3D();
    ringTilt.rotation.set(1.34, 0, 0.18);
    ringTilt.add(ringSpin);
    orbTilt.add(sphereSpin, ringTilt);
    orbTilt.position.set(0, 0, -10);
    camera.add(orbTilt);

    // ── points ──────────────────────────────────────────────
    const narrow = window.innerWidth < 900;
    const spacing = narrow ? 0.78 : 0.56;
    const cols = Math.floor((narrow ? 56 : 76) / spacing);
    const rows = Math.floor(88 / spacing);
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let r = 0, i = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, i++) {
        // jitter inside the cell so the grid never reads as a moiré screen
        positions[i * 3] = (c - cols / 2) * spacing + (Math.random() - 0.5) * spacing * 0.45;
        positions[i * 3 + 2] = -r * spacing + 10 + (Math.random() - 0.5) * spacing * 0.45;
        rand[i] = Math.random();
      }
    }

    // a random subset of the field doubles as the orb
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = count - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const sphereCount = Math.min(narrow ? 2200 : 3600, count);
    const ringCount = Math.min(narrow ? 500 : 800, count - sphereCount);
    const sphereIdx = order.slice(0, sphereCount);
    const ringIdx = order.slice(sphereCount, sphereCount + ringCount);

    const orbPos = new Float32Array(count * 3);
    const kind = new Float32Array(count).fill(KIND_FIELD);
    fibonacciSphere(sphereCount, 2.5, orbPos, sphereIdx);
    orbitRing(3.5, orbPos, ringIdx);
    for (const i of sphereIdx) kind[i] = KIND_SPHERE;
    for (const i of ringIdx) kind[i] = KIND_RING;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    geometry.setAttribute("aOrb", new THREE.BufferAttribute(orbPos, 3));
    geometry.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, -8) },
      uPointerAmp: { value: 0 },
      uSize: { value: narrow ? 3.1 : 2.8 },
      uPixelRatio: { value: dpr },
      uFade: { value: 1 },
      uMorph: { value: 0 },
      // live references: three reads them at draw time, after the scene's
      // world matrices have been updated for this frame
      uSphereMatrix: { value: sphereSpin.matrixWorld },
      uRingMatrix: { value: ringSpin.matrixWorld },
      uColorLow: { value: new THREE.Color("#2b3f8f").convertSRGBToLinear() },
      uColorMid: { value: new THREE.Color("#22d3ee").convertSRGBToLinear() },
      uColorAlt: { value: new THREE.Color("#a78bfa").convertSRGBToLinear() },
      uColorHot: { value: new THREE.Color("#e8fbff").convertSRGBToLinear() },
      uOrbA: { value: new THREE.Color("#6d5dfc").convertSRGBToLinear() },
      uOrbB: { value: new THREE.Color("#22d3ee").convertSRGBToLinear() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    // the shader moves points between two layouts; bounds would only lie
    points.frustumCulled = false;
    scene.add(points);

    // ── scroll: written by the listener, read by the loop ────
    const scroll = { target: 0, eased: 0, hero: 0, heroEased: 0 };
    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.target = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      // 0 at the top, 1 once most of the hero has scrolled away
      scroll.hero = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        readScroll();
        ticking = false;
        // no render loop under reduced motion: jump straight to the new state
        if (reduced) {
          scroll.eased = scroll.target;
          scroll.heroEased = scroll.hero;
          place();
          renderer.render(scene, camera);
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── pointer ripple + parallax ────────────────────────────
    const ndc = new THREE.Vector2();
    const parallax = new THREE.Vector2();
    const parallaxTarget = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const pointerTarget = new THREE.Vector2(0, -8);
    let pointerAmpTarget = 0;

    function onPointerMove(e: PointerEvent) {
      ndc.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      parallaxTarget.set(ndc.x, ndc.y);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(ground, hit)) {
        pointerTarget.set(hit.x, hit.z);
        pointerAmpTarget = 1;
      }
    }
    function onPointerLeave() {
      pointerAmpTarget = 0;
      parallaxTarget.set(0, 0);
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // portrait screens get a smaller orb so it never overflows the sides
      orbTilt.scale.setScalar(Math.min(1, camera.aspect * 0.95));
      readScroll();
    }
    window.addEventListener("resize", resize);
    resize();
    scroll.eased = scroll.target;
    scroll.heroEased = scroll.hero;

    function place() {
      camera.position.x = parallax.x * 1.25;
      // drifts up over the page, so the horizon keeps changing as you read
      camera.position.y = 3.4 + scroll.eased * 2.4 + parallax.y * 0.6;
      camera.lookAt(0, 0.2, -8);
      // the orb leans toward the cursor
      orbTilt.rotation.x = -parallax.y * 0.35;
      orbTilt.rotation.y = parallax.x * 0.45;
      uniforms.uMorph.value = scroll.heroEased;
      // the veil follows the points: centred behind the orb, then back to
      // the field's own, which keeps the section copy on the left readable
      const m = scroll.heroEased.toFixed(3);
      if (heroVeilRef.current) heroVeilRef.current.style.opacity = String(1 - Number(m));
      if (fieldVeilRef.current) fieldVeilRef.current.style.opacity = m;
    }

    const timer = new THREE.Timer();
    timer.connect(document);
    let raf = 0;

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      timer.update(ts);
      const dt = Math.min(timer.getDelta(), 0.05);

      uniforms.uTime.value += dt;
      scroll.eased += (scroll.target - scroll.eased) * (1 - Math.pow(0.02, dt));
      scroll.heroEased += (scroll.hero - scroll.heroEased) * (1 - Math.pow(0.004, dt));

      uniforms.uPointer.value.lerp(pointerTarget, 1 - Math.pow(0.3, dt));
      uniforms.uPointerAmp.value +=
        (pointerAmpTarget - uniforms.uPointerAmp.value) * (1 - Math.pow(0.4, dt));
      uniforms.uFade.value = 1 - scroll.eased * 0.15;

      sphereSpin.rotation.y += dt * 0.12;
      ringSpin.rotation.y += dt * 0.03;

      parallax.lerp(parallaxTarget, 1 - Math.pow(0.35, dt));
      place();

      renderer.render(scene, camera);
    }

    function play() {
      if (!raf && document.visibilityState === "visible") {
        timer.reset();
        raf = requestAnimationFrame(frame);
      }
    }
    function pause() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function onVisibility() {
      if (document.visibilityState === "visible") play();
      else pause();
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      place();
      renderer.render(scene, camera);
    } else {
      play();
    }

    host.style.opacity = "1";

    return () => {
      pause();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      timer.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={hostRef}
        className="scene"
        aria-hidden
        style={{ opacity: 0, transition: "opacity 1.4s ease 0.2s" }}
      />
      <div ref={heroVeilRef} className="scene-veil scene-veil--hero" aria-hidden />
      <div ref={fieldVeilRef} className="scene-veil scene-veil--field" aria-hidden style={{ opacity: 0 }} />
    </>
  );
}
