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

  navHome: ["मुख्य", "होम", "Home"],
  navDailyRegister: ["दैनिक वही", "दैनिक डायरी", "Daily register"],
  navResources: ["साधने", "संसाधन", "Resources"],
  navHelp: ["मदत", "मदद", "Help"],
  newEntry: ["नवीन नोंद", "नई प्रविष्टि", "New entry"],
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

  // Incentive Tracker
  incentiveTrackerTitle: ["मानधन नोंदणी व हिशोब", "मानदेय रिकॉर्ड व हिसाब", "Incentive Tracker"],
  incentiveTrackerSub: ["दैनंदिन कामाची नोंद व मानधन", "दैनिक कार्य रिकॉर्ड व मानदेय", "Daily work log & incentive calculation"],
  tabDailyLog: ["आजची नोंद", "आज का रिकॉर्ड", "Daily Log"],
  tabMonthlySummary: ["महिन्याचा हिशोब", "महीने का हिसाब", "Monthly Summary"],
  tabHistory: ["महिनावारी आलेख", "मासिक चार्ट", "Monthly History"],
  logDate: ["नोंद तारीख", "रिकॉर्ड तिथि", "Log date"],
  householdsVisitedCount: ["आज भेट दिलेली घरे", "आज भेंट किए गए घर", "Households visited today"],
  activitiesChecklist: ["आज पूर्ण केलेली कामे", "आज पूरे किए गए काम", "Activities completed today"],
  todayExpected: ["आजचे अपेक्षित मानधन", "आज का संभावित मानदेय", "Today's expected incentive"],
  monthExpectedTotal: ["महिन्याचे अपेक्षित मानधन", "महीने का संभावित मानदेय", "Month expected incentive"],
  receivedIncentive: ["मिळालेले मानधन", "मिला हुआ मानदेय", "Received incentive"],
  pendingIncentive: ["बाकी मानधन", "बाकी मानदेय", "Pending incentive"],
  paymentReceived: ["पैसे मिळाले?", "पैसे मिले?", "Payment received?"],
  receivedShort: ["मिळाले", "मिले", "Received"],
  pendingShort: ["बाकी", "बाकी", "Pending"],
  logSaved: ["मानधन नोंद सेव्ह झाली!", "मानदेय रिकॉर्ड सेव हो गया!", "Incentive log saved!"],
  recentDailyLogs: ["अलीकडील दैनंदिन नोंदी", "हाल की दैनिक प्रविष्टियाँ", "Recent daily activity logs"],
  noLogsFound: ["अजून कोणतीही नोंद नाही. आजची कामे नोंदवा!", "अभी कोई प्रविष्टि नहीं। आज के काम दर्ज करें!", "No daily logs recorded yet. Add today's activities!"],
  monthByMonthTitle: ["महिनावारी मानधन अहवाल", "मासिक मानदेय रिपोर्ट", "Month-by-month incentive report"],
  deleteLogConfirm: ["ही नोंद हटवायची आहे का?", "क्या यह प्रविष्टि हटानी है?", "Delete this log?"],
  totalEntries: ["एकूण नोंदी", "कुल प्रविष्टियाँ", "Total log entries"],
  selectMonth: ["महिना निवडा", "महीना चुनें", "Select Month"],
  features: ["वैशिष्ट्ये", "सुविधाएँ", "Features"],

  // Navigation
  navHome: ["मुख्य पान", "मुख्य पृष्ठ", "Home"],
  navDiary: ["दैनंदिनी", "दैनिक डायरी", "Diary"],
  navAccount: ["खाते", "खाता", "Account"],
  ruralHealthMission: ["महाराष्ट्र आरोग्य सहकार्य", "महाराष्ट्र स्वास्थ्य सहयोग", "Maharashtra Health Initiative"],

  // Landing Page & Hero
  landingBadge: [
    "महाराष्ट्र आशा सेविकांसाठी डिजिटल साथी • 100% ऑफलाइन कार्यक्षम",
    "महाराष्ट्र आशा कार्यकर्ताओं के लिए डिजिटल साथी • 100% ऑफ़लाइन सक्षम",
    "Digital Companion for Maharashtra ASHA Workers • 100% Offline-Ready",
  ],
  landingHeadline: [
    "गावातील प्रत्येक मातेचे व बालकाचे आरोग्य आता बोटांच्या टोकावर",
    "गाँव की हर माता और बच्चे का स्वास्थ्य अब उँगलियों पर",
    "Frontline Maternal & Child Health Care at Your Fingertips",
  ],
  landingSub: [
    "आरोग्य तपासणी, लसीकरण, टीबी पाठपुरावा आणि दरमहा मानधनाचा हिशोब — सर्व काही तुमच्या स्वतःच्या फोनवर, विना इंटरनेट आणि संपूर्ण सुरक्षित.",
    "स्वास्थ्य जाँच, टीकाकरण, टीबी फ़ॉलोअप और मासिक मानदेय का हिसाब — सब कुछ आपके अपने फ़ोन में, बिना इंटरनेट और पूरी सुरक्षा के साथ।",
    "Maternal checkups, child immunization tracking, TB care, and monthly incentive calculations — all on your own phone, zero internet required.",
  ],
  heroSubcenterDesign: [
    "आरोग्य उपकेंद्र व ग्रामीण भागासाठी विशेष डिझाइन",
    "स्वास्थ्य उपकेंद्र और ग्रामीण क्षेत्र के लिए विशेष रूप से डिज़ाइन",
    "Specially Designed for Health Sub-Centers & Rural Hamlets",
  ],
  openDailyDiary: ["दैनिक वही उघडा", "दैनिक डायरी खोलें", "Open Daily Diary"],
  loginBtn: ["लॉगिन करा", "लॉगिन करें", "Sign In / Login"],
  signupBtn: ["नवीन नोंदणी करा", "नया पंजीकरण करें", "Register as ASHA"],
  viewFeatures: ["वैशिष्ट्ये पहा", "सुविधाएँ देखें", "Explore Features"],
  dailyWorkflow: ["दैनंदिन कार्यपद्धती", "दैनिक कार्यप्रणाली", "Daily Field Workflow"],
  whyTrustUs: ["आशा सेविकांचा विश्वास का?", "आशा कार्यकर्ताओं का भरोसा क्यों?", "Why ASHA Workers Trust Us"],
  pwaTitle: ["मोबाईलवर ॲप कसे सुरू करावे?", "मोबाइल पर ऐप कैसे शुरू करें?", "How to Add to Phone Home Screen"],
  guestAccess: ["खात्याशिवाय थेट डायरी वापरा", "बिना खाते के सीधे डायरी इस्तेमाल करें", "Continue as Guest without Login"],

  // Trust Badges
  zeroTracking: ["शून्य ट्रॅकिंग", "शून्य ट्रैकिंग", "Zero Tracking"],
  noGps: ["कोणतेही GPS नाही", "कोई GPS नहीं", "No GPS Surveillance"],
  fullOffline: ["100% ऑफलाइन", "100% ऑफ़लाइन", "100% Offline"],
  worksWithoutNet: ["विना इंटरनेट चालते", "बिना इंटरनेट चलता है", "Works Without Internet"],
  autoSave: ["ऑटो-सेव्ह", "ऑटो-सेव", "Auto-Save"],
  dataNeverLost: ["डेटा कधीही गळत नाही", "डेटा कभी नहीं खोता", "Data is Never Lost"],
  largeButtons: ["मोठे बटणे", "बड़े बटन", "Large Touch Targets"],
  sunlightReadable: ["उन्हातही स्पष्ट वाचता येते", "धूप में भी साफ़ दिखता है", "High Contrast in Sunlight"],
  subcenterShiroli: [
    "आरोग्य उपकेंद्र • शिरोली (सातारा)",
    "स्वास्थ्य उपकेंद्र • शिरोली (सातारा)",
    "Health Sub-Center • Shiroli (Satara)",
  ],
  nhmCompliant: [
    "राष्ट्रीय आरोग्य अभियान (NHM) कार्यपद्धतीनुसार",
    "राष्ट्रीय स्वास्थ्य मिशन (NHM) पद्धति के अनुसार",
    "Aligned with National Health Mission (NHM)",
  ],
  activeCompanion: ["सक्रिय डिजिटल साथी", "सक्रिय डिजिटल साथी", "Active Digital Companion"],
  sampleTodayTask: ["आजची तपासणी", "आज की जाँच", "Today's Due Visits"],
  sampleTaskDesc: [
    "सुनिता ताई — २ ANC + ३ लसीकरण",
    "सुनिता ताई — 2 ANC + 3 टीकाकरण",
    "Sunita Tai — 2 ANC + 3 Vaccines",
  ],

  // Impact Counters
  impactVillagesNum: ["१,५००+", "1,500+", "1,500+"],
  impactVillages: ["गावे व वाड्यांचे उद्दिष्ट", "गाँव और बस्तियों का लक्ष्य", "Target Rural Villages"],
  impactAncNum: ["४ ANC", "4 ANC", "4 ANC"],
  impactAnc: [
    "अनिवार्य तपासण्यांची स्वयंचलित यादी",
    "अनिवार्य जाँचों की स्वचालित सूची",
    "Automated Mandatory ANC Schedules",
  ],
  impactVaccinesNum: ["७+ लस", "7+ टीके", "7+ Vaccines"],
  impactVaccines: [
    "जन्म ते १५ महिन्यांचे वेळापत्रक",
    "जन्म से 15 महीने का संपूर्ण शेड्यूल",
    "Birth to 15-Month Vaccine Timelines",
  ],
  impactCostNum: ["₹०", "₹0", "₹0"],
  impactCost: [
    "डेटा किंवा सर्व्हर खर्च (100% मोफत)",
    "डेटा या सर्वर ख़र्च (100% मुफ़्त)",
    "Data & Server Cost (100% Free)",
  ],

  // Features Section
  featuresHeading: [
    "आशा सेविकांच्या प्रत्यक्ष कामाशी सुसंगत वैशिष्ट्ये",
    "आशा कार्यकर्ताओं के प्रत्यक्ष काम के अनुसार सुविधाएँ",
    "Features Aligned with Daily Fieldwork",
  ],
  featuresSub: [
    "कागदी वह्या सांभाळण्याचा त्रास संपवा. प्रत्येक तपासणी व मानधनाची अचूक नोंद ठेवा.",
    "कागज़ी रजिस्टरों का झंझट ख़त्म। हर जाँच और मानदेय का सटीक हिसाब रखें।",
    "Eliminate bulky paper registers. Keep accurate records of visits and incentives.",
  ],
  tabMch: ["माता आरोग्य व ANC", "मातृ स्वास्थ्य व ANC", "Maternal Health & ANC"],
  tabChild: ["बाल संगोपन व लसीकरण", "शिशु देखरेख व टीकाकरण", "Child Health & Vaccines"],
  tabTb: ["टीबी व डास सर्वेक्षण", "टीबी व मलेरिया सर्वे", "TB & Vector Surveys"],
  tabIncentive: ["मानधन ट्रॅकर", "मानदेय ट्रैकर", "Incentive Tracker"],

  naegeleRule: [
    "नेगेल्स नियम (Naegele's Rule) कॅल्क्युलेटर",
    "नेगेल्स नियम कैलकुलेटर",
    "Naegele's Rule EDD Calculator",
  ],
  mchTitle: [
    "गरोदर महिला नोंदणी व ANC वेळापत्रक",
    "गर्भवती महिला पंजीकरण व ANC शेड्यूल",
    "Pregnant Mother Registration & ANC Schedule",
  ],
  mchDesc: [
    "शेवटची पाळी (LMP) तारीख टाकताच अपेक्षित प्रसूती तारीख (EDD) आपोआप मोजली जाते. ४ अनिवार्य तपासण्यांच्या तारखा तयार होतात. बीपी १४०/९० किंवा हिमोग्लोबिन ११ पेक्षा कमी असल्यास त्वरित धोक्याचा इशारा मिळतो.",
    "अंतिम माहवारी (LMP) डालते ही संभावित प्रसव तिथि (EDD) अपने आप तय हो जाती है। 4 आवश्यक जाँचों की तिथियाँ तैयार होती हैं। बीपी 140/90 या हीमोग्लोबिन 11 से कम होने पर तुरंत जोखिम चेतावनी मिलती है।",
    "Entering the Last Menstrual Period (LMP) instantly computes the Expected Delivery Date (EDD). Mandated 4 ANC visit dates are generated automatically with high-risk BP & anemia alerts.",
  ],
  mchCheck1: [
    "स्वयंचलित EDD व 4 ANC तपासण्यांची यादी",
    "स्वचालित EDD और 4 ANC जाँच सूची",
    "Automated EDD and 4 ANC visit target dates",
  ],
  mchCheck2: [
    "उच्च रक्तदाब (High BP) व ॲनिमिया धोक्याचा इशारा",
    "उच्च रक्तचाप और एनीमिया चेतावनी",
    "Critical high BP and severe anemia risk warnings",
  ],
  mchCheck3: [
    "प्रसूती ठिकाण व जननी सुरक्षा योजना (JSY) ट्रॅकिंग",
    "प्रसव स्थान और जननी सुरक्षा योजना (JSY) ट्रैकिंग",
    "Delivery outcome and JSY institutional incentive tracking",
  ],
  registerPregBtn: ["गरोदर महिला नोंद करा", "गर्भवती महिला दर्ज करें", "Register Pregnant Mother"],
  sampleMotherName: [
    "सौ. सविता ज्ञानेश्वर शिंदे (वय २४)",
    "श्रीमती सविता ज्ञानेश्वर शिंदे (उम्र 24)",
    "Smt. Savita Dnyaneshwar Shinde (Age 24)",
  ],
  sampleMotherAddress: [
    "पत्ता: घर क्र. १२, मारुती आळी, शिरोली",
    "पता: घर नं. 12, मारुति गली, शिरोली",
    "Address: House #12, Maruti Lane, Shiroli",
  ],
  sampleLmpDate: ["१५ मे २०२६", "15 मई 2026", "15 May 2026"],
  sampleEddDate: ["२२ फेब्रुवारी २०२७", "22 फरवरी 2027", "22 February 2027"],
  sampleBpWarning: [
    "बीपी: १४०/९२ mmHg • तात्काळ PHC रेफरल आवश्यक",
    "बीपी: 140/92 mmHg • तत्काल PHC रेफरल आवश्यक",
    "BP: 140/92 mmHg • Immediate PHC Referral Recommended",
  ],

  uipTitle: [
    "राष्ट्रीय लसीकरण वेळापत्रक (UIP)",
    "राष्ट्रीय टीकाकरण शेड्यूल (UIP)",
    "Universal Immunization Programme (UIP)",
  ],
  childFeatureTitle: [
    "बालक नोंदणी व वेळेवर संपूर्ण लसीकरण",
    "शिशु पंजीकरण और समय पर पूर्ण टीकाकरण",
    "Child Registration & Timely Immunization",
  ],
  childFeatureDesc: [
    "बाळाच्या जन्मतारखेनुसार (DOB) जन्माच्या लसी (BCG, OPV-0, Hep-B) ते ६, १०, १४ आठवड्यांचे पेंटाव्हॅलंट आणि ९ ते १५ महिन्यांचे गोवर-रुबेला (MR) लस वेळेवर देण्यासाठी कलर-कोडेड सूचना मिळतात.",
    "शिशु की जन्मतिथि (DOB) के अनुसार जन्म के टीके (BCG, OPV-0, Hep-B) से लेकर 6, 10, 14 सप्ताह और 9 से 15 महीने के एमआर टीकों की समय पर कलर-कोडेड सूचना मिलती है।",
    "Calculates complete vaccine timelines from birth (BCG, OPV-0, Hep-B) through 6, 10, 14 weeks and 9-15 months (MR) with color-coded urgency.",
  ],
  childCheck1: [
    "उशीर झालेली व आज देण्याची लस स्पष्ट ओळख",
    "विलंबित और आज देय टीकों की स्पष्ट पहचान",
    "Color-coded overdue and due-today vaccine badges",
  ],
  childCheck2: [
    "वाढ तपासणी: वजन (Weight), उंची आणि MUAC नोंद",
    "वृद्धि निगरानी: वज़न, ऊँचाई और MUAC रिकॉर्ड",
    "Growth monitoring: Weight, Height, and MUAC measurements",
  ],
  childCheck3: [
    "गावातील कोणतेही बाळ लसीकरणातून सुटणार नाही",
    "गाँव का कोई भी बच्चा टीकाकरण से नहीं छूटेगा",
    "Zero dropout target for village infant cohorts",
  ],
  registerChildBtn: ["बालक नोंद करा", "शिशु दर्ज करें", "Register Child"],
  sampleChildName1: ["आरव अमोल जाधव", "आरव अमोल जाधव", "Aarav Amol Jadhav"],
  sampleVaccine1: ["पेंटाव्हॅलंट-१ / ओपीव्ही-१", "पेंटावैलेंट-1 / ओपीवी-1", "Pentavalent-1 / OPV-1"],
  sampleChildName2: ["अनन्या महेश पवार", "अनन्या महेश पवार", "Ananya Mahesh Pawar"],
  sampleVaccine2: ["गोवर-रुबेला (MR-1)", "खसरा-रूबेला (MR-1)", "Measles-Rubella (MR-1)"],
  sampleOverdueTag: ["उशीर झाला (२ दिवस)", "देर हो गई (2 दिन)", "Overdue (2 days)"],
  sampleDueTodayTag: ["आज देय आहे", "आज देय है", "Due Today"],

  dotsTitle: [
    "निक्षय (Ni-Kshay) सहकार्य",
    "निक्षय (Ni-Kshay) सहयोग",
    "Ni-Kshay TB & Vector Control",
  ],
  tbFeatureTitle: [
    "टीबी डॉट्स उपचार व साथरोग सर्वेक्षण",
    "टीबी डॉट्स उपचार और महामारी सर्वे",
    "TB DOTS Adherence & Vector Surveys",
  ],
  tbFeatureDesc: [
    "क्षयरोग (TB) रुग्णांनी रोजच्या गोळ्या (DOTS) नियमित घेतल्याची आठवडा व महिनानिहाय नोंद ठेवा. हिवताप (मलेरिया) आणि डेंग्यू साथीच्या काळात घराघरात जाऊन तापाचे रुग्ण आणि डासांच्या अळ्या शोधण्याचा सर्व्हे एका मिनिटात भरा.",
    "टीबी मरीज़ों द्वारा नियमित डॉट्स दवाएँ लेने का साप्ताहिक व मासिक रिकॉर्ड रखें। मलेरिया व डेंगू के मौसम में बुखार और लार्वा सर्वे मिनटों में पूरा करें।",
    "Track weekly/monthly DOTS medication adherence for TB patients. Conduct household fever checks and larval surveys quickly during vector season.",
  ],
  tbCheck1: [
    "टीबी डॉट्स डोस पूर्णतेची साधी चेकलिस्ट",
    "टीबी डॉट्स डोज़ पूर्णता चेकलिस्ट",
    "Simple weekly checklist for DOTS dose completion",
  ],
  tbCheck2: [
    "डास अळी शोध व रक्त नमुना संकलन सर्व्हे",
    "मच्छर लार्वा जाँच व रक्त नमूना सर्वे",
    "Larval inspection and blood smear collection records",
  ],
  tbBtn: ["टीबी नोंद", "टीबी रिकॉर्ड", "TB Record"],
  surveyBtn: ["साथरोग सर्व्हे", "महामारी सर्वे", "Vector Survey"],
  sampleSurveyTitle: [
    "शिरोली गाव डास व ताप सर्व्हे",
    "शिरोली गाँव बुखार व लार्वा सर्वे",
    "Shiroli Village Fever & Larval Survey",
  ],
  sampleHousesVisited: ["भेट दिलेली घरे: ३५", "भेंट किए गए घर: 35", "Households Visited: 35"],
  sampleFeverCases: ["तापाचे रुग्ण: २ रुग्ण सापडले", "बुख़ार मरीज़: 2 मरीज़ मिले", "Fever Cases: 2 Found"],
  sampleLarvae: [
    "डास अळी तपासणी: होय (नष्ट केले)",
    "लार्वा जाँच: हाँ (नष्ट किया)",
    "Larval Check: Yes (Destroyed)",
  ],

  incentiveFeatureTitle: [
    "कामाची नोंद आणि महिन्याच्या मानधनाचा हिशोब",
    "काम का रिकॉर्ड और मासिक मानदेय का हिसाब",
    "Activity Logging & Monthly Honorarium Calculator",
  ],
  incentiveFeatureDesc: [
    "प्रत्येक कामाचे (JSY प्रसूती सहकार्य ₹३००, संपूर्ण लसीकरण ₹१००, टीबी पाठपुरावा ₹१,०००) दरपत्रकानुसार मानधन आपोआप मोजले जाते. महिनाअखेर किती पैसे जमा झाले आणि किती बाकी आहेत हे एका दृष्टीक्षेपात समजते.",
    "हर गतिविधि (JSY प्रसव ₹300, पूर्ण टीकाकरण ₹100, टीबी फ़ॉलोअप ₹1,000) का मानदेय अपने आप जुड़ता है। महीने के अंत में प्राप्त और बकाया राशि साफ़ दिखती है।",
    "Auto-calculates incentives per approved rate card (JSY ₹300, Full Immunization ₹100, TB follow-up ₹1,000). See expected total, received payments, and pending claims instantly.",
  ],
  incentiveCheck1: [
    "काम नोंदवताच अपेक्षित रक्कम (₹) तत्काळ तयार",
    "काम दर्ज करते ही राशि (₹) तुरंत तैयार",
    "Instant amount calculation upon logging activities",
  ],
  incentiveCheck2: [
    "मिळालेले पैसे व प्रलंबित थकबाकी ट्रॅकर",
    "प्राप्त राशि और बकाया मानदेय ट्रैकर",
    "Track received payments versus pending dues",
  ],
  incentiveCheck3: [
    "व्हाट्सअॅप किंवा रिपोर्टसाठी सोपा सारांश",
    "व्हाट्सएप व रिपोर्ट के लिए आसान सारांश",
    "Plain-text summary formatted for WhatsApp or meetings",
  ],
  sampleCurrentMonth: ["ऑक्टोबर २०२६", "अक्टूबर 2026", "October 2026"],
  sampleIncentiveStatus: [
    "चालू महिना मानधन स्थिती",
    "वर्तमान माह मानदेय स्थिति",
    "Current Month Incentive Status",
  ],
  sampleExpectedAmount: ["₹३,४५०", "₹3,450", "₹3,450"],
  sampleReceivedAmount: ["₹२,०००", "₹2,000", "₹2,000"],
  samplePendingAmount: ["₹१,४५० बाकी", "₹1,450 बाकी", "₹1,450 Pending"],

  // Workflow
  workflowSub: [
    "सकाळच्या फेरीपासून महिनाअखेर मानधनापर्यंतची सोपी ४ पावले",
    "सुबह की फ़ेरी से लेकर माह के अंत तक आसान 4 चरण",
    "4 Simple Steps from Morning Rounds to Monthly Incentives",
  ],
  step1Title: ["सकाळची भेट यादी पहा", "सुबह की कार्य सूची देखें", "Check Morning Due List"],
  step1Desc: [
    "ॲप उघडताच आज कोणत्या मातेची ANC तपासणी आहे किंवा कोणत्या बाळाची लस बाकी आहे याची यादी दिसते.",
    "ऐप खोलते ही आज किस माता की ANC जाँच या किस बच्चे का टीका बाकी है, यह सामने आता है।",
    "Opening the app immediately displays today's due ANC visits and upcoming child vaccines.",
  ],
  step2Title: ["गृहभेट व एका टॅपवर नोंद", "गृहभेंट और एक टैप में एंट्री", "Home Visit & Single-Tap Entry"],
  step2Desc: [
    "गावात प्रत्यक्ष भेट दिल्यावर फक्त वजन, बीपी व लस दिल्याची खूण करा. डेटा आपोआप सेव्ह होतो.",
    "गाँव में गृहभेंट के समय बस वज़न, बीपी व टीके की पुष्टि करें। डेटा अपने आप सुरक्षित होता है।",
    "During village visits, tap to record weight, BP, and vaccine administered. Saved automatically.",
  ],
  step3Title: ["तातडीचा आरोग्य सल्ला", "त्वरित स्वास्थ्य परामर्श", "Instant Clinical Guidance"],
  step3Desc: [
    "जोखीम असल्यास ॲप लाल रंगात धोक्याचा इशारा देईल, जेणेकरून मातेला वेळेत प्राथमिक आरोग्य केंद्रात नेता येईल.",
    "जोखिम होने पर ऐप लाल रंग में चेतावनी देगा, ताकि माता को समय पर अस्पताल ले जाया जा सके।",
    "High BP or severe anemia triggers bold red alerts so mothers can be safely referred to the PHC.",
  ],
  step4Title: ["मानधन व हिशोब पूर्ण", "मानदेय और हिसाब पूरा", "Incentive Totaled & Claimed"],
  step4Desc: [
    "दिवसाच्या शेवटी मानधन आपोआप जोडले जाते. महिनाअखेर क्लेम करण्यासाठी क्लिष्ट आकडेमोड करावी लागत नाही.",
    "दिन के अंत में मानदेय अपने आप जुड़ जाता है। माह के अंत में कठिन हिसाब नहीं करना पड़ता।",
    "Activities automatically increment your monthly honorarium with zero complex math.",
  ],

  // Testimonials
  test1Quote: [
    "\"आधी मला ४ वेगवेगळ्या नोंदवह्यांमध्ये एकाच मातेचे नाव वारंवार लिहावे लागत असे. या ॲपमुळे रोजचा दीड ते दोन तास वाचतो आणि लस कधी द्यायची याची चिंता मिटली.\"",
    "\"पहले मुझे 4 अलग-अलग रजिस्टरों में एक ही नाम बार-बार लिखना पड़ता था। इस ऐप से रोज़ के 2 घंटे बचते हैं।\"",
    "\"Earlier I had to enter the same mother's details across 4 paper registers. This saves 2 hours daily and eliminates vaccine date confusion.\"",
  ],
  test1Author: ["श्रीमती सुनिता पाटील", "श्रीमती सुनिता पाटील", "Smt. Sunita Patil"],
  test1Role: [
    "आशा सेविका, शिरोली (सातारा)",
    "आशा कार्यकर्ता, शिरोली (सातारा)",
    "ASHA Worker, Shiroli (Satara)",
  ],
  test2Quote: [
    "\"आमच्या डोंगराळ वस्तीत अजिबात मोबाईल नेटवर्क नसते. सरकारी पोर्टल चालत नाहीत; पण आशा सहाय्यक पूर्णपणे ऑफलाइन चालते आणि फोन बंद पडला तरी ड्राफ्ट सेव्ह राहतो.\"",
    "\"हमारे पहाड़ी क्षेत्र में मोबाइल नेटवर्क नहीं रहता। पर यह ऐप पूरी तरह ऑफ़लाइन चलता है।\"",
    "\"In our hilly hamlet there is zero network connectivity. This app functions 100% offline without clearing drafts.\"",
  ],
  test2Author: ["श्रीमती रेखा कांबळे", "श्रीमती रेखा कांबळे", "Smt. Rekha Kamble"],
  test2Role: [
    "आशा सेविका, हवेली (पुणे)",
    "आशा कार्यकर्ता, हवेली (पुणे)",
    "ASHA Worker, Haveli (Pune)",
  ],
  test3Quote: [
    "\"मी गटप्रवर्तक म्हणून १० आशा ताईंचे काम पाहते. मानधनाचा हिशोब आणि उच्च जोखीम गरोदर मातांची यादी त्वरित समजत असल्याने सुपरव्हिजन अत्यंत सोपे झाले आहे.\"",
    "\"मैं फैसिलिटेटर के तौर पर 10 आशा कार्यकर्ताओं का काम देखती हूँ। उच्च जोखिम माताओं की पहचान तुरंत होती है।\"",
    "\"As a facilitator supervising 10 ASHA workers, monitoring high-risk pregnancies and monthly incentive records is now seamless.\"",
  ],
  test3Author: ["श्रीमती वंदना जाधव", "श्रीमती वंदना जाधव", "Smt. Vandana Jadhav"],
  test3Role: [
    "आशा गटप्रवर्तक (नाशिक)",
    "आशा फैसिलिटेटर (नाशिक)",
    "ASHA Facilitator (Nashik)",
  ],

  // PWA Install
  pwaSub: [
    "प्ले स्टोअरशिवाय तुमच्या अँड्रॉइड फोनवर १ सेकंदात ॲप आयकॉन तयार करा.",
    "बिना प्ले स्टोर के अपने एंड्रॉइड फ़ोन पर 1 सेकंड में ऐप आइकन बनाएँ।",
    "Create an app icon on your Android home screen in seconds without app stores.",
  ],
  pwaStep1Label: ["पायरी १", "चरण 1", "Step 1"],
  pwaStep1Title: ["क्रोम (Chrome) ब्राऊझर", "क्रोम (Chrome) ब्राउज़र", "Chrome Browser"],
  pwaStep1Desc: [
    "ही लिंक तुमच्या फोनच्या गुगल क्रोम ब्राऊझरमध्ये उघडा.",
    "यह लिंक अपने फ़ोन के गूगल क्रोम ब्राउज़र में खोलें।",
    "Open this web link inside your phone's Google Chrome browser.",
  ],
  pwaStep2Label: ["पायरी २", "चरण 2", "Step 2"],
  pwaStep2Title: ["तीन ठिपके (Menu)", "तीन बिंदु (Menu)", "Three Dots Menu"],
  pwaStep2Desc: [
    "उजव्या कोपऱ्यातील ३ उभ्या ठिपक्यांवर टॅप करा.",
    "ऊपरी दाएँ कोने में 3 बिंदुओं वाले मेनू पर टैप करें।",
    "Tap the three vertical dots menu icon in the top right corner.",
  ],
  pwaStep3Label: ["पायरी ३", "चरण 3", "Step 3"],
  pwaStep3Title: [
    "'Add to Home screen'",
    "'होम स्क्रीन पर जोड़ें'",
    "'Add to Home screen'",
  ],
  pwaStep3Desc: [
    "'Install' किंवा 'होम स्क्रीनवर जोडा' दाबा. ॲप तयार होईल!",
    "'Install' या 'होम स्क्रीन पर जोड़ें' चुनें। ऐप तैयार!",
    "Tap 'Install' or 'Add to Home screen'. Your native-like app is ready!",
  ],

  // FAQs
  faqSectionTitle: [
    "नेहमी विचारले जाणारे प्रश्न",
    "अक्सर पूछे जाने वाले सवाल",
    "Frequently Asked Questions",
  ],
  faqQ1: [
    "१. हे ॲप वापरण्यासाठी इंटरनेट किंवा रिचार्ज आवश्यक आहे का?",
    "1. क्या इस ऐप के लिए इंटरनेट या रीचार्ज ज़रूरी है?",
    "1. Does this app require internet or mobile data?",
  ],
  faqA1: [
    "नाही! हे ॲप पूर्णपणे ऑफलाइन चालते. तुम्ही शेतात, जंगलात किंवा नेटवर्क नसलेल्या घरातही गरोदर महिला व बालकांची नोंद करू शकता. सर्व माहिती फोनच्या मेमरीत सुरक्षित साठवली जाते.",
    "नहीं! यह ऐप पूरी तरह ऑफ़लाइन चलता है। आप खेत, जंगल या बिना नेटवर्क वाले घर में भी प्रविष्टि कर सकते हैं। सारा डेटा फ़ोन में रहता है।",
    "No! The application is 100% offline-first. You can record pregnant women and children in remote areas without network. Data remains stored securely on your phone.",
  ],
  faqQ2: [
    "२. फोनची बॅटरी संपली किंवा अचानक फोन बंद झाला तर माहिती उडून जाईल का?",
    "2. क्या बैटरी ख़त्म होने या फ़ोन बंद होने पर डेटा मिट जाएगा?",
    "2. Will I lose entered data if my phone runs out of battery?",
  ],
  faqA2: [
    "अजिबात नाही. ॲपमध्ये ऑटो-सेव्ह (Auto-save) तंत्रज्ञान आहे. तुम्ही टाईप केलेले प्रत्येक अक्षर आपोआप सेव्ह होते. फोन पुन्हा सुरू केल्यावर तुमचा अपूर्ण फॉर्म जसाच्या तसा समोर येतो.",
    "बिल्कुल नहीं। ऐप में ऑटो-सेव तकनीक है। टाइप किया हर अक्षर तुरंत सेव होता है। फ़ोन चालू करने पर ड्राफ़्ट वापस मिल जाता है।",
    "Never. The app auto-saves on every keystroke. Even if your phone suddenly shuts down, reopening the form recovers your exact draft.",
  ],
  faqQ3: [
    "३. याद्वारे शासकीय अधिकारी आमच्यावर किंवा लोकेशनवर नजर ठेवतात का?",
    "3. क्या इसके ज़रिए हमारे लोकेशन पर निगरानी रखी जाती है?",
    "3. Does this app track my GPS location or surveil my activity?",
  ],
  faqA3: [
    "नाही! आशा सहाय्यक ॲपमध्ये कोणतेही GPS लोकेशन ट्रॅकिंग किंवा पाळत ठेवणारी प्रणाली नाही. ही तुमची स्वतःची दैनंदिनी आहे आणि डेटा केवळ तुमच्या स्वतःच्या फोनवर राहतो.",
    "नहीं! आशा सहायक में कोई GPS लोकेशन ट्रैकिंग नहीं है। यह आपकी अपनी व्यक्तिगत डायरी है और डेटा आपके फ़ोन पर ही रहता है।",
    "No! There is zero GPS tracking and no activity surveillance. It is your personal fieldwork diary and your data stays on your device.",
  ],
  faqQ4: [
    "४. भविष्यात डेटा सुरक्षित ठेवण्यासाठी क्लाउड बॅकअपची सोय आहे का?",
    "4. क्या भविष्य में सुरक्षित क्लाउड बैकअप की सुविधा उपलब्ध होगी?",
    "4. Will there be a secure cloud backup to prevent data loss?",
  ],
  faqA4: [
    "होय! पुढील टप्प्यात निऑन डेटाबेस (NeonDB Serverless Postgres) सह सुरक्षित बँक-स्तरीय एन्क्रिप्शन बॅकअप जोडले जाणार आहे, ज्यामुळे फोन बदलला तरी जुना सर्व डेटा एका सेकंदात परत मिळेल.",
    "हाँ! अगले चरण में निऑन डेटाबेस (NeonDB) के साथ बैंक-स्तरीय सुरक्षित बैकअप जोड़ा जाएगा, जिससे फ़ोन बदलने पर भी डेटा सुरक्षित रहेगा।",
    "Yes! In the next phase, secure bank-grade encrypted sync via NeonDB (Serverless Postgres) will allow you to restore records when changing phones.",
  ],

  // CTA & Footer
  ctaTitle: [
    "आजच तुमची डिजिटल दैनंदिनी सुरू करा!",
    "आज ही अपनी डिजिटल डायरी शुरू करें!",
    "Start Your Digital Field Diary Today!",
  ],
  ctaSub: [
    "कागदी वह्यांच्या कटकटीतून मुक्त व्हा. गावातील माता व बालकांच्या आरोग्याची अचूक काळजी घ्या.",
    "कागज़ी रजिस्टरों के झंझट से आज़ाद हों। गाँव के स्वास्थ्य की बेहतर देखभाल करें।",
    "Leave paper registers behind. Deliver better maternal and child healthcare in your village.",
  ],
  ctaOpenDiary: ["दैनिक वही उघडा", "दैनिक डायरी खोलें", "Open Daily Diary"],
  ctaCreateAccount: [
    "नवीन आशा खाते तयार करा",
    "नया आशा खाता बनाएँ",
    "Create ASHA Account",
  ],
  footerSubtitle: [
    "महाराष्ट्र ग्रामीण आरोग्य सेविकांसाठी समर्पित डिजिटल प्लॅटफॉर्म",
    "महाराष्ट्र ग्रामीण स्वास्थ्य कार्यकर्ताओं के लिए समर्पित डिजिटल प्लेटफ़ॉर्म",
    "Dedicated Digital Companion for Maharashtra Frontline Health Workers",
  ],
  footerCopyright: [
    "आशा सहाय्यक • ऑफलाइन व गोपनीयता प्रथम",
    "आशा सहायक • ऑफ़लाइन व गोपनीयता प्रथम",
    "ASHA Helper • Offline-First & Privacy First",
  ],

  // Extra Dashboard & Auth
  welcomeTai: ["नमस्ते", "नमस्ते", "Welcome"],
  noTasksDesc: [
    "आज कोणत्याही तपासण्या किंवा लसीकरण प्रलंबित नाहीत. नवीन नोंद करण्यासाठी खालील बटण वापरा.",
    "आज कोई जाँच या टीकाकरण लंबित नहीं है। नई प्रविष्टि के लिए नीचे दिया बटन दबाएँ।",
    "No pending checkups or vaccines due today. Use the buttons below to add a new record.",
  ],
  phcReferralUrgent: [
    "प्राथमिक आरोग्य केंद्राशी (PHC) संपर्क साधा.",
    "प्राथमिक स्वास्थ्य केंद्र (PHC) से संपर्क करें।",
    "Contact Primary Health Centre (PHC) immediately.",
  ],
  entrySubDesc: [
    "गरोदर महिला, बाळ, टीबी रुग्ण किंवा डास सर्व्हे नोंदवा",
    "गर्भवती महिला, शिशु, टीबी मरीज़ या सर्वे दर्ज करें",
    "Record pregnant mothers, infants, TB patients, or fever surveys",
  ],
  neonDbNotice: [
    "पुढील अपडेटमध्ये निऑन डेटाबेस (NeonDB) द्वारे सुरक्षित ऑटो-बॅकअप सुविधा जोडली जाईल.",
    "आगामी अपडेट में निऑन डेटाबेस (NeonDB) द्वारा सुरक्षित ऑटो-बैकअप जोड़ा जाएगा।",
    "Secure cloud auto-backup via NeonDB will be connected in the next phase.",
  ],
  quickDemoTitle: [
    "झटपट चाचणी (१-क्लिक डेमो लॉगिन)",
    "त्वरित परीक्षण (1-क्लिक डेमो लॉगिन)",
    "Quick Test (1-Click Demo Login)",
  ],
  demoOtpNotice: [
    "डेमो चाचणीसाठी तात्पुरता ओटीपी 123456 भरण्यात आला आहे.",
    "डेमो परीक्षण के लिए ओटीपी 123456 भरा गया है।",
    "Simulation OTP 123456 pre-filled for instant testing.",
  ],
  redirectingToDiary: [
    "आपल्या दैनिक वहीकडे (Dashboard) नेले जात आहे…",
    "दैनिक डायरी की ओर ले जाया जा रहा है…",
    "Redirecting to your daily fieldwork diary…",
  ],
  sampleScreen: ["नमुना स्क्रीन", "नमूना स्क्रीन", "Sample Preview"],
  activeRemaining: ["बाकी", "बाकी", "Due"],
  todayVisitLabel: ["आजची तपासणी", "आज की जाँच", "Today's Visit"],
  vaccineDueListTitle: ["लसीकरण ड्यू-लिस्ट", "टीकाकरण ड्यू-लिस्ट", "Vaccine Due-List"],
  threeVaccinesUpcoming: ["३ लस आगामी", "3 टीके आगामी", "3 Vaccines Upcoming"],
  riskWarningTag: ["धोका", "जोखिम", "High Risk"],

  // Login & Sign Up
  loginHeading: ["आपल्या खात्यात प्रवेश करा", "अपने खाते में प्रवेश करें", "Welcome Back to ASHA Helper"],
  loginSubtitle: ["आपला मोबाईल नंबर व पासवर्ड किंवा ओटीपी टाकून लॉगिन करा", "अपना मोबाइल नंबर और पासवर्ड या ओटीपी दर्ज करें", "Enter your mobile number and password or OTP to continue"],
  signupHeading: ["नवीन आशा सेविका नोंदणी", "नया आशा कार्यकर्ता पंजीकरण", "New ASHA Worker Registration"],
  signupSubtitle: ["आपले नाव, गाव व उपकेंद्राची माहिती भरून आपले खाते सुरू करा", "अपना नाम, गाँव और उपकेंद्र की जानकारी भरकर खाता शुरू करें", "Fill in your details to create your village health diary account"],
  mobileNumber: ["मोबाईल नंबर", "मोबाइल नंबर", "Mobile Number"],
  password: ["पासवर्ड / पिन", "पासवर्ड / पिन", "Password / PIN"],
  enterMobile: ["१० अंकी मोबाईल नंबर टाका", "10 अंकों का मोबाइल नंबर डालें", "Enter 10-digit mobile number"],
  enterPassword: ["४ किंवा ६ अंकी पिन किंवा पासवर्ड", "4 या 6 अंकों का पिन या पासवर्ड", "Enter PIN or password"],
  enterOtp: ["ओटीपी (SMS कोड) टाका", "ओटीपी (SMS कोड) डालें", "Enter OTP code"],
  loginWithPassword: ["पासवर्डने लॉगिन", "पासवर्ड से लॉगिन", "Login with Password"],
  loginWithOtp: ["ओटीपीने लॉगिन (SMS)", "ओटीपी से लॉगिन (SMS)", "Login with OTP"],
  sendOtp: ["ओटीपी पाठवा", "ओटीपी भेजें", "Send OTP"],
  rememberMe: ["माझे खाते फोनमध्ये लक्षात ठेवा", "मेरा खाता फ़ोन में याद रखें", "Remember me on this phone"],
  forgotPin: ["पिन विसरलात का?", "पिन भूल गए?", "Forgot PIN?"],
  demoLoginAsha: ["सुनिता पाटील (आशा सेविका) डेमो लॉगिन", "सुनिता पाटील (आशा कार्यकर्ता) डेमो लॉगिन", "Demo Login: Sunita Patil (ASHA)"],
  demoLoginFacilitator: ["रेखा कांबळे (गटप्रवर्तक) डेमो लॉगिन", "रेखा कांबळे (सुपरवाइज़र) डेमो लॉगिन", "Demo Login: Rekha Kamble (Facilitator)"],
  alreadyHaveAccount: ["आधीच खाते आहे का?", "क्या पहले से खाता है?", "Already have an account?"],
  dontHaveAccount: ["नवीन आहात का?", "क्या नए हैं?", "New here?"],
  registerNow: ["येथे नोंदणी करा", "यहाँ पंजीकरण करें", "Register here"],
  loginNow: ["येथे लॉगिन करा", "यहाँ लॉगिन करें", "Login here"],
  fullName: ["पूर्ण नाव (उदा. सुनिता रामचंद्र पाटील)", "पूरा नाम (उदा. सुनिता रामचंद्र पाटील)", "Full Name"],
  selectRole: ["तुमचे पद / भूमिका निवडा", "अपना पद / भूमिका चुनें", "Select Role"],
  roleAsha: ["आशा सेविका (ASHA Worker)", "आशा कार्यकर्ता (ASHA Worker)", "ASHA Worker"],
  roleFacilitator: ["आशा गटप्रवर्तक (ASHA Facilitator)", "आशा फैसिलिटेटर (ASHA Facilitator)", "ASHA Facilitator"],
  roleAnm: ["ए.एन.एम. / बहुउद्देशीय आरोग्य कार्यकर्ता", "ए.एन.एम. / स्वास्थ्य कार्यकर्ता", "ANM / Health Worker"],
  roleMedicalOfficer: ["वैद्यकीय अधिकारी (Medical Officer)", "चिकित्सा अधिकारी (Medical Officer)", "Medical Officer"],
  districtName: ["जिल्हा निवडा", "ज़िला चुनें", "Select District"],
  talukaName: ["तालुका / ब्लॉक", "तालुका / ब्लॉक", "Taluka / Block"],
  phcName: ["प्राथमिक आरोग्य केंद्र (PHC)", "प्राथमिक स्वास्थ्य केंद्र (PHC)", "Primary Health Centre (PHC)"],
  subCenterName: ["उपकेंद्र (Sub-Center)", "उपकेंद्र (Sub-Center)", "Sub-Center"],
  villageName: ["गाव / पाडा / वस्ती", "गाँव / टोला", "Village / Hamlet"],
  ashaIdField: ["आशा ओळख क्रमांक (ऐच्छिक)", "आशा आईडी नंबर (वैकल्पिक)", "ASHA ID Number (Optional)"],
  agreePrivacy: ["माझा डेटा फक्त माझ्या फोनवर सुरक्षित राहील हे मला मान्य आहे.", "मेरा डेटा केवल मेरे फ़ोन में सुरक्षित रहेगा यह मुझे स्वीकार है।", "I understand that my data is saved privately on my phone."],
  createAccountBtn: ["खाते तयार करा व डायरी सुरू करा", "खाता बनाएँ और डायरी शुरू करें", "Create Account & Launch Diary"],
  signupSuccess: ["नोंदणी यशस्वी झाली!", "पंजीकरण सफल रहा!", "Registration successful!"],
  welcomeUser: ["नमस्ते", "नमस्ते", "Welcome"],
  logoutBtn: ["लॉगआउट", "लॉगआउट", "Sign Out"],
  offlineWarningText: ["ऑफलाइन मोड चालू: तुमचा डेटा सुरक्षितपणे फोनच्या मेमरीत साठवला जाईल.", "ऑफ़लाइन मोड सक्रिय: आपका डेटा सुरक्षित रूप से फ़ोन में रहेगा।", "Offline mode active: Data will be safely stored on this device."],
};

const INDEX: Record<Lang, 0 | 1 | 2> = { mr: 0, hi: 1, en: 2 };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangContext = createContext<Ctx>({
  lang: "mr",
  setLang: () => {},
  t: (k) => ((DICT as Record<string, [string, string, string]>)[k]?.[0] ?? k),
});

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

  const t = useCallback(
    (k: string) => {
      const entry = (DICT as Record<string, [string, string, string]>)[k];
      if (!entry) return k;
      return entry[INDEX[lang]] ?? entry[0] ?? k;
    },
    [lang]
  );

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
