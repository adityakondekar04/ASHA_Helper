import { AlertTriangle, Bot, Stethoscope, User } from "lucide-react";
import type { ChatMessage, SupportedLanguage } from "@/types/chat";
import { getChatTranslation } from "@/i18n";

export function ChatMessageItem({
  message,
  language,
}: {
  message: ChatMessage;
  language: SupportedLanguage;
}) {
  const isUser = message.role === "user";
  const t = getChatTranslation(language);

  // Simple Markdown formatting parser (bold **text**, bullet lists, numbered lists)
  const formatContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Format bold tags: **text**
      const parseBold = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };

      // Numbered items: "1. text"
      const numberMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numberMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary text-xs font-semibold">
              {numberMatch[1]}
            </span>
            <div className="flex-1 leading-relaxed text-sm sm:text-base">
              {parseBold(numberMatch[2])}
            </div>
          </div>
        );
      }

      // Bullet items: "- text" or "* text"
      const bulletMatch = line.match(/^[-*•]\s+(.*)/);
      if (bulletMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <div className="flex-1 leading-relaxed text-sm sm:text-base">
              {parseBold(bulletMatch[1])}
            </div>
          </div>
        );
      }

      // Headings: "### Heading" or "## Heading"
      const headingMatch = line.match(/^#{1,3}\s+(.*)/);
      if (headingMatch) {
        return (
          <h4 key={idx} className="font-semibold text-base sm:text-lg mt-3 mb-1 text-foreground">
            {headingMatch[1]}
          </h4>
        );
      }

      // Normal paragraph line
      return (
        <p key={idx} className="leading-relaxed text-sm sm:text-base my-0.5">
          {parseBold(line)}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex w-full gap-2 sm:gap-3 py-1.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-xs mt-0.5">
          <Stethoscope className="size-4.5" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-3.5 sm:p-4 text-left transition-all ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs font-semibold"
            : "bg-card border border-border text-foreground rounded-bl-xs shadow-[0_2px_0_0_var(--color-border)]"
        }`}
      >
        {/* Danger Tag on Assistant response */}
        {!isUser && message.isDanger && (
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive border border-destructive/30">
            <AlertTriangle className="size-3.5" />
            <span>{t.emergencyCalloutTitle}</span>
          </div>
        )}

        {/* Formatted Content */}
        <div className="break-words space-y-0.5">
          {formatContent(message.content)}
        </div>

        {/* Timestamp */}
        <div
          className={`mt-2 text-xs font-semibold text-right ${
            isUser ? "text-primary-foreground/70" : "text-muted-foreground/80"
          }`}
        >
          {message.timestamp}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground border border-border shadow-2xs mt-0.5">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
}
