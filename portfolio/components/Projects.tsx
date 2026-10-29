"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/profile";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  fork: boolean;
  pushed_at: string;
};

const prettify = (s: string) => s.replace(/[-_]/g, " ");

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [lang, setLang] = useState("all");
  const [query, setQuery] = useState("");
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => {
        setRepos(data.filter((r) => !r.fork));
        // the page got taller; let ScrollTrigger re-measure
        setTimeout(() => ScrollTrigger.refresh(), 100);
      })
      .catch(() => setFailed(true));
  }, []);

  const languages = useMemo(
    () => ["all", ...new Set((repos ?? []).map((r) => r.language).filter(Boolean) as string[])],
    [repos],
  );

  const shown = (repos ?? []).filter(
    (r) =>
      (lang === "all" || r.language === lang) &&
      prettify(r.name).toLowerCase().includes(query.toLowerCase()),
  );

  // stagger cards in whenever the visible set changes
  useEffect(() => {
    const cards = grid.current?.children;
    if (!cards?.length) return;
    gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, overwrite: true });
  }, [repos, lang, query]);

  return (
    <div>
      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                lang === l ? "border-accent bg-accent text-black" : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="filter by project name…"
          className="w-full rounded-full border border-line bg-surface px-5 py-2.5 text-sm outline-none focus:border-accent md:w-72"
        />
      </div>

      {failed && (
        <p className="mt-10 text-muted">
          Couldn&apos;t load repos for “{profile.githubUser}”. Set your GitHub username in lib/profile.ts.
        </p>
      )}
      {!repos && !failed && <p className="mt-10 text-muted">loading projects…</p>}

      <div ref={grid} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <RepoCard key={r.id} repo={r} />
        ))}
      </div>
      {repos && shown.length === 0 && <p className="mt-10 text-muted">No projects match.</p>}
    </div>
  );
}

const hashOf = (name: string) => [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// Base hue per language so related projects share a colour family.
const langHue: Record<string, number> = { Java: 22, Python: 215, JavaScript: 52, TypeScript: 205, "C++": 265, C: 250, CMake: 150, Kotlin: 285, HTML: 14, CSS: 190, Dart: 175, Jupyter: 30 };

/** Deterministic colourful cover: gradient + one of four patterns, picked from the repo name. */
function RepoArt({ name, language, label, swap }: { name: string; language: string | null; label: string; swap: boolean }) {
  const h = hashOf(name);
  const hue: number = (language ? langHue[language] : undefined) ?? h % 360;
  const h2 = (hue + 50 + (h % 40)) % 360;
  const pattern = h % 4;
  const c1 = `hsl(${hue} 90% 58%)`;
  const c2 = `hsl(${h2} 90% 52%)`;
  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-all duration-500 group-hover:scale-110 ${swap ? "group-hover:opacity-0" : ""}`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {pattern === 0 &&
          [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={230 - i * 10} cy={50 + i * 8} r={150 - i * 28} stroke="#fff" strokeOpacity={0.35 - i * 0.05} strokeWidth="2" />)}
        {pattern === 1 &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={20 + i * 36} y={200 - 30 - ((h >> i) % 5) * 22 - 20} width="22" height="200" rx="11" fill="#fff" fillOpacity={0.18 + (i % 3) * 0.08} />)}
        {pattern === 2 && (
          <>
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M-10 ${60 + i * 34}C60 ${20 + i * 34} 120 ${110 + i * 34} 190 ${60 + i * 34}S280 ${20 + i * 34} 320 ${70 + i * 34}`} stroke="#fff" strokeOpacity={0.45 - i * 0.07} strokeWidth="3" />)}
          </>
        )}
        {pattern === 3 && (
          <>
            {Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => <circle key={`${r}-${c}`} cx={20 + c * 30} cy={20 + r * 32} r={(((h >> (r + c)) & 3) + 1) * 2} fill="#fff" fillOpacity="0.4" />))}
            <rect x="190" y="90" width="90" height="90" rx="20" fill="#000" fillOpacity="0.18" transform="rotate(12 235 135)" />
          </>
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <span className="w-fit rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">{language ?? "code"}</span>
        <span className="font-heading text-2xl uppercase leading-[0.95] text-white drop-shadow md:text-3xl">{label}</span>
      </div>
    </div>
  );
}

function RepoCard({ repo: r }: { repo: Repo }) {
  const [broken, setBroken] = useState(false);
  const [hovered, setHovered] = useState(false); // fetch the preview lazily: GitHub rate-limits bulk loads
  const [loaded, setLoaded] = useState(false);
  return (
    <a
      onMouseEnter={() => setHovered(true)}
      href={r.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-accent"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-black">
        {/* base visual: colourful generated artwork carrying the project name */}
        <RepoArt name={r.name} language={r.language} label={prettify(r.name)} swap={loaded} />
        {/* hover visual: GitHub's generated repo card */}
        {hovered && !broken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://opengraph.githubassets.com/1/${profile.githubUser}/${r.name}`}
            alt={`${prettify(r.name)} on GitHub`}
            onError={() => setBroken(true)}
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-muted">
          {r.language ?? "code"} · {new Date(r.pushed_at).getFullYear()}
        </p>
        <p className="mt-2 line-clamp-2 text-muted">{r.description ?? "No description yet."}</p>
        {r.topics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {r.topics.slice(0, 4).map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</li>
            ))}
          </ul>
        )}
      </div>
    </a>
  );
}
