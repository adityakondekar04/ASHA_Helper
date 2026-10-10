import { AlertTriangle, PhoneCall } from "lucide-react";
import type { SupportedLanguage } from "@/types/chat";
import { getChatTranslation } from "@/i18n";

export function EmergencyNotice({
  language,
  onDismiss,
}: {
  language: SupportedLanguage;
  onDismiss?: () => void;
}) {
  const t = getChatTranslation(language);

  return (
    <div className="rounded-3xl border-2 border-destructive/50 bg-destructive/10 p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-destructive text-destructive-foreground">
          <AlertTriangle className="size-5 animate-pulse" />
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-base text-destructive flex items-center gap-2">
            {t.emergencyCalloutTitle}
          </h4>
          <p className="text-xs sm:text-sm text-foreground/90 font-medium mt-1 leading-relaxed">
            {t.emergencyCalloutDesc}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="tel:108"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-destructive px-3.5 py-2 text-xs sm:text-sm font-black text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-xs"
            >
              <PhoneCall className="size-4" />
              <span>{t.emergency108}</span>
            </a>
            <a
              href="tel:102"
              className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-destructive/40 bg-card px-3.5 py-2 text-xs sm:text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors"
            >
              <PhoneCall className="size-4" />
              <span>{t.emergency102}</span>
            </a>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="ml-auto text-xs font-bold text-muted-foreground hover:text-foreground self-center px-2 py-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
