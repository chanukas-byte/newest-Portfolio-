"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type Props = {
  alt: string;
  /** classes for both image layers (fit / position) */
  imgClass?: string;
  /** CSS filter on the base photo (e.g. grayscale) */
  baseFilter?: string;
  /** CSS filter on the photo revealed inside the lens */
  lensFilter?: string;
  radius?: number;
  /** degrees of 3D tilt toward the cursor */
  tilt?: number;
  sizes?: string;
};

/**
 * Portrait with a Lando-style cursor lens: a different version of the photo is
 * revealed inside a circle that trails the pointer (GSAP quickTo), the photo tilts
 * and shifts toward the cursor, and two rings follow at different speeds.
 */
export default function HeroFace({
  alt,
  imgClass = "object-contain object-bottom",
  baseFilter,
  lensFilter = "grayscale(1) contrast(1.1) brightness(1.15) sepia(0.85) hue-rotate(40deg) saturate(3.2)",
  radius = 190,
  tilt = 6,
  sizes = "(min-width: 900px) 900px, 96vw",
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const ring2 = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const fast = useRef({ x: 0, y: 0, r: 0 });
  const slow = useRef({ x: 0, y: 0 });
  const started = useRef(false);

  const paint = () => {
    const { x, y, r } = fast.current;
    const el = lens.current;
    if (!el) return;
    const mask = `radial-gradient(circle ${r}px at ${x}px ${y}px, #000 97%, transparent 100%)`;
    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;
    const on = r > 6 ? 1 : 0;
    gsap.set(ring.current, { x: x - r, y: y - r, width: r * 2, height: r * 2, opacity: on });
    const r2 = r * 1.18;
    gsap.set(ring2.current, { x: slow.current.x - r2, y: slow.current.y - r2, width: r2 * 2, height: r2 * 2, opacity: on * 0.6 });
    if (label.current) gsap.set(label.current, { x: x + r * 0.72, y: y - r * 0.9, opacity: on });
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rect = box.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nx = px / rect.width - 0.5;
    const ny = py / rect.height - 0.5;

    if (!started.current) {
      started.current = true;
      fast.current.x = slow.current.x = px;
      fast.current.y = slow.current.y = py;
    }
    gsap.to(fast.current, { x: px, y: py, duration: 0.3, ease: "power3", overwrite: "auto", onUpdate: paint });
    gsap.to(slow.current, { x: px, y: py, duration: 0.8, ease: "power3", overwrite: "auto" });
    gsap.to(fast.current, { r: radius, duration: 0.55, ease: "back.out(1.6)", overwrite: false, onUpdate: paint });

    gsap.to(stage.current, {
      rotationY: nx * tilt * 2,
      rotationX: -ny * tilt * 2,
      x: nx * 18,
      y: ny * 10,
      duration: 0.8,
      ease: "power3.out",
      transformPerspective: 900,
    });
  };

  const onLeave = () => {
    gsap.to(fast.current, { r: 0, duration: 0.45, ease: "power3.in", overwrite: false, onUpdate: paint });
    gsap.to(stage.current, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.5)" });
  };

  return (
    <div ref={box} onPointerMove={onMove} onPointerLeave={onLeave} className="pointer-events-auto relative h-full w-full cursor-none">
      <div ref={stage} className="relative h-full w-full will-change-transform">
        <Image
          src="/chanuka.png"
          alt={alt}
          fill
          loading="eager"
          sizes={sizes}
          className={`${imgClass} drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]`}
          style={baseFilter ? { filter: baseFilter } : undefined}
        />
        <div ref={lens} aria-hidden className="pointer-events-none absolute inset-0" style={{ maskImage: "radial-gradient(circle 0px at 0 0, #000, transparent)" }}>
          <Image src="/chanuka.png" alt="" fill loading="eager" sizes={sizes} className={imgClass} style={{ filter: lensFilter }} />
        </div>
      </div>
      <div ref={ring} aria-hidden className="pointer-events-none absolute left-0 top-0 rounded-full border-2 border-accent opacity-0 mix-blend-difference" />
      <div ref={ring2} aria-hidden className="pointer-events-none absolute left-0 top-0 rounded-full border border-dashed border-accent opacity-0 mix-blend-difference" />
      {radius >= 120 && (
      <span ref={label} aria-hidden className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-black opacity-0">
        data mode
      </span>
      )}
    </div>
  );
}
