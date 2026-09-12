import Link from "next/link";
import type { ReactNode } from "react";

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
      <a href={href} target="_blank" rel="noreferrer" className={cls} style={style}>
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

/** Placeholder standing in for an image/screenshot that doesn't exist yet. */
export function MediaSlot({
  label,
  ratio = "4 / 3",
  color = "var(--accent-3)",
}: {
  label: string;
  ratio?: string;
  color?: string;
}) {
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
