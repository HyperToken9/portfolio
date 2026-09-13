import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "@/components/LoopVideo";
import { ViewTransition, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps a page so it slides with the navigation: links tagged `nav-forward`
 * (into a case study or project) push it left, `nav-back` pushes it right.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const slide = {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  };
  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * Marks an element that morphs into its twin with the same name on the next page.
 * The name is set in CSS rather than with a named <ViewTransition>: React only
 * pairs elements that are on screen when it commits, and the page it opens is
 * still scrolled to where the card was, so the pair would never form.
 */
export function Shared({
  name,
  className = "",
  children,
}: {
  name: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={
        {
          viewTransitionName: name,
          viewTransitionClass: "morph",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Sticker-style label. */
export function Pill({
  children,
  color,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`pill ${className}`}
      style={color ? { background: color } : undefined}
    >
      {children}
    </span>
  );
}

/** A date or year, as a solid label that reads on any card color. */
export function DateTag({
  children,
  color = "var(--paper-2)",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border-[1.5px] border-ink px-2.5 py-1 text-sm font-semibold tabular-nums whitespace-nowrap text-ink ${className}`}
      style={{ background: color, boxShadow: "2px 2px 0 var(--ink)" }}
    >
      {children}
    </span>
  );
}

/** A piece of paper pasted onto the page, optionally taped and tilted. */
export function PaperCard({
  children,
  tape = false,
  tilt = 0,
  className = "",
}: {
  children: ReactNode;
  tape?: boolean;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={`paper-card relative ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {tape ? (
        <span
          className="tape left-1/2 -top-3 -translate-x-1/2"
          style={{ transform: "translateX(-50%) rotate(-2.5deg)" }}
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}

/** Big stencil section heading with a small annotation above it. */
export function SectionHeading({
  children,
  note,
  id,
}: {
  children: ReactNode;
  note?: string;
  id?: string;
}) {
  return (
    <header id={id} className="mb-8 scroll-mt-28">
      {note ? (
        <p className="hand mb-2 text-base text-ink-soft">{note}</p>
      ) : null}
      <h2 className="display text-4xl sm:text-6xl">{children}</h2>
    </header>
  );
}

/** Boxed link that reads like a rubber stamp. */
export function StampLink({
  href,
  children,
  external = false,
  color = "var(--accent)",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  color?: string;
}) {
  const cls =
    "inline-flex items-center gap-2 border-[1.5px] border-ink px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-transform hover:-translate-y-0.5";
  const style = { background: color, boxShadow: "3px 3px 0 var(--ink)" };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

/** Page-width wrapper. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Image box with the site's ink border. Without `src` it is a placeholder
 * standing in for an image/screenshot that doesn't exist yet.
 */
export function MediaSlot({
  label,
  ratio = "4 / 3",
  color = "var(--accent-3)",
  src,
  alt = label,
}: {
  label: string;
  ratio?: string;
  color?: string;
  src?: string;
  alt?: string;
}) {
  if (src?.endsWith(".mp4")) {
    return (
      <div
        className="relative overflow-hidden border-[1.5px] border-ink bg-paper-2"
        style={{ aspectRatio: ratio }}
      >
        <LoopVideo
          src={src}
          poster={src.replace(/\.mp4$/, "-poster.jpg")}
          label={alt}
        />
      </div>
    );
  }
  if (src) {
    return (
      <div
        className="relative overflow-hidden border-[1.5px] border-ink"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center border-[1.5px] border-ink text-center"
      style={{
        aspectRatio: ratio,
        background: `repeating-linear-gradient(45deg, ${color}22, ${color}22 10px, transparent 10px, transparent 20px)`,
      }}
    >
      <span className="hand px-4 text-sm text-ink-soft">{label}</span>
    </div>
  );
}
