import { json } from "../lib/server.js";
export default function handler(request) {
  if (request.method !== "GET") return json(405, { ok: false, error: "Method not allowed." });
  const configured = Boolean(process.env.HINDSIGHT_API_KEY && process.env.HINDSIGHT_BANK_ID);
  return json(200, { enabled: configured, configured, mode: process.env.DEMO_MODE !== "false" ? "single-user-demo" : "configured", message: configured ? "Hindsight credentials are configured. Live recall/retention is confirmed only after an operation succeeds." : "Hindsight is not configured. Chat can still work with Gemini." });
}