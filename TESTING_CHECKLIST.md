# Testing checklist

## Build and configuration checks

- [ ] Run `npm.cmd install`.
- [ ] Run `npm.cmd run build`.
- [ ] Confirm the generated `dist/` folder exists.
- [ ] Deploy to Vercel and confirm `GET /api/health` returns JSON.
- [ ] Confirm `GET /api/memory-status` returns JSON.
- [ ] Confirm there are no secrets in GitHub source or browser JavaScript.

## Finance UI checks

- [ ] Add an expense; verify monthly expense total updates.
- [ ] Add income; verify balance and savings rate update.
- [ ] Edit and delete a transaction.
- [ ] Search and filter transactions.
- [ ] Export transactions to CSV and open the file.
- [ ] Import the example CSV; confirm valid/invalid row preview.
- [ ] Add a budget and confirm spent/remaining/usage update from expenses.
- [ ] Create a savings goal and add a contribution.
- [ ] Clear browser data only if you intend to remove the locally saved finance records.

## Gemini live checks (requires your key)

- [ ] Configure `GEMINI_API_KEY` and `GEMINI_MODEL`, then redeploy.
- [ ] Ask: “What are three practical ways to reduce unnecessary spending?”
- [ ] Confirm a real response arrives.
- [ ] Remove `GEMINI_API_KEY` temporarily and confirm a clear configuration error.
- [ ] Confirm timeout/provider failures do not produce a fake successful response.

## Hindsight live checks (requires valid Hindsight Cloud credentials and a dedicated demo bank)

- [ ] Configure `HINDSIGHT_API_KEY`, `HINDSIGHT_BASE_URL`, and `HINDSIGHT_BANK_ID`.
- [ ] Ask: “Remember that my monthly allowance is ₹8,000 and I want to save ₹2,000 every month.”
- [ ] Confirm the receipt says retention succeeded only after an HTTP success response.
- [ ] Refresh the page and ask: “What savings goal did I tell you about?”
- [ ] Confirm the receipt indicates one or more memories actually came back from Hindsight.
- [ ] Simulate Hindsight unavailability and confirm basic Gemini chat still works.
- [ ] Do not use a shared production bank: this app is an unauthenticated single-user demo.

## Honest verification status for the generated ZIP

The project files and archive are created by the generation environment. This does **not** mean live Gemini or Hindsight was tested. Those checks require the owner's credentials and a deployed environment. If a local dependency install/build could not run in the generation environment, run the commands above and share the exact log if anything fails.
