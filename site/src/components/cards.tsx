import Link from "next/link";
import { Pill, MediaSlot } from "@/components/ui";
import type { CaseStudy, PlaygroundProject } from "@/content/portfolio";

const CARD_COLORS = ["var(--accent)", "var(--accent-3)", "var(--accent-4)"];

/** Featured case study card — dark/coloured block with a media slot. */
export function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const bg = index === 0 ? "var(--ink)" : CARD_COLORS[index % CARD_COLORS.length];
  const dark = index === 0 || index === 2;

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block border-[1.5px] border-ink transition-transform hover:-translate-y-1"
      style={{ background: bg, boxShadow: "5px 5px 0 var(--ink)" }}
    >
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: dark ? "var(--paper)" : "var(--ink)", opacity: 0.7 }}
            >
              {study.year} · {study.org.split(",")[0]}
            </p>
            <h3
              className="display mt-3 text-3xl sm:text-4xl"
              style={{ color: dark ? "var(--paper)" : "var(--ink)" }}
            >
              {study.shortTitle}
            </h3>
            <p
              className="mt-3 max-w-sm text-sm leading-relaxed"
              style={{ color: dark ? "var(--paper)" : "var(--ink)", opacity: 0.85 }}
            >
              {study.tagline}
            </p>
          </div>

          <div>
            <p
              className="display text-2xl"
              style={{ color: dark ? "var(--accent-2)" : "var(--ink)" }}
            >
              {study.metric.value}
            </p>
            <p
              className="text-xs uppercase tracking-wide"
              style={{ color: dark ? "var(--paper)" : "var(--ink)", opacity: 0.7 }}
            >
              {study.metric.label}
            </p>
            <span
              className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide underline underline-offset-4"
              style={{ color: dark ? "var(--paper)" : "var(--ink)" }}
            >
              View project →
            </span>
          </div>
        </div>

        <MediaSlot
          label={`${study.shortTitle} — image slot`}
          ratio="4 / 3"
          color={dark ? "var(--paper)" : "var(--ink)"}
        />
      </div>
    </Link>
  );
}

/** Lighter card for the hobby-scale projects. */
export function PlaygroundCard({
  project,
  tilt = 0,
}: {
  project: PlaygroundProject;
  tilt?: number;
}) {
  return (
    <Link
      href={`/playground#${project.slug}`}
      className="paper-card group relative block p-5 transition-transform hover:-translate-y-1"
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <span className="tape -top-3 left-6" style={{ transform: "rotate(-3deg)" }} aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <h3 className="display text-2xl">{project.title}</h3>
        <span className="hand text-sm text-ink-soft">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">{project.tagline}</p>

      {project.metric ? (
        <p className="mt-3 text-sm font-semibold underline-marker inline-block">
          {project.metric}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
    </Link>
  );
}
