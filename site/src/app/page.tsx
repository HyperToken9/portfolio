import {
  Container,
  Pill,
  SectionHeading,
  StampLink,
  MediaSlot,
  PageTransition,
} from "@/components/ui";
import { ExperienceBlock, PlaygroundCard } from "@/components/cards";
import { Skills } from "@/components/Skills";
import {
  hero,
  about,
  caseStudies,
  experiences,
  playground,
  exploring,
  site,
} from "@/content/portfolio";

export default function Home() {
  return (
    <PageTransition>
      {/* ---------------------------------------------------------- HERO */}
      {/* The first screen: the bottom of the name box sits at the middle of
          the screen, and the top of About peeks in below. The top block
          fills half the screen minus what sits above the hero (nav + main's
          top padding: 6rem on phones, 6.75rem from sm) and pins the name to
          its bottom; the section's min height leaves room for the peek. */}
      <section
        id="top"
        className="min-h-[calc(100svh-13rem)] scroll-mt-28 sm:min-h-[calc(100svh-15rem)]"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex min-h-[calc(50svh-6rem)] flex-col justify-end sm:min-h-[calc(50svh-6.75rem)]">
              <div className="relative pt-8">
                <Sticker
                  className="-left-1.5 top-7 hidden sm:block"
                  color="var(--accent-2)"
                  tilt={-5}
                >
                  Made things
                </Sticker>
                <Sticker
                  className="-right-2 top-15 hidden sm:block"
                  color="var(--accent-5)"
                  tilt={4}
                >
                  Broke things
                </Sticker>

                <p className="hand text-2xl text-ink-soft sm:text-4xl">
                  hi, my name is
                </p>

                <h1 className="display mt-4 text-6xl sm:text-8xl">
                  <span
                    className="relative inline-block border-[2px] border-ink px-5 py-7 sm:px-8 sm:py-6"
                    style={{ boxShadow: "6px 6px 0 var(--accent)" }}
                  >
                    Nathan
                    {/* on phones the stickers ride the corners of the name */}
                    <Sticker
                      className="-left-3 -top-7 sm:hidden"
                      color="var(--accent-2)"
                      tilt={-6}
                    >
                      Made things
                    </Sticker>
                    <Sticker
                      className="-bottom-7 -right-3 sm:hidden"
                      color="var(--accent-5)"
                      tilt={4}
                    >
                      Broke things
                    </Sticker>
                  </span>
                </h1>
              </div>
            </div>

            <p className="font-body mt-10 text-2xl leading-snug font-semibold sm:mt-8 sm:text-4xl">
              {hero.headline}
            </p>
            <p className="hand mt-3 text-3xl text-ink-soft sm:mt-4 sm:text-4xl">
              {hero.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
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
              <span
                className="tape -top-3 left-10"
                style={{ transform: "rotate(-3deg)" }}
                aria-hidden
              />
              <p className="hand mb-3 text-lg text-ink-soft">what&apos;s up</p>
              <p className="font-body text-2xl font-semibold leading-snug sm:text-3xl">
                {hero.aboutTeaser}
              </p>
              <div className="font-body mt-6 space-y-3 text-base leading-loose text-ink-soft">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* two polaroids, tilted opposite ways and tucked together */}
              <div className="flex items-start px-2 sm:px-0">
                {photos.map((photo, i) => (
                  <div
                    key={photo.src}
                    className={`paper-card w-1/2 p-2.5 pb-1.5 sm:p-3 sm:pb-2 ${i === 0 ? "relative z-10" : "-ml-3 mt-6"}`}
                    style={{ transform: `rotate(${i === 0 ? -3 : 2.5}deg)` }}
                  >
                    <MediaSlot
                      label={photo.alt}
                      ratio="4 / 5"
                      src={photo.src}
                    />
                    <p className="hand mt-1.5 text-center text-base text-ink-soft">
                      {photo.caption}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="border-[1.5px] border-ink p-5"
                style={{
                  background: "var(--accent)",
                  boxShadow: "4px 4px 0 var(--ink)",
                  transform: "rotate(-1deg)",
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Currently
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug">
                  Full Stack Developer at ZS
                </p>
                <p className="mt-1 text-sm">
                  Manipal Institute of Technology, 2025
                </p>
                <div className="mt-4">
                  <StampLink
                    href={site.resumeHref}
                    external
                    color="var(--paper)"
                  >
                    Résumé
                  </StampLink>
                </div>
              </div>
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
                studies={exp.work.map(
                  (slug) => caseStudies.find((s) => s.slug === slug)!,
                )}
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

      {/* -------------------------------------------------------- SKILLS */}
      <section id="skills" className="scroll-mt-28 py-16">
        <Container>
          <SectionHeading note="the toolbox">What I reach for</SectionHeading>

          <Skills />
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
                style={{
                  transform: `rotate(${i === 1 ? 0 : i === 0 ? -1 : 1}deg)`,
                }}
              >
                <Pill
                  color={
                    ["var(--accent-2)", "var(--accent-5)", "var(--accent)"][
                      i % 3
                    ]
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </Pill>
                <h3 className="text-lg font-semibold leading-snug">
                  {item.label}
                </h3>
                <p className="font-body text-sm leading-loose text-ink-soft">
                  {item.detail}
                </p>
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
    </PageTransition>
  );
}

const photos = [
  {
    src: "/about/photo-1.jpg",
    alt: "Nathan outdoors, in a light blue shirt",
    caption: "that's me",
  },
  {
    src: "/about/photo-2.jpg",
    alt: "Nathan smiling indoors, in a black t-shirt",
    caption: "also me",
  },
];

/**
 * Tilted sticker pill pinned over the hero. Placement and visibility go on a
 * wrapper: `.pill` sets `display` outside Tailwind's layers, so `hidden` on
 * the pill itself would lose.
 */
function Sticker({
  children,
  className,
  color,
  tilt,
}: {
  children: React.ReactNode;
  className: string;
  color: string;
  tilt: number;
}) {
  return (
    <span
      className={`absolute ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span
        className="pill font-sans font-normal"
        style={{ background: color }}
      >
        {children}
      </span>
    </span>
  );
}
