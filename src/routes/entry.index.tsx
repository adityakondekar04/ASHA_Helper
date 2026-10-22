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
    <AppShell title={t("navEntry")} backTo="/" maxWidth="max-w-xl">
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">{t("entryTitle")}</h2>
        <div className="grid gap-2.5">
          <Choice
            to="/entry/pregnancy"
            icon={<HeartPulse className="size-6" />}
            label={t("pregWoman")}
            sub={t("pregSub")}
          />
          <Choice
            to="/entry/tb"
            icon={<Stethoscope className="size-6" />}
            label={t("tbPatient")}
            sub={t("tbSub")}
          />
          <Choice
            to="/entry/survey"
            icon={<Bug className="size-6" />}
            label={t("survey")}
            sub={t("surveySub")}
          />
          <Choice
            to="/entry/child"
            icon={<Baby className="size-6" />}
            label={t("child")}
            sub={t("childSub")}
          />
        </div>
        <p className="pt-2 text-center text-xs text-muted-foreground">{t("privacyNote")}</p>
      </div>
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
      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-secondary/40 transition-colors"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="block truncate text-base font-semibold text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground truncate">{sub}</span>
      </div>
    </Link>
  );
}
