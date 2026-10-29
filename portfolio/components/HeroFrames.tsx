const words = ["sql", "etl", "kafka", "spark", "airflow", "aws", "azure", "dbt"];

/**
 * Decorative frame pieces laid over the portrait (coordinates are % of the square photo box):
 * wireframe dome + monogram above the head, viewfinder brackets around the face,
 * and a tilted lime "visor" band with scrolling tool names across the chest.
 */
export default function HeroFrames() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* wireframe dome + monogram above the head */}
      <div data-dome className="absolute left-[44%] top-[-12%] w-[24%]">
        <svg viewBox="0 0 200 70" className="w-full" fill="none" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1">
          {[0, 1, 2, 3].map((i) => (
            <path key={i} pathLength={1} style={{ strokeDasharray: 1 }} d={`M${10 + i * 14} 62C${40 + i * 10} ${6 + i * 8} ${160 - i * 10} ${6 + i * 8} ${190 - i * 14} 62`} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={`r${i}`} pathLength={1} style={{ strokeDasharray: 1 }} d={`M${100 + (i - 3) * 6} 8L${20 + i * 26} 62`} />
          ))}
          <path pathLength={1} style={{ strokeDasharray: 1 }} d="M6 62h188" strokeOpacity="0.8" />
        </svg>
        <span className="mx-auto -mt-2 mb-1 block w-fit rounded-md bg-ink px-2 py-0.5 font-heading text-xs text-accent">CS</span>
      </div>

      {/* viewfinder brackets around the face */}
      <div data-brackets className="absolute left-[38%] top-[1%] h-[40%] w-[36%]">
        {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute h-[9%] w-[12%] border-ink/50 ${c}`} />
        ))}
        {/* scan line sweeping down the face */}
        <span data-scan className="absolute inset-x-0 top-0 h-0.5 bg-accent shadow-[0_0_14px_3px_var(--accent)]" />
        <span className="absolute -top-5 left-0 text-[9px] font-bold uppercase tracking-wide text-ink/60">chanuka s. · data engineer</span>
        <span className="absolute -top-5 right-0 text-[9px] font-bold uppercase tracking-wide text-ink/60">id 01 / 2026</span>
      </div>

      {/* tilted lime visor with scrolling tool names */}
      <div data-visor-wrap className="absolute left-[27%] top-[50%] w-[58%] -rotate-3">
        <div data-visor className="overflow-hidden rounded-[999px] border-2 border-ink bg-accent py-[0.6%] shadow-[0_14px_30px_rgba(0,0,0,0.25)]">
          <div data-visor-text className="flex w-max gap-6 whitespace-nowrap font-heading text-[clamp(0.9rem,2.6vh,1.6rem)] uppercase text-ink">
            {[...words, ...words, ...words, ...words].map((w, i) => (
              <span key={i}>{w} <span className="font-serif text-accent mix-blend-difference">✦</span></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
