import Contours from "@/components/Contours";
import Footer from "@/components/Footer";
import Gsap from "@/components/Gsap";
import HeroFace from "@/components/HeroFace";
import Nav from "@/components/Nav";

type Props = {
  eyebrow: string;
  title: [string, string]; // [serif word, bold word]
  intro: string;
  /** show the portrait with the lens effect next to the title */
  photo?: boolean;
  children: React.ReactNode;
};

/** Shared frame for the inner pages: nav, contours, big title header, footer. */
export default function PageShell({ eyebrow, title, intro, photo = false, children }: Props) {
  return (
    <main className="relative">
      <Gsap intro={false} />
      <Contours />
      <Nav />

      <header className="relative z-10 px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold tracking-wide text-accent">{eyebrow}</p>
            <h1 className="uppercase leading-[0.9]" style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}>
              <span className="block font-serif text-accent">{title[0]}</span>
              <span className="block font-heading">{title[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted">{intro}</p>
          </div>
          {photo && (
            <div className="relative h-[42vh] w-full max-w-xs shrink-0 overflow-hidden bg-accent md:h-[50vh]">
              <HeroFace
                alt="Chanuka Senevirathne"
                imgClass="object-cover object-top scale-110"
                lensFilter="grayscale(1) contrast(1.15) brightness(0.9)"
                radius={120}
                tilt={7}
                sizes="320px"
              />
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10">{children}</div>
      <Footer />
    </main>
  );
}
