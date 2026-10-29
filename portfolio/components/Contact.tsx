import { profile } from "@/lib/profile";

const { socials } = profile;
const items = [
  { label: "Email", href: `mailto:${socials.email}`, text: socials.email },
  { label: "LinkedIn", href: socials.linkedin, text: "linkedin" },
  { label: "GitHub", href: socials.github, text: "github" },
  { label: "CV", href: "/Chanuka-Senevirathne-CV.pdf", text: "download pdf" },
  { label: "Facebook", href: socials.facebook, text: "facebook" },
];

export default function Contact() {
  return (
    <ul className="mt-16 divide-y divide-line border-y border-line">
      {items.map((i) => (
        <li key={i.label} data-reveal>
          <a
            href={i.href}
            data-magnet
            {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center justify-between gap-4 py-8 transition-colors hover:text-accent"
          >
            <span className="font-heading text-3xl uppercase md:text-5xl">{i.label}</span>
            <span className="hidden truncate text-muted md:block">{i.text} ↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
