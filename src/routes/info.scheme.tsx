import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { pick, useT, type Tri } from "@/lib/i18n";

export const Route = createFileRoute("/info/scheme")({
  head: () => ({
    meta: [
      { title: "आशा योजना माहिती — Roles, duties and honorarium" },
      {
        name: "description",
        content:
          "Overview of the ASHA scheme for Maharashtra field workers: who an ASHA is, her day-to-day duties, and how the honorarium and activity-based payments are structured.",
      },
      { property: "og:title", content: "आशा योजना माहिती — ASHA scheme overview" },
      {
        property: "og:description",
        content: "Roles, duties and honorarium structure explained in simple language.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchemePage,
});

const SECTIONS: Array<{ heading: Tri; body: Tri; points: Tri[] }> = [
  {
    heading: ["आशा म्हणजे कोण?", "आशा कौन है?", "Who is an ASHA?"],
    body: [
      "गावातील निवडलेली महिला आरोग्य स्वयंसेविका, जी गाव आणि आरोग्य यंत्रणा यांच्यातील दुवा आहे.",
      "गाँव से चुनी गई महिला स्वास्थ्य स्वयंसेविका, जो गाँव और स्वास्थ्य व्यवस्था के बीच कड़ी है।",
      "A woman health volunteer chosen from the village who links the community with the health system.",
    ],
    points: [
      ["गावातील रहिवासी असणे", "गाँव की निवासी होना", "Resident of the same village"],
      ["किमान ८वी उत्तीर्ण (नमुना)", "कम से कम 8वीं पास (नमूना)", "Minimum 8th pass (placeholder)"],
      ["ग्रामसभेमार्फत निवड", "ग्रामसभा द्वारा चयन", "Selected through the Gram Sabha"],
    ],
  },
  {
    heading: ["रोजची कामे", "रोज़ के काम", "Day-to-day duties"],
    body: [
      "खालील यादी नमुना आहे — तुमच्या ब्लॉकनुसार बदल करा.",
      "नीचे दी सूची नमूना है — अपने ब्लॉक अनुसार बदलें।",
      "The list below is a placeholder — adjust it for your block.",
    ],
    points: [
      ["गरोदर मातांची नोंद व एएनसी पाठपुरावा", "गर्भवती पंजीकरण व एएनसी फ़ॉलोअप", "Register pregnant women and follow up ANC"],
      ["प्रसूतीसाठी संस्थेत नेणे व मदत", "संस्थागत प्रसव में सहायता", "Support institutional delivery"],
      ["नवजात व बाल गृहभेटी (HBNC/HBYC)", "नवजात व शिशु गृह भेंट", "Newborn and young child home visits"],
      ["लसीकरण सत्रात मदत व बोलावणे", "टीकाकरण सत्र में सहयोग", "Mobilise families for immunization"],
      ["टीबी, हिवताप, डेंग्यू संशयित शोध", "टीबी, मलेरिया, डेंगू संदिग्ध खोज", "Find suspected TB, malaria and dengue cases"],
      ["कुटुंब नियोजन समुपदेशन", "परिवार नियोजन परामर्श", "Family planning counselling"],
      ["आरोग्य शिक्षण व समुपदेशन", "स्वास्थ्य शिक्षा व परामर्श", "Health education and counselling"],
    ],
  },
  {
    heading: ["मानधन रचना", "मानदेय संरचना", "Honorarium structure"],
    body: [
      "मानधन दोन भागांत मिळते: दरमहा ठराविक रक्कम आणि कामानुसार प्रोत्साहन रक्कम. खालील आकडे नमुना आहेत.",
      "मानदेय दो हिस्सों में: हर महीने निश्चित राशि और काम के अनुसार प्रोत्साहन राशि। नीचे के आँकड़े नमूना हैं।",
      "Payment has two parts: a fixed monthly amount plus activity-based incentives. Figures below are placeholders.",
    ],
    points: [
      ["केंद्र शासन दरमहा नियमित मानधन: ₹____", "केंद्र मासिक नियमित मानदेय: ₹____", "Central fixed monthly honorarium: ₹____"],
      ["राज्य शासन अतिरिक्त मानधन: ₹____", "राज्य अतिरिक्त मानदेय: ₹____", "State top-up honorarium: ₹____"],
      ["कामानुसार प्रोत्साहन: दर पत्रक पहा", "काम अनुसार प्रोत्साहन: दर सूची देखें", "Activity incentives: see the rate card"],
      ["देयक दर महिन्याला PHC मार्फत", "भुगतान हर माह PHC द्वारा", "Paid monthly through the PHC"],
    ],
  },
];

function SchemePage() {
  const { t, lang } = useT();
  return (
    <AppShell title={t("infoScheme")} backTo="/info">
      <div className="space-y-4">
        {SECTIONS.map((s) => (
          <Card key={s.heading[2]} className="space-y-3">
            <h2 className="text-xl font-extrabold">{pick(lang, s.heading)}</h2>
            <p className="text-base leading-snug text-muted-foreground">{pick(lang, s.body)}</p>
            <ul className="space-y-2">
              {s.points.map((p) => (
                <li key={p[2]} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-base">
                  <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary" />
                  <span className="min-w-0 leading-snug">{pick(lang, p)}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <p className="pb-4 text-center text-sm text-muted-foreground">{t("placeholderNote")}</p>
      </div>
    </AppShell>
  );
}
