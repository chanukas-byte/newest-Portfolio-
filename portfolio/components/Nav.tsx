"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { isMuted, onSoundChange, setMuted } from "@/lib/sound";
import { profile } from "@/lib/profile";

const links = [
  { label: "home", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "about", href: "/about" },
  { label: "services", href: "/services" },
  { label: "contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const muted = useSyncExternalStore(onSoundChange, isMuted, () => false);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    gsap.to(el, {
      clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      duration: 0.8,
      ease: "power4.inOut",
    });
    if (open) {
      gsap.fromTo(
        "[data-menu-link]",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.07, delay: 0.3 },
      );
    }
  }, [open]);

  return (
    <>
      {/* blend mode keeps the logo readable on both the light hero and the dark page */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-[60] leading-[0.85] md:left-5 md:top-5 text-white mix-blend-difference"
      >
        <span className="block font-serif text-2xl uppercase md:text-3xl">{profile.firstName}</span>
        <span className="block font-heading text-2xl uppercase md:text-3xl">{profile.lastName}</span>
      </Link>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between p-4 md:p-5">
        <span />
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            onClick={() => setMuted(!muted)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink bg-light text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </svg>
          </button>
          <a
            href={`mailto:${profile.socials.email}`}
            data-magnet
            className="flex h-12 items-center rounded-xl bg-accent px-5 ring-2 ring-ink font-heading text-lg uppercase text-black"
          >
            Hire me
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-ink bg-light"
          >
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-3 self-end bg-ink transition-all ${open ? "-translate-y-1 -rotate-45 !w-5" : "mr-3.5"}`} />
          </button>
        </div>
      </header>

      <div
        ref={panel}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        className="fixed inset-0 z-50 flex flex-col justify-center bg-accent px-6 text-black md:px-16"
      >
        <ul>
          {links.map((l) => (
            <li key={l.label} className="overflow-hidden">
              <Link
                data-menu-link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-heading text-5xl uppercase leading-[1.02] transition-opacity hover:opacity-60 md:text-7xl"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
