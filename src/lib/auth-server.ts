import { createServerFn } from "@tanstack/react-start";
import { getDb } from "./db";
import type { AshaUser, UserRole } from "./auth";

export interface LoginResult {
  success: boolean;
  user?: AshaUser;
  error?: string;
}

export const loginWithDb = createServerFn({ method: "POST" })
  .validator(
    (data: { phone: string; password?: string; role?: UserRole; isOtp?: boolean }) => data
  )
  .handler(async ({ data }): Promise<LoginResult> => {
    try {
      const sql = getDb();
      const rows = await sql`
        SELECT id, phone, password, full_name, role, district, taluka, phc, sub_center, village, asha_id, created_at
        FROM users
        WHERE phone = ${data.phone}
        LIMIT 1;
      `;

      if (!rows || rows.length === 0) {
        return {
          success: false,
          error: "या मोबाईल क्रमांकाने वापरकर्ता सापडला नाही / No user found with this mobile number.",
        };
      }

      const row = rows[0];

      if (!data.isOtp) {
        if (row.password !== data.password) {
          return {
            success: false,
            error: "चुकीचा पासवर्ड! कृपया पुन्हा प्रयत्न करा / Incorrect password. Please try again.",
          };
        }
      }

      const user: AshaUser = {
        id: row.id,
        fullName: row.full_name,
        phone: row.phone,
        role: (row.role as UserRole) || "asha",
        district: row.district || "सातारा",
        taluka: row.taluka || "कराड",
        phc: row.phc || "मसूर प्राथमिक आरोग्य केंद्र",
        subCenter: row.sub_center || "शिरोली उपकेंद्र",
        village: row.village || "शिरोली",
        ashaId: row.asha_id,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      };

      return { success: true, user };
    } catch (err: any) {
      console.error("Neon DB Login Error:", err);
      return {
        success: false,
        error: `Cloud Database Error: ${err.message || "Failed to connect to Neon DB"}`,
      };
    }
  });

export interface RegisterPayload {
  fullName: string;
  phone: string;
  password: string;
  role: UserRole;
  district: string;
  taluka: string;
  phc: string;
  subCenter: string;
  village: string;
  ashaId?: string;
}

export const registerWithDb = createServerFn({ method: "POST" })
  .validator((data: RegisterPayload) => data)
  .handler(async ({ data }): Promise<LoginResult> => {
    try {
      const sql = getDb();
      const existing = await sql`
        SELECT id FROM users WHERE phone = ${data.phone} LIMIT 1;
      `;

      if (existing && existing.length > 0) {
        return {
          success: false,
          error:
            "हा मोबाईल नंबर आधीच नोंदणीकृत आहे! कृपया लॉगिन करा / Mobile number already registered. Please login.",
        };
      }

      const id = "usr_" + Date.now();
      const ashaId = data.ashaId || `ASHA-MH-${data.phone.slice(-4)}`;

      await sql`
        INSERT INTO users (id, phone, password, full_name, role, district, taluka, phc, sub_center, village, asha_id)
        VALUES (${id}, ${data.phone}, ${data.password}, ${data.fullName}, ${data.role}, ${data.district}, ${data.taluka}, ${data.phc}, ${data.subCenter}, ${data.village}, ${ashaId});
      `;

      const user: AshaUser = {
        id,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role,
        district: data.district,
        taluka: data.taluka,
        phc: data.phc,
        subCenter: data.subCenter,
        village: data.village,
        ashaId,
        createdAt: new Date().toISOString(),
      };

      return { success: true, user };
    } catch (err: any) {
      console.error("Neon DB Register Error:", err);
      return {
        success: false,
        error: `Cloud Database Error: ${err.message || "Failed to register user in Neon DB"}`,
      };
    }
  });

export const getDbUsers = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, phone, password, full_name, role, district, taluka, phc, sub_center, village, asha_id
      FROM users
      ORDER BY created_at ASC;
    `;
    return { success: true, users: rows };
  } catch (err: any) {
    console.error("Neon DB Fetch Users Error:", err);
    return { success: false, error: err.message, users: [] };
  }
});
