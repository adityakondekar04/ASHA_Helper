import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Baby,
  BookOpen,
  HeartPulse,
  IndianRupee,
  ListChecks,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/info/")({
  head: () => ({
    meta: [
      { title: "साधने व माहिती केंद्र — ASHA Helper" },
      {
        name: "description",
        content:
          "ASHA scheme reference: role guides, program checklists, honorarium rate card, and system features.",
      },
      { property: "og:title", content: "साधने व माहिती केंद्र — ASHA Helper" },
      {
        property: "og:description",
        content: "Scheme overview, program guides, incentive rate card, and features overview.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InfoIndex,
});

function InfoIndex() {
  const { t, lang } = useT();

  return (
    <AppShell title={t("navResources")} backTo="/" maxWidth="max-w-2xl">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground leading-normal">
          {lang === "en"
            ? "Reference guides, honorarium rate cards, and helper features for daily fieldwork."
            : lang === "hi"
              ? "दैनिक फील्ड कार्य के लिए संदर्भ मार्गदर्शिका, मानदेय दर सूची और सुविधाएँ।"
              : "दैनिक फील्ड कामासाठी संदर्भ मार्गदर्शक, मानधन दर पत्रक आणि सुविधांची माहिती."}
        </p>

        {/* 1. Info Center (Scheme & Program Checklists) */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            {t("infoTitle")}
          </h2>
          <div className="grid gap-2.5">
            <ResourceCard
              to="/info/scheme"
              icon={<BookOpen className="size-5 text-primary" />}
              title={t("infoScheme")}
              desc={t("infoSchemeSub")}
            />
            <ResourceCard
              to="/info/programs"
              icon={<ListChecks className="size-5 text-primary" />}
              title={t("infoPrograms")}
              desc={t("infoProgramsSub")}
            />
          </div>
        </section>

        {/* 2. Honorarium Notes & Rate Card */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            {lang === "en" ? "Honorarium & incentives" : lang === "hi" ? "मानदेय व प्रोत्साहन" : "मानधन व प्रोत्साहन"}
          </h2>
          <div className="grid gap-2.5">
            <ResourceCard
              to="/info/incentives"
              icon={<IndianRupee className="size-5 text-primary" />}
              title={t("infoRates")}
              desc={t("infoRatesSub")}
            />
            <ResourceCard
              to="/incentive"
              icon={<IndianRupee className="size-5 text-accent" />}
              title={t("navIncentive")}
              desc={t("incentiveTrackerSub")}
            />
          </div>
        </section>

        {/* 3. Features Overview (Moved from landing page) */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            {lang === "en" ? "Features overview" : lang === "hi" ? "सुविधाओं का सारांश" : "वैशिष्ट्ये सारांश"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4 space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <HeartPulse className="size-4 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">{t("tabMch")}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("mchDesc")}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Baby className="size-4 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">{t("tabChild")}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("childFeatureDesc")}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Stethoscope className="size-4 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">{t("tabTb")}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("tbFeatureDesc")}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="size-4 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">{t("savedLocally")}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("fullOfflineDesc")}</p>
            </div>
          </div>
        </section>

        {/* 4. Emergency Contacts */}
        <Card className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Phone className="size-4 text-primary shrink-0" />
            <span>{t("infoEmergency")}</span>
          </h2>
          <ul className="space-y-1 text-sm text-foreground">
            <li>प्राथमिक आरोग्य केंद्र (PHC): ______________</li>
            <li>ग्रामीण रुग्णालय / CHC: ______________</li>
            <li>रुग्णवाहिका / Ambulance: 108</li>
            <li>माता-बाल हेल्पलाइन: 104</li>
          </ul>
          <p className="text-xs text-muted-foreground">{t("placeholderNote")}</p>
        </Card>
      </div>
    </AppShell>
  );
}

function ResourceCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3.5 rounded-xl border border-border bg-card p-3.5 hover:bg-secondary/40 transition-colors"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
    </Link>
  );
}
