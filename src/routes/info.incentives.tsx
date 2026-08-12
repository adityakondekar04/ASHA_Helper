import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { pick, useT, type Tri } from "@/lib/i18n";

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

const ROWS: Array<{ activity: Tri; amount: string; note: Tri }> = [
  {
    activity: ["गरोदर नोंदणी व ४ एएनसी", "गर्भवती पंजीकरण व 4 एएनसी", "Pregnancy registration + 4 ANC"],
    amount: "₹300",
    note: ["सर्व ४ तपासण्या पूर्ण झाल्यावर", "चारों जाँच पूरी होने पर", "After all four visits"],
  },
  {
    activity: ["संस्थात्मक प्रसूती सोबत", "संस्थागत प्रसव साथ", "Institutional delivery escort"],
    amount: "₹600",
    note: ["ग्रामीण भागासाठी", "ग्रामीण क्षेत्र हेतु", "Rural area rate"],
  },
  {
    activity: ["एचबीएनसी ६ गृहभेटी", "एचबीएनसी 6 गृह भेंट", "HBNC 6 home visits"],
    amount: "₹250",
    note: ["सर्व भेटी नोंदवल्यावर", "सभी भेंट दर्ज होने पर", "On recording all visits"],
  },
  {
    activity: ["संपूर्ण लसीकरण (१ वर्ष)", "पूर्ण टीकाकरण (1 वर्ष)", "Full immunization (1 year)"],
    amount: "₹100",
    note: ["प्रति बालक", "प्रति बच्चा", "Per child"],
  },
  {
    activity: ["टीबी रुग्ण उपचार पूर्ण", "टीबी मरीज़ इलाज पूर्ण", "TB treatment completion"],
    amount: "₹1000",
    note: ["नि-क्षय नोंदीनुसार", "नि-क्षय रिकॉर्ड अनुसार", "As per Ni-Kshay record"],
  },
  {
    activity: ["हिवताप रक्त नमुना", "मलेरिया रक्त नमूना", "Malaria blood slide"],
    amount: "₹15",
    note: ["प्रति नमुना", "प्रति नमूना", "Per slide"],
  },
  {
    activity: ["कुटुंब नियोजन शस्त्रक्रिया प्रेरणा", "परिवार नियोजन सर्जरी प्रेरणा", "Family planning motivation"],
    amount: "₹200",
    note: ["प्रति प्रकरण", "प्रति केस", "Per case"],
  },
  {
    activity: ["ग्राम आरोग्य दिन सहभाग", "ग्राम स्वास्थ्य दिवस सहभाग", "Village health day participation"],
    amount: "₹100",
    note: ["दरमहा एकदा", "माह में एक बार", "Once a month"],
  },
];

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
            {ROWS.map((r) => (
              <tr key={r.activity[2]} className="border-t-2 border-border align-top">
                <td className="px-3 py-3 text-base font-bold leading-snug">
                  {pick(lang, r.activity)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-lg font-extrabold text-primary">
                  {r.amount}
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
