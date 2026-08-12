import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CheckList, Collapse } from "@/components/ui/collapse";
import { pick, useT, type Tri } from "@/lib/i18n";

export const Route = createFileRoute("/info/programs")({
  head: () => ({
    meta: [
      { title: "कार्यक्रम मार्गदर्शक — ANC, immunization, TB, malaria guides" },
      {
        name: "description",
        content:
          "Collapsible field checklists for ASHA workers: ANC/PNC/HBNC/HBYC, the immunization schedule, Ni-Kshay TB protocol summary, malaria and dengue season checks, and family planning.",
      },
      { property: "og:title", content: "कार्यक्रम मार्गदर्शक — Program guides" },
      {
        property: "og:description",
        content: "One collapsible checklist per programme, readable offline in Marathi.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});

type Group = { title: Tri; icon: string; blocks: Array<{ sub: Tri; items: Tri[] }> };

const GROUPS: Group[] = [
  {
    title: ["माता व बाल आरोग्य", "मातृ व शिशु स्वास्थ्य", "Maternal & child health"],
    icon: "🤰",
    blocks: [
      {
        sub: ["एएनसी तपासणी", "एएनसी जाँच", "ANC checklist"],
        items: [
          ["पहिल्या तिमाहीत नोंदणी", "पहली तिमाही में पंजीकरण", "Register in the first trimester"],
          ["वजन, बीपी, हिमोग्लोबिन तपासणी", "वज़न, बीपी, हीमोग्लोबिन जाँच", "Weight, BP and haemoglobin check"],
          ["लोह व कॅल्शियम गोळ्या दिल्या का?", "आयरन व कैल्शियम गोलियाँ दीं?", "Iron and calcium tablets given?"],
          ["टीडी लस दोन मात्रा", "टीडी टीका दो ख़ुराक", "Two doses of Td vaccine"],
          ["धोक्याची लक्षणे समजावली", "ख़तरे के लक्षण समझाए", "Danger signs explained"],
        ],
      },
      {
        sub: ["पीएनसी भेटी", "पीएनसी भेंट", "PNC visits"],
        items: [
          ["प्रसूतीनंतर ४२ दिवस पाठपुरावा", "प्रसव के बाद 42 दिन फ़ॉलोअप", "Follow up for 42 days after delivery"],
          ["रक्तस्राव व ताप तपासणी", "रक्तस्राव व बुख़ार जाँच", "Check for bleeding and fever"],
          ["स्तनपान मार्गदर्शन", "स्तनपान मार्गदर्शन", "Breastfeeding guidance"],
        ],
      },
      {
        sub: ["एचबीएनसी (HBNC)", "एचबीएनसी (HBNC)", "HBNC"],
        items: [
          ["भेटी: १, ३, ७, १४, २१, २८, ४२ दिवस", "भेंट: 1, 3, 7, 14, 21, 28, 42 दिन", "Visits on days 1, 3, 7, 14, 21, 28, 42"],
          ["बाळाचे वजन व तापमान", "शिशु वज़न व तापमान", "Baby's weight and temperature"],
          ["नाळ स्वच्छता व उब", "नाल सफ़ाई व गर्माहट", "Cord care and warmth"],
        ],
      },
      {
        sub: ["एचबीवायसी (HBYC)", "एचबीवायसी (HBYC)", "HBYC"],
        items: [
          ["३, ६, ९, १२, १५ महिने भेटी", "3, 6, 9, 12, 15 माह भेंट", "Visits at 3, 6, 9, 12, 15 months"],
          ["पूरक आहार सल्ला", "पूरक आहार सलाह", "Complementary feeding advice"],
          ["वाढ व MUAC नोंद", "वृद्धि व MUAC रिकॉर्ड", "Growth and MUAC recording"],
        ],
      },
    ],
  },
  {
    title: ["लसीकरण वेळापत्रक", "टीकाकरण कार्यक्रम", "Immunization schedule"],
    icon: "💉",
    blocks: [
      {
        sub: ["वयानुसार लसी", "उम्र अनुसार टीके", "By age"],
        items: [
          ["जन्मत: बीसीजी, ओपीव्ही-०, हेप-बी", "जन्म पर: बीसीजी, ओपीवी-0, हेप-बी", "At birth: BCG, OPV-0, Hep-B"],
          ["६ आठवडे: पेंटा-१, ओपीव्ही-१, रोटा-१", "6 सप्ताह: पेंटा-1, ओपीवी-1, रोटा-1", "6 weeks: Penta-1, OPV-1, Rota-1"],
          ["१० आठवडे: पेंटा-२, ओपीव्ही-२", "10 सप्ताह: पेंटा-2, ओपीवी-2", "10 weeks: Penta-2, OPV-2"],
          ["१४ आठवडे: पेंटा-३, ओपीव्ही-३, आयपीव्ही", "14 सप्ताह: पेंटा-3, ओपीवी-3, आईपीवी", "14 weeks: Penta-3, OPV-3, IPV"],
          ["९–१२ महिने: गोवर-रुबेला १", "9–12 माह: खसरा-रूबेला 1", "9–12 months: MR-1"],
          ["१६–२४ महिने: गोवर-रुबेला २, बूस्टर", "16–24 माह: खसरा-रूबेला 2, बूस्टर", "16–24 months: MR-2, boosters"],
        ],
      },
    ],
  },
  {
    title: ["क्षयरोग — नि-क्षय सारांश", "क्षय रोग — नि-क्षय सारांश", "TB — Ni-Kshay summary"],
    icon: "🫁",
    blocks: [
      {
        sub: ["संशयित शोध", "संदिग्ध खोज", "Case finding"],
        items: [
          ["२ आठवड्यांहून जास्त खोकला", "2 हफ़्तों से ज़्यादा खाँसी", "Cough for more than 2 weeks"],
          ["ताप, वजन घट, रात्री घाम", "बुख़ार, वज़न घटना, रात पसीना", "Fever, weight loss, night sweats"],
          ["थुंकी नमुना केंद्रात पाठवा", "बलगम नमूना केंद्र भेजें", "Send sputum sample to the centre"],
        ],
      },
      {
        sub: ["उपचार पाठपुरावा", "इलाज फ़ॉलोअप", "Treatment follow-up"],
        items: [
          ["डॉट्स डोस दररोज नोंद", "डॉट्स ख़ुराक रोज़ रिकॉर्ड", "Record DOTS doses daily"],
          ["उपचार अर्धवट सोडू नये", "इलाज बीच में न छोड़ें", "No treatment interruption"],
          ["नि-क्षय पोषण योजना माहिती द्या", "नि-क्षय पोषण योजना बताएँ", "Explain Ni-Kshay Poshan Yojana"],
          ["कुटुंबीयांची तपासणी", "परिवार की जाँच", "Screen household contacts"],
        ],
      },
    ],
  },
  {
    title: ["हिवताप / डेंग्यू हंगाम", "मलेरिया / डेंगू मौसम", "Malaria / dengue season"],
    icon: "🦟",
    blocks: [
      {
        sub: ["पावसाळी तपासणी", "बरसात जाँच", "Monsoon checklist"],
        items: [
          ["घरोघरी ताप सर्वेक्षण", "घर-घर बुख़ार सर्वे", "House-to-house fever survey"],
          ["साठलेले पाणी व अळी तपासणी", "जमा पानी व लार्वा जाँच", "Check stored water for larvae"],
          ["आठवड्यातून एकदा कोरडा दिवस", "हफ़्ते में एक सूखा दिन", "Weekly dry day"],
          ["तापाच्या रुग्णाचा रक्त नमुना", "बुख़ार मरीज़ का रक्त नमूना", "Blood slide for fever cases"],
          ["मच्छरदाणी वापर सल्ला", "मच्छरदानी उपयोग सलाह", "Advise bed-net use"],
        ],
      },
    ],
  },
  {
    title: ["कुटुंब नियोजन", "परिवार नियोजन", "Family planning"],
    icon: "👨‍👩‍👧",
    blocks: [
      {
        sub: ["समुपदेशन यादी", "परामर्श सूची", "Counselling checklist"],
        items: [
          ["पात्र जोडप्यांची नोंद अद्ययावत", "योग्य दंपति सूची अपडेट", "Keep the eligible-couple list updated"],
          ["साधनांचे पर्याय समजावणे", "साधनों के विकल्प समझाना", "Explain all method options"],
          ["अंतरा / माला-एन पुरवठा", "अंतरा / माला-एन आपूर्ति", "Antara / Mala-N supply"],
          ["दोन बाळांत ३ वर्षे अंतर", "दो बच्चों में 3 साल अंतर", "Three-year birth spacing"],
        ],
      },
    ],
  },
];

function ProgramsPage() {
  const { t, lang } = useT();
  return (
    <AppShell title={t("infoPrograms")} backTo="/info">
      <div className="space-y-3">
        {GROUPS.map((g) => (
          <Collapse key={g.title[2]} title={pick(lang, g.title)} icon={g.icon}>
            <div className="space-y-4">
              {g.blocks.map((b) => (
                <div key={b.sub[2]} className="space-y-2">
                  <h3 className="text-base font-extrabold text-primary">{pick(lang, b.sub)}</h3>
                  <CheckList items={b.items.map((i) => pick(lang, i))} />
                </div>
              ))}
            </div>
          </Collapse>
        ))}
        <p className="py-4 text-center text-sm text-muted-foreground">{t("placeholderNote")}</p>
      </div>
    </AppShell>
  );
}
