"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * One fixed canvas behind the whole document: a grid of points displaced in the
 * vertex shader, with a swell that trails the cursor. Single draw call, and the
 * CPU only writes a handful of uniforms per frame.
 *
 * Scroll is written to a ref by the listener and read in the render loop, so
 * scrolling never goes through React state.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerAmp;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uFade;

  attribute float aRand;

  varying float vHeight;
  varying float vFade;

  float terrain(vec2 p, float t) {
    float h  = sin(p.x * 0.18 + t * 0.16) * cos(p.y * 0.14 - t * 0.11) * 0.90;
    h += sin((p.x + p.y) * 0.09 - t * 0.08) * 0.55;
    h += sin(p.y * 0.33 + t * 0.19) * 0.20;
    return h;
  }

  void main() {
    vec3 pos = position;
    vec2 cell = pos.xz;

    float h = terrain(cell, uTime);

    // a slow swell following the cursor, never a splash
    float d = distance(cell, uPointer);
    h += sin(d * 0.5 - uTime * 0.75) * exp(-d * 0.1) * 0.7 * uPointerAmp;

    pos.y += h;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    vHeight = clamp(h * 0.45 + 0.5, 0.0, 1.0);

    // horizon fog, plus a short fade so dots never pop in at the camera
    vFade = smoothstep(62.0, 22.0, dist) * smoothstep(2.0, 8.0, dist) * uFade;

    gl_PointSize =
      uSize * uPixelRatio * (0.6 + aRand * 0.75) * (1.0 + vHeight * 0.9) * (16.0 / dist);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;

  varying float vHeight;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d2 = dot(c, c);
    if (d2 > 0.25) discard;

    float mask = smoothstep(0.25, 0.015, d2);
    vec3 col = mix(uColorLow, uColorHigh, smoothstep(0.3, 0.96, vHeight));

    gl_FragColor = vec4(col, mask * vFade * (0.34 + vHeight * 0.66));
  }
`;

export default function SceneBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

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

    const narrow = window.innerWidth < 900;
    const spacing = narrow ? 0.78 : 0.56;
    const cols = Math.floor((narrow ? 56 : 76) / spacing);
    const rows = Math.floor(58 / spacing);
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

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    // the vertex shader moves points well outside their authored bounds
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -16), 80);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, -8) },
      uPointerAmp: { value: 0 },
      uSize: { value: narrow ? 2.8 : 2.45 },
      uPixelRatio: { value: dpr },
      uFade: { value: 1 },
      uColorLow: { value: new THREE.Color("#27507f").convertSRGBToLinear() },
      uColorHigh: { value: new THREE.Color("#22d3ee").convertSRGBToLinear() },
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

    scene.add(new THREE.Points(geometry, material));

    // ── scroll: written by the listener, read by the loop ────
    const scroll = { target: 0, eased: 0 };
    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.target = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        readScroll();
        ticking = false;
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
      readScroll();
    }
    window.addEventListener("resize", resize);
    resize();
    scroll.eased = scroll.target;

    const timer = new THREE.Timer();
    timer.connect(document);
    let raf = 0;

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      timer.update(ts);
      const dt = Math.min(timer.getDelta(), 0.05);

      uniforms.uTime.value += dt;
      scroll.eased += (scroll.target - scroll.eased) * (1 - Math.pow(0.02, dt));

      uniforms.uPointer.value.lerp(pointerTarget, 1 - Math.pow(0.3, dt));
      uniforms.uPointerAmp.value +=
        (pointerAmpTarget - uniforms.uPointerAmp.value) * (1 - Math.pow(0.4, dt));
      // the field is the hero's subject; past it, it settles back to texture
      uniforms.uFade.value = 1 - scroll.eased * 0.45;

      parallax.lerp(parallaxTarget, 1 - Math.pow(0.35, dt));
      camera.position.x = parallax.x * 1.25;
      // drifts up over the page, so the horizon keeps changing as you read
      camera.position.y = 3.4 + scroll.eased * 2.4 + parallax.y * 0.6;
      camera.lookAt(0, 0.2, -8);

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
      camera.lookAt(0, 0.2, -8);
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
      <div className="scene-veil" aria-hidden />
    </>
  );
}
