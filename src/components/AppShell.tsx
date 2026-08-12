import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Home, WifiOff, Wifi } from "lucide-react";
import { useT, type Lang } from "@/lib/i18n";

const LANGS: Array<{ code: Lang; label: string }> = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "EN" },
];

function OfflineBadge() {
  const { t } = useT();
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
        online
          ? "bg-accent/15 text-accent"
          : "bg-destructive/15 text-destructive"
      }`}
    >
      {online ? <Wifi className="size-4 shrink-0" /> : <WifiOff className="size-4 shrink-0" />}
      <span className="truncate">{online ? t("online") : t("offline")}</span>
    </div>
  );
}

export function LanguageSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="flex shrink-0 overflow-hidden rounded-full border-2 border-border bg-card">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 text-base font-bold transition-colors ${
            lang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function AppShell({
  title,
  backTo,
  children,
}: {
  title?: string;
  backTo?: string;
  children: ReactNode;
}) {
  const { t } = useT();
  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground">
      <header className="sticky top-0 z-20 border-b-2 border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            {backTo ? (
              <Link
                to={backTo}
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground"
                aria-label={t("back")}
              >
                <ArrowLeft className="size-6" />
              </Link>
            ) : (
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-2xl">
                🩺
              </span>
            )}
            <h1 className="truncate text-xl font-extrabold">{title ?? t("appName")}</h1>
          </div>
          <LanguageSwitch />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-3">
          <OfflineBadge />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">{children}</main>

      {backTo && (
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-border bg-card px-4 py-3">
          <div className="mx-auto flex max-w-2xl gap-3">
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-lg font-bold text-secondary-foreground"
            >
              <Home className="size-5" /> {t("home")}
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
