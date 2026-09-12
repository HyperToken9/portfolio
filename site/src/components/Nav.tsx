"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/portfolio";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="paper-card mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-full border-[1.25px] px-3 py-1 text-xs font-semibold uppercase tracking-wide whitespace-nowrap sm:text-sm"
                  style={{
                    background: active ? "var(--accent)" : "transparent",
                    borderColor: active ? "var(--ink)" : "transparent",
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
            href="/contact"
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
