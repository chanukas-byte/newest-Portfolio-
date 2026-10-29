import Academics from "@/components/Academics";
import Band from "@/components/Band";
import Contact from "@/components/Contact";
import Contours from "@/components/Contours";
import Demos from "@/components/Demos";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Gsap from "@/components/Gsap";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Link from "next/link";
import Section from "@/components/Section";
import Services from "@/components/Services";
import Statement from "@/components/Statement";
import Pipeline from "@/components/Pipeline";

export default function Home() {
  return (
    <main className="relative">
      <Gsap />
      <Contours />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <Band />
        <Statement />
        <Gallery />
      </div>
      <Pipeline />

      <Section id="projects">
        <div data-reveal>
          <Heading eyebrow="from my github">Projects</Heading>
        </div>
        <Demos />
        <Link href="/projects" data-magnet className="mt-10 inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-semibold tracking-wide text-black">
          All GitHub projects →
        </Link>
      </Section>

      <Section id="academics" className="bg-surface">
        <div data-reveal>
          <Heading eyebrow="education & certificates">Academics</Heading>
        </div>
        <Academics />
      </Section>

      <Section id="services">
        <div data-reveal>
          <Heading eyebrow="what I do">Services</Heading>
        </div>
        <Services />
        <div className="mt-24"><Experience /></div>
      </Section>

      <Section id="contact" className="bg-accent text-black [&_*]:!border-black/20 [&_.text-muted]:!text-black/60 [&_a:hover]:!text-black/60">
        <div data-reveal>
          <p className="mb-4 text-sm tracking-wide">let&apos;s talk</p>
          <h2 className="font-heading text-5xl uppercase leading-[0.95] md:text-7xl">Contact me</h2>
        </div>
        <Contact />
      </Section>
      <Footer />
    </main>
  );
}
