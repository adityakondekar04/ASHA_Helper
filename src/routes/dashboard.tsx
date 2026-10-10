import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Baby,
  BookOpen,
  Calendar,
  CalendarCheck,
  ClipboardPlus,
  Clock,
  Compass,
  FileSpreadsheet,
  HeartPulse,
  IndianRupee,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
  UserCheck,
  Users,
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
  const { user, logout } = useAuth();
  const records = useRecords();
  const due = buildDueList(records);
  const mothers = records.filter((r) => r.kind === "pregnancy").length;
  const children = records.filter((r) => r.kind === "child").length;

  return (
    <AppShell>
      {/* Worker Profile Header Banner */}
      <div className="mb-4 rounded-3xl border-2 border-primary/20 bg-primary/10 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground font-black shadow-xs">
              <UserCheck className="size-6" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold text-primary flex items-center gap-1">
                  {t("welcomeTai")}, {user?.fullName?.split(" ")[1] || user?.fullName || "ताई"}!
                </span>
                <span className="rounded-full bg-accent/20 text-accent px-2 py-0.5 text-xs font-bold">
                  {user?.role === "facilitator" ? t("roleFacilitator") : t("roleAsha")}
                </span>
              </div>
              <p className="truncate text-xs font-semibold text-muted-foreground mt-0.5">
                {user ? `${user.subCenter} • ${user.district}` : `${t("subcenterShiroli")}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 shadow-2xs transition-colors"
              title={t("navHome")}
            >
              <Compass className="size-3.5" />
              <span className="hidden sm:inline">{t("navHome")}</span>
            </Link>
            {user && (
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-destructive/30 bg-destructive/10 px-2 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20 flex items-center gap-1 transition-colors"
                title={t("logoutBtn")}
              >
                <LogOut className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tagline Reassurance */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">{t("tagline")}</p>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/15 px-2.5 py-1 rounded-full">
          <ShieldCheck className="size-3.5" /> {t("savedLocally")}
        </span>
      </div>

      {/* Today's Tasks Card */}
      <Card className="mb-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <CalendarCheck className="size-6 text-primary" />
            {t("todayTasks")}
          </h2>
          {due.length > 0 && (
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs font-black border-0">
              {due.length} {t("activeRemaining")}
            </Badge>
          )}
        </div>

        {due.length === 0 ? (
          <div className="rounded-2xl bg-secondary px-4 py-8 text-center text-secondary-foreground">
            <Sparkles className="mx-auto mb-2 size-8 text-primary opacity-80" />
            <p className="text-lg font-bold">{t("noTasks")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("noTasksDesc")}
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {due.slice(0, 8).map((item) => (
              <li
                key={item.id}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-colors ${
                  item.highRisk
                    ? "border-destructive/40 bg-destructive/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-lg font-extrabold">{item.personName}</p>
                    {item.highRisk && (
                      <span className="rounded-full bg-destructive/15 text-destructive px-2 py-0.5 text-xs font-black flex items-center gap-1">
                        <AlertTriangle className="size-3" /> {t("riskWarningTag")}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-base text-muted-foreground mt-0.5">
                    {item.type === "anc"
                      ? `${t("dueAnc")} · ${item.label}`
                      : `${t("dueImm")} · ${vaccineLabel(item.vaccineCode!, lang)}`}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-black ${
                    item.days < 0
                      ? "bg-destructive/15 text-destructive"
                      : item.days === 0
                        ? "bg-primary/20 text-primary"
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
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-base font-bold text-destructive">
            <AlertTriangle className="size-5 shrink-0" />
            <span>{t("highRisk")} — {t("phcReferralUrgent")}</span>
          </div>
        )}
      </Card>

      {/* 2x2 Field Statistics */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Stat
          value={entriesThisMonth(records)}
          label={t("statVisits")}
          icon={<Calendar className="size-6 text-primary" />}
        />
        <Stat
          value={due.length}
          label={t("statPending")}
          icon={<Clock className="size-6 text-primary" />}
          highlight={due.length > 0}
        />
        <Stat
          value={mothers}
          label={t("statMothers")}
          icon={<HeartPulse className="size-6 text-primary" />}
        />
        <Stat
          value={children}
          label={t("statChildren")}
          icon={<Baby className="size-6 text-primary" />}
        />
      </div>

      {/* Main Navigation Actions */}
      <div className="grid gap-3">
        <NavButton
          to="/entry"
          icon={<ClipboardPlus className="size-7" />}
          label={t("navEntry")}
          note={t("entrySubDesc")}
        />
        <NavButton
          to="/incentive"
          icon={<IndianRupee className="size-7" />}
          label={t("navIncentive")}
          note={t("incentiveTrackerSub")}
        />
        <NavButton
          to="/info"
          icon={<BookOpen className="size-7" />}
          label={t("navInfo")}
          note={t("infoSub")}
        />
        <NavButton
          to="/info/programs"
          icon={<HeartPulse className="size-7" />}
          label={t("infoPrograms")}
          note={t("infoProgramsSub")}
        />
      </div>

      {/* Privacy & Trust Footer */}
      <div className="mt-6 rounded-2xl border border-border/80 bg-card p-4 text-center">
        <p className="text-sm font-semibold text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-4 text-accent" />
          {t("privacyNote")}
        </p>
        <p className="text-xs text-muted-foreground/80 mt-1">
          {t("neonDbNotice")}
        </p>
      </div>
    </AppShell>
  );
}

function Stat({
  value,
  label,
  icon,
  highlight = false,
}: {
  value: number;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border-2 p-4 transition-all ${
        highlight
          ? "border-primary/40 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-3xl font-extrabold text-primary">{value}</p>
        {icon && <span className="opacity-80">{icon}</span>}
      </div>
      <p className="text-base font-bold text-muted-foreground mt-1">{label}</p>
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
        {note && <span className="block text-sm text-muted-foreground truncate">{note}</span>}
      </span>
    </div>
  );

  const cls =
    "block w-full rounded-3xl border-2 border-border bg-card p-4 text-left shadow-[0_3px_0_0_var(--color-border)] hover:border-primary/50 transition-all active:translate-y-0.5";

  if (!to) return <div className={`${cls} opacity-60`}>{inner}</div>;
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}
