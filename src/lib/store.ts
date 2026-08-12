// Local-only record store. Everything lives in this browser (localStorage).
// No network, no accounts, no location data — by design.
import { useCallback, useEffect, useState } from "react";
import { VACCINES } from "./i18n";

export interface AncVisitEntry {
  date: string;
  bp: string;
  weight: string;
  hb: string;
}

export interface PregnancyRecord {
  id: string;
  kind: "pregnancy";
  name: string;
  age: string;
  address: string;
  phone: string;
  lmp: string;
  edd: string;
  highRisk: boolean;
  ancVisits: AncVisitEntry[];
  deliveryDate: string;
  deliveryPlace: string;
  outcome: string;
  updatedAt: number;
}

export interface GrowthEntry {
  date: string;
  weight: string;
  height: string;
  muac: string;
}

export interface ChildRecord {
  id: string;
  kind: "child";
  name: string;
  motherName: string;
  dob: string;
  gender: "" | "boy" | "girl";
  birthWeight: string;
  address: string;
  phone: string;
  vaccines: Record<string, string>; // vaccine code -> date given ("" = not given)
  growth: GrowthEntry[];
  updatedAt: number;
}

export interface DoseEntry {
  label: string;
  date: string;
  taken: boolean;
}

export interface TbRecord {
  id: string;
  kind: "tb";
  name: string;
  age: string;
  address: string;
  phone: string;
  startDate: string;
  regimen: string;
  doses: DoseEntry[];
  followUps: string[];
  updatedAt: number;
}

export interface SurveyRecord {
  id: string;
  kind: "survey";
  date: string;
  address: string;
  houseCount: string;
  feverCases: string;
  feverChecks: Record<string, boolean>;
  larvalSurvey: "" | "yes" | "no";
  larvalFound: "" | "yes" | "no";
  bloodSample: "" | "yes" | "no";
  notes: string;
  updatedAt: number;
}

export type Record_ = PregnancyRecord | ChildRecord | TbRecord | SurveyRecord;

const KEY = "asha.records.v1";

export function loadRecords(): Record_[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record_[]) : [];
  } catch {
    return [];
  }
}

function persist(records: Record_[]) {
  localStorage.setItem(KEY, JSON.stringify(records));
  window.dispatchEvent(new Event("asha:records"));
}

export function saveRecord(record: Record_) {
  const all = loadRecords();
  const idx = all.findIndex((r) => r.id === record.id);
  const next = { ...record, updatedAt: Date.now() };
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  persist(all);
}

export function getRecord(id: string): Record_ | undefined {
  return loadRecords().find((r) => r.id === id);
}

export function newId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

/** Reactive list of all locally stored records. */
export function useRecords() {
  const [records, setRecords] = useState<Record_[]>([]);
  useEffect(() => {
    const sync = () => setRecords(loadRecords());
    sync();
    window.addEventListener("asha:records", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("asha:records", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return records;
}

/**
 * Auto-saving form state. Every keystroke is written to localStorage under a
 * draft key, so nothing is ever lost — even if the phone dies mid-form.
 */
export function useAutoSaveForm<T extends object>(draftKey: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) setValue({ ...initial, ...(JSON.parse(raw) as T) });
    } catch {
      /* ignore corrupt draft */
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(draftKey, JSON.stringify(value));
    setSavedAt(Date.now());
  }, [value, draftKey, loaded]);

  const update = useCallback((patch: Partial<T>) => {
    setValue((v) => ({ ...v, ...patch }));
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(draftKey);
  }, [draftKey]);

  return { value, setValue, update, clearDraft, savedAt, loaded };
}

/** Naegele's rule: EDD = LMP + 7 days + 9 months. */
export function calcEDD(lmp: string): string {
  if (!lmp) return "";
  const d = new Date(lmp);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + 7);
  d.setMonth(d.getMonth() + 9);
  return d.toISOString().slice(0, 10);
}

function addWeeks(iso: string, weeks: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString().slice(0, 10);
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return Number.POSITIVE_INFINITY;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86400000);
}

export interface DueItem {
  id: string;
  recordId: string;
  type: "anc" | "immunization";
  personName: string;
  label: string;
  vaccineCode?: string;
  date: string;
  days: number;
  highRisk?: boolean;
}

/** ANC target weeks back from EDD, matching the 4 mandated visits. */
const ANC_BACK_WEEKS = [28, 16, 8, 4];

export function buildDueList(records: Record_[]): DueItem[] {
  const items: DueItem[] = [];

  for (const r of records) {
    if (r.kind === "pregnancy") {
      if (!r.edd || r.deliveryDate) continue;
      const done = r.ancVisits.filter((v) => v.date).length;
      ANC_BACK_WEEKS.forEach((back, i) => {
        if (i < done) return;
        const target = addWeeks(r.edd, -back);
        const days = daysUntil(target);
        if (days > 30) return;
        items.push({
          id: `${r.id}-anc${i + 1}`,
          recordId: r.id,
          type: "anc",
          personName: r.name,
          label: `ANC ${i + 1}`,
          date: target,
          days,
          highRisk: r.highRisk,
        });
      });
    } else if (r.kind === "child") {
      if (!r.dob) continue;
      for (const v of VACCINES) {
        if (r.vaccines[v.code]) continue;
        const target = addWeeks(r.dob, v.weeks);
        const days = daysUntil(target);
        if (days > 30) continue;
        items.push({
          id: `${r.id}-${v.code}`,
          recordId: r.id,
          type: "immunization",
          personName: r.name,
          label: v.code,
          vaccineCode: v.code,
          date: target,
          days,
        });
      }
    }
  }

  return items.sort((a, b) => a.days - b.days);
}

export function entriesThisMonth(records: Record_[]) {
  const now = new Date();
  return records.filter((r) => {
    const d = new Date(r.updatedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}
