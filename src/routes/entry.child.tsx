import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, Field, SaveBar, Select, TextInput } from "@/components/ui/form-kit";
import { useT, VACCINES } from "@/lib/i18n";
import {
  newId,
  saveRecord,
  useAutoSaveForm,
  type ChildRecord,
  type GrowthEntry,
} from "@/lib/store";

export const Route = createFileRoute("/entry/child")({
  head: () => ({
    meta: [
      { title: "बालक नोंद — Child registration and immunization" },
      {
        name: "description",
        content:
          "Register a child with birth details, tick off the immunization schedule with dates, and track weight, height and MUAC at each visit.",
      },
      { property: "og:title", content: "बालक नोंद — Child record" },
      {
        property: "og:description",
        content: "Immunization checklist and growth monitoring that works offline.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChildForm,
});

const EMPTY_GROWTH: GrowthEntry = { date: "", weight: "", height: "", muac: "" };

type Form = Omit<ChildRecord, "id" | "kind" | "updatedAt">;

const INITIAL: Form = {
  name: "",
  motherName: "",
  dob: "",
  gender: "",
  birthWeight: "",
  address: "",
  phone: "",
  vaccines: {},
  growth: [{ ...EMPTY_GROWTH }],
};

function ChildForm() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { value, update, setValue, clearDraft, savedAt } = useAutoSaveForm<Form>(
    "asha.draft.child",
    INITIAL,
  );

  const langIndex = lang === "mr" ? 0 : lang === "hi" ? 1 : 2;

  const setGrowth = (i: number, patch: Partial<GrowthEntry>) =>
    setValue((v) => ({
      ...v,
      growth: v.growth.map((g, idx) => (idx === i ? { ...g, ...patch } : g)),
    }));

  const submit = () => {
    if (!value.name.trim()) {
      alert(t("required"));
      return;
    }
    const record: ChildRecord = { ...value, id: newId(), kind: "child", updatedAt: Date.now() };
    saveRecord(record);
    clearDraft();
    setValue(INITIAL);
    navigate({ to: "/" });
  };

  return (
    <AppShell title={t("child")} backTo="/entry">
      <div className="space-y-4">
        <Card className="space-y-4">
          <Field label={t("name")}>
            <TextInput value={value.name} onChange={(e) => update({ name: e.target.value })} />
          </Field>
          <Field label={t("motherName")}>
            <TextInput
              value={value.motherName}
              onChange={(e) => update({ motherName: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("dob")}>
              <TextInput
                type="date"
                value={value.dob}
                onChange={(e) => update({ dob: e.target.value })}
              />
            </Field>
            <Field label={t("gender")}>
              <Select
                value={value.gender}
                onChange={(e) => update({ gender: e.target.value as Form["gender"] })}
              >
                <option value="">{t("select")}</option>
                <option value="boy">{t("boy")}</option>
                <option value="girl">{t("girl")}</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("birthWeight")}>
              <TextInput
                inputMode="decimal"
                value={value.birthWeight}
                onChange={(e) => update({ birthWeight: e.target.value })}
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

        <Card className="space-y-3">
          <h2 className="text-base font-semibold">{t("immunization")}</h2>
          {VACCINES.map((v) => {
            const dateGiven = value.vaccines[v.code] ?? "";
            return (
              <div key={v.code} className="rounded-xl border border-border p-3">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <span className="min-w-0 truncate text-lg font-bold">{v.label[langIndex]}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setValue((prev) => ({
                        ...prev,
                        vaccines: {
                          ...prev.vaccines,
                          [v.code]: dateGiven ? "" : new Date().toISOString().slice(0, 10),
                        },
                      }))
                    }
                    className={`shrink-0 rounded-full px-4 py-2 text-base font-bold ${
                      dateGiven
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {dateGiven ? `✓ ${t("given")}` : t("given")}
                  </button>
                </div>
                {dateGiven && (
                  <div className="mt-3">
                    <TextInput
                      type="date"
                      value={dateGiven}
                      onChange={(e) =>
                        setValue((prev) => ({
                          ...prev,
                          vaccines: { ...prev.vaccines, [v.code]: e.target.value },
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Card>

        <Card className="space-y-4">
          <h2 className="text-base font-semibold">{t("growth")}</h2>
          {value.growth.map((g, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border p-3">
              <Field label={t("date")}>
                <TextInput
                  type="date"
                  value={g.date}
                  onChange={(e) => setGrowth(i, { date: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label={t("weight")}>
                  <TextInput
                    inputMode="decimal"
                    value={g.weight}
                    onChange={(e) => setGrowth(i, { weight: e.target.value })}
                  />
                </Field>
                <Field label={t("height")}>
                  <TextInput
                    inputMode="decimal"
                    value={g.height}
                    onChange={(e) => setGrowth(i, { height: e.target.value })}
                  />
                </Field>
                <Field label={t("muac")}>
                  <TextInput
                    inputMode="decimal"
                    value={g.muac}
                    onChange={(e) => setGrowth(i, { muac: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setValue((v) => ({ ...v, growth: [...v.growth, { ...EMPTY_GROWTH }] }))}
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
