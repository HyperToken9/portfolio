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
  StampLink,
} from "@/components/ui";
import { Prose, groupBody } from "@/components/Prose";
import { playground, site } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

const ACCENTS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-5)",
  "var(--accent-5)",
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

              {p.links?.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <StampLink key={l.href} href={l.href} external color={accent}>
                      {l.label} ↗
                    </StampLink>
                  ))}
                </div>
              ) : null}

              {p.artifacts ? (
                <p className="hand mt-4 text-base text-ink-soft">
                  {p.artifacts}
                </p>
              ) : null}
            </div>

            {/* copy */}
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="display text-[clamp(2.25rem,11vw,3rem)] sm:text-6xl">{p.title}</h1>
                <DateTag>{p.year}</DateTag>
              </div>
              <p className="font-body mt-2 text-lg text-ink-soft">
                {p.tagline}
              </p>

              {p.metrics?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <p
                      key={m}
                      className="border-[1.5px] border-ink px-3 py-1 text-sm font-semibold"
                      style={{ background: accent }}
                    >
                      {m}
                    </p>
                  ))}
                </div>
              ) : null}

              {p.blocks ? (
                <div className="mt-8 space-y-7">
                  {p.blocks.map((block) => (
                    <Block key={block.heading} label={block.heading}>
                      {groupBody(block.body).map((part) =>
                        Array.isArray(part) ? (
                          <ul key={part[0]} className="list-disc space-y-2 pl-6">
                            {part.map((item) => (
                              <li key={item}>
                                <Prose text={item} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p key={part}>
                            <Prose text={part} />
                          </p>
                        ),
                      )}
                    </Block>
                  ))}
                  <Block label={p.learnedLead ?? "What I learned"}>
                    <p>{p.learned}</p>
                  </Block>
                </div>
              ) : (
                <div className="mt-8 space-y-7">
                  {p.problem ? (
                    <Block label="The problem">
                      <p>{p.problem}</p>
                    </Block>
                  ) : null}
                  {p.built ? (
                    <Block label="What I built">
                      {p.built.map((b) => (
                        <p key={b}>{b}</p>
                      ))}
                    </Block>
                  ) : null}
                  {p.result ? (
                    <Block label="Result">
                      <p>{p.result}</p>
                    </Block>
                  ) : null}
                  <Block label="What I learned">
                    <p>{p.learned}</p>
                  </Block>
                </div>
              )}
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
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </p>
      <div className="font-body space-y-3 text-lg leading-loose">
        {children}
      </div>
    </div>
  );
}
