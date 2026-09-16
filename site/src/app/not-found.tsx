import type { Metadata } from "next";
import { Container, StampLink } from "@/components/ui";
import { site } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
};

/** Any URL that doesn't exist lands here, with a way back home. */
export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div
          className="paper-card relative mx-auto max-w-xl p-8 text-center sm:p-12"
          style={{ transform: "rotate(-1deg)" }}
        >
          <span
            className="tape -top-3 left-1/2 -translate-x-1/2"
            style={{ transform: "rotate(-3deg)" }}
            aria-hidden
          />
          <p className="hand text-xl text-ink-soft sm:text-2xl">
            wrong turn
          </p>
          <h1 className="display mt-2 text-[clamp(5rem,28vw,9rem)]">404</h1>
          <p className="font-body mt-4 text-lg leading-relaxed">
            This page doesn&apos;t exist, or it moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <StampLink href="/">← Back home</StampLink>
            <StampLink href="/#experience" color="var(--accent-2)">
              See my work
            </StampLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
