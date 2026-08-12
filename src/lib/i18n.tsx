import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "mr" | "hi" | "en";

type Dict = Record<string, [string, string, string]>; // [mr, hi, en]

// Every string: Marathi, Hindi, English.
const DICT: Dict = {
  appName: ["आशा सहाय्यक", "आशा सहायक", "ASHA Helper"],
  tagline: [
    "तुमच्या रोजच्या कामाची वही",
    "आपके रोज़ के काम की डायरी",
    "Your daily fieldwork diary",
  ],
  offline: ["ऑफलाइन — नंतर सिंक होईल", "ऑफ़लाइन — बाद में सिंक होगा", "Offline — will sync later"],
  online: ["ऑनलाइन", "ऑनलाइन", "Online"],
  savedLocally: ["फोनमध्ये सेव्ह झाले", "फ़ोन में सेव हो गया", "Saved on this phone"],
  autoSaving: ["आपोआप सेव्ह होत आहे…", "अपने आप सेव हो रहा है…", "Auto-saving…"],

  todayTasks: ["आजची कामे", "आज के काम", "Today's tasks"],
  noTasks: ["आज कोणतेही काम बाकी नाही", "आज कोई काम बाकी नहीं", "Nothing due today"],
  dueAnc: ["एएनसी तपासणी", "एएनसी जाँच", "ANC visit"],
  dueImm: ["लसीकरण", "टीकाकरण", "Immunization"],
  overdue: ["उशीर झाला", "देर हो गई", "Overdue"],
  dueToday: ["आज", "आज", "Today"],
  inDays: ["दिवसांत", "दिन में", "in days"],

  statVisits: ["या महिन्यातील नोंदी", "इस महीने की प्रविष्टियाँ", "Entries this month"],
  statPending: ["बाकी असलेली कामे", "बाकी काम", "Pending due-list"],
  statMothers: ["गरोदर माता", "गर्भवती माता", "Pregnant mothers"],
  statChildren: ["बालके", "बच्चे", "Children"],

  navInfo: ["माहिती केंद्र", "जानकारी केंद्र", "Information Hub"],
  navEntry: ["नोंद करा", "प्रविष्टि करें", "Data Entry"],
  navList: ["माझे लाभार्थी", "मेरे लाभार्थी", "My Beneficiaries"],
  navIncentive: ["मानधन नोंद", "मानदेय रिकॉर्ड", "Incentive Tracker"],
  comingSoon: ["लवकरच", "जल्द ही", "Coming soon"],

  entryTitle: ["कोणती नोंद करायची?", "कौन सी प्रविष्टि करनी है?", "What do you want to record?"],
  pregWoman: ["गरोदर महिला", "गर्भवती महिला", "Pregnant woman"],
  child: ["बालक", "बच्चा", "Child"],
  pregSub: ["एएनसी, बीपी, वजन, धोका", "एएनसी, बीपी, वज़न, जोखिम", "ANC, BP, weight, risk"],
  childSub: ["जन्म, लसीकरण, वजन", "जन्म, टीके, वज़न", "Birth, vaccines, weight"],

  name: ["नाव", "नाम", "Name"],
  age: ["वय", "उम्र", "Age"],
  address: ["पत्ता / घर क्र.", "पता / घर नं.", "Address / house no."],
  phone: ["मोबाईल नंबर", "मोबाइल नंबर", "Mobile number"],
  lmp: ["शेवटची पाळी (LMP)", "अंतिम माहवारी (LMP)", "Last period (LMP)"],
  edd: ["अपेक्षित प्रसूती तारीख", "संभावित प्रसव तिथि", "Expected delivery date"],
  autoCalc: ["आपोआप मोजले", "अपने आप गणना", "Auto-calculated"],
  highRisk: ["जास्त धोका आहे", "अधिक जोखिम है", "High risk"],
  ancVisits: ["एएनसी तपासण्या", "एएनसी जाँचें", "ANC visits"],
  visit: ["तपासणी", "जाँच", "Visit"],
  date: ["तारीख", "तारीख", "Date"],
  bp: ["बीपी", "बीपी", "BP"],
  weight: ["वजन (किलो)", "वज़न (किलो)", "Weight (kg)"],
  hb: ["हिमोग्लोबिन", "हीमोग्लोबिन", "Haemoglobin"],
  deliveryDetails: ["प्रसूतीची माहिती", "प्रसव की जानकारी", "Delivery details"],
  deliveryDate: ["प्रसूती तारीख", "प्रसव तिथि", "Delivery date"],
  deliveryPlace: ["प्रसूती ठिकाण", "प्रसव स्थान", "Place of delivery"],
  outcome: ["निकाल", "परिणाम", "Outcome"],

  dob: ["जन्म तारीख", "जन्म तिथि", "Date of birth"],
  birthWeight: ["जन्मावेळचे वजन (किलो)", "जन्म के समय वज़न (किलो)", "Birth weight (kg)"],
  gender: ["लिंग", "लिंग", "Gender"],
  boy: ["मुलगा", "लड़का", "Boy"],
  girl: ["मुलगी", "लड़की", "Girl"],
  motherName: ["आईचे नाव", "माँ का नाम", "Mother's name"],
  immunization: ["लसीकरण", "टीकाकरण", "Immunization"],
  given: ["दिले", "दिया", "Given"],
  growth: ["वाढ तपासणी", "वृद्धि जाँच", "Growth monitoring"],
  height: ["उंची (सेमी)", "ऊँचाई (सेमी)", "Height (cm)"],
  muac: ["MUAC (सेमी)", "MUAC (सेमी)", "MUAC (cm)"],
  addRow: ["आणखी एक नोंद", "एक और प्रविष्टि", "Add another entry"],

  save: ["जतन करा", "सेव करें", "Save"],
  saved: ["जतन झाले", "सेव हो गया", "Saved"],
  back: ["मागे", "वापस", "Back"],
  home: ["मुख्य पान", "मुख्य पृष्ठ", "Home"],
  edit: ["बदल करा", "बदलें", "Edit"],
  required: ["नाव लिहा", "नाम लिखें", "Please enter a name"],
  select: ["निवडा", "चुनें", "Select"],
  yes: ["होय", "हाँ", "Yes"],
  no: ["नाही", "नहीं", "No"],
  noRecords: ["अजून नोंद नाही", "अभी कोई प्रविष्टि नहीं", "No records yet"],
  recent: ["अलीकडील नोंदी", "हाल की प्रविष्टियाँ", "Recent entries"],
  privacyNote: [
    "सर्व माहिती फक्त तुमच्या फोनमध्ये राहते. कोणतेही लोकेशन ट्रॅकिंग नाही.",
    "सारी जानकारी सिर्फ़ आपके फ़ोन में रहती है। कोई लोकेशन ट्रैकिंग नहीं।",
    "All data stays on your phone. No location tracking.",
  ],

  // Information Hub
  infoTitle: ["माहिती केंद्र", "जानकारी केंद्र", "Information Hub"],
  infoSub: [
    "वाचण्यासाठी माहिती — काहीही भरायचे नाही",
    "पढ़ने के लिए जानकारी — कुछ भरना नहीं",
    "Reference reading — nothing to fill in",
  ],
  infoScheme: ["आशा योजना माहिती", "आशा योजना जानकारी", "ASHA scheme overview"],
  infoSchemeSub: ["कामे, जबाबदाऱ्या, मानधन", "काम, ज़िम्मेदारियाँ, मानदेय", "Roles, duties, honorarium"],
  infoPrograms: ["कार्यक्रम मार्गदर्शक", "कार्यक्रम गाइड", "Program guides"],
  infoProgramsSub: [
    "माता-बाल, लसीकरण, टीबी, हिवताप, कुटुंब नियोजन",
    "मातृ-शिशु, टीकाकरण, टीबी, मलेरिया, परिवार नियोजन",
    "MCH, immunization, TB, malaria, family planning",
  ],
  infoRates: ["मानधन दर पत्रक", "मानदेय दर सूची", "Incentive rate card"],
  infoRatesSub: ["कोणत्या कामाचे किती पैसे", "किस काम के कितने पैसे", "What each activity pays"],
  infoFaq: ["नेहमीचे प्रश्न", "अक्सर पूछे प्रश्न", "FAQ"],
  infoFaqSub: ["सोप्या भाषेत उत्तरे", "आसान भाषा में जवाब", "Plain-language answers"],
  infoEmergency: ["तातडीचे संपर्क", "आपातकालीन संपर्क", "Emergency referral"],
  placeholderNote: [
    "ही नमुना माहिती आहे — तुम्ही नंतर बदलू शकता.",
    "यह नमूना जानकारी है — आप बाद में बदल सकते हैं।",
    "Placeholder content — edit this later.",
  ],
  activity: ["काम", "काम", "Activity"],
  amount: ["रक्कम (₹)", "राशि (₹)", "Amount (₹)"],
  notes: ["शेरा", "टिप्पणी", "Notes"],

  // TB + survey forms
  tbPatient: ["क्षयरोग (टीबी) रुग्ण", "क्षय रोग (टीबी) मरीज़", "TB patient"],
  tbSub: ["उपचार, डॉट्स डोस, पाठपुरावा", "इलाज, डॉट्स ख़ुराक, फ़ॉलोअप", "Treatment, DOTS, follow-up"],
  tbStart: ["उपचार सुरू तारीख", "इलाज शुरू तिथि", "Treatment start date"],
  tbRegimen: ["उपचार प्रकार", "इलाज का प्रकार", "Regimen"],
  tbDoses: ["डॉट्स डोस नोंद", "डॉट्स ख़ुराक रिकॉर्ड", "DOTS dose tracking"],
  tbFollowUps: ["पाठपुरावा तारखा", "फ़ॉलोअप तिथियाँ", "Follow-up visit dates"],
  week: ["आठवडा", "सप्ताह", "Week"],
  month: ["महिना", "माह", "Month"],
  taken: ["घेतला", "लिया", "Taken"],
  survey: ["हिवताप / डेंग्यू सर्वेक्षण", "मलेरिया / डेंगू सर्वे", "Malaria / dengue survey"],
  surveySub: ["ताप सर्वे, अळी तपासणी", "बुख़ार सर्वे, लार्वा जाँच", "Fever survey, larval check"],
  houseCount: ["घरांची संख्या", "घरों की संख्या", "Households visited"],
  feverCases: ["तापाचे रुग्ण", "बुख़ार के मरीज़", "Fever cases found"],
  feverChecklist: ["ताप सर्वे यादी", "बुख़ार सर्वे सूची", "Fever survey checklist"],
  larvalSurvey: ["अळी सर्वेक्षण केले?", "लार्वा सर्वे किया?", "Larval survey done?"],
  larvalFound: ["अळ्या आढळल्या?", "लार्वा मिला?", "Larvae found?"],
  bloodSample: ["रक्त नमुना घेतला?", "रक्त नमूना लिया?", "Blood sample collected?"],
  notesField: ["इतर नोंद", "अन्य टिप्पणी", "Other notes"],
};

const INDEX: Record<Lang, 0 | 1 | 2> = { mr: 0, hi: 1, en: 2 };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof DICT) => string };
const LangContext = createContext<Ctx>({ lang: "mr", setLang: () => {}, t: (k) => DICT[k][0] });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("mr");

  useEffect(() => {
    const stored = localStorage.getItem("asha.lang") as Lang | null;
    if (stored === "mr" || stored === "hi" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("asha.lang", l);
  }, []);

  const t = useCallback((k: keyof typeof DICT) => DICT[k][INDEX[lang]], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}

export const VACCINES: Array<{ code: string; label: [string, string, string]; weeks: number }> = [
  { code: "bcg", label: ["बीसीजी", "बीसीजी", "BCG"], weeks: 0 },
  { code: "opv0", label: ["ओपीव्ही-० / हेप-बी", "ओपीवी-0 / हेप-बी", "OPV-0 / Hep-B"], weeks: 0 },
  { code: "penta1", label: ["पेंटा-१ / ओपीव्ही-१", "पेंटा-1 / ओपीवी-1", "Penta-1 / OPV-1"], weeks: 6 },
  { code: "penta2", label: ["पेंटा-२ / ओपीव्ही-२", "पेंटा-2 / ओपीवी-2", "Penta-2 / OPV-2"], weeks: 10 },
  { code: "penta3", label: ["पेंटा-३ / ओपीव्ही-३", "पेंटा-3 / ओपीवी-3", "Penta-3 / OPV-3"], weeks: 14 },
  { code: "mr1", label: ["गोवर-रुबेला १", "खसरा-रूबेला 1", "Measles-Rubella 1"], weeks: 39 },
  { code: "mr2", label: ["गोवर-रुबेला २", "खसरा-रूबेला 2", "Measles-Rubella 2"], weeks: 72 },
];

export function vaccineLabel(code: string, lang: Lang) {
  const v = VACCINES.find((x) => x.code === code);
  return v ? v.label[INDEX[lang]] : code;
}

export type Tri = [string, string, string];

/** Pick the right language out of a [mr, hi, en] tuple. */
export function pick(lang: Lang, tri: Tri): string {
  return tri[INDEX[lang]];
}
