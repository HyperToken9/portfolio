import Link from "next/link";
import { Pill, MediaSlot, Shared, DateTag } from "@/components/ui";
import type {
  CaseStudy,
  Experience,
  PlaygroundProject,
} from "@/content/portfolio";

/** An Experience: the place leads, its pieces of work sit inside it. */
export function ExperienceBlock({
  experience,
  studies,
  index,
}: {
  experience: Experience;
  studies: CaseStudy[];
  index: number;
}) {
  const lead = index === 0;

  return (
    <div
      className="border-[1.5px] border-ink p-5 sm:p-7"
      style={{
        background: lead ? "var(--ink)" : "var(--paper)",
        boxShadow: `5px 5px 0 ${lead ? "var(--accent)" : "var(--ink)"}`,
      }}
    >
      <header style={{ color: lead ? "var(--paper)" : "var(--ink)" }}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="display text-4xl sm:text-5xl">{experience.place}</h3>
          <DateTag
            className="mt-1 shrink-0"
            color={lead ? "var(--accent)" : "var(--paper-2)"}
          >
            {experience.period}
          </DateTag>
        </div>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide">
          {experience.role}
        </p>
        {experience.summary ? (
          <p
            className="font-body mt-1 text-sm leading-loose"
            style={{ opacity: 0.75 }}
          >
            {experience.summary}
          </p>
        ) : null}
      </header>

      <div
        className={`mt-6 grid gap-5 ${studies.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {studies.map((study, i) => (
          <WorkCard
            key={study.slug}
            study={study}
            wide={studies.length === 1}
            color={WORK_COLORS[(index + i) % WORK_COLORS.length]}
          />
        ))}
      </div>

      <p
        className="mt-5 text-right text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: lead ? "var(--paper)" : "var(--ink)", opacity: 0.6 }}
      >
        {experience.kind}
      </p>
    </div>
  );
}

const WORK_COLORS = ["var(--accent)", "var(--accent-5)", "var(--accent-2)"];

/** One piece of work at an Experience, leading to its case study. */
function WorkCard({
  study,
  wide,
  color,
}: {
  study: CaseStudy;
  wide: boolean;
  color: string;
}) {
  return (
    <Link
      id={`work-${study.slug}`}
      href={`/work/${study.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block scroll-mt-32 border-[1.5px] border-ink transition-transform hover:-translate-y-1"
      style={{ background: color, boxShadow: "4px 4px 0 var(--ink)" }}
    >
      <div className={`grid gap-5 p-5 ${wide ? "sm:grid-cols-[1fr_1fr]" : ""}`}>
        <div className="flex flex-col justify-between gap-5">
          <div>
            <Shared name={`work-title-${study.slug}`} className="w-fit">
              <h4 className="display text-3xl">{study.shortTitle}</h4>
            </Shared>
            <Summary
              text={study.summary}
              highlight={study.highlight}
              stat={study.stat}
            />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wide underline underline-offset-4">
            View case study →
          </span>
        </div>

        <Shared name={`work-image-${study.slug}`}>
          <MediaSlot
            label={`${study.shortTitle}: image slot`}
            ratio="4 / 3"
            color="var(--ink)"
            src={study.thumbnail}
            alt={`${study.shortTitle} preview`}
          />
        </Shared>
      </div>
    </Link>
  );
}

/**
 * The one-sentence summary. The result reads as part of the sentence: its big
 * number is a tilted ink sticker, the rest gets a highlighter swipe.
 */
function Summary({
  text,
  highlight,
  stat,
}: {
  text: string;
  highlight: string;
  stat: string;
}) {
  const at = text.indexOf(highlight);
  const statAt = highlight.indexOf(stat);
  if (at === -1 || statAt === -1) {
    return (
      <p className="font-body mt-3 max-w-md text-base leading-loose">{text}</p>
    );
  }

  const swipe = {
    backgroundImage:
      "linear-gradient(transparent 30%, var(--paper) 30%, var(--paper) 96%, transparent 96%)",
  };

  return (
    <p className="font-body mt-3 max-w-md text-base leading-loose">
      {text.slice(0, at)}
      <span className="px-0.5 font-semibold box-decoration-clone" style={swipe}>
        {highlight.slice(0, statAt)}
      </span>
      <span
        className="display mx-1 inline-block border-[1.5px] border-ink px-2 text-2xl leading-tight"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          boxShadow: "3px 3px 0 var(--paper)",
          transform: "rotate(-3deg)",
        }}
      >
        {stat}
      </span>
      <span className="px-0.5 font-semibold box-decoration-clone" style={swipe}>
        {highlight.slice(statAt + stat.length)}
      </span>
      {text.slice(at + highlight.length)}
    </p>
  );
}

const FUN_COLORS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-5)",
  "var(--accent-3)",
];

/** Dense card for a "Just for fun" project: enough at a glance, click for the deep dive. */
export function PlaygroundCard({
  project,
  index,
}: {
  project: PlaygroundProject;
  index: number;
}) {
  const color = FUN_COLORS[index % FUN_COLORS.length];

  return (
    <Link
      id={`project-${project.slug}`}
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="paper-card group relative scroll-mt-32 flex flex-col p-4 transition-transform hover:-translate-y-1"
      style={{ transform: `rotate(${index % 2 ? 0.8 : -0.8}deg)` }}
    >
      <span
        className="tape -top-3 left-6 z-10"
        style={{ transform: "rotate(-3deg)" }}
        aria-hidden
      />

      <Shared name={`project-image-${project.slug}`}>
        <MediaSlot
          label={`${project.title}: image slot`}
          ratio="16 / 10"
          color={color}
          src={project.thumbnail}
          alt={project.title}
        />
      </Shared>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="display text-2xl sm:text-3xl">{project.title}</h3>
        <DateTag className="mt-1 shrink-0">{project.year}</DateTag>
      </div>
      <p className="font-body mt-1 text-sm leading-loose text-ink-soft">
        {project.tagline}
      </p>

      {project.metric ? (
        <p
          className="mt-3 self-start border-[1.5px] border-ink px-2.5 py-0.5 text-sm font-semibold"
          style={{ background: color }}
        >
          {project.metric}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>

      <span className="mt-5 text-xs font-semibold uppercase tracking-wide underline underline-offset-4">
        Read the story →
      </span>
    </Link>
  );
}
