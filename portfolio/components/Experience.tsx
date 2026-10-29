import { experience, skills } from "@/lib/profile";

export default function Experience() {
  return (
    <div>
      <h3 data-reveal className="font-heading text-3xl uppercase md:text-4xl">Experience</h3>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {experience.map((e) => (
          <li key={e.role + e.company} data-reveal className="grid gap-3 py-8 md:grid-cols-[12rem_1fr] md:gap-8">
            <p className="text-sm text-accent">{e.period}</p>
            <div>
              <h4 className="font-heading text-2xl uppercase">{e.role} · <span className="text-muted">{e.company}</span></h4>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                {e.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <ul data-reveal className="mt-10 flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s} className="rounded-full border border-line px-4 py-2 text-sm text-muted">{s}</li>
        ))}
      </ul>
    </div>
  );
}
