# WebApp Money Management (Google Apps Script + Google Sheets)

WebApp Money Management ialah aplikasi pengurusan kewangan ringkas yang dibangunkan menggunakan Google Apps Script dan Google Sheets sebagai pangkalan data. Aplikasi ini membolehkan pengguna merekod transaksi Income dan Expense, menyimpan data dalam Google Sheets, memaparkan senarai transaksi serta menghasilkan ringkasan bulanan secara automatik.

## Features
Aplikasi ini menyokong penambahan transaksi dengan maklumat seperti tarikh, jenis (Income atau Expense), kategori, deskripsi, jumlah dan kaedah bayaran. Sistem memaparkan senarai transaksi mengikut bulan, membenarkan pemadaman transaksi berdasarkan ID unik, serta menjana ringkasan bulanan yang mengandungi jumlah keseluruhan Income, jumlah Expense, baki semasa dan pecahan jumlah mengikut kategori.

## Technology Stack
Backend dibangunkan menggunakan Google Apps Script. Frontend menggunakan HTML, JavaScript dan CSS melalui HTML Service. Data disimpan dan diuruskan dalam Google Sheets menggunakan SpreadsheetApp API.

## Project Structure
Code.gs mengandungi logik backend termasuk fungsi CRUD transaksi dan pengiraan summary. Index.html berfungsi sebagai antaramuka utama pengguna. app.js.html mengurus interaksi frontend dengan backend menggunakan google.script.run. style.html mengandungi reka bentuk dan susun atur UI.

## Database Structure (Google Sheets)
Spreadsheet mesti mengandungi sekurang-kurangnya dua sheet iaitu Transactions dan Categories. Sheet Transactions perlu mempunyai header berikut pada baris pertama: ID, Date, Type, Category, Description, Amount, PaymentMethod, CreatedAt. Sheet Categories pula perlu mempunyai header Type dan Category serta menyenaraikan kategori mengikut jenis Income atau Expense.

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
