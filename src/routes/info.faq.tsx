import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Collapse } from "@/components/ui/collapse";
import { pick, useT, type Tri } from "@/lib/i18n";

export const Route = createFileRoute("/info/faq")({
  head: () => ({
    meta: [
      { title: "मदत व कार्यपद्धती — ASHA Helper" },
      {
        name: "description",
        content:
          "Help, daily workflow guide, and plain-language answers to common ASHA worker questions about using the offline helper.",
      },
      { property: "og:title", content: "मदत व कार्यपद्धती — Help & FAQ" },
      {
        property: "og:description",
        content: "ASHA daily workflow steps and common questions answered simply.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

const WORKFLOW_STEPS: Array<{ num: string; titleKey: string; descKey: string }> = [
  { num: "01", titleKey: "step1Title", descKey: "step1Desc" },
  { num: "02", titleKey: "step2Title", descKey: "step2Desc" },
  { num: "03", titleKey: "step3Title", descKey: "step3Desc" },
  { num: "04", titleKey: "step4Title", descKey: "step4Desc" },
];

const FAQS: Array<{ q: Tri; a: Tri }> = [
  {
    q: ["माझी माहिती कुठे साठवली जाते?", "मेरी जानकारी कहाँ सेव होती है?", "Where is my data stored?"],
    a: [
      "सर्व नोंदी फक्त तुमच्याच फोनमध्ये राहतात. कोणालाही पाठवल्या जात नाहीत आणि लोकेशन ट्रॅकिंग नाही.",
      "सारी प्रविष्टियाँ सिर्फ़ आपके फ़ोन में रहती हैं। किसी को भेजी नहीं जातीं और कोई लोकेशन ट्रैकिंग नहीं।",
      "Every entry stays on your own phone. Nothing is sent anywhere and there is no location tracking.",
    ],
  },
  {
    q: ["इंटरनेट नसताना वापरता येईल का?", "बिना इंटरनेट चलेगा?", "Does it work without internet?"],
    a: [
      "होय. सर्व फॉर्म ऑफलाइन चालतात. इंटरनेट नसल्यास वरती 'ऑफलाइन' असे दिसते, पण नोंद जतन होते.",
      "हाँ। सभी फ़ॉर्म ऑफ़लाइन चलते हैं। इंटरनेट न हो तो ऊपर 'ऑफ़लाइन' दिखता है, पर प्रविष्टि सेव होती है।",
      "Yes. All forms work offline. You will see an 'offline' badge on top, but your entry is still saved.",
    ],
  },
  {
    q: ["अर्धवट भरलेला फॉर्म हरवेल का?", "अधूरा फ़ॉर्म खो जाएगा?", "Will a half-filled form be lost?"],
    a: [
      "नाही. तुम्ही टाइप करताच प्रत्येक अक्षर आपोआप जतन होते. फोन बंद झाला तरी माहिती परत मिळते.",
      "नहीं। टाइप करते ही हर अक्षर अपने आप सेव होता है। फ़ोन बंद हो जाए तो भी जानकारी वापस मिलती है।",
      "No. Every keystroke auto-saves as you type, so the draft comes back even if the phone shuts down.",
    ],
  },
  {
    q: ["जुनी नोंद बदलता येते का?", "पुरानी प्रविष्टि बदल सकते हैं?", "Can I edit an old entry?"],
    a: [
      "होय. 'माझे लाभार्थी' मधून नाव निवडा आणि नवीन वजन, बीपी किंवा तारीख भरा.",
      "हाँ। 'मेरे लाभार्थी' से नाम चुनें और नया वज़न, बीपी या तारीख़ भरें।",
      "Yes. Open the person from My Beneficiaries and add the new weight, BP or date.",
    ],
  },
  {
    q: [
      "हे ॲप शासकीय पोर्टलची जागा घेते का?",
      "क्या यह ऐप सरकारी पोर्टल की जगह लेता है?",
      "Does this replace the government portals?",
    ],
    a: [
      "नाही. हे फक्त तुमच्या स्वतःच्या कामाची वही आहे. RCH, नि-क्षय, पोषण ट्रॅकरमध्ये नोंद वेगळी करावीच लागते.",
      "नहीं। यह सिर्फ़ आपके अपने काम की डायरी है। RCH, नि-क्षय, पोषण ट्रैकर में प्रविष्टि अलग से करनी होगी।",
      "No. It is only your personal work diary. You still enter data into RCH, Ni-Kshay and Poshan Tracker.",
    ],
  },
  {
    q: ["मानधनाची रक्कम कशी मोजली जाते?", "मानदेय राशि कैसे गिनी जाती है?", "How is the incentive calculated?"],
    a: [
      "दर पत्रकातील रकमेनुसार अंदाजे बेरीज दाखवली जाते. प्रत्यक्ष रक्कम PHC च्या मंजुरीनुसार बदलू शकते.",
      "दर सूची की राशि के अनुसार अनुमानित जोड़ दिखता है। वास्तविक राशि PHC की मंज़ूरी पर बदल सकती है।",
      "It totals the rate-card amounts as an estimate. The actual payment depends on PHC approval.",
    ],
  },
];

function FaqPage() {
  const { t, lang } = useT();

  return (
    <AppShell title={t("navHelp")} backTo="/" maxWidth="max-w-2xl">
      <div className="space-y-6">
        {/* 1. Daily Workflow Guide (Moved from landing page) */}
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              {t("dailyWorkflow")}
            </h2>
            <p className="text-sm text-muted-foreground leading-normal">
              {t("workflowSub")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-xl border border-border bg-card p-4 space-y-1.5"
              >
                <span className="text-xs font-semibold text-primary/70">{step.num}</span>
                <h3 className="text-sm font-semibold text-foreground">
                  {t(step.titleKey as any)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(step.descKey as any)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Frequently Asked Questions */}
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              {t("faqSectionTitle")}
            </h2>
            <p className="text-sm text-muted-foreground leading-normal">
              {t("infoFaqSub")}
            </p>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((f) => (
              <Collapse key={f.q[2]} title={pick(lang, f.q)} icon="?">
                <p className="text-sm text-foreground leading-relaxed">{pick(lang, f.a)}</p>
              </Collapse>
            ))}
          </div>
        </section>

        {/* 3. Reassurance Footer Note */}
        <p className="text-center text-xs text-muted-foreground py-2">{t("privacyNote")}</p>
      </div>
    </AppShell>
  );
}
