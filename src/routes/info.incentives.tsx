import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { pick, useT } from "@/lib/i18n";
import { INCENTIVE_RATES } from "@/lib/incentives";

export const Route = createFileRoute("/info/incentives")({
  head: () => ({
    meta: [
      { title: "मानधन दर पत्रक — ASHA incentive rate card" },
      {
        name: "description",
        content:
          "A simple rate card listing each ASHA activity, the expected incentive amount in rupees, and notes on when the payment applies.",
      },
      { property: "og:title", content: "मानधन दर पत्रक — Incentive rate card" },
      {
        property: "og:description",
        content: "Activity-wise incentive amounts with notes, readable offline.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IncentivesPage,
});

function IncentivesPage() {
  const { t, lang } = useT();
  return (
    <AppShell title={t("infoRates")} backTo="/info">
      <div className="overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[0_2px_0_0_var(--color-border)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary text-secondary-foreground">
              <th className="px-3 py-3 text-base font-extrabold">{t("activity")}</th>
              <th className="px-3 py-3 text-base font-extrabold">{t("amount")}</th>
              <th className="px-3 py-3 text-base font-extrabold">{t("notes")}</th>
            </tr>
          </thead>
          <tbody>
            {INCENTIVE_RATES.map((r) => (
              <tr key={r.code} className="border-t-2 border-border align-top">
                <td className="px-3 py-3 text-base font-bold leading-snug">
                  {pick(lang, r.activity)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-lg font-extrabold text-primary">
                  ₹{r.rate}
                </td>
                <td className="px-3 py-3 text-sm leading-snug text-muted-foreground">
                  {pick(lang, r.note)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="py-4 text-center text-sm text-muted-foreground">{t("placeholderNote")}</p>
    </AppShell>
  );
}
