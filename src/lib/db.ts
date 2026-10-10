import { neon } from "@neondatabase/serverless";

const getDatabaseUrl = () => {
  let url =
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.DATABASE_URL ||
    (typeof import.meta !== "undefined" && ((import.meta as any).env?.DATABASE_URL_UNPOOLED || (import.meta as any).env?.DATABASE_URL));

  if (!url) {
    throw new Error(
      "DATABASE_URL is not defined in environment variables. Please check your .env file."
    );
  }

  // The @neondatabase/serverless HTTP fetch driver requires the direct compute host.
  // The '-pooler.' host is reserved for TCP pgbouncer connections (port 5432) and does not accept HTTP /sql.
  if (url.includes("-pooler.")) {
    url = url.replace("-pooler.", ".");
  }

  return url;
};

export const getDb = () => {
  return neon(getDatabaseUrl());
};
