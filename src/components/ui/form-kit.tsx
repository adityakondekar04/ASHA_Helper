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
      <span className="mb-1.5 block text-base font-bold text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>}
    </label>
  );
}

const base =
  "w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-lg text-foreground outline-none focus:border-primary";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-3xl border-2 border-border bg-card p-4 shadow-[0_2px_0_0_var(--color-border)] ${className}`}
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
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-lg font-bold ${
        checked ? on : "border-border bg-card text-muted-foreground"
      }`}
    >
      <span
        className={`grid size-7 shrink-0 place-items-center rounded-lg border-2 ${
          checked ? "border-current bg-current text-card" : "border-border"
        }`}
      >
        {checked && <span className="text-sm text-card">✓</span>}
      </span>
      <span className="min-w-0">{label}</span>
    </button>
  );
}

export function SaveBar({ savedAt, onSave }: { savedAt: number | null; onSave: () => void }) {
  const { t } = useT();
  return (
    <div className="space-y-2 pb-4">
      <p className="text-center text-base font-bold text-accent">
        {savedAt ? `✓ ${t("savedLocally")}` : t("autoSaving")}
      </p>
      <button
        type="button"
        onClick={onSave}
        className="flex w-full items-center justify-center gap-2 rounded-3xl bg-primary px-4 py-4 text-xl font-extrabold text-primary-foreground shadow-[0_4px_0_0_var(--color-border)]"
      >
        <Check className="size-6" /> {t("save")}
      </button>
    </div>
  );
}
