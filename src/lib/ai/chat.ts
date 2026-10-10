import type { ChatApiRequest, ChatApiResponse } from "./types";
import { SYSTEM_PROMPT, detectDangerSigns } from "./prompts";
import { findKnowledgeBaseMatch } from "./knowledge-base";

const LANGUAGE_LABELS: Record<string, string> = {
  mr: "Marathi (मराठी)",
  hi: "Hindi (हिंदी)",
  en: "English",
};

/**
 * Call Groq Cloud API with OpenAI-compatible chat completion endpoint.
 */
async function callGroqApi(
  apiKey: string,
  model: string,
  messages: Array<{ role: string; content: string }>
): Promise<string | null> {
  const candidateModels = [model, "openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b"];
  const uniqueModels = Array.from(new Set(candidateModels));

  for (const m of uniqueModels) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: m,
          messages,
          temperature: 0.3,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return reply;
        }
      } else {
        const errorText = await response.text();
        console.warn(`Groq API model '${m}' failed with status ${response.status}:`, errorText);
      }
    } catch (err) {
      console.warn(`Groq request error for model '${m}':`, err);
    }
  }

  return null;
}

/**
 * Call Google Gemini API if configured.
 */
async function callGeminiApi(
  apiKey: string,
  model: string,
  promptText: string,
  history: Array<{ role: string; content: string }>,
  userMessage: string
): Promise<string | null> {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const contents = [
      {
        role: "user",
        parts: [{ text: promptText }],
      },
      ...history.slice(-6).map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidate) {
        return candidate.trim();
      }
    }
  } catch (err) {
    console.warn("Gemini API request failed:", err);
  }

  return null;
}

export async function processChatMessage(request: ChatApiRequest): Promise<ChatApiResponse> {
  const { message, language = "mr", history = [] } = request;

  if (!message || !message.trim()) {
    return {
      success: false,
      reply: "",
      error: "Message is required",
    };
  }

  const isDanger = detectDangerSigns(message);
  const langName = LANGUAGE_LABELS[language] || "Marathi (मराठी)";

  // 1. Try Groq Cloud AI (High speed LPU inference)
  const groqApiKey =
    process.env.GROQ_API_KEY ||
    (process.env.AI_API_KEY?.startsWith("gsk_") ? process.env.AI_API_KEY : undefined);

  if (groqApiKey) {
    const groqModel = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
    const groqMessages = [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n\nIMPORTANT LANGUAGE RULE:\nYou MUST respond strictly in ${langName}.\nKeep your response simple, practical, empathetic, and formatted in clear points/steps for an ASHA health worker. Never prescribe medication or dosages. If danger signs are present, prioritize immediate 108/102 ambulance referral.`,
      },
      ...history.slice(-8).map((h) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })),
      {
        role: "user",
        content: `${message}\n\n(Reminder: Please respond in ${langName}. Use bullet points or numbered steps suitable for a field ASHA worker.)`,
      },
    ];

    const groqReply = await callGroqApi(groqApiKey, groqModel, groqMessages);
    if (groqReply) {
      return {
        success: true,
        reply: groqReply,
        isDanger,
      };
    }
  }

  // 2. Try Google Gemini API if configured
  const geminiApiKey =
    process.env.AI_API_KEY && !process.env.AI_API_KEY.startsWith("gsk_")
      ? process.env.AI_API_KEY
      : process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    const geminiModel = process.env.AI_MODEL || "gemini-1.5-flash";
    const promptText = `${SYSTEM_PROMPT}\n\nUser Preferred Language: ${language.toUpperCase()}\nPlease answer in ${langName}.`;
    const userMessage = `${message}\n(Please respond in ${langName}. Simple, practical ASHA field guidance with steps.)`;

    const geminiReply = await callGeminiApi(
      geminiApiKey,
      geminiModel,
      promptText,
      history,
      userMessage
    );

    if (geminiReply) {
      return {
        success: true,
        reply: geminiReply,
        isDanger,
      };
    }
  }

  // 3. Specialized Knowledge Base Fallback
  const kbMatch = findKnowledgeBaseMatch(message, language);
  if (kbMatch) {
    return {
      success: true,
      reply: kbMatch,
      isDanger,
    };
  }

  // 4. Contextual Default Guidance
  const defaultReply: Record<string, string> = {
    en: `Hello! I have noted your question regarding **"${message.slice(0, 50)}"**.

Here is general guidance for your field work:
1. **Assess the Beneficiary:** Check overall well-being, vitals (BP/Temperature), and symptoms.
2. **Follow National Health Guidelines:** Adhere to standard protocols for maternal and child health.
3. **Danger Signs:** If there is high fever, difficulty breathing, or severe bleeding, refer to the PHC or call 108 immediately.
4. **Documentation:** Record your findings in the ASHA diary to maintain accurate health tracking.

*Feel free to select one of the suggested questions below for specific guidance.*`,
    hi: `नमस्ते! मैंने **"${message.slice(0, 50)}"** के बारे में आपका प्रश्न नोट कर लिया है।

फील्ड कार्य के लिए सामान्य मार्गदर्शन:
1. **स्थिति का आकलन:** लाभार्थी की सामान्य स्थिति, तापमान, बीपी और लक्षणों की जांच करें।
2. **राष्ट्रीय स्वास्थ्य दिशा-निर्देश:** मातृ एवं शिशु स्वास्थ्य के मानकों का पालन करें।
3. **खतरे के संकेत:** तेज बुखार, सांस लेने में तकलीफ या रक्तस्राव होने पर तुरंत 108 एम्बुलेंस या पीएचसी को रेफर करें।
4. **रिकॉर्ड दर्ज करें:** लाभार्थी के स्वास्थ्य की सही जानकारी अपनी आशा डायरी में लिखें।

*विस्तृत जानकारी के लिए नीचे दिए गए प्रश्नों में से विषय चुन सकती हैं।*`,
    mr: `नमस्कार! **"${message.slice(0, 50)}"** बाबत आपला प्रश्न मी नोंदवला आहे.

फील्ड भेटीसाठी प्राथमिक मार्गदर्शन:
1. **लाभार्थ्याची तपासणी:** सामान्य तब्येत, तापमान, बीपी आणि लक्षणांची नोंद घ्या.
2. **आरोग्य नियमावली:** मातृ व बाल आरोग्याच्या प्रमाणित मार्गदर्शक तत्त्वांचे पालन करा.
3. **धोक्याची चिन्हे:** तीव्र ताप, श्वास घेण्यास त्रास किंवा जास्त रक्तस्त्राव आढळल्यास त्वरित १०८ रुग्णवाहिका किंवा प्राथमिक आरोग्य केंद्राशी संपर्क साधा.
4. **नोंदवहीत नोंद:** सर्व महत्त्वाची माहिती आशा दैनंदिन वहीमध्ये नोंदवून ठेवा.

*सविस्तर माहितीसाठी आपण खाली दिलेल्या सुचवलेल्या प्रश्नांपैकी विषय निवडू शकता.*`,
  };

  return {
    success: true,
    reply: defaultReply[language] || defaultReply.mr,
    isDanger,
  };
}
