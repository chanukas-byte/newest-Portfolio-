import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Section from "@/components/Section";
import Services from "@/components/Services";
import { skills } from "@/lib/profile";

export const metadata: Metadata = { title: "Services | Chanuka Senevirathne" };

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="what I do"
      title={["My", "Services"]}
      intro="Data engineering, analytics and machine learning, built on AWS and Azure."
    >
      <Section className="!pt-0">
        <Services />
        <h2 data-reveal className="mt-24 font-heading text-3xl uppercase md:text-4xl">Tools</h2>
        <ul data-reveal className="mt-8 flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s} className="rounded-full border border-line px-4 py-2 text-sm text-muted">{s}</li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
