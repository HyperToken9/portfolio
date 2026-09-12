"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/portfolio";

export default function Nav() {
  const pathname = usePathname();
  const [section, setSection] = useState("top");

  // Track the section in view: highlight it, and keep the URL hash in step.
  // Without the hash update, clicking a link to a section you already jumped
  // to (then scrolled away from) does nothing, since the URL wouldn't change.
  useEffect(() => {
    const ids = [...nav.map((n) => n.id), "exploring", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const setHash = (hash: string) => {
      if (window.location.hash === hash) return;
      window.history.replaceState(null, "", `${pathname}${hash}`);
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
    return () => observer.disconnect();
  }, [pathname]);

  // Deep-dive pages light up the section they belong to.
  const active = pathname.startsWith("/work/")
    ? "experience"
    : pathname.startsWith("/projects/")
      ? "just-for-fun"
      : section;

  return (
    <div className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="paper-card mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {nav.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="block rounded-full border-[1.25px] px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
                  style={{
                    background: on ? "var(--accent)" : "transparent",
                    borderColor: on ? "var(--ink)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 pr-1">
          <span className="hidden gap-1 sm:flex" aria-hidden>
            {["var(--accent-4)", "var(--accent-2)", "var(--accent-3)", "var(--accent-5)"].map(
              (c) => (
                <span
                  key={c}
                  className="h-3 w-3 rounded-full border border-ink"
                  style={{ background: c }}
                />
              ),
            )}
          </span>
          <Link
            href="#contact"
            className="rounded-full border-[1.25px] border-ink px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
            style={{ background: "var(--accent-2)" }}
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
