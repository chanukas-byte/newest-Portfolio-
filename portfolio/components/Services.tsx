import { services } from "@/lib/profile";

export default function Services() {
  return (
    <div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} data-reveal className="rounded-3xl border border-line bg-surface p-8 transition-colors hover:border-accent">
            <p className="font-heading text-6xl text-accent">0{i + 1}</p>
            <h3 className="mt-6 font-heading text-3xl uppercase leading-none">{s.title}</h3>
            <p className="mt-3 text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
