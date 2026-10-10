import type { SupportedLanguage } from "@/types/chat";

interface QnAResponse {
  keywords: string[];
  reply: {
    en: string;
    hi: string;
    mr: string;
  };
  isDanger?: boolean;
}

export const KNOWLEDGE_BASE: QnAResponse[] = [
  // 1. Pregnancy Home Visit Checklist
  {
    keywords: [
      "pregnant woman's home visit",
      "home visit",
      "check during a pregnant",
      "गरोदर",
      "गर्भवती",
      "घरभेटी",
      "घर-भेंट",
      "काय तपासावे",
      "क्या जांचना",
    ],
    reply: {
      en: `Here is a simple checklist for your pregnant woman's home visit:

1. **Mother's Well-being:** Ask how she is feeling, about fatigue, sleep, and appetite.
2. **ANC Registration & Checks:** Verify if she has registered her pregnancy and completed her required Antenatal Care (ANC) visits at the Sub-Center/PHC.
3. **Supplements:** Check whether she is taking her daily Iron & Folic Acid (IFA) tablets and Calcium after meals (not together).
4. **Blood Pressure & Weight:** Inquire about her latest BP and weight recorded on her MCP card.
5. **Danger Signs:** Check for warning signs: bleeding, severe headache, blurred vision, swelling in face/hands, or reduced fetal movements.
6. **Birth Preparedness:** Confirm she has decided on the delivery hospital and arranged emergency transport (call 108/102).

*If any warning signs appear, accompany her to the PHC/hospital immediately.*`,
      hi: `गर्भवती महिला के घर जाने पर आपकी सरल चेकलिस्ट:

1. **महिला की कुशल-क्षेम:** पूछें कि उनकी तबीयत कैसी है, भूख और नींद ठीक है या नहीं।
2. **प्रसवपूर्व जांच (ANC):** सुनिश्चित करें कि एमसीपी कार्ड में सभी आवश्यक जांचें दर्ज हैं।
3. **आयरन व कैल्शियम:** जांचें कि वह रोजाना आयरन-फोलिक एसिड (IFA) और कैल्शियम की गोलियां ले रही हैं या नहीं।
4. **खतरे के संकेत:** पूछें कि क्या कोई रक्तस्राव, तेज सिरदर्द, धुंधला दिखना, चेहरे या पैरों पर सूजन, या बच्चे की हलचल कम होना तो नहीं है।
5. **प्रसव की तैयारी:** सुरक्षित प्रसव के लिए अस्पताल और वाहन (108/102) की व्यवस्था सुनिश्चित करें।

*यदि कोई खतरे का संकेत दिखे, तो तुरंत प्राथमिक स्वास्थ्य केंद्र (PHC) ले जाएं।*`,
      mr: `गरोदर महिलेच्या घरभेटीसाठी ही सोपी चेकलिस्ट वापरा:

1. **मातेची तब्येत:** मातेला कसे वाटत आहे, झोप, आहार व थकवा याबद्दल विचारपूस करा.
2. **एएनसी (ANC) तपासणी:** प्राथमिक आरोग्य केंद्र किंवा उपकेंद्रात नियमित प्रसवपूर्व तपासण्या वेळेवर झाल्या आहेत का ते तपासा (MCP कार्ड तपासा).
3. **आयर्न व कॅल्शियम गोळ्या:** आयर्न-फॉलिक अॅसिड (IFA) आणि कॅल्शियमच्या गोळ्या रोज नियमित घेत आहेत का ते तपासा.
4. **धोक्याची चिन्हे:** अंगावरून रक्त जाणे, तीव्र डोकेदुखी, डोळ्यांसमोर अंधारी, चेहरा/पायांवर सूज किंवा बाळाची हालचाल मंदावणे अशी लक्षणे आहेत का ते विचारा.
5. **प्रसूतीपूर्व नियोजन:** प्रसूतीसाठी शासकीय रुग्णालय निश्चित केले आहे का व आपत्कालीन वाहतूक (१०८ / १०२) माहीत आहे का याची खात्री करा.

*धोक्याचे लक्षण आढळल्यास मातेला त्वरित आरोग्य केंद्रात घेऊन जाण्यास मदत करा.*`,
    },
  },

  // 2. Danger signs in pregnancy
  {
    keywords: [
      "danger signs during pregnancy",
      "danger signs",
      "धोक्याची चिन्हे",
      "खतरे के संकेत",
      "hospital",
      "रुग्णालयात",
      "अस्पताल",
    ],
    isDanger: true,
    reply: {
      en: `🚨 **Critical Danger Signs During Pregnancy:**

If a pregnant woman exhibits any of the following symptoms, treat it as an emergency:

1. **Vaginal Bleeding:** Any spotting or heavy bleeding at any stage of pregnancy.
2. **Severe Headache & Blurred Vision:** High risk of severe hypertension / Eclampsia.
3. **Convulsions or Fits:** Immediate life-threatening emergency.
4. **High Fever with Chills:** Risk of severe infection or malaria.
5. **Severe Abdominal Pain:** Severe pain that does not subside.
6. **Sudden Swelling:** Marked puffiness on face, eyelids, or hands.
7. **Decreased or Absent Fetal Movement:** Baby moving noticeably less.
8. **Premature Rupture of Membranes:** Water breaking before labor starts.

🚑 **Action Required:**
- Call **108** for an emergency ambulance immediately.
- Accompany the mother to the nearest Community Health Centre (CHC) or District Hospital.
- Keep her calm and positioned on her left side during transport.`,
      hi: `🚨 **गर्भावस्था में गंभीर खतरे के संकेत:**

यदि गर्भवती महिला में इनमें से कोई भी लक्षण दिखाई दे, तो तुरंत आपातकालीन कदम उठाएं:

1. **रक्तस्राव (Bleeding):** किसी भी समय खून आना।
2. **तेज सिरदर्द और धुंधला दिखना:** गंभीर उच्च रक्तचाप (Eclampsia) का खतरा।
3. **दौरे या झटके (Fits/Convulsions):** अत्यंत गंभीर स्थिति।
4. **तेज बुखार:** संक्रमण का संकेत।
5. **तेज पेट दर्द:** लगातार पेट में तेज दर्द रहना।
6. **चेहरे या हाथों पर अचानक सूजन आना।**
7. **गर्भस्थ शिशु की हलचल कम होना या बंद होना।**
8. **समय से पहले पानी छूटना (Water breaking)।**

🚑 **आशा कार्यकर्ता का कर्तव्य:**
- तुरंत **108** एम्बुलेंस को कॉल करें।
- महिला को नजदीकी सामुदायिक स्वास्थ्य केंद्र (CHC) या जिला अस्पताल ले जाएं।
- यात्रा के दौरान महिला को बाईं करवट (left side) में लिटाएं।`,
      mr: `🚨 **गर्भावस्थेतील तातडीची धोक्याची चिन्हे:**

गरोदर मातेमध्ये खालीलपैकी कोणतेही लक्षण दिसल्यास त्वरित वैद्यकीय मदत मिळवून द्या:

1. **अंगावरून रक्तस्त्राव होणे:** गर्भधारणेच्या कोणत्याही टप्प्यावर रक्त जाणे अत्यंत धोकादायक आहे.
2. **तीव्र डोकेदुखी आणि डोळ्यांसमोर अंधारी/धुसर दिसणे:** उच्च रक्तदाब व झटके येण्याचा धोका.
3. **फिट्स किंवा झटके येणे (Convulsions):** त्वरित अतिदक्षता उपचारांची गरज.
4. **अंग कापणारा तीव्र ताप:** गंभीर संसर्ग असू शकतो.
5. **तीव्र पोटदुखी:** पोटात असह्य वेदना होणे.
6. **चेहरा, डोळे आणि हातांवर अचानक सूज येणे.**
7. **गर्भातील बाळाची हालचाल मंदावणे किंवा थांबणे.**
8. **प्रसूती कळा सुरू होण्यापूर्वीच पाणी सुटणे.**

🚑 **आशा ताईंनी त्वरित करावयाची कृती:**
- तात्काळ **१०८** रुग्णवाहिकेला फोन करा.
- मातेला जवळच्या ग्रामीण रुग्णालय किंवा उपजिल्हा/जिल्हा रुग्णालयात घेऊन जा.
- प्रवासादरम्यान मातेला डाव्या कुशीवर झोपवा.`,
    },
  },

  // 3. Newborn Home Visit & Danger Signs
  {
    keywords: [
      "newborn home visit",
      "newborn",
      "नवजात",
      "बाळ",
      "शिशु",
      "स्तनपान",
      "breastfeeding",
      "बाळाच्या घरी",
    ],
    reply: {
      en: `Here is your guide for a **Home-Based Newborn Care (HBNC)** visit:

1. **Keep the Baby Warm:** Ensure skin-to-skin care (Kangaroo Mother Care) and that the baby is dry, warmly clothed, and has a cap on.
2. **Exclusive Breastfeeding:** Ensure the mother is feeding exclusively on demand (at least 8-10 times in 24 hours). No water, honey, or animal milk.
3. **Cord Care:** Keep the umbilical stump clean and completely dry. Advise family NOT to apply oil, turmeric, or powder.
4. **Eye and Skin Check:** Inspect eyes for yellow discharge or swelling; check skin for rashes or yellow discoloration.
5. **Danger Signs in Newborn:**
   - Inability to suck or feed
   - Fast breathing (more than 60 breaths per minute) or chest in-drawing
   - Baby feels abnormally cold or has high fever
   - Convulsions or abnormal lethargy (limp body)
   - Yellow palms and soles (severe jaundice)

*If any danger signs are present, immediately refer to the Special Newborn Care Unit (SNCU) or PHC.*`,
      hi: `**नवजात शिशु घर-भेंट (HBNC) के मुख्य बिंदु:**

1. **शिशु को गर्म रखें:** बच्चे को हमेशा मां के संपर्क (KMC) में रखें और गर्म कपड़े पहनाएं।
2. **केवल स्तनपान:** जन्म के तुरंत बाद से केवल मां का दूध पिलाएं। घुट्टी, शहद, पानी या गाय का दूध बिल्कुल न दें।
3. **नाल की देखभाल:** नाल को सूखा और साफ रखें। उस पर तेल, हल्दी या कोई लेप न लगाएं।
4. **नवजात में खतरे के संकेत:**
   - दूध पीने में असमर्थ होना
   - तेज सांस चलना (1 मिनट में 60 से ज्यादा) या पसलियां चलना
   - शरीर अत्यधिक ठंडा या तेज बुखार होना
   - दौरे आना या बच्चा बहुत सुस्त होना
   - हाथ की हथेलियां और पैर के तलवे पीले पड़ना (गंभीर पीलिया)

*खतरे का लक्षण दिखने पर तुरंत SNCU या अस्पताल रेफर करें।*`,
      mr: `**नवजात अर्भक घरभेट (HBNC) मार्गदर्शक सूचना:**

1. **बाळाला उबदार ठेवा:** कांगारू मदर केअर (KMC) चा सल्ला द्या. बाळाला योग्य कपडे व कानटोपी घाला.
2. **फक्त आणि फक्त स्तनपान:** जन्मानंतर पहिले ६ महिने बाळाला केवळ आईचे दूध द्यावे. पाणी, मध, साखरपाणी किंवा गाईचे दूध अजिबात देऊ नका.
3. **नाळेची काळजी:** नाळ कोरडी आणि स्वच्छ ठेवा. त्यावर तेल, हळद किंवा कोणतीही पावडर लावू नये.
4. **नवजात बाळातील धोक्याची चिन्हे:**
   - बाळ दूध ओढू शकत नाही किंवा पीत नाही.
   - जलद श्वास घेणे (एका मिनिटात ६० पेक्षा जास्त) किंवा बरगड्या आत ओढल्या जाणे.
   - बाळ थंड पडणे किंवा तीव्र ताप असणे.
   - बाळ निपचित पडणे, झटके येणे.
   - तळहात आणि तळपाय पिवळे पडणे (तीव्र कावीळ).

*वरील लक्षणे आढळल्यास बाळाला त्वरित SNCU किंवा प्राथमिक आरोग्य केंद्रात घेऊन जा.*`,
    },
  },

  // 4. Vaccination
  {
    keywords: [
      "vaccine",
      "vaccination",
      "लस",
      "लसीकरण",
      "टीका",
      "टीकाकरण",
      "missed a vaccine",
      "लस चुकली",
      "टीका छूट गया",
    ],
    reply: {
      en: `Here is the essential guidance on **Child Immunization (UIP)**:

1. **At Birth:** BCG, OPV-0, Hepatitis B (within 24 hours).
2. **6, 10, 14 Weeks:** Pentavalent (DPT+HepB+Hib), OPV, Rota virus, fIPV, and PCV.
3. **9 Months:** Measles-Rubella (MR-1), Vitamin A 1st dose, PCV Booster, JE (if applicable).
4. **16-24 Months:** MR-2, DPT Booster-1, OPV Booster.

**If a Child Missed a Vaccine:**
- Reassure parents that the schedule can resume; do NOT restart from dose 1.
- Provide the due vaccine at the very next Village Health & Nutrition Day (VHND) or immunization session.
- Maintain the minimum 4-week gap between pentavalent doses.

**Common Mild Reactions:** Mild fever and localized pain at the injection site are normal. Advise cold compress for swelling and encourage continued feeding.`,
      hi: `**बाल टीकाकरण (UIP) संबंधित आवश्यक मार्गदर्शन:**

1. **जन्म के समय:** बीसीजी (BCG), ओपीवी-0 (OPV), हेपेटाइटिस-बी (24 घंटे में)।
2. **6, 10 और 14 सप्ताह:** पेंटावेलेंट (1, 2, 3), ओपीवी, रोटावायरस, fIPV और पीसीवी।
3. **9 महीने:** खसरा-रूबेला (MR-1), विटामिन-ए की पहली खुराक, पीसीवी बूस्टर।
4. **16-24 महीने:** एमआर-2, डीपीटी बूस्टर-1, ओपीवी बूस्टर।

**यदि टीका छूट गया हो:**
- माता-पिता को समझाएं कि टीकाकरण फिर से शुरू से करने की जरूरत नहीं है।
- अगले वीएचएनडी (VHND) या टीकाकरण सत्र में तुरंत छूटा हुआ टीका लगवाएं।
- टीके के बाद हल्का बुखार या दर्द सामान्य है। मां का दूध पिलाते रहें।`,
      mr: `**बाल लसीकरण वेळापत्रक व मार्गदर्शन:**

1. **जन्माच्या वेळी:** बीसीजी (BCG), ओपीव्ही-० (OPV-0), हिपॅटायटीस-बी (२४ तासांच्या आत).
2. **६, १० आणि १४ आठवडे:** पेंटाव्हॅलेंट (१, २, ३), ओपीव्ही, रोटाव्हायरस, fIPV आणि पीसीव्ही.
3. **९ महिने:** गोवर-रुबेला (MR-1), जीवनसत्त्व 'अ' पहिली मात्रा, पीसीव्ही बूस्टर.
4. **१६-२४ महिने:** गोवर-रुबेला २ (MR-2), डीपीटी बूस्टर-१, ओपीव्ही बूस्टर.

**लस चुकली असल्यास काय करावे:**
- पालकांना समजावून सांगा की लसीकरण पुन्हा पहिल्यापासून सुरू करण्याची गरज नसते.
- पुढील ग्राम आरोग्य व पोषण दिन (VHND) किंवा सत्रामध्ये उर्वरित लस लगेच द्यावी.
- लस दिल्यानंतर हलका ताप व टोचलेल्या जागी दुखणे सामान्य आहे. बाळाचे स्तनपान सुरू ठेवावे.`,
    },
  },

  // 5. Nutrition & Malnutrition
  {
    keywords: [
      "nutrition",
      "malnutrition",
      "पोषण",
      "कुपोषण",
      "diet",
      "आहार",
      "anaemia",
      "अॅनिमिया",
      "खून की कमी",
      "muac",
    ],
    reply: {
      en: `Here is the practical **Nutrition & Malnutrition Guidance**:

1. **For Pregnant Women:**
   - Green leafy vegetables, lentils/pulses, milk, seasonal fruits, and jaggery/groundnuts.
   - One Iron & Folic Acid (IFA) tablet daily with water (avoid tea/coffee after taking IFA).
   - Minimum 2 hours of afternoon rest and adequate hydration.

2. **Complementary Feeding (From 6 Months):**
   - Continue breastfeeding up to 2 years or beyond.
   - Introduce soft, mashed family food (khichdi with ghee, dalia, mashed banana, boiled eggs).
   - Feed 2-3 times daily at 6-8 months, increasing to 3-4 times with healthy snacks by 9-11 months.

3. **Identifying Malnutrition:**
   - Check Mid-Upper Arm Circumference (MUAC): Red (<11.5 cm) = SAM (Severe Acute Malnutrition), Yellow (11.5 - 12.5 cm) = MAM.
   - Check for bilateral pitting oedema on both feet.
   - Check growth chart on the MCP card (weight-for-age).
   - If SAM with complications, refer to the Nutrition Rehabilitation Centre (NRC).`,
      hi: `**पोषण एवं कुपोषण संबंधी मार्गदर्शन:**

1. **गर्भवती महिला का आहार:**
   - हरी पत्तेदार सब्जियां, दालें, दूध, गुड़, मूंगफली और मौसमी फल।
   - रोजाना 1 आयरन की गोली पानी या नींबू पानी के साथ (चाय-कॉफी के साथ नहीं)।
   - पर्याप्त आराम और भरपूर पानी।

2. **6 माह के बाद ऊपरी आहार:**
   - स्तनपान जारी रखते हुए गाढ़ा, मसला हुआ आहार शुरू करें (खिचड़ी में घी, दलिया, केला)।
   - दिन में 2-3 बार थोड़ा-थोड़ा खिलाएं।

3. **कुपोषण की पहचान:**
   - MUAC टेप से नापें: लाल (<11.5 सेमी) = गंभीर कुपोषण (SAM), पीला = मध्यम कुपोषण।
   - दोनों पैरों पर सूजन (Edema) की जांच करें।
   - वजन के अनुसार बच्चे का चार्ट देखें। गंभीर होने पर एनआरसी (NRC) रेफर करें।`,
      mr: `**पोषण आणि कुपोषण व्यवस्थापन मार्गदर्शन:**

1. **गरोदर मातेचा आहार:**
   - आहारात हिरव्या पालेभाज्या, डाळी, दूध, शेंगदाणे, गूळ आणि स्थानिक हंगामी फळे असावीत.
   - जेवणानंतर १ आयर्न गोळी नियमित घ्यावी (चहा किंवा कॉफी सोबत घेऊ नये).
   - दुपारी २ तास विश्रांती घ्यावी.

2. **६ महिन्यांनंतरचा पूरक आहार:**
   - ६ महिन्यांनंतर स्तनपानासोबत वरचा मऊ, पौष्टिक आहार सुरू करावा (तूप घातलेली मऊ डाळ-खिचडी, नाचणीचे सत्त्व, केळे).
   - दिवसातून २ ते ३ वेळा आहार द्यावा.

3. **कुपोषणाची ओळख (MUAC व वजन):**
   - डाव्या दंडाचा घेर (MUAC टेप): लाल पट्टा (<११.५ सेमी) असल्यास तीव्र कुपोषण (SAM).
   - दोन्ही पायांवर बोटाने दाबून सूज (Oedema) तपासा.
   - तीव्र कुपोषित बाळाला तात्काळ बाल पोषण केंद्र (NRC) किंवा ग्रामीण रुग्णालयात पाठवा.`,
    },
  },

  // 6. Family Planning
  {
    keywords: [
      "family planning",
      "contraception",
      "कुटुंब नियोजन",
      "परिवार नियोजन",
      "spacing",
      "अंतर",
      "गर्भनिरोधक",
    ],
    reply: {
      en: `Here is how you can counsel couples on **Family Planning & Spacing**:

1. **Spacing Methods (Between Children):**
   - **Antara (Inj. MPA):** Safe injectable contraceptive administered every 3 months.
   - **Chhaya (Centchroman):** Non-hormonal weekly oral pill.
   - **IUCD (Copper-T):** 380A protects for 10 years, 375 protects for 5 years. Postpartum IUCD (PPIUCD) within 48 hours of delivery.
   - **Condoms (Nirodh):** Simple, readily available barrier method protecting against STIs as well.

2. **Permanent Methods:**
   - **Female Sterilization (Tubectomy / Minilap):** Postpartum or interval.
   - **Male Sterilization (NSV - No Scalpel Vasectomy):** Simple, fast, minimally invasive procedure with no loss of strength.

3. **Counseling Tip:** Emphasize that healthy spacing of at least 3 years between children protects the mother's health and ensures better child development.`,
      hi: `**परिवार नियोजन एवं बच्चों में अंतर रखने की सलाह:**

1. **अंतर रखने के साधन (Spacing):**
   - **अंतरा (Antara):** 3 महीने में एक बार लगने वाला सुरक्षित इंजेक्शन।
   - **छाया (Chhaya):** गैर-हार्मोनल साप्ताहिक गोली।
   - **कॉपर-टी (IUCD):** 5 या 10 वर्षों के लिए सुरक्षित। प्रसव के 48 घंटे में (PPIUCD) भी लगवाई जा सकती है।
   - **निरोध (Condom):** संक्रमण और गर्भधारण दोनों से बचाव।

2. **स्थायी साधन:**
   - महिला नसबंदी (Tubectomy).
   - पुरुष नसबंदी (NSV): बहुत आसान, दर्द रहित और बिना चीरे वाली प्रक्रिया।

3. **परामर्श सूत्र:** दो बच्चों के बीच कम से कम 3 साल का अंतर मां और बच्चे दोनों के स्वास्थ्य के लिए आवश्यक है।`,
      mr: `**कुटुंब नियोजन व दोन मुलांमध्ये अंतर ठेवण्याबाबत मार्गदर्शन:**

1. **तात्पुरती साधने (मुलांमध्ये अंतर ठेवण्यासाठी):**
   - **अंतरा इंजेक्शन (Antara):** दर ३ महिन्यांनी द्यायचे सुरक्षित गर्भनिरोधक इंजेक्शन.
   - **छाया गोळ्या (Chhaya):** संप्रेरक विरहित (Non-hormonal) आठवड्यातून एकदा घेण्याची गोळी.
   - **कॉपर-टी (IUCD/PPIUCD):** प्रसूतीनंतर लगेच किंवा नंतर ५ ते १० वर्षांसाठी सुरक्षित साधन.
   - **निरोध (Condoms):** सहज उपलब्ध आणि सुरक्षित साधन.

2. **कायमस्वरूपी साधने:**
   - स्त्री नसबंदी (Tubectomy).
   - पुरुष नसबंदी (NSV): अत्यंत सोपी, बिनटाक्याची व निर्धोक पद्धत.

3. **समुपदेशन सूत्र:** पहिल्या व दुसऱ्या बाळामध्ये किमान ३ वर्षांचे अंतर ठेवल्यास मातेचे आरोग्य उत्तम राहते व बाळाचा विकास चांगला होतो.`,
    },
  },

  // 7. Common Illness: Fever, Diarrhea, Dehydration
  {
    keywords: [
      "fever",
      "diarrhoea",
      "diarrhea",
      "dehydration",
      "ताप",
      "जुलाब",
      "उलट्या",
      "दस्त",
      "डिहायड्रेशन",
      "ors",
    ],
    reply: {
      en: `Here is the first-level guidance for **Fever and Diarrhea**:

1. **For Diarrhea & Dehydration:**
   - **ORS (Oral Rehydration Salts):** Dissolve 1 full packet in 1 litre of clean drinking water. Give sips after every loose stool.
   - **Zinc Supplementation:** Give Zinc dispersible tablets for 14 days (10 mg for <6 months, 20 mg for >6 months).
   - Continue normal breastfeeding and fluids.
   - **Danger Signs:** Sunken eyes, skin pinch goes back very slowly, extreme thirst or inability to drink, blood in stool. Refer immediately!

2. **For Fever:**
   - Keep the patient in a cool, ventilated room.
   - Tepid sponging with normal tap water (not cold water).
   - Maintain fluid intake.
   - If fever persists >2 days or is accompanied by chills, convulsions, stiff neck, or vomiting, refer to PHC for malaria/dengue blood testing.`,
      hi: `**बुखार और दस्त (डायरिया) के लिए प्राथमिक मार्गदर्शन:**

1. **दस्त और डिहाइड्रेशन:**
   - **ओआरएस (ORS):** 1 पैकेट 1 लीटर साफ पीने के पानी में घोलें। हर दस्त के बाद पिलाएं।
   - **जिंक की गोली:** 14 दिन तक रोजाना दें (दस्त रुकने के बाद भी)।
   - मां का दूध और तरल आहार जारी रखें।
   - **खतरे के संकेत:** धंसी हुई आंखें, त्वचा चुटकी लेने पर बहुत धीरे लौटना, खून वाले दस्त। तुरंत रेफर करें।

2. **तेज बुखार:**
   - सामान्य पानी से बदन पोंछें (Tepid sponging)।
   - मरीज को पर्याप्त पानी व तरल पदार्थ दें।
   - यदि बुखार 2 दिन से ज्यादा रहे या कंपकंपी हो, तो मलेरिया/डेंगू जांच के लिए पीएचसी ले जाएं।`,
      mr: `**ताप आणि जुलाब (डिहायड्रेशन) बाबत प्राथमिक मार्गदर्शन:**

1. **जुलाब आणि डिहायड्रेशन:**
   - **ओआरएस (ORS) द्रावण:** १ पाकीट १ लिटर स्वच्छ उकळून थंड केलेल्या पाण्यात विरघळवावे. प्रत्येक जुलाबानंतर थोडे थोडे पाजावे.
   - **झिंक गोळ्या:** डॉक्टरांच्या सल्ल्यानुसार १४ दिवस नियमित द्याव्यात.
   - बाळाचे स्तनपान व पाणी देणे चालू ठेवावे.
   - **धोक्याची चिन्हे:** डोळे खोल जाणे, चिमटा काढल्यास त्वचा हळू परत जाणे, जास्त तहान लागणे किंवा बाळ सुस्त होणे. आढळल्यास तात्काळ रुग्णालयात पाठवा.

2. **ताप असल्यास:**
   - रुग्णाला हवेशीर जागी ठेवावे, अंगावर जाड कपडे किंवा पांघरूण घालू नये.
   - साध्या पाण्याने अंग पुसून काढावे (Cold sponging).
   - ताप २ दिवसांपेक्षा जास्त राहिल्यास किंवा थंडी वाजून आल्यास हिवताप/डेंग्यू तपासणीसाठी प्राथमिक आरोग्य केंद्रात पाठवावे.`,
    },
  },

  // 8. Daily Work & Checklists
  {
    keywords: [
      "village visit",
      "work plan",
      "checklist",
      "गावातील भेट",
      "आशा काम",
      "कामाचे नियोजन",
      "कार्य योजना",
      "चेकलिस्ट",
      "नोंद",
    ],
    reply: {
      en: `Here is a daily **Fieldwork Planner for an ASHA Worker**:

1. **Morning Preparation:**
   - Review your **Today's Due List** in the ASHA Helper app for scheduled ANC and vaccination visits.
   - Carry your ASHA kit: thermometer, MUAC tape, ORS packets, Zinc, and Condoms/Chhaya.
2. **During Home Visits:**
   - Check registered pregnant mothers: BP compliance, IFA intake, delivery arrangements.
   - Visit newborns: Check breastfeeding, umbilical cord, warmth, and danger signs.
   - Remind parents of children due for vaccination in the upcoming session.
3. **Village Surveillance:**
   - Inquire about seasonal fever cases, cough lasting >2 weeks (TB screening), and sanitation.
4. **End-of-Day Records:**
   - Update your records in the ASHA Helper app to log your visits and incentive points!`,
      hi: `**आशा कार्यकर्ता की दैनिक फील्ड कार्य योजना:**

1. **सुबह की तैयारी:**
   - आशा हेल्पर ऐप में आज के निर्धारित काम (एएनसी और टीकाकरण) देखें।
   - अपनी आशा किट साथ रखें: थर्मामीटर, MUAC टेप, ओआरएस, जिंक और गर्भनिरोधक।
2. **घर-भेंट के दौरान:**
   - गर्भवती माताओं की कुशल-क्षेम लें, आयरन गोलियां और प्रसव तैयारी जांचें।
   - नवजात शिशुओं की जांच करें (दूध पीना, शरीर का तापमान, नाल की स्थिति)।
   - छूटे हुए और आगामी टीकों की तारीख याद दिलाएं।
3. **गांव में निगरानी:**
   - बुखार या 2 सप्ताह से ज्यादा खांसी वाले संभावित टीबी मरीजों की जानकारी लें।
4. **शाम को रिकॉर्ड संधारण:**
   - आशा हेल्पर ऐप में आज की सभी प्रविष्टियां दर्ज करें ताकि मानदेय का हिसाब रहे!`,
      mr: `**आशा ताईंसाठी दैनंदिन कार्य नियोजन व चेकलिस्ट:**

1. **सकाळची तयारी:**
   - आशा सहाय्यक ॲपमधील **'आजची कामे'** तपासून एएनसी व लसीकरणाची यादी पहा.
   - आपली आशा किट सोबत ठेवा: थर्मामीटर, MUAC टेप, ओआरएस पाकिटे, झिंक गोळ्या आणि कंडोम/छाया.
2. **घरभेटी दरम्यान:**
   - गरोदर मातेची तपासणी: आयर्न गोळ्यांचे सेवन, बीपी, प्रसूतीचे रुग्णालय नियोजन.
   - नवजात बाळांची तपासणी (HBNC): वजन, स्तनपान, उबदारपणा व धोक्याची चिन्हे.
   - आगामी लसीकरण सत्रासाठी पालकांना निरोप द्या.
3. **गावातील आरोग्य सर्वेक्षण:**
   - गावात संशयित ताप, २ आठवड्यांपेक्षा जास्त खोकला (टीबी संशयित) यांची माहिती घ्या.
4. **संध्याकाळी नोंदवही अद्ययावत करणे:**
   - दिवसाच्या शेवटी आशा सहाय्यक ॲपमध्ये नोंदी पूर्ण करा जेणेकरून मानधनाची अचूक नोंद राहील!`,
    },
  },
];

export function findKnowledgeBaseMatch(query: string, lang: SupportedLanguage): string | null {
  const lower = query.toLowerCase();

  for (const item of KNOWLEDGE_BASE) {
    for (const kw of item.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return item.reply[lang] || item.reply.mr;
      }
    }
  }

  return null;
}
