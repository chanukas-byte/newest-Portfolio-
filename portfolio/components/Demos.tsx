import Image from "next/image";

const demos = [
  {
    title: "Restaurant health grade prediction",
    text: "Random Forest on 100K+ NYC inspections with a Streamlit app for authorities, owners and customers.",
    tags: ["python", "scikit-learn", "streamlit"],
    image: "/demo-streamlit.svg",
    href: "https://restauranthealthgradeprediction-system.streamlit.app",
    cta: "open live app",
  },
  {
    title: "HR analytics dashboard",
    text: "Interactive Tableau dashboard tracking attrition, department trends and demographics.",
    tags: ["tableau", "excel", "sql"],
    image: "/demo-tableau.svg",
    href: "https://public.tableau.com/app/profile/chanuka.sayakkara/viz/HRAnalyticsDashboard_17530041544770/HRAnalyticsDashboard?publish=yes",
    cta: "view on tableau",
  },
  {
    title: "Cloud data integration & analytics",
    text: "Scheduled Azure Data Factory ETL from Excel, SQL and APIs into a Data Lake, with Power BI on top.",
    tags: ["azure data factory", "data lake gen2", "power bi"],
    image: "/demo-adf.svg",
    href: "https://www.linkedin.com/posts/chanuka-senevirathne-06849b341_azuredatafactory-etl-dataengineering-activity-7423780687540985856-6sMI",
    cta: "view linkedin post",
  },
];

export default function Demos({ repoLabel = false }: { repoLabel?: boolean }) {
  return (
    <div className="mt-12">
      <p className="text-sm tracking-wide text-accent">live demos</p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {demos.map((d) => (
          <a
            key={d.title}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group block overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 hover:border-accent"
          >
            <div className="relative aspect-[2/1] overflow-hidden">
              <Image
                src={d.image}
                alt={`${d.title} preview`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-2xl uppercase leading-none">{d.title}</h3>
              <p className="mt-3 text-muted">{d.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm transition-colors group-hover:text-accent">{d.cta} ↗</p>
            </div>
          </a>
        ))}
      </div>
      {repoLabel && <p className="mt-16 text-sm tracking-wide text-accent">all repositories</p>}
    </div>
  );
}
