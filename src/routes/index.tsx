import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarCheck, ClipboardPlus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useT, vaccineLabel } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { buildDueList, entriesThisMonth, useRecords } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "आशा सहाय्यक — ASHA Helper" },
      {
        name: "description",
        content:
          "Marathi-first, offline-first daily work diary for Maharashtra ASHA workers. No location tracking, no internet required.",
      },
      { property: "og:title", content: "आशा सहाय्यक — ASHA Helper" },
      {
        property: "og:description",
        content:
          "Marathi-first, offline-first daily work diary for Maharashtra ASHA workers. No location tracking, no internet required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "manifest", href: "/manifest.json" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell maxWidth="max-w-xl">
      {user ? <WorkerHome user={user} /> : <VisitorHome />}
    </AppShell>
  );
}

/** STEP 3 – Home for logged-in ASHA worker = dashboard */
function WorkerHome({ user }: { user: any }) {
  const { t, lang } = useT();
  const records = useRecords();
  const due = buildDueList(records);

  const firstName =
    user?.fullName?.split(" ")[1] || user?.fullName?.split(" ")[0] || "ताई";

  const greeting =
    lang === "en"
      ? `Hello, ${firstName}`
      : lang === "hi"
        ? `नमस्ते, ${firstName} ताई`
        : `नमस्कार, ${firstName} ताई`;

  const taskCountMessage =
    due.length === 0
      ? t("noTasks")
      : lang === "en"
        ? `Today ${due.length} tasks remaining`
        : lang === "hi"
          ? `आज ${due.length} काम बाकी हैं`
          : `आज ${due.length} कामे बाकी आहेत`;

  const urgentReferral = due.find((d) => d.highRisk);

  return (
    <div className="space-y-4">
      {/* 1. Worker Greeting & Pending Tasks Line */}
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-normal">
          {greeting}
        </h1>
        <p className="text-sm text-muted-foreground leading-normal">{taskCountMessage}</p>
      </div>

      {/* 2. Primary & Secondary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <Link
          to="/dashboard"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <CalendarCheck className="size-5 shrink-0" />
          <span>{t("openDailyDiary")}</span>
        </Link>
        <Link
          to="/entry"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary transition-colors"
        >
          <ClipboardPlus className="size-5 text-primary shrink-0" />
          <span>{t("newEntry")}</span>
        </Link>
      </div>

      {/* 3. Today's Tasks List (Max 3 rows) */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <CalendarCheck className="size-4 text-primary" />
            <span>{t("todayTasks")}</span>
          </h2>
          {due.length > 0 && (
            <span className="text-xs text-muted-foreground font-medium">
              {due.length} {t("statPending")}
            </span>
          )}
        </div>

        {due.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">{t("noTasks")}</p>
        ) : (
          <ul className="space-y-2">
            {due.slice(0, 3).map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.personName}
                    </p>
                    {item.highRisk && (
                      <span className="rounded-full bg-destructive/15 text-destructive px-1.5 py-0.2 text-xs font-medium">
                        {t("riskWarningTag")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
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
      </div>

      {/* 4. At most one referral alert */}
      {urgentReferral && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 flex items-center gap-2.5 text-sm font-medium text-destructive">
          <AlertTriangle className="size-4 shrink-0" />
          <span className="truncate">
            {t("highRisk")} — {urgentReferral.personName} ({t("phcReferralUrgent")})
          </span>
        </div>
      )}

      {/* 5. Two small stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card p-3.5 text-center">
          <p className="text-2xl font-semibold text-primary">{entriesThisMonth(records)}</p>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{t("statVisits")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3.5 text-center">
          <p className="text-2xl font-semibold text-primary">{due.length}</p>
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{t("statPending")}</p>
        </div>
      </div>
    </div>
  );
}

/** STEP 4 – Home for logged-out visitors */
function VisitorHome() {
  const { t } = useT();

  return (
    <div className="py-10 sm:py-16 text-center max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug">
        {t("landingHeadline")}
      </h1>
      <p className="text-base text-muted-foreground leading-relaxed">
        {t("landingSub")}
      </p>
      <div className="pt-2">
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <CalendarCheck className="size-5 shrink-0" />
          <span>{t("loginBtn")}</span>
        </Link>
      </div>
    </div>
  );
}
