import { skills } from "@/content/portfolio";
import { logos, type LogoId } from "@/content/logos";

const TAG_COLORS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-5)",
  "var(--accent-3)",
  "var(--accent-4)",
  "var(--accent)",
];

/** A brand logo in the current text colour. */
export function Logo({
  id,
  className = "",
}: {
  id: LogoId;
  className?: string;
}) {
  const { viewBox, paths } = logos[id];
  return (
    <svg
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Tag({ i, children }: { i: number; children: string }) {
  return (
    <p
      className={`display inline-block px-2 text-xl lowercase ${i === 3 ? "text-paper-2" : ""}`}
      style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}
    >
      {children}
    </p>
  );
}

/**
 * The toolbox: one ruled row per verb, the tag on a soft tint of its colour,
 * each tool on a small chip with its logo.
 */
export function Skills() {
  return (
    <div className="paper-card">
      {skills.map((group, i) => (
        <div
          key={group.verb}
          className={`grid sm:grid-cols-[14rem_1fr] ${i > 0 ? "border-t-[1.5px] border-ink" : ""}`}
        >
          <div
            className="flex items-center border-b-[1.5px] border-line px-5 py-3 sm:border-b-0 sm:border-r-[1.5px] sm:border-r-ink sm:px-6"
            style={{
              background: `color-mix(in srgb, ${TAG_COLORS[i % TAG_COLORS.length]} 22%, white)`,
            }}
          >
            <Tag i={i}>{group.verb}</Tag>
          </div>
          <ul className="flex flex-wrap gap-2.5 px-5 py-4 sm:gap-3 sm:px-6">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2 border-[1.25px] border-ink bg-paper-2 px-3 py-1.5"
                style={{ boxShadow: "2px 2px 0 var(--ink)" }}
              >
                <Logo id={item.logo} className="h-5 w-5 shrink-0" />
                <span className="font-body text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
