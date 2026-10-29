import type { Metadata } from "next";
import Academics from "@/components/Academics";
import Experience from "@/components/Experience";
import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export const metadata: Metadata = { title: "About | Chanuka Senevirathne" };

export default function AboutPage() {
  return (
    <PageShell
      photo
      eyebrow="who I am"
      title={["About", "Me"]}
      intro="Third-year BSc (Hons) IT undergraduate at SLIIT specialising in Data Science, working as a cloud data engineering intern."
    >
      <Section className="!pt-0">
        <h2 data-reveal className="font-heading text-3xl uppercase md:text-4xl">Academics</h2>
        <Academics />
      </Section>
      <Section className="bg-surface">
        <Experience />
      </Section>
    </PageShell>
  );
}
