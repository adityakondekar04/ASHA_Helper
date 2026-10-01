import { pick, type Lang, type Tri } from "./i18n";
import type { IncentiveLogRecord } from "./store";

export interface IncentiveRateItem {
  code: string;
  activity: Tri;
  rate: number; // in Rupees
  unit: Tri;
  note: Tri;
}

export const INCENTIVE_RATES: IncentiveRateItem[] = [
  {
    code: "anc",
    activity: [
      "गरोदर नोंदणी व एएनसी तपासणी",
      "गर्भवती पंजीकरण व एएनसी जाँच",
      "Pregnancy registration & ANC visit",
    ],
    rate: 75,
    unit: ["प्रति तपासणी", "प्रति जाँच", "Per visit"],
    note: ["४ तपासण्या पूर्ण झाल्यावर ₹३००", "4 जाँच पूरी होने पर ₹300", "Total ₹300 for 4 visits"],
  },
  {
    code: "delivery",
    activity: [
      "संस्थात्मक प्रसूती सोबत",
      "संस्थागत प्रसव साथ",
      "Institutional delivery escort",
    ],
    rate: 600,
    unit: ["प्रति प्रसूती", "प्रति प्रसव", "Per delivery"],
    note: ["ग्रामीण भागासाठी दर", "ग्रामीण क्षेत्र हेतु दर", "Rural area rate"],
  },
  {
    code: "hbnc",
    activity: [
      "एचबीएनसी गृहभेट",
      "एचबीएनसी गृह भेंट",
      "HBNC home visit",
    ],
    rate: 40,
    unit: ["प्रति भेट", "प्रति भेंट", "Per visit"],
    note: ["६ भेटी नोंदवल्यावर ₹२५०", "6 भेंट दर्ज होने पर ₹250", "Total ₹250 on 6 visits"],
  },
  {
    code: "immunization",
    activity: [
      "संपूर्ण लसीकरण (१ वर्ष)",
      "पूर्ण टीकाकरण (1 वर्ष)",
      "Full immunization (1 year)",
    ],
    rate: 100,
    unit: ["प्रति बालक", "प्रति बच्चा", "Per child"],
    note: ["प्रति बालक मानधन", "प्रति बच्चा मानदेय", "Incentive per child"],
  },
  {
    code: "tb",
    activity: [
      "टीबी रुग्ण पाठपुरावा व डोस",
      "टीबी मरीज़ फ़ॉलोअप व ख़ुराक",
      "TB follow-up & DOTS dose",
    ],
    rate: 200,
    unit: ["प्रति भेट/पाठपुरावा", "प्रति भेंट/फ़ॉलोअप", "Per follow-up visit"],
    note: ["उपचार पूर्ण झाल्यावर ₹१०००", "इलाज पूर्ण होने पर ₹1000", "₹1000 on full completion"],
  },
  {
    code: "survey",
    activity: [
      "हिवताप / डेंग्यू सर्वे व नमुना",
      "मलेरिया / डेंगू सर्वे व नमूना",
      "Malaria / dengue survey & slide",
    ],
    rate: 15,
    unit: ["प्रति नमुना", "प्रति नमूना", "Per slide"],
    note: ["प्रति रक्त नमुना", "प्रति रक्त नमूना", "Per blood slide collected"],
  },
  {
    code: "counseling",
    activity: [
      "कुटुंब नियोजन सल्ला व प्रेरणा",
      "परिवार नियोजन सलाह व प्रेरणा",
      "Family planning counseling",
    ],
    rate: 200,
    unit: ["प्रति प्रकरण", "प्रति केस", "Per case"],
    note: ["शस्त्रक्रिया प्रेरणा मानधन", "सर्जरी प्रेरणा मानदेय", "Motivation for procedure"],
  },
  {
    code: "vhd",
    activity: [
      "ग्राम आरोग्य दिन सहभाग",
      "ग्राम स्वास्थ्य दिवस सहभाग",
      "Village health day participation",
    ],
    rate: 100,
    unit: ["प्रति कार्यक्रम", "प्रति कार्यक्रम", "Per event"],
    note: ["दरमहा एकदा", "माह में एक बार", "Once a month"],
  },
];

export function getIncentiveItem(code: string): IncentiveRateItem | undefined {
  return INCENTIVE_RATES.find((item) => item.code === code);
}

/** Calculate total expected incentive for a set of activity counts. */
export function calculateLogTotal(activities: Record<string, number>): number {
  let total = 0;
  for (const item of INCENTIVE_RATES) {
    const count = activities[item.code] || 0;
    total += count * item.rate;
  }
  return total;
}

/** Format YYYY-MM date string into Marathi/Hindi/English month display name */
export function formatMonthName(yearMonth: string, lang: Lang): string {
  if (!yearMonth || yearMonth.length < 7) return yearMonth;
  const [yearStr, monthStr] = yearMonth.split("-");
  const monthIdx = parseInt(monthStr, 10) - 1;

  const monthsMr = [
    "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
    "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
  ];
  const monthsHi = [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
  ];
  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  if (lang === "mr") return `${monthsMr[monthIdx] || ""} ${yearStr}`;
  if (lang === "hi") return `${monthsHi[monthIdx] || ""} ${yearStr}`;
  return `${monthsEn[monthIdx] || ""} ${yearStr}`;
}

export interface MonthlyActivitySummary {
  code: string;
  activityName: string;
  unitRate: number;
  totalCount: number;
  expectedAmount: number;
  isReceived: boolean;
}

export interface MonthlyIncentiveSummary {
  monthKey: string; // YYYY-MM
  totalExpected: number;
  totalReceived: number;
  totalPending: number;
  totalHouseholds: number;
  activities: MonthlyActivitySummary[];
}

/** Aggregate daily logs into a monthly summary with payment statuses. */
export function buildMonthlySummary(
  logs: IncentiveLogRecord[],
  monthKey: string,
  paymentStatusMap: Record<string, Record<string, boolean>>,
  lang: Lang
): MonthlyIncentiveSummary {
  const monthLogs = logs.filter((log) => log.date.startsWith(monthKey));
  const monthPayments = paymentStatusMap[monthKey] || {};

  let totalExpected = 0;
  let totalReceived = 0;
  let totalHouseholds = 0;

  for (const log of monthLogs) {
    totalHouseholds += Number(log.householdsVisited) || 0;
  }

  const activities: MonthlyActivitySummary[] = INCENTIVE_RATES.map((item) => {
    let totalCount = 0;
    for (const log of monthLogs) {
      totalCount += Number(log.activities?.[item.code]) || 0;
    }
    const expectedAmount = totalCount * item.rate;
    const isReceived = Boolean(monthPayments[item.code]);

    totalExpected += expectedAmount;
    if (isReceived) {
      totalReceived += expectedAmount;
    }

    return {
      code: item.code,
      activityName: pick(lang, item.activity),
      unitRate: item.rate,
      totalCount,
      expectedAmount,
      isReceived,
    };
  });

  const totalPending = Math.max(0, totalExpected - totalReceived);

  return {
    monthKey,
    totalExpected,
    totalReceived,
    totalPending,
    totalHouseholds,
    activities,
  };
}

/** Get list of distinct month keys (YYYY-MM) present in logs, plus current month. */
export function getAvailableMonths(logs: IncentiveLogRecord[]): string[] {
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthSet = new Set<string>([currentMonthKey]);

  for (const log of logs) {
    if (log.date && log.date.length >= 7) {
      monthSet.add(log.date.slice(0, 7));
    }
  }

  return Array.from(monthSet).sort().reverse();
}
