import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardPlus,
  Clock,
  Compass,
  Download,
  ExternalLink,
  Flame,
  HeartPulse,
  HelpCircle,
  Home,
  IndianRupee,
  Layers,
  Lock,
  LogOut,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  Quote,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  ThumbsUp,
  User,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { LanguageSwitch } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT, vaccineLabel } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "आशा सहाय्यक — महाराष्ट्र आशा सेविकांसाठी डिजिटल दैनंदिनी" },
      {
        name: "description",
        content:
          "मराठी-प्रथम, १००% ऑफलाइन कार्यक्षम डिजिटल दैनंदिनी. गरोदर महिला, बाल लसीकरण, टीबी आणि मानधनाचा हिशोब — सर्व काही तुमच्या स्वतःच्या फोनवर, विना इंटरनेट आणि शून्य ट्रॅकिंगसह.",
      },
      { property: "og:title", content: "आशा सहाय्यक — ASHA Helper" },
      {
        property: "og:description",
        content:
          "Marathi-first, offline-first daily work diary for Maharashtra ASHA workers. No location tracking, no internet required.",
      },
      { property: "og:image", content: "/images/asha_hero.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "manifest", href: "/manifest.json" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { t, lang } = useT();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"anc" | "child" | "tb" | "incentive">("anc");

  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground flex flex-col justify-between selection:bg-primary/20">
      {/* 1. Global Announcement Banner */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-xs sm:text-sm font-bold text-primary flex items-center justify-center gap-2">
        <Sparkles className="size-4 shrink-0" />
        <span>{t("landingBadge")}</span>
      </div>

      {/* 2. Top Header & Navbar */}
      <header className="sticky top-0 z-30 border-b-2 border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary text-2xl shadow-xs">
              🩺
            </span>
            <div>
              <span className="block text-xl font-black leading-tight tracking-tight">
                आशा सहाय्यक
              </span>
              <span className="block text-xs font-semibold text-muted-foreground">
                ASHA Helper • महाराष्ट्र
              </span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">
              {t("features")}
            </a>
            <a href="#workflow" className="hover:text-primary transition-colors">
              {t("dailyWorkflow")}
            </a>
            <Link to="/info" className="hover:text-primary transition-colors">
              {t("navInfo")}
            </Link>
            <Link to="/incentive" className="hover:text-primary transition-colors">
              {t("navIncentive")}
            </Link>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitch />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-primary px-3.5 py-2 text-sm font-black text-primary-foreground shadow-[0_2px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/90 flex items-center gap-1.5"
                >
                  <CalendarCheck className="size-4" />
                  <span className="hidden sm:inline">दैनंदिनी उघडा</span>
                </Link>
                <Link
                  to="/login"
                  className="rounded-2xl border border-border bg-card px-2.5 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
                  title="खाते बदला"
                >
                  <User className="size-4" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-2xl border-2 border-border bg-card px-3.5 py-2 text-sm font-bold text-foreground hover:bg-secondary transition-all"
                >
                  {t("loginBtn")}
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:flex rounded-2xl bg-primary px-4 py-2 text-sm font-black text-primary-foreground shadow-[0_2px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/95 transition-all"
                >
                  {t("signupBtn")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-linear-to-b from-card via-background to-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs sm:text-sm font-extrabold text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span>आरोग्य उपकेंद्र व ग्रामीण भागासाठी विशेष डिझाइन</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight sm:leading-none">
                {t("landingHeadline")}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("landingSub")}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <Link
                  to="/dashboard"
                  className="rounded-3xl bg-primary px-6 py-4 text-center text-lg font-black text-primary-foreground shadow-[0_4px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/95 transition-all active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="size-6" />
                  <span>{t("openDailyDiary")}</span>
                  <ArrowRight className="size-5" />
                </Link>

                <Link
                  to="/entry"
                  className="rounded-3xl border-2 border-border bg-card px-6 py-4 text-center text-lg font-black text-foreground shadow-[0_3px_0_0_var(--color-border)] hover:bg-secondary transition-all active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <ClipboardPlus className="size-6 text-primary" />
                  <span>{t("navEntry")}</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="rounded-2xl border border-border/70 bg-card/80 p-3">
                  <ShieldCheck className="size-5 text-accent mb-1" />
                  <p className="text-xs font-bold text-foreground">शून्य ट्रॅकिंग</p>
                  <p className="text-[11px] text-muted-foreground">कोणतेही GPS नाही</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/80 p-3">
                  <WifiOff className="size-5 text-accent mb-1" />
                  <p className="text-xs font-bold text-foreground">100% ऑफलाइन</p>
                  <p className="text-[11px] text-muted-foreground">विना इंटरनेट चालते</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/80 p-3">
                  <Zap className="size-5 text-primary mb-1" />
                  <p className="text-xs font-bold text-foreground">ऑटो-सेव्ह</p>
                  <p className="text-[11px] text-muted-foreground">डेटा कधीही गळत नाही</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/80 p-3">
                  <Smartphone className="size-5 text-primary mb-1" />
                  <p className="text-xs font-bold text-foreground">मोठे बटणे</p>
                  <p className="text-[11px] text-muted-foreground">उन्हातही स्पष्ट वाचता येते</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-1.5 rounded-4xl bg-linear-to-tr from-primary/30 to-accent/30 blur-xl opacity-70" />

                {/* Main Card with Image */}
                <div className="relative rounded-3xl overflow-hidden border-3 border-border bg-card shadow-2xl">
                  <img
                    src="/images/asha_hero.jpg"
                    alt="आशा सेविका व माता - आरोग्य उपकेंद्र शिरोली"
                    className="w-full h-auto object-cover aspect-16/10"
                    loading="eager"
                  />

                  {/* Overlaid Pill Badge */}
                  <div className="p-4 bg-card/95 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="grid size-9 place-items-center rounded-xl bg-accent/20 text-accent font-black text-sm">
                          MH
                        </span>
                        <div>
                          <p className="text-sm font-extrabold text-foreground">
                            आरोग्य उपकेंद्र • शिरोली (सातारा)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            राष्ट्रीय आरोग्य अभियान (NHM) कार्यपद्धतीनुसार
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-extrabold text-accent">
                        सक्रिय साथी
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Widget: Sample Today's Task */}
                <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-3 shadow-xl backdrop-blur max-w-xs">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
                    <CalendarCheck className="size-5" />
                  </span>
                  <div className="text-xs">
                    <p className="font-extrabold text-foreground">आजची तपासणी</p>
                    <p className="text-muted-foreground">सुनिता ताई — २ ANC + ३ लसीकरण</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact Counters */}
      <section className="border-y-2 border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-primary">१,५००+</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">
                गावे व वाड्यांचे उद्दिष्ट
              </p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-accent">४ ANC</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">
                अनिवार्य तपासण्यांची स्वयंचलित यादी
              </p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-primary">७+ लस</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">
                जन्म ते १५ महिन्यांचे वेळापत्रक
              </p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-foreground">₹०</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">
                डेटा किंवा सर्व्हर खर्च (100% मोफत)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key Features for ASHA Work */}
      <section id="features" className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-primary/15 text-primary px-3.5 py-1 text-xs font-black uppercase tracking-wider">
              {t("features")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-3">
              आशा सेविकांच्या प्रत्यक्ष कामाशी सुसंगत वैशिष्ट्ये
            </h2>
            <p className="text-base text-muted-foreground font-medium mt-2">
              कागदी वह्या सांभाळण्याचा त्रास संपवा. प्रत्येक तपासणी व मानधनाची अचूक नोंद ठेवा.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("anc")}
              className={`rounded-2xl px-4 py-2.5 text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === "anc"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border-2 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <HeartPulse className="size-4" />
              <span>माता आरोग्य व ANC</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("child")}
              className={`rounded-2xl px-4 py-2.5 text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === "child"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border-2 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Baby className="size-4" />
              <span>बाल संगोपन व लसीकरण</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tb")}
              className={`rounded-2xl px-4 py-2.5 text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === "tb"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border-2 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Stethoscope className="size-4" />
              <span>टीबी व डास सर्वेक्षण</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("incentive")}
              className={`rounded-2xl px-4 py-2.5 text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === "incentive"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border-2 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <IndianRupee className="size-4" />
              <span>मानधन ट्रॅकर</span>
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="rounded-3xl border-2 border-border bg-card p-6 sm:p-8 shadow-[0_4px_0_0_var(--color-border)]">
            {activeTab === "anc" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-bold">
                    नेगेल्स नियम (Naegele's Rule) कॅल्क्युलेटर
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    गरोदर महिला नोंदणी व ANC वेळापत्रक
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    शेवटची पाळी (LMP) तारीख टाकताच अपेक्षित प्रसूती तारीख (EDD) आपोआप मोजली जाते. ४
                    अनिवार्य तपासण्यांच्या तारखा तयार होतात. बीपी (BP) १४०/९० किंवा हिमोग्लोबिन ११
                    पेक्षा कमी असल्यास त्वरित धोक्याचा इशारा मिळतो.
                  </p>
                  <ul className="space-y-2 text-sm font-bold text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>स्वयंचलित EDD व 4 ANC तपासण्यांची यादी</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>उच्च रक्तदाब (High BP) व ॲनिमिया धोक्याचा इशारा</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>प्रसूती ठिकाण व जननी सुरक्षा योजना (JSY) ट्रॅकिंग</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/entry/pregnancy"
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95"
                    >
                      <ClipboardPlus className="size-4" /> गरोदर महिला नोंद करा
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      नमुना फॉर्म स्क्रीन
                    </span>
                    <span className="rounded-full bg-destructive/15 text-destructive px-2 py-0.5 text-xs font-bold">
                      जास्त धोका इशारा
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-extrabold text-base">सौ. सविता ज्ञानेश्वर शिंदे (वय २४)</p>
                    <p className="text-muted-foreground">पत्ता: घर क्र. १२, मारुती आळी, शिरोली</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-xl border p-2 bg-card">
                        <span className="text-xs text-muted-foreground">LMP तारीख</span>
                        <p className="font-bold">१५ मे २०२६</p>
                      </div>
                      <div className="rounded-xl border p-2 bg-card">
                        <span className="text-xs text-muted-foreground">अपेक्षित EDD</span>
                        <p className="font-bold text-primary">२२ फेब्रुवारी २०२७</p>
                      </div>
                    </div>
                    <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-2.5 text-destructive text-xs font-bold flex items-center gap-2">
                      <AlertTriangle className="size-4 shrink-0" />
                      <span>बीपी: १४०/९२ mmHg • तात्काळ PHC रेफरल आवश्यक</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "child" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-bold">
                    राष्ट्रीय लसीकरण वेळापत्रक (UIP)
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    बालक नोंदणी व वेळेवर संपूर्ण लसीकरण
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    बाळाच्या जन्मतारखेनुसार (DOB) जन्माच्या लसी (BCG, OPV-0, Hep-B) ते ६, १०, १४
                    आठवड्यांचे पेंटाव्हॅलंट आणि ९ ते १५ महिन्यांचे गोवर-रुबेला (MR) लस वेळेवर देण्यासाठी
                    कलर-कोडेड सूचना मिळतात.
                  </p>
                  <ul className="space-y-2 text-sm font-bold text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>🔴 उशीर झालेली व 🟢 आज देण्याची लस स्पष्ट ओळख</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>वाढ तपासणी: वजन (Weight), उंची आणि MUAC नोंद</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>गावातील कोणतेही बाळ लसीकरणातून सुटणार नाही</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/entry/child"
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95"
                    >
                      <Baby className="size-4" /> बालक नोंद करा
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      लसीकरण ड्यू-लिस्ट
                    </span>
                    <span className="rounded-full bg-primary/20 text-primary px-2 py-0.5 text-xs font-bold">
                      ३ लस आगामी
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 flex justify-between items-center">
                      <div>
                        <p className="font-extrabold">आरव अमोल जाधव</p>
                        <p className="text-xs text-muted-foreground">पेंटाव्हॅलंट-१ / ओपीव्ही-१</p>
                      </div>
                      <span className="rounded-full bg-destructive/15 text-destructive px-2 py-1 text-xs font-bold">
                        उशीर झाला (२ दिवस)
                      </span>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 flex justify-between items-center">
                      <div>
                        <p className="font-extrabold">अनन्या महेश पवार</p>
                        <p className="text-xs text-muted-foreground">गोवर-रुबेला (MR-1)</p>
                      </div>
                      <span className="rounded-full bg-primary/15 text-primary px-2 py-1 text-xs font-bold">
                        आज देय आहे
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tb" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-bold">
                    निक्षय (Ni-Kshay) सहकार्य
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    टीबी डॉट्स उपचार व साथरोग सर्वेक्षण
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    क्षयरोग (TB) रुग्णांनी रोजच्या गोळ्या (DOTS) नियमित घेतल्याची आठवडा व महिनानिहाय नोंद
                    ठेवा. हिवताप (मलेरिया) आणि डेंग्यू साथीच्या काळात घराघरात जाऊन तापाचे रुग्ण आणि
                    डासांच्या अळ्या शोधण्याचा सर्व्हे एका मिनिटात भरा.
                  </p>
                  <ul className="space-y-2 text-sm font-bold text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>टीबी डॉट्स डोस पूर्णतेची साधी चेकलिस्ट</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>डास अळी शोध व रक्त नमुना संकलन सर्व्हे</span>
                    </li>
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <Link
                      to="/entry/tb"
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95"
                    >
                      <Stethoscope className="size-4" /> टीबी नोंद
                    </Link>
                    <Link
                      to="/entry/survey"
                      className="inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary"
                    >
                      साथरोग सर्व्हे
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                  <div className="rounded-xl border bg-card p-3">
                    <p className="font-extrabold text-sm">शिरोली गाव डास व ताप सर्व्हे</p>
                    <p className="text-xs text-muted-foreground mt-0.5">भेट दिलेली घरे: ३५</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-secondary">
                        <span className="text-muted-foreground">तापाचे रुग्ण:</span>
                        <p className="font-bold text-base">२ रुग्ण सापडले</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary">
                        <span className="text-muted-foreground">डास अळी तपासणी:</span>
                        <p className="font-bold text-base text-accent">होय (नष्ट केले)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "incentive" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-bold">
                    मानधन हिशोब वही (₹)
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    कामाची नोंद आणि महिन्याच्या मानधनाचा हिशोब
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    प्रत्येक कामाचे (JSY प्रसूती सहकार्य ₹३००, संपूर्ण लसीकरण ₹१००, टीबी पाठपुरावा
                    ₹१,०००) दरपत्रकानुसार मानधन आपोआप मोजले जाते. महिनाअखेर किती पैसे जमा झाले आणि किती
                    बाकी आहेत हे एका दृष्टीक्षेपात समजते.
                  </p>
                  <ul className="space-y-2 text-sm font-bold text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>काम नोंदवताच अपेक्षित रक्कम (₹) तत्काळ तयार</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>मिळालेले पैसे व प्रलंबित थकबाकी ट्रॅकर</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>व्हाट्सअॅप किंवा रिपोर्टसाठी सोपा सारांश</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/incentive"
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95"
                    >
                      <IndianRupee className="size-4" /> मानधन ट्रॅकर उघडा
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-xs font-bold text-muted-foreground">
                      चालू महिना मानधन स्थिती
                    </span>
                    <span className="text-xs font-bold text-accent">ऑक्टोबर २०२६</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <span className="text-xs text-muted-foreground">अपेक्षित मानधन</span>
                      <p className="text-2xl font-black text-primary">₹३,४५०</p>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                      <span className="text-xs text-muted-foreground">मिळालेली रक्कम</span>
                      <p className="text-2xl font-black text-accent">₹२,०००</p>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-card p-2.5 text-xs font-bold flex justify-between items-center text-muted-foreground">
                    <span>थकबाकी (Pending):</span>
                    <span className="text-sm font-black text-destructive">₹१,४५० बाकी</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. ASHA Worker Daily Workflow ("हे कसे कार्य करते?") */}
      <section id="workflow" className="py-14 sm:py-20 bg-secondary/50 border-y-2 border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-accent/20 text-accent px-3.5 py-1 text-xs font-black uppercase tracking-wider">
              {t("dailyWorkflow")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-3">
              सकाळच्या फेरीपासून महिनाअखेर मानधनापर्यंतची सोपी ४ पावले
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-3xl border-2 border-border bg-card p-6 relative">
              <span className="text-3xl font-black text-primary/40 block mb-3">०१</span>
              <h4 className="text-lg font-black text-foreground mb-1">सकाळची भेट यादी पहा</h4>
              <p className="text-sm text-muted-foreground font-medium">
                ॲप उघडताच आज कोणत्या मातेची ANC तपासणी आहे किंवा कोणत्या बाळाची लस बाकी आहे याची यादी
                दिसते.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-border bg-card p-6 relative">
              <span className="text-3xl font-black text-primary/40 block mb-3">०२</span>
              <h4 className="text-lg font-black text-foreground mb-1">गृहभेट व एका टॅपवर नोंद</h4>
              <p className="text-sm text-muted-foreground font-medium">
                गावात प्रत्यक्ष भेट दिल्यावर फक्त वजन, बीपी व लस दिल्याची खूण करा. डेटा आपोआप सेव्ह
                होतो.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-border bg-card p-6 relative">
              <span className="text-3xl font-black text-primary/40 block mb-3">०३</span>
              <h4 className="text-lg font-black text-foreground mb-1">तातडीचा आरोग्य सल्ला</h4>
              <p className="text-sm text-muted-foreground font-medium">
                जोखीम असल्यास ॲप लाल रंगात धोक्याचा इशारा देईल, जेणेकरून मातेला वेळेत प्राथमिक आरोग्य
                केंद्रात नेता येईल.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-border bg-card p-6 relative">
              <span className="text-3xl font-black text-primary/40 block mb-3">०४</span>
              <h4 className="text-lg font-black text-foreground mb-1">मानधन व हिशोब पूर्ण</h4>
              <p className="text-sm text-muted-foreground font-medium">
                दिवसाच्या शेवटी मानधन आपोआप जोडले जाते. महिनाअखेर क्लेम करण्यासाठी क्लिष्ट आकडेमोड
                करावी लागत नाही.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Field Worker Testimonials / Real Voices */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-primary/15 text-primary px-3.5 py-1 text-xs font-black uppercase tracking-wider">
              {t("whyTrustUs")}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-3">
              महाराष्ट्र आशा सेविकांचे मनोगत
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border-2 border-border bg-card p-6 space-y-4">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                "आधी मला ४ वेगवेगळ्या नोंदवह्यांमध्ये एकाच मातेचे नाव वारंवार लिहावे लागत असे. या
                ॲपमुळे रोजचा दीड ते दोन तास वाचतो आणि लस कधी द्यायची याची चिंता मिटली."
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary font-bold">
                  सु
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">श्रीमती सुनिता पाटील</p>
                  <p className="text-xs text-muted-foreground">आशा सेविका, शिरोली (सातारा)</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-border bg-card p-6 space-y-4">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                "आमच्या डोंगराळ वस्तीत अजिबात मोबाईल नेटवर्क नसते. सरकारी पोर्टल चालत नाहीत; पण आशा
                सहाय्यक पूर्णपणे ऑफलाइन चालते आणि फोन बंद पडला तरी ड्राफ्ट सेव्ह राहतो."
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent font-bold">
                  रे
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">श्रीमती रेखा कांबळे</p>
                  <p className="text-xs text-muted-foreground">आशा सेविका, हवेली (पुणे)</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-border bg-card p-6 space-y-4">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                "मी गटप्रवर्तक म्हणून १० आशा ताईंचे काम पाहते. मानधनाचा हिशोब आणि उच्च जोखीम गरोदर
                मातांची यादी त्वरित समजत असल्याने सुपरव्हिजन अत्यंत सोपे झाले आहे."
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary font-bold">
                  वं
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">श्रीमती वंदना जाधव</p>
                  <p className="text-xs text-muted-foreground">आशा गटप्रवर्तक (नाशिक)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PWA Install Guide */}
      <section className="py-12 bg-primary/10 border-y-2 border-primary/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center md:text-left">
              <div className="inline-grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground mb-3 shadow-md">
                <Smartphone className="size-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground">{t("pwaTitle")}</h3>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                प्ले स्टोअरशिवाय तुमच्या अँड्रॉइड फोनवर १ सेकंदात ॲप आयकॉन तयार करा.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-primary uppercase">पायरी १</span>
                <p className="font-extrabold text-sm mt-1">क्रोम (Chrome) ब्राऊझर</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ही लिंक तुमच्या फोनच्या गुगल क्रोम ब्राऊझरमध्ये उघडा.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-primary uppercase">पायरी २</span>
                <p className="font-extrabold text-sm mt-1">तीन ठिपके (Menu)</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  उजव्या कोपऱ्यातील ३ उभ्या ठिपक्यांवर टॅप करा.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-accent uppercase">पायरी ३</span>
                <p className="font-extrabold text-sm mt-1">'Add to Home screen'</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  'Install' किंवा 'होम स्क्रीनवर जोडा' दाबा. ॲप तयार होईल!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="rounded-full bg-primary/15 text-primary px-3.5 py-1 text-xs font-black uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2">
              नेहमी विचारले जाणारे प्रश्न
            </h2>
          </div>

          <div className="space-y-3">
            <details className="group rounded-2xl border-2 border-border bg-card p-4 transition-colors open:border-primary/40">
              <summary className="flex cursor-pointer items-center justify-between font-extrabold text-base text-foreground list-none">
                <span>१. हे ॲप वापरण्यासाठी इंटरनेट किंवा रिचार्ज आवश्यक आहे का?</span>
                <ChevronDown className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t">
                नाही! हे ॲप पूर्णपणे ऑफलाइन चालते. तुम्ही शेतात, जंगलात किंवा नेटवर्क नसलेल्या घरातही
                गरोदर महिला व बालकांची नोंद करू शकता. सर्व माहिती फोनच्या मेमरीत सुरक्षित साठवली जाते.
              </p>
            </details>

            <details className="group rounded-2xl border-2 border-border bg-card p-4 transition-colors open:border-primary/40">
              <summary className="flex cursor-pointer items-center justify-between font-extrabold text-base text-foreground list-none">
                <span>२. फोनची बॅटरी संपली किंवा अचानक फोन बंद झाला तर माहिती उडून जाईल का?</span>
                <ChevronDown className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t">
                अजिबात नाही. ॲपमध्ये ऑटो-सेव्ह (Auto-save) तंत्रज्ञान आहे. तुम्ही टाईप केलेले प्रत्येक
                अक्षर आपोआप सेव्ह होते. फोन पुन्हा सुरू केल्यावर तुमचा अपूर्ण फॉर्म जसाच्या तसा समोर येतो.
              </p>
            </details>

            <details className="group rounded-2xl border-2 border-border bg-card p-4 transition-colors open:border-primary/40">
              <summary className="flex cursor-pointer items-center justify-between font-extrabold text-base text-foreground list-none">
                <span>३. याद्वारे शासकीय अधिकारी आमच्यावर किंवा लोकेशनवर नजर ठेवतात का?</span>
                <ChevronDown className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t">
                नाही! आशा सहाय्यक ॲपमध्ये कोणतेही GPS लोकेशन ट्रॅकिंग किंवा पाळत ठेवणारी प्रणाली नाही.
                ही तुमची स्वतःची दैनंदिनी आहे आणि डेटा केवळ तुमच्या स्वतःच्या फोनवर राहतो.
              </p>
            </details>

            <details className="group rounded-2xl border-2 border-border bg-card p-4 transition-colors open:border-primary/40">
              <summary className="flex cursor-pointer items-center justify-between font-extrabold text-base text-foreground list-none">
                <span>४. भविष्यात डेटा सुरक्षित ठेवण्यासाठी क्लाउड बॅकअपची सोय आहे का?</span>
                <ChevronDown className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t">
                होय! पुढील टप्प्यात निऑन डेटाबेस (NeonDB Serverless Postgres) सह सुरक्षित बँक-स्तरीय
                एन्क्रिप्शन बॅकअप जोडले जाणार आहे, ज्यामुळे फोन बदलला तरी जुना सर्व डेटा एका सेकंदात
                परत मिळेल.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="bg-primary text-primary-foreground py-12 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            आजच तुमची डिजिटल दैनंदिनी सुरू करा!
          </h3>
          <p className="text-primary-foreground/90 text-base font-medium max-w-xl mx-auto">
            कागदी वह्यांच्या कटकटीतून मुक्त व्हा. गावातील माता व बालकांच्या आरोग्याची अचूक काळजी घ्या.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
            <Link
              to="/dashboard"
              className="rounded-3xl bg-card text-foreground px-6 py-3.5 text-base font-black shadow-md hover:bg-card/90 transition-all active:translate-y-0.5"
            >
              📖 दैनिक वही उघडा
            </Link>
            <Link
              to="/signup"
              className="rounded-3xl border-2 border-primary-foreground/40 bg-primary px-6 py-3.5 text-base font-black text-primary-foreground hover:bg-primary/90 transition-all"
            >
              ✨ नवीन आशा खाते तयार करा
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t-2 border-border bg-card py-10 px-4 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-xl">
              🩺
            </span>
            <div>
              <p className="font-extrabold text-foreground text-base">आशा सहाय्यक (ASHA Helper)</p>
              <p className="text-xs">
                महाराष्ट्र ग्रामीण आरोग्य सेविकांसाठी समर्पित डिजिटल प्लॅटफॉर्म
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-bold">
            <Link to="/dashboard" className="hover:text-foreground">
              दैनंदिनी
            </Link>
            <Link to="/entry" className="hover:text-foreground">
              नोंद करा
            </Link>
            <Link to="/info" className="hover:text-foreground">
              माहिती केंद्र
            </Link>
            <Link to="/incentive" className="hover:text-foreground">
              मानधन दर
            </Link>
            <Link to="/login" className="hover:text-foreground">
              लॉगिन
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              नोंदणी
            </Link>
          </div>

          <p className="text-xs text-center md:text-right">
            © {new Date().getFullYear()} आशा सहाय्यक • ऑफलाइन व गोपनीयता प्रथम
          </p>
        </div>
      </footer>
    </div>
  );
}
