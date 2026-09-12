import { Container, Pill, SectionHeading, StampLink, MediaSlot } from "@/components/ui";
import { ExperienceBlock, PlaygroundCard } from "@/components/cards";
import {
  hero,
  about,
  skills,
  caseStudies,
  experiences,
  playground,
  exploring,
  site,
} from "@/content/portfolio";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section id="top" className="scroll-mt-28 pb-20 pt-10 sm:pt-16">
        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span
              className="pill absolute -left-2 top-0 hidden sm:inline-flex"
              style={{ background: "var(--accent-2)", transform: "rotate(-5deg)" }}
            >
              Made things
            </span>
            <span
              className="pill absolute -right-2 top-6 hidden sm:inline-flex"
              style={{ background: "var(--accent-5)", transform: "rotate(4deg)" }}
            >
              Broke things
            </span>

            <p className="hand text-lg text-ink-soft">hi, my name is</p>

            <h1 className="display mt-2 text-6xl sm:text-8xl">
              <span
                className="inline-block border-[2px] border-ink px-4 py-1"
                style={{ boxShadow: "6px 6px 0 var(--accent)" }}
              >
                Nathan
              </span>
            </h1>

            <p className="mt-8 text-2xl leading-snug font-semibold sm:text-4xl">
              {hero.headline}
            </p>
            <p className="hand mt-3 text-xl text-ink-soft sm:text-2xl">
              {hero.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <StampLink href="#experience">See the work</StampLink>
              <StampLink href="#contact" color="var(--paper-2)">
                Contact me
              </StampLink>
              <StampLink href={site.resumeHref} external color="var(--paper-2)">
                Résumé
              </StampLink>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- ABOUT */}
      <section id="about" className="scroll-mt-28 py-16">
        <Container>
          <SectionHeading note="about me">About</SectionHeading>

          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="paper-card relative p-6 sm:p-9">
              <span className="tape -top-3 left-10" style={{ transform: "rotate(-3deg)" }} aria-hidden />
              <p className="hand mb-3 text-lg text-ink-soft">what&apos;s up</p>
              <p className="text-2xl font-semibold leading-snug sm:text-3xl">
                {hero.aboutTeaser}
              </p>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-ink-soft">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="paper-card p-3" style={{ transform: "rotate(1.5deg)" }}>
                <MediaSlot label="photo slot" ratio="1 / 1" color="var(--accent-3)" />
                <p className="hand mt-2 text-center text-sm text-ink-soft">
                  a photo goes here
                </p>
              </div>
              <div
                className="border-[1.5px] border-ink p-5"
                style={{ background: "var(--accent)", boxShadow: "4px 4px 0 var(--ink)", transform: "rotate(-1deg)" }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Currently
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug">
                  Software Developer at ZS
                </p>
                <p className="mt-1 text-sm">Manipal Institute of Technology, 2025</p>
                <div className="mt-4">
                  <StampLink href={site.resumeHref} external color="var(--paper)">
                    Résumé
                  </StampLink>
                </div>
              </div>
            </div>
          </div>

          {/* skills live inside About, so they're seen without a click */}
          <div className="mt-16">
            <p className="hand mb-2 text-base text-ink-soft">the toolbox</p>
            <h3 className="display mb-6 text-3xl sm:text-4xl">What I reach for</h3>

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
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- EXPERIENCE */}
      <section id="experience" className="scroll-mt-28 py-16">
        <Container>
          <SectionHeading note="where I've done the real work">
            Experience
          </SectionHeading>

          <div className="grid gap-7">
            {experiences.map((exp, i) => (
              <ExperienceBlock
                key={exp.place}
                experience={exp}
                studies={exp.work.map((slug) => caseStudies.find((s) => s.slug === slug)!)}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- JUST FOR FUN */}
      <section id="just-for-fun" className="scroll-mt-28 py-16">
        <Container>
          <SectionHeading note="smaller, for the fun of it">
            Just for fun
          </SectionHeading>

          <div className="grid gap-7 sm:grid-cols-2">
            {playground.map((p, i) => (
              <PlaygroundCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------- CURRENTLY EXPLORING */}
      <section id="exploring" className="scroll-mt-28 py-16">
        <Container>
          <SectionHeading note={hero.subhead}>{exploring.title}</SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            {exploring.items.map((item, i) => (
              <div
                key={item.label}
                className="paper-card flex flex-col gap-3 p-5"
                style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -1 : 1}deg)` }}
              >
                <Pill
                  color={
                    ["var(--accent-2)", "var(--accent-5)", "var(--accent)"][i % 3]
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </Pill>
                <h3 className="text-lg font-semibold leading-snug">{item.label}</h3>
                <p className="text-sm text-ink-soft">{item.detail}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-xs font-semibold uppercase tracking-wide underline underline-offset-4"
                >
                  {item.linkLabel} ↗
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
