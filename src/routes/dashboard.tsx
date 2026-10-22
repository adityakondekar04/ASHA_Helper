import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  AlertTriangle,
  Baby,
  BookOpen,
  Calendar,
  CalendarCheck,
  ClipboardPlus,
  Clock,
  HeartPulse,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/form-kit";
import { useT, vaccineLabel } from "@/lib/i18n";
import { buildDueList, entriesThisMonth, useRecords } from "@/lib/store";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "दैनिक वही — आशा सहाय्यक (ASHA Daily Diary)" },
      {
        name: "description",
        content:
          "ASHA worker daily fieldwork diary: Today's ANC visits, child immunization due lists, high-risk alerts, and offline records.",
      },
      { property: "og:title", content: "दैनिक वही — ASHA Helper" },
      {
        property: "og:description",
        content: "Marathi-first, offline-first daily work diary for ASHA workers in Maharashtra.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t, lang } = useT();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  const records = useRecords();
  const due = buildDueList(records);
  const mothers = records.filter((r) => r.kind === "pregnancy").length;
  const children = records.filter((r) => r.kind === "child").length;

  if (isLoading) {
    return (
      <AppShell title={t("navDiary")}>
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell title={t("navDiary")} maxWidth="max-w-2xl">
      <div className="space-y-4">
        {/* Today's Tasks Card */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <CalendarCheck className="size-5 text-primary" />
              <span>{t("todayTasks")}</span>
            </h2>
            {due.length > 0 && (
              <Badge variant="secondary" className="text-xs font-medium">
                {due.length} {t("statPending")}
              </Badge>
            )}
          </div>

          {due.length === 0 ? (
            <div className="rounded-lg bg-secondary/50 px-4 py-6 text-center text-secondary-foreground">
              <p className="text-sm font-semibold">{t("noTasks")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("noTasksDesc")}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {due.slice(0, 8).map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
                    item.highRisk
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-base font-semibold text-foreground">
                        {item.personName}
                      </p>
                      {item.highRisk && (
                        <span className="rounded-full bg-destructive/15 text-destructive px-1.5 py-0.2 text-xs font-medium flex items-center gap-1">
                          <AlertTriangle className="size-3" /> {t("riskWarningTag")}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      {item.type === "anc"
                        ? `${t("dueAnc")} · ${item.label}`
                        : `${t("dueImm")} · ${vaccineLabel(item.vaccineCode!, lang)}`}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
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
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3.5 py-2.5 text-xs font-medium text-destructive">
              <AlertTriangle className="size-4 shrink-0" />
              <span>
                {t("highRisk")} — {t("phcReferralUrgent")}
              </span>
            </div>
          )}
        </Card>

        {/* 2x2 Field Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <Stat
            value={entriesThisMonth(records)}
            label={t("statVisits")}
            icon={<Calendar className="size-5 text-primary" />}
          />
          <Stat
            value={due.length}
            label={t("statPending")}
            icon={<Clock className="size-5 text-primary" />}
          />
          <Stat
            value={mothers}
            label={t("statMothers")}
            icon={<HeartPulse className="size-5 text-primary" />}
          />
          <Stat
            value={children}
            label={t("statChildren")}
            icon={<Baby className="size-5 text-primary" />}
          />
        </div>

        {/* Action Navigation Links */}
        <div className="grid gap-2.5">
          <NavButton
            to="/entry"
            icon={<ClipboardPlus className="size-5" />}
            label={t("navEntry")}
            note={t("entrySubDesc")}
          />
          <NavButton
            to="/incentive"
            icon={<IndianRupee className="size-5" />}
            label={t("navIncentive")}
            note={t("incentiveTrackerSub")}
          />
          <NavButton
            to="/info"
            icon={<BookOpen className="size-5" />}
            label={t("navInfo")}
            note={t("infoSub")}
          />
          <NavButton
            to="/info/programs"
            icon={<HeartPulse className="size-5" />}
            label={t("infoPrograms")}
            note={t("infoProgramsSub")}
          />
        </div>

        {/* Reassurance Footer */}
        <div className="rounded-xl border border-border bg-card p-3.5 text-center">
          <p className="text-xs font-medium text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="size-4 text-accent" />
            <span>{t("privacyNote")}</span>
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-primary">{value}</p>
        {icon && <span className="opacity-75">{icon}</span>}
      </div>
      <p className="text-xs font-medium text-muted-foreground mt-0.5">{label}</p>
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
    <div className="flex items-center gap-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">{label}</span>
        {note && <span className="block text-xs text-muted-foreground truncate">{note}</span>}
      </div>
    </div>
  );

  const cls =
    "block w-full rounded-xl border border-border bg-card p-3.5 text-left hover:bg-secondary/40 transition-colors";

  if (!to) return <div className={`${cls} opacity-60`}>{inner}</div>;
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}
