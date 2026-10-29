import fs from "node:fs";
import path from "node:path";
import HeroFace from "@/components/HeroFace";
import HeroFrames from "@/components/HeroFrames";
import HeroOrbit from "@/components/HeroOrbit";
import HeroPhoto from "@/components/HeroPhoto";
import Button from "@/components/Button";
import { profile } from "@/lib/profile";

// Shows the CV button once the PDF is placed in public/.
const cvFile = "/Chanuka-Senevirathne-CV.pdf";
const hasCv = fs.existsSync(path.join(process.cwd(), "public", cvFile));

const outline = "!border-ink/30 !text-ink hover:!border-ink";
const tiny = "text-[10px] font-bold uppercase leading-tight tracking-wide";

export default function Hero() {
  return (
    <section id="top" data-hero className="relative flex min-h-screen flex-col justify-end overflow-hidden text-ink">
      {/* soft blobs behind the portrait, like the reference */}
      <div aria-hidden className="absolute -left-[10%] top-[30%] h-[45vh] w-[45vw] rounded-[50%] bg-ink/[0.06] blur-2xl" />
      <div aria-hidden className="absolute -right-[8%] top-[18%] h-[40vh] w-[40vw] rounded-[50%] bg-ink/[0.05] blur-2xl" />

      <div className="absolute left-1/2 top-[19vh] z-10 -translate-x-1/2" style={{ width: "min(88vh, 128vw)", height: "min(88vh, 128vw)" }}>
        <HeroPhoto>
          <div className="relative h-full w-full">
            <HeroOrbit />
            <HeroFace alt={`${profile.firstName} ${profile.lastName}`} radius={170} sizes="(min-width: 900px) 860px, 128vw" />
            <HeroFrames />
          </div>
        </HeroPhoto>
      </div>

      {/* bottom-left: notched "now building" card, like the next-race tab */}
      <a
        href="https://github.com/chanukas-byte/real-time-cdc-data-pipeline"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-20 m-4 mt-0 hidden w-40 rounded-b-xl rounded-tr-xl border border-ink/70 bg-light/70 p-3 backdrop-blur transition-colors hover:bg-accent md:absolute md:bottom-5 md:left-5 md:block"
      >
        <span className="absolute -top-5 left-[-1px] rounded-t-lg border border-b-0 border-ink/70 bg-light px-3 py-1 text-[10px] font-bold uppercase group-hover:bg-accent">
          now building
        </span>
        <span className="block font-heading text-lg uppercase leading-none">Real-time CDC pipeline</span>
        <span className={`mt-3 block ${tiny}`}>MySQL · Kafka · AWS</span>
      </a>

      {/* bottom-right: status + actions */}
      <div className="relative z-20 flex flex-col items-center gap-4 p-4 md:absolute md:bottom-5 md:right-5 md:items-end">
        <p className={`${tiny} flex items-center gap-2`}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
          </span>
          open to work · Colombo, Sri Lanka
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button href="#projects" className="!px-5 !py-3">View projects</Button>
          <Button href={profile.socials.github} variant="outline" className={`!px-5 !py-3 ${outline}`}>
            GitHub
          </Button>
          {hasCv && (
            <Button href={cvFile} variant="outline" className={`!px-5 !py-3 ${outline}`}>
              Download CV
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
