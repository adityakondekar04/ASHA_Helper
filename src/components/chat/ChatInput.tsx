import React, { useRef, useEffect } from "react";
import { Mic, Send, ShieldCheck, Sparkles } from "lucide-react";
import type { SupportedLanguage } from "@/types/chat";
import { getChatTranslation } from "@/i18n";

export function ChatInput({
  input,
  setInput,
  onSend,
  disabled = false,
  language,
  onToggleSuggestions,
  suggestionsVisible = false,
}: {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  language: SupportedLanguage;
  onToggleSuggestions: () => void;
  suggestionsVisible?: boolean;
}) {
  const t = getChatTranslation(language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && input.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t-2 border-border bg-card/95 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg">
      <div className="mx-auto max-w-4xl space-y-2">
        {/* Input Bar Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!disabled && input.trim()) onSend();
          }}
          className="flex items-end gap-2"
        >
          {/* Suggestions Drawer Toggle */}
          <button
            type="button"
            onClick={onToggleSuggestions}
            className={`grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl border-2 transition-all cursor-pointer ${
              suggestionsVisible
                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
            title={t.quickQuestionsTitle}
            aria-label={t.quickQuestionsTitle}
          >
            <Sparkles className="size-5" />
          </button>

          {/* Text Input Composer */}
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.inputPlaceholder}
              disabled={disabled}
              className="w-full resize-none rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm sm:text-base font-semibold text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary max-h-32 leading-relaxed"
            />
          </div>

          {/* Voice Input Button (Marked as coming soon) */}
          <button
            type="button"
            onClick={() => {
              alert(t.voiceComingSoon);
            }}
            className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl border-2 border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer"
            title={t.voiceComingSoon}
            aria-label={t.voiceComingSoon}
          >
            <Mic className="size-5 text-muted-foreground" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_3px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/95 transition-all active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            title={t.send}
            aria-label={t.send}
          >
            <Send className="size-5" />
          </button>
        </form>

        {/* Privacy & Safety Footnote */}
        <p className="text-center text-[11px] font-semibold text-muted-foreground flex items-center justify-center gap-1.5 px-2">
          <ShieldCheck className="size-3.5 text-accent shrink-0" />
          <span className="truncate">{t.privacyReminder}</span>
        </p>
      </div>
    </div>
  );
}
