import Image from "next/image";

const text =
  "Building pipelines, cleaning data, shipping insights. Engineering reliable data in the cloud, from raw events to the dashboard, on AWS and Azure. Defining a standard for data engineering from the first row to the last";
const serif = new Set(["pipelines,", "insights.", "reliable", "standard"]);

/** Big centred statement: words light up as you scroll, ending on a blinking lime block. */
export default function Statement() {
  const words = text.split(" ");
  return (
    <section data-statement className="relative px-6 py-32 md:py-48">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <Image src="/globe.svg" alt="" width={34} height={34} className="mb-6 opacity-70 invert" />
        <p className="mb-10 text-[10px] font-bold uppercase tracking-wide">data engineer since 2023</p>
        <p className="text-3xl uppercase leading-[1.02] md:text-6xl">
          {words.map((w, i) => (
            <span
              key={i}
              data-word
              className={`mr-[0.22em] inline-block ${
                serif.has(w) ? "font-serif text-accent" : "font-heading"
              }`}
            >
              {w}
            </span>
          ))}
          <span aria-hidden className="cursor-block inline-block h-[0.8em] w-[0.5em] translate-y-[0.08em] bg-accent" />
        </p>
      </div>
    </section>
  );
}
