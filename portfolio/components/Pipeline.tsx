"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { n: "01", title: "Ingest", text: "Capture change events and API data as they happen: MySQL binlogs through Debezium and Kafka, REST sources, files.", tags: ["debezium", "kafka", "rest apis"], style: "bg-accent text-black" },
  { n: "02", title: "Transform", text: "Clean, validate and reshape raw records into trusted layers with Python, Spark, Glue and Azure Data Factory.", tags: ["python", "spark", "aws glue"], style: "bg-surface text-fg" },
  { n: "03", title: "Store", text: "Land data in lakes and warehouses built for cost and speed: S3 and Parquet, Data Lake Gen2, Redshift, PostgreSQL.", tags: ["s3", "redshift", "postgresql"], style: "bg-[#d9dac8] text-ink" },
  { n: "04", title: "Serve", text: "Query it with Athena and SQL, then turn it into dashboards and models people can act on.", tags: ["athena", "power bi", "quicksight"], style: "bg-surface text-fg" },
];

/**
 * Pinned horizontal scroll: the page slides sideways through the pipeline stages while a
 * rail fills along the bottom and data packets flow along it. Stacks vertically on mobile.
 */
export default function Pipeline() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = root.current!;
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;

      const slide = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          refreshPriority: 1, // measure before the triggers below it
        },
      });

      gsap.fromTo(
        "[data-rail-fill]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, scrub: true, start: "top top", end: () => `+=${dist()}` } },
      );

      // dots on the rail light up as their stage arrives
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((s, i) => {
        gsap.from(s.querySelector("[data-stage-inner]"), {
          opacity: 0,
          y: 70,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: s, containerAnimation: slide, start: "left 75%", toggleActions: "play none none reverse" },
        });
        gsap.to(`[data-rail-dot="${i}"]`, {
          backgroundColor: "var(--accent)",
          scale: 1.5,
          scrollTrigger: { trigger: s, containerAnimation: slide, start: "left 55%", toggleActions: "play none none reverse" },
        });
      });

      // data packets flowing along the rail
      gsap.fromTo("[data-packet]", { left: "0%", opacity: 0 }, { left: "100%", opacity: 1, duration: 3.2, ease: "none", repeat: -1, stagger: 0.8 });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="pipeline" className="relative z-10 md:h-screen md:overflow-hidden">
      <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row">
        {/* intro panel */}
        <div className="flex min-h-[60vh] flex-col justify-center px-6 py-20 md:h-full md:w-[55vw] md:shrink-0 md:px-16">
          <p className="mb-5 text-xs font-bold tracking-wide text-accent">how I move data</p>
          <h2 className="uppercase leading-[0.9]" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block font-serif text-accent">The</span>
            <span className="block font-heading">Pipeline</span>
          </h2>
          <p className="mt-6 max-w-md text-muted">From the first event to the final dashboard. Scroll to follow the data.</p>
          <span className="mt-8 hidden text-sm font-bold text-accent md:block">SCROLL →</span>
        </div>

        {stages.map((s) => (
          <div key={s.n} data-stage className={`flex min-h-[70vh] flex-col justify-between p-8 md:h-full md:w-[60vw] md:shrink-0 md:p-16 ${s.style}`}>
            <div data-stage-inner className="flex h-full flex-col justify-between">
              <p className="font-heading text-7xl leading-none opacity-30 md:text-9xl">{s.n}</p>
              <div className="pb-16">
                <h3 className="font-heading text-4xl uppercase leading-[0.9] md:text-7xl">{s.title}</h3>
                <p className="mt-4 max-w-md opacity-75">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-current/30 px-3 py-1 text-xs">{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* rail: fills with scroll, packets flow along it */}
      <div aria-hidden className="pointer-events-none absolute inset-x-8 bottom-8 z-20 hidden md:block">
        <div className="relative h-px bg-current/20 text-fg mix-blend-difference">
          <div data-rail-fill className="absolute inset-0 h-0.5 origin-left bg-accent" />
          {stages.map((_, i) => (
            <span key={i} data-rail-dot={i} className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/40" style={{ left: `${((i + 1) / stages.length) * 100}%` }} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <span key={i} data-packet className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
          ))}
        </div>
      </div>
    </section>
  );
}
