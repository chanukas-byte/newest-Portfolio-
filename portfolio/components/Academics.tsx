import { academics } from "@/lib/profile";

export default function Academics() {
  return (
    <ol className="mt-16 divide-y divide-line border-y border-line">
      {academics.map((a) => (
        <li key={a.title} data-reveal className="grid gap-2 py-8 md:grid-cols-[12rem_1fr_1fr] md:gap-8">
          <p className="text-sm text-accent">{a.period}</p>
          <div>
            <h3 className="font-heading text-3xl uppercase leading-none">{a.title}</h3>
            <p className="mt-2 text-muted">{a.place}</p>
          </div>
          <p className="text-muted">{a.note}</p>
        </li>
      ))}
    </ol>
  );
}
