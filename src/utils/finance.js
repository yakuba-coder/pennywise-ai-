export const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n) || 0);
export const monthKey = d => String(d || '').slice(0, 7);
export function summarize(transactions, month = new Date().toISOString().slice(0,7)) {
  const list = transactions.filter(t => monthKey(t.date) === month);
  const income = list.filter(t => t.type === 'income').reduce((s,t)=>s+Number(t.amount),0);
  const expenses = list.filter(t => t.type === 'expense').reduce((s,t)=>s+Number(t.amount),0);
  return { income, expenses, balance: income-expenses, savingsRate: income > 0 ? Math.max(0, (income-expenses)/income*100) : 0 };
}
export function parseCsv(text) {
  const rows = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (rows.length < 2) throw new Error('CSV needs a header and at least one row.');
  const headers = rows[0].split(',').map(x=>x.trim().toLowerCase());
  const required = ['description','amount','type','category','date'];
  const missing = required.filter(h=>!headers.includes(h));
  if (missing.length) throw new Error(`Missing columns: ${missing.join(', ')}`);
  const valid = [], invalid = [];
  rows.slice(1).forEach((line,i)=>{
    const cols = line.split(','); const row = Object.fromEntries(headers.map((h,j)=>[h,(cols[j]||'').trim()]));
    const amount = Number(row.amount);
    if (!row.description || !Number.isFinite(amount) || amount <= 0 || !['income','expense'].includes(row.type) || !row.category || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) invalid.push({line:i+2, reason:'Check description, positive amount, type, category and YYYY-MM-DD date.'});
    else valid.push({id:crypto.randomUUID(), description:row.description, amount, type:row.type, category:row.category, date:row.date, notes:row.notes||''});
  });
  return {valid, invalid};
}
