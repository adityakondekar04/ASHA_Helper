import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Bot,
  ChevronDown,
  Info,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { ChatConversation, ChatMessage, SupportedLanguage } from "@/types/chat";
import { getChatTranslation } from "@/i18n";
import { useT } from "@/lib/i18n";
import { sendChatMessageServerFn } from "@/lib/ai/chat-server";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatInput } from "./ChatInput";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { EmergencyNotice } from "./EmergencyNotice";
import { ChatHistoryDrawer } from "./ChatHistoryDrawer";

const CONVERSATIONS_STORAGE_KEY = "asha.saathi.conversations.v1";
const ACTIVE_CONV_STORAGE_KEY = "asha.saathi.active_id.v1";

export function ChatWindow() {
  const { lang, setLang } = useT();
  const currentLang = (lang as SupportedLanguage) || "mr";
  const t = getChatTranslation(currentLang);

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showDangerNotice, setShowDangerNotice] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Load conversations from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
      if (saved) {
        const parsed: ChatConversation[] = JSON.parse(saved);
        setConversations(parsed);
        const lastActive = localStorage.getItem(ACTIVE_CONV_STORAGE_KEY);
        if (lastActive && parsed.some((c) => c.id === lastActive)) {
          setActiveConvId(lastActive);
          const active = parsed.find((c) => c.id === lastActive);
          if (active) setMessages(active.messages);
        }
      }
    } catch (e) {
      console.warn("Failed to load conversations from storage", e);
    }
  }, []);

  // 2. Persist conversations to localStorage whenever updated
  const saveConversations = (updated: ChatConversation[]) => {
    setConversations(updated);
    try {
      localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to save conversations to storage", e);
    }
  };

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Start a new chat
  const handleNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setInput("");
    setError(null);
    setShowDangerNotice(false);
    setSuggestionsOpen(true);
    localStorage.removeItem(ACTIVE_CONV_STORAGE_KEY);
  };

  // Select an existing chat from history
  const handleSelectConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setActiveConvId(conv.id);
      setMessages(conv.messages);
      localStorage.setItem(ACTIVE_CONV_STORAGE_KEY, conv.id);
      setShowDangerNotice(conv.messages.some((m) => m.isDanger));
      setSuggestionsOpen(conv.messages.length === 0);
    }
  };

  // Delete a conversation
  const handleDeleteConversation = (id: string) => {
    const filtered = conversations.filter((c) => c.id !== id);
    saveConversations(filtered);
    if (activeConvId === id) {
      handleNewChat();
    }
  };

  // Language change
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend ?? input).trim();
    if (!userText || loading) return;

    setInput("");
    setError(null);
    setSuggestionsOpen(false);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: userText,
      timestamp: timeStr,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Call secure server function
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendChatMessageServerFn({
        data: {
          message: userText,
          language: currentLang,
          conversationId: activeConvId ?? undefined,
          history: historyPayload,
        },
      });

      if (res.success && res.reply) {
        const assistantMessage: ChatMessage = {
          id: "msg-ai-" + Date.now(),
          role: "assistant",
          content: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isDanger: res.isDanger,
        };

        const finalMessages = [...newMessages, assistantMessage];
        setMessages(finalMessages);

        if (res.isDanger) {
          setShowDangerNotice(true);
        }

        // Save conversation
        let currentId = activeConvId;
        let allConvs = [...conversations];

        if (!currentId) {
          currentId = "conv-" + Date.now();
          setActiveConvId(currentId);
          localStorage.setItem(ACTIVE_CONV_STORAGE_KEY, currentId);

          const title =
            userText.length > 28 ? userText.slice(0, 28) + "…" : userText;

          allConvs.unshift({
            id: currentId,
            title,
            language: currentLang,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: finalMessages,
          });
        } else {
          const idx = allConvs.findIndex((c) => c.id === currentId);
          if (idx >= 0) {
            allConvs[idx] = {
              ...allConvs[idx],
              updatedAt: new Date().toISOString(),
              messages: finalMessages,
            };
          }
        }

        saveConversations(allConvs);
      } else {
        setError(res.error || t.errorMessage);
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] max-h-[100dvh] bg-background text-foreground overflow-hidden">
      {/* 1. Header */}
      <ChatHeader
        language={currentLang}
        onLanguageChange={handleLanguageChange}
        onNewChat={handleNewChat}
        onToggleHistory={() => setHistoryOpen(true)}
        historyCount={conversations.length}
      />

      {/* 2. Messages & Content Scroll Area */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Emergency Alert (if detected) */}
          {showDangerNotice && (
            <EmergencyNotice
              language={currentLang}
              onDismiss={() => setShowDangerNotice(false)}
            />
          )}

          {/* Empty State / Welcome Screen */}
          {messages.length === 0 ? (
            <div className="space-y-6 py-4 sm:py-8 text-center animate-in fade-in zoom-in-95 duration-200">
              {/* Welcome Badge & Card */}
              <div className="mx-auto max-w-lg rounded-xl border border-primary/20 bg-linear-to-b from-primary/10 via-primary/5 to-card p-6 shadow-sm">
                <div className="mx-auto mb-3 grid size-16 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
                  <Stethoscope className="size-8" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base font-semibold text-foreground/90 leading-relaxed">
                  {t.welcomeGreeting}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  <span>{t.welcomeSub}</span>
                </div>
              </div>

              {/* Pre-presented suggested questions */}
              <div className="text-left space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-primary" />
                    <span>{t.quickQuestionsTitle}</span>
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {t.exploreCategories}
                  </span>
                </div>

                <SuggestedQuestions
                  language={currentLang}
                  onSelectQuestion={handleSelectSuggestedQuestion}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Render Chat Messages */}
              {messages.map((m) => (
                <ChatMessageItem
                  key={m.id}
                  message={m}
                  language={currentLang}
                />
              ))}

              {/* Suggestions toggle in conversation */}
              {suggestionsOpen && (
                <div className="pt-2 animate-in fade-in">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
                    <span>{t.quickQuestionsTitle}</span>
                    <button
                      type="button"
                      onClick={() => setSuggestionsOpen(false)}
                      className="text-primary hover:underline cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <SuggestedQuestions
                    language={currentLang}
                    onSelectQuestion={handleSelectSuggestedQuestion}
                  />
                </div>
              )}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center gap-2.5 py-2 pl-2 text-muted-foreground text-sm font-bold animate-pulse">
              <span className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary">
                <Stethoscope className="size-4 animate-spin" />
              </span>
              <span>{t.typingIndicator}</span>
              <span className="inline-flex gap-1">
                <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-primary animate-bounce" />
              </span>
            </div>
          )}

          {/* Error Message with Retry */}
          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm font-bold text-destructive flex items-center justify-between gap-2">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="shrink-0 rounded-xl bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="size-3" />
                <span>{t.retry}</span>
              </button>
            </div>
          )}

          {/* Medical Safety Disclaimer */}
          <div className="pt-2 pb-1 text-center">
            <p className="text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1">
              <Info className="size-3 text-accent shrink-0" />
              <span>{t.disclaimer}</span>
            </p>
          </div>

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 3. Bottom Chat Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={() => handleSendMessage()}
        disabled={loading}
        language={currentLang}
        onToggleSuggestions={() => setSuggestionsOpen(!suggestionsOpen)}
        suggestionsVisible={suggestionsOpen}
      />

      {/* 4. History Drawer */}
      <ChatHistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        conversations={conversations}
        activeId={activeConvId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        language={currentLang}
      />
    </div>
  );
}
