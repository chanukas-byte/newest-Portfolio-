type HeadingProps = {
  eyebrow?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function Heading({
  eyebrow,
  children,
  as: Tag = "h2",
  className = "",
}: HeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-4 text-sm tracking-wide text-accent">{eyebrow}</p>
      )}
      <Tag
        className={`font-heading text-4xl uppercase leading-[0.95] md:text-6xl ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}
