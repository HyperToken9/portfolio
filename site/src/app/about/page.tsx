import type { Metadata } from "next";
import { Container, Pill, SectionHeading, StampLink, MediaSlot } from "@/components/ui";
import { about, skills, exploring, site } from "@/content/portfolio";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  return (
    <Container className="py-10">
      <SectionHeading note="about me">About</SectionHeading>

      <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* left rail: photo + quick facts */}
        <aside className="grid gap-5">
          <div className="paper-card p-3" style={{ transform: "rotate(-1.5deg)" }}>
            <MediaSlot label="photo slot" ratio="3 / 4" color="var(--accent-3)" />
          </div>
          <div className="paper-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Quick facts
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Now</dt>
                <dd className="text-right font-semibold">Software Developer, ZS</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">School</dt>
                <dd className="text-right font-semibold">MIT Manipal, 2025</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-soft">Team</dt>
                <dd className="text-right font-semibold">Project MANAS</dd>
              </div>
            </dl>
            <div className="mt-5">
              <StampLink href={site.resumeHref} external color="var(--accent-2)">
                Résumé
              </StampLink>
            </div>
          </div>
        </aside>

        {/* main copy */}
        <div className="paper-card relative p-6 sm:p-10">
          <span className="tape -top-3 right-12" style={{ transform: "rotate(4deg)" }} aria-hidden />
          <div className="space-y-5 text-xl leading-relaxed sm:text-2xl">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- SKILLS */}
      <section className="mt-24">
        <SectionHeading note="the toolbox">What I reach for</SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <div key={group.verb} className="paper-card p-5">
              <p
                className="display inline-block px-2 text-xl lowercase"
                style={{
                  background: [
                    "var(--accent)",
                    "var(--accent-2)",
                    "var(--accent-5)",
                    "var(--accent-3)",
                  ][i % 4],
                }}
              >
                {group.verb}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- CURRENTLY EXPLORING */}
      <section className="mt-24">
        <SectionHeading note="as I do, as I learn">{exploring.title}</SectionHeading>

        <ol className="grid gap-4">
          {exploring.items.map((item, i) => (
            <li
              key={item.label}
              className="paper-card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="display text-2xl text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <p className="text-sm text-ink-soft">{item.detail}</p>
                </div>
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-xs font-semibold uppercase tracking-wide underline underline-offset-4"
              >
                {item.linkLabel} ↗
              </a>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
