import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  IndianRupee,
  Plus,
  Minus,
  Trash2,
  TrendingUp,
  XCircle,
  FileSpreadsheet,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, Field, SaveBar, TextInput } from "@/components/ui/form-kit";
import { pick, useT } from "@/lib/i18n";
import {
  buildMonthlySummary,
  calculateLogTotal,
  formatMonthName,
  getAvailableMonths,
  INCENTIVE_RATES,
} from "@/lib/incentives";
import {
  deleteRecord,
  newId,
  saveIncentivePayment,
  saveRecord,
  useAutoSaveForm,
  useIncentivePayments,
  useRecords,
  type IncentiveLogRecord,
} from "@/lib/store";

export const Route = createFileRoute("/incentive")({
  head: () => ({
    meta: [
      { title: "मानधन नोंदणी व हिशोब — ASHA Incentive Tracker" },
      {
        name: "description",
        content:
          "Log daily activities, auto-calculate expected incentive amounts, and track monthly payment status offline.",
      },
      { property: "og:title", content: "मानधन नोंदणी — Incentive Tracker" },
      {
        property: "og:description",
        content: "Track daily ASHA activities, monthly expected incentives, and payment status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IncentiveTrackerPage,
});

const TODAY_ISO = new Date().toISOString().slice(0, 10);
const CURRENT_MONTH_KEY = TODAY_ISO.slice(0, 7);

interface DraftState {
  id?: string;
  date: string;
  householdsVisited: string;
  activities: Record<string, number>;
}

const INITIAL_DRAFT: DraftState = {
  date: TODAY_ISO,
  householdsVisited: "",
  activities: {},
};

function IncentiveTrackerPage() {
  const { t, lang } = useT();
  const [activeTab, setActiveTab] = useState<"daily" | "monthly" | "history">("daily");
  const [selectedMonth, setSelectedMonth] = useState<string>(CURRENT_MONTH_KEY);

  const records = useRecords();
  const paymentMap = useIncentivePayments();

  // Filter incentive logs
  const logs = records.filter(
    (r): r is IncentiveLogRecord => r.kind === "incentiveLog"
  );

  const { value, update, clearDraft, savedAt } = useAutoSaveForm<DraftState>(
    "asha.draft.incentiveLog",
    INITIAL_DRAFT
  );

  // Available months for monthly summary & history
  const availableMonths = getAvailableMonths(logs);

  // Live calculation for form draft
  const todayTotal = calculateLogTotal(value.activities);

  const handleActivityCountChange = (code: string, delta: number) => {
    const current = value.activities[code] || 0;
    const next = Math.max(0, current + delta);
    update({
      activities: {
        ...value.activities,
        [code]: next,
      },
    });
  };

  const handleActivityCountInput = (code: string, rawVal: string) => {
    const parsed = parseInt(rawVal, 10);
    const next = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
    update({
      activities: {
        ...value.activities,
        [code]: next,
      },
    });
  };

  const handleSaveLog = () => {
    const id = value.id || newId();
    const record: IncentiveLogRecord = {
      id,
      kind: "incentiveLog",
      date: value.date || TODAY_ISO,
      householdsVisited: value.householdsVisited || "0",
      activities: value.activities,
      totalAmount: calculateLogTotal(value.activities),
      updatedAt: Date.now(),
    };

    saveRecord(record);
    clearDraft();
    update(INITIAL_DRAFT);
  };

  const handleDeleteLog = (id: string) => {
    if (window.confirm(t("deleteLogConfirm"))) {
      deleteRecord(id);
    }
  };

  // Monthly summary calculation
  const monthSummary = buildMonthlySummary(logs, selectedMonth, paymentMap, lang);

  return (
    <AppShell title={t("incentiveTrackerTitle")} backTo="/">
      {/* Sub-header tagline */}
      <p className="mb-4 text-base text-muted-foreground">{t("incentiveTrackerSub")}</p>

      {/* Tabs Header */}
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl border-2 border-border bg-card p-1 shadow-[0_2px_0_0_var(--color-border)]">
        <button
          type="button"
          onClick={() => setActiveTab("daily")}
          className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-base font-extrabold transition-colors ${
            activeTab === "daily"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary/50"
          }`}
        >
          <Calendar className="size-4 shrink-0" />
          <span className="truncate">{t("tabDailyLog")}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("monthly")}
          className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-base font-extrabold transition-colors ${
            activeTab === "monthly"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary/50"
          }`}
        >
          <FileSpreadsheet className="size-4 shrink-0" />
          <span className="truncate">{t("tabMonthlySummary")}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-base font-extrabold transition-colors ${
            activeTab === "history"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary/50"
          }`}
        >
          <TrendingUp className="size-4 shrink-0" />
          <span className="truncate">{t("tabHistory")}</span>
        </button>
      </div>

      {/* TAB 1: DAILY ACTIVITY LOG FORM */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          <Card className="space-y-4">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <Calendar className="size-6 text-primary" />
              {t("tabDailyLog")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label={t("logDate")}>
                <TextInput
                  type="date"
                  value={value.date}
                  onChange={(e) => update({ date: e.target.value })}
                />
              </Field>

              <Field label={t("householdsVisitedCount")}>
                <TextInput
                  type="number"
                  inputMode="numeric"
                  placeholder="उदा. 15"
                  value={value.householdsVisited}
                  onChange={(e) => update({ householdsVisited: e.target.value })}
                />
              </Field>
            </div>

            {/* Live calculated incentive banner */}
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/10 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-muted-foreground">{t("todayExpected")}</p>
                <p className="text-3xl font-extrabold text-primary">₹{todayTotal}</p>
              </div>
              <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <IndianRupee className="size-7" />
              </div>
            </div>

            {/* Checklist of activities matching rate card */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-extrabold text-foreground border-b-2 border-border pb-2">
                {t("activitiesChecklist")}
              </h3>

              <div className="space-y-3">
                {INCENTIVE_RATES.map((item) => {
                  const count = value.activities[item.code] || 0;
                  const itemTotal = count * item.rate;

                  return (
                    <div
                      key={item.code}
                      className={`rounded-2xl border-2 p-3 transition-colors ${
                        count > 0
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <p className="text-base font-bold leading-tight text-foreground">
                            {pick(lang, item.activity)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.rate} / {pick(lang, item.unit)} · {pick(lang, item.note)}
                          </p>
                        </div>
                        {count > 0 && (
                          <span className="self-start sm:self-auto rounded-full bg-primary/20 px-3 py-1 text-sm font-extrabold text-primary">
                            ₹{itemTotal}
                          </span>
                        )}
                      </div>

                      {/* Number Counter (+ / -) */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleActivityCountChange(item.code, -1)}
                          disabled={count <= 0}
                          aria-label="Decrease count"
                          className="flex size-11 items-center justify-center rounded-xl border-2 border-border bg-secondary text-secondary-foreground disabled:opacity-30 disabled:cursor-not-allowed text-xl font-bold active:scale-95"
                        >
                          <Minus className="size-5" />
                        </button>

                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={count === 0 ? "" : count}
                          placeholder="0"
                          onChange={(e) => handleActivityCountInput(item.code, e.target.value)}
                          className="w-20 text-center rounded-xl border-2 border-border bg-card px-2 py-2 text-xl font-extrabold outline-none focus:border-primary"
                        />

                        <button
                          type="button"
                          onClick={() => handleActivityCountChange(item.code, 1)}
                          aria-label="Increase count"
                          className="flex size-11 items-center justify-center rounded-xl border-2 border-primary bg-primary text-primary-foreground text-xl font-bold active:scale-95 shadow-sm"
                        >
                          <Plus className="size-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <SaveBar savedAt={savedAt} onSave={handleSaveLog} />
          </Card>

          {/* RECENT DAILY LOGS LIST */}
          <Card>
            <h3 className="mb-3 text-lg font-extrabold text-foreground">
              {t("recentDailyLogs")}
            </h3>

            {logs.length === 0 ? (
              <p className="rounded-2xl bg-secondary px-4 py-6 text-center text-base text-muted-foreground font-semibold">
                {t("noLogsFound")}
              </p>
            ) : (
              <ul className="space-y-3">
                {logs
                  .slice()
                  .sort((a, b) => (b.date > a.date ? 1 : -1))
                  .map((log) => {
                    const totalActCount = Object.values(log.activities || {}).reduce(
                      (acc, c) => acc + (c || 0),
                      0
                    );

                    return (
                      <li
                        key={log.id}
                        className="rounded-2xl border-2 border-border bg-card p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-base text-foreground">
                              📅 {log.date}
                            </span>
                            {Number(log.householdsVisited) > 0 && (
                              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">
                                🏠 {log.householdsVisited} {t("houseCount")}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold text-primary">
                              ₹{log.totalAmount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteLog(log.id)}
                              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                              title={t("deleteLogConfirm")}
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>

                        {/* Breakdown summary badges */}
                        {totalActCount > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {INCENTIVE_RATES.map((item) => {
                              const c = log.activities?.[item.code] || 0;
                              if (c <= 0) return null;
                              return (
                                <span
                                  key={item.code}
                                  className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                                >
                                  {pick(lang, item.activity)}: <strong>{c}</strong>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </Card>
        </div>
      )}

      {/* TAB 2: MONTHLY SUMMARY VIEW */}
      {activeTab === "monthly" && (
        <div className="space-y-4">
          {/* Month Selector Controls */}
          <Card className="flex items-center justify-between gap-2 py-3">
            <button
              type="button"
              onClick={() => {
                const idx = availableMonths.indexOf(selectedMonth);
                if (idx < availableMonths.length - 1) {
                  setSelectedMonth(availableMonths[idx + 1]);
                }
              }}
              disabled={availableMonths.indexOf(selectedMonth) >= availableMonths.length - 1}
              className="flex size-10 items-center justify-center rounded-xl border-2 border-border bg-secondary text-secondary-foreground disabled:opacity-30"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="text-center min-w-0">
              <span className="text-xs font-bold text-muted-foreground block">
                {t("selectMonth")}
              </span>
              <span className="text-xl font-extrabold text-foreground truncate block">
                {formatMonthName(selectedMonth, lang)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const idx = availableMonths.indexOf(selectedMonth);
                if (idx > 0) {
                  setSelectedMonth(availableMonths[idx - 1]);
                }
              }}
              disabled={availableMonths.indexOf(selectedMonth) <= 0}
              className="flex size-10 items-center justify-center rounded-xl border-2 border-border bg-secondary text-secondary-foreground disabled:opacity-30"
              aria-label="Next month"
            >
              <ChevronRight className="size-5" />
            </button>
          </Card>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-3xl border-2 border-primary/40 bg-primary/10 p-4">
              <p className="text-xs font-bold text-muted-foreground">{t("monthExpectedTotal")}</p>
              <p className="text-3xl font-extrabold text-primary">
                ₹{monthSummary.totalExpected}
              </p>
            </div>

            <div className="rounded-3xl border-2 border-accent/40 bg-accent/10 p-4">
              <p className="text-xs font-bold text-muted-foreground">{t("receivedIncentive")}</p>
              <p className="text-3xl font-extrabold text-accent">
                ₹{monthSummary.totalReceived}
              </p>
            </div>

            <div className="rounded-3xl border-2 border-destructive/40 bg-destructive/10 p-4">
              <p className="text-xs font-bold text-muted-foreground">{t("pendingIncentive")}</p>
              <p className="text-3xl font-extrabold text-destructive">
                ₹{monthSummary.totalPending}
              </p>
            </div>
          </div>

          {/* Activity Breakdown & Payment Received Toggles */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-border pb-2">
              <h3 className="text-lg font-extrabold text-foreground">
                {t("activitiesChecklist")} ({formatMonthName(selectedMonth, lang)})
              </h3>
              {monthSummary.totalHouseholds > 0 && (
                <span className="text-sm font-bold text-muted-foreground">
                  🏠 {monthSummary.totalHouseholds} {t("householdsVisited")}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {monthSummary.activities.map((act) => {
                return (
                  <div
                    key={act.code}
                    className={`rounded-2xl border-2 p-3 space-y-2 transition-colors ${
                      act.isReceived
                        ? "border-accent/40 bg-accent/5"
                        : act.expectedAmount > 0
                        ? "border-border bg-card"
                        : "border-border/50 bg-secondary/20 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-base font-extrabold text-foreground">
                          {act.activityName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("totalEntries")}: <strong>{act.totalCount}</strong> · ₹
                          {act.unitRate} / unit
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-extrabold text-primary">
                          ₹{act.expectedAmount}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-extrabold px-2 py-0.5 rounded-md ${
                            act.isReceived
                              ? "bg-accent/20 text-accent"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {act.isReceived ? (
                            <>
                              <CheckCircle2 className="size-3" /> {t("receivedShort")}
                            </>
                          ) : (
                            <>
                              <XCircle className="size-3" /> {t("pendingShort")}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Manual Payment Received Toggle */}
                    <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {t("paymentReceived")}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          saveIncentivePayment(selectedMonth, act.code, !act.isReceived)
                        }
                        className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 text-sm font-extrabold transition-all ${
                          act.isReceived
                            ? "border-accent bg-accent text-accent-foreground shadow-sm"
                            : "border-border bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {act.isReceived ? (
                          <>
                            <CheckCircle2 className="size-4" /> {t("yes")} ({t("receivedShort")})
                          </>
                        ) : (
                          <>
                            <XCircle className="size-4" /> {t("no")} ({t("pendingShort")})
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: MONTH-BY-MONTH HISTORY & BAR CHART VIEW */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <Card className="space-y-4">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <TrendingUp className="size-6 text-primary" />
              {t("monthHistoryTitle")}
            </h2>

            {availableMonths.length === 0 ? (
              <p className="rounded-2xl bg-secondary px-4 py-6 text-center text-base text-muted-foreground font-semibold">
                {t("noLogsFound")}
              </p>
            ) : (
              <div className="space-y-5">
                {availableMonths.map((mKey) => {
                  const summary = buildMonthlySummary(logs, mKey, paymentMap, lang);
                  const maxVal = Math.max(1, summary.totalExpected);
                  const receivedPercent = Math.min(
                    100,
                    Math.round((summary.totalReceived / maxVal) * 100)
                  );
                  const pendingPercent = 100 - receivedPercent;

                  return (
                    <div
                      key={mKey}
                      className="rounded-2xl border-2 border-border bg-card p-4 space-y-3 shadow-xs"
                    >
                      {/* Month Header & Totals */}
                      <div className="flex items-center justify-between gap-2 border-b-2 border-border/60 pb-2">
                        <div>
                          <p className="text-lg font-extrabold text-foreground">
                            {formatMonthName(mKey, lang)}
                          </p>
                          {summary.totalHouseholds > 0 && (
                            <p className="text-xs font-semibold text-muted-foreground">
                              🏠 {summary.totalHouseholds} {t("houseCount")}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-extrabold text-primary">
                            ₹{summary.totalExpected}
                          </p>
                          <p className="text-xs font-bold text-muted-foreground">
                            {t("monthExpectedTotal")}
                          </p>
                        </div>
                      </div>

                      {/* Visual Bar Representation */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-extrabold">
                          <span className="text-accent flex items-center gap-1">
                            <CheckCircle2 className="size-3.5" />
                            {t("receivedIncentive")}: ₹{summary.totalReceived}
                          </span>
                          <span className="text-destructive flex items-center gap-1">
                            <XCircle className="size-3.5" />
                            {t("pendingIncentive")}: ₹{summary.totalPending}
                          </span>
                        </div>

                        {/* Stacked Progress Bar */}
                        <div className="h-5 w-full rounded-xl bg-secondary overflow-hidden flex border border-border">
                          {summary.totalExpected > 0 ? (
                            <>
                              <div
                                style={{ width: `${receivedPercent}%` }}
                                className="bg-accent transition-all duration-300"
                                title={`Received: ₹${summary.totalReceived}`}
                              />
                              <div
                                style={{ width: `${pendingPercent}%` }}
                                className="bg-destructive/60 transition-all duration-300"
                                title={`Pending: ₹${summary.totalPending}`}
                              />
                            </>
                          ) : (
                            <div className="w-full bg-secondary/80 text-center text-xs text-muted-foreground flex items-center justify-center font-bold">
                              ₹0
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Details Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMonth(mKey);
                          setActiveTab("monthly");
                        }}
                        className="w-full text-center text-sm font-bold text-primary hover:underline pt-1 block"
                      >
                        {t("tabMonthlySummary")} →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
