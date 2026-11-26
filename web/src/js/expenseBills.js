import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  escapeHtml,
  flashToast,
  fmtINR,
  renderAttachmentUploader,
  bindAttachmentUploader,
  getUploaderAttachments
} from '/src/js/api.js';
import { PROPOSAL_LOGO_DATA_URI } from '/src/js/proposalLogo.js';

const CDN = {
  html2canvas: 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
  jspdf: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'
};

function loadScript(src, globalName) {
  if (globalName && window[globalName]) return Promise.resolve(window[globalName]);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (globalName && window[globalName]) return resolve(window[globalName]);
      existing.addEventListener('load', () => resolve(globalName ? window[globalName] : true));
      existing.addEventListener('error', () => reject(new Error('Failed to load ' + src)));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve(globalName ? window[globalName] : true);
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(s);
  });
}

async function getLogoDataUrl() {
  return PROPOSAL_LOGO_DATA_URI || '/logo.png';
}

function emptyRows(count = 7) {
  return Array.from({ length: count }, (_, idx) => ({
    srNo: idx + 1,
    date: '',
    vendorName: '',
    billNo: '',
    amount: '',
    particulars: '',
    originalBillReceived: '',
    remarks: ''
  }));
}

function formatDisplayDate(d) {
  if (!d) return '';
  const str = String(d).trim();
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return str;
}

function formatAmountCell(val) {
  if (val === '' || val === null || val === undefined || isNaN(Number(val))) return '';
  const num = Number(val);
  return '₹ ' + num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function buildPrintableSheetHTML(bill, logoSrc) {
  const rawRows = Array.isArray(bill.rows) ? bill.rows : [];
  const rowCount = Math.max(1, rawRows.length);
  const displayRows = [];
  for (let i = 0; i < rowCount; i++) {
    const r = rawRows[i] || {};
    displayRows.push({
      srNo: i + 1,
      date: formatDisplayDate(r.date || ''),
      vendorName: r.vendorName || '',
      billNo: r.billNo || '',
      amount: formatAmountCell(r.amount),
      particulars: r.particulars || '',
      originalBillReceived: r.originalBillReceived || '',
      remarks: r.remarks || ''
    });
  }

  const totalAmt = rawRows.reduce((s, r) => s + (r.amount !== '' && r.amount != null && !isNaN(Number(r.amount)) ? Number(r.amount) : 0), 0);

  return `
    <div class="eb-pdf-sheet" style="width:1050px;background:#ffffff;color:#111827;font-family:Arial,Helvetica,sans-serif;padding:24px 28px;box-sizing:border-box;">
      <style>
        .eb-pdf-sheet, .eb-pdf-sheet * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .eb-pdf-sheet table, .eb-pdf-sheet tr, .eb-pdf-sheet td, .eb-pdf-sheet th {
          font-family: Arial, Helvetica, sans-serif !important;
          box-sizing: border-box !important;
        }
        .eb-pdf-sheet th {
          background: #d1d5db !important;
          color: #111827 !important;
          text-transform: none !important;
          letter-spacing: 0 !important;
        }
        .eb-pdf-sheet td {
          color: #111827 !important;
          background: #ffffff !important;
        }
        .eb-pdf-sheet tr.eb-pdf-total-row td {
          background: #d1d5db !important;
          color: #111827 !important;
        }
      </style>
      <table style="width:100%;border-collapse:collapse;border:1.5px solid #1f2937;table-layout:fixed;">
        <colgroup>
          <col style="width:7%;">
          <col style="width:11%;">
          <col style="width:16%;">
          <col style="width:10%;">
          <col style="width:11%;">
          <col style="width:18%;">
          <col style="width:14%;">
          <col style="width:13%;">
        </colgroup>
        <!-- Top Header Row -->
        <tr>
          <td colspan="1" style="border:1.2px solid #1f2937;padding:8px 6px;text-align:center;vertical-align:middle;background:#ffffff !important;">
            <img src="${logoSrc}" alt="CI 360" style="width:44px;height:44px;object-fit:contain;display:block;margin:0 auto 3px;" />
            <div style="font-size:11px;font-weight:800;color:#0369a1;letter-spacing:0.3px;">CI <span style="color:#06b6d4;">360°</span></div>
          </td>
          <td colspan="5" style="border:1.2px solid #1f2937;padding:12px 10px;text-align:center;vertical-align:middle;background:#ffffff !important;">
            <div style="font-size:18px;font-weight:800;letter-spacing:0.8px;color:#111827;text-transform:uppercase;">
              EXPENSES AGAINST REVENUE BILL
            </div>
          </td>
          <td colspan="2" style="border:1.2px solid #1f2937;padding:10px 12px;text-align:left;vertical-align:middle;background:#ffffff !important;font-size:13px;font-weight:700;color:#111827;">
            Date: <span style="font-weight:600;margin-left:6px;">${escapeHtml(formatDisplayDate(bill.sheetDate || ''))}</span>
          </td>
        </tr>

        <!-- Column Headers -->
        <tr style="background:#d1d5db !important;">
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Sr. No.</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Date</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Vendor Name</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Bill No.</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Amount (₹)</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Activity / Particulars</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:11.5px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;line-height:1.25;">Original Bill<br/>Received (Yes / No)</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;background:#d1d5db !important;color:#111827 !important;text-align:center;">Remarks</th>
        </tr>

        <!-- Data Rows -->
        ${displayRows.map(r => `
          <tr style="height:34px;background:#ffffff;">
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;background:#ffffff !important;">${r.srNo}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;background:#ffffff !important;">${escapeHtml(r.date)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;background:#ffffff !important;word-break:break-word;">${escapeHtml(r.vendorName)}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;background:#ffffff !important;word-break:break-word;">${escapeHtml(r.billNo)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:right;color:#111827;background:#ffffff !important;font-weight:600;">${escapeHtml(r.amount)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;background:#ffffff !important;word-break:break-word;">${escapeHtml(r.particulars)}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;background:#ffffff !important;font-weight:600;">${escapeHtml(r.originalBillReceived)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;background:#ffffff !important;word-break:break-word;">${escapeHtml(r.remarks)}</td>
          </tr>
        `).join('')}

        <!-- Light Grey Divider / Total Bar -->
        <tr class="eb-pdf-total-row" style="background:#d1d5db;height:24px;">
          <td colspan="4" style="border:1px solid #1f2937;padding:4px 10px;font-size:11.5px;font-weight:700;color:#111827 !important;background:#d1d5db !important;text-align:right;">
            ${totalAmt > 0 ? 'Total Amount :' : ''}
          </td>
          <td style="border:1px solid #1f2937;padding:4px 8px;font-size:12px;font-weight:800;color:#111827 !important;background:#d1d5db !important;text-align:right;">
            ${totalAmt > 0 ? escapeHtml(formatAmountCell(totalAmt)) : ''}
          </td>
          <td colspan="3" style="border:1px solid #1f2937;padding:4px 8px;background:#d1d5db !important;"></td>
        </tr>

        <!-- Signature / Approval Row -->
        <tr style="height:68px;background:#ffffff;">
          <td colspan="8" style="border:1.2px solid #1f2937;padding:12px 16px;vertical-align:bottom;">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;width:100%;">
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Prepared by :- ${escapeHtml(bill.preparedBy || 'Varsha Jyotishi')}
              </div>
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Checked by :- ${escapeHtml(bill.checkedBy || 'Urna Banerji')}
              </div>
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Approved by :- ${escapeHtml(bill.approvedBy || 'Aashit shah')}
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div style="margin-top:8px;font-size:13px;font-weight:600;color:#111827;">
        ${escapeHtml(bill.attachmentNote || 'Attachment Vendor Bill')}
      </div>
    </div>
  `;
}

async function downloadExpenseBillPdf(bill, btn) {
  const oldText = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Generating PDF…';
  }

  const stage = document.createElement('div');
  stage.style.cssText = 'position:fixed;top:-99999px;left:-99999px;width:1050px;background:#ffffff;z-index:-1;';
  document.body.appendChild(stage);

  try {
    const [h2c, jspdfMod, logoDataUrl] = await Promise.all([
      loadScript(CDN.html2canvas, 'html2canvas'),
      loadScript(CDN.jspdf, 'jspdf'),
      getLogoDataUrl()
    ]);
    const { jsPDF } = jspdfMod || window.jspdf;

    stage.innerHTML = buildPrintableSheetHTML(bill, logoDataUrl);
    const sheetEl = stage.querySelector('.eb-pdf-sheet');

    // Wait for logo image to decode
    const imgs = sheetEl.querySelectorAll('img');
    await Promise.all(Array.from(imgs).map(img => img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; img.onerror = res; })));

    const canvas = await h2c(sheetEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    const pageW = pdf.internal.pageSize.getWidth(); // 297mm
    const pageH = pdf.internal.pageSize.getHeight(); // 210mm
    const margin = 8;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;

    let renderW = maxW;
    let renderH = (canvas.height * renderW) / canvas.width;
    if (renderH > maxH) {
      renderH = maxH;
      renderW = (canvas.width * renderH) / canvas.height;
    }
    const x = (pageW - renderW) / 2;
    const y = (pageH - renderH) / 2;

    pdf.addImage(imgData, 'PNG', x, y, renderW, renderH);
    const safeDate = (bill.sheetDate || new Date().toISOString().slice(0, 10)).replace(/[^a-zA-Z0-9_-]/g, '_');
    pdf.save(`Expenses_Against_Revenue_Bill_${safeDate}.pdf`);
    flashToast('PDF downloaded successfully! 📄');
  } catch (err) {
    console.error('Expense Bill PDF Error:', err);
    flashToast('Failed to generate PDF: ' + err.message, true);
  } finally {
    stage.remove();
    if (btn) {
      btn.disabled = false;
      btn.textContent = oldText;
    }
  }
}

async function printExpenseBill(bill) {
  const logoDataUrl = await getLogoDataUrl();
  const html = buildPrintableSheetHTML(bill, logoDataUrl);
  const win = window.open('', '_blank', 'width=1150,height=780');
  if (!win) {
    flashToast('Popup blocked. Please allow popups to print.', true);
    return;
  }
  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Expenses Against Revenue Bill - ${escapeHtml(formatDisplayDate(bill.sheetDate || ''))}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body { margin: 0; padding: 0; background: #fff; display: flex; justify-content: center; }
          .eb-pdf-sheet { width: 100% !important; max-width: 1050px !important; }
        </style>
      </head>
      <body>
        ${html}
        <script>
          window.onload = function() {
            setTimeout(function() { window.focus(); window.print(); }, 300);
          };
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

export async function initExpenseBills(container) {
  if (!container) return;

  const state = {
    bills: [],
    loading: true,
    view: 'list', // 'list' | 'editor'
    editingBill: null,
    search: ''
  };

  async function loadBills() {
    state.loading = true;
    render();
    try {
      const data = await apiGet('/expense-bills');
      state.bills = Array.isArray(data) ? data : [];
    } catch (err) {
      flashToast('Failed to load expense bills: ' + err.message, true);
      state.bills = [];
    } finally {
      state.loading = false;
      render();
    }
  }

  function startNewSheet() {
    state.editingBill = {
      _id: null,
      sheetDate: new Date().toISOString().slice(0, 10),
      rows: emptyRows(7),
      preparedBy: 'Varsha Jyotishi',
      checkedBy: 'Urna Banerji',
      approvedBy: 'Aashit shah',
      attachmentNote: 'Attachment Vendor Bill',
      attachments: []
    };
    state.view = 'editor';
    render();
  }

  function startEditSheet(bill) {
    const clonedRows = Array.isArray(bill.rows) && bill.rows.length > 0
      ? bill.rows.map((r, i) => ({
          srNo: i + 1,
          date: r.date || '',
          vendorName: r.vendorName || '',
          billNo: r.billNo || '',
          amount: r.amount !== null && r.amount !== undefined ? r.amount : '',
          particulars: r.particulars || '',
          originalBillReceived: r.originalBillReceived || '',
          remarks: r.remarks || ''
        }))
      : emptyRows(7);

    state.editingBill = {
      _id: bill._id,
      sheetDate: bill.sheetDate || '',
      rows: clonedRows,
      preparedBy: bill.preparedBy ?? 'Varsha Jyotishi',
      checkedBy: bill.checkedBy ?? 'Urna Banerji',
      approvedBy: bill.approvedBy ?? 'Aashit shah',
      attachmentNote: bill.attachmentNote ?? 'Attachment Vendor Bill',
      attachments: Array.isArray(bill.attachments) ? [...bill.attachments] : []
    };
    state.view = 'editor';
    render();
  }

  function renderListView() {
    const q = state.search.toLowerCase().trim();
    const filtered = state.bills.filter(b => {
      if (!q) return true;
      const hay = [
        b.sheetDate,
        b.preparedBy,
        b.checkedBy,
        b.approvedBy,
        ...(Array.isArray(b.rows) ? b.rows.flatMap(r => [r.vendorName, r.billNo, r.particulars, r.remarks]) : [])
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });

    const totalSheets = state.bills.length;
    const grandTotal = state.bills.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const totalEntries = state.bills.reduce((sum, b) => {
      const filled = (b.rows || []).filter(r => r.vendorName || r.billNo || r.amount || r.particulars).length;
      return sum + filled;
    }, 0);

    container.innerHTML = `
      <div class="eb-wrap" style="max-width:1280px;margin:0 auto;">
        <div class="section-header" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;">
          <div>
            <h2 style="margin:0;font-size:20px;font-weight:800;color:var(--text-1);display:flex;align-items:center;gap:8px;">
              <span>🧾</span> Expenses Against Revenue Bill
            </h2>
            <div style="font-size:12.5px;color:var(--text-3);margin-top:2px;">
              Admin-only expense voucher sheets — fill, edit, attach vendor bills & export landscape PDF with CI 360° logo
            </div>
          </div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <input type="text" id="ebSearchInput" class="input" placeholder="🔍 Search vendor, bill no, date..." value="${escapeHtml(state.search)}" style="width:240px;font-size:12.5px;">
            <button type="button" id="ebNewBtn" class="btn primary">+ New Expense Bill Sheet</button>
          </div>
        </div>

        <div class="kpi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">Saved Sheets</div>
            <div class="kpi-value">${totalSheets}</div>
            <div class="kpi-sub">Expense against revenue records</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Billed Expenses</div>
            <div class="kpi-value">${fmtINR(grandTotal)}</div>
            <div class="kpi-sub">Across all saved sheets</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Bill Entries</div>
            <div class="kpi-value">${totalEntries}</div>
            <div class="kpi-sub">Line items logged</div>
          </div>
        </div>

        ${state.loading ? `<div class="empty">Loading expense bill sheets…</div>` : filtered.length === 0 ? `
          <div class="card" style="padding:42px 24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:10px;">🧾</div>
            <h3 style="margin:0 0 6px;color:var(--text-1);">No Expense Against Revenue Bills Yet</h3>
            <p style="margin:0 0 16px;color:var(--text-3);font-size:13px;">Create your first sheet to log vendor bills, approvals, and export a formatted landscape PDF.</p>
            <button type="button" id="ebEmptyNewBtn" class="btn primary">+ Create First Sheet</button>
          </div>
        ` : `
          <div class="card" style="overflow-x:auto;">
            <table class="table" style="width:100%;min-width:760px;">
              <thead>
                <tr>
                  <th>Sheet Date</th>
                  <th>Vendors / Entries</th>
                  <th>Total Amount</th>
                  <th>Prepared / Checked / Approved</th>
                  <th>Updated</th>
                  <th style="text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(b => {
                  const filledRows = (b.rows || []).filter(r => r.vendorName || r.billNo || r.amount || r.particulars);
                  const vendorsPreview = filledRows.map(r => r.vendorName).filter(Boolean).slice(0, 3).join(', ') || 'Empty draft';
                  return `
                    <tr>
                      <td style="font-weight:700;white-space:nowrap;">${escapeHtml(formatDisplayDate(b.sheetDate) || '—')}</td>
                      <td>
                        <div style="font-weight:600;color:var(--text-1);">${escapeHtml(vendorsPreview)}${filledRows.length > 3 ? ` +${filledRows.length - 3} more` : ''}</div>
                        <div style="font-size:11.5px;color:var(--text-3);">${filledRows.length} item${filledRows.length === 1 ? '' : 's'}</div>
                      </td>
                      <td style="font-weight:800;color:var(--accent);white-space:nowrap;">${fmtINR(b.totalAmount || 0)}</td>
                      <td style="font-size:12px;color:var(--text-2);line-height:1.4;">
                        <div><strong>Prep:</strong> ${escapeHtml(b.preparedBy || '—')}</div>
                        <div><strong>Chk:</strong> ${escapeHtml(b.checkedBy || '—')} · <strong>Appr:</strong> ${escapeHtml(b.approvedBy || '—')}</div>
                      </td>
                      <td style="font-size:11.5px;color:var(--text-3);white-space:nowrap;">${b.updatedAt ? new Date(b.updatedAt).toLocaleDateString('en-IN') : '—'}</td>
                      <td style="text-align:right;white-space:nowrap;">
                        <div style="display:inline-flex;gap:6px;">
                          <button type="button" class="btn small ghost eb-edit-btn" data-id="${b._id}">✏️ Edit</button>
                          <button type="button" class="btn small primary eb-pdf-btn" data-id="${b._id}">📄 PDF</button>
                          <button type="button" class="btn small ghost eb-print-btn" data-id="${b._id}" title="Print">🖨️</button>
                          <button type="button" class="btn small danger eb-del-btn" data-id="${b._id}" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;

    const searchInp = container.querySelector('#ebSearchInput');
    if (searchInp) {
      searchInp.oninput = (e) => {
        state.search = e.target.value;
        const pos = e.target.selectionStart;
        render();
        const nextInp = container.querySelector('#ebSearchInput');
        if (nextInp) {
          nextInp.focus();
          try { nextInp.setSelectionRange(pos, pos); } catch (_) {}
        }
      };
    }

    const newBtn = container.querySelector('#ebNewBtn');
    const emptyNewBtn = container.querySelector('#ebEmptyNewBtn');
    if (newBtn) newBtn.onclick = startNewSheet;
    if (emptyNewBtn) emptyNewBtn.onclick = startNewSheet;

    container.querySelectorAll('.eb-edit-btn').forEach(btn => {
      btn.onclick = () => {
        const b = state.bills.find(x => String(x._id) === String(btn.dataset.id));
        if (b) startEditSheet(b);
      };
    });

    container.querySelectorAll('.eb-pdf-btn').forEach(btn => {
      btn.onclick = () => {
        const b = state.bills.find(x => String(x._id) === String(btn.dataset.id));
        if (b) downloadExpenseBillPdf(b, btn);
      };
    });

    container.querySelectorAll('.eb-print-btn').forEach(btn => {
      btn.onclick = () => {
        const b = state.bills.find(x => String(x._id) === String(btn.dataset.id));
        if (b) printExpenseBill(b);
      };
    });

    container.querySelectorAll('.eb-del-btn').forEach(btn => {
      btn.onclick = async () => {
        if (!confirm('Are you sure you want to delete this Expense Against Revenue Bill sheet?')) return;
        try {
          await apiDelete(`/expense-bills/${btn.dataset.id}`);
          flashToast('Expense bill sheet deleted');
          await loadBills();
        } catch (err) {
          flashToast('Delete failed: ' + err.message, true);
        }
      };
    });
  }

  function readEditorDOMIntoState() {
    const b = state.editingBill;
    if (!b) return b;
    const sheetDateEl = container.querySelector('#ebSheetDate');
    const prepEl = container.querySelector('#ebPreparedBy');
    const chkEl = container.querySelector('#ebCheckedBy');
    const apprEl = container.querySelector('#ebApprovedBy');
    const attNoteEl = container.querySelector('#ebAttachmentNote');

    if (sheetDateEl) b.sheetDate = sheetDateEl.value;
    if (prepEl) b.preparedBy = prepEl.value;
    if (chkEl) b.checkedBy = chkEl.value;
    if (apprEl) b.approvedBy = apprEl.value;
    if (attNoteEl) b.attachmentNote = attNoteEl.value;

    const rowEls = container.querySelectorAll('.eb-editor-row');
    b.rows = Array.from(rowEls).map((tr, i) => ({
      srNo: i + 1,
      date: tr.querySelector('.eb-r-date')?.value || '',
      vendorName: tr.querySelector('.eb-r-vendor')?.value || '',
      billNo: tr.querySelector('.eb-r-billno')?.value || '',
      amount: tr.querySelector('.eb-r-amount')?.value ?? '',
      particulars: tr.querySelector('.eb-r-part')?.value || '',
      originalBillReceived: tr.querySelector('.eb-r-orig')?.value || '',
      remarks: tr.querySelector('.eb-r-remarks')?.value || ''
    }));
    return b;
  }

  function updateTotalDisplay() {
    const b = state.editingBill;
    if (!b) return;
    const amounts = container.querySelectorAll('.eb-r-amount');
    let total = 0;
    amounts.forEach(inp => {
      const n = Number(inp.value);
      if (!isNaN(n) && inp.value !== '') total += n;
    });
    const totalEl = container.querySelector('#ebLiveTotal');
    if (totalEl) totalEl.textContent = fmtINR(total);
  }

  function renderEditorView() {
    const b = state.editingBill;
    if (!b) return;

    const total = (b.rows || []).reduce((s, r) => s + (r.amount !== '' && r.amount != null && !isNaN(Number(r.amount)) ? Number(r.amount) : 0), 0);

    container.innerHTML = `
      <div class="eb-editor-wrap" style="max-width:1320px;margin:0 auto;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <button type="button" id="ebBackBtn" class="btn ghost small">← Back to List</button>
            <h2 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${b._id ? 'Edit Expense Against Revenue Bill' : 'New Expense Against Revenue Bill'}
            </h2>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="ebPrintEditorBtn" class="btn ghost small">🖨️ Print</button>
            <button type="button" id="ebPdfEditorBtn" class="btn ghost small" style="border-color:var(--accent);color:var(--accent);">📄 Download PDF</button>
            <button type="button" id="ebSaveBtn" class="btn primary small">💾 Save Sheet</button>
          </div>
        </div>

        <!-- Paper-like Interactive Form -->
        <div class="card" style="padding:18px;overflow-x:auto;">
          <div style="min-width:980px;border:1.5px solid var(--border-md);border-radius:8px;overflow:hidden;">
            <!-- Header Bar matching printed layout -->
            <div style="display:grid;grid-template-columns:110px 1fr 220px;border-bottom:1.5px solid var(--border-md);background:var(--bg-elevated);">
              <div style="padding:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:1.5px solid var(--border-md);">
                <img src="${PROPOSAL_LOGO_DATA_URI}" alt="CI 360°" style="width:42px;height:42px;object-fit:contain;margin-bottom:3px;" />
                <span style="font-size:11.5px;font-weight:800;color:#0284c7;">CI <span style="color:#06b6d4;">360°</span></span>
              </div>
              <div style="padding:12px;display:flex;align-items:center;justify-content:center;border-right:1.5px solid var(--border-md);">
                <span style="font-size:17px;font-weight:800;letter-spacing:0.6px;color:var(--text-1);text-transform:uppercase;">
                  EXPENSES AGAINST REVENUE BILL
                </span>
              </div>
              <div style="padding:10px 14px;display:flex;align-items:center;gap:8px;">
                <label for="ebSheetDate" style="font-size:12.5px;font-weight:700;color:var(--text-1);white-space:nowrap;margin:0;">Date:</label>
                <input type="date" id="ebSheetDate" class="input" value="${escapeHtml(b.sheetDate || '')}" style="padding:5px 8px;font-size:12.5px;">
              </div>
            </div>

            <!-- Table Grid -->
            <table class="eb-editor-table" style="width:100%;border-collapse:collapse;table-layout:fixed;">
              <colgroup>
                <col style="width:58px;">
                <col style="width:128px;">
                <col style="width:160px;">
                <col style="width:108px;">
                <col style="width:112px;">
                <col style="width:185px;">
                <col style="width:148px;">
                <col style="width:138px;">
                <col style="width:42px;">
              </colgroup>
              <thead>
                <tr style="background:rgba(148,163,184,0.22);border-bottom:1.5px solid var(--border-md);">
                  <th style="padding:9px 4px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Sr. No.</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Date</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Vendor Name</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Bill No.</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Amount (₹)</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Activity / Particulars</th>
                  <th style="padding:9px 6px;font-size:11px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);line-height:1.25;white-space:normal !important;word-break:break-word;">Original Bill<br/>Received (Yes / No)</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);white-space:normal !important;word-break:break-word;">Remarks</th>
                  <th style="padding:9px 4px;font-size:11px;text-align:center;white-space:normal !important;"></th>
                </tr>
              </thead>
              <tbody>
                ${b.rows.map((r, idx) => `
                  <tr class="eb-editor-row" style="border-bottom:1px solid var(--border-sm);">
                    <td style="padding:6px;text-align:center;font-weight:700;font-size:12.5px;border-right:1px solid var(--border-sm);">${idx + 1}</td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="date" class="input eb-r-date" value="${escapeHtml(r.date || '')}" style="padding:5px 6px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-vendor" placeholder="Vendor name..." value="${escapeHtml(r.vendorName || '')}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-billno" placeholder="Bill no..." value="${escapeHtml(r.billNo || '')}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="number" step="0.01" class="input eb-r-amount" placeholder="0" value="${r.amount !== '' && r.amount != null ? escapeHtml(String(r.amount)) : ''}" style="padding:5px 7px;font-size:12px;text-align:right;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <select class="input eb-r-part" style="padding:5px 6px;font-size:12px;">
                        <option value="" ${!r.particulars ? 'selected' : ''}>— Select Activity —</option>
                        ${['SEO Optimization', 'Creators & Reels', 'Makeup', 'Collaboration'].map(opt => `
                          <option value="${escapeHtml(opt)}" ${r.particulars === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>
                        `).join('')}
                        ${r.particulars && !['SEO Optimization', 'Creators & Reels', 'Makeup', 'Collaboration'].includes(r.particulars) ? `
                          <option value="${escapeHtml(r.particulars)}" selected>${escapeHtml(r.particulars)}</option>
                        ` : ''}
                      </select>
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <select class="input eb-r-orig" style="padding:5px 6px;font-size:12px;">
                        <option value="" ${!r.originalBillReceived ? 'selected' : ''}>— Select —</option>
                        <option value="Yes" ${r.originalBillReceived === 'Yes' ? 'selected' : ''}>Yes</option>
                        <option value="No" ${r.originalBillReceived === 'No' ? 'selected' : ''}>No</option>
                      </select>
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-remarks" placeholder="Remarks..." value="${escapeHtml(r.remarks || '')}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;text-align:center;">
                      <button type="button" class="btn ghost small eb-remove-row-btn" data-idx="${idx}" title="Remove row" style="padding:3px 7px;color:#ef4444;font-weight:800;">×</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <!-- Row Add & Total Bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(100,116,139,0.16);border-top:1px solid var(--border-md);border-bottom:1px solid var(--border-md);">
              <button type="button" id="ebAddRowBtn" class="btn small ghost" style="border:1px dashed var(--accent);color:var(--accent);font-weight:700;">+ Add Row</button>
              <div style="font-size:13.5px;font-weight:800;color:var(--text-1);">
                Total Amount: <span id="ebLiveTotal" style="color:var(--accent);margin-left:6px;">${fmtINR(total)}</span>
              </div>
            </div>

            <!-- Sign-off Boxes -->
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:18px;padding:16px;">
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Prepared by :-</label>
                <input type="text" id="ebPreparedBy" class="input" value="${escapeHtml(b.preparedBy ?? 'Varsha Jyotishi')}" style="font-size:12.5px;font-weight:600;">
              </div>
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Checked by :-</label>
                <input type="text" id="ebCheckedBy" class="input" value="${escapeHtml(b.checkedBy ?? 'Urna Banerji')}" style="font-size:12.5px;font-weight:600;">
              </div>
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Approved by :-</label>
                <input type="text" id="ebApprovedBy" class="input" value="${escapeHtml(b.approvedBy ?? 'Aashit shah')}" style="font-size:12.5px;font-weight:600;">
              </div>
            </div>
          </div>

          <!-- Attachment Vendor Bill Section -->
          <div style="margin-top:16px;padding:14px;border:1px solid var(--border-sm);border-radius:8px;background:var(--bg-elevated);">
            <div style="margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <label for="ebAttachmentNote" style="font-size:12.5px;font-weight:700;color:var(--text-1);margin:0;">Footer Note:</label>
              <input type="text" id="ebAttachmentNote" class="input" value="${escapeHtml(b.attachmentNote ?? 'Attachment Vendor Bill')}" style="max-width:320px;font-size:12.5px;">
            </div>
            ${renderAttachmentUploader({
              id: 'eb-attachments-uploader',
              label: 'Attachment Vendor Bills (Optional Files / Scans)',
              subtitle: 'Upload vendor bill images or PDF scans for reference'
            })}
          </div>
        </div>
      </div>
    `;

    bindAttachmentUploader('eb-attachments-uploader', {
      existing: Array.isArray(b.attachments) ? b.attachments : []
    });

    container.querySelector('#ebBackBtn').onclick = () => {
      state.view = 'list';
      state.editingBill = null;
      render();
    };

    container.querySelectorAll('.eb-r-amount').forEach(inp => {
      inp.addEventListener('input', updateTotalDisplay);
    });

    container.querySelector('#ebAddRowBtn').onclick = () => {
      readEditorDOMIntoState();
      b.attachments = getUploaderAttachments('eb-attachments-uploader');
      b.rows.push({
        srNo: b.rows.length + 1,
        date: '',
        vendorName: '',
        billNo: '',
        amount: '',
        particulars: '',
        originalBillReceived: '',
        remarks: ''
      });
      render();
    };

    container.querySelectorAll('.eb-remove-row-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        readEditorDOMIntoState();
        b.attachments = getUploaderAttachments('eb-attachments-uploader');
        const idx = parseInt(btn.dataset.idx, 10);
        if (b.rows.length <= 1) {
          b.rows = emptyRows(1);
        } else if (!isNaN(idx) && idx >= 0 && idx < b.rows.length) {
          b.rows.splice(idx, 1);
        }
        render();
      };
    });

    const saveSheet = async () => {
      readEditorDOMIntoState();
      b.attachments = getUploaderAttachments('eb-attachments-uploader');
      const saveBtn = container.querySelector('#ebSaveBtn');
      const oldTxt = saveBtn.textContent;
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving…';

      try {
        const payload = {
          sheetDate: b.sheetDate,
          rows: b.rows,
          preparedBy: b.preparedBy,
          checkedBy: b.checkedBy,
          approvedBy: b.approvedBy,
          attachmentNote: b.attachmentNote,
          attachments: b.attachments
        };
        let saved;
        if (b._id) {
          saved = await apiPut(`/expense-bills/${b._id}`, payload);
          flashToast('Expense bill sheet updated! ✓');
        } else {
          saved = await apiPost('/expense-bills', payload);
          b._id = saved._id;
          flashToast('Expense bill sheet saved! ✓');
        }
        // Refresh list in background
        apiGet('/expense-bills').then(d => { if (Array.isArray(d)) state.bills = d; }).catch(() => {});
        return saved;
      } catch (err) {
        flashToast('Failed to save: ' + err.message, true);
        return null;
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = oldTxt;
      }
    };

    container.querySelector('#ebSaveBtn').onclick = saveSheet;

    container.querySelector('#ebPdfEditorBtn').onclick = async (e) => {
      readEditorDOMIntoState();
      await downloadExpenseBillPdf(b, e.currentTarget);
    };

    container.querySelector('#ebPrintEditorBtn').onclick = async () => {
      readEditorDOMIntoState();
      await printExpenseBill(b);
    };
  }

  function render() {
    if (state.view === 'editor') {
      renderEditorView();
    } else {
      renderListView();
    }
  }

  await loadBills();
}
