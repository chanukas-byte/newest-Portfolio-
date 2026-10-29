import HeroFace from "@/components/HeroFace";

const row = (word: string, n = 4) => Array.from({ length: n }, () => word);

/** Compact ribbon: two text lines slide in opposite directions around the portrait (colour on hover). */
export default function Band() {
  return (
    <section data-band className="relative flex h-[56vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap uppercase leading-[0.95]">
        <div data-band-row="left" className="flex w-max gap-8 font-serif text-[4.5vw] text-accent">
          {row("did it at home").map((w, i) => <span key={i}>{w}</span>)}
        </div>
        <div data-band-row="right" className="flex w-max gap-8 font-heading text-[4.5vw] text-fg">
          {row("pipelines forever").map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      <div className="relative z-10 h-[40vh] w-[min(60vw,240px)] overflow-hidden bg-[#4a4e3f]">
        <HeroFace
          alt="Chanuka Senevirathne"
          imgClass="object-cover object-top scale-125"
          baseFilter="grayscale(1) contrast(1.05)"
          lensFilter="none"
          radius={90}
          tilt={8}
          sizes="240px"
        />
      </div>
    </section>
  );
}
