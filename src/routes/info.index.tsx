import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, HelpCircle, IndianRupee, ListChecks, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/info/")({
  head: () => ({
    meta: [
      { title: "माहिती केंद्र — ASHA scheme, program guides and incentives" },
      {
        name: "description",
        content:
          "Read-only reference for ASHA workers: scheme roles and honorarium, program checklists, incentive rate card and plain-language FAQs in Marathi, Hindi and English.",
      },
      { property: "og:title", content: "माहिती केंद्र — ASHA Information Hub" },
      {
        property: "og:description",
        content: "Scheme overview, program guides, incentive rate card and FAQs — works offline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InfoIndex,
});

function InfoIndex() {
  const { t } = useT();
  return (
    <AppShell title={t("navInfo")} backTo="/">
      <p className="mb-4 text-base text-muted-foreground">{t("infoSub")}</p>
      <div className="grid gap-3">
        <Tile
          to="/info/scheme"
          icon={<BookOpen className="size-7" />}
          label={t("infoScheme")}
          sub={t("infoSchemeSub")}
        />
        <Tile
          to="/info/programs"
          icon={<ListChecks className="size-7" />}
          label={t("infoPrograms")}
          sub={t("infoProgramsSub")}
        />
        <Tile
          to="/info/incentives"
          icon={<IndianRupee className="size-7" />}
          label={t("infoRates")}
          sub={t("infoRatesSub")}
        />
        <Tile
          to="/info/faq"
          icon={<HelpCircle className="size-7" />}
          label={t("infoFaq")}
          sub={t("infoFaqSub")}
        />
      </div>

      <Card className="mt-4 space-y-2">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <Phone className="size-5 shrink-0 text-primary" /> {t("infoEmergency")}
        </h2>
        <ul className="space-y-1 text-base">
          <li>प्राथमिक आरोग्य केंद्र (PHC): ______________</li>
          <li>ग्रामीण रुग्णालय / CHC: ______________</li>
          <li>रुग्णवाहिका / Ambulance: 108</li>
          <li>माता-बाल हेल्पलाइन: 104</li>
        </ul>
        <p className="text-sm text-muted-foreground">{t("placeholderNote")}</p>
      </Card>
    </AppShell>
  );
}

function Tile({
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
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl border-2 border-border bg-card p-4 shadow-[0_3px_0_0_var(--color-border)]"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xl font-extrabold">{label}</span>
        <span className="block text-base text-muted-foreground">{sub}</span>
      </span>
    </Link>
  );
}
