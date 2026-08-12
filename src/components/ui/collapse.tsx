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
    <section className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[0_2px_0_0_var(--color-border)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 text-left"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-xl text-primary">
          {icon ?? "•"}
        </span>
        <span className="min-w-0 text-lg font-extrabold">{title}</span>
        <ChevronDown
          className={`size-6 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="border-t-2 border-border px-4 py-4">{children}</div>}
    </section>
  );
}

/** Simple bulleted checklist used across the reference pages. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-base leading-snug">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 border-border text-sm">
            ☐
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
