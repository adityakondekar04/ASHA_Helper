import { neon, neonConfig } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

// Load .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

let databaseUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Error: DATABASE_URL is not set in .env!");
  process.exit(1);
}
if (databaseUrl.includes("-pooler.")) {
  databaseUrl = databaseUrl.replace("-pooler.", ".");
}

// Neon configuration: fetch retry
const sql = neon(databaseUrl);

const DDL_MIGRATION = `
-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'asha',
  district VARCHAR(100),
  taluka VARCHAR(100),
  phc VARCHAR(150),
  sub_center VARCHAR(150),
  village VARCHAR(150),
  asha_id VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Pregnancy Records Table
CREATE TABLE IF NOT EXISTS pregnancy_records (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  age VARCHAR(10),
  phone VARCHAR(20),
  address TEXT,
  rch_id VARCHAR(50),
  lmp DATE,
  edd DATE,
  high_risk BOOLEAN DEFAULT FALSE,
  high_risk_reasons TEXT,
  delivery_date DATE,
  delivery_place VARCHAR(150),
  outcome VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Antenatal Care (ANC) Visits Table
CREATE TABLE IF NOT EXISTS anc_visits (
  id VARCHAR(64) PRIMARY KEY,
  pregnancy_id VARCHAR(64) NOT NULL REFERENCES pregnancy_records(id) ON DELETE CASCADE,
  visit_number INT NOT NULL,
  visit_date DATE NOT NULL,
  bp VARCHAR(20),
  weight_kg NUMERIC(5,2),
  hb_level NUMERIC(4,1),
  ifa_tablets_given INT DEFAULT 0,
  calcium_tablets_given INT DEFAULT 0,
  danger_signs_found TEXT,
  referral_needed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Child Health Records Table
CREATE TABLE IF NOT EXISTS child_records (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  mother_pregnancy_id VARCHAR(64) REFERENCES pregnancy_records(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  mother_name VARCHAR(150),
  dob DATE NOT NULL,
  gender VARCHAR(10),
  birth_weight_kg NUMERIC(4,2),
  address TEXT,
  phone VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Child Vaccines Table
CREATE TABLE IF NOT EXISTS child_vaccines (
  id VARCHAR(64) PRIMARY KEY,
  child_id VARCHAR(64) NOT NULL REFERENCES child_records(id) ON DELETE CASCADE,
  vaccine_code VARCHAR(50) NOT NULL,
  vaccine_name VARCHAR(100),
  due_date DATE,
  given_date DATE,
  status VARCHAR(20) DEFAULT 'pending',
  batch_number VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Child Growth Monitoring Table
CREATE TABLE IF NOT EXISTS child_growth (
  id VARCHAR(64) PRIMARY KEY,
  child_id VARCHAR(64) NOT NULL REFERENCES child_records(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight_kg NUMERIC(5,2),
  height_cm NUMERIC(5,2),
  muac_cm NUMERIC(4,1),
  nutrition_status VARCHAR(20) DEFAULT 'normal',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. TB / Nikshay Surveillance Table
CREATE TABLE IF NOT EXISTS tb_records (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(150) NOT NULL,
  age VARCHAR(10),
  phone VARCHAR(20),
  address TEXT,
  nikshay_id VARCHAR(50),
  start_date DATE,
  regimen VARCHAR(100),
  doses_taken INT DEFAULT 0,
  total_doses INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'under_treatment',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Health Surveys Table
CREATE TABLE IF NOT EXISTS survey_records (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  address TEXT,
  house_count INT DEFAULT 0,
  fever_cases INT DEFAULT 0,
  blood_sample VARCHAR(10) DEFAULT 'no',
  larval_survey VARCHAR(10) DEFAULT 'no',
  larval_found VARCHAR(10) DEFAULT 'no',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. ASHA Monthly Incentives & Performance Claims
CREATE TABLE IF NOT EXISTS incentive_claims (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month_year VARCHAR(10) NOT NULL,
  activity_type VARCHAR(100) NOT NULL,
  beneficiary_name VARCHAR(150),
  beneficiary_id VARCHAR(64),
  amount NUMERIC(8,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'pending',
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ASHA Saathi Chat Conversations Table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  language VARCHAR(10) DEFAULT 'mr',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. ASHA Saathi Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id VARCHAR(64) PRIMARY KEY,
  conversation_id VARCHAR(64) NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  is_danger BOOLEAN DEFAULT FALSE,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Indexes
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_pregnancy_user ON pregnancy_records(user_id);
CREATE INDEX IF NOT EXISTS idx_pregnancy_highrisk ON pregnancy_records(high_risk);
CREATE INDEX IF NOT EXISTS idx_anc_pregnancy ON anc_visits(pregnancy_id);
CREATE INDEX IF NOT EXISTS idx_child_user ON child_records(user_id);
CREATE INDEX IF NOT EXISTS idx_child_vaccines_child ON child_vaccines(child_id);
CREATE INDEX IF NOT EXISTS idx_child_growth_child ON child_growth(child_id);
CREATE INDEX IF NOT EXISTS idx_tb_user ON tb_records(user_id);
CREATE INDEX IF NOT EXISTS idx_survey_user ON survey_records(user_id);
CREATE INDEX IF NOT EXISTS idx_incentive_user ON incentive_claims(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv ON chat_messages(conversation_id);
`;

async function executeWithRetry(fn, retries = 5, delayMs = 3000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`Attempt ${attempt}/${retries} failed:`, err?.message || err);
      if (attempt === retries) throw err;
      console.log(`Waiting ${delayMs}ms before retrying (database compute may be waking up)...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

async function run() {
  console.log("Connecting to Neon Cloud Database (waking compute if idle)...");

  await executeWithRetry(async () => {
    // Run each DDL statement individually
    const statements = DDL_MIGRATION
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await sql.query(stmt);
    }
  });

  console.log("✅ All tables and indexes created successfully!");

  // Seed sample data
  await executeWithRetry(async () => {
    const existing = await sql`SELECT count(*) as count FROM pregnancy_records;`;
    if (parseInt(existing[0].count, 10) === 0) {
      console.log("Seeding sample records...");
      const userRows = await sql`SELECT id FROM users WHERE phone = '9876543210' LIMIT 1;`;
      const userId = userRows.length > 0 ? userRows[0].id : null;

      // Anjali Deshmukh
      const pregId1 = "preg_001";
      await sql`
        INSERT INTO pregnancy_records (id, user_id, name, age, phone, address, rch_id, lmp, edd, high_risk, high_risk_reasons, notes)
        VALUES (${pregId1}, ${userId}, 'अंजली राहुल देशमुख', '24', '9822334455', 'घर क्र. 45, शिरोली', 'RCH-MH-2026-9812', '2026-05-10', '2027-02-14', FALSE, NULL, 'पहिली गर्भधारणा. सर्व तपासण्या नियमित.');
      `;

      await sql`
        INSERT INTO anc_visits (id, pregnancy_id, visit_number, visit_date, bp, weight_kg, hb_level, ifa_tablets_given, calcium_tablets_given, notes)
        VALUES 
          ('anc_001_1', ${pregId1}, 1, '2026-06-20', '118/76', 52.0, 11.8, 30, 30, 'पहिली तपासणी पूर्ण. टीडी-१ लस दिली.'),
          ('anc_001_2', ${pregId1}, 2, '2026-08-15', '120/80', 54.5, 11.5, 60, 60, 'दुसरी तपासणी पूर्ण. गर्भाची हालचाल समाधानकारक.');
      `;

      // Anita Shinde (High Risk)
      const pregId2 = "preg_002";
      await sql`
        INSERT INTO pregnancy_records (id, user_id, name, age, phone, address, rch_id, lmp, edd, high_risk, high_risk_reasons, notes)
        VALUES (${pregId2}, ${userId}, 'अनिता सचिन शिंदे', '29', '9890112233', 'गावठाण परिसर, शिरोली', 'RCH-MH-2026-4411', '2026-03-01', '2026-12-06', TRUE, 'तीव्र रक्तक्षय (Hb 8.2 g/dL), उच्च रक्तदाब', 'हाय-रिस्क केस. दर १५ दिवसांनी भेट आवश्यक.');
      `;

      await sql`
        INSERT INTO anc_visits (id, pregnancy_id, visit_number, visit_date, bp, weight_kg, hb_level, ifa_tablets_given, calcium_tablets_given, danger_signs_found, referral_needed, notes)
        VALUES 
          ('anc_002_1', ${pregId2}, 1, '2026-04-12', '140/92', 48.0, 8.2, 100, 100, 'रक्तदाब जास्त आणि अशक्तपणा', TRUE, 'प्राथमिक आरोग्य केंद्र (PHC) येथे वैद्यकीय अधिकाऱ्यांकडे पाठवले.');
      `;

      // Child Aarav Pawar
      const childId1 = "child_001";
      await sql`
        INSERT INTO child_records (id, user_id, name, mother_name, dob, gender, birth_weight_kg, address, phone, notes)
        VALUES (${childId1}, ${userId}, 'आरव विकास पवार', 'पूजा पवार', '2026-04-10', 'boy', 2.9, 'शिरोली वाडी', '9850123456', 'बाळ निरोगी आहे.');
      `;

      await sql`
        INSERT INTO child_vaccines (id, child_id, vaccine_code, vaccine_name, due_date, given_date, status, batch_number)
        VALUES 
          ('vac_001_1', ${childId1}, 'BCG', 'BCG', '2026-04-10', '2026-04-10', 'given', 'BCG-2026-A1'),
          ('vac_001_2', ${childId1}, 'OPV-0', 'OPV Zero Dose', '2026-04-10', '2026-04-10', 'given', 'OPV-9912'),
          ('vac_001_3', ${childId1}, 'HepB-0', 'Hepatitis B Birth Dose', '2026-04-10', '2026-04-10', 'given', 'HEP-4421'),
          ('vac_001_4', ${childId1}, 'PENTA-1', 'Pentavalent 1', '2026-05-22', '2026-05-24', 'given', 'PNT-102'),
          ('vac_001_5', ${childId1}, 'ROTA-1', 'Rotavirus 1', '2026-05-22', '2026-05-24', 'given', 'ROTA-55'),
          ('vac_001_6', ${childId1}, 'PENTA-2', 'Pentavalent 2', '2026-06-19', '2026-06-20', 'given', 'PNT-204'),
          ('vac_001_7', ${childId1}, 'MR-1', 'Measles-Rubella 1', '2027-01-10', NULL, 'pending', NULL);
      `;

      await sql`
        INSERT INTO child_growth (id, child_id, date, weight_kg, height_cm, muac_cm, nutrition_status, notes)
        VALUES ('grw_001_1', ${childId1}, '2026-08-10', 6.8, 64.0, 13.5, 'normal', 'वजन व वाढ चांगली आहे.');
      `;

      // TB Record
      await sql`
        INSERT INTO tb_records (id, user_id, name, age, phone, address, nikshay_id, start_date, regimen, doses_taken, total_doses, status, notes)
        VALUES ('tb_001', ${userId}, 'रमेश तुकाराम जाधव', '52', '9822998877', 'मळा भाग, शिरोली', 'NK-MH-881920', '2026-08-01', '4-FDC (DOTS)', 45, 168, 'under_treatment', 'दररोज गोळ्या नियमित घेत आहेत. वजन ४ किलो वाढले.');
      `;

      // Survey Record
      await sql`
        INSERT INTO survey_records (id, user_id, date, address, house_count, fever_cases, blood_sample, larval_survey, larval_found, notes)
        VALUES ('srv_001', ${userId}, '2026-09-15', 'वॉर्ड नं. २, शिरोली', 35, 2, 'yes', 'yes', 'no', '२ संशयित ताप रुग्ण आढळले. रक्त नमुने PHC प्रयोगशाळेत पाठवले.');
      `;

      // Incentive Claims
      await sql`
        INSERT INTO incentive_claims (id, user_id, month_year, activity_type, beneficiary_name, beneficiary_id, amount, status, date, notes)
        VALUES 
          ('inc_001', ${userId}, '2026-09', 'मासिक नियमित मोबदला (Routine Recurring)', 'सर्व्हे व सभा', NULL, 2000.00, 'approved', '2026-09-30', 'सप्टेंबर मासिक सभा व अहवाल सादर.'),
          ('inc_002', ${userId}, '2026-09', 'संस्थात्मक प्रसूती प्रोत्साहन (JSY)', 'पूजा पवार', ${childId1}, 600.00, 'approved', '2026-09-10', 'शिरोली उपकेंद्र ते PHC रुग्णवाहिका मदत.'),
          ('inc_003', ${userId}, '2026-09', 'पूर्ण लसीकरण प्रोत्साहन (१ वर्ष)', 'आरव पवार', ${childId1}, 100.00, 'pending', '2026-09-20', '९ महिने लसीकरण पूर्ण.');
      `;

      console.log("✅ Sample records successfully seeded!");
    } else {
      console.log("Records already present in database.");
    }
  });

  console.log("\n🎉 Database schema and records initialized successfully in Neon Cloud DB!");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
