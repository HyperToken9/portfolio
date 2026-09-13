import { Container, StampLink, MediaSlot } from "@/components/ui";
import { site } from "@/content/portfolio";

const CHANNELS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/nathan-adrian",
    href: "https://www.linkedin.com/in/nathan-adrian/",
  },
  {
    label: "GitHub",
    value: "github.com/HyperToken9",
    href: "https://github.com/HyperToken9",
  },
];

/** Contact lives here, so every page ends with a way to reach Nathan. */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-24 scroll-mt-28 border-t-[1.5px] border-ink bg-paper-2/60"
    >
      <Container className="py-16">
        <header className="mb-8">
          <p className="hand mb-2 text-base text-ink-soft">say hi</p>
          <h2 className="display text-4xl sm:text-6xl">Contact</h2>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
          <div className="grid gap-8">
            {/* the note-paper block */}
            <div className="paper-card relative p-6 sm:p-9">
              <span
                className="tape -top-3 left-12"
                style={{ transform: "rotate(-3deg)" }}
                aria-hidden
              />
              <p className="font-body text-2xl leading-snug font-semibold sm:text-3xl">
                Want to reach out?
              </p>

              <ul className="mt-6 divide-y divide-line border-y border-line">
                {CHANNELS.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                      {c.label}
                    </span>
                    <a
                      href={c.href}
                      className="break-all text-right text-sm font-semibold underline underline-offset-4"
                    >
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <StampLink href={`mailto:${site.email}`} external>
                  Send an email
                </StampLink>
                <StampLink
                  href={site.resumeHref}
                  external
                  color="var(--paper-2)"
                >
                  Download résumé
                </StampLink>
              </div>
            </div>

            <div
              className="border-[1.5px] border-ink p-6"
              style={{
                background: "var(--accent-2)",
                boxShadow: "4px 4px 0 var(--ink)",
                transform: "rotate(-1deg)",
              }}
            >
              <p className="display text-3xl">Open to work</p>
              <p className="font-body mt-2 text-sm leading-loose">
                Currently a Full Stack Developer at ZS. Happy to talk about
                backend, ML, and robotics roles.
              </p>
            </div>
          </div>

          {/* collage side */}
          <div
            className="paper-card mx-auto w-full max-w-md p-3 pb-2"
            style={{ transform: "rotate(2deg)" }}
          >
            <MediaSlot
              label="Nathan and four friends stacked into a human tower, all reading books"
              ratio="4 / 3"
              src="/contact/footer-photo.jpg"
            />
            <p className="hand mt-2 text-center text-base text-ink-soft">
              group study
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-8">
        <p className="text-xs text-ink-soft">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
