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

  // Landing Page & Navigation
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
  openDailyDiary: ["दैनिक वही उघडा", "दैनिक डायरी खोलें", "Open Daily Diary"],
  loginBtn: ["लॉगिन करा", "लॉगिन करें", "Sign In / Login"],
  signupBtn: ["नवीन नोंदणी करा", "नया पंजीकरण करें", "Register as ASHA"],
  viewFeatures: ["वैशिष्ट्ये पहा", "सुविधाएँ देखें", "Explore Features"],
  dailyWorkflow: ["दैनंदिन कार्यपद्धती", "दैनिक कार्यप्रणाली", "Daily Field Workflow"],
  whyTrustUs: ["आशा सेविकांचा विश्वास का?", "आशा कार्यकर्ताओं का भरोसा क्यों?", "Why ASHA Workers Trust Us"],
  pwaTitle: ["मोबाईलवर ॲप कसे सुरू करावे?", "मोबाइल पर ऐप कैसे शुरू करें?", "How to Add to Phone Home Screen"],
  guestAccess: ["खात्याशिवाय थेट डायरी वापरा", "बिना खाते के सीधे डायरी इस्तेमाल करें", "Continue as Guest without Login"],
  statsMothersTracked: ["गरोदर मातांची काळजी", "गर्भवती माताओं की देखभाल", "Mothers Cared For"],
  statsVaccineCoverage: ["लसीकरण वेळेवर पूर्ण", "टीकाकरण समय पर पूरा", "Immunization Timeliness"],
  statsZeroCost: ["शून्य इंटरनेट खर्च", "शून्य इंटरनेट ख़र्च", "Zero Internet Cost"],
  statsDistricts: ["महाराष्ट्रातील जिल्हे", "महाराष्ट्र के ज़िले", "Districts Covered"],

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
