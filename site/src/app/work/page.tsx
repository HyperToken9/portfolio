import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { CaseStudyCard } from "@/components/cards";
import { caseStudies, site } from "@/content/portfolio";

export const metadata: Metadata = { title: `Case Studies — ${site.name}` };

export default function WorkPage() {
  return (
    <Container className="py-10">
      <SectionHeading note="three, in depth">Case studies</SectionHeading>

      <p className="mb-10 max-w-2xl text-lg text-ink-soft">
        The three projects worth the long read. Each one is a problem I picked
        up, what I built, and what it actually changed.
      </p>

      <div className="grid gap-7">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} index={i} />
        ))}
      </div>
    </Container>
  );
}
