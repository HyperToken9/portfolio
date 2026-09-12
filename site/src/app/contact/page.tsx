import type { Metadata } from "next";
import { Container, SectionHeading, StampLink, MediaSlot } from "@/components/ui";
import { site } from "@/content/portfolio";

export const metadata: Metadata = { title: `Contact — ${site.name}` };

// Links are placeholders until Nathan confirms handles.
const CHANNELS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/…", href: "#" },
  { label: "GitHub", value: "github.com/…", href: "#" },
];

export default function ContactPage() {
  return (
    <Container className="py-10">
      <SectionHeading note="say hi">Contact</SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
        {/* the note-paper block */}
        <div className="paper-card relative p-6 sm:p-9">
          <span className="tape -top-3 left-12" style={{ transform: "rotate(-3deg)" }} aria-hidden />
          <p className="text-2xl leading-snug font-semibold sm:text-3xl">
            Got a project, a hard problem, or just want to say hi?
          </p>
          <p className="mt-3 text-base text-ink-soft">
            I read every message. Email is the fastest way to reach me.
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {CHANNELS.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {c.label}
                </span>
                <a
                  href={c.href}
                  className="text-sm font-semibold underline underline-offset-4"
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
            <StampLink href={site.resumeHref} external color="var(--paper-2)">
              Download résumé
            </StampLink>
          </div>
        </div>

        {/* collage side */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div className="paper-card p-3" style={{ transform: "rotate(2deg)" }}>
            <MediaSlot label="polaroid slot" ratio="1 / 1" color="var(--accent-5)" />
            <p className="hand mt-2 text-center text-sm text-ink-soft">
              something fun goes here
            </p>
          </div>
          <div
            className="border-[1.5px] border-ink p-6"
            style={{ background: "var(--accent-2)", boxShadow: "4px 4px 0 var(--ink)", transform: "rotate(-1.5deg)" }}
          >
            <p className="display text-3xl">Open to work</p>
            <p className="mt-2 text-sm">
              Currently a Software Developer at ZS. Happy to talk about backend,
              ML, and robotics roles.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
