import{c as de,k as q,e as A,g as X,l as Be,q as De,s as Ne,m as ze,j as qe,f as Re,d as Pe,t as _e,u as He,n as Me,o as Le,D as J,v as Se,w as ae,x as Ue,y as je}from"./api-C80ftWJy.js";import{initProposalStudio as Fe}from"./proposals-Cyu6lGlT.js";import{i as Oe,a as Je,b as Ve}from"./supporttickets-DhrmnRx4.js";const ce={html2canvas:"https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",jspdf:"https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"};function pe(t,s){return s&&window[s]?Promise.resolve(window[s]):new Promise((e,a)=>{const o=document.querySelector(`script[src="${t}"]`);if(o){if(s&&window[s])return e(window[s]);o.addEventListener("load",()=>e(s?window[s]:!0)),o.addEventListener("error",()=>a(new Error("Failed to load "+t)));return}const i=document.createElement("script");i.src=t,i.async=!0,i.onload=()=>e(s?window[s]:!0),i.onerror=()=>a(new Error("Failed to load "+t)),document.head.appendChild(i)})}let Z=null;async function $e(){if(Z)return Z;try{const s=await(await fetch("/logo.png")).blob();return await new Promise(e=>{const a=new FileReader;a.onloadend=()=>{Z=a.result,e(Z)},a.onerror=()=>e("/logo.png"),a.readAsDataURL(s)})}catch{return"/logo.png"}}function ie(t=7){return Array.from({length:t},(s,e)=>({srNo:e+1,date:"",vendorName:"",billNo:"",amount:"",particulars:"",originalBillReceived:"",remarks:""}))}function te(t){if(!t)return"";const s=String(t).trim(),e=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);return e?`${e[3]}-${e[2]}-${e[1]}`:s}function ue(t){return t===""||t===null||t===void 0||isNaN(Number(t))?"":"₹ "+Number(t).toLocaleString("en-IN",{minimumFractionDigits:0,maximumFractionDigits:2})}function ke(t,s){const e=Array.isArray(t.rows)?t.rows:[],a=Math.max(7,e.length),o=[];for(let l=0;l<a;l++){const c=e[l]||{};o.push({srNo:l+1,date:te(c.date||""),vendorName:c.vendorName||"",billNo:c.billNo||"",amount:ue(c.amount),particulars:c.particulars||"",originalBillReceived:c.originalBillReceived||"",remarks:c.remarks||""})}const i=e.reduce((l,c)=>l+(c.amount!==""&&c.amount!=null&&!isNaN(Number(c.amount))?Number(c.amount):0),0);return`
    <div class="eb-pdf-sheet" style="width:1050px;background:#ffffff;color:#111827;font-family:Arial,Helvetica,sans-serif;padding:24px 28px;box-sizing:border-box;">
      <table style="width:100%;border-collapse:collapse;border:1.5px solid #1f2937;table-layout:fixed;">
        <colgroup>
          <col style="width:6%;">
          <col style="width:11%;">
          <col style="width:16%;">
          <col style="width:10%;">
          <col style="width:11%;">
          <col style="width:19%;">
          <col style="width:14%;">
          <col style="width:13%;">
        </colgroup>
        <!-- Top Header Row -->
        <tr>
          <td colspan="1" style="border:1.2px solid #1f2937;padding:8px 6px;text-align:center;vertical-align:middle;background:#ffffff;">
            <img src="${s}" alt="CI 360" style="width:36px;height:36px;object-fit:contain;display:block;margin:0 auto 2px;" />
            <div style="font-size:10px;font-weight:700;color:#111827;letter-spacing:0.3px;">CI 360°</div>
          </td>
          <td colspan="5" style="border:1.2px solid #1f2937;padding:12px 10px;text-align:center;vertical-align:middle;background:#ffffff;">
            <div style="font-size:18px;font-weight:800;letter-spacing:0.8px;color:#111827;text-transform:uppercase;">
              EXPENSES AGAINST REVENUE BILL
            </div>
          </td>
          <td colspan="2" style="border:1.2px solid #1f2937;padding:10px 12px;text-align:left;vertical-align:middle;background:#ffffff;font-size:13px;font-weight:700;color:#111827;">
            Date: <span style="font-weight:600;margin-left:6px;">${A(te(t.sheetDate||""))}</span>
          </td>
        </tr>

        <!-- Column Headers -->
        <tr style="background:#9ca3af;">
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Sr. No.</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Date</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Vendor Name</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Bill No.</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Amount (₹)</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Activity / Particulars</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:11.5px;font-weight:700;color:#111827;text-align:center;line-height:1.25;">Original Bill<br/>Received (Yes / No)</th>
          <th style="border:1.2px solid #1f2937;padding:9px 5px;font-size:12px;font-weight:700;color:#111827;text-align:center;">Remarks</th>
        </tr>

        <!-- Data Rows -->
        ${o.map(l=>`
          <tr style="height:34px;background:#ffffff;">
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;">${l.srNo}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;">${A(l.date)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;word-break:break-word;">${A(l.vendorName)}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;word-break:break-word;">${A(l.billNo)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:right;color:#111827;font-weight:600;">${A(l.amount)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;word-break:break-word;">${A(l.particulars)}</td>
            <td style="border:1px solid #1f2937;padding:6px 6px;font-size:12px;text-align:center;color:#111827;font-weight:600;">${A(l.originalBillReceived)}</td>
            <td style="border:1px solid #1f2937;padding:6px 8px;font-size:12px;text-align:left;color:#111827;word-break:break-word;">${A(l.remarks)}</td>
          </tr>
        `).join("")}

        <!-- Grey Divider / Total Bar -->
        <tr style="background:#6b7280;height:22px;">
          <td colspan="4" style="border:1px solid #1f2937;padding:4px 10px;font-size:11.5px;font-weight:700;color:#ffffff;text-align:right;">
            ${i>0?"Total Amount :":""}
          </td>
          <td style="border:1px solid #1f2937;padding:4px 8px;font-size:12px;font-weight:800;color:#ffffff;text-align:right;">
            ${i>0?A(ue(i)):""}
          </td>
          <td colspan="3" style="border:1px solid #1f2937;padding:4px 8px;"></td>
        </tr>

        <!-- Signature / Approval Row -->
        <tr style="height:68px;background:#ffffff;">
          <td colspan="8" style="border:1.2px solid #1f2937;padding:12px 16px;vertical-align:bottom;">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;width:100%;">
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Prepared by :- ${A(t.preparedBy||"Varsha Jyotishi")}
              </div>
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Checked by :- ${A(t.checkedBy||"Urna Banerji")}
              </div>
              <div style="flex:1;border:1.2px solid #1f2937;padding:18px 12px 8px;text-align:center;font-size:12.5px;font-weight:700;color:#111827;">
                Approved by :- ${A(t.approvedBy||"Aashit shah")}
              </div>
            </div>
          </td>
        </tr>
      </table>

      <div style="margin-top:8px;font-size:13px;font-weight:600;color:#111827;">
        ${A(t.attachmentNote||"Attachment Vendor Bill")}
      </div>
    </div>
  `}async function me(t,s){const e=s?s.textContent:"";s&&(s.disabled=!0,s.textContent="Generating PDF…");const a=document.createElement("div");a.style.cssText="position:fixed;top:-99999px;left:-99999px;width:1050px;background:#ffffff;z-index:-1;",document.body.appendChild(a);try{const[o,i,l]=await Promise.all([pe(ce.html2canvas,"html2canvas"),pe(ce.jspdf,"jspdf"),$e()]),{jsPDF:c}=i||window.jspdf;a.innerHTML=ke(t,l);const b=a.querySelector(".eb-pdf-sheet"),d=b.querySelectorAll("img");await Promise.all(Array.from(d).map(P=>P.complete?Promise.resolve():new Promise(h=>{P.onload=h,P.onerror=h})));const n=await o(b,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1}),r=n.toDataURL("image/png"),g=new c({unit:"mm",format:"a4",orientation:"landscape"}),p=g.internal.pageSize.getWidth(),f=g.internal.pageSize.getHeight(),y=8,u=p-y*2,v=f-y*2;let m=u,x=n.height*m/n.width;x>v&&(x=v,m=n.width*x/n.height);const k=(p-m)/2,E=(f-x)/2;g.addImage(r,"PNG",k,E,m,x);const O=(t.sheetDate||new Date().toISOString().slice(0,10)).replace(/[^a-zA-Z0-9_-]/g,"_");g.save(`Expenses_Against_Revenue_Bill_${O}.pdf`),q("PDF downloaded successfully! 📄")}catch(o){console.error("Expense Bill PDF Error:",o),q("Failed to generate PDF: "+o.message,!0)}finally{a.remove(),s&&(s.disabled=!1,s.textContent=e)}}async function ve(t){const s=await $e(),e=ke(t,s),a=window.open("","_blank","width=1150,height=780");if(!a){q("Popup blocked. Please allow popups to print.",!0);return}a.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Expenses Against Revenue Bill - ${A(te(t.sheetDate||""))}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          body { margin: 0; padding: 0; background: #fff; display: flex; justify-content: center; }
          .eb-pdf-sheet { width: 100% !important; max-width: 1050px !important; }
        </style>
      </head>
      <body>
        ${e}
        <script>
          window.onload = function() {
            setTimeout(function() { window.focus(); window.print(); }, 300);
          };
        <\/script>
      </body>
    </html>
  `),a.document.close()}async function Ge(t){if(!t)return;const s={bills:[],loading:!0,view:"list",editingBill:null,search:""};async function e(){s.loading=!0,d();try{const n=await de("/expense-bills");s.bills=Array.isArray(n)?n:[]}catch(n){q("Failed to load expense bills: "+n.message,!0),s.bills=[]}finally{s.loading=!1,d()}}function a(){s.editingBill={_id:null,sheetDate:new Date().toISOString().slice(0,10),rows:ie(7),preparedBy:"Varsha Jyotishi",checkedBy:"Urna Banerji",approvedBy:"Aashit shah",attachmentNote:"Attachment Vendor Bill",attachments:[]},s.view="editor",d()}function o(n){const r=Array.isArray(n.rows)&&n.rows.length>0?n.rows.map((g,p)=>({srNo:p+1,date:g.date||"",vendorName:g.vendorName||"",billNo:g.billNo||"",amount:g.amount!==null&&g.amount!==void 0?g.amount:"",particulars:g.particulars||"",originalBillReceived:g.originalBillReceived||"",remarks:g.remarks||""})):ie(7);s.editingBill={_id:n._id,sheetDate:n.sheetDate||"",rows:r,preparedBy:n.preparedBy??"Varsha Jyotishi",checkedBy:n.checkedBy??"Urna Banerji",approvedBy:n.approvedBy??"Aashit shah",attachmentNote:n.attachmentNote??"Attachment Vendor Bill",attachments:Array.isArray(n.attachments)?[...n.attachments]:[]},s.view="editor",d()}function i(){const n=s.search.toLowerCase().trim(),r=s.bills.filter(m=>n?[m.sheetDate,m.preparedBy,m.checkedBy,m.approvedBy,...Array.isArray(m.rows)?m.rows.flatMap(k=>[k.vendorName,k.billNo,k.particulars,k.remarks]):[]].filter(Boolean).join(" ").toLowerCase().includes(n):!0),g=s.bills.length,p=s.bills.reduce((m,x)=>m+(Number(x.totalAmount)||0),0),f=s.bills.reduce((m,x)=>{const k=(x.rows||[]).filter(E=>E.vendorName||E.billNo||E.amount||E.particulars).length;return m+k},0);t.innerHTML=`
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
            <input type="text" id="ebSearchInput" class="input" placeholder="🔍 Search vendor, bill no, date..." value="${A(s.search)}" style="width:240px;font-size:12.5px;">
            <button type="button" id="ebNewBtn" class="btn primary">+ New Expense Bill Sheet</button>
          </div>
        </div>

        <div class="kpi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px;">
          <div class="kpi-card">
            <div class="kpi-label">Saved Sheets</div>
            <div class="kpi-value">${g}</div>
            <div class="kpi-sub">Expense against revenue records</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Billed Expenses</div>
            <div class="kpi-value">${X(p)}</div>
            <div class="kpi-sub">Across all saved sheets</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Bill Entries</div>
            <div class="kpi-value">${f}</div>
            <div class="kpi-sub">Line items logged</div>
          </div>
        </div>

        ${s.loading?'<div class="empty">Loading expense bill sheets…</div>':r.length===0?`
          <div class="card" style="padding:42px 24px;text-align:center;">
            <div style="font-size:36px;margin-bottom:10px;">🧾</div>
            <h3 style="margin:0 0 6px;color:var(--text-1);">No Expense Against Revenue Bills Yet</h3>
            <p style="margin:0 0 16px;color:var(--text-3);font-size:13px;">Create your first sheet to log vendor bills, approvals, and export a formatted landscape PDF.</p>
            <button type="button" id="ebEmptyNewBtn" class="btn primary">+ Create First Sheet</button>
          </div>
        `:`
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
                ${r.map(m=>{const x=(m.rows||[]).filter(E=>E.vendorName||E.billNo||E.amount||E.particulars),k=x.map(E=>E.vendorName).filter(Boolean).slice(0,3).join(", ")||"Empty draft";return`
                    <tr>
                      <td style="font-weight:700;white-space:nowrap;">${A(te(m.sheetDate)||"—")}</td>
                      <td>
                        <div style="font-weight:600;color:var(--text-1);">${A(k)}${x.length>3?` +${x.length-3} more`:""}</div>
                        <div style="font-size:11.5px;color:var(--text-3);">${x.length} item${x.length===1?"":"s"}</div>
                      </td>
                      <td style="font-weight:800;color:var(--accent);white-space:nowrap;">${X(m.totalAmount||0)}</td>
                      <td style="font-size:12px;color:var(--text-2);line-height:1.4;">
                        <div><strong>Prep:</strong> ${A(m.preparedBy||"—")}</div>
                        <div><strong>Chk:</strong> ${A(m.checkedBy||"—")} · <strong>Appr:</strong> ${A(m.approvedBy||"—")}</div>
                      </td>
                      <td style="font-size:11.5px;color:var(--text-3);white-space:nowrap;">${m.updatedAt?new Date(m.updatedAt).toLocaleDateString("en-IN"):"—"}</td>
                      <td style="text-align:right;white-space:nowrap;">
                        <div style="display:inline-flex;gap:6px;">
                          <button type="button" class="btn small ghost eb-edit-btn" data-id="${m._id}">✏️ Edit</button>
                          <button type="button" class="btn small primary eb-pdf-btn" data-id="${m._id}">📄 PDF</button>
                          <button type="button" class="btn small ghost eb-print-btn" data-id="${m._id}" title="Print">🖨️</button>
                          <button type="button" class="btn small danger eb-del-btn" data-id="${m._id}" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;const y=t.querySelector("#ebSearchInput");y&&(y.oninput=m=>{s.search=m.target.value;const x=m.target.selectionStart;d();const k=t.querySelector("#ebSearchInput");if(k){k.focus();try{k.setSelectionRange(x,x)}catch{}}});const u=t.querySelector("#ebNewBtn"),v=t.querySelector("#ebEmptyNewBtn");u&&(u.onclick=a),v&&(v.onclick=a),t.querySelectorAll(".eb-edit-btn").forEach(m=>{m.onclick=()=>{const x=s.bills.find(k=>String(k._id)===String(m.dataset.id));x&&o(x)}}),t.querySelectorAll(".eb-pdf-btn").forEach(m=>{m.onclick=()=>{const x=s.bills.find(k=>String(k._id)===String(m.dataset.id));x&&me(x,m)}}),t.querySelectorAll(".eb-print-btn").forEach(m=>{m.onclick=()=>{const x=s.bills.find(k=>String(k._id)===String(m.dataset.id));x&&ve(x)}}),t.querySelectorAll(".eb-del-btn").forEach(m=>{m.onclick=async()=>{if(confirm("Are you sure you want to delete this Expense Against Revenue Bill sheet?"))try{await Be(`/expense-bills/${m.dataset.id}`),q("Expense bill sheet deleted"),await e()}catch(x){q("Delete failed: "+x.message,!0)}}})}function l(){const n=s.editingBill;if(!n)return n;const r=t.querySelector("#ebSheetDate"),g=t.querySelector("#ebPreparedBy"),p=t.querySelector("#ebCheckedBy"),f=t.querySelector("#ebApprovedBy"),y=t.querySelector("#ebAttachmentNote");r&&(n.sheetDate=r.value),g&&(n.preparedBy=g.value),p&&(n.checkedBy=p.value),f&&(n.approvedBy=f.value),y&&(n.attachmentNote=y.value);const u=t.querySelectorAll(".eb-editor-row");return n.rows=Array.from(u).map((v,m)=>({srNo:m+1,date:v.querySelector(".eb-r-date")?.value||"",vendorName:v.querySelector(".eb-r-vendor")?.value||"",billNo:v.querySelector(".eb-r-billno")?.value||"",amount:v.querySelector(".eb-r-amount")?.value??"",particulars:v.querySelector(".eb-r-part")?.value||"",originalBillReceived:v.querySelector(".eb-r-orig")?.value||"",remarks:v.querySelector(".eb-r-remarks")?.value||""})),n}function c(){if(!s.editingBill)return;const r=t.querySelectorAll(".eb-r-amount");let g=0;r.forEach(f=>{const y=Number(f.value);!isNaN(y)&&f.value!==""&&(g+=y)});const p=t.querySelector("#ebLiveTotal");p&&(p.textContent=X(g))}function b(){const n=s.editingBill;if(!n)return;const r=(n.rows||[]).reduce((f,y)=>f+(y.amount!==""&&y.amount!=null&&!isNaN(Number(y.amount))?Number(y.amount):0),0);t.innerHTML=`
      <div class="eb-editor-wrap" style="max-width:1320px;margin:0 auto;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <button type="button" id="ebBackBtn" class="btn ghost small">← Back to List</button>
            <h2 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">
              ${n._id?"Edit Expense Against Revenue Bill":"New Expense Against Revenue Bill"}
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
                <img src="/logo.png" alt="CI 360°" style="width:36px;height:36px;object-fit:contain;margin-bottom:3px;" />
                <span style="font-size:11px;font-weight:800;color:var(--text-1);">CI 360°</span>
              </div>
              <div style="padding:12px;display:flex;align-items:center;justify-content:center;border-right:1.5px solid var(--border-md);">
                <span style="font-size:17px;font-weight:800;letter-spacing:0.6px;color:var(--text-1);text-transform:uppercase;">
                  EXPENSES AGAINST REVENUE BILL
                </span>
              </div>
              <div style="padding:10px 14px;display:flex;align-items:center;gap:8px;">
                <label for="ebSheetDate" style="font-size:12.5px;font-weight:700;color:var(--text-1);white-space:nowrap;margin:0;">Date:</label>
                <input type="date" id="ebSheetDate" class="input" value="${A(n.sheetDate||"")}" style="padding:5px 8px;font-size:12.5px;">
              </div>
            </div>

            <!-- Table Grid -->
            <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
              <colgroup>
                <col style="width:58px;">
                <col style="width:128px;">
                <col style="width:165px;">
                <col style="width:110px;">
                <col style="width:115px;">
                <col style="width:190px;">
                <col style="width:130px;">
                <col style="width:140px;">
                <col style="width:42px;">
              </colgroup>
              <thead>
                <tr style="background:rgba(148,163,184,0.22);border-bottom:1.5px solid var(--border-md);">
                  <th style="padding:9px 4px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Sr. No.</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Date</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Vendor Name</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Bill No.</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Amount (₹)</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Activity / Particulars</th>
                  <th style="padding:9px 6px;font-size:11px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);line-height:1.2;">Original Bill Received (Yes / No)</th>
                  <th style="padding:9px 6px;font-size:11.5px;font-weight:700;text-align:center;border-right:1px solid var(--border-sm);">Remarks</th>
                  <th style="padding:9px 4px;font-size:11px;text-align:center;"></th>
                </tr>
              </thead>
              <tbody>
                ${n.rows.map((f,y)=>`
                  <tr class="eb-editor-row" style="border-bottom:1px solid var(--border-sm);">
                    <td style="padding:6px;text-align:center;font-weight:700;font-size:12.5px;border-right:1px solid var(--border-sm);">${y+1}</td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="date" class="input eb-r-date" value="${A(f.date||"")}" style="padding:5px 6px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-vendor" placeholder="Vendor name..." value="${A(f.vendorName||"")}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-billno" placeholder="Bill no..." value="${A(f.billNo||"")}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="number" step="0.01" class="input eb-r-amount" placeholder="0" value="${f.amount!==""&&f.amount!=null?A(String(f.amount)):""}" style="padding:5px 7px;font-size:12px;text-align:right;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-part" placeholder="Activity / particulars..." value="${A(f.particulars||"")}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <select class="input eb-r-orig" style="padding:5px 6px;font-size:12px;">
                        <option value="" ${f.originalBillReceived?"":"selected"}>— Select —</option>
                        <option value="Yes" ${f.originalBillReceived==="Yes"?"selected":""}>Yes</option>
                        <option value="No" ${f.originalBillReceived==="No"?"selected":""}>No</option>
                      </select>
                    </td>
                    <td style="padding:4px;border-right:1px solid var(--border-sm);">
                      <input type="text" class="input eb-r-remarks" placeholder="Remarks..." value="${A(f.remarks||"")}" style="padding:5px 7px;font-size:12px;">
                    </td>
                    <td style="padding:4px;text-align:center;">
                      <button type="button" class="btn ghost small eb-remove-row-btn" data-idx="${y}" title="Remove row" style="padding:3px 7px;color:#ef4444;font-weight:800;">×</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>

            <!-- Row Add & Total Bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(100,116,139,0.16);border-top:1px solid var(--border-md);border-bottom:1px solid var(--border-md);">
              <button type="button" id="ebAddRowBtn" class="btn small ghost" style="border:1px dashed var(--accent);color:var(--accent);font-weight:700;">+ Add Row</button>
              <div style="font-size:13.5px;font-weight:800;color:var(--text-1);">
                Total Amount: <span id="ebLiveTotal" style="color:var(--accent);margin-left:6px;">${X(r)}</span>
              </div>
            </div>

            <!-- Sign-off Boxes -->
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:18px;padding:16px;">
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Prepared by :-</label>
                <input type="text" id="ebPreparedBy" class="input" value="${A(n.preparedBy??"Varsha Jyotishi")}" style="font-size:12.5px;font-weight:600;">
              </div>
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Checked by :-</label>
                <input type="text" id="ebCheckedBy" class="input" value="${A(n.checkedBy??"Urna Banerji")}" style="font-size:12.5px;font-weight:600;">
              </div>
              <div style="border:1px solid var(--border-md);border-radius:6px;padding:10px 12px;background:var(--bg-elevated);">
                <label style="font-size:11.5px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">Approved by :-</label>
                <input type="text" id="ebApprovedBy" class="input" value="${A(n.approvedBy??"Aashit shah")}" style="font-size:12.5px;font-weight:600;">
              </div>
            </div>
          </div>

          <!-- Attachment Vendor Bill Section -->
          <div style="margin-top:16px;padding:14px;border:1px solid var(--border-sm);border-radius:8px;background:var(--bg-elevated);">
            <div style="margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <label for="ebAttachmentNote" style="font-size:12.5px;font-weight:700;color:var(--text-1);margin:0;">Footer Note:</label>
              <input type="text" id="ebAttachmentNote" class="input" value="${A(n.attachmentNote??"Attachment Vendor Bill")}" style="max-width:320px;font-size:12.5px;">
            </div>
            ${De({id:"eb-attachments-uploader",label:"Attachment Vendor Bills (Optional Files / Scans)",subtitle:"Upload vendor bill images or PDF scans for reference"})}
          </div>
        </div>
      </div>
    `;const g=Ne("eb-attachments-uploader",{existing:Array.isArray(n.attachments)?n.attachments:[]});t.querySelector("#ebBackBtn").onclick=()=>{s.view="list",s.editingBill=null,d()},t.querySelectorAll(".eb-r-amount").forEach(f=>{f.addEventListener("input",c)}),t.querySelector("#ebAddRowBtn").onclick=()=>{l(),n.attachments=g.getAttachments(),n.rows.push({srNo:n.rows.length+1,date:"",vendorName:"",billNo:"",amount:"",particulars:"",originalBillReceived:"",remarks:""}),d()},t.querySelectorAll(".eb-remove-row-btn").forEach(f=>{f.onclick=()=>{l(),n.attachments=g.getAttachments();const y=parseInt(f.dataset.idx,10);n.rows.length<=1?n.rows=ie(1):n.rows.splice(y,1),d()}});const p=async()=>{l(),n.attachments=g.getAttachments();const f=t.querySelector("#ebSaveBtn"),y=f.textContent;f.disabled=!0,f.textContent="Saving…";try{const u={sheetDate:n.sheetDate,rows:n.rows,preparedBy:n.preparedBy,checkedBy:n.checkedBy,approvedBy:n.approvedBy,attachmentNote:n.attachmentNote,attachments:n.attachments};let v;return n._id?(v=await ze(`/expense-bills/${n._id}`,u),q("Expense bill sheet updated! ✓")):(v=await qe("/expense-bills",u),n._id=v._id,q("Expense bill sheet saved! ✓")),de("/expense-bills").then(m=>{Array.isArray(m)&&(s.bills=m)}).catch(()=>{}),v}catch(u){return q("Failed to save: "+u.message,!0),null}finally{f.disabled=!1,f.textContent=y}};t.querySelector("#ebSaveBtn").onclick=p,t.querySelector("#ebPdfEditorBtn").onclick=async f=>{l(),await me(n,f.currentTarget)},t.querySelector("#ebPrintEditorBtn").onclick=async()=>{l(),await ve(n)}}function d(){s.view==="editor"?b():i()}await e()}let D=null,w={personnel:[],clients:[],services:[],salaryGrades:[],salaryAssignments:[],users:[]},R=null,$={tab:"dashboard",period:"month",jobsFilter:"all"},S={title:"",clientId:"",serviceIds:[],date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",assignments:[{personId:"",percent:100,hours:""},{personId:"",percent:0,hours:""}]},j="admin",F="",ee=null,I="__global__";async function We(){initTheme(),D=requireAuth("superadmin"),D&&(await Promise.all([z(),Pe().catch(()=>{})]),M())}async function z(){const[t,s,e,a]=await Promise.all([apiGet("/personnel").catch(()=>[]),apiGet("/clients").catch(()=>[]),apiGet("/services").catch(()=>[]),apiGet("/users").catch(()=>[])]);w.personnel=t||[],w.clients=s||[],w.services=e||[],w.users=a||[]}function se(){const t=w.personnel.find(a=>/mansi/i.test(a.name)),s=w.personnel.find(a=>/urna/i.test(a.name)),e=[];return t&&e.push({personId:t._id,percent:"",hours:""}),s&&e.push({personId:s._id,percent:"",hours:""}),e.length===0&&e.push({personId:"",percent:"",hours:""}),e}function Ae(t){const s=w.personnel.find(e=>e._id===t);return s?s.name:"—"}function le(t){const s=w.clients.find(e=>e._id===t);return s?s.name:"—"}const Ye=[{key:"dashboard",label:"Dashboard",icon:"📊"},{key:"dailytasks",label:"Daily Planner",icon:"📅"},{key:"tickets",label:"Support Tickets",icon:"🎫"},{key:"billing_dashboard",label:"Accounts & Billing",icon:"💳",href:"/accounts"},{key:"expensebills",label:"Expenses vs Revenue",icon:"🧾"},{key:"proposals",label:"Proposal Studio",icon:"📜"},{key:"teambonding",label:"Team Chat & Lounge",icon:"💬"},{key:"logjob",label:"Log a Job",icon:"➕"},{key:"jobs",label:"All Jobs",icon:"📁"},{key:"byclient",label:"By Client",icon:"💼"},{key:"byperson",label:"By Person",icon:"👥"},{key:"accounts",label:"Client Roster",icon:"🏢"},{key:"targets",label:"Targets",icon:"🎯"},{key:"salaries",label:"Salaries",icon:"💰"},{key:"users",label:"Users",icon:"👤"},{key:"manage",label:"Settings & Manage",icon:"⚙️"}];function M(){const t=document.getElementById("app"),s=D?.role==="superadmin",e=Re("admin",Ye,s),a=e.find(o=>o.key===$.tab)||e[0];e.some(o=>o.key===$.tab)||($.tab=a?a.key:"dashboard"),t.innerHTML=renderAppShell({user:D,currentRole:s?"superadmin":"admin",activeTab:$.tab,tabs:e,title:a.label,subtitle:"Productivity & Revenue Intelligence"}),bindAppShellEvents(o=>{$.tab=o,M()}),C()}window.ci360NavTab=(t,s={})=>{$.tab=t,$.tabParams=s,M()};async function C(t=!1){const s=document.getElementById("content");if(!s)return;const e=D?.role==="superadmin";if(($.tab==="salaries"||$.tab==="users")&&!e){$.tab="dashboard",flashToast("Access restricted: Superadmin permission required",!0),M();return}!t&&!s.dataset.loaded&&(s.innerHTML=renderSkeletonCards(4)),s.dataset.loaded="true";try{if($.tab==="dashboard")await et(s);else if($.tab==="dailytasks")await gt(s);else if($.tab==="tickets"||$.tab==="supporttickets")await Ke(s);else if($.tab==="proposals")await Qe(s);else if($.tab==="expensebills")await Xe(s);else if($.tab==="teambonding"||$.tab==="bonding")await Ze(s);else if($.tab==="logjob")_(s);else if($.tab==="jobs")await ot(s);else if($.tab==="byclient")await lt(s);else if($.tab==="byperson")await oe(s);else if($.tab==="accounts")await rt(s);else if($.tab==="billing_dashboard"){window.location.href="/accounts";return}else $.tab==="targets"?await ct(s):$.tab==="salaries"?await pt(s):$.tab==="settings"||$.tab==="manage"?vt(s):$.tab==="users"&&await Ie(s)}catch(a){s.innerHTML=`<div class="empty"><h3>Something went wrong</h3>${escapeHtml(a.message)}</div>`}}async function Qe(t){t.innerHTML='<div id="proposals-module-root"></div>';const s=t.querySelector("#proposals-module-root");Fe(s)}async function Xe(t){t.innerHTML='<div id="expensebills-module-root"></div>';const s=t.querySelector("#expensebills-module-root");await Ge(s)}async function Ze(t){t.innerHTML='<div id="teambonding-module-root"></div>';const s=t.querySelector("#teambonding-module-root");Ve(s,{userRole:D?.role||"admin",currentUser:D})}async function Ke(t){t.innerHTML='<div id="support-tickets-module-root"></div>';const s=t.querySelector("#support-tickets-module-root"),e=$.tabParams||{};Je(s,{userRole:"superadmin",currentUser:D,initialJobId:e.jobId||null})}function Ce(){return renderPeriodPicker($.period)}function re(){document.querySelectorAll("[data-period]").forEach(s=>{s.onclick=()=>{$.period=s.dataset.period,C()}});const t=document.getElementById("dashPeriodSelect");t&&(t.onchange=s=>{$.period=s.target.value,C()})}async function et(t){R=await apiGet("/dashboard/admin?period="+$.period);const s=R.overview;t.innerHTML=`
    <div class="dash-overview-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
      <div class="dash-overview-title-wrap">
        <h2 style="font-size:24px;font-weight:800;color:var(--text-1);margin:0 0 4px 0;letter-spacing:-0.4px;">${_e(D?.name||"Admin")}</h2>
        <p style="font-size:13px;color:var(--text-3);margin:0;">Real-time workload, capacity, and deliverable performance</p>
      </div>
      <div class="dash-period-dropdown-wrap" style="display:inline-flex;align-items:center;gap:8px;">
        ${He($.period,"dashPeriodSelect")}
      </div>
    </div>

    <section class="block block-kpi-grid">
      <div class="grid grid-4">
        <div class="card kpi kpi-work-val">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-purple-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            </div>
            <div class="label">Work Value Tracked <span class="kpi-mini-icon">📊</span></div>
          </div>
          <div class="value">${fmtINR(s.totalValue)}</div>
          <div class="sub">across ${s.activeClients} of ${s.totalClients} active clients</div>
          <svg class="kpi-spark-wave purple-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q25,38 45,26 T80,16 T100,10" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-jobs-logged">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-green-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            </div>
            <div class="label">Jobs Logged <span class="kpi-mini-icon">📄</span></div>
          </div>
          <div class="value">${s.totalJobs}</div>
          <div class="sub">${fmtHours(s.totalHours)} of effort tracked</div>
          <svg class="kpi-spark-wave green-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q30,35 60,30 T85,15 T100,10" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-overworked">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-amber-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="label">Overworked <span class="kpi-mini-icon">⚠️</span></div>
          </div>
          <div class="value" style="color:var(--red)">${s.overworked}</div>
          <div class="sub">team members above 115% capacity</div>
          <svg class="kpi-spark-wave amber-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q20,38 40,25 T70,30 T100,12" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="card kpi kpi-underused">
          <div class="kpi-mobile-header">
            <div class="kpi-mobile-badge kpi-rose-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
            </div>
            <div class="label">Underused Capacity <span class="kpi-mini-icon">📉</span></div>
          </div>
          <div class="value" style="color:var(--blue)">${s.underused}</div>
          <div class="sub">team members below 55% capacity</div>
          <svg class="kpi-spark-wave rose-wave" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q25,35 45,28 T70,32 T100,14" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <div class="grid grid-2">
      <section class="block">
        <h2>Work Value by Client</h2>
        <div class="card">${ge(R.clients.slice(0,8).map(e=>[e.name,e.value]))}</div>
      </section>
      <section class="block">
        <h2>Work Value by Service</h2>
        <div class="card">${ge(R.services.slice(0,8).map(e=>[e.name,e.value]),!0)}</div>
      </section>
    </div>

    <section class="block">
      <h2>Team Load at a Glance</h2>
      <div class="card">${R.personnel.filter(e=>e.status!=="inactive").map(tt).join("")||'<div class="empty">No personnel yet.</div>'}</div>
    </section>
  `,re()}function ge(t,s){if(!t.length)return'<div class="empty">No data yet.</div>';const e=Math.max(1,...t.map(a=>a[1]));return t.map(([a,o])=>`
    <div class="bar-row">
      <div>${escapeHtml(a)}</div>
      <div class="bar-track"><div class="bar-fill ${s?"gold":""}" style="width:${(o/e*100).toFixed(1)}%"></div></div>
      <div class="num">${fmtINR(o)}</div>
    </div>`).join("")}function tt(t){const s=Math.min(t.utilization,160);return`
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px;">
        <span><strong>${escapeHtml(t.name)}</strong> <span class="muted">${escapeHtml(t.duties||"")}</span></span>
        <span><span class="badge ${t.cls}">${t.label}</span> &nbsp; ${t.utilization.toFixed(0)}%</span>
      </div>
      <div class="gauge-track">
        <div class="gauge-zone" style="left:0;width:25%;background:var(--blue-bg);"></div>
        <div class="gauge-zone" style="left:25%;width:30%;background:var(--green-bg);"></div>
        <div class="gauge-zone" style="left:55%;width:35%;background:var(--amber-bg);"></div>
        <div class="gauge-zone" style="left:90%;width:10%;background:var(--red-bg);"></div>
        <div class="gauge-fill" style="left:${Math.min(s/1.6,99)}%;"></div>
      </div>
    </div>`}function _(t){(!S.assignments||S.assignments.every(e=>!e.personId))&&(S.assignments=se());const s=S.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0);t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">➕</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Log New Job & Work Deliverable</h1>
            <p class="ci360-hero-subheading">Record client deliverables, services provided, financial value, and team hour attributions.</p>
          </div>
        </div>
      </header>

      <div class="card log-job-card">
        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">1. Client & Timeline</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>CLIENT *</label>
            <div class="select-with-btn">
              <select id="jClient">
                <option value="">Select client…</option>
                ${w.clients.map(e=>`<option value="${e._id}" ${e._id===S.clientId?"selected":""}>${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewClientBtn">+ New Client</button>
            </div>
          </div>

          <div class="log-job-row">
            <div class="field" style="margin-bottom:0;">
              <label>START DATE *</label>
              <input type="date" id="jDate" value="${S.date||new Date().toISOString().slice(0,10)}">
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>COMPLETION DATE (OPTIONAL)</label>
              <input type="date" id="jCompletion" value="${S.completion||""}" placeholder="dd.mm.yyyy">
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">2. Deliverable & Financials</h3>
          <div class="field" style="margin-bottom:16px;">
            <label>SERVICE(S) DELIVERED *</label>
            <div class="select-with-btn">
              <select id="jService">
                <option value="">Select service to add…</option>
                ${w.services.map(e=>`<option value="${e._id}">${escapeHtml(e.name)}</option>`).join("")}
              </select>
              <button class="btn ghost small" type="button" id="addNewServiceBtn">+ New Service</button>
            </div>
            ${S.serviceIds.length?`
              <div class="selected-services-tags" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">
                ${S.serviceIds.map(e=>{const a=w.services.find(o=>o._id===e);return a?`
                    <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px;border-radius:20px;">
                      ${escapeHtml(a.name)}
                      <span class="remove-service-tag" data-id="${a._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
                    </span>
                  `:""}).join("")}
              </div>
            `:""}
          </div>

          <div class="field" style="margin-bottom:16px;">
            <label>JOB VALUE (₹ ATTRIBUTABLE VALUE)</label>
            <input type="number" id="jValue" value="${S.value||""}" placeholder="e.g. 25000" min="0">
          </div>

          <div class="field" style="margin-bottom:0;">
            <label>DELIVERABLE DESCRIPTION & SPECIFICS</label>
            <textarea id="jDesc" placeholder="Describe the scope of work, completed artifacts, or client notes..." style="height:90px;resize:vertical;">${escapeHtml(S.desc||"")}</textarea>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">3. Team Work Allocation & Hours</h3>
          <div class="people-assigned-box">
            <div class="people-assigned-headers">
              <div>TEAM MEMBER</div>
              <div>% OF WORK</div>
              <div>HOURS SPENT</div>
              <div></div>
            </div>
            <div id="assignRows">
              ${S.assignments.map((e,a)=>st(e,a)).join("")}
            </div>
            <button class="btn ghost small" id="addAssignRow" type="button" style="margin-top:10px;">+ Add Team Member</button>
            <div style="margin-top:14px;">
              <div class="assign-total ${s!==100?"warn":""}">
                <span>${s===100?"✓":"⚠️"}</span>
                <span>${s}% of work allocated ${s!==100?"— should total 100%":"(100% Complete)"}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border-sm);">
          <h3 style="font-size:14px;font-weight:800;color:var(--text-1);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">4. Briefs &amp; File Attachments</h3>
          ${renderAttachmentUploader({id:"jAttachments",label:"Briefs & Reference Assets",subtitle:"Upload briefs, design mockups, agreements, logos or source files"})}
        </div>

        <div class="form-actions">
          <button class="btn ghost" id="clearJobBtn" type="button">Reset Draft</button>
          <button class="btn gold" id="saveJobBtn" type="button" style="padding:10px 28px;font-size:14px;">Save Job & Dispatch Notifications</button>
        </div>
      </div>
    </section>
  `,it()}function st(t,s){return`
    <div class="person-assign-row" data-idx="${s}">
      <div class="field">
        <select class="a-person">
          <option value="">Select…</option>
          ${w.personnel.map(e=>`<option value="${e._id}" ${e._id===t.personId?"selected":""}>${escapeHtml(e.name)}${e.duties?` (${escapeHtml(e.duties)})`:""}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <input type="number" class="a-percent" value="${t.percent!=null?t.percent:""}" placeholder="100" min="0" max="100">
      </div>
      <div class="field">
        <input type="number" class="a-hours" value="${t.hours||""}" placeholder="e.g. 3.5" min="0" step="0.5">
      </div>
      <div style="display:flex;justify-content:center;">
        <button class="btn-remove-person a-remove" type="button" title="Remove person">✕</button>
      </div>
    </div>
  `}function it(){const t=document.getElementById("jClient");t&&(t.onchange=r=>S.clientId=r.target.value);const s=document.getElementById("addNewClientBtn");s&&(s.onclick=()=>{const r=openModal(`
        <h3>Add New Client</h3>
        <div class="field">
          <label>Client Name *</label>
          <input type="text" id="newClientName" placeholder="e.g. Acme Corp">
        </div>
        <div class="field">
          <label>Notes (optional)</label>
          <input type="text" id="newClientNotes" placeholder="Notes...">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Client</button>
        </div>
      `);r.querySelector("#mCancel").onclick=()=>r.remove(),r.querySelector("#mSave").onclick=async()=>{const g=r.querySelector("#newClientName").value.trim(),p=r.querySelector("#newClientNotes").value.trim();if(!g){flashToast("Client name is required",!0);return}try{const f=await apiPost("/clients",{name:g,notes:p});await z(),S.clientId=f._id,flashToast("Client added"),r.remove(),_(document.getElementById("content"))}catch(f){flashToast(f.message,!0)}}});const e=document.getElementById("jDate");e&&(e.onchange=r=>S.date=r.target.value);const a=document.getElementById("jCompletion");a&&(a.onchange=r=>S.completion=r.target.value);const o=document.getElementById("jService");o&&(o.onchange=r=>{const g=r.target.value;g&&(S.serviceIds.includes(g)||S.serviceIds.push(g),_(document.getElementById("content")))}),document.querySelectorAll(".remove-service-tag").forEach(r=>{r.onclick=g=>{g.stopPropagation();const p=r.dataset.id;S.serviceIds=S.serviceIds.filter(f=>f!==p),_(document.getElementById("content"))}});const i=document.getElementById("addNewServiceBtn");i&&(i.onclick=()=>{const r=openModal(`
        <h3>Add New Service</h3>
        <div class="field">
          <label>Service Name *</label>
          <input type="text" id="newServiceName" placeholder="e.g. AR / VR Development">
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="mCancel">Cancel</button>
          <button class="btn gold" id="mSave">Add Service</button>
        </div>
      `);r.querySelector("#mCancel").onclick=()=>r.remove(),r.querySelector("#mSave").onclick=async()=>{const g=r.querySelector("#newServiceName").value.trim();if(!g){flashToast("Service name is required",!0);return}try{const p=await apiPost("/services",{name:g});await z(),S.serviceIds.includes(p._id)||S.serviceIds.push(p._id),flashToast("Service added"),r.remove(),_(document.getElementById("content"))}catch(p){flashToast(p.message,!0)}}});const l=document.getElementById("jDesc");l&&(l.oninput=r=>S.desc=r.target.value);const c=document.getElementById("jValue");c&&(c.oninput=r=>S.value=r.target.value),document.querySelectorAll(".person-assign-row").forEach(r=>{const g=Number(r.dataset.idx),p=r.querySelector(".a-person");p&&(p.onchange=v=>S.assignments[g].personId=v.target.value);const f=r.querySelector(".a-percent");f&&(f.oninput=v=>{S.assignments[g].percent=v.target.value,at()});const y=r.querySelector(".a-hours");y&&(y.oninput=v=>S.assignments[g].hours=v.target.value);const u=r.querySelector(".a-remove");u&&(u.onclick=()=>{S.assignments.length>1&&(S.assignments.splice(g,1),_(document.getElementById("content")))})});const b=document.getElementById("addAssignRow");b&&(b.onclick=()=>{S.assignments.push({personId:"",percent:0,hours:""}),_(document.getElementById("content"))}),bindAttachmentUploader("jAttachments",{existing:S.attachments||[]});const d=document.getElementById("clearJobBtn");d&&(d.onclick=()=>{S={title:"",assignments:se(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},setUploaderAttachments("jAttachments",[]),_(document.getElementById("content"))});const n=document.getElementById("saveJobBtn");n&&(n.onclick=async()=>{try{if(typeof Notification<"u"&&Notification.permission==="default")try{await Notification.requestPermission()}catch{}if(!S.clientId){flashToast("Please select a client",!0);return}if(!S.serviceIds||!S.serviceIds.length){flashToast("Please select at least one service",!0);return}const r=S.assignments.filter(v=>v.personId);if(!r.length){flashToast("Please assign at least one person",!0);return}for(const v of r)if(v.hours===""||v.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const g=w.clients.find(v=>v._id===S.clientId),f=w.services.filter(v=>S.serviceIds.includes(v._id)).map(v=>v.name).join(", "),y=S.title||(g?`${g.name} — ${f||"Deliverable"}`:f||"Untitled Job"),u=getUploaderAttachments("jAttachments");await apiPost("/jobs",{title:y,clientId:S.clientId,serviceIds:S.serviceIds,date:S.date||new Date().toISOString().slice(0,10),completionDate:S.completion||null,value:Number(S.value)||0,description:S.desc||"",assignments:r,attachments:u}),flashToast("Job saved successfully! 📁"),typeof window.ci360FetchNotifications=="function"&&window.ci360FetchNotifications(),S={title:"",assignments:se(),serviceIds:[],clientId:"",date:new Date().toISOString().slice(0,10),completion:"",value:"",desc:"",attachments:[]},$.tab="jobs",C()}catch(r){flashToast(r.message,!0)}})}function at(){const t=S.assignments.reduce((e,a)=>e+(Number(a.percent)||0),0),s=document.querySelector(".assign-total");s&&(s.textContent=`${t}% of work allocated ${t!==100?"— should total 100%":"✓"}`,s.classList.toggle("warn",t!==100))}async function ot(t){let s=await apiGet("/jobs");s.sort((e,a)=>new Date(a.date)-new Date(e.date)),$.jobsFilter==="progress"&&(s=s.filter(e=>!e.completionDate)),$.jobsFilter==="done"&&(s=s.filter(e=>e.completionDate)),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">📁</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">All Jobs & Projects</h1>
            <p class="ci360-hero-subheading">Comprehensive pipeline of all client deliverables, status, and assigned personnel</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" onclick="ui.tab='logjob';render()" type="button" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
            <span>➕ Log New Job</span>
          </button>
        </div>
      </header>
      <div style="margin-bottom:14px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <button class="pchip ${$.jobsFilter==="all"?"active":""}" data-jf="all">All (${s.length})</button>
        <button class="pchip ${$.jobsFilter==="progress"?"active":""}" data-jf="progress">In Progress</button>
        <button class="pchip ${$.jobsFilter==="done"?"active":""}" data-jf="done">Completed</button>
      </div>
      ${s.length===0?'<div class="empty">No jobs logged yet.</div>':`
      <div class="card" style="overflow-x:auto;">
        <table>
          <thead><tr><th>Job Title</th><th>Files &amp; Artifacts</th><th>Start</th><th>Status &amp; Sign-Off</th><th>Client</th><th>Service(s)</th><th>Assigned Personnel</th><th class="num">Hours</th><th style="text-align:right;">Actions</th></tr></thead>
          <tbody>
          ${s.map(e=>{const a=e.status==="Completed",o=(e.assignments||[]).map(c=>`${escapeHtml(Ae(c.personId))} (${c.percent}%)`).join(", "),i=(e.attachments||[]).length,l=(e.deliverables||[]).length;return`<tr>
              <td><strong>${escapeHtml(e.title||"Untitled Job")}</strong></td>
              <td>
                <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">
                  ${i?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${i} Brief Attachments" style="padding:2px 6px;font-size:11px"><span class="badge blue" style="font-size:10.5px">📎 ${i} Brief</span></button>`:""}
                  ${l?`<button type="button" class="btn ghost small view-job-files" data-id="${e._id}" title="View ${l} Finished Deliverables" style="padding:2px 6px;font-size:11px"><span class="badge green" style="font-size:10.5px">📦 ${l} Work</span></button>`:""}
                  ${!i&&!l?'<span class="muted" style="font-size:11px">—</span>':""}
                </div>
              </td>
              <td>${fmtDate(e.date)}</td>
              <td>
                <div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
                  <button class="btn ${a?"ghost":"gold"} small toggle-status-btn" data-id="${e._id}" data-done="${a}" style="padding:2px 7px;font-size:11px;cursor:pointer;">
                    <span class="badge ${a?"green":e.status==="Needs Revision"||e.status==="Denied"?"red":"amber"}">${a?"Completed":e.status==="Needs Revision"?"Needs Revision":e.status==="Denied"?"Denied":"In Progress"}</span>
                  </button>
                  ${e.clientApproval&&e.clientApproval.status==="Approved"?`<span style="font-size:10px;font-weight:700;color:var(--green-500)">✓ Client Approved ${e.clientApproval.rating?`(${e.clientApproval.rating}★)`:""}</span>`:e.clientApproval&&e.clientApproval.status==="Revision Requested"?`<span style="font-size:10px;font-weight:700;color:var(--amber-500)">↺ Revision Req.</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.feedback||"")}" data-type="revision" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:e.clientApproval&&e.clientApproval.isRevised?'<span style="font-size:10px;font-weight:700;color:var(--brand-500)">📦 Revised — Awaiting Re-approval</span>':e.status==="Denied"||e.clientApproval?.status==="Denied"?`<span style="font-size:10px;font-weight:700;color:var(--red-500)" title="Reason: ${escapeHtml(e.clientApproval?.deniedReason||"")}">❌ Denied</span>
                   <button type="button" class="btn gold small admin-resubmit-btn" data-id="${e._id}" data-title="${escapeHtml(e.title||"Job")}" data-reason="${escapeHtml(e.clientApproval?.deniedReason||"")}" data-type="denial" style="margin-top:3px;padding:2px 7px;font-size:10px;font-weight:700">🔁 Resubmit</button>`:""}
                </div>
              </td>
              <td>${escapeHtml(le(e.clientId))}</td>
              <td>${(e.serviceNames||[]).map(c=>`<span class="badge gray">${escapeHtml(c)}</span>`).join(" ")}</td>
              <td class="assign-cell-click" data-id="${e._id}" style="cursor:pointer;" title="Click to assign or change personnel">
                ${o||'<span class="muted">Unassigned</span>'}
                <span style="font-size:11px;color:var(--gold-600);margin-left:4px;">✏️</span>
              </td>
              <td class="num">${fmtHours((e.assignments||[]).reduce((c,b)=>c+(Number(b.hours)||0),0))}</td>
              <td style="text-align:right;white-space:nowrap;">
                <button class="btn ghost small job-ticket-btn" data-id="${e._id}" title="Support Tickets linked to this Job" style="margin-right:4px;padding:3px 8px;font-size:11px;">🎫 Ticket</button>
                <button class="btn ghost small view-job-files" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">📁 Files</button>
                <button class="btn ghost small edit-job" data-id="${e._id}" style="margin-right:4px;padding:3px 8px;font-size:11px;">Assign / Edit</button>
                <button class="btn danger small del-job" data-id="${e._id}" style="padding:3px 8px;font-size:11px;">Delete</button>
              </td>
            </tr>`}).join("")}
          </tbody>
        </table>
      </div>`}
    </section>
  `,document.querySelectorAll("[data-jf]").forEach(e=>e.onclick=()=>{$.jobsFilter=e.dataset.jf,C()}),document.querySelectorAll(".job-ticket-btn").forEach(e=>{e.onclick=()=>{window.ci360NavTab("tickets",{jobId:e.dataset.id})}}),document.querySelectorAll(".admin-resubmit-btn").forEach(e=>{e.onclick=()=>bt(e.dataset.id,e.dataset.title,e.dataset.reason,e.dataset.type)}),document.querySelectorAll(".view-job-files").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,o=s.find(b=>b._id===a);if(!o)return;const i=encodeURIComponent(JSON.stringify(o.attachments||[])),l=encodeURIComponent(JSON.stringify(o.deliverables||[])),c=openModal(`
        <div style="margin-bottom:14px;border-bottom:1px solid var(--border-sm);padding-bottom:10px">
          <h3 style="margin-bottom:4px">📁 Job Files &amp; Artifacts</h3>
          <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(o.title||"Untitled Job")}</div>
        </div>

        ${o.clientApproval?.status==="Revision Requested"||o.status==="Needs Revision"?`
          <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--amber-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>⚠️</span> Client Requested Changes / Revision
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(o.clientApproval?.feedback||"Revision requested")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${o._id}', '${escapeHtml(o.title||"Job")}', '${escapeHtml(o.clientApproval?.feedback||"")}', 'revision')" style="font-weight:700">
              🔁 Resubmit Revised Work
            </button>
          </div>
        `:o.status==="Denied"||o.clientApproval?.status==="Denied"?`
          <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div>
              <strong style="color:var(--red-500);font-size:12.5px;display:flex;align-items:center;gap:6px">
                <span>❌</span> Job Denied by Client
              </strong>
              <div style="font-size:12px;color:var(--text-1);margin-top:3px">"${escapeHtml(o.clientApproval?.deniedReason||"Job denied")}"</div>
            </div>
            <button type="button" class="btn gold small" onclick="openAdminResubmitModal('${o._id}', '${escapeHtml(o.title||"Job")}', '${escapeHtml(o.clientApproval?.deniedReason||"")}', 'denial')" style="font-weight:700">
              🔁 Resubmit Corrected Work
            </button>
          </div>
        `:""}

        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📎 Briefs &amp; Initial Client Assets (${(o.attachments||[]).length})</h4>
          ${o.attachments&&o.attachments.length?`
            <div data-attachments="${i}">
              ${renderAttachmentChips(o.attachments)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No brief attachments uploaded.</div>'}
        </div>

        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:8px">📦 Completed Deliverables &amp; Proofs (${(o.deliverables||[]).length})</h4>
          ${o.deliverables&&o.deliverables.length?`
            <div data-attachments="${l}">
              ${renderAttachmentChips(o.deliverables)}
            </div>
          `:'<div style="font-size:12px;color:var(--text-4);font-style:italic">No completed deliverables attached yet.</div>'}
        </div>

        <div style="background:var(--bg-elevated);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:14px;margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:6px">+ Upload Deliverables to Job</h4>
          <p style="font-size:11.5px;color:var(--text-3);margin-bottom:10px">Add completed artifacts, links, or finalized files for this job</p>
          <div class="field" style="margin-bottom:10px">
            <label>Deliverable Notes / Version description</label>
            <input type="text" id="mDelNote" placeholder="e.g. Final Website build, Video Cut v2 (color graded)" />
          </div>
          <div class="field" style="margin-bottom:10px">
            <label style="font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
            <input type="url" id="mDelUrl" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="width:100%;box-sizing:border-box" />
            <span style="font-size:11px;color:var(--text-4)">For live websites, applications, Figma links or cloud files</span>
          </div>
          ${renderAttachmentUploader({id:"mDelUpload",label:"Upload Deliverable Files (Optional if URL provided)",subtitle:"Upload exported videos, PSDs, PDFs, spreadsheets, or images"})}
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:12px">
            <label style="display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-2);cursor:pointer;font-weight:600">
              <input type="checkbox" id="mDelMarkComplete" checked style="cursor:pointer;width:14px;height:14px;accent-color:var(--brand-600)">
              <span>Mark Work Completed &amp; Send to Client for Approval</span>
            </label>
            <button type="button" class="btn gold small" id="mDelSaveBtn">Save Deliverables &amp; Send to Client</button>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn ghost" id="mCloseFiles">Close</button>
        </div>
      `);bindAttachmentUploader("mDelUpload"),c.querySelector("#mDelSaveBtn").onclick=async()=>{const b=getUploaderAttachments("mDelUpload"),d=c.querySelector("#mDelNote").value.trim(),n=(c.querySelector("#mDelUrl")||{}).value?.trim()||"",r=c.querySelector("#mDelMarkComplete")?.checked??!0,g=b.map(p=>({...p,notes:d}));if(n){let p=n;/^https?:\/\//i.test(p)||(p="https://"+p),g.unshift({name:d?`${d} (Live URL)`:"Live Deliverable URL / Website",url:p,type:"url",size:0,notes:d||"Live URL"})}if(!g.length){flashToast("Please enter a deliverable URL or select files",!0);return}try{await apiPost(`/jobs/${a}/deliverables`,{deliverables:g,markComplete:r}),flashToast(r?"Deliverables added & sent to Client for Approval! 📦🎉":"Deliverables added! 📦"),c.remove(),C()}catch(p){flashToast(p.message,!0)}},c.querySelector("#mCloseFiles").onclick=()=>c.remove()}}),document.querySelectorAll(".edit-job, .assign-cell-click").forEach(e=>{e.onclick=()=>{const a=e.dataset.id,o=s.find(i=>i._id===a);o&&nt(o,()=>C())}}),document.querySelectorAll(".toggle-status-btn").forEach(e=>e.onclick=async()=>{const a=e.dataset.id,o=e.dataset.done==="false",i=s.find(c=>c._id===a);let l=i?i.completionDate:null;o&&!l&&(l=new Date().toISOString().slice(0,10)),await apiPut("/jobs/"+a,{status:o?"Completed":"In Progress",completionDate:l}),flashToast(o?"Job marked as Completed!":"Job marked as In Progress"),C()}),document.querySelectorAll(".del-job").forEach(e=>e.onclick=async()=>{confirm("Delete this job?")&&(await apiDelete("/jobs/"+e.dataset.id),flashToast("Deleted"),C())})}function nt(t,s){let e={title:t.title||"",clientId:t.clientId?t.clientId._id||t.clientId:"",serviceIds:t.serviceIds?t.serviceIds.map(h=>h._id||h):[],date:t.date?new Date(t.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),completionDate:t.completionDate?new Date(t.completionDate).toISOString().slice(0,10):"",status:t.status||"In Progress",priority:t.priority||"Medium",value:t.value!=null?t.value:"",description:t.description||"",preferredPersonId:t.preferredPersonId?t.preferredPersonId._id||t.preferredPersonId:"",assignments:t.assignments&&t.assignments.length?t.assignments.map(h=>({personId:String(h.personId._id||h.personId),percent:h.percent!=null?h.percent:0,hours:h.hours!=null?h.hours:0})):se()};function a(){return e.serviceIds.length?e.serviceIds.map(h=>{const T=w.services.find(B=>String(B._id)===String(h));return T?`
        <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;font-size:12px;border-radius:20px;">
          ${escapeHtml(T.name)}
          <span class="m-remove-service" data-id="${T._id}" style="cursor:pointer;font-weight:bold;margin-left:4px;" title="Remove service">✕</span>
        </span>
      `:""}).join(""):'<span class="muted" style="font-size:12px;">No services selected</span>'}function o(){return e.assignments.map((h,T)=>`
      <div class="m-person-assign-row" data-idx="${T}" style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;align-items:center;margin-bottom:8px;">
        <div class="field" style="margin-bottom:0;">
          <select class="m-a-person" style="padding:6px 8px;font-size:13px;width:100%;">
            <option value="">Select team member…</option>
            ${w.personnel.map(B=>`<option value="${B._id}" ${String(B._id)===String(h.personId)?"selected":""}>${escapeHtml(B.name)}${B.duties?` (${escapeHtml(B.duties)})`:""}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-percent" value="${h.percent!=null?h.percent:""}" placeholder="100" min="0" max="100" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div class="field" style="margin-bottom:0;">
          <input type="number" class="m-a-hours" value="${h.hours!=null?h.hours:""}" placeholder="0" min="0" step="0.5" style="padding:6px 8px;font-size:13px;width:100%;">
        </div>
        <div style="display:flex;justify-content:center;">
          <button class="btn-remove-person m-a-remove" type="button" title="Remove person" style="cursor:pointer;background:none;border:none;color:var(--red);font-weight:bold;font-size:16px;">✕</button>
        </div>
      </div>
    `).join("")}const i=openModal(`
    <div style="max-height:85vh;overflow-y:auto;padding-right:4px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border-sm);padding-bottom:12px;">
        <div>
          <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">Assign Personnel & Edit Job</h3>
          <p style="margin:2px 0 0 0;font-size:12px;color:var(--text-3);">Assign or change assigned team members and update job details.</p>
        </div>
        <button type="button" class="btn ghost small" id="mCloseJobEdit" style="font-size:16px;line-height:1;padding:4px 8px;">✕</button>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>JOB TITLE *</label>
        <input type="text" id="mEditTitle" value="${escapeHtml(e.title)}" placeholder="Job Title...">
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>CLIENT *</label>
          <select id="mEditClient">
            <option value="">Select client…</option>
            ${w.clients.map(h=>`<option value="${h._id}" ${String(h._id)===String(e.clientId)?"selected":""}>${escapeHtml(h.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>STATUS</label>
          <select id="mEditStatus">
            <option value="In Progress" ${e.status==="In Progress"?"selected":""}>In Progress</option>
            <option value="Completed" ${e.status==="Completed"?"selected":""}>Completed</option>
          </select>
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>START DATE *</label>
          <input type="date" id="mEditDate" value="${e.date}">
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>COMPLETION DATE</label>
          <input type="date" id="mEditCompletionDate" value="${e.completionDate}">
        </div>
      </div>

      <div class="field" style="margin-bottom:14px;">
        <label>SERVICE(S) DELIVERED *</label>
        <select id="mEditServiceSelect">
          <option value="">Select service to add…</option>
          ${w.services.map(h=>`<option value="${h._id}">${escapeHtml(h.name)}</option>`).join("")}
        </select>
        <div id="mEditServicesTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          ${a()}
        </div>
      </div>

      <div class="grid grid-2" style="gap:12px;margin-bottom:14px;">
        <div class="field" style="margin-bottom:0;">
          <label>PRIORITY</label>
          <select id="mEditPriority">
            <option value="Medium" ${e.priority==="Medium"?"selected":""}>Medium</option>
            <option value="High" ${e.priority==="High"?"selected":""}>High</option>
            <option value="Urgent" ${e.priority==="Urgent"?"selected":""}>Urgent</option>
          </select>
        </div>
        <div class="field" style="margin-bottom:0;">
          <label>JOB VALUE (₹)</label>
          <input type="number" id="mEditValue" value="${e.value}" placeholder="0" min="0">
        </div>
      </div>

      <div class="field" style="margin-bottom:16px;">
        <label>DESCRIPTION / SCOPE</label>
        <textarea id="mEditDesc" style="height:70px;resize:vertical;" placeholder="Deliverable details...">${escapeHtml(e.description)}</textarea>
      </div>

      <!-- FILE ATTACHMENTS & DELIVERABLES -->
      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:16px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📎 Job Briefs &amp; Initial Assets</h4>
        ${renderAttachmentUploader({id:"mEditAttachments",label:"Brief Attachments",subtitle:"Upload briefs, design mockups, agreements or logos"})}
      </div>

      <div style="background:var(--bg-card);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <h4 style="margin:0 0 12px 0;font-size:14px;font-weight:700;color:var(--text-1);">📦 Completed Deliverables &amp; Output Files</h4>
        ${renderAttachmentUploader({id:"mEditDeliverables",label:"Finished Deliverables",subtitle:"Upload completed exports, videos, PSDs, PDFs, or spreadsheets"})}
      </div>

      <!-- ASSIGN PERSONNEL SECTION -->
      <div style="background:var(--bg-elevated);padding:14px;border-radius:8px;border:1px solid var(--border-sm);margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <h4 style="margin:0;font-size:14px;font-weight:700;color:var(--navy-900);">👥 Assigned Personnel (Multiple Allowed)</h4>
          <span style="font-size:11px;color:var(--text-3);">Add or change team members assigned to this job</span>
        </div>

        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 32px;gap:8px;font-size:11px;font-weight:700;color:var(--text-3);margin-bottom:6px;text-transform:uppercase;">
          <div>Team Member</div>
          <div>% of Work</div>
          <div>Hours Spent</div>
          <div></div>
        </div>

        <div id="mEditAssignRows">
          ${o()}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn ghost small" id="mAddAssignRow">+ Add Team Member</button>
          <div id="mAssignTotalInfo" class="assign-total" style="font-size:12px;font-weight:600;"></div>
        </div>
      </div>

      <div class="modal-actions" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          ${D?.role==="superadmin"?`
            <button type="button" class="btn danger" id="mEditDeleteJob" style="padding:8px 16px;">🗑️ Delete Job</button>
          `:""}
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" class="btn ghost" id="mEditCancel">Cancel</button>
          <button type="button" class="btn gold" id="mEditSave" style="padding:8px 20px;">Save & Update Assignments</button>
        </div>
      </div>
    </div>
  `),l=i.querySelector(".modal");l&&(l.style.maxWidth="680px"),bindAttachmentUploader("mEditAttachments",{existing:t.attachments||[]}),bindAttachmentUploader("mEditDeliverables",{existing:t.deliverables||[]});const c=()=>{const h=e.assignments.reduce((B,L)=>B+(Number(L.percent)||0),0),T=i.querySelector("#mAssignTotalInfo");T&&(T.innerHTML=h===100?'<span style="color:var(--green, #10b981);">✓ 100% Allocated</span>':`<span style="color:var(--amber, #f59e0b);">⚠️ ${h}% Allocated (should be 100%)</span>`)},b=()=>{i.querySelectorAll(".m-remove-service").forEach(h=>{h.onclick=()=>{const T=h.dataset.id;e.serviceIds=e.serviceIds.filter(B=>String(B)!==String(T)),i.querySelector("#mEditServicesTags").innerHTML=a(),b()}})},d=()=>{i.querySelectorAll(".m-person-assign-row").forEach(h=>{const T=Number(h.dataset.idx),B=h.querySelector(".m-a-person");B&&(B.onchange=U=>e.assignments[T].personId=U.target.value);const L=h.querySelector(".m-a-percent");L&&(L.oninput=U=>{e.assignments[T].percent=U.target.value,c()});const Y=h.querySelector(".m-a-hours");Y&&(Y.oninput=U=>e.assignments[T].hours=U.target.value);const Q=h.querySelector(".m-a-remove");Q&&(Q.onclick=()=>{e.assignments.length>1?(e.assignments.splice(T,1),i.querySelector("#mEditAssignRows").innerHTML=o(),d(),c()):flashToast("Job must have at least one team member row",!0)})})},n=i.querySelector("#mCloseJobEdit"),r=i.querySelector("#mEditCancel");n&&(n.onclick=()=>i.remove()),r&&(r.onclick=()=>i.remove());const g=i.querySelector("#mEditDeleteJob");g&&(g.onclick=async()=>{const h=t.title||"this job";if(confirm(`Are you sure you want to delete "${h}"?
(It will be safely retained in the database archive.)`))try{await apiDelete("/jobs/"+t._id),flashToast("Job deleted"),i.remove(),s&&s()}catch(T){flashToast(T.message,!0)}});const p=i.querySelector("#mEditTitle");p&&(p.oninput=h=>e.title=h.target.value);const f=i.querySelector("#mEditClient");f&&(f.onchange=h=>e.clientId=h.target.value);const y=i.querySelector("#mEditStatus");y&&(y.onchange=h=>e.status=h.target.value);const u=i.querySelector("#mEditDate");u&&(u.onchange=h=>e.date=h.target.value);const v=i.querySelector("#mEditCompletionDate");v&&(v.onchange=h=>e.completionDate=h.target.value);const m=i.querySelector("#mEditPriority");m&&(m.onchange=h=>e.priority=h.target.value);const x=i.querySelector("#mEditValue");x&&(x.oninput=h=>e.value=h.target.value);const k=i.querySelector("#mEditDesc");k&&(k.oninput=h=>e.description=h.target.value);const E=i.querySelector("#mEditServiceSelect");E&&(E.onchange=h=>{const T=h.target.value;T&&!e.serviceIds.map(String).includes(String(T))&&(e.serviceIds.push(T),i.querySelector("#mEditServicesTags").innerHTML=a(),b()),E.value=""}),b(),d(),c();const O=i.querySelector("#mAddAssignRow");O&&(O.onclick=()=>{e.assignments.push({personId:"",percent:0,hours:0}),i.querySelector("#mEditAssignRows").innerHTML=o(),d(),c()});const P=i.querySelector("#mEditSave");P&&(P.onclick=async()=>{try{if(!e.clientId){flashToast("Client is required",!0);return}if(!e.serviceIds||!e.serviceIds.length){flashToast("At least one service is required",!0);return}const h=e.assignments.filter(N=>N.personId&&String(N.personId).trim()!=="");if(!h.length){flashToast("Please select at least one assigned team member",!0);return}for(const N of h)if(N.hours===""||N.hours==null){flashToast("Enter hours spent for every assigned person",!0);return}const T=w.clients.find(N=>String(N._id)===String(e.clientId)),L=w.services.filter(N=>e.serviceIds.map(String).includes(String(N._id))).map(N=>N.name).join(", "),Y=e.title||(T?`${T.name} — ${L||"Deliverable"}`:L||"Untitled Job"),Q=getUploaderAttachments("mEditAttachments"),U=getUploaderAttachments("mEditDeliverables");await apiPut("/jobs/"+t._id,{title:Y,clientId:e.clientId,serviceIds:e.serviceIds,date:e.date,completionDate:e.completionDate||null,status:e.status,priority:e.priority,value:Number(e.value)||0,description:e.description||"",assignments:h,attachments:Q,deliverables:U});const ft=h.map(N=>Ae(N.personId)).join(", ");flashToast("Job updated & saved! 📁"),i.remove(),s&&s()}catch(h){flashToast(h.message,!0)}finally{P.disabled=!1,P.textContent="Save & Update Assignments"}})}async function lt(t){R=await apiGet("/dashboard/admin?period="+$.period),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">💼</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Client Breakdown & Analytics</h1>
            <p class="ci360-hero-subheading">Track portfolio value, deliverable volume, and effort invested by client</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          ${Ce()}
        </div>
      </header>
      <div class="grid grid-3">
        ${R.clients.map(s=>`
          <div class="card">
            <h3 style="font-size:17px;">${escapeHtml(s.name)}</h3>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Work Value</span><strong>${fmtINR(s.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Jobs</span><strong>${s.jobCount}</strong></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="muted">Effort</span><strong>${fmtHours(s.hours)}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span class="muted">People Involved</span><strong>${s.peopleCount}</strong></div>
          </div>`).join("")||'<div class="empty">No clients yet.</div>'}
      </div>
    </section>`,re()}async function oe(t){R=await apiGet("/dashboard/admin?period="+$.period);const s=D?.role==="superadmin";t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">👥</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Team Performance & Personnel</h1>
            <p class="ci360-hero-subheading">Track team workload, billable utilization, and work credit attribution</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          ${Ce()}
        </div>
      </header>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr>
            <th style="padding-left:22px">Person</th>
            <th>Duties</th>
            <th>Status</th>
            <th class="num">Hours</th>
            <th class="num">Utilization</th>
            <th class="num">Jobs</th>
            <th class="num">Work Credit</th>
            ${s?'<th class="num" style="padding-right:22px;text-align:right">Actions</th>':""}
          </tr></thead>
          <tbody>${R.personnel.map(e=>{const a=(e.status||"active").toLowerCase(),o=e.personId||e._id;return`<tr>
              <td style="padding-left:22px"><strong>${escapeHtml(e.name)}</strong></td><td class="muted">${escapeHtml(e.duties||"")}</td>
              <td>
                <select class="person-status-sel" data-id="${o}" style="padding:4px 10px;font-size:12.5px;font-weight:700;border-radius:6px;border:1px solid var(--border-sm);background:var(--bg-input);color:var(--text-1);cursor:pointer;">
                  <option value="active" ${a==="active"?"selected":""}>🟢 Active</option>
                  <option value="work from home" ${a==="work from home"||a==="wfh"?"selected":""}>🏠 Work From Home</option>
                  <option value="on leave" ${a==="on leave"||a==="pn leave"?"selected":""}>🏖️ On Leave</option>
                </select>
              </td>
              <td class="num">${fmtHours(e.hours)}</td>
              <td class="num"><span class="badge ${e.cls}">${e.label}</span> ${e.utilization.toFixed(0)}%</td>
              <td class="num">${e.jobCount}</td>
              <td class="num">${fmtINR(e.revenue)}</td>
              ${s?`
                <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
                  <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                    <button class="btn ghost small edit-person-direct" data-id="${o}" style="padding:3px 8px;font-size:11.5px">Edit</button>
                    <button class="btn danger small del-person-direct" data-id="${o}" style="padding:3px 8px;font-size:11.5px">Remove</button>
                  </div>
                </td>
              `:""}
            </tr>`}).join("")}</tbody></table>
        </div>
      </div>
    </section>`,re(),document.querySelectorAll(".person-status-sel").forEach(e=>{e.onchange=async a=>{const o=e.dataset.id,i=a.target.value;try{await apiPut("/personnel/"+o,{status:i}),await z(),flashToast("Status updated to "+i),oe(t)}catch(l){flashToast(l.message,!0)}}}),document.querySelectorAll(".edit-person-direct").forEach(e=>{e.onclick=()=>{const a=w.personnel.find(o=>String(o._id)===String(e.dataset.id));a&&ne(a)}}),document.querySelectorAll(".del-person-direct").forEach(e=>{e.onclick=async()=>{const a=w.personnel.find(i=>String(i._id)===String(e.dataset.id)),o=a?a.name:"this person";if(confirm(`Are you sure you want to remove ${o}?
(They will be safely retained in the database archive.)`))try{await apiDelete("/personnel/"+e.dataset.id),await z(),flashToast(`${o} removed`),oe(t)}catch(i){flashToast(i.message,!0)}}})}const G=[["strategy","Strategy"],["cs","CS"],["website","Website"],["design","Design"],["copy","Copy"],["edit","Edit"],["shoot","Shoot"],["seo","SEO"],["smo","SMO"],["qc","QC"]];async function rt(t){const s=await apiGet("/roster");t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">🏢</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Client Roster & Account Ownership</h1>
            <p class="ci360-hero-subheading">Who owns which function on each client account — separate from the job log</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addAccountBtn" type="button" style="font-weight:700;">+ Add Account</button>
        </div>
      </header>
      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table><thead><tr><th style="padding-left:22px">Client</th><th>Nature</th>${G.map(e=>`<th>${e[1]}</th>`).join("")}<th class="num">Difficulty</th><th class="num" style="padding-right:22px"></th></tr></thead>
          <tbody>${s.map(e=>`<tr>
            <td style="padding-left:22px"><strong>${escapeHtml(le(e.clientId))}</strong></td>
            <td><span class="badge ${e.nature==="Existing"?"green":"blue"}">${e.nature}</span></td>
            ${G.map(a=>`<td>${escapeHtml(e.roles[a[0]]||"—")}</td>`).join("")}
            <td class="num"><span class="badge ${e.difficulty>=9?"red":e.difficulty>=7?"amber":e.difficulty>=4?"blue":"green"}">${e.difficulty}</span></td>
            <td class="num" style="padding-right:22px"><button class="btn ghost small edit-roster" data-id="${e._id}">Edit</button></td>
          </tr>`).join("")||'<tr><td colspan="13"><div class="empty">No accounts yet.</div></td></tr>'}</tbody></table>
        </div>
      </div>
    </section>`,document.getElementById("addAccountBtn").onclick=()=>be(null),document.querySelectorAll(".edit-roster").forEach(e=>e.onclick=()=>be(s.find(a=>a._id===e.dataset.id)))}function be(t){const s=!t,e=t||{_id:null,clientId:"",nature:"Existing",roles:{},difficulty:5,comments:""};G.forEach(o=>{e.roles[o[0]]==null&&(e.roles[o[0]]="")});const a=openModal(`
    <h3>${s?"Add Account":"Edit Account"}</h3>
    <div class="field-row">
      <div class="field"><label>Client</label>
        ${s?`<select id="rClient"><option value="">Select…</option>${w.clients.map(o=>`<option value="${o._id}">${escapeHtml(o.name)}</option>`).join("")}</select>`:`<input type="text" value="${escapeHtml(le(e.clientId))}" disabled>`}
      </div>
      <div class="field"><label>Nature</label><select id="rNature"><option value="Existing" ${e.nature==="Existing"?"selected":""}>Existing</option><option value="Prospect" ${e.nature==="Prospect"?"selected":""}>Prospect</option></select></div>
    </div>
    <div class="field-row">${G.slice(0,5).map(o=>`<div class="field"><label>${o[1]}</label><input type="text" class="r-role" data-key="${o[0]}" value="${escapeHtml(e.roles[o[0]])}"></div>`).join("")}</div>
    <div class="field-row">${G.slice(5,10).map(o=>`<div class="field"><label>${o[1]}</label><input type="text" class="r-role" data-key="${o[0]}" value="${escapeHtml(e.roles[o[0]])}"></div>`).join("")}</div>
    <div class="field-row">
      <div class="field"><label>Difficulty (1-10)</label><input id="rDifficulty" type="number" min="1" max="10" value="${e.difficulty}"></div>
    </div>
    <div class="field"><label>Comments</label><textarea id="rComments">${escapeHtml(e.comments||"")}</textarea></div>
    <div class="modal-actions">
      ${s?"":'<button class="btn danger" id="mDelete" style="margin-right:auto;">Remove</button>'}
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save</button>
    </div>`);a.querySelector("#mCancel").onclick=()=>a.remove(),s||(a.querySelector("#mDelete").onclick=async()=>{confirm("Remove this account?")&&(await apiDelete("/roster/"+e._id),a.remove(),C())}),a.querySelector("#mSave").onclick=async()=>{const o={};a.querySelectorAll(".r-role").forEach(l=>o[l.dataset.key]=l.value.trim());const i={nature:a.querySelector("#rNature").value,roles:o,difficulty:Number(a.querySelector("#rDifficulty").value)||1,comments:a.querySelector("#rComments").value.trim()};try{if(s){const l=a.querySelector("#rClient").value;if(!l){flashToast("Select a client",!0);return}await apiPost("/roster",Object.assign({clientId:l},i))}else await apiPut("/roster/"+e._id,i);a.remove(),C()}catch(l){flashToast(l.message,!0)}}}function dt(t){if(!t)return"Deliverables";const s={count:"Deliverables",hours:"Hours",reels:"Reels",stories:"Stories",posts:"Posts"};return s[t]?s[t]:t.charAt(0).toUpperCase()+t.slice(1)}async function ct(t){const s=await apiGet("/targets"),e={day:"Daily",week:"Weekly",month:"Monthly"};t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">🎯</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Output & Productivity Targets</h1>
            <p class="ci360-hero-subheading">Assign and track quotas for team members across reels, stories, posts, deliverables, hours, or any custom unit.</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addAdminTargetBtn" type="button" style="font-weight:700;display:inline-flex;align-items:center;gap:6px;">
            <span>+ Add Target</span>
          </button>
        </div>
      </header>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;table-layout:fixed;min-width:780px">
            <thead>
              <tr>
                <th style="width:16%;padding-left:22px">Personnel</th>
                <th style="width:24%">Service</th>
                <th style="width:10%">Target</th>
                <th style="width:13%">Measured In</th>
                <th style="width:10%">Frequency</th>
                <th style="width:15%">Live Output</th>
                <th class="num" style="width:12%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(a=>{const o=a.personId?.name||"—",i=a.serviceId?.name||"—",l=dt(a.unit),c=e[a.period]||(a.period?a.period.toUpperCase():"Daily"),b=a.actual||0,d=a.quantity>0?b/a.quantity:0,n=Math.round(d*100),r=d>=1?"green":d>=.6?"amber":"red",g=d>=1?"✓ Met":d>=.6?"Behind":"Off Pace",p=Math.min(n,100);return`
                <tr>
                  <td style="padding-left:22px"><strong>${escapeHtml(o)}</strong></td>
                  <td><span class="badge blue" style="white-space:normal;line-height:1.3;display:inline-block;padding:4px 8px;font-size:12px">${escapeHtml(i)}</span></td>
                  <td><span style="font-size:14px;font-weight:700;color:var(--text-1)">${a.quantity}</span></td>
                  <td><span class="badge gray">${escapeHtml(l)}</span></td>
                  <td><span class="badge gray" style="font-weight:600">${c}</span></td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px">
                      <div style="display:flex;justify-content:space-between;align-items:center;font-size:11.5px">
                        <span style="font-weight:700;color:var(--text-1)">${b} / ${a.quantity} <span style="font-weight:500;color:var(--text-3)">(${n}%)</span></span>
                        <span class="badge ${r}" style="font-size:10px;padding:1px 5px">${g}</span>
                      </div>
                      <div style="height:5px;width:100%;background:var(--bg-surface);border-radius:10px;overflow:hidden;border:1px solid var(--border-xs)">
                        <div style="width:${p}%;height:100%;background:var(--${r==="green"?"green":"amber"}-500);border-radius:10px;transition:width 0.6s ease"></div>
                      </div>
                    </div>
                  </td>
                  <td class="num" style="padding-right:22px;white-space:nowrap;text-align:right">
                    <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
                      <button class="btn ghost small edit-target" data-id="${a._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
                      <button class="btn danger small del-target" data-id="${a._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
                    </div>
                  </td>
                </tr>`}).join("")||'<tr><td colspan="7"><div class="empty" style="padding:32px 20px">No targets defined yet. Click "+ Add Target" to assign output quotas.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,document.getElementById("addAdminTargetBtn").onclick=()=>fe(null),document.querySelectorAll(".edit-target").forEach(a=>{a.onclick=()=>fe(s.find(o=>o._id===a.dataset.id))}),document.querySelectorAll(".del-target").forEach(a=>{a.onclick=async()=>{if(confirm("Remove this target?"))try{await apiDelete("/targets/"+a.dataset.id),flashToast("Target removed"),C()}catch(o){flashToast(o.message,!0)}}})}function fe(t){const s=!t;t=t||{personId:w.personnel[0]?._id,serviceId:w.services[0]?._id,quantity:5,unit:"reels",period:"day"};const e=t.personId?._id||t.personId||"",a=t.serviceId?._id||t.serviceId||"",i=["reels","stories","posts","count","hours"].includes(t.unit),l=openModal(`
    <h3>${s?"Assign New":"Edit"} Target</h3>
    <p style="font-size:12.5px;color:var(--text-3);margin-bottom:16px">Set output goals for reels, stories, posts, hours, or any custom deliverable.</p>

    <div class="field" style="margin-bottom:12px">
      <label>Personnel Member *</label>
      <select id="mTgtPerson">
        ${w.personnel.map(n=>`<option value="${n._id}" ${String(n._id)===String(e)?"selected":""}>${escapeHtml(n.name)}</option>`).join("")}
      </select>
    </div>

    <div class="field" style="margin-bottom:12px">
      <label>Service / Deliverable Type *</label>
      <select id="mTgtService">
        ${w.services.map(n=>`<option value="${n._id}" ${String(n._id)===String(a)?"selected":""}>${escapeHtml(n.name)}</option>`).join("")}
      </select>
    </div>

    <div class="log-job-row" style="margin-bottom:12px">
      <div class="field" style="margin-bottom:0">
        <label>Target Quantity *</label>
        <input type="number" id="mTgtQty" min="0.5" step="0.5" value="${t.quantity||1}">
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Measured In *</label>
        <select id="mTgtUnit">
          <option value="reels" ${i&&t.unit==="reels"?"selected":""}>🎬 Reels</option>
          <option value="stories" ${i&&t.unit==="stories"?"selected":""}>📱 Stories</option>
          <option value="posts" ${i&&t.unit==="posts"?"selected":""}>🖼️ Posts</option>
          <option value="count" ${i&&t.unit==="count"?"selected":""}>📦 Deliverables / Jobs Count</option>
          <option value="hours" ${i&&t.unit==="hours"?"selected":""}>⏱️ Hours Spent</option>
          <option value="custom" ${i?"":"selected"}>✏️ Custom / Add Your Own…</option>
        </select>
      </div>
    </div>

    <div class="field" id="mTgtCustomUnitWrap" style="margin-bottom:12px;display:${i?"none":"flex"}">
      <label>Custom Unit Name (e.g. Shorts, Banners, Thumbnails, Articles, Calls) *</label>
      <input type="text" id="mTgtCustomUnit" placeholder="e.g. Shorts, Banners, Thumbnails, Articles…" value="${i?"":escapeHtml(t.unit||"")}">
    </div>

    <div class="field" style="margin-bottom:16px">
      <label>Target Frequency / Period *</label>
      <select id="mTgtPeriod">
        <option value="day" ${t.period==="day"?"selected":""}>Per Day</option>
        <option value="week" ${t.period==="week"?"selected":""}>Per Week</option>
        <option value="month" ${t.period==="month"?"selected":""}>Per Month</option>
      </select>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mTgtAttachments",label:"Reference Assets & Proofs",subtitle:"Upload reference materials, scripts, guidelines or proof examples"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mCancel">Cancel</button>
      <button class="btn gold" id="mSave">Save Target</button>
    </div>
  `);bindAttachmentUploader("mTgtAttachments",{existing:t.attachments||[]});const c=l.querySelector("#mTgtUnit"),b=l.querySelector("#mTgtCustomUnitWrap"),d=l.querySelector("#mTgtCustomUnit");c.onchange=()=>{c.value==="custom"?(b.style.display="flex",d.focus()):b.style.display="none"},l.querySelector("#mCancel").onclick=()=>l.remove(),l.querySelector("#mSave").onclick=async()=>{let n=c.value;n==="custom"&&(n=d.value.trim()||"Deliverables");const r=getUploaderAttachments("mTgtAttachments"),g={personId:l.querySelector("#mTgtPerson").value,serviceId:l.querySelector("#mTgtService").value,quantity:Number(l.querySelector("#mTgtQty").value)||1,unit:n,period:l.querySelector("#mTgtPeriod").value,attachments:r};if(!g.personId||!g.serviceId){flashToast("Person and Service are required",!0);return}try{s?await apiPost("/targets",g):await apiPut("/targets/"+t._id,g),flashToast("Target saved successfully! 🎯"),l.remove(),C()}catch(p){flashToast(p.message,!0)}}}async function pt(t){const[s,e]=await Promise.all([apiGet("/salary/grades"),apiGet("/salary/assignments")]);w.salaryGrades=s,w.salaryAssignments=e;const a={};e.forEach(o=>a[o.personId]=o.gradeId),t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">💰</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Salary Grades & Compensation Bands</h1>
            <p class="ci360-hero-subheading">Configure role bands and assign personnel tiers without exposing individual salaries</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addGradeBtn" type="button" style="font-weight:700;">+ Add Grade</button>
        </div>
      </header>
      <div class="manage-list">${s.map(o=>`<div class="manage-item"><div><strong>${escapeHtml(o.label)}</strong><div class="muted">${fmtINR(o.min)} – ${fmtINR(o.max)} / month</div></div>
        <div><button class="btn ghost small edit-grade" data-id="${o._id}">Edit</button><button class="btn danger small del-grade" data-id="${o._id}">Remove</button></div></div>`).join("")||'<div style="padding:14px;">No grades yet.</div>'}</div>
      <div style="margin:10px 0 24px;"><button class="btn ghost small" id="addGradeBtn">+ Add Grade</button></div>
      <h3 style="font-size:15px;margin-bottom:8px;">Assign Grades</h3>
      <div class="card"><table><thead><tr><th>Person</th><th>Status</th><th class="num">Grade</th></tr></thead>
      <tbody>${w.personnel.map(o=>`<tr><td><strong>${escapeHtml(o.name)}</strong><div class="muted">${escapeHtml(o.duties||"")}</div></td>
        <td><span class="badge green">${o.status}</span></td>
        <td class="num"><select class="grade-select" data-id="${o._id}"><option value="">Not set</option>${s.map(i=>`<option value="${i._id}" ${a[o._id]===i._id?"selected":""}>${escapeHtml(i.label)}</option>`).join("")}</select></td>
      </tr>`).join("")}</tbody></table></div>
    </section>`,document.getElementById("addGradeBtn").onclick=()=>he(null),document.querySelectorAll(".edit-grade").forEach(o=>o.onclick=()=>he(s.find(i=>i._id===o.dataset.id))),document.querySelectorAll(".del-grade").forEach(o=>o.onclick=async()=>{confirm("Remove grade?")&&(await apiDelete("/salary/grades/"+o.dataset.id),C())}),document.querySelectorAll(".grade-select").forEach(o=>{o.onchange=async()=>{await apiPut("/salary/assignments/"+o.dataset.id,{gradeId:o.value||null}),flashToast("Saved")}})}function he(t){const s=!t;t=t||{label:"",min:0,max:0};const e=openModal(`<h3>${s?"Add":"Edit"} Grade</h3>
    <div class="field"><label>Label</label><input id="gLabel" type="text" value="${escapeHtml(t.label)}"></div>
    <div class="field-row"><div class="field"><label>Range Start (₹)</label><input id="gMin" type="number" value="${t.min}"></div><div class="field"><label>Range End (₹)</label><input id="gMax" type="number" value="${t.max}"></div></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={label:e.querySelector("#gLabel").value.trim(),min:Number(e.querySelector("#gMin").value)||0,max:Number(e.querySelector("#gMax").value)||0};if(!a.label){flashToast("Label required",!0);return}try{s?await apiPost("/salary/grades",a):await apiPut("/salary/grades/"+t._id,a),e.remove(),C()}catch(o){flashToast(o.message,!0)}}}function Ee(t){const s={active:"green","work from home":"blue",wfh:"blue","on leave":"amber",inactive:"gray"};t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">⚙️</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">Settings & Administration</h1>
            <p class="ci360-hero-subheading">Manage team members, roles, permissions, and sidebar navigation layout</p>
          </div>
        </div>
      </header>

      <!-- Admin Account Settings Card -->
      <div style="margin-bottom:24px;width:100%;max-width:100%;box-sizing:border-box;">
        ${Me({title:"My Administrator Credentials",subtitle:"Manage your personal login email, display name, and password"})}
      </div>

      <!-- Superadmin Sidebar Navigation Customizer Card -->
      ${D?.role==="superadmin"?ut():""}

      <!-- Personnel Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Team Personnel (${w.personnel.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Active team members, capacities, and working arrangements</div>
          </div>
          <button class="btn gold small" id="addPersonBtn" type="button">+ Add Person</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Personnel Name</th>
                <th>Duties & Responsibilities</th>
                <th class="num">Weekly Capacity</th>
                <th>Status</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${w.personnel.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${escapeHtml(i.duties||"—")}</td>
                  <td class="num"><strong>${i.capacity||48} hrs</strong>/wk</td>
                  <td><span class="badge ${s[i.status]||"green"}">${escapeHtml(i.status||"active")}</span></td>
                  <td class="num">
                    <div style="display:inline-flex;gap:4px;align-items:center;justify-content:flex-end;">
                      ${D?.role==="superadmin"?`<button class="btn ghost small person-modules-btn" data-id="${i._id}" data-name="${escapeHtml(i.name)}" style="color:#0070F3;border-color:rgba(0,112,243,0.3);padding:4px 8px;font-size:11px;" title="Customize Sidebar Modules for this Person">🧭 Modules</button>`:""}
                      <button class="btn ghost small edit-person" data-id="${i._id}">Edit</button>
                      <button class="btn danger small del-person" data-id="${i._id}">Remove</button>
                    </div>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="5"><div class="empty">No personnel added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Clients Section -->
      <div class="card" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Client Accounts (${w.clients.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Corporate clients, account details, and brand specifications</div>
          </div>
          <button class="btn gold small" id="addClientBtn" type="button">+ Add Client</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Notes & Description</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${w.clients.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td>${i.notes?escapeHtml(i.notes):'<span class="muted">—</span>'}</td>
                  <td class="num">
                    <button class="btn ghost small edit-client" data-id="${i._id}">Edit</button>
                    <button class="btn danger small del-client" data-id="${i._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No clients added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Services Section -->
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:16px;font-weight:800;color:var(--text-1);margin:0 0 2px 0">Service Offerings (${w.services.length})</h3>
            <div style="font-size:12px;color:var(--text-3)">Standard deliverable offerings and reference effort hours</div>
          </div>
          <button class="btn gold small" id="addServiceBtn" type="button">+ Add Service</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th class="num">Reference Effort</th>
                <th class="num">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${w.services.map(i=>`
                <tr>
                  <td><strong>${escapeHtml(i.name)}</strong></td>
                  <td class="num"><strong>${i.hours||0} hrs</strong> baseline</td>
                  <td class="num">
                    <button class="btn ghost small edit-service" data-id="${i._id}">Edit</button>
                    <button class="btn danger small del-service" data-id="${i._id}">Remove</button>
                  </td>
                </tr>
              `).join("")||'<tr><td colspan="3"><div class="empty">No services added yet.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;const e=document.getElementById("addPersonBtn");e&&(e.onclick=()=>ne(null)),document.querySelectorAll(".edit-person").forEach(i=>i.onclick=()=>ne(w.personnel.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-person").forEach(i=>i.onclick=async()=>{confirm("Remove this person?")&&(await apiDelete("/personnel/"+i.dataset.id),await z(),C())}),document.querySelectorAll(".person-modules-btn").forEach(i=>{i.onclick=()=>{const l=i.dataset.id,c=i.dataset.name||"",b=(w.users||[]).find(d=>String(d.personnelId?._id||d.personnelId)===String(l))||(w.users||[]).find(d=>d.name&&d.name.toLowerCase()===c.toLowerCase());b?Te(b):flashToast(`No user login account found for ${c} yet. Create one in the Users tab to set modules!`,"info")}});const a=document.getElementById("addClientBtn");a&&(a.onclick=()=>ye(null)),document.querySelectorAll(".edit-client").forEach(i=>i.onclick=()=>ye(w.clients.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-client").forEach(i=>i.onclick=async()=>{confirm("Remove this client?")&&(await apiDelete("/clients/"+i.dataset.id),await z(),C())});const o=document.getElementById("addServiceBtn");o&&(o.onclick=()=>xe(null)),document.querySelectorAll(".edit-service").forEach(i=>i.onclick=()=>xe(w.services.find(l=>l._id===i.dataset.id))),document.querySelectorAll(".del-service").forEach(i=>i.onclick=async()=>{confirm("Remove this service?")&&(await apiDelete("/services/"+i.dataset.id),await z(),C())}),Le(t),D?.role==="superadmin"&&mt(),$.tabParams?.section==="sidebar-customizer"&&setTimeout(()=>{const i=document.getElementById("sidebarCustomizerCard");i&&(i.scrollIntoView({behavior:"smooth",block:"start"}),i.style.outline="2px solid #0070F3",setTimeout(()=>i.style.outline="",1500))},120)}function H(){return ee||(ee=JSON.parse(JSON.stringify(Se()))),ee}function ut(){const t=H(),s=I!=="__global__",e=s?(w.users||[]).find(i=>i._id===I):null,a=s&&e?e.role==="superadmin"?"admin":e.role:j||"admin",o=[{key:"admin",label:"🛡️ Admin Dashboard"},{key:"employee",label:"💼 Employee Workspace"},{key:"accounts",label:"💳 Accounts & Billing"},{key:"client",label:"🏢 Client Portal"}];return`
    <div class="nav-customizer-card" id="sidebarCustomizerCard">
      <div class="nav-customizer-header">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="font-size:22px;">🧭</span>
            <h3 style="font-size:18px;font-weight:800;color:var(--text-1);margin:0;">Dashboard Sidebar & Module Customizer</h3>
            <span class="badge purple" style="font-size:11px;padding:3px 8px;font-weight:700;">👑 Superadmin Control</span>
          </div>
          <p style="font-size:13px;color:var(--text-3);margin:0;">
            Customize which sidebar tabs and modules appear across all dashboards or for specific individual team members.
          </p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          ${s?`
            <button type="button" class="btn ghost small" id="resetNavDefaultsBtn" title="Reset this person's module overrides to role defaults">
              ↺ Reset to Role Default
            </button>
            <button type="button" class="btn gold small" id="saveNavConfigBtn">
              💾 Save Permissions for ${escapeHtml(e?e.name:"User")}
            </button>
          `:`
            <button type="button" class="btn ghost small" id="resetNavDefaultsBtn" title="Reset all sidebars back to default visibility">
              ↺ Reset to Defaults
            </button>
            <button type="button" class="btn gold small" id="saveNavConfigBtn">
              💾 Save Navigation Settings
            </button>
          `}
        </div>
      </div>

      <!-- Scope Selector (Global Defaults vs Specific Person) -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 24px;border-bottom:1px solid var(--border-color);background:rgba(255,255,255,0.02);flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <label for="customizerPersonSelect" style="font-size:13px;font-weight:700;color:var(--text-1);display:flex;align-items:center;gap:6px;">
            <span>Target Person / Scope:</span>
          </label>
          <select id="customizerPersonSelect" class="input small" style="min-width:290px;font-weight:600;">
            <option value="__global__" ${s?"":"selected"}>🌐 Global Role Defaults (All Users)</option>
            <optgroup label="── Customize Specific Person ──">
              ${(w.users||[]).map(i=>{const l=i.customModules&&Object.keys(i.customModules).length>0;return`
                  <option value="${i._id}" ${I===i._id?"selected":""}>
                    👤 ${escapeHtml(i.name)} (${i.role.toUpperCase()})${l?" ★ Custom":""}
                  </option>
                `}).join("")}
            </optgroup>
          </select>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${s?`
            <span class="badge blue" style="font-size:11px;padding:3px 8px;">👤 Customizing ${escapeHtml(e?e.name:"")}</span>
          `:`
            <span class="badge green" style="font-size:11px;padding:3px 8px;">🌐 Global Dashboard Mode</span>
          `}
        </div>
      </div>

      <!-- Dashboard Selector Pills (Shown when in Global Mode) -->
      ${s?`
      <div style="padding:10px 24px;border-bottom:1px solid var(--border-color);background:rgba(0,112,243,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <span style="font-size:12.5px;color:var(--text-1);font-weight:600;">
          Workspace: <strong>${escapeHtml(a.toUpperCase())} DASHBOARD</strong> · Target User: <strong>${escapeHtml(e?e.name:"")}</strong> (${escapeHtml(e?e.email:"")})
        </span>
        <span class="pill-counter" id="dashCount_user" style="background:#0070F3;color:#fff;padding:3px 9px;border-radius:10px;font-weight:700;font-size:11.5px;"></span>
      </div>`:`
      <div class="nav-customizer-dash-tabs" id="navDashTabs">
        ${o.map(i=>{const l=t[i.key]||[],c=l.filter(d=>d.visible!==!1).length,b=l.length;return`
            <button type="button" class="nav-dash-pill ${a===i.key?"active":""}" data-dash="${i.key}">
              <span>${i.label}</span>
              <span class="pill-counter" id="dashCount_${i.key}">${c} / ${b} visible</span>
            </button>
          `}).join("")}
      </div>`}

      <!-- Toolbar with Quick All-Module Show / Hide -->
      <div class="nav-customizer-toolbar">
        <div style="display:flex;align-items:center;gap:10px;flex:1;max-width:320px;">
          <input type="text" class="input small" id="navItemSearch" placeholder="Search sidebar tabs..." value="${escapeHtml(F)}" style="width:100%;">
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <button type="button" class="btn ghost small" id="navShowAllBtn" style="color:#10b981;border-color:rgba(16,185,129,0.3);font-weight:600;" title="Make all modules visible for this scope">
            👁️ Show All Modules
          </button>
          <button type="button" class="btn ghost small" id="navHideAllBtn" style="color:#f59e0b;border-color:rgba(245,158,11,0.3);font-weight:600;" title="Hide all optional modules for this scope">
            🙈 Hide All Modules
          </button>
        </div>
      </div>

      <!-- Nav Items Grid -->
      <div class="nav-items-grid" id="navItemsGrid">
        ${V(a,t,F)}
      </div>
    </div>
  `}function V(t,s,e=""){const a=I!=="__global__",o=a?(w.users||[]).find(b=>b._id===I):null,i=s[t]||J[t]||[],l=(e||"").toLowerCase().trim(),c=i.filter(b=>l?b.label&&b.label.toLowerCase().includes(l)||b.key&&b.key.toLowerCase().includes(l)||b.category&&b.category.toLowerCase().includes(l):!0);return c.length===0?`<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--text-3);font-size:13px;">No sidebar tabs found matching "${escapeHtml(e)}"</div>`:c.map(b=>{let d=b.visible!==!1;a&&o&&o.customModules&&o.customModules[b.key]!==void 0&&(d=!!o.customModules[b.key]);const n=!!b.locked;return`
      <div class="nav-item-card ${d?"":"is-hidden"}" data-dash="${t}" data-key="${b.key}">
        <div style="display:flex;align-items:center;gap:12px;overflow:hidden;">
          <div style="font-size:22px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border-radius:8px;flex-shrink:0;">
            ${b.icon||"📌"}
          </div>
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <strong style="font-size:13px;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(b.label)}</strong>
              ${n?'<span class="badge blue" style="font-size:10px;padding:1px 5px;">🔒 System Required</span>':""}
              ${b.superadminOnly?'<span class="badge purple" style="font-size:10px;padding:1px 5px;">👑 Superadmin</span>':""}
            </div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
              <span style="font-size:11px;color:var(--text-3);font-family:monospace;">${b.key}</span>
              ${b.category?`<span style="font-size:11px;color:var(--text-3);">· ${b.category}</span>`:""}
              <span class="nav-status-indicator" style="font-size:11px;font-weight:600;color:${d?"#10b981":"#f59e0b"};">
                ${d?"● Visible":"○ Hidden"}
              </span>
            </div>
          </div>
        </div>
        <div style="margin-left:12px;flex-shrink:0;">
          <label class="ci-switch" title="${n?"Cannot hide settings to prevent lockout":d?"Click to hide from sidebar":"Click to show in sidebar"}">
            <input type="checkbox" class="nav-toggle-input" data-dash="${t}" data-key="${b.key}" ${d?"checked":""} ${n?"disabled":""}>
            <span class="ci-switch-slider"></span>
          </label>
        </div>
      </div>
    `}).join("")}function K(){const t=H(),s=I!=="__global__",e=s?(w.users||[]).find(a=>a._id===I):null;if(s&&e){const a=e.role==="superadmin"?"admin":e.role,o=t[a]||J[a]||[];let i=0;o.forEach(c=>{e.customModules&&e.customModules[c.key]!==void 0?e.customModules[c.key]&&i++:c.visible!==!1&&i++});const l=document.getElementById("dashCount_user");l&&(l.textContent=`${i} / ${o.length} modules visible`)}else["admin","employee","accounts","client"].forEach(a=>{const o=document.getElementById(`dashCount_${a}`);if(o){const i=t[a]||[],l=i.filter(c=>c.visible!==!1).length;o.textContent=`${l} / ${i.length} visible`}})}function mt(t){const s=document.getElementById("sidebarCustomizerCard");if(!s)return;const e=document.getElementById("customizerPersonSelect");e&&(e.onchange=d=>{if(I=d.target.value,I!=="__global__"){const r=(w.users||[]).find(g=>g._id===I);r&&(j=r.role==="superadmin"?"admin":r.role,r.customModules||(r.customModules={}))}const n=document.getElementById("content");n&&Ee(n)}),s.querySelectorAll(".nav-dash-pill").forEach(d=>{d.onclick=()=>{j=d.dataset.dash,s.querySelectorAll(".nav-dash-pill").forEach(r=>r.classList.toggle("active",r===d));const n=document.getElementById("navItemsGrid");n&&(n.innerHTML=V(j,H(),F),l())}});const a=document.getElementById("navItemSearch");a&&(a.oninput=d=>{F=d.target.value;const n=document.getElementById("navItemsGrid");n&&(n.innerHTML=V(j,H(),F),l())});const o=document.getElementById("navShowAllBtn");o&&(o.onclick=()=>{const d=I!=="__global__",n=d?(w.users||[]).find(y=>y._id===I):null,r=H(),g=d&&n?n.role==="superadmin"?"admin":n.role:j,p=r[g]||J[g]||[];d&&n?(n.customModules||(n.customModules={}),p.forEach(y=>{n.customModules[y.key]=!0})):p.forEach(y=>{y.visible=!0});const f=document.getElementById("navItemsGrid");f&&(f.innerHTML=V(g,r,F),l()),K()});const i=document.getElementById("navHideAllBtn");i&&(i.onclick=()=>{const d=I!=="__global__",n=d?(w.users||[]).find(y=>y._id===I):null,r=H(),g=d&&n?n.role==="superadmin"?"admin":n.role:j,p=r[g]||J[g]||[];d&&n?(n.customModules||(n.customModules={}),p.forEach(y=>{n.customModules[y.key]=!!y.locked})):p.forEach(y=>{y.locked||(y.visible=!1)});const f=document.getElementById("navItemsGrid");f&&(f.innerHTML=V(g,r,F),l()),K()});function l(){s.querySelectorAll(".nav-toggle-input").forEach(d=>{d.onchange=()=>{const n=d.dataset.dash,r=d.dataset.key,g=I!=="__global__",p=g?(w.users||[]).find(u=>u._id===I):null,f=H();if(g&&p)p.customModules||(p.customModules={}),p.customModules[r]=d.checked;else{const u=(f[n]||[]).find(v=>v.key===r);u&&!u.locked&&(u.visible=d.checked)}const y=d.closest(".nav-item-card");if(y){y.classList.toggle("is-hidden",!d.checked);const u=y.querySelector(".nav-status-indicator");u&&(u.textContent=d.checked?"● Visible":"○ Hidden",u.style.color=d.checked?"#10b981":"#f59e0b")}K()}})}l(),K();const c=document.getElementById("saveNavConfigBtn");c&&(c.onclick=async()=>{c.disabled=!0,c.textContent="Saving…";try{const d=I!=="__global__",n=d?(w.users||[]).find(r=>r._id===I):null;if(d&&n)await ae(n._id,n.customModules||{}),flashToast(`✅ Module permissions saved for ${n.name}!`,"success");else{const r=H();await Ue(r),flashToast("✅ Dashboard sidebar settings saved! Updating navigation...","success")}setTimeout(()=>{M()},300)}catch(d){flashToast("❌ Failed to save navigation: "+d.message,"error"),c.disabled=!1,c.textContent="💾 Save Navigation Settings"}});const b=document.getElementById("resetNavDefaultsBtn");b&&(b.onclick=async()=>{const d=I!=="__global__",n=d?(w.users||[]).find(r=>r._id===I):null;if(d&&n){if(!confirm(`Reset ${n.name}'s module permissions back to role defaults?`))return;b.disabled=!0,b.textContent="Resetting…";try{n.customModules={},await ae(n._id,{}),flashToast(`↺ ${n.name}'s modules reset to role default!`,"success"),M()}catch(r){flashToast("❌ Failed to reset: "+r.message,"error"),b.disabled=!1,b.textContent="↺ Reset to Role Default"}}else{if(!confirm("Are you sure you want to reset sidebar navigation for all dashboards back to default visible tabs?"))return;b.disabled=!0,b.textContent="Resetting…";try{const r=await je();ee=JSON.parse(JSON.stringify(r.config||J)),flashToast("↺ Sidebar navigation reset to defaults!","success"),M()}catch(r){flashToast("❌ Failed to reset navigation: "+r.message,"error"),b.disabled=!1,b.textContent="↺ Reset to Defaults"}}})}function Te(t){if(!t)return;const s=t.role==="superadmin"?"admin":t.role,e=J[s]||[],a=Se()[s]||e;let o={...t.customModules||{}};function i(n){if(o[n]!==void 0)return!!o[n];const r=a.find(g=>g.key===n);return r?r.visible!==!1:!0}function l(){return e.filter(n=>i(n.key)).length}function c(){return`
      <div style="padding:4px 0 16px 0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:22px;">🧭</span>
              <h3 style="margin:0;font-size:18px;font-weight:800;color:var(--text-1);">${escapeHtml(t.name)}</h3>
              <span class="badge ${t.role==="admin"?"blue":t.role==="employee"?"purple":"gold"}">${t.role.toUpperCase()}</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
              Configure which sidebar navigation modules are visible for this specific user.
            </div>
          </div>
          <div class="pill-counter" id="modalVisCounter" style="background:#0070F3;color:#fff;padding:4px 10px;border-radius:12px;font-weight:700;font-size:12px;">
            ${l()} / ${e.length} modules visible
          </div>
        </div>

        <!-- Master Bulk Actions Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:10px;padding:10px 14px;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <span style="font-size:12px;font-weight:600;color:var(--text-2);">Quick Controls:</span>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn ghost small" id="mShowAllBtn" style="color:#10b981;border-color:rgba(16,185,129,0.3);font-weight:600;">
              👁️ Show All Modules
            </button>
            <button type="button" class="btn ghost small" id="mHideAllBtn" style="color:#f59e0b;border-color:rgba(245,158,11,0.3);font-weight:600;">
              🙈 Hide All Modules
            </button>
            <button type="button" class="btn ghost small" id="mResetDefaultBtn" style="color:var(--text-3);">
              ↺ Role Default
            </button>
          </div>
        </div>

        <!-- Modules Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:10px;max-height:55vh;overflow-y:auto;padding-right:4px;" id="mModulesGrid">
          ${e.map(n=>{const r=i(n.key),g=!!n.locked;return`
              <div class="nav-item-card ${r?"":"is-hidden"}" data-key="${n.key}" style="padding:10px 12px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                  <span style="font-size:20px;flex-shrink:0;">${n.icon||"📌"}</span>
                  <div style="min-width:0;">
                    <div style="font-size:13px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(n.label)}</div>
                    <div style="font-size:11px;font-weight:600;color:${r?"#10b981":"#f59e0b"};" class="m-status-lbl">${r?"● Visible":"○ Hidden"}</div>
                  </div>
                </div>
                <label class="ci-switch">
                  <input type="checkbox" class="m-toggle-input" data-key="${n.key}" ${r?"checked":""} ${g?"disabled":""}>
                  <span class="ci-switch-slider"></span>
                </label>
              </div>
            `}).join("")}
        </div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:14px;border-top:1px solid var(--border-color);">
          <button type="button" class="btn ghost" id="mCancelBtn">Cancel</button>
          <button type="button" class="btn gold" id="mSaveBtn">💾 Save Permissions for ${escapeHtml(t.name)}</button>
        </div>
      </div>
    `}const b=openModal(c(),"medium");function d(){const n=b.querySelector("#modalVisCounter"),r=b.querySelector("#mShowAllBtn");r&&(r.onclick=()=>{e.forEach(m=>{o[m.key]=!0}),u()});const g=b.querySelector("#mHideAllBtn");g&&(g.onclick=()=>{e.forEach(m=>{o[m.key]=!!m.locked}),u()});const p=b.querySelector("#mResetDefaultBtn");p&&(p.onclick=()=>{o={},u()});const f=b.querySelector("#mCancelBtn");f&&(f.onclick=()=>b.remove());function y(){b.querySelectorAll(".m-toggle-input").forEach(m=>{m.onchange=()=>{const x=m.dataset.key;o[x]=m.checked;const k=m.closest(".nav-item-card");if(k){k.classList.toggle("is-hidden",!m.checked);const E=k.querySelector(".m-status-lbl");E&&(E.textContent=m.checked?"● Visible":"○ Hidden",E.style.color=m.checked?"#10b981":"#f59e0b")}n&&(n.textContent=`${l()} / ${e.length} modules visible`)}})}function u(){const m=b.querySelector("#mModulesGrid");m&&(m.innerHTML=e.map(x=>{const k=i(x.key),E=!!x.locked;return`
            <div class="nav-item-card ${k?"":"is-hidden"}" data-key="${x.key}" style="padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                <span style="font-size:20px;flex-shrink:0;">${x.icon||"📌"}</span>
                <div style="min-width:0;">
                  <div style="font-size:13px;font-weight:700;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(x.label)}</div>
                  <div style="font-size:11px;font-weight:600;color:${k?"#10b981":"#f59e0b"};" class="m-status-lbl">${k?"● Visible":"○ Hidden"}</div>
                </div>
              </div>
              <label class="ci-switch">
                <input type="checkbox" class="m-toggle-input" data-key="${x.key}" ${k?"checked":""} ${E?"disabled":""}>
                <span class="ci-switch-slider"></span>
              </label>
            </div>
          `}).join(""),y()),n&&(n.textContent=`${l()} / ${e.length} modules visible`)}y();const v=b.querySelector("#mSaveBtn");v&&(v.onclick=async()=>{v.disabled=!0,v.textContent="Saving…";try{await ae(t._id||t.id,o),t.customModules=o,flashToast(`✅ Module permissions updated for ${t.name}!`,"success"),b.remove(),setTimeout(()=>{M()},300)}catch(m){flashToast("❌ Failed to save: "+m.message,"error"),v.disabled=!1,v.textContent=`💾 Save Permissions for ${escapeHtml(t.name)}`}})}d()}const vt=Ee;function ne(t){const s=!t;t=t||{name:"",duties:"",capacity:48,status:"active",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Person</h3>
    <div class="field"><label>Full Name *</label><input id="mName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Shatayu Verma"></div>
    <div class="field"><label>Duties / Role</label><input id="mDuties" type="text" value="${escapeHtml(t.duties)}" placeholder="e.g. Lead Designer / Frontend"></div>
    <div class="log-job-row" style="margin-bottom:16px;">
      <div class="field" style="margin-bottom:0;"><label>Weekly Capacity (hrs)</label><input id="mCapacity" type="number" value="${t.capacity||48}"></div>
      <div class="field" style="margin-bottom:0;"><label>Status</label><select id="mStatus">
        <option value="active" ${t.status==="active"?"selected":""}>Active</option>
        <option value="work from home" ${t.status==="work from home"||t.status==="wfh"?"selected":""}>Work From Home</option>
        <option value="on leave" ${t.status==="on leave"||t.status==="pn leave"?"selected":""}>On Leave</option>
        <option value="inactive" ${t.status==="inactive"?"selected":""}>Inactive</option>
      </select></div>
    </div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mPersonFiles",label:"Documents & Contracts",subtitle:"Upload resumes, ID proofs, employment contracts or certificates"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Person</button></div>
  `);bindAttachmentUploader("mPersonFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mPersonFiles"),o={name:e.querySelector("#mName").value.trim(),duties:e.querySelector("#mDuties").value.trim(),capacity:Number(e.querySelector("#mCapacity").value)||48,status:e.querySelector("#mStatus").value,attachments:a};if(!o.name){flashToast("Name is required",!0);return}try{s?await apiPost("/personnel",o):await apiPut("/personnel/"+t._id,o),await z(),flashToast("Person saved! 📁"),e.remove(),C()}catch(i){flashToast(i.message,!0)}}}function ye(t){const s=!t;t=t||{name:"",notes:"",attachments:[]};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Client</h3>
    <div class="field"><label>Client Name *</label><input id="mCName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. Network 18"></div>
    <div class="field"><label>Notes / Contract Details</label><textarea id="mCNotes" placeholder="Client specific notes, contact terms...">${escapeHtml(t.notes||"")}</textarea></div>
    <div style="margin-bottom:16px;">
      ${renderAttachmentUploader({id:"mClientFiles",label:"Brand Assets & Agreements",subtitle:"Upload brand guidelines, contracts, briefs or logos"})}
    </div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Client</button></div>
  `);bindAttachmentUploader("mClientFiles",{existing:t.attachments||[]}),e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a=getUploaderAttachments("mClientFiles"),o={name:e.querySelector("#mCName").value.trim(),notes:e.querySelector("#mCNotes").value.trim(),attachments:a};if(!o.name){flashToast("Name is required",!0);return}try{s?await apiPost("/clients",o):await apiPut("/clients/"+t._id,o),await z(),flashToast("Client saved! 📁"),e.remove(),C()}catch(i){flashToast(i.message,!0)}}}function xe(t){const s=!t;t=t||{name:"",hours:4};const e=openModal(`
    <h3>${s?"Add New":"Edit"} Service</h3>
    <div class="field"><label>Service Name *</label><input id="mSName" type="text" value="${escapeHtml(t.name)}" placeholder="e.g. UI/UX Design"></div>
    <div class="field"><label>Reference Effort (hrs)</label><input id="mSHours" type="number" value="${t.hours||4}" min="0"></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save Service</button></div>
  `);e.querySelector("#mCancel").onclick=()=>e.remove(),e.querySelector("#mSave").onclick=async()=>{const a={name:e.querySelector("#mSName").value.trim(),hours:Number(e.querySelector("#mSHours").value)||0};if(!a.name){flashToast("Name is required",!0);return}try{s?await apiPost("/services",a):await apiPut("/services/"+t._id,a),await z(),e.remove(),C()}catch(o){flashToast(o.message,!0)}}}async function Ie(t){const s=await apiGet("/users");let e="all",a="role",o="";function i(){let p=[...s];if(o){const u=o.toLowerCase();p=p.filter(v=>v.name&&v.name.toLowerCase().includes(u)||v.email&&v.email.toLowerCase().includes(u)||v.role&&v.role.toLowerCase().includes(u))}e==="admin"?p=p.filter(u=>u.role==="superadmin"||u.role==="admin"):e==="accounts"?p=p.filter(u=>u.role==="accounts"):e==="employee"?p=p.filter(u=>u.role==="employee"):e==="client"&&(p=p.filter(u=>u.role==="client"));const f={superadmin:1,admin:1,accounts:2,employee:3,client:4};a==="role"?p.sort((u,v)=>{const m=f[u.role]||9,x=f[v.role]||9;return m!==x?m-x:(u.name||"").localeCompare(v.name||"")}):a==="role-desc"?p.sort((u,v)=>{const m=f[u.role]||9,x=f[v.role]||9;return m!==x?x-m:(u.name||"").localeCompare(v.name||"")}):a==="name-asc"?p.sort((u,v)=>(u.name||"").localeCompare(v.name||"")):a==="name-desc"?p.sort((u,v)=>(v.name||"").localeCompare(u.name||"")):a==="status"&&p.sort((u,v)=>(v.active?1:0)-(u.active?1:0));const y=t.querySelector("#userTableBody");if(y){if(p.length===0){y.innerHTML='<tr><td colspan="6"><div class="empty" style="padding:32px 16px">No users found matching the selected filters.</div></td></tr>';return}y.innerHTML=p.map(u=>{const v=u.role==="superadmin",m=u.role==="admin",x=u.role==="accounts",k=u.role==="employee",E=v?'<span class="badge gold" style="font-weight:700">👑 Superadmin</span>':m?'<span class="badge gold" style="font-weight:700">🛡️ Admin</span>':x?'<span class="badge amber" style="font-weight:700">💳 Accounts</span>':k?'<span class="badge blue" style="font-weight:700">💼 Employee</span>':'<span class="badge green" style="font-weight:700">🤝 Client</span>',O=u.personnelId?escapeHtml(u.personnelId.name):u.clientId?escapeHtml(u.clientId.name):'<span class="muted">—</span>';return`
        <tr>
          <td style="padding-left:22px">
            <div style="font-weight:700;color:var(--text-1)">${escapeHtml(u.name)}</div>
          </td>
          <td><span style="color:var(--text-2);font-size:13px">${escapeHtml(u.email)}</span></td>
          <td>${E}</td>
          <td>${O}</td>
          <td><span class="badge ${u.active?"green":"gray"}">${u.active?"🟢 Active":"⚪ Disabled"}</span></td>
          <td class="num" style="padding-right:22px;text-align:right;white-space:nowrap">
            <div style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end">
              <button class="btn ghost small user-modules-btn" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px;color:#0070F3;border-color:rgba(0,112,243,0.35);font-weight:600;" title="Customize Sidebar Modules for this Person">🧭 Modules</button>
              <button class="btn ghost small reset-pw-user" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px" title="Change Password">🔑 Password</button>
              <button class="btn ghost small edit-user" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px">Edit</button>
              <button class="btn danger small del-user" data-id="${u._id}" style="padding:4px 8px;font-size:11.5px">Remove</button>
            </div>
          </td>
        </tr>`}).join(""),y.querySelectorAll(".user-modules-btn").forEach(u=>{u.onclick=()=>{const v=s.find(m=>m._id===u.dataset.id);v&&Te(v)}}),y.querySelectorAll(".reset-pw-user").forEach(u=>{u.onclick=async()=>{const v=s.find(x=>x._id===u.dataset.id);if(!v)return;const m=prompt(`Enter new password for ${v.name} (${v.email}):`);if(!(!m||!m.trim()))try{await apiPut("/users/"+v._id,{password:m.trim()}),flashToast(`Password successfully changed for ${v.name}! 🔑`)}catch(x){flashToast(x.message,!0)}}}),y.querySelectorAll(".edit-user").forEach(u=>u.onclick=()=>we(s.find(v=>v._id===u.dataset.id))),y.querySelectorAll(".del-user").forEach(u=>u.onclick=async()=>{const v=u.dataset.id,m=s.find(k=>k._id===v),x=m?m.name:"this user";if(confirm(`Permanently remove ${x} from CI360?`))try{await apiDelete("/users/"+v),flashToast(`User ${x} removed`);const k=s.findIndex(E=>E._id===v);k!==-1&&s.splice(k,1),i(),await Ie(t)}catch(k){flashToast(k.message,!0)}})}}const l=s.filter(p=>p.role==="superadmin"||p.role==="admin").length,c=s.filter(p=>p.role==="accounts").length,b=s.filter(p=>p.role==="employee").length,d=s.filter(p=>p.role==="client").length;t.innerHTML=`
    <section class="block">
      <header class="ci360-hero-banner">
        <div class="ci360-hero-left">
          <div class="ci360-hero-icon">👤</div>
          <div class="ci360-hero-title-group">
            <h1 class="ci360-hero-heading">User Accounts & Credentials</h1>
            <p class="ci360-hero-subheading">Manage login access, roles, and security credentials for all team and client users</p>
          </div>
        </div>
        <div class="ci360-hero-actions">
          <button class="btn primary" id="addUserBtn" type="button" style="font-weight:700;">+ Add User</button>
        </div>
      </header>

      <!-- Controls: Filter Chips, Search, Sort Dropdown -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <!-- Filter Tabs -->
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="pchip active user-role-filter" data-role="all">All (${s.length})</button>
          <button class="pchip user-role-filter" data-role="admin">👑 Admins (${l})</button>
          <button class="pchip user-role-filter" data-role="accounts">💳 Accounts (${c})</button>
          <button class="pchip user-role-filter" data-role="employee">💼 Employees (${b})</button>
          <button class="pchip user-role-filter" data-role="client">🤝 Clients (${d})</button>
        </div>

        <!-- Search & Sort Controls -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <input type="text" id="userSearchInp" placeholder="🔍 Search users..." style="width:170px;padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm)">
          
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:12px;font-weight:700;color:var(--text-3);white-space:nowrap">Sort:</span>
            <select id="userSortSel" style="padding:6px 10px;font-size:12.5px;border-radius:var(--r-sm);width:auto">
              <option value="role" selected>Role (Admin → Employee → Client)</option>
              <option value="role-desc">Role (Client → Employee → Admin)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="status">Status (Active First)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card table-card" style="padding:0;overflow:hidden">
        <div class="table-wrapper">
          <table style="width:100%;border-collapse:collapse;min-width:700px">
            <thead>
              <tr>
                <th style="width:22%;padding-left:22px">Name</th>
                <th style="width:26%">Email / Login</th>
                <th style="width:16%">Role</th>
                <th style="width:18%">Linked Profile</th>
                <th style="width:10%">Status</th>
                <th class="num" style="width:8%;padding-right:22px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody id="userTableBody"></tbody>
          </table>
        </div>
      </div>
    </section>`,i(),t.querySelectorAll(".user-role-filter").forEach(p=>{p.onclick=()=>{t.querySelectorAll(".user-role-filter").forEach(f=>f.classList.remove("active")),p.classList.add("active"),e=p.dataset.role,i()}});const n=t.querySelector("#userSortSel");n&&(n.onchange=()=>{a=n.value,i()});const r=t.querySelector("#userSearchInp");r&&(r.oninput=()=>{o=r.value.trim(),i()});const g=t.querySelector("#addUserBtn");g&&(g.onclick=()=>we(null))}function we(t){const s=!t;t=t||{name:"",email:"",role:"employee",personnelId:"",clientId:"",active:!0};const e=t.role,a=openModal(`<h3>${s?"Add":"Edit"} User</h3>
    <div class="field-row">
      <div class="field"><label>Name</label><input id="uName" type="text" value="${escapeHtml(t.name)}"></div>
      <div class="field"><label>Email</label><input id="uEmail" type="email" value="${escapeHtml(t.email)}"></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Role</label><select id="uRole">
        <option value="superadmin" ${e==="superadmin"?"selected":""}>👑 Superadmin</option>
        <option value="admin" ${e==="admin"?"selected":""}>🛡️ Admin</option>
        <option value="accounts" ${e==="accounts"?"selected":""}>💳 Accounts & Finance</option>
        <option value="employee" ${e==="employee"?"selected":""}>💼 Employee</option>
        <option value="client" ${e==="client"?"selected":""}>🤝 Client</option></select></div>
      <div class="field"><label>Password ${s?"*":"(leave blank to keep current)"}</label><input id="uPassword" type="text" placeholder="${s?"Set initial password":"Enter new password to change"}" autocomplete="off"></div>
    </div>
    <div class="field" id="uLinkWrap"></div>
    <div class="field"><label><input type="checkbox" id="uActive" ${t.active?"checked":""}> Active</label></div>
    <div class="modal-actions"><button class="btn ghost" id="mCancel">Cancel</button><button class="btn gold" id="mSave">Save</button></div>`);function o(){const i=a.querySelector("#uRole").value,l=a.querySelector("#uLinkWrap");i==="employee"?l.innerHTML=`<label>Linked Personnel</label><select id="uPersonnel"><option value="">Select…</option>${w.personnel.map(c=>`<option value="${c._id}" ${t.personnelId&&(t.personnelId._id||t.personnelId)===c._id?"selected":""}>${escapeHtml(c.name)}</option>`).join("")}</select>`:i==="client"?l.innerHTML=`<label>Linked Client</label><select id="uClient"><option value="">Select…</option>${w.clients.map(c=>`<option value="${c._id}" ${t.clientId&&(t.clientId._id||t.clientId)===c._id?"selected":""}>${escapeHtml(c.name)}</option>`).join("")}</select>`:l.innerHTML=""}a.querySelector("#uRole").onchange=o,o(),a.querySelector("#mCancel").onclick=()=>a.remove(),a.querySelector("#mSave").onclick=async()=>{const i=a.querySelector("#uRole").value,l={name:a.querySelector("#uName").value.trim(),email:a.querySelector("#uEmail").value.trim(),role:i,active:a.querySelector("#uActive").checked,personnelId:i==="employee"&&a.querySelector("#uPersonnel")?.value||null,clientId:i==="client"&&a.querySelector("#uClient")?.value||null},c=a.querySelector("#uPassword").value;if(c&&(l.password=c),!l.name||!l.email){flashToast("Name and email required",!0);return}if(s&&!c){flashToast("Password required for a new user",!0);return}try{s?await apiPost("/users",l):await apiPut("/users/"+t._id,l),a.remove(),C()}catch(b){flashToast(b.message,!0)}}}let W={date:new Date().toISOString().slice(0,10),personnelId:"all",filter:"all",search:""};async function gt(t){Oe(t,{userRole:"superadmin",currentUser:D})}window.adminToggleTask=async function(t){try{await apiPatch("/tasks/"+t+"/toggle",{}),flashToast("Task status updated"),C()}catch(s){flashToast(s.message,!0)}};window.adminEditTask=async function(t){try{const e=(await apiGet("/tasks")).find(c=>c._id===t);if(!e)return;const a=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):""),o=prompt("Edit task title:",e.title);if(o===null)return;const i=prompt("Edit completion date (YYYY-MM-DD):",a),l={};o.trim()&&(l.title=o.trim()),i&&i.trim()&&(l.completionDateStr=i.trim(),l.completionDate=i.trim(),l.dateStr=i.trim()),await apiPut("/tasks/"+t,l),flashToast("Task updated"),C()}catch(s){flashToast(s.message,!0)}};window.adminQuickAddTaskForEmp=async function(t){const s=prompt("Enter task for this employee:");if(!(!s||!s.trim()))try{const e=new Date,a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,o=W.date==="all"?a:W.date;await apiPost("/tasks",{title:s.trim(),personnelId:t,dueDate:o,priority:"Medium",status:"Todo"}),flashToast("Task assigned to employee! ✍️"),C()}catch(e){flashToast(e.message,!0)}};window.adminDeleteTask=async function(t){if(confirm("Delete this task?"))try{await apiDelete("/tasks/"+t),flashToast("Task deleted"),C()}catch(s){flashToast(s.message,!0)}};window.adminClearCompletedTasks=async function(t){if(confirm("Delete completed tasks?"))try{const s={date:W.date};t&&t!=="all"?s.personnelId=t:W.personnelId&&W.personnelId;const e=await apiPost("/tasks/clear-completed",s);flashToast(`Completed tasks deleted (${e.deletedCount||0} removed) 🗑️`),C()}catch(s){flashToast(s.message,!0)}};window.addEventListener("ci360:dataUpdated",()=>{const t=document.activeElement,s=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable),e=document.querySelector(".modal-bg, .modal-backdrop, #jobModal, .modal");!s&&!e&&$.tab!=="logjob"&&C(!0)});We();function bt(t,s,e,a="denial"){const o=a==="revision",i=openModal(`
    <div style="margin-bottom:14px">
      <div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:4px;display:flex;align-items:center;gap:8px">
        <span>🔁</span> Resubmit Work to Client for Approval
      </div>
      <div style="font-size:12.5px;color:var(--text-3)">${escapeHtml(s)}</div>
    </div>

    ${e?`
      <div style="margin-bottom:14px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--r-sm);padding:10px 14px">
        <strong style="color:var(--red-500);font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:2px">${o?"Client's Revision Request / Notes:":"Client's Previous Denial Reason:"}</strong>
        <div style="font-size:12.5px;color:var(--text-1)">"${escapeHtml(e)}"</div>
      </div>
    `:""}

    <div class="field" style="margin-bottom:12px">
      <label for="mAdmResubNotes" style="font-weight:700">Resubmission / Correction Notes</label>
      <input type="text" id="mAdmResubNotes" placeholder="e.g. Corrected deliverables according to client notes, updated live website link..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
    </div>

    <div class="field" style="margin-bottom:12px">
      <label for="mAdmResubUrl" style="font-weight:700;color:var(--brand-500)">🌐 Live Deliverable URL / Website Link (Optional)</label>
      <input type="url" id="mAdmResubUrl" placeholder="https://example.com, Figma link, staging site, Google Drive..." style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px" />
      <span style="font-size:11px;color:var(--text-4)">For live websites, applications, Figma links or cloud files</span>
    </div>

    <div style="margin-bottom:16px">
      ${renderAttachmentUploader({id:"mAdmResubUp",label:"Upload Corrected Files (Optional if URL provided)",subtitle:"Upload corrected exports, PDFs, images or archive files"})}
    </div>

    <div class="modal-actions">
      <button class="btn ghost" id="mAdmResubCancel">Cancel</button>
      <button class="btn gold" id="mAdmResubConfirm" style="font-weight:700">🔁 Resubmit to Client for Approval</button>
    </div>
  `);bindAttachmentUploader("mAdmResubUp"),i.querySelector("#mAdmResubCancel").onclick=()=>i.remove(),i.querySelector("#mAdmResubConfirm").onclick=async()=>{const l=i.querySelector("#mAdmResubNotes").value.trim(),c=i.querySelector("#mAdmResubUrl").value.trim(),b=getUploaderAttachments("mAdmResubUp"),d=i.querySelector("#mAdmResubConfirm");d.disabled=!0,d.textContent="Resubmitting…";try{await apiPost(`/jobs/${t}/resubmit`,{notes:l,url:c,deliverables:b}),flashToast("Job resubmitted to client for re-approval! 🔁🎉"),i.remove(),C()}catch(n){flashToast(n.message,!0),d.disabled=!1,d.textContent="🔁 Resubmit to Client for Approval"}}}
