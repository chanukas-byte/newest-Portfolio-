import type { Metadata } from "next";
import Demos from "@/components/Demos";
import PageShell from "@/components/PageShell";
import Projects from "@/components/Projects";
import Section from "@/components/Section";

export const metadata: Metadata = { title: "Projects | Chanuka Senevirathne" };

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="selected work"
      title={["All my", "Projects"]}
      intro="Live demos plus every public repository from my GitHub. Filter by language or search by name."
    >
      <Section className="!pt-0">
        <Demos repoLabel />
        <Projects />
      </Section>
    </PageShell>
  );
}
