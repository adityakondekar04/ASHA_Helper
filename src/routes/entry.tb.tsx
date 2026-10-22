import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BigToggle, Card, Field, SaveBar, Select, TextInput } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";
import { newId, saveRecord, useAutoSaveForm, type DoseEntry, type TbRecord } from "@/lib/store";

export const Route = createFileRoute("/entry/tb")({
  head: () => ({
    meta: [
      { title: "क्षयरोग नोंद — TB patient DOTS tracking" },
      {
        name: "description",
        content:
          "Register a TB patient with treatment start date, tick off DOTS doses month by month and note follow-up visit dates. Auto-saves offline on your phone.",
      },
      { property: "og:title", content: "क्षयरोग नोंद — TB patient record" },
      {
        property: "og:description",
        content: "DOTS dose checklist and follow-up dates that work without internet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TbForm,
});

type Form = Omit<TbRecord, "id" | "kind" | "updatedAt">;

const DEFAULT_DOSES: DoseEntry[] = Array.from({ length: 6 }, (_, i) => ({
  label: `M${i + 1}`,
  date: "",
  taken: false,
}));

const INITIAL: Form = {
  name: "",
  age: "",
  address: "",
  phone: "",
  startDate: "",
  regimen: "",
  doses: DEFAULT_DOSES,
  followUps: [""],
};

function TbForm() {
  const { t } = useT();
  const navigate = useNavigate();
  const { value, update, setValue, clearDraft, savedAt } = useAutoSaveForm<Form>(
    "asha.draft.tb",
    INITIAL,
  );

  const setDose = (i: number, patch: Partial<DoseEntry>) =>
    setValue((v) => ({
      ...v,
      doses: v.doses.map((d, idx) => (idx === i ? { ...d, ...patch } : d)),
    }));

  const submit = () => {
    if (!value.name.trim()) {
      alert(t("required"));
      return;
    }
    saveRecord({ ...value, id: newId(), kind: "tb", updatedAt: Date.now() });
    clearDraft();
    setValue(INITIAL);
    navigate({ to: "/" });
  };

  return (
    <AppShell title={t("tbPatient")} backTo="/entry">
      <div className="space-y-4">
        <Card className="space-y-4">
          <Field label={t("name")}>
            <TextInput value={value.name} onChange={(e) => update({ name: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("age")}>
              <TextInput
                inputMode="numeric"
                value={value.age}
                onChange={(e) => update({ age: e.target.value })}
              />
            </Field>
            <Field label={t("phone")}>
              <TextInput
                inputMode="tel"
                value={value.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
            </Field>
          </div>
          <Field label={t("address")}>
            <TextInput
              value={value.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("tbStart")}>
              <TextInput
                type="date"
                value={value.startDate}
                onChange={(e) => update({ startDate: e.target.value })}
              />
            </Field>
            <Field label={t("tbRegimen")}>
              <Select
                value={value.regimen}
                onChange={(e) => update({ regimen: e.target.value })}
              >
                <option value="">{t("select")}</option>
                <option value="new">नवीन रुग्ण / New</option>
                <option value="retreat">पुन्हा उपचार / Re-treatment</option>
                <option value="dr">औषध प्रतिरोधक / Drug-resistant</option>
              </Select>
            </Field>
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-base font-semibold">{t("tbDoses")}</h2>
          {value.doses.map((d, i) => (
            <div key={d.label} className="space-y-3 rounded-xl border border-border p-3">
              <BigToggle
                checked={d.taken}
                onChange={(v) =>
                  setDose(i, {
                    taken: v,
                    date: v && !d.date ? new Date().toISOString().slice(0, 10) : d.date,
                  })
                }
                label={`${t("month")} ${i + 1} — ${t("taken")}`}
              />
              {d.taken && (
                <TextInput
                  type="date"
                  value={d.date}
                  onChange={(e) => setDose(i, { date: e.target.value })}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setValue((v) => ({
                ...v,
                doses: [...v.doses, { label: `M${v.doses.length + 1}`, date: "", taken: false }],
              }))
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground"
          >
            <Plus className="size-5" /> {t("addRow")}
          </button>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-base font-semibold">{t("tbFollowUps")}</h2>
          {value.followUps.map((f, i) => (
            <TextInput
              key={i}
              type="date"
              value={f}
              onChange={(e) =>
                setValue((v) => ({
                  ...v,
                  followUps: v.followUps.map((x, idx) => (idx === i ? e.target.value : x)),
                }))
              }
            />
          ))}
          <button
            type="button"
            onClick={() => setValue((v) => ({ ...v, followUps: [...v.followUps, ""] }))}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground"
          >
            <Plus className="size-5" /> {t("addRow")}
          </button>
        </Card>

        <SaveBar savedAt={savedAt} onSave={submit} />
      </div>
    </AppShell>
  );
}
