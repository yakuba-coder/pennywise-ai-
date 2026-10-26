# Hindsight Cloud setup and memory demo

## Official documentation checked

- Hindsight Cloud API integration: https://docs.hindsight.vectorize.io/cloud/api-integration/
- Retain: https://hindsight.vectorize.io/developer/api/retain
- Recall: https://hindsight.vectorize.io/developer/api/recall
- HTTP API reference: https://hindsight.vectorize.io/api-reference

The implementation uses the documented HTTP API patterns:
- Retain: `POST /v1/default/banks/{bank_id}/memories` with `items` and `async: false`.
- Recall: `POST /v1/default/banks/{bank_id}/memories/recall` with `query` and optional `types`.
- Cloud base URL: `https://api.hindsight.vectorize.io`.
- Authorization is sent server-side as a Bearer token. If your Hindsight Connect page specifies a different authentication header or API base URL, follow that account-specific official guidance.

## Configure

1. Sign in to Hindsight Cloud.
2. Open **Connect** and create/copy an API key. The key may be shown only once.
3. Create or select a **dedicated demo bank** for this Pennywise demo.
4. In Vercel → Project → Settings → Environment Variables, add:
   - `HINDSIGHT_API_KEY`: your private key
   - `HINDSIGHT_BASE_URL`: `https://api.hindsight.vectorize.io`
   - `HINDSIGHT_BANK_ID`: your dedicated demo bank ID
5. Redeploy after adding variables.

Never paste your secret key into a public chat or commit it to GitHub.

## Demonstration

1. Open Pennywise AI and send: `Remember that my monthly allowance is ₹8,000 and I want to save ₹2,000 every month.`
2. Inspect the message receipt. It should say Hindsight confirmed retention only if the retain call returned a successful response.
3. Start a new chat session by refreshing the page (the Hindsight bank remains server-side; the visible chat list resets).
4. Ask: `What savings goal did I tell you about?`
5. A response is evidence of memory recall only if the receipt reports recalled memory items. The assistant must not claim recall when the Hindsight query returned nothing or failed.
6. Test fallback by temporarily removing Hindsight configuration or making the service unavailable. Gemini chat should still respond when Gemini is configured; the UI should report memory failure/not-configured honestly.

## Isolation warning

This build has no authentication. It is intentionally a single-user demonstration. Anyone who can use the deployed endpoint may access the configured bank's memories. Use a dedicated throwaway demo bank and do not use this deployment for multiple real users or sensitive information. A production multi-user app needs authentication and server-verified per-user identity, then a per-user bank or rigorously scoped memory strategy.
