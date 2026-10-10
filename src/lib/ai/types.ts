import type { ChatMessage, SupportedLanguage } from "@/types/chat";

export interface ChatApiRequest {
  message: string;
  language: SupportedLanguage;
  conversationId?: string;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatApiResponse {
  success: boolean;
  reply: string;
  isDanger?: boolean;
  category?: string;
  error?: string;
}
