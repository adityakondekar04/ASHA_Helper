import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BookOpen, ClipboardPlus, IndianRupee, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT, vaccineLabel } from "@/lib/i18n";
import { buildDueList, entriesThisMonth, useRecords } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "आशा सहाय्यक — ASHA Helper for Maharashtra field workers" },
      {
        name: "description",
        content:
          "A simple offline-first helper for ASHA workers: today's ANC and immunization due list, pregnancy and child records, all saved on your own phone.",
      },
      { property: "og:title", content: "आशा सहाय्यक — ASHA Helper" },
      {
        property: "og:description",
        content:
          "Marathi-first, offline-first daily work diary for ASHA workers. No location tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "manifest", href: "/manifest.json" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, lang } = useT();
  const records = useRecords();
  const due = buildDueList(records);
  const mothers = records.filter((r) => r.kind === "pregnancy").length;
  const children = records.filter((r) => r.kind === "child").length;

  return (
    <AppShell>
      <p className="mb-4 text-base text-muted-foreground">{t("tagline")}</p>

      <Card className="mb-4">
        <h2 className="mb-3 text-xl font-extrabold">{t("todayTasks")}</h2>
        {due.length === 0 ? (
          <p className="rounded-2xl bg-secondary px-4 py-6 text-center text-lg font-bold text-secondary-foreground">
            {t("noTasks")}
          </p>
        ) : (
          <ul className="space-y-2">
            {due.slice(0, 6).map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border-2 border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold">{item.personName}</p>
                  <p className="truncate text-base text-muted-foreground">
                    {item.type === "anc"
                      ? `${t("dueAnc")} · ${item.label}`
                      : `${t("dueImm")} · ${vaccineLabel(item.vaccineCode!, lang)}`}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-bold ${
                    item.days < 0
                      ? "bg-destructive/15 text-destructive"
                      : item.days === 0
                        ? "bg-primary/15 text-primary"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {item.days < 0
                    ? t("overdue")
                    : item.days === 0
                      ? t("dueToday")
                      : `${item.days} ${t("inDays")}`}
                </span>
              </li>
            ))}
          </ul>
        )}
        {due.some((d) => d.highRisk) && (
          <p className="mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-base font-bold text-destructive">
            <AlertTriangle className="size-5 shrink-0" />
            {t("highRisk")}
          </p>
        )}
      </Card>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <Stat value={entriesThisMonth(records)} label={t("statVisits")} />
        <Stat value={due.length} label={t("statPending")} />
        <Stat value={mothers} label={t("statMothers")} />
        <Stat value={children} label={t("statChildren")} />
      </div>

      <div className="grid gap-3">
        <NavButton to="/entry" icon={<ClipboardPlus className="size-7" />} label={t("navEntry")} />
        <NavButton
          to="/info"
          icon={<BookOpen className="size-7" />}
          label={t("navInfo")}
          note={t("infoSub")}
        />
        <NavButton icon={<Users className="size-7" />} label={t("navList")} note={t("comingSoon")} />
        <NavButton
          icon={<IndianRupee className="size-7" />}
          label={t("navIncentive")}
          note={t("comingSoon")}
        />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">{t("privacyNote")}</p>
    </AppShell>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-3xl border-2 border-border bg-card p-4">
      <p className="text-3xl font-extrabold text-primary">{value}</p>
      <p className="text-base text-muted-foreground">{label}</p>
    </div>
  );
}

function NavButton({
  to,
  icon,
  label,
  note,
}: {
  to?: string;
  icon: React.ReactNode;
  label: string;
  note?: string;
}) {
  const inner = (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xl font-extrabold">{label}</span>
        {note && <span className="block text-base text-muted-foreground">{note}</span>}
      </span>
    </div>
  );

  const cls =
    "block w-full rounded-3xl border-2 border-border bg-card p-4 text-left shadow-[0_3px_0_0_var(--color-border)]";

  if (!to) return <div className={`${cls} opacity-60`}>{inner}</div>;
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}
