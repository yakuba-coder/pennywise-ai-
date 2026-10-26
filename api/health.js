import { json } from "../lib/server.js";
export default async function handler(request) {
  if (request.method !== "GET") return json(405, { ok: false, error: "Method not allowed." });
  return json(200, {
    ok: true,
    service: "Pennywise AI",
    configuration: {
      gemini: Boolean(process.env.GEMINI_API_KEY),
      hindsight: Boolean(process.env.HINDSIGHT_API_KEY && process.env.HINDSIGHT_BANK_ID),
      hindsightBaseUrl: process.env.HINDSIGHT_BASE_URL || "https://api.hindsight.vectorize.io",
      demoMode: process.env.DEMO_MODE !== "false"
    },
    note: "Configuration status only; provider credentials and live connectivity are not verified by this endpoint."
  });
}