"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A GPU-driven point field: a flat grid of dots whose height is displaced by a
 * sum of sines, with a radar ripple that chases the cursor. Everything happens
 * in the vertex shader, so the whole thing is a single draw call and the CPU
 * only ever writes three uniforms per frame.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uPointerAmp;
  uniform float uSize;
  uniform float uPixelRatio;

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

    // ripple emanating from where the cursor meets the ground plane — a slow
    // swell rather than a splash, so it never snaps at you unannounced
    float d = distance(cell, uPointer);
    h += sin(d * 0.5 - uTime * 0.75) * exp(-d * 0.1) * 0.7 * uPointerAmp;

    pos.y += h;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    vHeight = clamp(h * 0.45 + 0.5, 0.0, 1.0);

    // depth fog at the horizon, plus a short fade so dots don't pop at the camera
    vFade = smoothstep(62.0, 22.0, dist) * smoothstep(2.0, 8.0, dist);

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

export default function HeroField() {
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
      return; // no WebGL — the section still reads fine without it
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearAlpha(0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    camera.position.set(0, 3.4, 12);

    // ── build the grid ──────────────────────────────────────
    const narrow = window.innerWidth < 900;
    const spacing = narrow ? 0.78 : 0.56;
    const width = narrow ? 56 : 72;
    const depth = 58;
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(depth / spacing);
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);

    for (let r = 0, i = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++, i++) {
        // jitter each dot inside its cell so the grid never reads as a moiré screen
        positions[i * 3] = (c - cols / 2) * spacing + (Math.random() - 0.5) * spacing * 0.45;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = -r * spacing + 10 + (Math.random() - 0.5) * spacing * 0.45;
        rand[i] = Math.random();
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    // the vertex shader moves points far outside their authored bounds
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -16), 80);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, -8) },
      uPointerAmp: { value: 0 },
      uSize: { value: narrow ? 2.8 : 2.45 },
      uPixelRatio: { value: dpr },
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

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── pointer tracking ────────────────────────────────────
    const ndc = new THREE.Vector2(0, 0);
    const parallax = new THREE.Vector2(0, 0);
    const targetParallax = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const pointerTarget = new THREE.Vector2(0, -8);
    let pointerAmpTarget = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      targetParallax.set(ndc.x, ndc.y);

      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(ground, hit)) {
        pointerTarget.set(hit.x, hit.z);
        pointerAmpTarget = 1;
      }
    }
    function onPointerLeave() {
      pointerAmpTarget = 0;
      targetParallax.set(0, 0);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    // ── sizing ──────────────────────────────────────────────
    function resize() {
      const { clientWidth: w, clientHeight: h } = host!;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ── loop, paused whenever the hero is off-screen or the tab is hidden ──
    const timer = new THREE.Timer();
    timer.connect(document); // resets the delta after a hidden tab comes back
    let raf = 0;
    let visible = true;

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      timer.update(ts);
      const dt = Math.min(timer.getDelta(), 0.05);
      uniforms.uTime.value += dt;

      // each base is "fraction still remaining after one second" — the ripple
      // trails the cursor by about a second instead of tracking it exactly
      uniforms.uPointer.value.lerp(pointerTarget, 1 - Math.pow(0.3, dt));
      uniforms.uPointerAmp.value +=
        (pointerAmpTarget - uniforms.uPointerAmp.value) * (1 - Math.pow(0.4, dt));

      parallax.lerp(targetParallax, 1 - Math.pow(0.35, dt));
      camera.position.x = parallax.x * 1.25;
      camera.position.y = 3.4 + parallax.y * 0.6;
      camera.lookAt(0, 0.2, -8);

      renderer.render(scene, camera);
    }

    function play() {
      if (!raf && visible && document.visibilityState === "visible") {
        timer.reset();
        raf = requestAnimationFrame(frame);
      }
    }
    function pause() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      },
      { threshold: 0 }
    );
    io.observe(host);

    function onVisibility() {
      if (document.visibilityState === "visible") play();
      else pause();
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      // one static frame: the composition, none of the motion
      uniforms.uTime.value = 1.2;
      renderer.render(scene, camera);
    } else {
      play();
    }

    host.style.opacity = "1";

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
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
    <div
      ref={hostRef}
      className="hero-canvas"
      aria-hidden
      style={{ opacity: 0, transition: "opacity 2s ease 0.3s" }}
    />
  );
}
