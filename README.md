# WebApp Money Management (Google Apps Script + Google Sheets)

WebApp Money Management ialah aplikasi pengurusan kewangan ringkas yang dibangunkan menggunakan Google Apps Script dan Google Sheets sebagai pangkalan data. Aplikasi ini membolehkan pengguna merekod transaksi Income dan Expense, menyimpan data dalam Google Sheets, memaparkan senarai transaksi serta menghasilkan ringkasan bulanan secara automatik.

## Features
- Tambah transaksi (Income atau Expense)
- Simpan data dalam Google Sheets
- Paparan senarai transaksi mengikut bulan
- Padam transaksi berdasarkan ID
- Ringkasan bulanan: Total Income, Total Expense, Balance
- Statistik jumlah per kategori

## Technologies Used
- Google Apps Script (Web App + HTML Service)
- Google Sheets (Database)
- HTML, JavaScript dan CSS (Frontend)

## Project Structure
- Code.gs: Backend logic dan integrasi Google Sheets
- Index.html: User interface utama
- app.js.html: JavaScript frontend (event handling dan rendering data)
- style.html: Styling UI
- README.md: Dokumentasi projek

## Database Setup (Google Sheets)

Cipta satu Google Spreadsheet bernama “MoneyDB” dan sediakan dua sheet berikut:

1. Sheet: Transactions  
Header baris pertama:
ID | Date | Type | Category | Description | Amount | PaymentMethod | CreatedAt

2. Sheet: Categories  
Header baris pertama:
Type | Category

Contoh data:
Expense | Food  
Expense | Transport  
Expense | Bills  
Income | Salary  
Income | Bonus  

## Setup Google Apps Script

1. Pergi ke https://script.google.com dan cipta projek baru.
2. Masukkan fail berikut:
   - Code.gs
   - Index.html
   - app.js.html
   - style.html
3. Salin Spreadsheet ID dari Google Sheets (bahagian antara /d/ dan /edit dalam URL).
4. Jalankan function berikut sekali dalam Apps Script editor:

```javascript
setupSheetId("PASTE_SPREADSHEET_ID_DI_SINI");
```

## Setup Instructions
1. Cipta Google Spreadsheet baharu dan sediakan sheet Transactions dan Categories seperti struktur yang dinyatakan.  
2. Salin Spreadsheet ID daripada URL.  
3. Buka script.google.com dan cipta projek baharu.  
4. Masukkan fail Code.gs, Index.html, app.js.html dan style.html ke dalam projek.  
5. Jalankan fungsi setupSheetId("SPREADSHEET_ID") sekali untuk menyimpan ID spreadsheet ke dalam Script Properties.  
6. Deploy sebagai Web App dengan memilih Execute as: Me dan akses mengikut keperluan (contohnya Anyone with the link).

## Core Backend Functions
doGet() digunakan untuk memaparkan UI web app. setupSheetId(spreadsheetId) menyimpan ID Google Sheet. listCategories() mengambil senarai kategori daripada sheet. addTransaction(payload) menambah transaksi baharu ke dalam sheet Transactions. listTransactions(filters) memaparkan senarai transaksi mengikut penapis. deleteTransaction(id) memadam transaksi berdasarkan ID. getMonthlySummary(monthYYYYMM) menjana ringkasan bulanan termasuk income, expense, balance dan jumlah mengikut kategori.

## Sample Transaction Payload
Contoh struktur data transaksi yang dihantar daripada frontend:
{
  "date": "2026-03-03",
  "type": "Expense",
  "category": "Food",
  "description": "Nasi lemak",
  "amount": 8.50,
  "paymentMethod": "Cash"
}

## Troubleshooting
Jika muncul ralat SHEET_ID belum diset, pastikan fungsi setupSheetId telah dijalankan dengan ID yang betul. Jika UI tidak dipaparkan, pastikan nama fail HTML sepadan dengan yang digunakan dalam doGet(). Jika data tidak muncul, semak kewujudan sheet dan struktur header yang tepat.

## Future Improvements
Cadangan penambahbaikan termasuk modul budget bulanan, paparan carta analitik, sokongan multi-user berdasarkan email pengguna, fungsi import CSV penyata bank serta sokongan recurring transaction untuk perbelanjaan tetap.

## Author
Muhammad Munzir bin Mohamed Dauzkaply Nor  
Bachelor of Computer Science (Network and Computer Security)  
Universiti Teknologi Malaysia Kuala Lumpur
