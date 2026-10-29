import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export const metadata: Metadata = { title: "Contact | Chanuka Senevirathne" };

export default function ContactPage() {
  return (
    <PageShell
      photo
      eyebrow="let's talk"
      title={["Contact", "Me"]}
      intro="Open to data engineering roles and internships. Email is fastest."
    >
      <Section className="!pt-0">
        <Contact />
      </Section>
    </PageShell>
  );
}
