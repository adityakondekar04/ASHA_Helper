import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Globe,
  History,
  PlusCircle,
  RotateCcw,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { SupportedLanguage } from "@/types/chat";
import { LANGUAGE_OPTIONS, getChatTranslation } from "@/i18n";

export function ChatHeader({
  language,
  onLanguageChange,
  onNewChat,
  onToggleHistory,
  historyCount = 0,
}: {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onNewChat: () => void;
  onToggleHistory: () => void;
  historyCount?: number;
}) {
  const t = getChatTranslation(language);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLangObj = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-20 border-b-2 border-border bg-card/95 backdrop-blur-md px-3 sm:px-4 py-2.5">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            to="/dashboard"
            className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            title={t.backToDiary}
            aria-label={t.backToDiary}
          >
            <ArrowLeft className="size-5" />
          </Link>

          <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
            <Stethoscope className="size-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base sm:text-lg font-black tracking-tight text-foreground">
                {t.title}
              </h1>
              {/* Online status indicator */}
              <span className="hidden xs:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.statusAiReady}</span>
              </span>
            </div>
            <p className="truncate text-xs font-semibold text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions (Language Switcher, New Chat, History) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 rounded-2xl border-2 border-border bg-background px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-foreground hover:border-primary/50 transition-all cursor-pointer shadow-2xs"
              aria-label={t.switchLanguage}
            >
              <Globe className="size-3.5 text-primary shrink-0" />
              <span>{currentLangObj.label}</span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>

            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 z-40 w-36 rounded-2xl border-2 border-border bg-card p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(opt.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        language === opt.code
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {language === opt.code && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* New Chat Button */}
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center gap-1 rounded-2xl bg-primary/10 border-2 border-primary/20 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-primary hover:bg-primary/20 transition-all cursor-pointer"
            title={t.newChat}
          >
            <PlusCircle className="size-3.5" />
            <span className="hidden sm:inline">{t.newChat}</span>
          </button>

          {/* History Button */}
          <button
            type="button"
            onClick={onToggleHistory}
            className="flex size-9 sm:size-10 items-center justify-center rounded-2xl border-2 border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-pointer relative"
            title={t.chatHistory}
            aria-label={t.chatHistory}
          >
            <History className="size-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                {historyCount > 9 ? "9+" : historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
