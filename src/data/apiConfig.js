/**
 * ═══════════════════════════════════════════════════════════════
 *  KONFIGURASI API — Google Sheets LANGSUNG (Tanpa SheetDB)
 * ═══════════════════════════════════════════════════════════════
 *
 *  CARA SETUP BARU (Lebih Aman):
 *  Semua ID dan nama Sheet sekarang diambil dari Environment Variables.
 *  Jangan isi ID langsung di file ini agar aman saat di-push ke GitHub.
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ┌───────────────────────────────────────────────────────────┐
// │  MENGAMBIL DATA DARI ENVIRONMENT VARIABLES (.env)         │
// └───────────────────────────────────────────────────────────┘
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_POTENSI = import.meta.env.VITE_SHEET_POTENSI;
const SHEET_STATS = import.meta.env.VITE_SHEET_STATS;

/**
 * Membangun URL Google Sheets gviz/tq untuk mengambil data
 * langsung dari Google tanpa perantara SheetDB.
 */
function buildGoogleSheetsUrl(sheetName) {
  // Cegah error jika environment variable belum terbaca
  if (!SPREADSHEET_ID || !sheetName) return null;
  return `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

// Cek apakah Spreadsheet ID sudah dikonfigurasi melalui .env
const isConfigured = Boolean(SPREADSHEET_ID && SPREADSHEET_ID !== 'PASTE_SPREADSHEET_ID_DISINI');

export const API_CONFIG = {
  /**
   * URL untuk data UMKM (Tab: UMKM Taruban Kulon).
   * Otomatis null jika Spreadsheet ID belum di-set → pakai data statis.
   */
  potensi: isConfigured ? buildGoogleSheetsUrl(SHEET_POTENSI) : null,

  /**
   * URL untuk data statistik demografi (Tab: Statistik Taruban Kulon).
   * Otomatis null jika Spreadsheet ID belum di-set → pakai data statis.
   */
  stats: isConfigured ? buildGoogleSheetsUrl(SHEET_STATS) : null,
};