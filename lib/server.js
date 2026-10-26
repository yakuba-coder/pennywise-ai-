export function json(status, data) {
  return new Response(JSON.stringify(data), {
    status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
}
export async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}
export async function fetchWithTimeout(url, options = {}, ms = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  finally { clearTimeout(timer); }
}
export function safeError(label, error) {
  console.error(`[${label}]`, error?.name || "Error", error?.message || "unknown error");
}
