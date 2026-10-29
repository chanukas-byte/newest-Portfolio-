const stats = [
  { value: "3.22", label: "cgpa · sliit" },
  { value: "8", label: "certifications" },
  { value: "3", label: "cloud platforms" },
  { value: "6+", label: "data pipelines" },
];

/** Numbers + quote, no repeated photos. Each block drifts at its own speed. */
export default function Gallery() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        <blockquote data-float="30">
          <p className="font-serif text-3xl leading-tight text-muted md:text-4xl">
            Good data isn&apos;t found, <strong className="text-fg">it&apos;s engineered</strong>. Every pipeline starts as a
            question and ends as a decision.
          </p>
          <svg viewBox="0 0 120 40" className="mt-6 h-10 w-28" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
            <path d="M4 28C16 6 24 4 22 18c-2 16 8 12 16-8 4 12 12 12 18-2 6 10 16 8 26-6M40 32c20-4 50-6 76-4" />
          </svg>
        </blockquote>

        <ul data-float="70" className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <li key={s.label} className={`rounded-3xl p-6 ${i % 3 === 0 ? "bg-accent text-black" : "border border-line bg-surface"}`}>
              <p className="font-heading text-5xl leading-none">{s.value}</p>
              <p className="mt-3 text-[10px] font-bold tracking-wide">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
