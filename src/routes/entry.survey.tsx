import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BigToggle, Card, Field, SaveBar, Select, TextInput } from "@/components/ui/form-kit";
import { pick, useT, type Tri } from "@/lib/i18n";
import { newId, saveRecord, useAutoSaveForm, type SurveyRecord } from "@/lib/store";

export const Route = createFileRoute("/entry/survey")({
  head: () => ({
    meta: [
      { title: "हिवताप / डेंग्यू सर्वेक्षण — Fever and larval survey entry" },
      {
        name: "description",
        content:
          "Record a household malaria and dengue survey: fever checklist, larval survey result, blood sample collection and notes. Saves offline on your phone.",
      },
      { property: "og:title", content: "हिवताप / डेंग्यू सर्वेक्षण — Survey entry" },
      {
        property: "og:description",
        content: "Simple household fever and larval survey form that works offline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SurveyForm,
});

type Form = Omit<SurveyRecord, "id" | "kind" | "updatedAt">;

const FEVER_CHECKS: Array<{ code: string; label: Tri }> = [
  { code: "fever", label: ["सध्या ताप आहे", "अभी बुख़ार है", "Fever right now"] },
  { code: "chills", label: ["थंडी वाजून ताप", "ठंड लगकर बुख़ार", "Fever with chills"] },
  { code: "rash", label: ["अंगावर पुरळ", "शरीर पर चकत्ते", "Rash on the body"] },
  { code: "bodyache", label: ["तीव्र अंगदुखी", "तेज़ बदन दर्द", "Severe body ache"] },
  { code: "bleeding", label: ["रक्तस्राव लक्षण", "रक्तस्राव लक्षण", "Bleeding signs"] },
  { code: "referred", label: ["केंद्रात पाठवले", "केंद्र भेजा", "Referred to centre"] },
];

const INITIAL: Form = {
  date: "",
  address: "",
  houseCount: "",
  feverCases: "",
  feverChecks: {},
  larvalSurvey: "",
  larvalFound: "",
  bloodSample: "",
  notes: "",
};

function SurveyForm() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { value, update, setValue, clearDraft, savedAt } = useAutoSaveForm<Form>(
    "asha.draft.survey",
    INITIAL,
  );

  const submit = () => {
    if (!value.address.trim()) {
      alert(t("required"));
      return;
    }
    saveRecord({
      ...value,
      date: value.date || new Date().toISOString().slice(0, 10),
      id: newId(),
      kind: "survey",
      updatedAt: Date.now(),
    });
    clearDraft();
    setValue(INITIAL);
    navigate({ to: "/" });
  };

  const YesNo = ({ label, field }: { label: string; field: "larvalSurvey" | "larvalFound" | "bloodSample" }) => (
    <Field label={label}>
      <Select
        value={value[field]}
        onChange={(e) => update({ [field]: e.target.value } as Partial<Form>)}
      >
        <option value="">{t("select")}</option>
        <option value="yes">{t("yes")}</option>
        <option value="no">{t("no")}</option>
      </Select>
    </Field>
  );

  return (
    <AppShell title={t("survey")} backTo="/entry">
      <div className="space-y-4">
        <Card className="space-y-4">
          <Field label={t("date")}>
            <TextInput
              type="date"
              value={value.date}
              onChange={(e) => update({ date: e.target.value })}
            />
          </Field>
          <Field label={t("address")}>
            <TextInput
              value={value.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("houseCount")}>
              <TextInput
                inputMode="numeric"
                value={value.houseCount}
                onChange={(e) => update({ houseCount: e.target.value })}
              />
            </Field>
            <Field label={t("feverCases")}>
              <TextInput
                inputMode="numeric"
                value={value.feverCases}
                onChange={(e) => update({ feverCases: e.target.value })}
              />
            </Field>
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-base font-semibold">{t("feverChecklist")}</h2>
          {FEVER_CHECKS.map((c) => (
            <BigToggle
              key={c.code}
              checked={!!value.feverChecks[c.code]}
              onChange={(v) =>
                setValue((prev) => ({
                  ...prev,
                  feverChecks: { ...prev.feverChecks, [c.code]: v },
                }))
              }
              label={pick(lang, c.label)}
            />
          ))}
        </Card>

        <Card className="space-y-4">
          <YesNo label={t("larvalSurvey")} field="larvalSurvey" />
          <YesNo label={t("larvalFound")} field="larvalFound" />
          <YesNo label={t("bloodSample")} field="bloodSample" />
          <Field label={t("notesField")}>
            <TextInput value={value.notes} onChange={(e) => update({ notes: e.target.value })} />
          </Field>
        </Card>

        <SaveBar savedAt={savedAt} onSave={submit} />
      </div>
    </AppShell>
  );
}
