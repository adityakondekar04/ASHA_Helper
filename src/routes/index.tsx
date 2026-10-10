import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Baby,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardPlus,
  Clock,
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
  Quote,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  User,
  UserCheck,
  Users,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { LanguageSwitch } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useT, vaccineLabel } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "आशा सहाय्यक — ASHA Helper" },
      {
        name: "description",
        content:
          "Marathi-first, offline-first daily work diary for Maharashtra ASHA workers. No location tracking, no internet required.",
      },
      { property: "og:title", content: "आशा सहाय्यक — ASHA Helper" },
      {
        property: "og:description",
        content:
          "Marathi-first, offline-first daily work diary for Maharashtra ASHA workers. No location tracking, no internet required.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "manifest", href: "/manifest.json" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { t, lang } = useT();
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("anc");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 font-black text-base text-foreground tracking-wide">
          आशा सहाय्यक पोर्टल लोड होत आहे...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-[17px] text-foreground flex flex-col justify-between selection:bg-primary/20">
      {/* 1. Global Announcement Banner */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-xs sm:text-sm font-bold text-primary flex items-center justify-center gap-2">
        <Sparkles className="size-4 shrink-0 text-primary" />
        <span>
          स्वागत आहे, {user.fullName}! — {user.subCenter} ({user.district})
        </span>
      </div>

      {/* 2. Top Header & Navbar */}
      <header className="sticky top-0 z-30 border-b-2 border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
              <Stethoscope className="size-6" />
            </span>
            <div>
              <span className="block text-xl font-black leading-tight tracking-tight">
                {t("appName")}
              </span>
              <span className="block text-xs font-semibold text-muted-foreground">
                {t("ruralHealthMission")}
              </span>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-muted-foreground">
            <Link to="/chat" className="text-primary font-black hover:underline flex items-center gap-1 transition-colors">
              <Sparkles className="size-3.5" />
              <span>आशा साथी (AI)</span>
            </Link>
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

            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="rounded-2xl bg-primary px-3.5 py-2 text-sm font-black text-primary-foreground shadow-[0_2px_0_0_oklch(0.42_0.14_38)] hover:bg-primary/90 flex items-center gap-1.5 transition-all"
              >
                <CalendarCheck className="size-4" />
                <span className="hidden sm:inline">{t("openDailyDiary")}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate({ to: "/login" });
                }}
                className="rounded-2xl border border-destructive/30 bg-destructive/10 px-2.5 py-2 text-xs font-bold text-destructive hover:bg-destructive/20 flex items-center gap-1 transition-colors cursor-pointer"
                title={t("logoutBtn")}
              >
                <LogOut className="size-4" />
                <span className="hidden md:inline">{t("logoutBtn")}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Image removed, replaced with rich live interactive Diary UI preview) */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 bg-linear-to-b from-card via-background to-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs sm:text-sm font-extrabold text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span>{t("heroSubcenterDesign")}</span>
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

                <Link
                  to="/chat"
                  className="rounded-3xl border-2 border-primary/40 bg-primary/10 px-5 py-4 text-center text-lg font-black text-primary hover:bg-primary/20 transition-all active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <Sparkles className="size-6 text-primary" />
                  <span>आशा साथी (AI)</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-2xs">
                  <ShieldCheck className="size-5 text-accent mb-1" />
                  <p className="text-xs font-bold text-foreground">{t("zeroTracking")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("noGps")}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-2xs">
                  <WifiOff className="size-5 text-accent mb-1" />
                  <p className="text-xs font-bold text-foreground">{t("fullOffline")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("worksWithoutNet")}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-2xs">
                  <Zap className="size-5 text-primary mb-1" />
                  <p className="text-xs font-bold text-foreground">{t("autoSave")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("dataNeverLost")}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-2xs">
                  <Smartphone className="size-5 text-primary mb-1" />
                  <p className="text-xs font-bold text-foreground">{t("largeButtons")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("sunlightReadable")}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Diary UI Component (Replaces Image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-1.5 rounded-4xl bg-linear-to-tr from-primary/25 to-accent/25 blur-xl opacity-70 pointer-events-none" />

                {/* Primary Card Preview using Shadcn */}
                <Card className="relative rounded-3xl border-3 border-border bg-card shadow-2xl overflow-hidden">
                  {/* Top Bar of Field Phone */}
                  <CardHeader className="bg-secondary/60 pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground font-black text-xs">
                          <Stethoscope className="size-5" />
                        </span>
                        <div>
                          <CardTitle className="text-sm font-extrabold text-foreground">
                            {t("subcenterShiroli")}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            {t("nhmCompliant")}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 font-bold text-[11px]">
                        <WifiOff className="size-3 mr-1" /> {t("offline")}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3.5">
                    {/* Worker Profile Mini-Banner */}
                    <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
                          <UserCheck className="size-4" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-primary">
                            {t("welcomeTai")}, {t("test1Author")}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-medium">
                            {t("roleAsha")} • {t("activeCompanion")}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[11px] font-bold">
                        {t("savedLocally")}
                      </Badge>
                    </div>

                    {/* Today's Tasks Interactive Showcase */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <CalendarCheck className="size-3.5 text-primary" />
                          {t("todayTasks")}
                        </span>
                        <span className="text-[11px] font-black text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                          2 {t("activeRemaining")}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Overdue Task */}
                        <div className="rounded-2xl border-2 border-border bg-card p-3 flex items-center justify-between shadow-2xs hover:border-primary/40 transition-colors">
                          <div className="min-w-0 pr-2">
                            <p className="font-extrabold text-sm text-foreground truncate">
                              {t("sampleChildName1")}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {t("dueImm")} · {t("sampleVaccine1")}
                            </p>
                          </div>
                          <Badge variant="destructive" className="shrink-0 text-xs font-bold">
                            {t("sampleOverdueTag")}
                          </Badge>
                        </div>

                        {/* Due Today Task with High-Risk warning */}
                        <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-3 flex items-center justify-between shadow-2xs">
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <p className="font-extrabold text-sm text-foreground truncate">
                                {t("sampleMotherName")}
                              </p>
                              <span className="rounded-full bg-destructive/20 text-destructive text-[10px] font-black px-1.5 py-0.2">
                                {t("riskWarningTag")}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {t("dueAnc")} · ANC 3
                            </p>
                          </div>
                          <Badge className="shrink-0 bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold border-0">
                            {t("dueToday")}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* High Risk Alert Banner */}
                    <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-2.5 text-destructive text-xs font-bold flex items-center gap-2">
                      <AlertTriangle className="size-4 shrink-0" />
                      <span className="truncate">{t("sampleBpWarning")}</span>
                    </div>

                    {/* Quick Stats Grid 2x2 */}
                    <div className="grid grid-cols-2 gap-2 text-center pt-1">
                      <div className="rounded-xl border border-border bg-background p-2">
                        <p className="text-lg font-black text-primary">18</p>
                        <p className="text-[11px] font-bold text-muted-foreground">{t("statVisits")}</p>
                      </div>
                      <div className="rounded-xl border border-border bg-background p-2">
                        <p className="text-lg font-black text-accent">3</p>
                        <p className="text-[11px] font-bold text-muted-foreground">{t("statPending")}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-secondary/40 p-3 border-t">
                    <Link
                      to="/dashboard"
                      className="w-full rounded-2xl bg-card border border-border py-2 text-center text-xs font-extrabold text-foreground hover:bg-secondary flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <CalendarCheck className="size-3.5 text-primary" />
                      <span>{t("openDailyDiary")} →</span>
                    </Link>
                  </CardFooter>
                </Card>
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
              <p className="text-3xl sm:text-4xl font-black text-primary">{t("impactVillagesNum")}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">{t("impactVillages")}</p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-accent">{t("impactAncNum")}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">{t("impactAnc")}</p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-primary">{t("impactVaccinesNum")}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">{t("impactVaccines")}</p>
            </div>
            <div className="p-3">
              <p className="text-3xl sm:text-4xl font-black text-foreground">{t("impactCostNum")}</p>
              <p className="text-sm font-bold text-muted-foreground mt-1">{t("impactCost")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Key Features for ASHA Work (Using Shadcn Tabs & Cards) */}
      <section id="features" className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2">
              {t("features")}
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-2">
              {t("featuresHeading")}
            </h2>
            <p className="text-base text-muted-foreground font-medium mt-2">
              {t("featuresSub")}
            </p>
          </div>

          {/* Shadcn Tabs Component */}
          <Tabs defaultValue="anc" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card border-2 border-border p-1.5 rounded-2xl h-auto flex flex-wrap gap-1">
                <TabsTrigger
                  value="anc"
                  className="rounded-xl px-4 py-2.5 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                >
                  <HeartPulse className="size-4 mr-2" />
                  {t("tabMch")}
                </TabsTrigger>
                <TabsTrigger
                  value="child"
                  className="rounded-xl px-4 py-2.5 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                >
                  <Baby className="size-4 mr-2" />
                  {t("tabChild")}
                </TabsTrigger>
                <TabsTrigger
                  value="tb"
                  className="rounded-xl px-4 py-2.5 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                >
                  <Stethoscope className="size-4 mr-2" />
                  {t("tabTb")}
                </TabsTrigger>
                <TabsTrigger
                  value="incentive"
                  className="rounded-xl px-4 py-2.5 font-black text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                >
                  <IndianRupee className="size-4 mr-2" />
                  {t("tabIncentive")}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* MCH & Pregnancy Tab */}
            <TabsContent value="anc">
              <Card className="rounded-3xl border-2 border-border p-6 sm:p-8 shadow-[0_4px_0_0_var(--color-border)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 text-xs font-bold">
                      {t("naegeleRule")}
                    </Badge>
                    <h3 className="text-2xl font-black text-foreground">{t("mchTitle")}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{t("mchDesc")}</p>
                    <ul className="space-y-2 text-sm font-bold text-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("mchCheck1")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("mchCheck2")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("mchCheck3")}</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/entry/pregnancy"
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95 transition-all"
                      >
                        <ClipboardPlus className="size-4" /> {t("registerPregBtn")}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        {t("sampleScreen")}
                      </span>
                      <Badge variant="destructive" className="text-xs font-bold">
                        {t("riskWarningTag")}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-extrabold text-base">{t("sampleMotherName")}</p>
                      <p className="text-muted-foreground text-xs">{t("sampleMotherAddress")}</p>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="rounded-xl border p-2 bg-card">
                          <span className="text-xs text-muted-foreground">{t("lmp")}</span>
                          <p className="font-bold text-sm">{t("sampleLmpDate")}</p>
                        </div>
                        <div className="rounded-xl border p-2 bg-card">
                          <span className="text-xs text-muted-foreground">{t("edd")}</span>
                          <p className="font-bold text-sm text-primary">{t("sampleEddDate")}</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-2.5 text-destructive text-xs font-bold flex items-center gap-2">
                        <AlertTriangle className="size-4 shrink-0" />
                        <span>{t("sampleBpWarning")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Child Immunization Tab */}
            <TabsContent value="child">
              <Card className="rounded-3xl border-2 border-border p-6 sm:p-8 shadow-[0_4px_0_0_var(--color-border)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 text-xs font-bold">
                      {t("uipTitle")}
                    </Badge>
                    <h3 className="text-2xl font-black text-foreground">{t("childFeatureTitle")}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{t("childFeatureDesc")}</p>
                    <ul className="space-y-2 text-sm font-bold text-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("childCheck1")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("childCheck2")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("childCheck3")}</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/entry/child"
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95 transition-all"
                      >
                        <Baby className="size-4" /> {t("registerChildBtn")}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        {t("vaccineDueListTitle")}
                      </span>
                      <Badge variant="secondary" className="text-xs font-bold">
                        {t("threeVaccinesUpcoming")}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 flex justify-between items-center">
                        <div>
                          <p className="font-extrabold">{t("sampleChildName1")}</p>
                          <p className="text-xs text-muted-foreground">{t("sampleVaccine1")}</p>
                        </div>
                        <Badge variant="destructive" className="text-xs font-bold">
                          {t("sampleOverdueTag")}
                        </Badge>
                      </div>
                      <div className="rounded-xl border border-border bg-card p-3 flex justify-between items-center">
                        <div>
                          <p className="font-extrabold">{t("sampleChildName2")}</p>
                          <p className="text-xs text-muted-foreground">{t("sampleVaccine2")}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold border-0">
                          {t("sampleDueTodayTag")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* TB & Survey Tab */}
            <TabsContent value="tb">
              <Card className="rounded-3xl border-2 border-border p-6 sm:p-8 shadow-[0_4px_0_0_var(--color-border)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 text-xs font-bold">
                      {t("dotsTitle")}
                    </Badge>
                    <h3 className="text-2xl font-black text-foreground">{t("tbFeatureTitle")}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{t("tbFeatureDesc")}</p>
                    <ul className="space-y-2 text-sm font-bold text-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("tbCheck1")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("tbCheck2")}</span>
                      </li>
                    </ul>
                    <div className="flex gap-2 pt-2">
                      <Link
                        to="/entry/tb"
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95 transition-all"
                      >
                        <Stethoscope className="size-4" /> {t("tbBtn")}
                      </Link>
                      <Link
                        to="/entry/survey"
                        className="inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary transition-all"
                      >
                        {t("surveyBtn")}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                    <div className="rounded-xl border bg-card p-3">
                      <p className="font-extrabold text-sm">{t("sampleSurveyTitle")}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t("sampleHousesVisited")}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-secondary">
                          <p className="font-bold text-sm">{t("sampleFeverCases")}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary">
                          <p className="font-bold text-sm text-accent">{t("sampleLarvae")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Incentive Tracker Tab */}
            <TabsContent value="incentive">
              <Card className="rounded-3xl border-2 border-border p-6 sm:p-8 shadow-[0_4px_0_0_var(--color-border)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 text-xs font-bold">
                      {t("tabIncentive")} (₹)
                    </Badge>
                    <h3 className="text-2xl font-black text-foreground">{t("incentiveFeatureTitle")}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">{t("incentiveFeatureDesc")}</p>
                    <ul className="space-y-2 text-sm font-bold text-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("incentiveCheck1")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("incentiveCheck2")}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        <span>{t("incentiveCheck3")}</span>
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/incentive"
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-primary-foreground shadow-xs hover:bg-primary/95 transition-all"
                      >
                        <IndianRupee className="size-4" /> {t("tabIncentive")}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-border bg-background p-5 space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-xs font-bold text-muted-foreground">
                        {t("sampleIncentiveStatus")}
                      </span>
                      <Badge variant="outline" className="text-xs font-bold text-accent border-accent/30">
                        {t("sampleCurrentMonth")}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <span className="text-xs text-muted-foreground">{t("todayExpected")}</span>
                        <p className="text-2xl font-black text-primary">{t("sampleExpectedAmount")}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
                        <span className="text-xs text-muted-foreground">{t("receivedIncentive")}</span>
                        <p className="text-2xl font-black text-accent">{t("sampleReceivedAmount")}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border bg-card p-2.5 text-xs font-bold flex justify-between items-center text-muted-foreground">
                      <span>{t("pendingIncentive")}:</span>
                      <span className="text-sm font-black text-destructive">{t("samplePendingAmount")}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 6. ASHA Worker Daily Workflow ("How it works") */}
      <section id="workflow" className="py-14 sm:py-20 bg-secondary/50 border-y-2 border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2">
              {t("dailyWorkflow")}
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-2">
              {t("workflowSub")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="rounded-3xl border-2 border-border bg-card p-6 shadow-xs">
              <span className="text-3xl font-black text-primary/40 block mb-3">01</span>
              <h4 className="text-lg font-black text-foreground mb-1">{t("step1Title")}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {t("step1Desc")}
              </p>
            </Card>

            <Card className="rounded-3xl border-2 border-border bg-card p-6 shadow-xs">
              <span className="text-3xl font-black text-primary/40 block mb-3">02</span>
              <h4 className="text-lg font-black text-foreground mb-1">{t("step2Title")}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {t("step2Desc")}
              </p>
            </Card>

            <Card className="rounded-3xl border-2 border-border bg-card p-6 shadow-xs">
              <span className="text-3xl font-black text-primary/40 block mb-3">03</span>
              <h4 className="text-lg font-black text-foreground mb-1">{t("step3Title")}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {t("step3Desc")}
              </p>
            </Card>

            <Card className="rounded-3xl border-2 border-border bg-card p-6 shadow-xs">
              <span className="text-3xl font-black text-primary/40 block mb-3">04</span>
              <h4 className="text-lg font-black text-foreground mb-1">{t("step4Title")}</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {t("step4Desc")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Field Worker Testimonials / Real Voices */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2">
              {t("whyTrustUs")}
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mt-2">
              {t("whyTrustUs")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-3xl border-2 border-border bg-card p-6 space-y-4 shadow-xs">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                {t("test1Quote")}
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary font-bold">
                  <UserCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">{t("test1Author")}</p>
                  <p className="text-xs text-muted-foreground">{t("test1Role")}</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-2 border-border bg-card p-6 space-y-4 shadow-xs">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                {t("test2Quote")}
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent font-bold">
                  <UserCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">{t("test2Author")}</p>
                  <p className="text-xs text-muted-foreground">{t("test2Role")}</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border-2 border-border bg-card p-6 space-y-4 shadow-xs">
              <Quote className="size-8 text-primary/40" />
              <p className="text-sm sm:text-base font-semibold text-foreground italic leading-relaxed">
                {t("test3Quote")}
              </p>
              <div className="pt-2 border-t border-border flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary font-bold">
                  <ClipboardCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-foreground">{t("test3Author")}</p>
                  <p className="text-xs text-muted-foreground">{t("test3Role")}</p>
                </div>
              </div>
            </Card>
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
                {t("pwaSub")}
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <Card className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-primary uppercase">{t("pwaStep1Label")}</span>
                <p className="font-extrabold text-sm mt-1">{t("pwaStep1Title")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("pwaStep1Desc")}</p>
              </Card>

              <Card className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-primary uppercase">{t("pwaStep2Label")}</span>
                <p className="font-extrabold text-sm mt-1">{t("pwaStep2Title")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("pwaStep2Desc")}</p>
              </Card>

              <Card className="rounded-2xl border border-border bg-card p-4">
                <span className="text-xs font-black text-accent uppercase">{t("pwaStep3Label")}</span>
                <p className="font-extrabold text-sm mt-1">{t("pwaStep3Title")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("pwaStep3Desc")}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Section using Shadcn Accordion */}
      <section id="faq" className="py-14 sm:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-2">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2">
              {t("faqSectionTitle")}
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1" className="rounded-2xl border-2 border-border bg-card px-4">
              <AccordionTrigger className="font-extrabold text-base text-foreground hover:no-underline py-4">
                {t("faqQ1")}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                {t("faqA1")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="rounded-2xl border-2 border-border bg-card px-4">
              <AccordionTrigger className="font-extrabold text-base text-foreground hover:no-underline py-4">
                {t("faqQ2")}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                {t("faqA2")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="rounded-2xl border-2 border-border bg-card px-4">
              <AccordionTrigger className="font-extrabold text-base text-foreground hover:no-underline py-4">
                {t("faqQ3")}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                {t("faqA3")}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="rounded-2xl border-2 border-border bg-card px-4">
              <AccordionTrigger className="font-extrabold text-base text-foreground hover:no-underline py-4">
                {t("faqQ4")}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
                {t("faqA4")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="bg-primary text-primary-foreground py-12 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            {t("ctaTitle")}
          </h3>
          <p className="text-primary-foreground/90 text-base font-medium max-w-xl mx-auto">
            {t("ctaSub")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
            <Link
              to="/dashboard"
              className="rounded-3xl bg-card text-foreground px-6 py-3.5 text-base font-black shadow-md hover:bg-card/90 transition-all active:translate-y-0.5"
            >
              <CalendarCheck className="size-5 inline mr-2 text-primary" />
              {t("ctaOpenDiary")}
            </Link>
            <Link
              to="/signup"
              className="rounded-3xl border-2 border-primary-foreground/40 bg-primary px-6 py-3.5 text-base font-black text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Sparkles className="size-5 inline mr-2" />
              {t("ctaCreateAccount")}
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t-2 border-border bg-card py-10 px-4 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
              <Stethoscope className="size-5" />
            </span>
            <div>
              <p className="font-extrabold text-foreground text-base">{t("appName")}</p>
              <p className="text-xs">
                {t("footerSubtitle")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-bold">
            <Link to="/dashboard" className="hover:text-foreground">
              {t("navDiary")}
            </Link>
            <Link to="/entry" className="hover:text-foreground">
              {t("navEntry")}
            </Link>
            <Link to="/info" className="hover:text-foreground">
              {t("navInfo")}
            </Link>
            <Link to="/incentive" className="hover:text-foreground">
              {t("tabIncentive")}
            </Link>
            <Link to="/login" className="hover:text-foreground">
              {t("loginBtn")}
            </Link>
            <Link to="/signup" className="hover:text-foreground">
              {t("signupBtn")}
            </Link>
          </div>

          <p className="text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} {t("footerCopyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
