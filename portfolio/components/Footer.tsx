import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-col gap-2 bg-ink px-6 py-8 text-sm text-fg/70 md:flex-row md:justify-between md:px-12">
      <p>© 2026 {profile.firstName} {profile.lastName}</p>
      <p>Data engineer · Colombo, Sri Lanka</p>
    </footer>
  );
}
