import { Container, StampLink } from "@/components/ui";
import { site } from "@/content/portfolio";

export default function Footer() {
  return (
    <footer className="mt-24 border-t-[1.5px] border-ink bg-paper-2/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-3xl">Let&apos;s talk.</p>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            Got a project, a hard problem, or just want to say hi? I read every
            message.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StampLink href={`mailto:${site.email}`} external>
            Email
          </StampLink>
          <StampLink href="/contact" color="var(--accent-2)">
            Contact
          </StampLink>
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
