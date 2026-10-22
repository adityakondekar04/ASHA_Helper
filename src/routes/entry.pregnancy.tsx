import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BigToggle, Card, Field, SaveBar, Select, TextInput } from "@/components/ui/form-kit";
import { useT } from "@/lib/i18n";
import {
  calcEDD,
  newId,
  saveRecord,
  useAutoSaveForm,
  type AncVisitEntry,
  type PregnancyRecord,
} from "@/lib/store";

export const Route = createFileRoute("/entry/pregnancy")({
  head: () => ({
    meta: [
      { title: "गरोदर महिला नोंद — Pregnant woman registration" },
      {
        name: "description",
        content:
          "Register a pregnant woman with LMP, auto-calculated expected delivery date, ANC visits with BP, weight and haemoglobin, and a high-risk flag.",
      },
      { property: "og:title", content: "गरोदर महिला नोंद" },
      {
        property: "og:description",
        content: "Auto-saving ANC form with automatic expected delivery date.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PregnancyForm,
});

const EMPTY_VISIT: AncVisitEntry = { date: "", bp: "", weight: "", hb: "" };

type Form = Omit<PregnancyRecord, "id" | "kind" | "updatedAt">;

const INITIAL: Form = {
  name: "",
  age: "",
  address: "",
  phone: "",
  lmp: "",
  edd: "",
  highRisk: false,
  ancVisits: [ { ...EMPTY_VISIT } ],
  deliveryDate: "",
  deliveryPlace: "",
  outcome: "",
};

function PregnancyForm() {
  const { t } = useT();
  const navigate = useNavigate();
  const { value, update, setValue, clearDraft, savedAt } = useAutoSaveForm<Form>(
    "asha.draft.pregnancy",
    INITIAL,
  );

  const edd = value.edd || calcEDD(value.lmp);

  const setVisit = (i: number, patch: Partial<AncVisitEntry>) => {
    setValue((v) => ({
      ...v,
      ancVisits: v.ancVisits.map((x, idx) => (idx === i ? { ...x, ...patch } : x)),
    }));
  };

  const submit = () => {
    if (!value.name.trim()) {
      alert(t("required"));
      return;
    }
    const record: PregnancyRecord = {
      ...value,
      edd,
      id: newId(),
      kind: "pregnancy",
      updatedAt: Date.now(),
    };
    saveRecord(record);
    clearDraft();
    setValue(INITIAL);
    navigate({ to: "/" });
  };

  return (
    <AppShell title={t("pregWoman")} backTo="/entry">
      <div className="space-y-4">
        <Card className="space-y-4">
          <Field label={t("name")}>
            <TextInput
              value={value.name}
              onChange={(e) => update({ name: e.target.value })}
              placeholder="…"
            />
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
        </Card>

        <Card className="space-y-4">
          <Field label={t("lmp")}>
            <TextInput
              type="date"
              value={value.lmp}
              onChange={(e) => update({ lmp: e.target.value, edd: calcEDD(e.target.value) })}
            />
          </Field>
          <Field label={t("edd")} hint={t("autoCalc")}>
            <TextInput type="date" value={edd} onChange={(e) => update({ edd: e.target.value })} />
          </Field>
          <BigToggle
            checked={value.highRisk}
            onChange={(v) => update({ highRisk: v })}
            label={t("highRisk")}
            tone="danger"
          />
        </Card>

        <Card className="space-y-4">
          <h2 className="text-base font-semibold">{t("ancVisits")}</h2>
          {value.ancVisits.map((v, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border p-3">
              <p className="text-sm font-medium text-muted-foreground">
                {t("visit")} {i + 1}
              </p>
              <Field label={t("date")}>
                <TextInput
                  type="date"
                  value={v.date}
                  onChange={(e) => setVisit(i, { date: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label={t("bp")}>
                  <TextInput
                    value={v.bp}
                    placeholder="120/80"
                    onChange={(e) => setVisit(i, { bp: e.target.value })}
                  />
                </Field>
                <Field label={t("weight")}>
                  <TextInput
                    inputMode="decimal"
                    value={v.weight}
                    onChange={(e) => setVisit(i, { weight: e.target.value })}
                  />
                </Field>
                <Field label={t("hb")}>
                  <TextInput
                    inputMode="decimal"
                    value={v.hb}
                    onChange={(e) => setVisit(i, { hb: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          ))}
          {value.ancVisits.length < 4 && (
            <button
              type="button"
              onClick={() =>
                setValue((v) => ({ ...v, ancVisits: [...v.ancVisits, { ...EMPTY_VISIT }] }))
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground"
            >
              <Plus className="size-5" /> {t("addRow")}
            </button>
          )}
        </Card>

        <Card className="space-y-4">
          <h2 className="text-base font-semibold">{t("deliveryDetails")}</h2>
          <Field label={t("deliveryDate")}>
            <TextInput
              type="date"
              value={value.deliveryDate}
              onChange={(e) => update({ deliveryDate: e.target.value })}
            />
          </Field>
          <Field label={t("deliveryPlace")}>
            <Select
              value={value.deliveryPlace}
              onChange={(e) => update({ deliveryPlace: e.target.value })}
            >
              <option value="">{t("select")}</option>
              <option value="phc">PHC</option>
              <option value="chc">CHC</option>
              <option value="district">District hospital</option>
              <option value="private">Private hospital</option>
              <option value="home">Home</option>
            </Select>
          </Field>
          <Field label={t("outcome")}>
            <Select value={value.outcome} onChange={(e) => update({ outcome: e.target.value })}>
              <option value="">{t("select")}</option>
              <option value="normal">Normal delivery</option>
              <option value="caesarean">Caesarean</option>
              <option value="referred">Referred</option>
            </Select>
          </Field>
        </Card>

        <SaveBar savedAt={savedAt} onSave={submit} />
      </div>
    </AppShell>
  );
}
