type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`relative z-10 px-6 py-24 md:px-12 md:py-36 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}