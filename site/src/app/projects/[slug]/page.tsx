import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Pill,
  MediaSlot,
  PageTransition,
  Shared,
  DateTag,
} from "@/components/ui";
import { playground, site } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

const ACCENTS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-5)",
  "var(--accent-3)",
];

export function generateStaticParams() {
  return playground.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = playground.find((p) => p.slug === slug);
  if (!project) return { title: site.name };
  return {
    title: `${project.title} | ${site.name}`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = playground.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = playground[index];
  const next = playground[(index + 1) % playground.length];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <PageTransition>
      <article className="pt-16 pb-10 sm:pt-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            {/* media + meta */}
            <div className="lg:sticky lg:top-28">
              <div
                className="paper-card p-3"
                style={{ transform: `rotate(${index % 2 ? 1 : -1}deg)` }}
              >
                <Shared name={`project-image-${p.slug}`}>
                  <MediaSlot
                    label={`${p.title}: image slot`}
                    ratio={p.thumbnail ? "16 / 10" : "4 / 3"}
                    color={accent}
                    src={p.thumbnail}
                    alt={p.title}
                  />
                </Shared>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              {p.artifacts ? (
                <p className="hand mt-4 text-base text-ink-soft">
                  {p.artifacts}
                </p>
              ) : null}
            </div>

            {/* copy */}
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="display text-5xl sm:text-6xl">{p.title}</h1>
                <DateTag>{p.year}</DateTag>
              </div>
              <p className="font-body mt-2 text-lg text-ink-soft">
                {p.tagline}
              </p>

              {p.metric ? (
                <p
                  className="mt-5 inline-block border-[1.5px] border-ink px-3 py-1 text-sm font-semibold"
                  style={{ background: accent }}
                >
                  {p.metric}
                </p>
              ) : null}

              <div className="mt-8 space-y-7">
                <Block label="The problem">
                  <p>{p.problem}</p>
                </Block>
                <Block label="What I built">
                  {p.built.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </Block>
                <Block label="Result">
                  <p>{p.result}</p>
                </Block>
                <Block label="What I learned">
                  <p>{p.learned}</p>
                </Block>
              </div>
            </div>
          </div>
        </Container>

        {/* ----------------------------------------------------------- NEXT */}
        <Container className="mt-20">
          <Link
            href={`/projects/${next.slug}`}
            transitionTypes={["nav-forward"]}
            className="paper-card flex items-center justify-between gap-4 p-6 transition-transform hover:-translate-y-1"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Next project
              </p>
              <p className="display mt-2 text-3xl">{next.title}</p>
            </div>
            <span className="display text-3xl">→</span>
          </Link>
        </Container>
      </article>
    </PageTransition>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </p>
      <div className="font-body space-y-3 text-base leading-loose">
        {children}
      </div>
    </div>
  );
}
