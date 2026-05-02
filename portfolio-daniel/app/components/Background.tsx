"use client"

import { useEffect, useRef } from "react"

const CELL = 8
const TICK_MS = 50     // 20fps game speedwoeifufuh
const DENSITY = 0.16
const MAX_AGE = 28
const RESPAWN_THRESHOLD = 0.025

// gray-blue → primary blue → accent cyan/teal
const STOPS: [number, number, number][] = [
  [51,  65,  85],   // slate-700
  [37,  99, 235],   // primary blue
  [6,  182, 212],   // cyan-500
  [20, 184, 166],   // teal-400
]

function lerp(t: number): [number, number, number] {
  const n = STOPS.length - 1
  const si = Math.min(Math.floor(t * n), n - 1)
  const f = t * n - si
  const [r1, g1, b1] = STOPS[si]
  const [r2, g2, b2] = STOPS[si + 1]
  return [r1 + (r2 - r1) * f | 0, g1 + (g2 - g1) * f | 0, b1 + (b2 - b1) * f | 0]
}

// precompute color strings for all possible ages
const COLOR_TABLE = Array.from({ length: MAX_AGE + 1 }, (_, age) => {
  const t = age / MAX_AGE
  const [r, g, b] = lerp(t)
  const a = (0.06 + t * 0.22).toFixed(3)
  return `rgba(${r},${g},${b},${a})`
})

interface BackgroundProps {
  color?: string
  quantity?: number
  size?: number
  staticity?: number
}

export default function Background({
  color,
  quantity = DENSITY,
  size = CELL,
  staticity,
}: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const cellSize = size
    const density = quantity
    const tickMs = staticity != null ? staticity : TICK_MS

    let cols = 0, rows = 0
    let cur: Uint8Array, nxt: Uint8Array
    let ages: Uint8Array, nxtAges: Uint8Array
    let raf: number
    let lastTick = 0

    function init() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.ceil(canvas.width / cellSize)
      rows = Math.ceil(canvas.height / cellSize)
      const n = cols * rows
      cur      = new Uint8Array(n)
      nxt      = new Uint8Array(n)
      ages     = new Uint8Array(n)
      nxtAges  = new Uint8Array(n)
      for (let i = 0; i < n; i++) cur[i] = Math.random() < density ? 1 : 0
    }

    function step() {
      nxt.fill(0)
      nxtAges.fill(0)
      let alive = 0

      for (let y = 0; y < rows; y++) {
        const ym = ((y - 1 + rows) % rows) * cols
        const yc = y * cols
        const yp = ((y + 1) % rows) * cols

        for (let x = 0; x < cols; x++) {
          const xm = (x - 1 + cols) % cols
          const xp = (x + 1) % cols

          const n =
            cur[ym + xm] + cur[ym + x] + cur[ym + xp] +
            cur[yc + xm] +               cur[yc + xp] +
            cur[yp + xm] + cur[yp + x] + cur[yp + xp]

          const i = yc + x
          if (cur[i]) {
            if (n === 2 || n === 3) {
              nxt[i] = 1
              nxtAges[i] = Math.min(ages[i] + 1, MAX_AGE)
              alive++
            }
          } else if (n === 3) {
            nxt[i] = 1
            alive++
          }
        }
      }

      const tmp = cur;    cur = nxt;         nxt = tmp
      const tmp2 = ages;  ages = nxtAges;    nxtAges = tmp2

      if (alive < cur.length * RESPAWN_THRESHOLD) init()
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let y = 0; y < rows; y++) {
        const yc = y * cols
        for (let x = 0; x < cols; x++) {
          const i = yc + x
          if (cur[i]) {
            ctx.fillStyle = color ?? COLOR_TABLE[ages[i]]
            ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1)
          }
        }
      }
    }

    function loop(ts: number) {
      raf = requestAnimationFrame(loop)
      if (ts - lastTick >= tickMs) {
        lastTick = ts
        step()
        draw()
      }
    }

    init()
    draw()
    requestAnimationFrame(loop)
    window.addEventListener("resize", init)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
