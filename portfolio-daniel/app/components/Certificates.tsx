"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { certificates, type Certificate } from "@/lib/content";
import { IconArrow } from "./Icons";

/**
 * The certificates as a deck of 3D cards. Clicking the top card, the arrow
 * buttons, the arrow keys or a horizontal swipe shuffles it: the card flies
 * out to the side, and only once it is clear of the deck does it drop to the
 * back, so it never passes through the cards in front of it.
 */

const FLY_MS = 380;
const SWIPE_PX = 70;
const MAX_TILT = 7;

/* the Python mark's path, split into its two snakes so each gets its colour */
const PY_TOP = "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z";
const PY_BOTTOM = "M21.04 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z";

function PythonMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="cert-logo">
      <path d={PY_TOP} fill="#4b8bbe" />
      <path d={PY_BOTTOM} fill="#ffd43b" />
    </svg>
  );
}

/* the Java mark (Devicon), in Java's own blue and orange */
const JAVA_CUP = "M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z";
const JAVA_STEAM = "M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z";

function JavaMark() {
  return (
    <svg viewBox="0 0 128 128" aria-hidden className="cert-logo">
      <path d={JAVA_CUP} fill="#5382a1" />
      <path d={JAVA_STEAM} fill="#e76f00" />
    </svg>
  );
}

function Card({
  cert,
  depth,
  leaving,
  cardRef,
}: {
  cert: Certificate;
  depth: number;
  leaving: boolean;
  cardRef?: React.Ref<HTMLElement>;
}) {
  return (
    <article
      ref={cardRef}
      className="cert-card"
      data-lang={cert.lang}
      data-top={depth === 0 || undefined}
      data-leaving={leaving || undefined}
      style={{ "--i": depth } as React.CSSProperties}
      aria-hidden={depth !== 0}
    >
      {cert.lang === "python" ? <PythonMark /> : <JavaMark />}

      <p className="cert-issuer mono">{cert.issuer}</p>

      <div className="cert-title">
        <h3>{cert.course}</h3>
        <p>{cert.series}</p>
      </div>

      <footer className="cert-foot">
        <span className="cert-code mono">#{cert.code}</span>
        <a
          href={cert.href}
          target="_blank"
          rel="noreferrer noopener"
          className="cert-verify mono"
          tabIndex={depth === 0 ? 0 : -1}
          // the link opens the certificate; it must not also shuffle the deck
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          verify
          <IconArrow width={13} height={13} />
        </a>
      </footer>
    </article>
  );
}

export default function Certificates() {
  const [order, setOrder] = useState(() => certificates.map((_, i) => i));
  const [leaving, setLeaving] = useState<number | null>(null);
  const topRef = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; dx: number; id: number } | null>(null);
  const busy = useRef(false);

  function next() {
    if (busy.current) return;
    busy.current = true;
    setLeaving(order[0]);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(null);
      busy.current = false;
    }, FLY_MS);
  }

  function prev() {
    if (busy.current) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }

  // top-card tilt and sheen, written straight to the style object
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = topRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    if (drag.current && drag.current.id === e.pointerId) {
      drag.current.dx = e.clientX - drag.current.x;
      el.style.setProperty("--drag", `${drag.current.dx}px`);
    }
    if (e.pointerType !== "mouse") return;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--ry", `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`);
  }

  function resetTilt() {
    const el = topRef.current;
    if (!el) return;
    for (const [k, v] of [["--rx", "0deg"], ["--ry", "0deg"], ["--mx", "50%"], ["--my", "0%"]]) {
      el.style.setProperty(k, v);
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, dx: 0, id: e.pointerId };
    // keep receiving moves while the drag leaves the deck
    e.currentTarget.setPointerCapture(e.pointerId);
    topRef.current?.setAttribute("data-dragging", "");
  }

  function endDrag() {
    const d = drag.current;
    drag.current = null;
    const el = topRef.current;
    el?.removeAttribute("data-dragging");
    el?.style.setProperty("--drag", "0px");
    if (!d) return;
    // barely moved = a click; a swipe left shuffles forward, a swipe right
    // brings the previous card back; anything in between just snaps back
    if (d.dx > SWIPE_PX) prev();
    else if (d.dx < -SWIPE_PX || Math.abs(d.dx) < 6) next();
  }

  // the tilt belongs to whichever card is on top; clear it when that changes
  useEffect(resetTilt, [order]);

  return (
    <section id="certificates" className="section shell">
      <div className="cert-layout">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Courses</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="h2">Certificates</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede mt-6 max-w-[38ch]">
              Three University of Helsinki MOOCs, two in Python and one in
              Java. Each card links to the certificate on the issuer&apos;s
              own site.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="cert-controls">
              <button type="button" className="cert-btn" onClick={prev} aria-label="Previous certificate">
                <IconArrow width={16} height={16} style={{ transform: "rotate(-135deg)" }} />
              </button>
              <span className="mono" aria-live="polite">
                {order[0] + 1} / {certificates.length}
              </span>
              <button type="button" className="cert-btn" onClick={next} aria-label="Next certificate">
                <IconArrow width={16} height={16} style={{ transform: "rotate(45deg)" }} />
              </button>
              <span className="hover-hint mono text-[0.9rem] text-text-muted">
                click or drag the card
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="cert-deck"
            role="group"
            aria-roledescription="carousel"
            aria-label="Certificates"
            tabIndex={0}
            onKeyDown={(e) => {
              // keys pressed on the verify link are the link's own business
              if (e.target !== e.currentTarget) return;
              if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                next();
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prev();
              }
            }}
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
            onPointerDown={onPointerDown}
            onPointerUp={endDrag}
            onPointerCancel={() => {
              drag.current = null;
              topRef.current?.removeAttribute("data-dragging");
              topRef.current?.style.setProperty("--drag", "0px");
            }}
          >
            {order.map((certIndex, depth) => (
              <Card
                key={certificates[certIndex].code}
                cert={certificates[certIndex]}
                depth={depth}
                leaving={leaving === certIndex}
                cardRef={depth === 0 ? topRef : undefined}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
