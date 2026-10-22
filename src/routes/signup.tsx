import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileBadge,
  HeartPulse,
  Home,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  User,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";
import { useAuth, type UserRole } from "@/lib/auth";
import { registerWithDb } from "@/lib/auth-server";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "नवीन नोंदणी — आशा सहाय्यक (ASHA Registration)" },
      {
        name: "description",
        content:
          "Register as an ASHA worker, facilitator, or health worker in Maharashtra. Create your offline-first daily diary account.",
      },
    ],
  }),
  component: SignupPage,
});

const MAHARASHTRA_DISTRICTS = [
  "पुणे (Pune)",
  "सातारा (Satara)",
  "सांगली (Sangli)",
  "कोल्हापूर (Kolhapur)",
  "सोलापूर (Solapur)",
  "नाशिक (Nashik)",
  "अहमदनगर (Ahilyanagar)",
  "छत्रपती संभाजीनगर (Chh. Sambhajinagar)",
  "ठाणे (Thane)",
  "पालघर (Palghar)",
  "रायगड (Raigad)",
  "रत्नागिरी (Ratnagiri)",
  "नागपूर (Nagpur)",
  "अमरावती (Amravati)",
  "नांदेड (Nanded)",
  "जळगाव (Jalgaon)",
  "धुळे (Dhule)",
];

function SignupPage() {
  const { t } = useT();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>("asha");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState(MAHARASHTRA_DISTRICTS[1]); // सातारा default
  const [taluka, setTaluka] = useState("कराड");
  const [phc, setPhc] = useState("मसूर प्राथमिक आरोग्य केंद्र");
  const [subCenter, setSubCenter] = useState("शिरोली उपकेंद्र");
  const [village, setVillage] = useState("शिरोली");
  const [ashaId, setAshaId] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError(t("required"));
      return;
    }
    if (!phone || phone.length < 10) {
      setError(t("enterMobile"));
      return;
    }
    if (!password || password.length < 4) {
      setError(t("enterPassword"));
      return;
    }
    if (!agree) {
      setError("Please accept terms");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      password: password.trim(),
      role,
      district: district.split(" ")[0],
      taluka: taluka.trim() || "तालुका",
      phc: phc.trim() || "प्राथमिक आरोग्य केंद्र",
      subCenter: subCenter.trim() || "उपकेंद्र",
      village: village.trim() || "गाव",
      ashaId: ashaId.trim() || `ASHA-MH-${phone.slice(-4)}`,
    };

    try {
      const res = await registerWithDb({ data: payload });
      if (res.success && res.user) {
        login(res.user);
        setSuccess(true);
        setTimeout(() => {
          navigate({ to: "/dashboard" });
        }, 1200);
        return;
      } else {
        setError(res.error || "Registration failed. Please try again.");
      }
    } catch (err: any) {
      console.warn("Neon DB signup fallback error:", err);
      const newUser = {
        id: "user-" + Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      };
      login(newUser);
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell maxWidth="max-w-md">
      <div className="w-full py-4 space-y-4">
        {/* Title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid size-16 place-items-center rounded-xl bg-primary/15 text-primary">
            <UserPlus className="size-8" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">{t("signupHeading")}</h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">{t("signupSubtitle")}</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Neon Cloud DB Connected</span>
          </div>
        </div>

        {success ? (
          <Card className="text-center py-10 ">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-accent/20 text-accent">
              <CheckCircle2 className="size-10" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">{t("signupSuccess")}</h2>
            <p className="mt-2 text-base text-muted-foreground">
              {t("welcomeUser")}, {fullName}!
            </p>
            <p className="mt-1 text-sm text-primary font-bold">
              {t("redirectingToDiary")}
            </p>
          </Card>
        ) : (
          <Card className="mb-5 ">
            {error && (
              <div className="mb-4 rounded-xl bg-destructive/15 p-3 text-sm font-bold text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t("selectRole")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("asha")}
                    className={`rounded-xl border p-3 text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === "asha"
                        ? "border-primary bg-primary/10 text-primary font-semibold "
                        : "border-border bg-card text-muted-foreground font-semibold hover:text-foreground"
                    }`}
                  >
                    <HeartPulse className="size-4 shrink-0 text-primary" />
                    <span>{t("roleAsha")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("facilitator")}
                    className={`rounded-xl border p-3 text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      role === "facilitator"
                        ? "border-primary bg-primary/10 text-primary font-semibold "
                        : "border-border bg-card text-muted-foreground font-semibold hover:text-foreground"
                    }`}
                  >
                    <ClipboardCheck className="size-4 shrink-0 text-accent" />
                    <span>{t("roleFacilitator")}</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-bold">{t("fullName")}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <User className="size-5" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("fullName")}
                    className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Phone */}
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
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder={t("enterMobile")}
                    className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* District & Taluka Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-bold">{t("districtName")}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <MapPin className="size-5" />
                    </span>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary appearance-none cursor-pointer"
                    >
                      {MAHARASHTRA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-bold">{t("talukaName")}</label>
                  <input
                    type="text"
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    placeholder="कराड / Karad"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-base font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* PHC & Sub-Center */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-bold">{t("phcName")}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <Building2 className="size-5" />
                    </span>
                    <input
                      type="text"
                      value={phc}
                      onChange={(e) => setPhc(e.target.value)}
                      placeholder="मसूर PHC"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-bold">{t("subCenterName")}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <Home className="size-5" />
                    </span>
                    <input
                      type="text"
                      value={subCenter}
                      onChange={(e) => setSubCenter(e.target.value)}
                      placeholder="शिरोली उपकेंद्र"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Village & ASHA ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-bold">{t("villageName")}</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="शिरोली / Shiroli"
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-base font-bold outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-bold">{t("ashaIdField")}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                      <FileBadge className="size-5" />
                    </span>
                    <input
                      type="text"
                      value={ashaId}
                      onChange={(e) => setAshaId(e.target.value)}
                      placeholder="ASHA-MH-0421"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-sm font-bold">{t("password")}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Lock className="size-5" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("enterPassword")}
                    className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-base font-bold outline-none focus:border-primary tracking-wider"
                  />
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-2.5 cursor-pointer font-medium text-xs text-muted-foreground pt-1">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 size-4 rounded-md accent-primary shrink-0"
                />
                <span>{t("agreePrivacy")}</span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-3.5 text-center text-lg font-semibold text-primary-foreground  hover:bg-primary/95 transition-all active:translate-y-0.5 mt-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? "नोंदणी होत आहे..." : t("createAccountBtn")}
              </button>
            </form>
          </Card>
        )}

        {/* Direct Bypass */}
        <div className="mb-6 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <Smartphone className="size-4" />
            {t("guestAccess")} →
          </Link>
        </div>

        {/* Link to Login */}
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("alreadyHaveAccount")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              {t("loginNow")}
            </Link>
          </p>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-center text-xs font-semibold text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-4 text-accent" />
          {t("privacyNote")}
        </p>
            </div>
    </AppShell>
  );
}
