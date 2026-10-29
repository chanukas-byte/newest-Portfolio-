"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Loader, smooth scroll and every scroll-driven effect on the page (all GSAP). */
export default function Gsap({ intro = true }: { intro?: boolean }) {
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      loader.current?.remove();
      if (intro) gsap.set("[data-hero-bg]", { opacity: 0 });
      return;
    }

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (intro) {
      // intro: loader wipes up, hero builds in
      // welcome words snap in one after another, then the loader wipes up
      const words = gsap.utils.toArray<HTMLElement>("[data-loader-word]");
      const tl = gsap.timeline();
      words.forEach((w, i) => {
        tl.set(w, { autoAlpha: 1, scale: 1.25 }).to(w, { scale: 1, duration: 0.14, ease: "power4.out" });
        if (i < words.length - 1) tl.set(w, { autoAlpha: 0 }, "+=0.3");
      });
      tl
        .to({}, { duration: 0.45 })
        .to(loader.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.2")
        .set(loader.current, { display: "none" })
        .call(() => window.dispatchEvent(new Event("intro:start")), [], "-=0.5") // portrait chips + sound
        // frame pieces build in once the chips have locked together
        .from("[data-dome] path", { strokeDashoffset: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.05 }, "+=1.7")
        .from("[data-dome] span", { scale: 0, duration: 0.5, ease: "back.out(2)" }, "<0.5")
        .from("[data-brackets]", { scale: 0.7, opacity: 0, duration: 0.9, ease: "back.out(1.6)" }, "<-0.4")
        .from("[data-ring], [data-ring-rev]", { scale: 0.6, opacity: 0, duration: 1.2, ease: "power3.out" }, "<-0.8")
        .from("[data-orbit-chip]", { scale: 0, duration: 0.6, ease: "back.out(2.5)", stagger: 0.12 }, "<0.2")
        .from("[data-visor-wrap]", { xPercent: -130, rotation: -14, opacity: 0, duration: 1.2, ease: "power4.out" }, "<0.1");

      // idle life: orbit, rings, glow, scan line and a slow breathing float
      gsap.to("[data-orbit]", { rotation: 360, duration: 26, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-chip]", { rotation: -360, duration: 26, ease: "none", repeat: -1 });
      gsap.to("[data-ring]", { rotation: 360, duration: 48, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to("[data-ring-rev]", { rotation: -360, duration: 70, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.to("[data-glow]", { scale: 1.25, opacity: 0.55, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.fromTo("[data-scan]", { top: "0%", opacity: 0 }, { top: "100%", opacity: 1, duration: 2.2, ease: "power1.inOut", repeat: -1, repeatDelay: 2.4 });
      gsap.to("[data-hero-photo] > div", { y: -10, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // lime visor: tool names scroll sideways, band floats gently
      gsap.to("[data-visor-text]", { xPercent: -25, ease: "none", duration: 12, repeat: -1 });
      gsap.to("[data-visor]", { y: 8, rotation: -2, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // page colour: light hero melts into the dark page as you scroll away
      const heroST = { trigger: "[data-hero]", start: "top top", end: "bottom 35%", scrub: true };
      gsap.to("[data-hero-bg]", { opacity: 0, ease: "none", scrollTrigger: heroST });
      gsap.to("[data-hero-photo]", { yPercent: -3, scale: 0.9, ease: "none", scrollTrigger: heroST });
      // frame pieces react as you leave the hero: dome lifts off, brackets close in, visor slides away
      gsap.to("[data-dome]", { yPercent: -90, opacity: 0, ease: "none", scrollTrigger: heroST });
      gsap.to("[data-brackets]", { scale: 0.78, opacity: 0, ease: "none", scrollTrigger: heroST });
      gsap.to("[data-visor-wrap]", { xPercent: 45, yPercent: 160, rotation: 6, ease: "none", scrollTrigger: heroST });

      }

      // text band: rows slide in opposite directions
      const band = { trigger: "[data-band]", start: "top bottom", end: "bottom top", scrub: 1 };
      if (document.querySelector("[data-band]")) {
      gsap.fromTo('[data-band-row="left"]', { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: band });
      gsap.fromTo('[data-band-row="right"]', { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: band });
      }

      // statement: words light up, then the block cursor blinks at the end
      if (document.querySelector("[data-statement]")) gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-statement]", start: "top 65%", end: "bottom 60%", scrub: true },
        },
      );

      // gallery: each frame drifts at its own speed
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: Number(el.dataset.float) },
          { y: -Number(el.dataset.float), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });
    });

    // magnetic buttons
    const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnet]").map((m) => {
      const move = (e: MouseEvent) => {
        const r = m.getBoundingClientRect();
        gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
      };
      const leave = () => gsap.to(m, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      m.addEventListener("mousemove", move);
      m.addEventListener("mouseleave", leave);
      return () => {
        m.removeEventListener("mousemove", move);
        m.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [intro]);

  if (!intro) return null;
  return (
    <>
      {/* light page colour behind the hero; faded out by scroll */}
      <div data-hero-bg aria-hidden className="fixed inset-0 z-0 bg-light" />
      <div ref={loader} className="fixed inset-0 z-[100] flex items-center justify-center bg-accent text-black">
        <div className="relative flex h-[1.2em] w-full items-center justify-center text-5xl md:text-8xl">
          {["Hello", "Welcome", "To my", "Data world"].map((w) => (
            <p key={w} data-loader-word className="invisible absolute whitespace-nowrap font-heading uppercase leading-none opacity-0">
              {w}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
