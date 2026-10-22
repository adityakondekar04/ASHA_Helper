import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarCheck,
  HelpCircle,
  Home,
  LogOut,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import { pick, useT, type Lang, type Tri } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

const LANGS: Array<{ code: Lang; label: string }> = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "EN" },
];

const NAV_ITEMS: Array<{
  to: string;
  label: Tri;
  icon: typeof Home;
}> = [
  { to: "/", label: ["मुख्य", "होम", "Home"], icon: Home },
  { to: "/dashboard", label: ["दैनिक वही", "दैनिक डायरी", "Daily register"], icon: CalendarCheck },
  { to: "/info", label: ["साधने", "संसाधन", "Resources"], icon: BookOpen },
  { to: "/info/faq", label: ["मदत", "मदद", "Help"], icon: HelpCircle },
];

function OfflineDot() {
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
    <span
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-normal"
      title={online ? t("online") : t("offline")}
    >
      <span
        className={`size-2 rounded-full ${
          online ? "bg-emerald-500" : "bg-destructive animate-pulse"
        }`}
      />
      <span className="hidden sm:inline text-xs text-muted-foreground">
        {online ? t("online") : t("offline")}
      </span>
    </span>
  );
}

export function LanguageSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs font-medium">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
            lang === l.code
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const { t } = useT();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
      >
        <User className="size-3.5" />
        <span>{t("loginBtn")}</span>
      </Link>
    );
  }

  const initial = user.fullName?.slice(0, 1) || "A";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 p-1 hover:border-primary/50 transition-colors cursor-pointer"
        title={user.fullName}
        aria-label="User account"
      >
        <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          {initial}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-40 w-56 rounded-xl border border-border bg-card p-3 shadow-lg">
            <div className="border-b border-border pb-2.5 mb-2">
              <p className="text-sm font-semibold text-foreground truncate">{user.fullName}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {user.subCenter} • {user.district}
              </p>
              <span className="mt-1.5 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                {user.role === "facilitator" ? t("roleFacilitator") : t("roleAsha")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span>{t("logoutBtn")}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FloatingSaathi() {
  const { user } = useAuth();
  const { lang } = useT();

  if (!user) return null;

  return (
    <Link
      to="/chat"
      className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-[#2E1810] px-4 py-2.5 text-sm font-medium text-[#FDF8F4] border border-[#522E20] shadow-md hover:bg-[#3D2218] transition-transform active:scale-95"
      title={lang === "en" ? "ASHA Saathi (AI)" : "आशा साथी (AI)"}
    >
      <Sparkles className="size-4 text-amber-300 shrink-0" />
      <span>{lang === "en" ? "ASHA Saathi" : "आशा साथी"}</span>
    </Link>
  );
}

export function AppShell({
  title,
  backTo,
  children,
  maxWidth = "max-w-2xl",
}: {
  title?: string;
  backTo?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  const { t, lang } = useT();

  return (
    <div className="min-h-screen bg-background text-[16px] leading-[1.6] text-foreground flex flex-col justify-between">
      {/* 1. Shared Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Brand + subtle offline dot */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Stethoscope className="size-5" />
              </span>
              <span className="text-base sm:text-lg font-semibold text-foreground tracking-normal truncate">
                {t("appName")}
              </span>
            </Link>
            <OfflineDot />
          </div>

          {/* Desktop 4 links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-secondary text-primary font-semibold" }}
                inactiveProps={{
                  className: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                }}
                className="rounded-lg px-3 py-1.5 transition-colors"
              >
                {pick(lang, item.label)}
              </Link>
            ))}
          </nav>

          {/* Right: Language switch + Profile/Logout */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitch />
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className={`mx-auto w-full ${maxWidth} px-4 pb-24 pt-4 sm:px-6 flex-1`}>
        {(title || backTo) && (
          <div className="mb-4 flex items-center gap-3">
            {backTo && (
              <Link
                to={backTo}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-secondary transition-colors"
                aria-label={t("back")}
              >
                <ArrowLeft className="size-4" />
              </Link>
            )}
            {title && (
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-normal truncate">
                {title}
              </h1>
            )}
          </div>
        )}
        {children}
      </main>

      {/* 3. Floating AI Saathi Button (for logged-in workers) */}
      <FloatingSaathi />

      {/* 4. Mobile Bottom Tab Bar (4 links, min 44px tap targets) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary font-semibold" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="flex min-h-[48px] flex-col items-center justify-center py-1.5 text-xs transition-colors"
            >
              <item.icon className="size-5 mb-0.5 shrink-0" />
              <span className="truncate max-w-[72px] leading-normal text-xs font-medium">
                {pick(lang, item.label)}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
