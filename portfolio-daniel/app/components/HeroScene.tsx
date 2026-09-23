"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Conway's Life, but as relief instead of blinking pixels: every cell is a tile
 * on a lit 3D field, and living ones rise and warm up. Generations are slow and
 * each cell eases between them, so the surface breathes rather than flickers.
 *
 * Only two floats per instance change each frame (the y scale and y offset),
 * written straight into the instanceMatrix buffer, so a few thousand tiles cost
 * almost nothing.
 */

const COLS = 140;
const ROWS = 70;
const SPACING = 0.32;
const TILE = 0.22;
const RISE = 0.62;
const FLOOR = 0.03;

const GEN_MS = 1500; // one generation
const EASE = 3.2; // how fast a cell reaches its new height, per second

const DENSITY = 0.3;
const MAX_AGE = 10;

/** Dead slate → deep blue → accent cyan, so age reads as temperature. */
const RAMP: [number, number, number][] = [
  [0.055, 0.085, 0.125],
  [0.09, 0.22, 0.42],
  [0.1, 0.55, 0.78],
  [0.10, 0.60, 0.72],
];

function ramp(t: number, out: THREE.Color) {
  const n = RAMP.length - 1;
  const i = Math.min(Math.floor(t * n), n - 1);
  const f = t * n - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return out.setRGB(
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
    THREE.SRGBColorSpace
  );
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // no WebGL — the hero still reads without it
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearAlpha(0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x04060a, 10, 26);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 8.5, 15);

    // ── lights: one cool key for form, one cyan rim so the risen tiles read ──
    scene.add(new THREE.AmbientLight(0x1a2536, 0.85));

    const key = new THREE.DirectionalLight(0xc8dcff, 1.05);
    key.position.set(-8, 12, 9);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x22d3ee, 0.65);
    rim.position.set(9, 4, -8);
    scene.add(rim);

    // ── the field ────────────────────────────────────────────
    const count = COLS * ROWS;
    const geometry = new THREE.BoxGeometry(TILE, 1, TILE);
    geometry.translate(0, 0.5, 0); // pivot at the base, so scaling grows upward

    const material = new THREE.MeshStandardMaterial({
      roughness: 0.55,
      metalness: 0.15,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // lay out the grid once; from here only the y scale ever changes
    const m = new THREE.Matrix4();
    for (let r = 0, i = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++, i++) {
        m.makeTranslation(
          (c - COLS / 2) * SPACING,
          0,
          (r - ROWS / 2) * SPACING - 2
        );
        mesh.setMatrixAt(i, m);
      }
    }
    const mat = mesh.instanceMatrix.array as Float32Array;

    const colour = new THREE.Color();
    for (let i = 0; i < count; i++) mesh.setColorAt(i, ramp(0, colour));
    const col = mesh.instanceColor!.array as Float32Array;

    // ── Life state ───────────────────────────────────────────
    let cur = new Uint8Array(count);
    let next = new Uint8Array(count);
    let age = new Uint8Array(count);
    let nextAge = new Uint8Array(count);
    const height = new Float32Array(count); // eased, what you actually see
    const target = new Float32Array(count);

    function seed() {
      for (let i = 0; i < count; i++) {
        cur[i] = Math.random() < DENSITY ? 1 : 0;
        age[i] = 0;
      }
    }

    function generation() {
      next.fill(0);
      nextAge.fill(0);
      let alive = 0;

      for (let r = 0; r < ROWS; r++) {
        const up = ((r - 1 + ROWS) % ROWS) * COLS;
        const mid = r * COLS;
        const down = ((r + 1) % ROWS) * COLS;

        for (let c = 0; c < COLS; c++) {
          const l = (c - 1 + COLS) % COLS;
          const rr = (c + 1) % COLS;

          const n =
            cur[up + l] + cur[up + c] + cur[up + rr] +
            cur[mid + l] + cur[mid + rr] +
            cur[down + l] + cur[down + c] + cur[down + rr];

          const i = mid + c;
          if (cur[i] ? n === 2 || n === 3 : n === 3) {
            next[i] = 1;
            nextAge[i] = cur[i] ? Math.min(age[i] + 1, MAX_AGE) : 0;
            alive++;
          }
        }
      }

      [cur, next] = [next, cur];
      [age, nextAge] = [nextAge, age];

      // a board that has burnt out is just a flat plane — reseed it
      if (alive < count * 0.03) seed();

      for (let i = 0; i < count; i++) {
        target[i] = cur[i] ? FLOOR + RISE * (0.45 + (age[i] / MAX_AGE) * 0.55) : FLOOR;
      }
    }

    function paint() {
      for (let i = 0; i < count; i++) {
        const h = height[i];
        mat[i * 16 + 5] = h; // y scale
        ramp(cur[i] ? 0.35 + (age[i] / MAX_AGE) * 0.65 : 0, colour);
        col[i * 3] = colour.r;
        col[i * 3 + 1] = colour.g;
        col[i * 3 + 2] = colour.b;
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor!.needsUpdate = true;
    }

    seed();
    generation();
    height.set(target);
    paint();

    // ── gentle pointer parallax ──────────────────────────────
    const parallax = new THREE.Vector2();
    const parallaxTarget = new THREE.Vector2();

    function onPointerMove(e: PointerEvent) {
      const r = host!.getBoundingClientRect();
      parallaxTarget.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      );
    }
    function onPointerLeave() {
      parallaxTarget.set(0, 0);
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

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

    // ── loop, idle whenever the hero is off-screen or the tab is hidden ──
    const timer = new THREE.Timer();
    timer.connect(document);
    let raf = 0;
    let onScreen = true;
    let sinceGen = 0;

    function frame(ts: number) {
      raf = requestAnimationFrame(frame);
      timer.update(ts);
      const dt = Math.min(timer.getDelta(), 0.05);

      sinceGen += dt * 1000;
      if (sinceGen >= GEN_MS) {
        sinceGen = 0;
        generation();
      }

      const k = 1 - Math.exp(-EASE * dt);
      for (let i = 0; i < count; i++) height[i] += (target[i] - height[i]) * k;
      paint();

      parallax.lerp(parallaxTarget, 1 - Math.pow(0.35, dt));
      camera.position.x = parallax.x * 1.4;
      camera.position.y = 8.5 + parallax.y * 0.6;
      camera.lookAt(0, 0, -4);

      renderer.render(scene, camera);
    }

    function play() {
      if (!raf && onScreen && document.visibilityState === "visible") {
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
        onScreen = entry.isIntersecting;
        if (onScreen) play();
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
      camera.lookAt(0, 0, -4);
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
      style={{ opacity: 0, transition: "opacity 1.6s ease 0.25s" }}
    />
  );
}
