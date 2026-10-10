import type { QuestionCategory, SupportedLanguage } from "@/types/chat";

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: "pregnancy",
    icon: "🤰",
    title: {
      en: "Pregnancy & Maternal Health",
      hi: "गर्भावस्था व मातृ स्वास्थ्य",
      mr: "गर्भधारणा आणि मातृत्व आरोग्य",
    },
    questions: {
      en: [
        "What should I check during a pregnant woman's home visit?",
        "What are the danger signs during pregnancy?",
        "When should a pregnant woman go to the hospital?",
        "What advice should I give during antenatal care?",
        "What should I explain about iron and folic acid tablets?",
      ],
      hi: [
        "गर्भवती महिला के घर जाने पर मुझे क्या-क्या जांचना चाहिए?",
        "गर्भावस्था में खतरे के संकेत क्या हैं?",
        "गर्भवती महिला को अस्पताल कब जाना चाहिए?",
        "गर्भावस्था के दौरान कौन-कौन सी सलाह देनी चाहिए?",
        "आयरन और फोलिक एसिड की गोलियों के बारे में क्या बताना चाहिए?",
      ],
      mr: [
        "गर्भवती महिलेच्या घरी भेट दिल्यावर मी काय तपासावे?",
        "गर्भावस्थेतील धोक्याची चिन्हे कोणती आहेत?",
        "गर्भवती महिलेला रुग्णालयात कधी घेऊन जावे?",
        "गर्भावस्थेदरम्यान कोणता सल्ला द्यावा?",
        "आयर्न आणि फॉलिक अॅसिडच्या गोळ्यांबद्दल काय सांगावे?",
      ],
    },
  },
  {
    id: "child",
    icon: "👶",
    title: {
      en: "Child Health",
      hi: "बाल स्वास्थ्य",
      mr: "बाल आरोग्य",
    },
    questions: {
      en: [
        "What should I check during a newborn home visit?",
        "What are the danger signs in a newborn?",
        "How can I explain breastfeeding to a mother?",
        "What should I tell parents about complementary feeding?",
        "What should I do if a child has fever?",
        "How can I identify a malnourished child?",
      ],
      hi: [
        "नवजात शिशु के घर जाने पर मुझे क्या जांचना चाहिए?",
        "नवजात शिशु में खतरे के संकेत क्या हैं?",
        "मां को स्तनपान के बारे में कैसे समझाएं?",
        "ऊपरी आहार के बारे में माता-पिता को क्या बताएं?",
        "अगर बच्चे को बुखार है तो मुझे क्या करना चाहिए?",
        "कुपोषित बच्चे की पहचान कैसे करें?",
      ],
      mr: [
        "नवजात बाळाच्या घरी भेट दिल्यावर मी काय तपासावे?",
        "नवजात बाळामध्ये धोक्याची चिन्हे कोणती आहेत?",
        "आईला स्तनपानाबद्दल कसे समजावून सांगावे?",
        "पूरक आहाराबद्दल पालकांना काय सांगावे?",
        "मुलाला ताप असल्यास मी काय करावे?",
        "कुपोषित मुलाची ओळख कशी करावी?",
      ],
    },
  },
  {
    id: "vaccination",
    icon: "💉",
    title: {
      en: "Vaccination",
      hi: "टीकाकरण",
      mr: "लसीकरण",
    },
    questions: {
      en: [
        "Which vaccines are given to children?",
        "What should I do if a child misses a vaccine?",
        "How should I explain vaccination to parents?",
        "What should I do after a vaccination?",
        "What are common mild reactions after vaccination?",
      ],
      hi: [
        "बच्चों को कौन-कौन से टीके दिए जाते हैं?",
        "अगर बच्चे का टीका छूट गया है तो क्या करना चाहिए?",
        "माता-पिता को टीकाकरण के बारे में कैसे समझाएं?",
        "टीका लगने के बाद क्या सावधानी रखनी चाहिए?",
        "टीकाकरण के बाद होने वाली सामान्य हल्की प्रतिक्रियाएं कौन सी हैं?",
      ],
      mr: [
        "मुलांना कोणकोणत्या लसी दिल्या जातात?",
        "मुलाची एखादी लस चुकली असेल तर काय करावे?",
        "पालकांना लसीकरणाबद्दल कसे समजावून सांगावे?",
        "लस दिल्यानंतर कोणती काळजी घ्यावी?",
        "लसीकरणानंतर होणाऱ्या सामान्य सौम्य प्रतिक्रिया कोणत्या?",
      ],
    },
  },
  {
    id: "nutrition",
    icon: "🥗",
    title: {
      en: "Nutrition",
      hi: "पोषण आहार",
      mr: "पोषण व आहार",
    },
    questions: {
      en: [
        "What nutrition advice should I give to pregnant women?",
        "What foods should be given to young children?",
        "How can I identify malnutrition?",
        "How can I explain a balanced diet to a family?",
        "What advice should I give to an anaemic woman?",
      ],
      hi: [
        "गर्भवती महिला को पोषण के बारे में क्या सलाह दें?",
        "छोटे बच्चों को कौन से पौष्टिक खाद्य पदार्थ देने चाहिए?",
        "कुपोषण की पहचान कैसे करें?",
        "परिवार को संतुलित आहार कैसे समझाएं?",
        "खून की कमी वाली महिला को क्या सलाह दें?",
      ],
      mr: [
        "गर्भवती महिलेला पोषणाबद्दल कोणता सल्ला द्यावा?",
        "लहान मुलांना कोणते पौष्टिक पदार्थ द्यावेत?",
        "कुपोषणाची ओळख कशी करावी?",
        "कुटुंबाला संतुलित आहार कसा समजावून सांगावा?",
        "अॅनिमिया असलेल्या महिलेला कोणता सल्ला द्यावा?",
      ],
    },
  },
  {
    id: "family_planning",
    icon: "👨‍👩‍👧",
    title: {
      en: "Family Planning",
      hi: "परिवार नियोजन",
      mr: "कुटुंब नियोजन",
    },
    questions: {
      en: [
        "What family planning options can I explain to a couple?",
        "How can I explain contraception in simple language?",
        "When should I refer someone to a health facility?",
        "How can I counsel a couple about spacing between children?",
      ],
      hi: [
        "दंपति को परिवार नियोजन के कौन-कौन से विकल्प बता सकती हूँ?",
        "गर्भनिरोधक के बारे में आसान भाषा में कैसे समझाएं?",
        "किस स्थिति में व्यक्ति को स्वास्थ्य केंद्र भेजना चाहिए?",
        "बच्चों के बीच अंतर रखने के बारे में दंपति को कैसे समझाएं?",
      ],
      mr: [
        "दाम्पत्याला कुटुंब नियोजनाचे कोणते पर्याय सांगता येतील?",
        "गर्भनिरोधकाबद्दल सोप्या भाषेत कसे समजावून सांगावे?",
        "एखाद्या व्यक्तीला आरोग्य केंद्रात कधी पाठवावे?",
        "दोन मुलांमध्ये अंतर ठेवण्याबद्दल दाम्पत्याला कसे समजावून सांगावे?",
      ],
    },
  },
  {
    id: "common_illness",
    icon: "🩺",
    title: {
      en: "Common Illness & Guidance",
      hi: "सामान्य बीमारियाँ व मार्गदर्शन",
      mr: "सामान्य आजार व मार्गदर्शन",
    },
    questions: {
      en: [
        "What should I do if someone has a high fever?",
        "What are danger signs that require referral?",
        "How should I guide someone with diarrhoea?",
        "What advice can I give for dehydration?",
        "When should I refer a patient to a health facility?",
      ],
      hi: [
        "अगर किसी को तेज बुखार है तो मुझे क्या करना चाहिए?",
        "कौन से खतरे के संकेत होने पर मरीज को भेजना चाहिए?",
        "दस्त होने पर क्या सलाह देनी चाहिए?",
        "डिहाइड्रेशन से बचने के लिए क्या सलाह दें?",
        "मरीज को स्वास्थ्य केंद्र कब भेजना चाहिए?",
      ],
      mr: [
        "एखाद्याला जास्त ताप असल्यास मी काय करावे?",
        "कोणती धोक्याची चिन्हे दिसल्यास रुग्णाला पुढे पाठवावे?",
        "जुलाब झाल्यास कोणता सल्ला द्यावा?",
        "डिहायड्रेशन टाळण्यासाठी काय सांगावे?",
        "रुग्णाला आरोग्य केंद्रात कधी पाठवावे?",
      ],
    },
  },
  {
    id: "daily_work",
    icon: "📋",
    title: {
      en: "ASHA Daily Work",
      hi: "आशा दैनिक कार्य",
      mr: "आशा दैनंदिन कामे",
    },
    questions: {
      en: [
        "What tasks should I complete during today's village visit?",
        "Help me prepare a home-visit checklist.",
        "What information should I collect during a beneficiary visit?",
        "Help me prepare today's ASHA work plan.",
        "How should I organize my pending follow-ups?",
        "What should I record after a home visit?",
      ],
      hi: [
        "आज गांव की यात्रा के दौरान मुझे कौन-कौन से काम करने चाहिए?",
        "मेरे लिए घर-भेंट की चेकलिस्ट बनाएं।",
        "लाभार्थी की मुलाकात के दौरान मुझे कौन सी जानकारी लेनी चाहिए?",
        "आज के आशा कार्य की योजना बनाने में मदद करें।",
        "मेरे बाकी फॉलो-अप को व्यवस्थित करने में मदद करें।",
        "घर-भेंट के बाद मुझे क्या रिकॉर्ड करना चाहिए?",
      ],
      mr: [
        "आज गावातील भेटीदरम्यान मला कोणती कामे करायची आहेत?",
        "माझ्यासाठी घरभेटीची चेकलिस्ट तयार करा.",
        "लाभार्थीच्या भेटीदरम्यान कोणती माहिती घ्यावी?",
        "आजच्या आशा कामाचे नियोजन करण्यात मदत करा.",
        "माझ्या बाकी फॉलो-अपची यादी व्यवस्थित करण्यात मदत करा.",
        "घरभेटीनंतर कोणती माहिती नोंदवावी?",
      ],
    },
  },
  {
    id: "schemes",
    icon: "🏥",
    title: {
      en: "Government Health Schemes",
      hi: "सरकारी स्वास्थ्य योजनाएं",
      mr: "शासकीय आरोग्य योजना",
    },
    questions: {
      en: [
        "Explain this health scheme in simple language.",
        "Who can benefit from this scheme?",
        "What documents may be required?",
        "Where should I refer the beneficiary?",
        "What should I explain to the family?",
      ],
      hi: [
        "इस स्वास्थ्य योजना को आसान भाषा में समझाएं।",
        "इस योजना का लाभ कौन ले सकता है?",
        "कौन से दस्तावेज आवश्यक हो सकते हैं?",
        "लाभार्थी को कहां भेजना चाहिए?",
        "परिवार को क्या जानकारी देनी चाहिए?",
      ],
      mr: [
        "ही आरोग्य योजना सोप्या भाषेत समजावून सांगा.",
        "या योजनेचा लाभ कोण घेऊ शकतो?",
        "कोणती कागदपत्रे आवश्यक असू शकतात?",
        "लाभार्थ्याला कुठे पाठवावे?",
        "कुटुंबाला कोणती माहिती द्यावी?",
      ],
    },
  },
  {
    id: "emergency",
    icon: "🚨",
    title: {
      en: "Emergency & Danger Signs",
      hi: "आपातकालीन व खतरे के संकेत",
      mr: "आपत्कालीन व धोक्याची चिन्हे",
    },
    questions: {
      en: [
        "What are the life-threatening danger signs in pregnancy?",
        "What newborn symptoms require immediate hospital referral?",
        "What should I do if a patient is unconscious or having seizures?",
        "What are the severe dehydration danger signs in children?",
      ],
      hi: [
        "गर्भावस्था में जानलेवा खतरे के संकेत क्या हैं?",
        "नवजात शिशु के कौन से लक्षण होने पर तुरंत अस्पताल भेजना चाहिए?",
        "यदि कोई मरीज बेहोश हो या दौरे पड़ रहे हों तो क्या करें?",
        "बच्चों में गंभीर निर्जलीकरण (डिहाइड्रेशन) के लक्षण क्या हैं?",
      ],
      mr: [
        "गरोदरपणात जिवाला धोका निर्माण करणारी चिन्हे कोणती?",
        "नवजात बाळामध्ये कोणती लक्षणे दिसल्यास तातडीने रुग्णालयात पाठवावे?",
        "रुग्ण बेशुद्ध पडल्यास किंवा झटके येत असल्यास काय करावे?",
        "लहान मुलांमध्ये तीव्र डिहायड्रेशनची धोक्याची चिन्हे कोणती?",
      ],
    },
  },
];

export function getQuestionsForCategory(categoryId: string, lang: SupportedLanguage): string[] {
  const cat = QUESTION_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.questions[lang] || cat.questions.mr;
}
