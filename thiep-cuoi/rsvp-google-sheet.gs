/**
 * RSVP -> Google Sheet cho thiệp cưới Hoàng Anh & Thu Ngân
 *
 * Cách dùng:
 * 1. Tạo 1 Google Sheet mới -> Extensions (Tiện ích mở rộng) -> Apps Script
 * 2. Xoá code mặc định, dán toàn bộ file này vào, bấm Save
 * 3. Deploy -> New deployment -> loại "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 *    -> Deploy, cấp quyền, copy "Web app URL"
 * 4. Mở index.html, dán URL vào CONFIG.rsvpEndpoint: "https://script.google.com/macros/s/.../exec"
 */
const SHEET_NAME = 'RSVP';
const HEADERS = ['Thời gian', 'Tên', 'Lời nhắn', 'Tham dự', 'Số người', 'Link khách', 'Thiệp của'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
    }
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // Chặn công thức: ô bắt đầu bằng = + - @ sẽ bị Sheets hiểu là formula
    const safe = v => {
      const s = String(v == null ? '' : v).slice(0, 1000);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    sh.appendRow([new Date(), safe(d.name), safe(d.message), safe(d.attend), safe(d.party), safe(d.guestLink), safe(d.invitedBy)]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is running');
}
