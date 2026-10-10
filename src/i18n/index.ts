import type { SupportedLanguage } from "@/types/chat";
import type { ChatTranslations } from "./types";
import { enChat } from "./en";
import { hiChat } from "./hi";
import { mrChat } from "./mr";
import { QUESTION_CATEGORIES, getQuestionsForCategory } from "./questions";

export * from "./types";
export * from "./questions";

export const CHAT_TRANSLATIONS: Record<SupportedLanguage, ChatTranslations> = {
  mr: mrChat,
  hi: hiChat,
  en: enChat,
};

export function getChatTranslation(lang: SupportedLanguage): ChatTranslations {
  return CHAT_TRANSLATIONS[lang] || CHAT_TRANSLATIONS.mr;
}

export const LANGUAGE_OPTIONS: Array<{ code: SupportedLanguage; label: string; nativeName: string }> = [
  { code: "mr", label: "मराठी", nativeName: "मराठी" },
  { code: "hi", label: "हिंदी", nativeName: "हिंदी" },
  { code: "en", label: "English", nativeName: "English" },
];
