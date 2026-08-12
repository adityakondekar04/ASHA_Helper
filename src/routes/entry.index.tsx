import { createFileRoute, Link } from "@tanstack/react-router";
import { Baby, Bug, HeartPulse, Stethoscope } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/entry/")({
  head: () => ({
    meta: [
      { title: "नोंद करा — Data entry for ASHA workers" },
      {
        name: "description",
        content:
          "Pick one simple form at a time: pregnant woman registration or child registration. Everything auto-saves offline on your phone.",
      },
      { property: "og:title", content: "नोंद करा — ASHA data entry" },
      {
        property: "og:description",
        content: "Short, auto-saving forms for pregnancy and child records.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntryIndex,
});

function EntryIndex() {
  const { t } = useT();
  return (
    <AppShell title={t("navEntry")} backTo="/">
      <h2 className="mb-4 text-xl font-extrabold">{t("entryTitle")}</h2>
      <div className="grid gap-3">
        <Choice
          to="/entry/pregnancy"
          icon={<HeartPulse className="size-8" />}
          label={t("pregWoman")}
          sub={t("pregSub")}
        />
        <Choice
          to="/entry/tb"
          icon={<Stethoscope className="size-8" />}
          label={t("tbPatient")}
          sub={t("tbSub")}
        />
        <Choice
          to="/entry/survey"
          icon={<Bug className="size-8" />}
          label={t("survey")}
          sub={t("surveySub")}
        />
        <Choice
          to="/entry/child"
          icon={<Baby className="size-8" />}
          label={t("child")}
          sub={t("childSub")}
        />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t("privacyNote")}</p>
    </AppShell>
  );
}

function Choice({
  to,
  icon,
  label,
  sub,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link
      to={to}
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl border-2 border-border bg-card p-5 shadow-[0_3px_0_0_var(--color-border)]"
    >
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-2xl font-extrabold">{label}</span>
        <span className="block text-base text-muted-foreground">{sub}</span>
      </span>
    </Link>
  );
}
