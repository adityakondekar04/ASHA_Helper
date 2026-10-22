import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/** Big, tap-friendly collapsible section. Closed by default to keep screens clean. */
export function Collapse({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/40 transition-colors cursor-pointer"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-base text-primary">
          {icon ?? "•"}
        </span>
        <span className="min-w-0 text-base font-semibold text-foreground leading-normal">{title}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="border-t border-border px-4 py-4">{children}</div>}
    </section>
  );
}

/** Simple bulleted checklist used across the reference pages. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-border text-xs text-muted-foreground">
            ☐
          </span>
          <span className="min-w-0 text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
