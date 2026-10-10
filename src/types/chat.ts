export type SupportedLanguage = "en" | "hi" | "mr";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isDanger?: boolean;
  category?: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  language: SupportedLanguage;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface QuickQuestionItem {
  id: string;
  text: string;
  category: string;
}

export interface QuestionCategory {
  id: string;
  icon: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  questions: {
    en: string[];
    hi: string[];
    mr: string[];
  };
}
