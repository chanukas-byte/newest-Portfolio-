const chips = ["kafka", "sql", "s3", "etl"];

/** Rings and orbiting tool chips centred on the head; sits behind the portrait. Animated in Gsap.tsx. */
export default function HeroOrbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-[55%] top-[24%] aspect-square w-[54%] -translate-x-1/2 -translate-y-1/2">
      {/* pulsing glow */}
      <div data-glow className="absolute inset-[18%] rounded-full bg-accent/60 blur-3xl" />

      {/* rotating circular text */}
      <svg data-ring viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="ring-path" d="M200 200m-172 0a172 172 0 1 1 344 0a172 172 0 1 1-344 0" />
        </defs>
        <text fill="var(--ink)" fillOpacity="0.65" fontSize="17" fontWeight="700" letterSpacing="6">
          <textPath href="#ring-path">DATA ENGINEER ✦ CLOUD PIPELINES ✦ ANALYTICS ✦ SLIIT ✦ AWS ✦ AZURE ✦</textPath>
        </text>
      </svg>

      {/* dashed ring turning the other way */}
      <svg data-ring-rev viewBox="0 0 400 400" className="absolute inset-[9%] h-[82%] w-[82%]">
        <circle cx="200" cy="200" r="190" fill="none" stroke="var(--ink)" strokeOpacity="0.4" strokeDasharray="3 9" strokeWidth="1.5" />
      </svg>

      {/* orbiting chips (counter-rotated so the text stays upright) */}
      <div data-orbit className="absolute inset-[4%]">
        {chips.map((c, i) => (
          <span
            key={c}
            data-orbit-chip
            className="absolute rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-accent shadow-lg"
            style={{
              left: ["50%", "100%", "50%", "0%"][i],
              top: ["0%", "50%", "100%", "50%"][i],
              translate: "-50% -50%",
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
