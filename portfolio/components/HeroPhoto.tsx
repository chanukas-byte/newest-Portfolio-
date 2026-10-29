"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { playWelcome } from "@/lib/sound";

const GRID = 18; // chips across the portrait
const DURATION = 2; // seconds for the chips to fly in

/**
 * Wraps the hero portrait. On load, the photo is cut into small square chips
 * (only where the cut-out is opaque) that fly in from every direction and lock
 * together, with a whoosh + chime. Starts on the loader's "intro:start" event.
 */
export default function HeroPhoto({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // hide the real photo before first paint; the chips will rebuild it
  useLayoutEffect(() => {
    if (!reduce() && content.current) content.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    if (reduce()) return;
    let started = false;
    let tl: gsap.core.Timeline | undefined;
    const reveal = () => {
      if (content.current) content.current.style.opacity = "1";
    };

    const run = async () => {
      if (started) return;
      started = true;
      const box = wrap.current;
      const layer = overlay.current;
      if (!box || !layer) return reveal();

      const { width: W, height: H } = box.getBoundingClientRect();
      const s = Math.min(W, H); // contained, bottom-aligned square
      const ox = (W - s) / 2;
      const oy = H - s;
      const t = s / GRID;

      const img = new Image();
      img.src = "/chanuka.png";
      try {
        await img.decode();
      } catch {
        return reveal();
      }

      // find which cells actually contain photo
      const res = GRID * 8;
      const cv = document.createElement("canvas");
      cv.width = cv.height = res;
      const g = cv.getContext("2d", { willReadFrequently: true })!;
      g.drawImage(img, 0, 0, res, res);
      const px = g.getImageData(0, 0, res, res).data;
      const cell = res / GRID;

      const chips: HTMLDivElement[] = [];
      const frag = document.createDocumentFragment();
      for (let cy = 0; cy < GRID; cy++) {
        for (let cx = 0; cx < GRID; cx++) {
          let a = 0;
          for (let y = 0; y < cell; y += 2)
            for (let x = 0; x < cell; x += 2) a += px[((cy * cell + y) * res + cx * cell + x) * 4 + 3];
          if (a / ((cell / 2) * (cell / 2)) < 40) continue;
          const d = document.createElement("div");
          d.style.cssText = `position:absolute;left:${ox + cx * t}px;top:${oy + cy * t}px;width:${t + 1}px;height:${t + 1}px;background:url(/chanuka.png) ${-cx * t}px ${-cy * t}px/${s}px ${s}px;will-change:transform;opacity:0`;
          chips.push(d);
          frag.appendChild(d);
        }
      }
      layer.appendChild(frag);

      const reach = Math.max(window.innerWidth, window.innerHeight);
      playWelcome(DURATION);
      tl = gsap.timeline({
        onComplete: () => {
          reveal();
          gsap.to(layer, { opacity: 0, duration: 0.35, onComplete: () => layer.replaceChildren() });
        },
      });
      tl.fromTo(
        chips,
        () => {
          const ang = Math.random() * Math.PI * 2;
          const dist = reach * (0.5 + Math.random() * 0.8);
          return { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, rotation: gsap.utils.random(-540, 540), scale: gsap.utils.random(0.3, 2.2), opacity: 0 };
        },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: DURATION * 0.65, ease: "power3.out", stagger: { amount: DURATION * 0.35, from: "random" } },
      );
    };

    window.addEventListener("intro:start", run, { once: true });
    const fallback = setTimeout(run, 6000); // never leave the photo hidden
    return () => {
      window.removeEventListener("intro:start", run);
      clearTimeout(fallback);
      tl?.kill();
      reveal();
    };
  }, []);

  return (
    <div ref={wrap} data-hero-photo className="relative h-full w-full">
      <div ref={content} className="h-full w-full">{children}</div>
      <div ref={overlay} aria-hidden className="pointer-events-none absolute inset-0" />
    </div>
  );
}
