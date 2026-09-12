import type { Metadata } from "next";
import { Container, Pill, SectionHeading, MediaSlot } from "@/components/ui";
import { playground, site } from "@/content/portfolio";

export const metadata: Metadata = { title: `Playground — ${site.name}` };

const ACCENTS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-5)",
  "var(--accent-3)",
];

export default function PlaygroundPage() {
  return (
    <Container className="py-10">
      <SectionHeading note="hobby scale, built for the fun of it">
        Just for fun
      </SectionHeading>

      <p className="mb-12 max-w-2xl text-lg text-ink-soft">
        Smaller things I built because I wanted to know how they worked. Less
        involved than the case studies, but they all taught me something.
      </p>

      <div className="space-y-16">
        {playground.map((p, i) => (
          <section key={p.slug} id={p.slug} className="scroll-mt-28">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              {/* media + meta */}
              <div className="lg:sticky lg:top-28">
                <div
                  className="paper-card p-3"
                  style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
                >
                  <MediaSlot
                    label={`${p.title} — image slot`}
                    ratio="4 / 3"
                    color={ACCENTS[i % ACCENTS.length]}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                {p.artifacts ? (
                  <p className="hand mt-4 text-base text-ink-soft">{p.artifacts}</p>
                ) : null}
              </div>

              {/* copy */}
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="display text-4xl sm:text-5xl">{p.title}</h2>
                  <span className="hand text-xl text-ink-soft">{p.year}</span>
                </div>
                <p className="mt-2 text-lg text-ink-soft">{p.tagline}</p>

                {p.metric ? (
                  <p
                    className="mt-5 inline-block border-[1.5px] border-ink px-3 py-1 text-sm font-semibold"
                    style={{ background: ACCENTS[i % ACCENTS.length] }}
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

            {i < playground.length - 1 ? (
              <hr className="mt-16 border-t-[1.5px] border-dashed border-line" />
            ) : null}
          </section>
        ))}
      </div>
    </Container>
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
      <div className="space-y-3 text-base leading-relaxed">{children}</div>
    </div>
  );
}
