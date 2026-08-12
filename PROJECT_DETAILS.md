# आशा सहाय्यक — ASHA Helper
## Product Overview & Feature Documentation

---

## 1. What is this app?

**आशा सहाय्यक (ASHA Helper)** is a personal, offline-first mobile web application designed for **Accredited Social Health Activists (ASHA workers)** in rural Maharashtra, India. It acts as a digital daily diary and fieldwork companion, helping frontline health workers record beneficiary data, track upcoming visits, and access reference information — all on their own phone, without internet connectivity.

> **Core promise:** *“Your daily fieldwork diary — no location tracking, no data leaving your phone, no internet required.”*

---

## 2. Target User Profile

| Attribute | Description |
|-----------|-------------|
| **Primary user** | ASHA worker in rural / semi-urban Maharashtra |
| **Language comfort** | Marathi-first, with Hindi and English fallback |
| **Digital literacy** | Basic smartphone usage; needs large buttons, simple flows, and minimal text per screen |
| **Device** | Basic Android smartphone, often with low memory and a small screen |
| **Connectivity** | Intermittent or absent 2G/3G/4G; app must work fully offline |
| **Environment** | Bright sunlight, outdoor field use; high contrast and large fonts are essential |
| **Trust context** | No surveillance; data belongs to the worker and stays on the device |

---

## 3. Core Design Principles

1. **Marathi-first** — default language is Marathi; one-tap switch to Hindi or English.
2. **Extreme simplicity** — one task per screen, large tap targets, minimal clutter, icon-supported navigation.
3. **Never lose data** — every form auto-saves on every keystroke; no session timeout clears drafts.
4. **Offline-first** — all data is stored locally in the browser; app works with zero connectivity.
5. **No surveillance** — no GPS, no location tracking, no activity monitoring.
6. **Personal helper, not a replacement** — does not replace official portals (RCH, Ni-Kshay, Poshan Tracker); it supplements the worker’s daily workflow.

---

## 4. Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | TanStack Start (React 19, file-based routing, Vite 7) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 (native CSS theme variables) |
| **State / Storage** | `localStorage` (browser-based, offline-first persistence) |
| **Fonts** | Noto Sans Devanagari + Baloo 2 (Devanagari-optimized, high legibility) |
| **PWA support** | Web app manifest (`manifest.json`) for home-screen installation |
| **Icons** | Lucide React |

> **Note:** The architecture intentionally avoids a backend or cloud database for core data storage. This removes dependency on internet connectivity, server uptime, and external authentication, while respecting the worker’s data privacy.

---

## 5. Site Structure & Features

### 5.1 Home Dashboard (`/`)

The landing screen is a purpose-built daily command center.

**Features:**
- **Today’s Tasks** prominently displayed at the top — auto-generated list of due:
  - ANC visits (pregnancy follow-ups)
  - Immunizations (child vaccines due in the next 30 days)
- Color-coded urgency badges:
  - 🔴 **Overdue** (past due date)
  - 🟢 **Today** (due today)
  - ⚪ **In N days** (upcoming)
- High-risk alert banner when any pregnant beneficiary is marked high-risk.
- **Quick stats cards** (2×2 grid):
  - Entries this month
  - Pending due-list count
  - Pregnant mothers registered
  - Children registered
- **Large icon-based navigation buttons** to:
  - Data Entry
  - Information Hub
  - My Beneficiaries (placeholder / coming soon)
  - Incentive Tracker (placeholder / coming soon)
- Privacy reassurance note at the bottom.

---

### 5.2 Information Hub (`/info/*`)

Read-only reference section with placeholder content that can be customized by the deploying organization.

| Route | Content |
|-------|---------|
| `/info/` | Hub index with large tiles for each section |
| `/info/scheme` | ASHA scheme overview — roles, duties, honorarium structure |
| `/info/programs` | Program guides: MCH (ANC/PNC/HBNC/HBYC), immunization schedule, TB/Ni-Kshay summary, malaria/dengue checklist, family planning |
| `/info/incentives` | Incentive rate card table — Activity, Amount (₹), Notes |
| `/info/faq` | Accordion-style FAQ with 5–6 common questions |

**UX patterns:**
- Collapsible sections (`Collapse` component) for easy scanning on small screens.
- Big tap targets and clear headings.
- All content is static/reference — nothing to fill in.

---

### 5.3 Data Entry (`/entry/*`)

One category per form — never a giant multi-section form. Each form follows the same simple pattern: auto-save on every keystroke, large inputs, dropdowns/checkboxes instead of free typing where possible, and a manual **Save** button to commit the draft.

| Route | Form | Key Fields |
|-------|------|------------|
| `/entry/` | Category selector | Pregnancy / Child / TB / Survey |
| `/entry/pregnancy` | Pregnant woman entry | Name, age, address, phone, LMP date, auto-calculated EDD, ANC visits (date/BP/weight/Hb), high-risk flag, delivery details |
| `/entry/child` | Child entry | Name, mother’s name, DOB, gender, birth weight, address, phone, immunization checklist with dates, growth monitoring (weight/height/MUAC) |
| `/entry/tb` | TB patient entry | Name, age, address, phone, treatment start date, regimen, DOTS dose checklist (week/month), follow-up visit dates |
| `/entry/survey` | Malaria/Dengue survey | Date, address, household count, fever cases, symptom checklist, larval survey yes/no, larvae found yes/no, blood sample collected yes/no, notes |

**Shared form behavior:**
- **Auto-save draft** — every keystroke persists to a draft key in `localStorage`; even if the phone dies or the browser closes, the draft is recovered on reopen.
- **Manual Save** — commits the draft to the master record store and clears the draft.
- **EDD auto-calculation** — entering LMP instantly calculates Expected Delivery Date using Naegele’s Rule (LMP + 7 days + 9 months).
- **Numeric keypad** — weight, BP, Hb, height, MUAC, fever cases use `inputmode="numeric"` / `type="number"` to trigger the phone’s native math pad.
- **Editable later** — any saved record can be reopened and edited.

---

### 5.4 My Beneficiaries (`/list` — planned / coming soon)

Planned module for:
- Searchable list of all registered beneficiaries.
- One-tap due-list tracker sorted by date.
- Full beneficiary history view + edit.
- Export/share a summary or the day’s due-list as plain text formatted for WhatsApp copy-paste.

> **Current status:** placeholder tile on the dashboard; not yet implemented.

---

### 5.5 Incentive Tracker (`/incentive` — planned / coming soon)

Planned module for:
- Logging completed activities.
- Auto-calculating expected incentive based on the rate card.
- Table of activity, date, expected amount, and a manual field to mark payment received.
- Monthly summary view.

> **Current status:** placeholder tile on the dashboard; not yet implemented.

---

## 6. Clinical & Scheduling Logic

### 6.1 Naegele’s Rule — EDD Calculator

**Formula:** `EDD = LMP + 7 days + 9 months`

Implemented in `calcEDD(lmp)` in `src/lib/store.ts`. When a user enters the Last Menstrual Period date, the Expected Delivery Date is computed instantly.

### 6.2 ANC Schedule Predictor

**India’s mandated 4 ANC visits** are auto-targeted back from the EDD:

| ANC Visit | Weeks before EDD |
|-----------|------------------|
| ANC 1 | 28 weeks before EDD |
| ANC 2 | 16 weeks before EDD |
| ANC 3 | 8 weeks before EDD |
| ANC 4 | 4 weeks before EDD |

Already-completed ANC visits (those with a date entered) are skipped.

### 6.3 Immunization Schedule

Child vaccine due dates are calculated from the child’s date of birth (`dob`) plus the vaccine’s scheduled age in weeks:

| Vaccine | Due at |
|---------|--------|
| BCG | Birth (0 weeks) |
| OPV-0 / Hep-B | Birth (0 weeks) |
| Penta-1 / OPV-1 | 6 weeks |
| Penta-2 / OPV-2 | 10 weeks |
| Penta-3 / OPV-3 | 14 weeks |
| Measles-Rubella 1 | 9 months (39 weeks) |
| Measles-Rubella 2 | 15 months (72 weeks) |

Only vaccines not yet marked as given are shown in the due list.

### 6.4 Health Triage / High-Risk Logic

High-risk flagging is supported by:
- **Manual high-risk toggle** on pregnancy forms.
- **BP parsing** helpers (`src/utils/healthCalculators.ts`) classify blood pressure readings as `NORMAL`, `WARNING`, or `CRITICAL_REFERRAL`.
- **High-risk threshold:** BP ≥ 140/90 or Hemoglobin < 11 g/dL triggers a `CRITICAL_REFERRAL` recommendation.
- High-risk mothers are visually highlighted in the dashboard’s due-list alert.

---

## 7. Data Storage & Offline Architecture

### 7.1 Storage Engine (`src/lib/store.ts`)

All data is stored in the browser via **`localStorage`** under the key `asha.records.v1`.

**Record types:**
- `PregnancyRecord`
- `ChildRecord`
- `TbRecord`
- `SurveyRecord`

Each record has a unique `id`, a `kind` discriminator, and an `updatedAt` timestamp.

**Key functions:**
- `loadRecords()` — reads from `localStorage`
- `saveRecord(record)` — inserts or updates a record
- `getRecord(id)` — fetches one record
- `useRecords()` — React hook for a reactive list that updates across tabs
- `useAutoSaveForm(draftKey, initial)` — React hook for per-form drafts
- `newId()` — generates local unique IDs

### 7.2 Auto-Save Behavior

Every form uses `useAutoSaveForm`. This means:
- Each keystroke writes to a draft key in `localStorage`.
- Drafts are restored when the user returns to the form.
- Pressing **Save** commits the draft to the master record list and clears the draft.
- No session timeout; data survives browser closes, phone restarts, and low battery.

### 7.3 Offline Indicator

The `AppShell` header shows a persistent badge:
- 🟢 **Online** when connectivity is available
- 🔴 **Offline — will sync later** when not

This sets clear expectations with the user: the app still works offline, and any queued data will be handled later.

### 7.4 Background Sync Design (original Dexie architecture)

An earlier iteration included a Dexie.js / IndexedDB implementation (`src/db/villageDB.ts`) with:
- Indexed tables: `citizens`, `maternalRecords`, `medicalRecords`, `syncQueue`
- Fuzzy local search across names and IDs
- `navigator.onLine` listener + background sync queue to push records to a theoretical backend when connectivity returns
- Mock village data seeded on startup

The current production build simplified this to `localStorage` for maximum reliability on low-end devices, but the Dexie architecture remains available as a documented upgrade path.

---

## 8. Roles & Permissions (RBAC)

The app is intentionally **single-role / single-user**: the ASHA worker herself is the only operator. There is no login, no admin panel, no user management, and no backend RBAC.

| Role | Permissions | Notes |
|------|-------------|-------|
| **ASHA Worker** | Create, read, update, and delete all records on her own device | Data is local to the device; no multi-user access |

Because there is no server or cloud persistence, traditional role-based access control is not applicable. If a future backend sync is added, RBAC would be introduced at that layer.

---

## 9. Key Differentiators

| Differentiator | Why it matters |
|----------------|----------------|
| **Marathi-first UX** | Most competing tools are English-first; this app speaks the user’s language by default. |
| **Offline-first by default** | Works in zero-connectivity villages; no dependency on government server uptime. |
| **Auto-save on every keystroke** | Critical for low-end phones where calls, low battery, or accidental app-switching are common. |
| **No location tracking / surveillance** | Builds trust with frontline workers and avoids privacy concerns. |
| **Personal helper, not a replacement** | Reduces fear of "another government portal" and encourages adoption. |
| **High-contrast, sunlight-readable UI** | Designed for outdoor field use, not desk-based office use. |
| **One category per form** | Avoids intimidating multi-section forms that confuse users with low digital literacy. |
| **Clinical calculators built-in** | Removes manual date arithmetic errors for ANC and immunization schedules. |
| **No accounts / passwords** | Removes a major barrier for workers with low digital literacy. |
| **PWA installable** | Can be added to the Android home screen like a native app. |

---

## 10. What is NOT in the app (intentional exclusions)

To respect the user requirements and maintain trust, the following are deliberately excluded:

- ❌ GPS / location tracking
- ❌ Activity surveillance or time-based logging
- ❌ Attempts to replace official portals (RCH, Ni-Kshay, Poshan Tracker)
- ❌ Multi-user accounts or logins
- ❌ Cloud database dependency for core data
- ❌ Auto-logout under 15 minutes
- ❌ Hidden menus requiring multiple taps for core tasks
- ❌ Cold, government-portal aesthetic

---

## 11. File Structure

```
public/
└── manifest.json                 # PWA install manifest
src/
├── components/
│   ├── AppShell.tsx              # Layout, header, language switch, offline badge
│   └── ui/
│       ├── collapse.tsx          # Collapsible / accordion components
│       └── form-kit.tsx          # Form UI kit (inputs, cards, save bar)
├── lib/
│   ├── i18n.tsx                  # Marathi/Hindi/English dictionary + provider
│   ├── store.ts                  # Local storage engine + auto-save + due-list logic
│   └── utils.ts                  # Utility helpers
├── routes/                       # TanStack file-based routes
│   ├── index.tsx                 # Home dashboard
│   ├── entry.index.tsx           # Data entry category selector
│   ├── entry.pregnancy.tsx       # Pregnant woman form
│   ├── entry.child.tsx           # Child form
│   ├── entry.tb.tsx              # TB patient form
│   ├── entry.survey.tsx          # Malaria/Dengue survey form
│   ├── info.index.tsx            # Information hub index
│   ├── info.scheme.tsx           # ASHA scheme overview
│   ├── info.programs.tsx         # Program guides
│   ├── info.incentives.tsx       # Incentive rate card
│   └── info.faq.tsx              # FAQ
├── router.tsx                    # TanStack Router setup
├── routeTree.gen.ts              # Auto-generated route tree
└── styles.css                    # Warm color palette + Devanagari font stack
```

---

## 12. Future Roadmap (Planned Modules)

1. **My Beneficiaries** — searchable list, full history, editable records, WhatsApp text export.
2. **Incentive Tracker** — activity log, expected amount calculation, payment-received checkbox, monthly summary.
3. **Family Planning entry form** — eligible couple details, contraceptive method used.
4. **Daily Activity Log** — date auto-filled, checklist of activities done, households visited.
5. **Dexie/IndexedDB upgrade** — for larger datasets and more robust offline storage.
6. **Optional background sync** — push queued records to an official backend when connectivity returns (user-controlled, opt-in).

---

## 13. Privacy & Security Summary

- **Data location:** Entirely on the user’s phone, in `localStorage`.
- **No transmission:** No records are sent to any server in the current build.
- **No tracking:** No GPS, no analytics, no behavior logging.
- **User control:** The user can edit or delete any record at any time.
- **Limitation:** Because data is local, clearing browser data or uninstalling the PWA will delete records. A future export/sync feature is planned to mitigate this.

---

*Document version: 1.0 — aligned with the current ASHA Helper build.*
