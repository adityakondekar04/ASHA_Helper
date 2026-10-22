import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { useT } from "@/lib/i18n";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const base =
  "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-base text-foreground outline-none focus:border-primary transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-5 ${className}`}
    >
      {children}
    </section>
  );
}

export function BigToggle({
  checked,
  onChange,
  label,
  tone = "default",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  tone?: "default" | "danger";
}) {
  const on =
    tone === "danger"
      ? "border-destructive bg-destructive/10 text-destructive"
      : "border-accent bg-accent/10 text-accent";
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-base font-medium transition-colors ${
        checked ? on : "border-border bg-card text-muted-foreground"
      }`}
    >
      <span
        className={`grid size-5 shrink-0 place-items-center rounded border ${
          checked ? "border-current bg-current text-card" : "border-border"
        }`}
      >
        {checked && <span className="text-xs text-card">✓</span>}
      </span>
      <span className="min-w-0">{label}</span>
    </button>
  );
}

export function SaveBar({ savedAt, onSave }: { savedAt: number | null; onSave: () => void }) {
  const { t } = useT();
  return (
    <div className="space-y-2 pb-4">
      <p className="text-center text-sm font-medium text-accent">
        {savedAt ? `✓ ${t("savedLocally")}` : t("autoSaving")}
      </p>
      <button
        type="button"
        onClick={onSave}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Check className="size-5" /> {t("save")}
      </button>
    </div>
  );
}
