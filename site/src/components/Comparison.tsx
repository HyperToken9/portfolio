import type { Comparison as ComparisonData } from "@/content/portfolio";

/**
 * Two options side by side, rated row by row. The first option is the one
 * that lost (muted, ✕), the second the one that won (full ink, ✓). Each gets
 * a tilted stamp. Below `sm` the row label sits above its two cells.
 */
export function Comparison({ data }: { data: ComparisonData }) {
  const [lost, won] = data.options;

  return (
    <div className="relative mt-8 pt-4">
      <div
        role="table"
        aria-label={`${lost.title} compared with ${won.title}`}
        className="grid grid-cols-2 border-[1.5px] border-ink bg-paper-2 sm:grid-cols-[auto_1fr_1fr]"
        style={{ boxShadow: "5px 5px 0 var(--ink)" }}
      >
        <div role="row" className="contents">
          <div className="hidden sm:block" aria-hidden />
          {data.options.map((option, i) => (
            <div
              key={option.title}
              role="columnheader"
              className={`relative px-3 pb-4 pt-6 sm:px-4 ${i === 0 ? LOST : WON}`}
            >
              <span
                className="absolute -top-4 font-display right-2 border-2 border-ink px-2 py-0.5 text-xs tracking-wider sm:right-4 sm:text-sm"
                style={{
                  background: i === 0 ? "var(--accent-5)" : "var(--accent-2)",
                  boxShadow: "2px 2px 0 var(--ink)",
                  transform: `rotate(${i === 0 ? -4 : 3}deg)`,
                }}
              >
                {option.stamp}
              </span>
              <p
                className={`font-mono text-[0.65rem] uppercase tracking-widest sm:text-xs ${i === 0 ? "text-ink-soft" : ""}`}
              >
                {option.eyebrow}
              </p>
              <p className="mt-1 font-display text-base leading-tight sm:text-xl">
                {option.title}
              </p>
            </div>
          ))}
        </div>

        {data.rows.map((row) => (
          <div key={row.label} role="row" className="contents">
            <div
              role="rowheader"
              className="col-span-2 border-t border-line px-3 pb-1 pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft sm:col-span-1 sm:flex sm:items-center sm:py-4 sm:pl-5 sm:pr-4 sm:text-xs"
            >
              {row.label}
            </div>
            {row.cells.map((cell, i) => (
              <div
                key={i}
                role="cell"
                className={`font-body flex gap-2 px-3 pb-3 text-sm sm:items-center sm:gap-3 sm:border-t sm:border-t-line sm:px-4 sm:py-4 sm:text-base ${i === 0 ? LOST : WON}`}
              >
                <span
                  className="font-mono"
                  aria-label={i === 0 ? "worse" : "better"}
                >
                  {i === 0 ? "✕" : "✓"}
                </span>
                <span>{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const LOST = "bg-paper text-ink-soft";
const WON =
  "border-l-[1.5px] border-l-ink bg-[color-mix(in_srgb,var(--accent-2)_12%,white)]";
