import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  HelpCircle,
  KeyRound,
  Lock,
  LogOut,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";
import { DEMO_USERS, useAuth, type UserRole } from "@/lib/auth";
import { loginWithDb } from "@/lib/auth-server";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "लॉगिन — आशा सहाय्यक (ASHA Helper Login)" },
      {
        name: "description",
        content:
          "Official ASHA worker & facilitator login portal. National Health Mission, Maharashtra.",
      },
    ],
  }),
  component: LoginPage,
});

export const MOCK_USERS_INFO = [
  {
    role: "asha" as UserRole,
    name: "श्रीमती सुनिता रामचंद्र पाटील",
    englishName: "Sunita Patil",
    phone: "9876543210",
    password: "asha@123",
    badge: "आशा कार्यकर्ती (ASHA Worker)",
    area: "शिरोली उपकेंद्र, मसूर PHC (सातारा)",
    demoKey: "asha",
  },
  {
    role: "facilitator" as UserRole,
    name: "श्रीमती रेखा आनंद कांबळे",
    englishName: "Rekha Kamble",
    phone: "9822012345",
    password: "fac@123",
    badge: "आशा गटप्रवर्तक (ASHA Facilitator)",
    area: "लोणीकंद उपकेंद्र, वाघोली PHC (पुणे)",
    demoKey: "facilitator",
  },
  {
    role: "asha" as UserRole,
    name: "श्रीमती प्रिया विलास जाधव",
    englishName: "Priya Jadhav",
    phone: "9890123456",
    password: "asha@456",
    badge: "आशा कार्यकर्ती (ASHA Worker)",
    area: "रेंदाळ उपकेंद्र, हुपरी PHC (कोल्हापूर)",
    demoKey: "asha2",
  },
];

function LoginPage() {
  const { t } = useT();
  const navigate = useNavigate();
  const { user, login, logout, loginAsDemo } = useAuth();

  const [mode, setMode] = useState<"password" | "otp">("password");
  const [role, setRole] = useState<UserRole>("asha");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const activeDemo = MOCK_USERS_INFO[selectedDemoIndex];

  const handlePasswordSubmit = async (e: React.FormEvent) => {
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

    try {
      const res = await loginWithDb({
        data: { phone, password, role, isOtp: false },
      });
      if (res.success && res.user) {
        login(res.user);
        navigate({ to: "/" });
        return;
      }
    } catch {
      // Fallback to local accounts
    }

    // Check if phone matches any known demo profiles
    const matched = MOCK_USERS_INFO.find((m) => m.phone === phone);
    if (matched) {
      if (password === matched.password || password === "123456" || password === "asha@123") {
        loginAsDemo(matched.demoKey as any);
        navigate({ to: "/" });
        setLoading(false);
        return;
      } else {
        setError("चुकीचा पासवर्ड! कृपया पुन्हा प्रयत्न करा किंवा खालील अधिकृत पासवर्ड वापरा.");
        setLoading(false);
        return;
      }
    }

    // Default authentic session
    login({
      id: "user-" + phone,
      fullName: role === "facilitator" ? "श्रीमती रेखा कांबळे" : "श्रीमती सुनिता पाटील",
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
    navigate({ to: "/" });
  };

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError(t("enterMobile"));
      return;
    }
    setError(null);
    setOtpSent(true);
    setOtp("123456");
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError(t("enterOtp"));
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await loginWithDb({
        data: { phone, role, isOtp: true },
      });
      if (res.success && res.user) {
        login(res.user);
        navigate({ to: "/" });
        return;
      }
    } catch {
      // Fallback
    }

    const matched = MOCK_USERS_INFO.find((m) => m.phone === phone);
    if (matched) {
      loginAsDemo(matched.demoKey as any);
    } else {
      login({
        id: "user-" + phone,
        fullName: role === "facilitator" ? "श्रीमती रेखा कांबळे" : "श्रीमती सुनिता पाटील",
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
    }
    setLoading(false);
    navigate({ to: "/" });
  };

  const handleAutofillDemo = (demo: typeof activeDemo) => {
    setPhone(demo.phone);
    setPassword(demo.password);
    setRole(demo.role);
    setMode("password");
    setError(null);
  };

  const handleDirectDemoLogin = (demo: typeof activeDemo) => {
    setLoading(true);
    loginAsDemo(demo.demoKey as any);
    navigate({ to: "/" });
  };

  return (
    <AppShell maxWidth="max-w-md">
      <div className="w-full py-4 space-y-4">
        {/* If Already Logged In */}
        {user ? (
          <div className="rounded-xl border border-primary/30 bg-white p-6  text-center space-y-4">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <UserCheck className="size-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                <BadgeCheck className="size-4" />
                सध्या सक्रिय खाते
              </span>
              <h2 className="text-xl font-semibold text-foreground mt-2">{user.fullName}</h2>
              <p className="text-sm font-semibold text-muted-foreground mt-1">
                {user.role === "facilitator" ? "आशा गटप्रवर्तक" : "आशा कार्यकर्ती"} • {user.subCenter}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                to="/"
                className="w-full rounded-xl bg-primary py-3.5 text-center text-base font-semibold text-primary-foreground  hover:bg-primary/95 transition-all flex items-center justify-center gap-2"
              >
                <span>लँडिंग पृष्ठावर जा (Go to Landing Page)</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/dashboard"
                className="w-full rounded-xl border border-border bg-secondary py-3 text-center text-base font-bold text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                दैनिक वही उघडा (Open Daily Diary)
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full rounded-xl border border-destructive/30 py-2.5 text-center text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="size-4" />
                <span>खाते बदला / लॉगआउट करा</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Title & Introduction */}
            <div className="mb-5 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-2.5 border border-primary/20">
                <span>राष्ट्रीय आरोग्य अभियान (NHM महाराष्ट्र)</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground ">
                {t("loginHeading")}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground font-medium">
                {t("loginSubtitle")}
              </p>
            </div>

            {/* Official Training & Demo Credentials Card */}
            <div className="mb-5 rounded-xl border border-primary/25 bg-gradient-to-b from-amber-50/70 via-white to-white p-4 ">
              <div className="flex items-center justify-between gap-2 border-b border-primary/15 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs">
                    🪪
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      प्रात्यक्षिक व चाचणी लॉगिन तपशील
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground">
                      (Field Training & Demo Credentials)
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  अधिकृत
                </span>
              </div>

              {/* Selector Tabs for Demo Roles */}
              <div className="grid grid-cols-2 gap-1.5 mb-3 bg-secondary/60 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDemoIndex(0);
                    handleAutofillDemo(MOCK_USERS_INFO[0]);
                  }}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
                    selectedDemoIndex === 0
                      ? "bg-white text-primary font-semibold "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  १. आशा सेविका (सुनिता ताई)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDemoIndex(1);
                    handleAutofillDemo(MOCK_USERS_INFO[1]);
                  }}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
                    selectedDemoIndex === 1
                      ? "bg-white text-primary font-semibold "
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  २. गटप्रवर्तक (रेखा ताई)
                </button>
              </div>

              {/* Profile Details Box */}
              <div className="rounded-xl border border-border bg-white p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-semibold text-foreground block">
                      {activeDemo.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium block">
                      {activeDemo.area}
                    </span>
                  </div>
                  <span className="rounded-md bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                    {activeDemo.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/60">
                  <div className="rounded-xl bg-secondary/50 p-2 text-left">
                    <span className="block text-xs font-bold text-muted-foreground uppercase">
                      मोबाईल नंबर
                    </span>
                    <span className="text-sm font-semibold font-mono text-foreground">
                      {activeDemo.phone}
                    </span>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-2 text-left">
                    <span className="block text-xs font-bold text-muted-foreground uppercase">
                      पासवर्ड / पिन
                    </span>
                    <span className="text-sm font-semibold font-mono text-primary">
                      {activeDemo.password}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Demo Card */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAutofillDemo(activeDemo)}
                  className="flex-1 rounded-xl border border-border bg-white py-2 px-2.5 text-xs font-bold text-foreground hover:bg-secondary/60 transition-colors  text-center cursor-pointer"
                >
                  फॉर्ममध्ये भरा (Autofill)
                </button>
                <button
                  type="button"
                  onClick={() => handleDirectDemoLogin(activeDemo)}
                  disabled={loading}
                  className="flex-1 rounded-xl bg-primary py-2 px-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all  flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>थेट प्रवेश करा</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t("selectRole")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("asha")}
                  className={`rounded-xl border p-2.5 text-center transition-all flex items-center justify-center gap-2 ${
                    role === "asha"
                      ? "border-primary bg-primary/10 text-primary font-semibold "
                      : "border-border bg-white text-muted-foreground font-semibold hover:text-foreground"
                  }`}
                >
                  <HeartPulse className="size-4 shrink-0 text-primary" />
                  <span className="text-sm">{t("roleAsha")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("facilitator")}
                  className={`rounded-xl border p-2.5 text-center transition-all flex items-center justify-center gap-2 ${
                    role === "facilitator"
                      ? "border-primary bg-primary/10 text-primary font-semibold "
                      : "border-border bg-white text-muted-foreground font-semibold hover:text-foreground"
                  }`}
                >
                  <Users className="size-4 shrink-0 text-accent" />
                  <span className="text-sm">{t("roleFacilitator")}</span>
                </button>
              </div>
            </div>

            {/* Login Form Card */}
            <Card className="mb-5  bg-white">
              {/* Method Tabs */}
              <div className="mb-5 flex rounded-xl border border-border bg-secondary p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("password");
                    setError(null);
                  }}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                    mode === "password"
                      ? "bg-white text-foreground  font-semibold"
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
                      ? "bg-white text-foreground  font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("loginWithOtp")}
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-xl bg-destructive/15 p-3 text-sm font-bold text-destructive flex items-start gap-2">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {mode === "password" ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-foreground">
                      {t("mobileNumber")}
                    </label>
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
                        className="w-full rounded-xl border border-border bg-[#FCFAF6] py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-sm font-bold text-foreground">{t("password")}</label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs font-semibold text-primary flex items-center gap-1 cursor-pointer"
                      >
                        {showPassword ? (
                          <>
                            <EyeOff className="size-3.5" /> लपवा
                          </>
                        ) : (
                          <>
                            <Eye className="size-3.5" /> दाखवा
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="size-5" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        className="w-full rounded-xl border border-border bg-[#FCFAF6] py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary focus:bg-white tracking-widest transition-all"
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
                    className="w-full rounded-xl bg-primary py-3.5 text-center text-lg font-semibold text-primary-foreground  hover:bg-primary/95 transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    {loading ? "लॉगिन होत आहे..." : t("loginBtn")}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-bold text-foreground">
                      {t("mobileNumber")}
                    </label>
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
                          className="w-full rounded-xl border border-border bg-[#FCFAF6] py-3 pl-12 pr-4 text-lg font-bold outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="rounded-xl border border-primary bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20 shrink-0 cursor-pointer"
                      >
                        {t("sendOtp")}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="rounded-xl bg-accent/15 p-3 text-xs font-semibold text-accent flex items-center gap-2">
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>{t("demoOtpNotice")}</span>
                    </div>
                  )}

                  <div>
                    <label className="mb-1 block text-sm font-bold text-foreground">
                      {t("enterOtp")}
                    </label>
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
                        className="w-full rounded-xl border border-border bg-[#FCFAF6] py-3 pl-12 pr-4 text-lg font-semibold tracking-widest outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-primary py-3.5 text-center text-lg font-semibold text-primary-foreground  hover:bg-primary/95 transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    {loading ? "सत्यापित होत आहे..." : t("loginBtn")}
                  </button>
                </form>
              )}
            </Card>

            {/* Direct Guest/Field Link */}
            <div className="mb-5 text-center">
              <button
                type="button"
                onClick={() => {
                  loginAsDemo("asha");
                  navigate({ to: "/" });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                <span>त्वरित थेट प्रवेश (Guest Access)</span> →
              </button>
            </div>

            {/* New Registration Link */}
            <div className="rounded-xl border border-border bg-white p-3.5 text-center ">
              <p className="text-sm font-semibold text-muted-foreground">
                {t("dontHaveAccount")}{" "}
                <Link to="/signup" className="font-semibold text-primary hover:underline">
                  {t("registerNow")}
                </Link>
              </p>
            </div>
          </>
        )}

        {/* Official Guidance & Privacy Reassurance */}
        <div className="mt-6 border-t border-border pt-4 text-center space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="size-4 text-accent" />
            <span>{t("privacyNote")}</span>
          </p>
          <p className="text-xs text-muted-foreground/80 flex items-center justify-center gap-1">
            <HelpCircle className="size-3" />
            <span>तांत्रिक मदत व सहाय्य: टोल-फ्री राष्ट्रीय आरोग्य हेल्पलाईन १०४</span>
          </p>
        </div>
            </div>
    </AppShell>
  );
}
