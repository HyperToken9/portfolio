// Lines starting with "- " in a row become one bulleted list.
export function groupBody(body: string[]): (string | string[])[] {
  const out: (string | string[])[] = [];
  for (const line of body) {
    if (line.startsWith("- ")) {
      const last = out[out.length - 1];
      if (Array.isArray(last)) last.push(line.slice(2));
      else out.push([line.slice(2)]);
    } else {
      out.push(line);
    }
  }
  return out;
}

// Body text is plain, except for [label](url) links and *italic* notes.
export function Prose({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline decoration-[1.5px] underline-offset-4 hover:bg-accent"
        >
          {link[1]}
        </a>
      );
    }
    const note = part.match(/^\*([^*]+)\*$/);
    return note ? (
      <em key={i} className="text-ink-soft">
        {note[1]}
      </em>
    ) : (
      part
    );
  });
}
