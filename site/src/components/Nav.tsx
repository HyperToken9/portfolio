"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/portfolio";
import { whenScrollSettles } from "@/components/scrollIdle";

export default function Nav() {
  const pathname = usePathname();
  const [section, setSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Track the section in view: highlight it, and keep the URL hash in step.
  // Without the hash update, clicking a link to a section you already jumped
  // to (then scrolled away from) does nothing, since the URL wouldn't change.
  useEffect(() => {
    const ids = [...nav.map((n) => n.id), "exploring", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // The URL update goes through Next's router, so it waits until scrolling
    // stops rather than landing mid-scroll.
    let cancelHash = () => {};
    const setHash = (hash: string) => {
      cancelHash();
      cancelHash = whenScrollSettles(() => {
        if (window.location.hash === hash) return;
        window.history.replaceState(null, "", `${pathname}${hash}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const hash = `#${e.target.id}`;
          if (e.isIntersecting) {
            setSection(e.target.id);
            setHash(e.target.id === "top" ? "" : hash);
          } else if (pathname !== "/" && window.location.hash === hash) {
            // Deep-dive pages only have the contact footer; clear it on the way out.
            setHash("");
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => {
      cancelHash();
      observer.disconnect();
    };
  }, [pathname]);

  // Close the menu on outside taps (which covers tapping a card to leave the
  // page) and Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Deep-dive pages swap the section links for one way back to the card
  // they were opened from.
  const [, kind, slug] = pathname.split("/");
  const back =
    kind === "work"
      ? { href: `/#work-${slug}`, label: "Back to experience" }
      : kind === "projects"
        ? { href: `/#project-${slug}`, label: "Back to just for fun" }
        : null;
  const active = section;

  return (
    <div
      className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
      style={{ viewTransitionName: "site-nav" }}
    >
      {/* full bar: tablets and up */}
      <nav
        aria-label="Main"
        className="paper-card mx-auto hidden max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:flex"
      >
        {back ? (
          <BackLink {...back} />
        ) : (
          <ul className="flex items-center gap-1 overflow-x-auto">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="block rounded-full border-[1.25px] px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
                  style={pillStyle(active === item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 pr-1">
          <span className="hidden gap-1 sm:flex" aria-hidden>
            {[
              "var(--accent-4)",
              "var(--accent-2)",
              "var(--accent-3)",
              "var(--accent-5)",
            ].map((c) => (
              <span
                key={c}
                className="h-3 w-3 rounded-full border border-ink"
                style={{ background: c }}
              />
            ))}
          </span>
          <ContactLink />
        </div>
      </nav>

      {/* phones: a small pill in the corner that opens the menu */}
      <div
        ref={menuRef}
        className={`relative w-fit sm:hidden ${back ? "" : "ml-auto"}`}
      >
        <nav
          aria-label="Main"
          className="paper-card flex items-center gap-1.5 rounded-full px-2 py-2"
        >
          {back ? (
            <BackLink {...back} />
          ) : (
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border-[1.25px] px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={pillStyle(menuOpen)}
            >
              <MenuIcon open={menuOpen} />
              Menu
            </button>
          )}
          <ContactLink />
        </nav>

        {menuOpen ? (
          <ul
            id="nav-menu"
            className="paper-card nav-drop absolute right-0 top-full mt-2 w-56 origin-top-right p-2"
          >
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === item.id ? "true" : undefined}
                  className="block rounded-full border-[1.25px] px-4 py-2.5 text-sm font-semibold uppercase tracking-wide"
                  style={pillStyle(active === item.id)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function pillStyle(on: boolean) {
  return {
    background: on ? "var(--accent)" : "transparent",
    borderColor: on ? "var(--ink)" : "transparent",
  };
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-back"]}
      className="block rounded-full border-[1.25px] border-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
      style={{ background: "var(--accent)" }}
    >
      ← {label}
    </Link>
  );
}

function ContactLink() {
  return (
    <Link
      href="#contact"
      className="rounded-full border-[1.25px] border-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
      style={{ background: "var(--accent-2)" }}
    >
      Contact
    </Link>
  );
}

/** Three lines that fold into an × while the menu is open. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      aria-hidden
      className="shrink-0"
    >
      {open ? (
        <path
          d="M2 1l10 10M12 1L2 11"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      ) : (
        <path
          d="M0 1h14M0 6h14M0 11h14"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      )}
    </svg>
  );
}
