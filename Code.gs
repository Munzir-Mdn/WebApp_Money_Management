const DEFAULT_TIMEZONE = Session.getScriptTimeZone();

/** Web app entry */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Money Management')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** ====== CONFIG ====== */
function getDb_() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) throw new Error('SHEET_ID belum diset. Sila run setupSheetId() dulu.');
  const ss = SpreadsheetApp.openById(sheetId);
  return {
    ss,
    tx: ss.getSheetByName('Transactions'),
    cat: ss.getSheetByName('Categories'),
  };
}

/** Run sekali untuk set Spreadsheet ID */
function setupSheetId(spreadsheetId) {
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', spreadsheetId);
  return true;
}

/** ====== CATEGORIES ====== */
function listCategories() {
  const { cat } = getDb_();
  const values = cat.getDataRange().getValues();
  // remove header
  const rows = values.slice(1).filter(r => r[0] && r[1]);
  const out = { Income: [], Expense: [] };
  rows.forEach(r => {
    const type = String(r[0]).trim();
    const name = String(r[1]).trim();
    if (type === 'Income') out.Income.push(name);
    if (type === 'Expense') out.Expense.push(name);
  });
  // unique + sort
  out.Income = [...new Set(out.Income)].sort();
  out.Expense = [...new Set(out.Expense)].sort();
  return out;
}

/** ====== TRANSACTIONS ====== */
function addTransaction(payload) {
  validateTx_(payload);

  const { tx } = getDb_();
  const id = Utilities.getUuid();
  const createdAt = new Date();

  // payload.date format: YYYY-MM-DD
  const dateObj = new Date(payload.date + 'T00:00:00');

  tx.appendRow([
    id,
    dateObj,
    payload.type,
    payload.category,
    payload.description || '',
    Number(payload.amount),
    payload.paymentMethod || '',
    createdAt
  ]);

  return { ok: true, id };
}

function listTransactions(filters) {
  const { tx } = getDb_();
  const range = tx.getDataRange().getValues();
  const rows = range.slice(1);

  // optional filters: month (YYYY-MM), type, category
  const month = filters?.month || '';
  const type = filters?.type || '';
  const category = filters?.category || '';

  const out = rows
    .filter(r => r[0])
    .map(r => ({
      id: r[0],
      date: formatDate_(r[1]),
      type: r[2],
      category: r[3],
      description: r[4],
      amount: Number(r[5] || 0),
      paymentMethod: r[6] || '',
      createdAt: r[7] ? r[7].toISOString ? r[7].toISOString() : String(r[7]) : ''
    }))
    .filter(o => {
      if (month && !o.date.startsWith(month)) return false;
      if (type && o.type !== type) return false;
      if (category && o.category !== category) return false;
      return true;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return out;
}

function deleteTransaction(id) {
  const { tx } = getDb_();
  const values = tx.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) {
      tx.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, message: 'ID tidak dijumpai' };
}

/** Summary by month */
function getMonthlySummary(monthYYYYMM) {
  const list = listTransactions({ month: monthYYYYMM });

  let income = 0, expense = 0;
  const byCategory = {};

  list.forEach(t => {
    if (t.type === 'Income') income += t.amount;
    if (t.type === 'Expense') expense += t.amount;

    const key = `${t.type}:${t.category}`;
    byCategory[key] = (byCategory[key] || 0) + t.amount;
  });

  const balance = income - expense;

  // transform category map to array
  const catArr = Object.keys(byCategory).map(k => {
    const [type, category] = k.split(':');
    return { type, category, total: byCategory[k] };
  }).sort((a,b) => b.total - a.total);

  return { month: monthYYYYMM, income, expense, balance, byCategory: catArr };
}

/** ====== HELPERS ====== */
function validateTx_(p) {
  if (!p) throw new Error('Payload kosong');
  if (!p.date) throw new Error('Tarikh wajib');
  if (!p.type || !['Income','Expense'].includes(p.type)) throw new Error('Type mesti Income atau Expense');
  if (!p.category) throw new Error('Kategori wajib');
  if (p.amount === '' || p.amount === null || p.amount === undefined) throw new Error('Amount wajib');
  const amt = Number(p.amount);
  if (!isFinite(amt) || amt <= 0) throw new Error('Amount mesti nombor > 0');
}

function formatDate_(d) {
  if (!(d instanceof Date)) d = new Date(d);
  return Utilities.formatDate(d, DEFAULT_TIMEZONE, 'yyyy-MM-dd');
}