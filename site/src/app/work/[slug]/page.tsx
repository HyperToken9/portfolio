import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Pill, StampLink, MediaSlot } from "@/components/ui";
import { caseStudies, site } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: site.name };
  return { title: `${study.title} — ${site.name}`, description: study.tagline };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="py-10">
      {/* -------------------------------------------------------- HEADER */}
      <Container>
        <Link
          href="/#experience"
          className="text-xs font-semibold uppercase tracking-wide underline underline-offset-4"
        >
          ← Back to experience
        </Link>

        <header className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-1.5">
              {study.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
            <h1 className="display mt-5 text-5xl sm:text-7xl">{study.shortTitle}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-snug text-ink-soft sm:text-2xl">
              {study.tagline}
            </p>
          </div>

          <dl className="paper-card grid grid-cols-2 gap-4 p-5 lg:grid-cols-1">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">Role</dt>
              <dd className="mt-1 text-sm font-semibold">{study.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">Where</dt>
              <dd className="mt-1 text-sm font-semibold">{study.org}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">Year</dt>
              <dd className="mt-1 text-sm font-semibold">{study.year}</dd>
            </div>
          </dl>
        </header>

        {study.note ? (
          <p
            className="mt-8 border-[1.5px] border-ink px-4 py-3 text-sm"
            style={{ background: "var(--accent)" }}
          >
            <strong className="uppercase tracking-wide">Note — </strong>
            {study.note}
          </p>
        ) : null}

        <div className="mt-8">
          <MediaSlot
            label={`${study.shortTitle} — hero image / video slot`}
            ratio="16 / 7"
            color="var(--ink)"
          />
        </div>
      </Container>

      {/* --------------------------------------------------------- RESULT */}
      <Container className="mt-14">
        <div
          className="flex flex-wrap items-end justify-between gap-6 border-[1.5px] border-ink p-6 sm:p-8"
          style={{ background: "var(--ink)", boxShadow: "5px 5px 0 var(--accent)" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-paper/70">
              The result
            </p>
            <p className="display mt-2 text-5xl sm:text-7xl" style={{ color: "var(--accent-2)" }}>
              {study.metric.value}
            </p>
            <p className="mt-2 text-sm text-paper/80">{study.metric.label}</p>
          </div>
          {study.liveHref ? (
            <StampLink href={study.liveHref} external color="var(--accent-2)">
              {study.liveLabel ?? "Live tool"} ↗
            </StampLink>
          ) : null}
        </div>
      </Container>

      {/* ---------------------------------------------------------- BODY */}
      <Container className="mt-16">
        <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
          {/* sticky mini-index */}
          <nav className="hidden lg:block lg:sticky lg:top-28">
            <p className="hand mb-3 text-base text-ink-soft">on this page</p>
            <ul className="space-y-2 border-l-[1.5px] border-ink pl-4 text-sm">
              {study.blocks.map((b) => (
                <li key={b.heading}>
                  <a
                    href={`#${slugify(b.heading)}`}
                    className="text-ink-soft hover:text-ink hover:underline underline-offset-4"
                  >
                    {b.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#what-i-learned"
                  className="text-ink-soft hover:text-ink hover:underline underline-offset-4"
                >
                  What I learned
                </a>
              </li>
            </ul>
          </nav>

          <div className="max-w-2xl space-y-12">
            {study.blocks.map((block, i) => (
              <section key={block.heading} id={slugify(block.heading)} className="scroll-mt-28">
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="hand text-xl text-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-2xl sm:text-3xl">{block.heading}</h2>
                </div>
                <div className="space-y-4 text-lg leading-relaxed">
                  {block.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {/* every other section gets room for supporting media */}
                {i % 2 === 1 ? (
                  <div className="mt-6">
                    <MediaSlot
                      label="supporting image / diagram slot"
                      ratio="16 / 9"
                      color="var(--accent-3)"
                    />
                  </div>
                ) : null}
              </section>
            ))}

            <section id="what-i-learned" className="scroll-mt-28">
              <div
                className="border-[1.5px] border-ink p-6 sm:p-8"
                style={{ background: "var(--accent)", boxShadow: "5px 5px 0 var(--ink)" }}
              >
                <p className="hand text-lg">what I learned</p>
                <p className="mt-3 text-xl leading-snug font-semibold sm:text-2xl">
                  {study.learned}
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>

      {/* ----------------------------------------------------------- NEXT */}
      <Container className="mt-20">
        <Link
          href={`/work/${next.slug}`}
          className="paper-card flex items-center justify-between gap-4 p-6 transition-transform hover:-translate-y-1"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Next experience
            </p>
            <p className="display mt-2 text-3xl">{next.shortTitle}</p>
          </div>
          <span className="display text-3xl">→</span>
        </Link>
      </Container>
    </article>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
