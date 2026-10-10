import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  KeyRound,
  Lock,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  UserCheck,
  Zap,
} from "lucide-react";
import { LanguageSwitch } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";
import { DEMO_USERS, useAuth, type UserRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "लॉगिन — आशा सहाय्यक (ASHA Helper Login)" },
      {
        name: "description",
        content:
          "Login to ASHA Helper with mobile number and PIN or OTP. Secure, offline-first health worker diary.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useT();
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [mode, setMode] = useState<"password" | "otp">("password");
  const [role, setRole] = useState<UserRole>("asha");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError(t("enterMobile"));
      return;
    }
    if (!password) {
      setError(t("enterPassword"));
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      // Local session login
      login({
        id: "user-" + phone,
        fullName: role === "facilitator" ? t("test2Author") : t("test1Author"),
        phone,
        role,
        district: "सातारा",
        taluka: "कराड",
        phc: "मसूर प्राथमिक आरोग्य केंद्र",
        subCenter: "शिरोली उपकेंद्र",
        village: "शिरोली",
        ashaId: "ASHA-" + phone.slice(-4),
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 400);
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError(t("enterMobile"));
      return;
    }
    setError(null);
    setOtpSent(true);
    setOtp("123456"); // Pre-fill simulation OTP for convenience
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError(t("enterOtp"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({
        id: "user-" + phone,
        fullName: role === "facilitator" ? t("test2Author") : t("test1Author"),
        phone,
        role,
        district: "सातारा",
        taluka: "कराड",
        phc: "मसूर प्राथमिक आरोग्य केंद्र",
        subCenter: "शिरोली उपकेंद्र",
        village: "शिरोली",
        ashaId: "ASHA-" + phone.slice(-4),
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 400);
  };

  const handleQuickDemo = (demoRole: "asha" | "facilitator") => {
    loginAsDemo(demoRole);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b-2 border-border bg-card/90 backdrop-blur sticky top-0 z-10 px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
              <Stethoscope className="size-5" />
            </span>
            <div>
              <span className="block text-lg font-black leading-tight tracking-tight">
                {t("appName")}
              </span>
              <span className="block text-xs font-semibold text-muted-foreground">
                {t("ruralHealthMission")}
              </span>
            </div>
          </Link>
          <LanguageSwitch />
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-md px-4 py-6 flex-1 flex flex-col justify-center">
        {/* Title & Introduction */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid size-16 place-items-center rounded-3xl bg-primary/15 text-primary">
            <UserCheck className="size-8" />
          </div>
          <h1 className="text-2xl font-black text-foreground">{t("loginHeading")}</h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">{t("loginSubtitle")}</p>
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {t("selectRole")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("asha")}
              className={`rounded-2xl border-2 p-3 text-center transition-all flex items-center justify-center gap-1.5 ${
                role === "asha"
                  ? "border-primary bg-primary/10 text-primary font-black shadow-xs"
                  : "border-border bg-card text-muted-foreground font-semibold hover:text-foreground"
              }`}
            >
              <HeartPulse className="size-4 shrink-0 text-primary" />
              <span>{t("roleAsha")}</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("facilitator")}
              className={`rounded-2xl border-2 p-3 text-center transition-all flex items-center justify-center gap-1.5 ${
                role === "facilitator"
                  ? "border-primary bg-primary/10 text-primary font-black shadow-xs"
                  : "border-border bg-card text-muted-foreground font-semibold hover:text-foreground"
              }`}
            >
              <ClipboardCheck className="size-4 shrink-0 text-accent" />
              <span>{t("roleFacilitator")}</span>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <Card className="mb-5 shadow-[0_4px_0_0_var(--color-border)]">
          {/* Method Tabs */}
          <div className="mb-5 flex rounded-2xl border-2 border-border bg-secondary p-1">
            <button
              type="button"
              onClick={() => {
                setMode("password");
                setError(null);
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                mode === "password"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("loginWithPassword")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("otp");
                setError(null);
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                mode === "otp"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("loginWithOtp")}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl bg-destructive/15 p-3 text-sm font-bold text-destructive">
              {error}
            </div>
          )}

          {mode === "password" ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold">{t("mobileNumber")}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Phone className="size-5" />
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t("enterMobile")}
                    className="w-full rounded-2xl border-2 border-border bg-background py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-sm font-bold">{t("password")}</label>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {t("enterPassword")}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="size-5" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full rounded-2xl border-2 border-border bg-background py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary tracking-widest"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-muted-foreground">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4.5 rounded-md accent-primary"
                  />
                  <span>{t("rememberMe")}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-primary py-3.5 text-center text-lg font-black text-primary-foreground shadow-[0_3px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/95 transition-all active:translate-y-0.5 cursor-pointer"
              >
                {loading ? "..." : t("loginBtn")}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold">{t("mobileNumber")}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Phone className="size-5" />
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder={t("enterMobile")}
                      className="w-full rounded-2xl border-2 border-border bg-background py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="rounded-2xl border-2 border-primary bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20 shrink-0 cursor-pointer"
                  >
                    {t("sendOtp")}
                  </button>
                </div>
              </div>

              {otpSent && (
                <div className="rounded-2xl bg-accent/15 p-3 text-xs font-semibold text-accent flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>{t("demoOtpNotice")}</span>
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-bold">{t("enterOtp")}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <KeyRound className="size-5" />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full rounded-2xl border-2 border-border bg-background py-3 pl-12 pr-4 text-lg font-black tracking-widest outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-primary py-3.5 text-center text-lg font-black text-primary-foreground shadow-[0_3px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/95 transition-all active:translate-y-0.5 cursor-pointer"
              >
                {loading ? "..." : t("loginBtn")}
              </button>
            </form>
          )}

          {/* Quick Demo Logins for Instant Testing */}
          <div className="mt-5 border-t border-border pt-4">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1.5">
              <Zap className="size-3.5 text-primary" />
              <span>{t("quickDemoTitle")}</span>
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("asha")}
                className="rounded-2xl border-2 border-accent/30 bg-accent/10 px-3 py-2.5 text-sm font-bold text-accent hover:bg-accent/20 text-left flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <UserCheck className="size-4 shrink-0" />
                  <span>{t("demoLoginAsha")}</span>
                </span>
                <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("facilitator")}
                className="rounded-2xl border-2 border-border bg-card px-3 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground text-left flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <ClipboardCheck className="size-4 shrink-0 text-primary" />
                  <span>{t("demoLoginFacilitator")}</span>
                </span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Direct Bypass Link (Field Worker First Principle) */}
        <div className="mb-6 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <Smartphone className="size-4" />
            {t("guestAccess")} →
          </Link>
        </div>

        {/* Link to Sign Up */}
        <div className="rounded-2xl border-2 border-border bg-card p-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("dontHaveAccount")}{" "}
            <Link to="/signup" className="font-extrabold text-primary hover:underline">
              {t("registerNow")}
            </Link>
          </p>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-4 text-accent" />
          {t("privacyNote")}
        </p>
      </main>
    </div>
  );
}
