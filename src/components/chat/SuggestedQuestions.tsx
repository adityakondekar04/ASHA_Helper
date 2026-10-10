import { useState } from "react";
import { ChevronRight, HelpCircle, Sparkles } from "lucide-react";
import type { SupportedLanguage } from "@/types/chat";
import { QUESTION_CATEGORIES, getChatTranslation } from "@/i18n";

export function SuggestedQuestions({
  language,
  onSelectQuestion,
}: {
  language: SupportedLanguage;
  onSelectQuestion: (question: string) => void;
}) {
  const t = getChatTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState<string>("pregnancy");

  const currentCat =
    QUESTION_CATEGORIES.find((c) => c.id === selectedCategory) || QUESTION_CATEGORIES[0];
  const questions = currentCat.questions[language] || currentCat.questions.mr;

  return (
    <div className="w-full space-y-3">
      {/* Category selector horizontal scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        {QUESTION_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedCategory;
          const isDanger = cat.id === "emergency";

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-2xl px-3 py-1.5 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isSelected
                  ? isDanger
                    ? "bg-destructive text-destructive-foreground shadow-xs"
                    : "bg-primary text-primary-foreground shadow-xs"
                  : isDanger
                    ? "border-2 border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                    : "border-2 border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title[language] || cat.title.mr}</span>
            </button>
          );
        })}
      </div>

      {/* Suggested Questions Grid for selected category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {questions.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectQuestion(q)}
            className="rounded-2xl border-2 border-border bg-card p-3 text-left transition-all hover:border-primary hover:bg-primary/5 active:scale-[0.99] flex items-center justify-between gap-2.5 cursor-pointer shadow-[0_2px_0_0_var(--color-border)] group"
          >
            <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
              {q}
            </span>
            <span className="grid size-6 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ChevronRight className="size-3.5" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
