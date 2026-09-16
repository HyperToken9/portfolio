import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Comparison } from "@/components/Comparison";
import { notFound } from "next/navigation";
import { Prose, groupBody } from "@/components/Prose";
import {
  Container,
  Pill,
  StampLink,
  MediaSlot,
  PageTransition,
  Shared,
} from "@/components/ui";
import {
  caseStudies,
  site,
  type Measured as MeasuredData,
} from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: site.name };
  return { title: `${study.title} | ${site.name}`, description: study.tagline };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <PageTransition>
      <article className="pt-16 pb-10 sm:pt-20">
        {/* -------------------------------------------------------- HEADER */}
        <Container>
          <header className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-1.5">
                {study.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
              <Shared name={`work-title-${study.slug}`} className="w-fit">
                <h1 className="display mt-5 text-[clamp(2.25rem,11vw,3rem)] sm:text-7xl">
                  {study.shortTitle}
                </h1>
              </Shared>
              <p className="font-body mt-5 max-w-2xl text-xl leading-snug text-ink-soft sm:text-2xl">
                {study.tagline}
              </p>
            </div>

            <dl className="paper-card grid grid-cols-2 gap-4 p-5 lg:grid-cols-1">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  Role
                </dt>
                <dd className="mt-1 text-sm font-semibold">{study.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  Where
                </dt>
                <dd className="mt-1 text-sm font-semibold">{study.org}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  Year
                </dt>
                <dd className="mt-1 text-sm font-semibold">{study.year}</dd>
              </div>
            </dl>
          </header>

          {study.note ? (
            <p
              className="font-body mt-8 border-[1.5px] border-ink px-4 py-3 text-sm leading-loose"
              style={{ background: "var(--accent)" }}
            >
              <strong className="uppercase tracking-wide">Note: </strong>
              {study.note}
            </p>
          ) : null}

          {/* the card image from Experience, grown into the page */}
          <Shared
            name={`work-image-${study.slug}`}
            className={`mt-8 ${study.thumbnail ? "mx-auto max-w-4xl" : ""}`}
          >
            <MediaSlot
              label={`${study.shortTitle}: hero image / video slot`}
              ratio={study.thumbnail ? "4 / 3" : "16 / 7"}
              color="var(--ink)"
              src={study.thumbnail}
              alt={`${study.shortTitle} preview`}
            />
          </Shared>
        </Container>

        {/* --------------------------------------------------------- RESULT */}
        <Container className="mt-14">
          {/* the number on the left, what it means on the right */}
          <div
            className="grid border-[1.5px] border-ink md:grid-cols-[auto_1fr]"
            style={{
              background: "var(--ink)",
              boxShadow: "5px 5px 0 var(--accent)",
            }}
          >
            <div className="p-6 sm:p-8 md:pr-12">
              <p className="text-xs uppercase tracking-[0.18em] text-paper/70">
                The result
              </p>
              <p
                className="display mt-2 text-5xl sm:text-7xl"
                style={{ color: "var(--accent-2)" }}
              >
                {study.metric.value}
              </p>
              <p className="mt-2 text-sm text-paper/80">
                {study.metric.label}
                {study.blocks.some((b) => b.measured) ? (
                  <a
                    href="#how-it-was-measured"
                    aria-label="How it was measured"
                    className="ml-1 hover:text-paper"
                    style={{ color: "var(--accent-2)" }}
                  >
                    ✱
                  </a>
                ) : null}
              </p>
            </div>
            <div className="flex flex-col justify-center gap-5 border-t-[1.5px] border-dashed border-paper/25 p-6 sm:p-8 md:border-t-0 md:border-l-[1.5px] md:pl-12">
              <p className="font-body max-w-xl text-lg leading-relaxed text-paper sm:text-xl">
                {study.summary}
              </p>
              {study.liveHref ? (
                <div>
                  <StampLink
                    href={study.liveHref}
                    external
                    color="var(--accent-2)"
                  >
                    {study.liveLabel ?? "Live tool"} ↗
                  </StampLink>
                </div>
              ) : null}
            </div>
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

            <div className="max-w-2xl space-y-16">
              {study.blocks.map((block, i) => (
                <section
                  key={block.heading}
                  id={slugify(block.heading)}
                  className="scroll-mt-28"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span
                      aria-hidden
                      className="display flex h-12 w-12 shrink-0 items-center justify-center border-[1.5px] border-ink text-2xl sm:h-14 sm:w-14 sm:text-3xl"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "3px 3px 0 var(--ink)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display text-2xl sm:text-3xl">
                      {block.heading}
                    </h2>
                  </div>
                  <div className="font-body space-y-4 text-lg leading-loose">
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
                  </div>

                  {/* supporting media, when a section has it */}
                  {block.comparison ? (
                    <Comparison data={block.comparison} />
                  ) : block.beforeAfter ? (
                    <BeforeAfter data={block.beforeAfter} />
                  ) : block.image ? (
                    <div className="mt-6">
                      <MediaSlot
                        label={block.heading}
                        alt={block.image.alt}
                        src={block.image.src}
                        ratio={block.image.ratio}
                      />
                    </div>
                  ) : null}

                  {block.measured ? <Measured data={block.measured} /> : null}
                </section>
              ))}

              <section id="what-i-learned" className="scroll-mt-28">
                <div
                  className="border-[1.5px] border-ink p-6 sm:p-8"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "5px 5px 0 var(--ink)",
                  }}
                >
                  <p className="hand text-3xl sm:text-4xl">
                    {study.learnedLead ?? "What I learned"}
                  </p>
                  <p className="font-body mt-2 text-xl leading-snug font-semibold sm:text-2xl">
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
            transitionTypes={["nav-forward"]}
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
    </PageTransition>
  );
}

/**
 * How a result was measured: a notebook page taped at the end of its section,
 * folded shut until opened. Built on <details>, so it needs no JavaScript.
 */
function Measured({
  data,
}: {
  data: MeasuredData;
}) {
  return (
    <details
      id="how-it-was-measured"
      className="measured group relative mt-10 ml-2 max-w-lg scroll-mt-28"
      style={{ transform: "rotate(-1deg)" }}
    >
      <span
        className="tape -top-3 left-8 z-10"
        style={{ transform: "rotate(-4deg)" }}
        aria-hidden
      />
      <summary className="paper-card hand flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-xl">
        <span>✱ how was this measured?</span>
        <span
          aria-hidden
          className="font-sans text-base transition-transform duration-500 group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="measured-page border-[1.5px] border-t-0 border-ink px-5 pt-4 pb-8 sm:px-6">
        {/* every row is 2rem tall so the text sits on the ruled lines */}
        <p className="display text-xl" style={{ lineHeight: "2rem" }}>
          How it was measured
        </p>
        <div className="font-body text-base leading-8">
          {data.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <ul className="mt-0 list-disc pl-5">
            {data.scores.map((score) => (
              <li key={score.name}>
                <strong>{score.name}:</strong> {score.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
