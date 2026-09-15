"use client";

import Image from "next/image";
import { useState } from "react";
import type { BeforeAfter as BeforeAfterData } from "@/content/portfolio";

/**
 * Two same-sized images stacked, with a divider to drag between them: the
 * "before" on the left of the line, the "after" on the right. A transparent
 * range input covers the frame, so it works by mouse, touch and keyboard.
 */
export function BeforeAfter({ data }: { data: BeforeAfterData }) {
  // starts mostly on "before", with a sliver of "after" showing
  const [pos, setPos] = useState(85);
  const sizes = "(min-width: 1024px) 672px, 100vw";

  return (
    <figure className="mt-6">
      <div className="mb-2 flex justify-between" aria-hidden>
        <span className="pill">Before</span>
        <span className="pill" style={{ background: "var(--accent-2)" }}>
          After
        </span>
      </div>
      <div
        className="relative overflow-hidden border-[1.5px] border-ink bg-paper-2 select-none"
        style={{ aspectRatio: data.ratio, boxShadow: "5px 5px 0 var(--ink)" }}
      >
        <Image
          src={data.after.src}
          alt={data.after.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={data.before.src}
            alt={data.before.alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>

        {/* the divider and its handle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-ink"
          style={{ left: `${pos}%` }}
        >
          <span
            className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-ink text-sm font-semibold"
            style={{ background: "var(--accent)", boxShadow: "2px 2px 0 var(--ink)" }}
          >
            ⇆
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Slide between before and after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="hand mt-3 text-lg text-ink-soft">
        {data.caption}
      </figcaption>
    </figure>
  );
}
