import{c as Me,k as $,e as v,z as Ta,A as tt,l as at,q as Fa,p as Lt,s as Pa,B as ma,m as Jt,j as ye,C as La,E as za,F as fa,G as ia,H as ha}from"./api-C80ftWJy.js";const xa={displayName:"Daily Planner",weekStartsOn:1,timezone:"Asia/Kolkata",defaultPriority:"Medium",density:"comfortable",soundEnabled:!0};function Ma(){try{const s=localStorage.getItem("ci360_planner_settings");if(s)return Object.assign({},xa,JSON.parse(s))}catch{}return Object.assign({},xa)}function qa(s){try{localStorage.setItem("ci360_planner_settings",JSON.stringify(s))}catch{}}function Ge(){const s=new Date,n=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),g=String(s.getDate()).padStart(2,"0");return`${n}-${t}-${g}`}function Kt(s,n){const t=new Date(s+"T00:00:00");t.setDate(t.getDate()+n);const g=t.getFullYear(),k=String(t.getMonth()+1).padStart(2,"0"),m=String(t.getDate()).padStart(2,"0");return`${g}-${k}-${m}`}function Dt(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"—"}function ze(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"—"}function Ba(s){return s?new Date(s+"T00:00:00").toLocaleDateString("en-US",{weekday:"short"}):""}function Bt(s,n=1){const t=new Date(s+"T00:00:00"),g=t.getDay(),k=(g<n?7:0)+g-n,m=new Date(t);m.setDate(t.getDate()-k);const c=[];for(let r=0;r<7;r++){const O=new Date(m);O.setDate(m.getDate()+r);const X=O.getFullYear(),F=String(O.getMonth()+1).padStart(2,"0"),R=String(O.getDate()).padStart(2,"0");c.push(`${X}-${F}-${R}`)}return c}function ja(){try{const s=window.AudioContext||window.webkitAudioContext;if(!s)return;const n=new s,t=n.currentTime,g=n.createOscillator(),k=n.createGain();g.type="sine",g.frequency.setValueAtTime(523.25,t),g.frequency.exponentialRampToValueAtTime(783.99,t+.15),k.gain.setValueAtTime(.2,t),k.gain.exponentialRampToValueAtTime(.001,t+.35),g.connect(k),k.connect(n.destination),g.start(t),g.stop(t+.35)}catch{}}function un(s,n={}){const{userRole:t="employee",currentUser:g=null,onNavigate:k=null}=n,m=t==="superadmin"||t==="admin";let c=Ma(),r={selectedDate:Ge(),viewMode:"daily",filterStatus:"all",searchQuery:"",groupByEmployee:m,collapsedEmployees:{},selectedCategory:"all",selectedPersonnelId:"all",reportPersonnelId:"all",tasks:[],personnelList:[],clientList:[],loading:!1};Ra(),O();async function O(){r.loading=!0,X();try{const e=[Me("/tasks"),Me("/personnel").catch(()=>[]),Me("/clients").catch(()=>[])],[i,b,y]=await Promise.all(e);r.tasks=Array.isArray(i)?i:[],b&&(r.personnelList=Array.isArray(b)?b:[]),y&&(r.clientList=Array.isArray(y)?y:[])}catch(e){$("Failed to load planner tasks: "+e.message,!0)}finally{r.loading=!1,W()}}function X(){s.innerHTML=`
      <div class="ci360-planner-wrap">
        <div class="ci360-planner-skeleton" style="padding:24px;background:var(--bg-card);border-radius:var(--r-lg);border:1px solid var(--border-sm)">
          <div style="height:32px;width:240px;background:var(--border-xs);border-radius:6px;margin-bottom:12px;animation:pulse 1.5s infinite"></div>
          <div style="height:18px;width:340px;background:var(--border-xs);border-radius:4px;margin-bottom:28px"></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:12px;margin-bottom:24px">
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
            <div style="height:80px;background:var(--border-xs);border-radius:10px"></div>
          </div>
          <div style="height:200px;background:var(--border-xs);border-radius:12px"></div>
        </div>
      </div>
    `}function F(e){return r.tasks.filter(i=>{if(i.isDeleted===!0)return!1;if(m&&r.selectedPersonnelId!=="all"){const _=i.personnelId?._id||i.personnelId,L=String(_)===String(r.selectedPersonnelId),q=Array.isArray(i.coOwners)&&i.coOwners.some(I=>{const z=I.personnelId?._id||I.personnelId||I.userId?._id||I.userId;return String(z)===String(r.selectedPersonnelId)});if(!L&&!q)return!1}const b=i.completionDateStr||i.dateStr||(i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):""),y=i.assignedDateStr||(i.assignedDate?new Date(i.assignedDate).toISOString().slice(0,10):"")||(i.createdAt?new Date(i.createdAt).toISOString().slice(0,10):"")||b;if(i.status==="In Progress"){const _=y&&b&&y<=b?y:b||y,L=y&&b&&y<=b?b:y||b;if(_&&L){if(e>=_&&e<=L)return!0}else{if(b&&b===e)return!0;if(y&&y===e)return!0}}return b&&b===e||i.status!=="Completed"&&y&&y===e?!0:!b&&!y?e===Ge():!1})}function R(e,i){if(e.status==="Completed")return!1;const b=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):"");return b?b<i:!1}function V(e,i){const b=e.length,y=e.filter(z=>z.status==="Completed").length,_=e.filter(z=>z.status==="In Progress").length,L=e.filter(z=>z.status==="Pending"||z.status==="Todo").length,q=e.filter(z=>R(z,i)).length,I=b>0?Math.round(y/b*100):0;return{total:b,completed:y,inProgress:_,pending:L,overdue:q,percent:I}}function W(){const e=Ge(),i=r.selectedDate===e,b=F(r.selectedDate),y=V(b,e);s.innerHTML=`
      <div class="ci360-planner-wrap ${c.density==="compact"?"is-compact":""}">
        
        <!-- Planner Main Header (Hero Card) -->
        <header class="ci360-planner-header">
          <div class="ci360-planner-header-left">
            <div class="ci360-planner-hero-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
            </div>
            <div class="ci360-planner-title-group">
              <h1 class="ci360-planner-heading">${v(c.displayName||"Daily Planner")}</h1>
              <p class="ci360-planner-subheading">Plan your day. Track your progress.</p>
            </div>
          </div>

          <div class="ci360-planner-header-actions">
            <!-- View Mode Switcher -->
            <div class="ci360-view-switcher" role="tablist">
              <button type="button" class="ci360-switch-btn ${r.viewMode==="daily"?"active":""}" id="btnViewDaily" title="Daily View">
                <span>📅 Daily</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="weekly"?"active":""}" id="btnViewWeekly" title="Weekly View">
                <span>🗓️ Weekly</span>
              </button>
              <button type="button" class="ci360-switch-btn ${r.viewMode==="report"?"active":""}" id="btnViewReport" title="Weekly Analytics & Report">
                <span>📊 Report</span>
              </button>
            </div>

            <!-- Primary Add Task Button -->
            <button type="button" class="ci360-btn-primary ${r.selectedDate<e?"is-locked-past":""}" id="btnOpenAddTaskModal" title="${r.selectedDate<e?"Cannot add tasks on previous dates (switch to today or later)":"Add Task"}">
              ${r.selectedDate<e?`
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Add Task (Past Date)</span>
              `:`
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add Task</span>
              `}
            </button>

            <!-- Recent Tasks Button -->
            <button type="button" class="ci360-btn-secondary" id="btnOpenRecentModal" title="See latest added, completed, or changed tasks" style="display:inline-flex;align-items:center;gap:6px;font-weight:600;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Recent</span>
            </button>

            <!-- Actions Dropdown Button -->
            <div class="ci360-dropdown-wrap">
              <button type="button" class="ci360-btn-secondary" id="btnPlannerActionsMenu" title="More Tools & Exports">
                <span>Tools & Export ▾</span>
              </button>
              <div class="ci360-dropdown-menu hidden" id="plannerActionsDropdown">
                <button type="button" class="ci360-menu-item" id="btnActionImport">
                  <span class="icon">📥</span>
                  <div class="meta">
                    <strong>Import Task List</strong>
                    <small>Paste lines or upload .txt file</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPng">
                  <span class="icon">🖼️</span>
                  <div class="meta">
                    <strong>Download Daily Planner Image</strong>
                    <small>High-resolution PNG for today</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionExportPdf">
                  <span class="icon">📄</span>
                  <div class="meta">
                    <strong>Download Weekly Report (PDF)</strong>
                    <small>Summary report with job owner</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionAdminReport">
                  <span class="icon">📊</span>
                  <div class="meta">
                    <strong>Admin Detailed Report (PDF & CSV)</strong>
                    <small>With Client Name & Description</small>
                  </div>
                </button>
                <div class="ci360-dropdown-divider"></div>
                <button type="button" class="ci360-menu-item" id="btnActionBackup">
                  <span class="icon">💾</span>
                  <div class="meta">
                    <strong>Backup / Restore</strong>
                    <small>Export or import JSON backup</small>
                  </div>
                </button>
                <button type="button" class="ci360-menu-item" id="btnActionSettings">
                  <span class="icon">⚙️</span>
                  <div class="meta">
                    <strong>Planner Settings</strong>
                    <small>Timezone, layout & preferences</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Date & Team Navigator Bar -->
        <div class="ci360-planner-nav-strip">
          <div class="ci360-date-nav-controls">
            <button type="button" class="ci360-nav-arrow" id="btnPrevDay" title="Previous Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div class="ci360-date-picker-badge" id="datePickerBadge">
              <span class="calendar-icon">📅</span>
              <span class="date-text" id="displayDateLabel">${Dt(r.selectedDate)}</span>
              <input type="date" class="ci360-hidden-date-input" id="hiddenDateInput" value="${r.selectedDate}">
            </div>

            <button type="button" class="ci360-nav-arrow" id="btnNextDay" title="Next Day">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button type="button" class="ci360-today-btn ${i?"is-current":""}" id="btnJumpToday">
              Today
            </button>
          </div>

          <!-- Superadmin Team Filter -->
          ${m?`
            <div class="ci360-team-filter-wrap">
              <label for="admTeamSelect" class="ci360-label-inline">Team:</label>
              <select id="admTeamSelect" class="ci360-select-inline">
                <option value="all" ${r.selectedPersonnelId==="all"?"selected":""}>All Team Members</option>
                ${r.personnelList.map(_=>`
                  <option value="${_._id}" ${r.selectedPersonnelId===String(_._id)?"selected":""}>
                    ${v(_.name)} (${v(_.department||_.role||"Team")})
                  </option>
                `).join("")}
              </select>
            </div>
          `:""}
        </div>

        <!-- Progress Summary Ribbon -->
        <section class="ci360-progress-summary-card">
          <div class="ci360-summary-main">
            <div class="ci360-ring-stat">
              <div class="ci360-circular-progress" style="--val: ${y.percent};">
                <svg viewBox="0 0 36 36" class="ci360-circular-svg">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle-fill" stroke-dasharray="${y.percent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="ring-text">
                  <span class="ring-num">${y.percent}%</span>
                  <span class="ring-label">Done</span>
                </div>
              </div>
            </div>

            <div class="ci360-summary-kpis">
              <div class="kpi-box total">
                <div class="kpi-icon-wrap total">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.total}</span>
                  <span class="kpi-label">Total Tasks</span>
                </div>
              </div>
              <div class="kpi-box completed">
                <div class="kpi-icon-wrap completed">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.completed}</span>
                  <span class="kpi-label">Completed</span>
                </div>
              </div>
              <div class="kpi-box in-progress">
                <div class="kpi-icon-wrap in-prog">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.inProgress}</span>
                  <span class="kpi-label">In Progress</span>
                </div>
              </div>
              <div class="kpi-box pending">
                <div class="kpi-icon-wrap pending">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14m-2 20v-5a5 5 0 0 0-2.83-4.5A5 5 0 0 0 17 7V2M7 22v-5a5 5 0 0 1 2.83-4.5A5 5 0 0 1 7 7V2"/></svg>
                </div>
                <div class="kpi-text-wrap">
                  <span class="kpi-num">${y.pending}</span>
                  <span class="kpi-label">Pending</span>
                </div>
              </div>
              ${y.overdue>0?`
                <div class="kpi-box overdue">
                  <div class="kpi-icon-wrap overdue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div class="kpi-text-wrap">
                    <span class="kpi-num">${y.overdue}</span>
                    <span class="kpi-label">Overdue</span>
                  </div>
                </div>
              `:""}
            </div>
          </div>

          <!-- Progress Bar Ribbon -->
          <div class="ci360-linear-progress-wrap">
            <div class="ci360-linear-bar" style="width: ${y.percent}%"></div>
          </div>
        </section>

        <!-- View Content Area (Daily, Weekly, or Report) -->
        <main class="ci360-planner-content" id="plannerContentArea">
          ${me(b,y)}
        </main>

      </div>
    `,lt(),qe()}function me(e,i){return r.viewMode==="weekly"?bt():r.viewMode==="report"?Ft():$e(e,i)}function $e(e,i){const b=Ge(),y=r.selectedDate<b;let _=e;if(r.filterStatus==="pending"?_=_.filter(I=>I.status==="Pending"||I.status==="Todo"):r.filterStatus==="in_progress"?_=_.filter(I=>I.status==="In Progress"):r.filterStatus==="completed"?_=_.filter(I=>I.status==="Completed"):r.filterStatus==="overdue"?_=_.filter(I=>R(I,b)):r.filterStatus==="recent"&&(_=[...e].sort((I,z)=>new Date(z.updatedAt||z.createdAt||0)-new Date(I.updatedAt||I.createdAt||0))),r.searchQuery){const I=r.searchQuery.toLowerCase().trim();_=_.filter(z=>{const M=(z.title||"").toLowerCase(),p=(z.description||"").toLowerCase(),B=(z.category||"").toLowerCase(),f=(z.clientName||"").toLowerCase(),P=(z.personnelId?.name||z.userId?.name||"").toLowerCase(),H=(z.createdByName||z.createdBy?.name||(z.createdBy?.email?z.createdBy.email.split("@")[0]:"")).toLowerCase(),E=Array.isArray(z.coOwners)?z.coOwners.map(o=>(o.name||"").toLowerCase()).join(" "):"",d=(z.clientId?.name||z.jobId?.clientId?.name||"").toLowerCase();return M.includes(I)||p.includes(I)||B.includes(I)||f.includes(I)||P.includes(I)||H.includes(I)||E.includes(I)||d.includes(I)})}r.filterStatus!=="recent"&&_.sort((I,z)=>{if(I.status==="Completed"&&z.status!=="Completed")return 1;if(I.status!=="Completed"&&z.status==="Completed")return-1;const M={Urgent:0,High:1,Medium:2,Low:3};return(M[I.priority]||2)-(M[z.priority]||2)});const L=new Map;_.forEach(I=>{let z="unassigned",M="Unassigned / Team",p="",B="";I.personnelId&&typeof I.personnelId=="object"&&I.personnelId._id?(z=String(I.personnelId._id),M=I.personnelId.name||"Team Member",B=I.personnelId.role||"Personnel",p=I.personnelId.department||""):I.userId&&typeof I.userId=="object"&&I.userId._id?(z=String(I.userId._id),M=I.userId.name||"User",B=I.userId.role||"Member"):(I.createdByName||I.createdBy&&I.createdBy.name)&&(M=I.createdByName||I.createdBy.name,z="creator_"+M.toLowerCase().replace(/[^a-z0-9]/g,"_"),B="Creator"),L.has(z)||L.set(z,{key:z,name:M,department:p,role:B,tasks:[]}),L.get(z).tasks.push(I)});const q=Array.from(L.values()).sort((I,z)=>I.key==="unassigned"?1:z.key==="unassigned"?-1:I.name.localeCompare(z.name));return`
      <div class="ci360-today-focus-section">
        
        <!-- Section Header with Search & Filter Chips -->
        <div class="ci360-focus-header">
          <div class="ci360-focus-title-wrap" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <h2 class="ci360-focus-title" style="margin:0;">
              <span class="accent-dot"></span>
              ${y?"Focus Archive":"Today's Focus"}
            </h2>
            <span class="ci360-task-count-badge">${_.length} ${_.length===1?"task":"tasks"}</span>
            ${y?"":`
              <button type="button" class="ci360-btn-primary" id="btnFocusAddTask" style="padding:6px 14px;font-size:12.5px;font-weight:700;display:inline-flex;align-items:center;gap:6px;border-radius:var(--r-md);margin-left:4px;cursor:pointer;box-shadow:0 2px 6px rgba(0,112,243,0.25);">
                <span style="font-size:15px;line-height:1;font-weight:800;">+</span> Add Task
              </button>
            `}
          </div>

          <div class="ci360-focus-controls">
            <!-- Filter Pills -->
            <div class="ci360-filter-pills">
              <button type="button" class="filter-pill ${r.filterStatus==="all"?"active":""}" data-f="all">All (${i.total})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="pending"?"active":""}" data-f="pending">Pending (${i.pending})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="in_progress"?"active":""}" data-f="in_progress">In Progress (${i.inProgress})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="completed"?"active":""}" data-f="completed">Completed (${i.completed})</button>
              <button type="button" class="filter-pill ${r.filterStatus==="recent"?"active":""}" data-f="recent" title="Latest added, completed, or changed tasks">🕒 Recent</button>
              ${i.overdue>0?`
                <button type="button" class="filter-pill overdue ${r.filterStatus==="overdue"?"active":""}" data-f="overdue">Overdue (${i.overdue})</button>
              `:""}
            </div>

            <!-- Admin Employee Grouping Controls -->
            ${m?`
              <div class="ci360-admin-emp-controls" style="display:flex;align-items:center;gap:6px;">
                <button type="button" class="filter-pill ${r.groupByEmployee?"active":""}" id="btnToggleEmpGrouping" title="Group and collapse tasks by employee">
                  👥 ${r.groupByEmployee?"By Employee":"Flat List"}
                </button>
                ${r.groupByEmployee&&q.length>0?`
                  <button type="button" class="filter-pill" id="btnExpandAllEmp" title="Expand all employee tasks">⊞ Expand</button>
                  <button type="button" class="filter-pill" id="btnCollapseAllEmp" title="Collapse all employee tasks">⊟ Collapse</button>
                `:""}
              </div>
            `:""}

            <!-- Search Bar with employee search support -->
            <div class="ci360-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plannerTaskSearchInp" placeholder="Search tasks, client name, employee or co-owner..." value="${v(r.searchQuery)}">
              ${r.searchQuery?'<button type="button" id="btnClearSearch" class="clear-search-btn">×</button>':""}
            </div>
          </div>
        </div>

        <!-- Past Date Banner (Only for Previous Dates) -->
        ${y?`
          <div class="ci360-past-date-banner">
            <div class="past-banner-icon">🔒</div>
            <div class="past-banner-body">
              <div class="past-banner-title">Previous Date (${ze(r.selectedDate)})</div>
              <div class="past-banner-desc">
                Adding new tasks on previous dates is restricted. You can edit existing tasks, adjust completion dates, or mark tasks as completed.
              </div>
            </div>
          </div>
        `:""}

        <!-- Task List or Empty State -->
        <div class="ci360-tasks-container">
          ${_.length===0?Je(y):m&&r.groupByEmployee?`
              <div class="ci360-emp-groups-container">
                ${q.map(I=>{const z=!!r.collapsedEmployees[I.key],M=I.tasks.filter(P=>P.status==="Completed").length,p=I.tasks.filter(P=>P.status==="In Progress").length,B=I.tasks.filter(P=>P.status==="Pending"||P.status==="Todo").length,f=I.tasks.length>0?Math.round(M/I.tasks.length*100):0;return`
                    <div class="ci360-emp-group-card ${z?"is-collapsed":""}" data-emp-key="${I.key}">
                      <div class="ci360-emp-group-header" data-action="toggle-emp-group" data-emp-key="${I.key}" role="button" tabindex="0">
                        <div class="emp-group-left">
                          <span class="emp-collapse-icon">${z?"▶":"▼"}</span>
                          <div class="emp-avatar">${v((I.name||"U").charAt(0).toUpperCase())}</div>
                          <div class="emp-info">
                            <span class="emp-name">${v(I.name)}</span>
                            ${I.department||I.role?`<span class="emp-subtitle">${v(I.department?I.department+" · "+I.role:I.role)}</span>`:""}
                          </div>
                        </div>

                        <div class="emp-group-right">
                          <span class="emp-stat-pill total">${I.tasks.length} ${I.tasks.length===1?"task":"tasks"}</span>
                          <span class="emp-stat-pill done">${M} done</span>
                          ${p>0?`<span class="emp-stat-pill in-prog">${p} in progress</span>`:""}
                          ${B>0?`<span class="emp-stat-pill pending">${B} pending</span>`:""}
                          <div class="emp-mini-bar-wrap" title="${f}% completed">
                            <div class="emp-mini-bar-fill" style="width:${f}%;"></div>
                          </div>
                        </div>
                      </div>

                      ${z?"":`
                        <div class="ci360-emp-group-body">
                          <div class="ci360-task-list">
                            ${I.tasks.map(P=>nt(P,b)).join("")}
                          </div>
                        </div>
                      `}
                    </div>
                  `}).join("")}
              </div>
            `:`
              <div class="ci360-task-list">
                ${_.map(I=>nt(I,b)).join("")}
              </div>
            `}
        </div>

      </div>
    `}function Je(e=!1){return`
      <div class="ci360-empty-focus-state">
        <div class="empty-icon-wrap">${e?"📜":"✨"}</div>
        <h3>No tasks found for ${ze(r.selectedDate)}</h3>
        <p>${e?"No scheduled tasks were recorded on this past date.":"Your schedule is clean and ready. Add your first priority task above or import your daily agenda."}</p>
        ${e?"":`
          <div style="display:flex;gap:10px;justify-content:center;margin-top:14px">
            <button type="button" class="ci360-btn-primary" id="btnEmptyStateAddTask">
              + Add Task
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnEmptyStateImport">
              📥 Import List
            </button>
          </div>
        `}
      </div>
    `}function nt(e,i){const b=e.status==="Completed",y=R(e,i),_=e.completionDateStr||e.dateStr||(e.dueDate?new Date(e.dueDate).toISOString().slice(0,10):i),L=e.assignedDateStr||(e.assignedDate?new Date(e.assignedDate).toISOString().slice(0,10):"")||(e.createdAt?new Date(e.createdAt).toISOString().slice(0,10):""),q=e.status==="In Progress"&&L&&_&&L!==_,I=`pri-${(e.priority||"medium").toLowerCase()}`,z=`status-${(e.status||"pending").toLowerCase().replace(/\s+/g,"-")}`,M=e.createdByName||e.createdBy?.name||(e.createdBy?.email?e.createdBy.email.split("@")[0]:"")||e.personnelId?.name||e.userId?.name||"";return`
      <div class="ci360-task-card ${b?"is-completed":""} ${y?"is-overdue":""}" data-id="${e._id}">
        
        <!-- Completion Checkbox -->
        <button type="button" class="ci360-task-check ${b?"checked":""}" data-action="toggle" data-id="${e._id}" title="${b?"Reopen task":"Mark as done"}">
          <svg class="check-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <!-- Main Task Info -->
        <div class="ci360-task-body">
          <div class="ci360-task-title-row">
            <span class="ci360-task-title">${v(e.title)}</span>
          </div>

          ${e.description?`
            <div class="ci360-task-desc">${v(e.description)}</div>
          `:""}

          <!-- Metadata Badges -->
          <div class="ci360-task-badges">
            <!-- Priority Badge -->
            <span class="ci360-badge ${I}">
              <span class="badge-dot"></span>
              ${v(e.priority||"Medium")}
            </span>

            <!-- Status Badge -->
            <span class="ci360-badge ${z}">
              ${v(e.status||"Pending")}
            </span>

            <!-- Completion Date / Date Span Badge (Always Visible & Prominent) -->
            ${q?`
              <span class="ci360-badge completion-badge" style="background:rgba(59,130,246,0.15);color:#3b82f6;border-color:rgba(59,130,246,0.3);" title="In Progress from ${ze(L)} to ${ze(_)}">
                📅 ${ze(L)} ➔ Due: ${ze(_)}
              </span>
            `:`
              <span class="ci360-badge completion-badge" title="Target Completion Date: ${_}">
                📅 Due: ${ze(_)}
              </span>
            `}

            <!-- Date Changed / Rescheduled Badge (prominently shown when date is changed) -->
            ${e.rescheduledFrom&&e.rescheduledFrom!==_?`
              <span class="ci360-badge date-changed-badge" title="Rescheduled from ${ze(e.rescheduledFrom)} to ${ze(_)} (${e.dateChangeCount||1} change${(e.dateChangeCount||1)>1?"s":""})">
                🔄 Date Changed: ${ze(e.rescheduledFrom)} ➔ ${ze(_)}
              </span>
            `:""}

            <!-- Added By Badge (Shows Who Created the Task) -->
            ${M?`
              <span class="ci360-badge creator-badge" title="Created / Added by: ${v(M)}">
                ✍️ Added by: ${v(M)}
              </span>
            `:""}

            <!-- Category (Hide if empty or General) -->
            ${e.category&&e.category.trim()&&!["general","#general"].includes(e.category.trim().toLowerCase())?`
              <span class="ci360-badge category-badge">
                #${v(e.category.replace(/^#/,""))}
              </span>
            `:""}

            <!-- Overdue Warning -->
            ${y?`
              <span class="ci360-badge overdue-badge">
                ⚠️ Past Due
              </span>
            `:""}

            <!-- Superadmin assigned employee name (if different from addedByName) -->
            ${m&&(e.personnelId?.name||e.userId?.name)&&(e.personnelId?.name||e.userId?.name)!==M?`
              <span class="ci360-badge personnel-badge" title="Assigned Employee">
                👤 Assigned: ${v(e.personnelId?.name||e.userId?.name)}
              </span>
            `:""}

            <!-- Co-Owners Badge (Multiple People) -->
            ${Array.isArray(e.coOwners)&&e.coOwners.length>0?`
              <span class="ci360-badge coowner-badge" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);" title="Co-Owners: ${e.coOwners.map(p=>p.name).filter(Boolean).join(", ")}">
                👥 Co-Owners: ${v(e.coOwners.map(p=>p.name).filter(Boolean).join(", "))}
              </span>
            `:""}

            <!-- Client Badge -->
            ${e.clientName||e.clientId?.name||e.jobId?.clientId?.name?`
              <span class="ci360-badge client-badge" style="background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.25);" title="Client: ${v(e.clientName||e.clientId?.name||e.jobId?.clientId?.name)}">
                🏢 ${v(e.clientName||e.clientId?.name||e.jobId?.clientId?.name)}
              </span>
            `:""}

            <!-- Attachments Badge -->
            ${Array.isArray(e.attachments)&&e.attachments.length>0?`
              <span class="ci360-badge attachments-badge btn-view-task-atts" data-id="${e._id}" style="background:rgba(59,130,246,0.12);color:#2563eb;border:1px solid rgba(59,130,246,0.25);cursor:pointer;" title="Click to view/edit ${e.attachments.length} attachment(s)">
                📎 ${e.attachments.length} file${e.attachments.length===1?"":"s"}
              </span>
            `:""}
          </div>

          <!-- Image Thumbnails Strip if any -->
          ${Array.isArray(e.attachments)&&e.attachments.some(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i))?`
            <div class="ci360-task-thumb-strip">
              ${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).slice(0,6).map(p=>`
                <div class="ci360-att-thumb-box btn-preview-task-att" data-url="${v(p.url)}" data-name="${v(p.name)}" title="${v(p.name)}">
                  <img src="${v(p.url)}" alt="${v(p.name)}" loading="lazy" />
                </div>
              `).join("")}
              ${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).length>6?`
                <span class="att-more-count">+${e.attachments.filter(p=>p.type&&p.type.startsWith("image/")||p.name&&p.name.match(/\.(png|jpe?g|gif|webp|svg)$/i)).length-6} more</span>
              `:""}
            </div>
          `:""}
        </div>

        <!-- Task Actions Menu: Previous tasks can be edited, deleted, changed by all -->
        <div class="ci360-task-actions">
          <button type="button" class="task-action-btn edit" data-action="edit" data-id="${e._id}" title="Edit task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button type="button" class="task-action-btn delete" data-action="delete" data-id="${e._id}" title="Delete task">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

      </div>
    `}function bt(){const e=Bt(r.selectedDate,c.weekStartsOn),i=ze(e[0]),b=ze(e[6]),y=Ge(),_=e.flatMap(z=>F(z)),L=new Map;_.forEach(z=>{const M=z._id?String(z._id):JSON.stringify(z);L.set(M,z)});const q=Array.from(L.values()),I=V(q,y);return`
      <div class="ci360-weekly-planner-section">
        
        <!-- Week Navigator Banner -->
        <div class="ci360-week-banner">
          <div class="week-title-wrap">
            <h2 class="week-title">Weekly Schedule</h2>
            <span class="week-range-text">${i} – ${b}</span>
          </div>

          <div class="week-controls">
            <button type="button" class="ci360-btn-secondary" id="btnPrevWeek">‹ Prev Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnThisWeek">This Week</button>
            <button type="button" class="ci360-btn-secondary" id="btnNextWeek">Next Week ›</button>
          </div>
        </div>

        <!-- 8-Card Modern Weekly Grid (7 Days + Week at a Glance) -->
        <div class="ci360-week-grid modern-grid">
          ${e.map(z=>{const M=z===y,p=z===r.selectedDate,B=F(z),f=V(B,y),P=new Date(z+"T00:00:00"),H=P.toLocaleDateString("en-US",{weekday:"short"}),E=P.toLocaleDateString("en-US",{weekday:"long"}),d=P.toLocaleDateString("en-US",{month:"short"}),o=P.getDate();return`
              <div class="ci360-weekly-day-card ${M?"is-today":""} ${p?"is-selected":""}" data-date="${z}">
                
                <!-- Day Card Header -->
                <div class="weekly-day-header ${M?"today-banner":""}">
                  <div class="day-badge-box">
                    <span class="day-badge-name">${H}</span>
                    <span class="day-badge-num">${o}</span>
                  </div>
                  <div class="day-header-meta">
                    <div class="day-full-name">${E}, ${d} ${o}</div>
                    <div class="day-header-stats-row">
                      <span class="day-done-label">${f.completed}/${f.total} Done</span>
                      <div class="day-progress-track">
                        <div class="day-progress-bar" style="width: ${f.percent}%"></div>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="day-action-clipboard-btn" data-action="add-day" data-date="${z}" title="Add/Manage tasks for ${E}">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                </div>

                <!-- Day Card Tasks List -->
                <div class="weekly-day-tasks">
                  ${B.length===0?`
                    <div class="weekly-empty-state">
                      <span>No tasks scheduled</span>
                    </div>
                  `:B.map(a=>{const h=a.status==="Completed",T=(a.priority||"medium").toLowerCase(),j=a.priority?a.priority.charAt(0).toUpperCase()+a.priority.slice(1).toLowerCase():"Medium";return`
                      <div class="weekly-task-item ${h?"done":""}" data-id="${a._id}">
                        <button type="button" class="weekly-check-btn ${h?"checked":""}" data-action="toggle" data-id="${a._id}" title="Mark ${h?"Incomplete":"Complete"}">
                          ${h?`
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          `:""}
                        </button>
                        <span class="weekly-task-title ${h?"strike":""}" data-action="edit" data-id="${a._id}" title="${v(a.title)}">
                          ${v(a.title)}
                        </span>
                        <span class="weekly-pri-badge pri-${T}">
                          ${j}
                        </span>
                      </div>
                    `}).join("")}
                </div>

              </div>
            `}).join("")}

          <!-- 8th Card: Week at a Glance -->
          <div class="ci360-weekly-day-card week-glance-card">
            <div class="glance-header">
              <span class="glance-icon">📊</span>
              <h3 class="glance-title">Week at a Glance</h3>
            </div>
            
            <div class="glance-metrics-grid">
              <div class="glance-metric-item">
                <span class="glance-m-icon total">📋</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${I.total}</div>
                  <div class="glance-m-lbl">Total Tasks</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon completed">✅</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${I.completed}</div>
                  <div class="glance-m-lbl">Completed</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon in-progress">🔄</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${I.inProgress}</div>
                  <div class="glance-m-lbl">In Progress</div>
                </div>
              </div>
              <div class="glance-metric-item">
                <span class="glance-m-icon pending">⏳</span>
                <div class="glance-m-data">
                  <div class="glance-m-val">${I.pending}</div>
                  <div class="glance-m-lbl">Pending</div>
                </div>
              </div>
            </div>

            <div class="glance-footer">
              <div class="glance-progress-track">
                <div class="glance-progress-bar" style="width: ${I.percent}%"></div>
              </div>
              <div class="glance-progress-caption">
                ${I.completed} / ${I.total} Tasks (${I.percent}% Complete)
              </div>
            </div>
          </div>

        </div>

      </div>
    `}function Ft(){const e=Bt(r.selectedDate,c.weekStartsOn),i=Dt(e[0]),b=Dt(e[6]),y=Ge(),_=r.reportPersonnelId||"all",L=r.personnelList.find(P=>String(P._id)===String(_)),q=L?L.name:"",I=r.tasks.filter(P=>{if(P.isDeleted===!0)return!1;const H=P.completionDateStr||P.dateStr||(P.dueDate?new Date(P.dueDate).toISOString().slice(0,10):""),E=P.assignedDateStr||(P.assignedDate?new Date(P.assignedDate).toISOString().slice(0,10):"")||H;if(!(P.status==="In Progress"&&E&&H?e.some(o=>o>=E&&o<=H):e.includes(H)||e.includes(E)))return!1;if(_!=="all"){const o=String(P.personnelId?._id||P.personnelId||""),a=Array.isArray(P.coOwners)&&P.coOwners.some(h=>String(h.personnelId?._id||h.personnelId||h.userId?._id||h.userId||"")===String(_));return o===String(_)||a}return!0}),z=I.length,M=I.filter(P=>P.status==="Completed").length,p=I.filter(P=>P.status==="In Progress").length,B=z>0?Math.round(M/z*100):0,f={Urgent:0,High:0,Medium:0,Low:0};return I.forEach(P=>{const H=P.priority||"Medium";f[H]!==void 0&&f[H]++}),`
      <div class="ci360-report-section">
        
        <div class="ci360-report-banner" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div>
            <h2 style="font-size:22px;margin:0 0 4px">Weekly Productivity Report</h2>
            <div style="font-size:13px;color:var(--text-3);display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span>Week Period: ${i} – ${b}</span>
              ${_!=="all"&&q?`
                <span class="badge blue" style="font-size:11.5px;padding:2px 8px;font-weight:700;">👤 Employee: ${v(q)}</span>
              `:`
                <span class="badge gray" style="font-size:11.5px;padding:2px 8px;font-weight:600;">👥 All Team Members</span>
              `}
            </div>
          </div>

          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            ${m?`
              <div style="display:inline-flex;align-items:center;gap:6px;">
                <label for="selectWeeklyReportEmployee" style="font-size:12px;font-weight:700;color:var(--text-2);white-space:nowrap;">Whose Report:</label>
                <select id="selectWeeklyReportEmployee" class="input" style="padding:6px 12px;font-size:12.5px;font-weight:600;min-width:180px;height:36px;border-radius:var(--r-md);background:var(--bg-surface);color:var(--text-1);border:1px solid var(--border-sm);">
                  <option value="all" ${_==="all"?"selected":""}>👥 All Team Members</option>
                  ${r.personnelList.map(P=>`
                    <option value="${P._id}" ${String(P._id)===String(_)?"selected":""}>
                      👤 ${v(P.name)} (${v(P.department||P.role||"Member")})
                    </option>
                  `).join("")}
                </select>
              </div>
            `:""}

            <button type="button" class="ci360-btn-primary" id="btnDownloadWeeklyPdf" title="Download weekly report PDF for the selected employee">
              📄 Download Weekly Report PDF
            </button>
            <button type="button" class="ci360-btn-secondary" id="btnOpenAdminReportModal" style="background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);font-weight:700;">
              📊 Specific Admin Report (with Description & Client)
            </button>
          </div>
        </div>

        <!-- KPI Grid -->
        <div class="ci360-report-kpis">
          <div class="card kpi">
            <span class="label">Total Weekly Tasks</span>
            <span class="value" style="font-size:28px">${z}</span>
          </div>
          <div class="card kpi">
            <span class="label">Completed Tasks</span>
            <span class="value" style="font-size:28px;color:var(--green-500)">${M}</span>
          </div>
          <div class="card kpi">
            <span class="label">In Progress</span>
            <span class="value" style="font-size:28px;color:var(--amber-500)">${p}</span>
          </div>
          <div class="card kpi">
            <span class="label">Weekly Completion</span>
            <span class="value" style="font-size:28px;color:var(--brand-600)">${B}%</span>
          </div>
        </div>

        <!-- Daily Breakdown Table -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 16px;font-size:16px">Daily Completion Performance</h3>
          <div style="overflow-x:auto">
            <table class="table" style="width:100%">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Total Tasks</th>
                  <th>Completed</th>
                  <th>Pending / Active</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                ${e.map(P=>{const H=F(P),E=V(H,y);return`
                    <tr>
                      <td><strong>${Ba(P)}</strong></td>
                      <td>${ze(P)}</td>
                      <td>${E.total}</td>
                      <td style="color:var(--green-500);font-weight:600">${E.completed}</td>
                      <td>${E.pending+E.inProgress}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:8px">
                          <div style="flex:1;height:6px;background:var(--border-sm);border-radius:4px;overflow:hidden">
                            <div style="height:100%;background:var(--brand-600);width:${E.percent}%"></div>
                          </div>
                          <span style="font-size:12px;font-weight:600">${E.percent}%</span>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Priority Breakdown -->
        <div class="card" style="margin-top:20px;padding:20px">
          <h3 style="margin:0 0 14px;font-size:16px">Priority Distribution</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:12px">
            <div class="kpi-box pri-urgent" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--red-600)">Urgent</div>
              <div style="font-size:22px;font-weight:700">${f.Urgent}</div>
            </div>
            <div class="kpi-box pri-high" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--amber-600)">High</div>
              <div style="font-size:22px;font-weight:700">${f.High}</div>
            </div>
            <div class="kpi-box pri-medium" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--blue-600)">Medium</div>
              <div style="font-size:22px;font-weight:700">${f.Medium}</div>
            </div>
            <div class="kpi-box pri-low" style="padding:14px;border-radius:8px">
              <div style="font-size:12px;color:var(--green-600)">Low</div>
              <div style="font-size:22px;font-weight:700">${f.Low}</div>
            </div>
          </div>
        </div>

      </div>
    `}function lt(){const e=document.getElementById("btnViewDaily"),i=document.getElementById("btnViewWeekly"),b=document.getElementById("btnViewReport");e&&(e.onclick=()=>{r.viewMode="daily",W()}),i&&(i.onclick=()=>{r.viewMode="weekly",W()}),b&&(b.onclick=()=>{r.viewMode="report",W()});const y=document.getElementById("btnPrevDay"),_=document.getElementById("btnNextDay"),L=document.getElementById("btnJumpToday"),q=document.getElementById("hiddenDateInput"),I=document.getElementById("datePickerBadge");y&&(y.onclick=()=>{r.selectedDate=Kt(r.selectedDate,-1),W()}),_&&(_.onclick=()=>{r.selectedDate=Kt(r.selectedDate,1),W()}),L&&(L.onclick=()=>{r.selectedDate=Ge(),W()}),I&&q&&(I.onclick=()=>{try{typeof q.showPicker=="function"?q.showPicker():q.focus()}catch{q.focus()}},q.onchange=h=>{h.target.value&&(r.selectedDate=h.target.value,W())});const z=document.getElementById("admTeamSelect");z&&(z.onchange=h=>{r.selectedPersonnelId=h.target.value,W()});const M=document.getElementById("btnOpenAddTaskModal");M&&(M.onclick=()=>{if(r.selectedDate<Ge()){$("Cannot add tasks on previous dates. Please select Today or a future date to schedule a new task.",!0);return}Be()});const p=document.getElementById("btnOpenRecentModal");p&&(p.onclick=()=>{wt()});const B=document.getElementById("btnPlannerActionsMenu"),f=document.getElementById("plannerActionsDropdown");B&&f&&(B.onclick=h=>{h.stopPropagation(),f.classList.toggle("hidden")},document.addEventListener("click",h=>{!f.contains(h.target)&&h.target!==B&&f.classList.add("hidden")}));const P=document.getElementById("btnActionImport");P&&(P.onclick=()=>{f?.classList.add("hidden"),Re()});const H=document.getElementById("btnActionExportPng");H&&(H.onclick=()=>{f?.classList.add("hidden"),Ve()});const E=document.getElementById("btnActionExportPdf");E&&(E.onclick=()=>{f?.classList.add("hidden"),st()});const d=document.getElementById("btnActionAdminReport");d&&(d.onclick=()=>{f?.classList.add("hidden"),ke()});const o=document.getElementById("btnActionBackup");o&&(o.onclick=()=>{f?.classList.add("hidden"),ct()});const a=document.getElementById("btnActionSettings");a&&(a.onclick=()=>{f?.classList.add("hidden"),ft()})}function qe(e){if(r.viewMode==="daily"){document.querySelectorAll(".filter-pill").forEach(E=>{E.onclick=()=>{r.filterStatus=E.dataset.f,W()}});const i=document.getElementById("plannerTaskSearchInp");i&&(i.oninput=E=>{const d=E.target.value;r.searchQuery=d;const o=E.target.selectionStart;W();const a=document.getElementById("plannerTaskSearchInp");if(a&&(a.focus(),o!==null))try{a.setSelectionRange(o,o)}catch{}});const b=document.getElementById("btnClearSearch");b&&(b.onclick=()=>{r.searchQuery="",W()});const y=document.getElementById("btnFocusAddTask");y&&(y.onclick=()=>{Be(null,r.selectedDate)});const _=document.getElementById("btnEmptyStateAddTask");_&&(_.onclick=()=>{Be(null,r.selectedDate)});const L=document.getElementById("quickAddTitleInp"),q=document.getElementById("quickAddCompletionDate"),I=document.getElementById("quickAddPriority"),z=document.getElementById("quickAddCategory"),M=document.getElementById("btnQuickAddSubmit"),p=async()=>{const E=Ge();if(r.selectedDate<E){$("Cannot add tasks on previous dates. You can only view, edit, or mark existing tasks complete.",!0);return}const d=(L?.value||"").trim();if(!d){$("Please enter a task title",!0),L?.focus();return}const o=(q?.value||"").trim()||r.selectedDate;if(o<E){$("Cannot set completion date on a previous date.",!0);return}try{const a={title:d,assignedDate:r.selectedDate,assignedDateStr:r.selectedDate,dateStr:o,completionDate:o,completionDateStr:o,dueDate:o,priority:I?.value||c.defaultPriority,category:z?.value&&!["general","#general"].includes(z.value.toLowerCase())?z.value:"",status:"Pending"};if(m){const T=document.getElementById("quickAddAssignee")?.value;T==="all"?(a.assignAll=!0,a.personnelId="all"):T==="me"||!T?a.personnelId=null:T?a.personnelId=T:r.selectedPersonnelId!=="all"&&(a.personnelId=r.selectedPersonnelId)}const h=await ye("/tasks",a);r.tasks.unshift(h),$("Task added to today's focus! ✨"),L&&(L.value="",L.focus()),W()}catch(a){$(a.message,!0)}};M&&(M.onclick=p),L&&(L.onkeydown=E=>{E.key==="Enter"&&p()}),document.querySelectorAll('[data-action="toggle-emp-group"]').forEach(E=>{E.onclick=()=>{const d=E.dataset.empKey;r.collapsedEmployees[d]=!r.collapsedEmployees[d],W()}});const B=document.getElementById("btnToggleEmpGrouping");B&&(B.onclick=()=>{r.groupByEmployee=!r.groupByEmployee,W()});const f=document.getElementById("btnExpandAllEmp");f&&(f.onclick=()=>{r.collapsedEmployees={},W()});const P=document.getElementById("btnCollapseAllEmp");P&&(P.onclick=()=>{document.querySelectorAll(".ci360-emp-group-card").forEach(E=>{const d=E.dataset.empKey;d&&(r.collapsedEmployees[d]=!0)}),W()});const H=document.getElementById("btnEmptyStateImport");H&&(H.onclick=()=>Re())}if(r.viewMode==="weekly"){const i=document.getElementById("btnPrevWeek"),b=document.getElementById("btnNextWeek"),y=document.getElementById("btnThisWeek");i&&(i.onclick=()=>{r.selectedDate=Kt(r.selectedDate,-7),W()}),b&&(b.onclick=()=>{r.selectedDate=Kt(r.selectedDate,7),W()}),y&&(y.onclick=()=>{r.selectedDate=Ge(),W()}),document.querySelectorAll(".day-col-header").forEach(_=>{_.onclick=()=>{r.selectedDate=_.dataset.date,r.viewMode="daily",W()}}),document.querySelectorAll('[data-action="add-day"]').forEach(_=>{_.onclick=()=>{Be(null,_.dataset.date)}})}if(r.viewMode==="report"){const i=document.getElementById("selectWeeklyReportEmployee");i&&(i.onchange=_=>{r.reportPersonnelId=_.target.value,W()});const b=document.getElementById("btnDownloadWeeklyPdf");b&&(b.onclick=()=>st({personnelId:r.reportPersonnelId||"all"}));const y=document.getElementById("btnOpenAdminReportModal");y&&(y.onclick=()=>ke())}s.querySelectorAll('[data-action="toggle"]').forEach(i=>{i.onclick=async b=>{b.stopPropagation();const y=i.dataset.id;await dt(y)}}),s.querySelectorAll('[data-action="edit"]').forEach(i=>{i.onclick=b=>{b.stopPropagation();const y=i.dataset.id,_=r.tasks.find(L=>L._id===y);_&&Be(_)}}),s.querySelectorAll('[data-action="delete"]').forEach(i=>{i.onclick=async b=>{b.stopPropagation();const y=i.dataset.id;await kt(y)}}),s.querySelectorAll(".btn-preview-task-att").forEach(i=>{i.onclick=b=>{b.stopPropagation();const y=i.dataset.url,_=i.dataset.name;y&&Ta({url:y,name:_})}}),s.querySelectorAll(".btn-view-task-atts").forEach(i=>{i.onclick=b=>{b.stopPropagation();const y=i.dataset.id,_=r.tasks.find(L=>L._id===y);_&&Be(_)}})}async function dt(e){const i=r.tasks.find(y=>y._id===e);if(!i)return;const b=i.status!=="Completed";try{const y=await tt(`/tasks/${e}/toggle`,{}),_=r.tasks.findIndex(L=>L._id===e);_!==-1&&(r.tasks[_]=y),b?(c.soundEnabled&&ja(),$("Task marked as completed! 🎉")):$("Task reopened as pending."),W()}catch(y){$(y.message,!0)}}async function kt(e){const i=r.tasks.find(b=>b._id===e);if(i&&confirm(`Are you sure you want to remove "${i.title}" from your planner?
(It will be safely retained in the database archive.)`))try{await at(`/tasks/${e}`),r.tasks=r.tasks.filter(b=>b._id!==e),$("Task removed from planner (safely stored in database archive)"),W()}catch(b){$(b.message,!0)}}function Be(e=null,i=null){const b=!!e,y=Ge(),_=e?e.assignedDateStr||(e.assignedDate?new Date(e.assignedDate).toISOString().slice(0,10):"")||e.dateStr||(e.createdAt?new Date(e.createdAt).toISOString().slice(0,10):r.selectedDate):i&&i>=y?i:r.selectedDate>=y?r.selectedDate:y;e?e.completionDateStr||e.dueDate&&new Date(e.dueDate).toISOString().slice(0,10):i&&i>=y||r.selectedDate>=y&&r.selectedDate;const L=`
      <div class="ci360-planner-modal">
        <div class="ci360-modal-header">
          <h3>${b?"Edit Task":"Add New Task"}</h3>
          <button type="button" class="ci360-modal-close" id="btnModalClose">×</button>
        </div>

        <form id="taskForm" class="ci360-modal-form">
          <!-- Title -->
          <div class="form-group">
            <label for="taskTitle" class="required">Task Title</label>
            <input type="text" id="taskTitle" class="input" placeholder="e.g. Prepare client deck for review" value="${v(e?.title||"")}" required autofocus>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="taskDesc">Description / Notes</label>
            <textarea id="taskDesc" class="input" rows="3" placeholder="Key deliverables, context, or checklist details...">${v(e?.description||"")}</textarea>
          </div>

          <!-- Date Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskDate">Assigned Date</label>
              <input type="date" id="taskDate" class="input" value="${_}" ${b?"":`min="${y}"`}>
            </div>
            <div class="form-group flex-1">
              <label for="taskCompletionDate">Completion Date</label>
              <input type="date" id="taskCompletionDate" class="input" value="${e?.completionDateStr||(e?.dueDate?new Date(e.dueDate).toISOString().slice(0,10):"")}" ${b?"":`min="${y}"`} placeholder="Defaults to that day">
              <small style="color:var(--text-3);font-size:11px;">If left blank, will default to that day (${_})</small>
            </div>
          </div>

          <!-- Priority, Status, Category Row -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="taskPriority">Priority</label>
              <select id="taskPriority" class="input">
                <option value="Low" ${e?.priority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${!e&&c.defaultPriority==="Medium"||e?.priority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${!e&&c.defaultPriority==="High"||e?.priority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${e?.priority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskStatus">Status</label>
              <select id="taskStatus" class="input">
                <option value="Pending" ${e?.status==="Pending"||e?.status==="Todo"||!e?"selected":""}>Pending</option>
                <option value="In Progress" ${e?.status==="In Progress"?"selected":""}>In Progress</option>
                <option value="Completed" ${e?.status==="Completed"?"selected":""}>Completed</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="taskClientName">Client Name</label>
              <input type="text" id="taskClientName" class="input" list="clientOptions" placeholder="Enter or select client name..." value="${v(e?.clientName||(e?.category&&e.category!=="General"?e.category:""))}">
              <datalist id="clientOptions">
                ${(r.clientList||[]).map(S=>`<option value="${v(S.name)}">`).join("")}
                <option value="Internal CI">
              </datalist>
            </div>
          </div>

          <!-- Superadmin Assign To -->
          ${m?`
            <div class="form-group">
              <label for="taskAssignee">Primary Assignee / Owner</label>
              <select id="taskAssignee" class="input">
                <option value="me" ${!e||!e?.personnelId&&!e?.assignAll?"selected":""}>Myself (Admin)</option>
                <option value="all" ${e?.assignAll?"selected":""}>Assign to All Active Team Members</option>
                ${r.personnelList.map(S=>{const A=e?.personnelId?._id===S._id||e?.personnelId===S._id;return`<option value="${S._id}" ${A?"selected":""}>👤 ${v(S.name)} (${v(S.department||S.role||"Member")})</option>`}).join("")}
              </select>
            </div>
          `:""}

          <!-- Co-Owners / Multiple Collaborators -->
          <div class="form-group" style="margin-top:10px;">
            <label style="display:flex;justify-content:space-between;align-items:center;">
              <span>Co-Owners / Additional People <span id="coOwnersCountBadge" style="display:none;font-size:11px;background:rgba(0,112,243,0.15);color:var(--accent);padding:1px 7px;border-radius:10px;font-weight:700;">0</span></span>
              <small style="color:var(--text-3);font-size:11px;">Search & add multiple collaborators</small>
            </label>
            <div id="coOwnersSelectedContainer" style="display:flex;flex-wrap:wrap;gap:6px;min-height:28px;margin:4px 0 8px;"></div>
            
            <div class="co-owner-search-box-wrap" style="position:relative;">
              <div style="position:relative;display:flex;align-items:center;">
                <span style="position:absolute;left:10px;font-size:13px;color:var(--text-4);pointer-events:none;">🔍</span>
                <input type="text" id="taskCoOwnerSearchInput" class="input" placeholder="Search team member by name or department..." autocomplete="off" style="padding-left:32px;padding-right:30px;font-size:12.5px;">
                <button type="button" id="taskCoOwnerClearBtn" style="position:absolute;right:8px;background:transparent;border:none;color:var(--text-4);font-size:16px;cursor:pointer;line-height:1;display:none;padding:2px 6px;" title="Clear">×</button>
              </div>
              <div id="taskCoOwnerDropdownResults" class="co-owner-dropdown-results" style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;max-height:220px;overflow-y:auto;background:var(--bg-card);border:1px solid var(--border-md);border-radius:var(--r-md);box-shadow:var(--shadow-xl);z-index:99999;padding:4px 0;"></div>
            </div>

            <!-- Optional legacy selector fallback -->
            <select id="taskCoOwnerSelect" class="input" style="display:none;margin-top:6px;">
              <option value="">+ Add Co-Owner / Collaborator...</option>
              ${r.personnelList.map(S=>`
                <option value="${S._id}">+ 👤 ${v(S.name)} (${v(S.department||S.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <!-- Attachments & Paste Screenshot Section -->
          <div class="form-group" style="margin-top:14px;">
            ${Fa({id:"task-attachments-uploader",label:"Attachments & Screenshots",subtitle:"Drag & drop files, browse local files, or paste screenshot anywhere with Ctrl+V"})}
            <div class="task-paste-notice">
              <span style="font-size:14px;">📋</span>
              <span><strong>Paste anywhere:</strong> Press <strong>Ctrl + V</strong> in this window to immediately attach a screenshot or image from your clipboard.</span>
            </div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              ${b?`
                <button type="button" class="btn danger small" id="btnModalDeleteTask" style="padding:6px 12px;background:#ef4444;color:#fff;border-radius:var(--r-sm);border:none;cursor:pointer;font-weight:700;font-size:12px;">🗑️ Delete Task</button>
              `:""}
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="ci360-btn-secondary" id="btnCancelModal">Cancel</button>
              <button type="submit" class="ci360-btn-primary" id="btnSaveTask">
                ${b?"Save Changes":"Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    `,q=Lt(L),I=q.querySelector("#taskForm"),z=q.querySelector("#btnModalClose"),M=q.querySelector("#btnCancelModal"),p=q.querySelector("#btnModalDeleteTask"),B=()=>q.remove();z&&(z.onclick=B),M&&(M.onclick=B),p&&e&&(p.onclick=async()=>{B(),await kt(e._id)});let f=[];e&&Array.isArray(e.coOwners)&&(f=e.coOwners.map(S=>({personnelId:S.personnelId?._id||S.personnelId||null,userId:S.userId?._id||S.userId||null,name:S.name||S.personnelId?.name||"",role:S.role||S.personnelId?.role||"",department:S.department||S.personnelId?.department||""})).filter(S=>S.personnelId||S.name));const P=q.querySelector("#coOwnersSelectedContainer"),H=q.querySelector("#taskCoOwnerSelect"),E=q.querySelector("#taskCoOwnerSearchInput"),d=q.querySelector("#taskCoOwnerClearBtn"),o=q.querySelector("#taskCoOwnerDropdownResults"),a=q.querySelector("#coOwnersCountBadge"),h=()=>{a&&(f.length>0?(a.textContent=String(f.length),a.style.display="inline-block"):a.style.display="none")},T=S=>{if(!S||!S._id)return;f.some(U=>String(U.personnelId)===String(S._id))||(f.push({personnelId:S._id,name:S.name,role:S.role||"",department:S.department||""}),j()),E&&(E.value="",d&&(d.style.display="none"),C(""),E.focus())},j=()=>{if(P){if(h(),f.length===0){P.innerHTML='<span style="font-size:11.5px;color:var(--text-4);font-style:italic;">No co-owners added yet</span>';return}P.innerHTML=f.map((S,A)=>`
        <span class="co-owner-chip" style="display:inline-flex;align-items:center;gap:6px;background:rgba(0,112,243,0.12);color:var(--accent);border:1px solid rgba(0,112,243,0.25);border-radius:16px;padding:3px 10px;font-size:12px;font-weight:600;">
          👤 ${v(S.name)}
          <button type="button" class="btn-remove-co" data-idx="${A}" style="background:transparent;border:none;color:var(--accent);cursor:pointer;font-size:14px;line-height:1;padding:0;margin-left:2px;font-weight:bold;" title="Remove co-owner">×</button>
        </span>
      `).join(""),P.querySelectorAll(".btn-remove-co").forEach(S=>{S.onclick=()=>{const A=parseInt(S.dataset.idx,10);f.splice(A,1),j(),o&&o.style.display!=="none"&&C(E?E.value:"")}})}},C=(S="")=>{if(!o)return;const A=(S||"").toLowerCase().trim(),U=Array.isArray(r.personnelList)?r.personnelList:[],ae=U.filter(G=>{if(!A)return!0;const ne=(G.name||"").toLowerCase(),le=(G.department||"").toLowerCase(),oe=(G.role||"").toLowerCase(),ue=(G.email||"").toLowerCase();return ne.includes(A)||le.includes(A)||oe.includes(A)||ue.includes(A)});if(ae.length===0){o.innerHTML=`
          <div style="padding:14px 16px;font-size:12px;color:var(--text-3);text-align:center;">
            🔍 No team members found matching "<strong>${v(A)}</strong>"
          </div>
        `,o.style.display="block";return}o.innerHTML=ae.map(G=>{const ne=f.some(oe=>String(oe.personnelId)===String(G._id)),le=(G.name||"U").charAt(0).toUpperCase();return`
          <div class="co-owner-result-item ${ne?"already-added":""}" data-id="${G._id}">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
              <span style="width:26px;height:26px;border-radius:50%;background:rgba(0,112,243,0.12);color:var(--accent);display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">
                ${le}
              </span>
              <div style="min-width:0;flex:1;">
                <div style="font-weight:600;font-size:12.5px;color:var(--text-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${v(G.name)}
                </div>
                <div style="font-size:11px;color:var(--text-3);">
                  ${v(G.department||G.role||"Member")}
                </div>
              </div>
            </div>
            <div style="flex-shrink:0;">
              ${ne?`
                <span style="font-size:11.5px;color:#10b981;font-weight:700;display:inline-flex;align-items:center;gap:3px;">
                  ✓ Added
                </span>
              `:`
                <span class="btn small primary" style="padding:3px 10px;font-size:11px;border-radius:6px;pointer-events:none;">
                  + Add
                </span>
              `}
            </div>
          </div>
        `}).join(""),o.querySelectorAll(".co-owner-result-item:not(.already-added)").forEach(G=>{G.onclick=ne=>{ne.stopPropagation();const le=G.dataset.id,oe=U.find(ue=>String(ue._id)===String(le));oe&&T(oe)}}),o.style.display="block"};j(),E&&(E.onfocus=()=>{C(E.value)},E.oninput=S=>{const A=S.target.value;d&&(d.style.display=A?"block":"none"),C(A)},E.onkeydown=S=>{if(S.key==="Escape")o&&(o.style.display="none");else if(S.key==="Enter"){S.preventDefault();const A=Array.isArray(r.personnelList)?r.personnelList:[],U=(E.value||"").toLowerCase().trim(),ae=A.find(G=>f.some(le=>String(le.personnelId)===String(G._id))?!1:U?(G.name||"").toLowerCase().includes(U)||(G.department||"").toLowerCase().includes(U):!0);ae&&T(ae)}}),d&&(d.onclick=S=>{S.stopPropagation(),E&&(E.value="",E.focus()),d.style.display="none",C("")});const Y=S=>{const A=q.querySelector(".co-owner-search-box-wrap");A&&!A.contains(S.target)&&o&&(o.style.display="none")};q.addEventListener("click",Y),H&&(H.onchange=()=>{const S=H.value;if(!S)return;const A=r.personnelList.find(U=>String(U._id)===String(S));A&&T(A),H.value=""}),Pa("task-attachments-uploader",{existing:Array.isArray(e?.attachments)?e.attachments:[]});const Z=async S=>{const A=S.clipboardData?.items;if(!A||!A.length)return;const U=[];for(let ae=0;ae<A.length;ae++)if(A[ae].type&&A[ae].type.startsWith("image/")){const G=A[ae].getAsFile();if(G){const ne=G.type.split("/")[1]||"png",oe=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),ue=new File([G],`screenshot-${oe}.${ne}`,{type:G.type});U.push(ue)}}if(U.length>0){S.preventDefault(),$(`Pasting ${U.length} screenshot(s)... 📸`);for(const ae of U)try{const G=await La(ae);if(G){const ne=ma("task-attachments-uploader");za("task-attachments-uploader",[...ne,G]),$("Screenshot attached successfully! 📸")}}catch(G){$("Failed to paste screenshot: "+(G.message||"Error"),!0)}}};q.addEventListener("paste",Z),I.onsubmit=async S=>{S.preventDefault();const A=q.querySelector("#taskTitle").value.trim(),U=q.querySelector("#taskDesc").value.trim(),ae=q.querySelector("#taskDate").value||_,ne=q.querySelector("#taskCompletionDate")?.value?.trim()||ae||r.selectedDate,le=q.querySelector("#taskPriority").value,oe=q.querySelector("#taskStatus").value,ue=(q.querySelector("#taskClientName")?.value||q.querySelector("#taskCategory")?.value||"").trim(),Ee=ue||"",ee=ma("task-attachments-uploader");if(!A){$("Task title is required",!0);return}if(!b&&(ne<y||ae<y)){$("Cannot add tasks on previous dates. New tasks can only be scheduled for today or future dates.",!0);return}const Se={title:A,description:U,assignedDate:ae,assignedDateStr:ae,dateStr:ne,completionDate:ne,completionDateStr:ne,dueDate:ne,startTime:"",dueTime:"",priority:le,status:oe,category:Ee,clientName:ue,attachments:ee,coOwners:f};if(m){const ie=q.querySelector("#taskAssignee")?.value;ie==="all"?(Se.assignAll=!0,Se.personnelId="all"):!ie||ie==="me"||ie==="myself"||ie==="self"?Se.personnelId=null:ie&&(Se.personnelId=ie)}else Se.personnelId=null;const Ce=q.querySelector("#btnSaveTask");Ce.disabled=!0,Ce.textContent="Saving...";try{if(b){const ie=await Jt(`/tasks/${e._id}`,Se),fe=r.tasks.findIndex(ve=>ve._id===e._id);fe!==-1&&(r.tasks[fe]=ie),$("Task updated successfully! ✍️")}else{const ie=await ye("/tasks",Se);Array.isArray(ie.tasks)?ie.tasks.forEach(fe=>r.tasks.unshift(fe)):r.tasks.unshift(ie),$("Task created successfully! ✨")}B(),W()}catch(ie){$(ie.message,!0),Ce.disabled=!1,Ce.textContent=b?"Save Changes":"Create Task"}}}async function wt(){let e=[],i="all",b="";const _=Lt(`
      <div class="ci360-planner-modal recent-tasks-modal" style="max-width:860px;width:95vw;">
        <div class="ci360-modal-header" style="border-bottom:1px solid var(--border-sm);padding-bottom:12px;">
          <div>
            <h3 style="display:flex;align-items:center;gap:8px;margin:0;">
              <span>🕒</span>
              <span>Recent Task Activity</span>
            </h3>
            <p style="font-size:12px;color:var(--text-3);margin:4px 0 0">
              Live stream of latest added, completed, and rescheduled or edited tasks.
            </p>
          </div>
          <button type="button" class="ci360-modal-close" id="btnRecentModalClose">×</button>
        </div>

        <div style="padding:16px 20px;">
          <!-- Filter Tabs & Quick Search -->
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;">
            <div class="recent-modal-header-tabs" style="display:flex;gap:6px;flex-wrap:wrap;margin:0;padding:0;border:none;">
              <button type="button" class="recent-tab-btn active" data-tab="all">⚡ All Recent</button>
              <button type="button" class="recent-tab-btn" data-tab="added">➕ Newly Added</button>
              <button type="button" class="recent-tab-btn" data-tab="completed">✅ Completed</button>
              <button type="button" class="recent-tab-btn" data-tab="changed">🔄 Changed / Rescheduled</button>
            </div>
            <div style="position:relative;min-width:220px;flex:1;max-width:320px;">
              <input type="text" id="recentTaskSearch" class="input" placeholder="Search tasks, client, or assignee..." style="padding:7px 12px;font-size:12px;border-radius:20px;">
            </div>
          </div>

          <!-- Task List Body -->
          <div id="recentTasksListContainer" style="max-height:480px;overflow-y:auto;padding-right:4px;">
            <div style="text-align:center;padding:48px;color:var(--text-3);">
              <div style="font-size:24px;margin-bottom:8px;">⏳</div>
              <div>Loading recent activity...</div>
            </div>
          </div>
        </div>
      </div>
    `),L=_.querySelector("#btnRecentModalClose");L&&(L.onclick=()=>_.remove());const q=_.querySelector("#recentTasksListContainer"),I=_.querySelector("#recentTaskSearch");try{const M=await Me("/tasks/recent");e=Array.isArray(M)?M:r.tasks||[]}catch(M){console.warn("Fallback to local state tasks for recent:",M),e=[...r.tasks||[]].sort((p,B)=>new Date(B.updatedAt||B.createdAt||0)-new Date(p.updatedAt||p.createdAt||0))}const z=()=>{if(!q)return;let M=[...e];if(i==="completed"?(M=M.filter(p=>p.status==="Completed"||p.completedAt),M.sort((p,B)=>new Date(B.completedAt||B.updatedAt||0)-new Date(p.completedAt||p.updatedAt||0))):i==="changed"?(M=M.filter(p=>p.rescheduledFrom||p.dateChangeCount&&p.dateChangeCount>0||p.updatedAt&&p.createdAt&&new Date(p.updatedAt).getTime()-new Date(p.createdAt).getTime()>1e4),M.sort((p,B)=>new Date(B.updatedAt||0)-new Date(p.updatedAt||0))):i==="added"&&M.sort((p,B)=>new Date(B.createdAt||0)-new Date(p.createdAt||0)),b){const p=b.toLowerCase();M=M.filter(B=>B.title&&B.title.toLowerCase().includes(p)||B.description&&B.description.toLowerCase().includes(p)||B.clientName&&B.clientName.toLowerCase().includes(p)||B.personnelId?.name&&B.personnelId.name.toLowerCase().includes(p)||B.createdBy?.name&&B.createdBy.name.toLowerCase().includes(p))}if(!M.length){q.innerHTML=`
          <div style="text-align:center;padding:48px 20px;color:var(--text-4);">
            <div style="font-size:32px;margin-bottom:8px;">🔍</div>
            <div style="font-size:14px;font-weight:600;color:var(--text-2);">No matching recent tasks found</div>
            <div style="font-size:12px;margin-top:4px;">Try selecting another filter or adjusting your search term.</div>
          </div>
        `;return}q.innerHTML=M.map(p=>{const B=p.status==="Completed",f=ze(p.assignedDateStr||p.assignedDate||(p.createdAt?new Date(p.createdAt).toISOString().slice(0,10):"")),P=ze(p.completionDateStr||p.completionDate||p.dueDate||""),H=p.updatedAt?new Date(p.updatedAt).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"";p.createdAt&&new Date(p.createdAt).toLocaleString("en-IN",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});const E=p.createdBy?.name||(typeof p.createdBy=="string"?p.createdBy:""),d=p.personnelId?.name||p.userId?.name||"",o=Array.isArray(p.attachments)&&p.attachments.length>0;return`
          <div class="recent-task-row">
            <div style="display:flex;align-items:flex-start;gap:12px;min-width:0;flex:1;">
              <span class="status-dot" style="width:10px;height:10px;border-radius:50%;margin-top:6px;flex-shrink:0;background:${B?"#10b981":p.status==="In Progress"?"#3b82f6":"#f59e0b"};box-shadow:0 0 6px ${B?"rgba(16,185,129,0.5)":p.status==="In Progress"?"rgba(59,130,246,0.5)":"rgba(245,158,11,0.5)"};"></span>
              <div style="min-width:0;flex:1;">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
                  <span style="font-size:13.5px;font-weight:700;color:var(--text-1);${B?"text-decoration:line-through;color:var(--text-3);":""}">${v(p.title)}</span>
                  <span class="ci360-badge priority-${(p.priority||"medium").toLowerCase()}" style="font-size:10px;padding:2px 6px;">${v(p.priority||"Medium")}</span>
                  <span class="ci360-badge" style="font-size:10px;padding:2px 6px;background:${B?"rgba(16,185,129,0.1)":"rgba(59,130,246,0.1)"};color:${B?"#10b981":"#3b82f6"};">${B?"Completed":v(p.status)||"Pending"}</span>
                  ${p.clientName?`<span class="ci360-badge" style="background:rgba(16,185,129,0.1);color:#10b981;font-size:10px;padding:2px 6px;">🏢 ${v(p.clientName)}</span>`:""}
                  ${o?`<span class="ci360-badge" style="background:rgba(59,130,246,0.12);color:#2563eb;font-size:10px;padding:2px 6px;">📎 ${p.attachments.length} file(s)</span>`:""}
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:11.5px;color:var(--text-3);">
                  ${p.rescheduledFrom?`
                    <span style="color:#d97706;font-weight:600;">🔄 Rescheduled: ${ze(p.rescheduledFrom)} ➔ ${P}</span>
                  `:`
                    <span>📅 Due: ${P||f}</span>
                  `}
                  ${E?`<span>✍️ By: <strong>${v(E)}</strong></span>`:""}
                  ${d?`<span>👤 Assigned: <strong>${v(d)}</strong></span>`:""}
                  ${H?`<span style="color:var(--text-4);">🕒 Updated ${H}</span>`:""}
                </div>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
              <button type="button" class="btn secondary small btn-open-recent-task" data-id="${p._id}" style="padding:5px 12px;font-size:11.5px;font-weight:600;display:inline-flex;align-items:center;gap:4px;">
                <span>✏️ Edit</span>
              </button>
            </div>
          </div>
        `}).join(""),q.querySelectorAll(".btn-open-recent-task").forEach(p=>{p.onclick=()=>{const B=p.dataset.id,f=e.find(P=>String(P._id)===String(B))||r.tasks.find(P=>String(P._id)===String(B));f&&(_.remove(),Be(f))}})};z(),_.querySelectorAll(".recent-tab-btn").forEach(M=>{M.onclick=()=>{_.querySelectorAll(".recent-tab-btn").forEach(p=>p.classList.remove("active")),M.classList.add("active"),i=M.dataset.tab,z()}}),I&&(I.oninput=M=>{b=M.target.value.trim(),z()})}function Re(){let e=[];const i=`
      <div class="ci360-planner-modal import-modal" style="max-width:680px">
        <div class="ci360-modal-header">
          <div>
            <h3>Import Task List</h3>
            <p style="font-size:12px;color:var(--text-3);margin:2px 0 0">Paste tasks or upload a plain-text (.txt) file — one task per line.</p>
          </div>
          <button type="button" class="ci360-modal-close" id="btnImportClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="importTargetDate" class="required">Target Date for Tasks</label>
              <input type="date" id="importTargetDate" class="input" value="${r.selectedDate<Ge()?Ge():r.selectedDate}" min="${Ge()}">
            </div>

            <div class="form-group flex-1">
              <label for="importPriority">Default Priority</label>
              <select id="importPriority" class="input">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="importCategory">Default Category</label>
              <input type="text" id="importCategory" class="input" value="General">
            </div>
          </div>

          <!-- File Upload Zone -->
          <div class="ci360-dropzone" id="importDropzone">
            <input type="file" id="importFileInput" accept=".txt,text/plain" style="display:none">
            <div class="drop-icon">📄</div>
            <div class="drop-text">
              <strong>Click to upload .txt file</strong> or drag and drop here
            </div>
            <div class="drop-sub" id="importFileInfo">One task per line formatted in plain text</div>
          </div>

          <!-- Paste Textarea -->
          <div class="form-group" style="margin-top:12px">
            <label for="importTextarea">Or Paste Tasks Directly (one task per line):</label>
            <textarea id="importTextarea" class="input" rows="6" placeholder="Finalize onboarding wireframes&#10;Conduct team sync at 11am&#10;Review client contract terms&#10;Deploy frontend v1.6"></textarea>
          </div>

          <!-- Live Preview Box -->
          <div class="ci360-import-preview-wrap">
            <div class="preview-header">
              <strong id="previewCountLabel">Preview (0 tasks found)</strong>
              <span id="previewNotice" style="font-size:12px;color:var(--text-3)"></span>
            </div>
            <div class="preview-list" id="previewListArea">
              <div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">
                Paste lines or upload a file above to preview tasks before importing.
              </div>
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelImport">Cancel</button>
            <button type="button" class="ci360-btn-primary" id="btnConfirmImport" disabled>
              Import 0 Tasks
            </button>
          </div>

        </div>
      </div>
    `,b=Lt(i),y=()=>b.remove();b.querySelector("#btnImportClose").onclick=y,b.querySelector("#btnCancelImport").onclick=y;const _=b.querySelector("#importTextarea"),L=b.querySelector("#importFileInput"),q=b.querySelector("#importDropzone"),I=b.querySelector("#previewListArea"),z=b.querySelector("#previewCountLabel"),M=b.querySelector("#btnConfirmImport"),p=b.querySelector("#importFileInfo");function B(P){if(!P)return[];const H=P.split(/\r?\n/),E=[];for(let d of H)d=d.trim(),d&&(d=d.replace(/^-\s*\[\s*[xX ]?\s*\]\s*/,""),d=d.replace(/^[-*•]\s+/,""),d=d.replace(/^\d+[\.\)]\s+/,""),d=d.trim(),d&&E.push(d));return E}function f(){const P=_.value,H=B(P),E=b.querySelector("#importTargetDate").value,d=F(E),o=new Set(d.map(a=>(a.title||"").trim().toLowerCase()));e=[];for(const a of H){const h=o.has(a.toLowerCase());e.push({title:a,isDuplicate:h})}if(z.textContent=`Preview (${e.length} ${e.length===1?"task":"tasks"} found)`,M.disabled=e.length===0,M.textContent=`Import ${e.length} ${e.length===1?"Task":"Tasks"}`,e.length===0){I.innerHTML='<div style="padding:16px;text-align:center;color:var(--text-4);font-size:12px">No tasks found. Paste text above to preview.</div>';return}I.innerHTML=e.map((a,h)=>`
        <div class="preview-item ${a.isDuplicate?"is-duplicate":""}">
          <span class="preview-index">${h+1}.</span>
          <span class="preview-title">${v(a.title)}</span>
          ${a.isDuplicate?'<span class="badge overdue-badge" style="font-size:10px">Already on this date</span>':""}
        </div>
      `).join("")}_.oninput=f,q.onclick=()=>L.click(),L.onchange=P=>{const H=P.target.files[0];if(!H)return;p.textContent=`File selected: ${H.name} (${Math.round(H.size/1024)} KB)`;const E=new FileReader;E.onload=d=>{_.value=d.target.result,f()},E.readAsText(H)},q.ondragover=P=>{P.preventDefault(),q.classList.add("dragover")},q.ondragleave=()=>q.classList.remove("dragover"),q.ondrop=P=>{P.preventDefault(),q.classList.remove("dragover");const H=P.dataTransfer.files[0];if(H&&(H.type==="text/plain"||H.name.endsWith(".txt"))){p.textContent=`File dropped: ${H.name}`;const E=new FileReader;E.onload=d=>{_.value=d.target.result,f()},E.readAsText(H)}else $("Please drop a valid .txt plain-text file",!0)},M.onclick=async()=>{if(e.length===0)return;M.disabled=!0,M.textContent="Importing...";const P=b.querySelector("#importTargetDate").value;if(P<Ge()){$("Cannot import tasks for previous dates. Target date must be today or later.",!0),M.disabled=!1,M.textContent=`Import ${e.length} ${e.length===1?"Task":"Tasks"}`;return}const H=b.querySelector("#importPriority").value,E=b.querySelector("#importCategory").value.trim()||"General",d={date:P,tasks:e.map(o=>({title:o.title,priority:H,category:E,status:"Pending"}))};m&&r.selectedPersonnelId!=="all"&&(d.personnelId=r.selectedPersonnelId);try{const o=await ye("/tasks/bulk-import",d);Array.isArray(o.tasks)&&o.tasks.forEach(a=>r.tasks.unshift(a)),$(`Imported ${o.importedCount} tasks successfully! (${o.skippedCount} skipped duplicates)`),y(),r.selectedDate=P,W()}catch(o){$(o.message,!0),M.disabled=!1,M.textContent="Retry Import"}}}async function Ve(){const e=F(r.selectedDate),i=V(e,Ge()),b=Dt(r.selectedDate),y=2,_=800,L=160,q=90,I=74,z=70,M=Math.max(120,e.length*I),p=L+q+M+z,B=document.createElement("canvas");B.width=_*y,B.height=p*y;const f=B.getContext("2d");f.scale(y,y);const P=document.documentElement.getAttribute("data-theme")==="dark",H=P?"#020713":"#F0F6FF",E=P?"#081226":"#FFFFFF",d=P?"rgba(56, 189, 248, 0.16)":"#E2E8F0",o=P?"#F8FAFC":"#0F172A",a=P?"#8EA4C8":"#475569",h="#0070F3",T="#10B981",j="#F59E0B";f.fillStyle=H,f.fillRect(0,0,_,p),f.fillStyle=E,pe(f,24,20,_-48,L-30,16),f.fill(),f.strokeStyle=d,f.lineWidth=1,f.stroke(),f.fillStyle=h,f.font="bold 12px Inter, sans-serif",f.fillText("CI360 INTELLIGENCE SUITE · DAILY PLANNER",44,52),f.fillStyle=o,f.font='bold 22px "Plus Jakarta Sans", Inter, sans-serif',f.fillText(b,44,86),f.fillStyle=a,f.font="13px Inter, sans-serif",f.fillText(`Planned focus list · ${i.completed} of ${i.total} tasks completed (${i.percent}%)`,44,114);const C=L+6;f.fillStyle=E,pe(f,24,C,_-48,q-16,12),f.fill(),f.stroke();const Y=[{label:"TOTAL TASKS",val:String(i.total),color:o},{label:"COMPLETED",val:String(i.completed),color:T},{label:"IN PROGRESS",val:String(i.inProgress),color:j},{label:"PENDING",val:String(i.pending),color:a},{label:"PROGRESS",val:`${i.percent}%`,color:h}],Z=(_-48)/Y.length;Y.forEach((U,ae)=>{const G=24+ae*Z+20;f.fillStyle=U.color,f.font="bold 20px Inter, sans-serif",f.fillText(U.val,G,C+36),f.fillStyle=a,f.font="10px Inter, sans-serif",f.fillText(U.label,G,C+54)});const S=C+q;f.fillStyle=E,pe(f,24,S,_-48,M+10,16),f.fill(),f.stroke(),e.length===0?(f.fillStyle=a,f.font="14px Inter, sans-serif",f.textAlign="center",f.fillText("No scheduled tasks recorded for this date.",_/2,S+60),f.textAlign="left"):e.forEach((U,ae)=>{const G=S+16+ae*I,ne=U.status==="Completed";f.beginPath(),f.arc(48,G+14,10,0,Math.PI*2),ne?(f.fillStyle=T,f.fill(),f.strokeStyle="#FFFFFF",f.lineWidth=2,f.beginPath(),f.moveTo(44,G+14),f.lineTo(47,G+17),f.lineTo(52,G+11),f.stroke()):(f.strokeStyle=d,f.lineWidth=2,f.stroke()),f.fillStyle=ne?a:o,f.font=`${ne?"normal":"500"} 14px Inter, sans-serif`;const le=U.title.length>55?U.title.slice(0,52)+"...":U.title;if(f.fillText(le,70,G+18),ne){const fe=f.measureText(le);f.strokeStyle=a,f.lineWidth=1.2,f.beginPath(),f.moveTo(70,G+14),f.lineTo(70+fe.width,G+14),f.stroke()}const oe=U.priority||"Medium";let ue="#E2E8F0",Ee="#334155";oe==="Urgent"?(ue="#FEE2E2",Ee="#DC2626"):oe==="High"?(ue="#FEF3C7",Ee="#D97706"):oe==="Low"&&(ue="#ECFDF5",Ee="#059669"),f.fillStyle=ue,pe(f,_-150,G+4,60,20,10),f.fill(),f.fillStyle=Ee,f.font="bold 10px Inter, sans-serif",f.fillText(oe,_-138,G+18);const ee=U.createdByName||U.createdBy?.name||(U.createdBy?.email?U.createdBy.email.split("@")[0]:"")||U.personnelId?.name||U.userId?.name||"Member",Se=U.completionDateStr||U.dateStr||"",Ce=[];Ce.push(`✍️ Added by: ${ee}`),Se&&Ce.push(`📅 Due: ${ze(Se)}`),U.dueTime&&Ce.push(`🕒 ${U.dueTime}`),U.category&&U.category!=="General"&&Ce.push(`#${U.category}`);const ie=Ce.join("   ·   ");f.fillStyle=a,f.font="11px Inter, sans-serif",f.fillText(ie,70,G+36),ae<e.length-1&&(f.strokeStyle=d,f.lineWidth=.6,f.beginPath(),f.moveTo(40,G+54),f.lineTo(_-40,G+54),f.stroke())});const A=p-35;f.fillStyle=a,f.font="11px Inter, sans-serif",f.fillText(`Generated by CI360 Productivity Suite · Dayfolio Native Module · ${new Date().toLocaleDateString()}`,44,A);try{const U=B.toDataURL("image/png"),ae=document.createElement("a");ae.href=U,ae.download=`ci360-daily-planner-${r.selectedDate}.png`,document.body.appendChild(ae),ae.click(),ae.remove(),$("Daily Planner image exported! 🖼️")}catch(U){$("Failed to export image: "+U.message,!0)}}function pe(e,i,b,y,_,L){e.beginPath(),e.moveTo(i+L,b),e.lineTo(i+y-L,b),e.quadraticCurveTo(i+y,b,i+y,b+L),e.lineTo(i+y,b+_-L),e.quadraticCurveTo(i+y,b+_,i+y-L,b+_),e.lineTo(i+L,b+_),e.quadraticCurveTo(i,b+_,i,b+_-L),e.lineTo(i,b+L),e.quadraticCurveTo(i,b,i+L,b),e.closePath()}function st(e={}){const i=Bt(r.selectedDate,c.weekStartsOn),b=Dt(i[0]),y=Dt(i[6]),_=Ge();let L=r.tasks.filter(E=>{if(E.isDeleted===!0)return!1;const d=E.completionDateStr||E.dateStr||(E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):""),o=E.assignedDateStr||(E.assignedDate?new Date(E.assignedDate).toISOString().slice(0,10):"")||d;return e.scope==="today"?d===_||o===_:e.scope==="all"?!0:E.status==="In Progress"&&o&&d?i.some(a=>a>=o&&a<=d):i.includes(d)||i.includes(o)});e.personnelId&&e.personnelId!=="all"&&(L=L.filter(E=>{const d=String(E.personnelId?._id||E.personnelId||""),o=Array.isArray(E.coOwners)&&E.coOwners.some(a=>String(a.personnelId?._id||a.personnelId||a.userId?._id||a.userId||"")===String(e.personnelId));return d===String(e.personnelId)||o})),e.status&&e.status!=="all"&&(L=L.filter(E=>E.status===e.status));const q=L.length,I=L.filter(E=>E.status==="Completed").length,z=L.filter(E=>E.status==="In Progress").length,M=q>0?Math.round(I/q*100):0,p=window.open("","_blank");if(!p){$("Pop-up blocked. Please allow pop-ups to print the PDF report.",!0);return}const B=e.title||(e.isAdminReport?"CI360 Admin Detailed Executive Report":"Weekly Productivity Report"),f=e.scope==="today"?`Date: ${Dt(_)}`:e.scope==="all"?"All Active & Historical Tasks":`${b} – ${y}`;let P="";if(e.personnelId&&e.personnelId!=="all"){const E=r.personnelList.find(d=>String(d._id)===String(e.personnelId));E&&(P=`👤 Employee: ${E.name} (${E.department||E.role||"Member"})`)}const H=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${v(B)} — ${f}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.4; padding: 12px; margin: 0; }
          .header { border-bottom: 2.5px solid #0070F3; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          .brand { font-size: 11px; font-weight: 800; color: #0070F3; letter-spacing: 0.6px; text-transform: uppercase; }
          h1 { margin: 4px 0 2px; font-size: 22px; color: #0f172a; }
          .period { font-size: 13px; color: #475569; font-weight: 500; }
          .filter-tag { display: inline-block; font-size: 11px; color: #0369A1; background: #E0F2FE; padding: 2px 8px; border-radius: 4px; font-weight: 600; margin-left: 8px; }
          
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
          .kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
          .kpi-num { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 3px; }
          .kpi-label { font-size: 10.5px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.3px; }
          
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11.5px; }
          th { text-align: left; background: #f1f5f9; padding: 8px 10px; border: 1px solid #cbd5e1; font-weight: 700; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3px; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
          tr:nth-child(even) td { background: #fbfcfe; }
          
          .client-tag { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 10.5px; border: 1px solid #a7f3d0; }
          .owner-tag { font-weight: 700; color: #1e293b; }
          .co-owner-sub { font-size: 10px; color: #0284C7; font-weight: 600; display: block; margin-top: 2px; }
          .desc-text { font-size: 10.5px; color: #475569; white-space: pre-wrap; line-height: 1.35; max-width: 280px; word-break: break-word; }
          
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
          .badge-urgent { background: #fee2e2; color: #b91c1c; }
          .badge-high { background: #fef3c7; color: #b45309; }
          .badge-med { background: #e0e7ff; color: #0369a1; }
          .badge-low { background: #ecfdf5; color: #047857; }
          
          .status-tag { display: inline-block; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 700; }
          .status-completed { background: #dcfce7; color: #15803d; }
          .status-in-progress { background: #fef3c7; color: #b45309; }
          .status-pending { background: #f1f5f9; color: #475569; }
          
          .footer { margin-top: 24px; font-size: 10.5px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">CI360 Intelligence Productivity Suite · Official Report</div>
            <h1>${v(B)}</h1>
            <div class="period">
              ${f}
              ${P?`<span class="filter-tag" style="background:#dbeafe;color:#1e40af;font-weight:700;">${v(P)}</span>`:""}
              ${e.filterSummary?`<span class="filter-tag">${v(e.filterSummary)}</span>`:""}
            </div>
          </div>
          <div style="text-align:right" class="no-print">
            <button onclick="window.print()" style="padding:8px 16px;background:#0070F3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:13px;box-shadow:0 2px 4px rgba(0,112,243,0.3);">🖨️ Print / Save as PDF</button>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi">
            <div class="kpi-label">Total Tasks</div>
            <div class="kpi-num">${q}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completed</div>
            <div class="kpi-num" style="color:#10b981">${I}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">In Progress</div>
            <div class="kpi-num" style="color:#f59e0b">${z}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Completion Rate</div>
            <div class="kpi-num" style="color:#0070F3">${M}%</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width:11%">Date</th>
              <th style="width:13%">Client Name</th>
              <th style="width:15%">Job Owner / Assignee</th>
              <th style="width:18%">Task Title</th>
              <th style="width:23%">Description / Deliverables</th>
              <th style="width:8%">Priority</th>
              <th style="width:12%">Status</th>
            </tr>
          </thead>
          <tbody>
            ${L.length===0?`
              <tr><td colspan="7" style="text-align:center;padding:30px;color:#94a3b8;font-weight:600">No scheduled tasks match the selected criteria.</td></tr>
            `:L.map(E=>{const d=E.completionDateStr||E.dateStr||(E.dueDate?new Date(E.dueDate).toISOString().slice(0,10):"—"),o=E.assignedDateStr||(E.assignedDate?new Date(E.assignedDate).toISOString().slice(0,10):""),a=E.status==="In Progress"&&o&&d&&o!==d?`${ze(o)} ➔ ${ze(d)}`:ze(d),h=E.jobId?.preferredPersonName||E.jobId?.assignments&&E.jobId.assignments[0]?.personId?.name||E.personnelId?.name||E.userId?.name||E.createdByName||"—",T=E.clientId?.name||E.jobId?.clientId?.name||E.clientId?.company||""||"—",j=E.description?v(E.description):'<span style="color:#cbd5e1">—</span>',C=Array.isArray(E.coOwners)&&E.coOwners.length>0?E.coOwners.map(A=>A.name).filter(Boolean).join(", "):"",Y=(E.priority||"medium").toLowerCase(),Z=Y==="urgent"?"badge-urgent":Y==="high"?"badge-high":Y==="low"?"badge-low":"badge-med",S=(E.status||"pending").toLowerCase().replace(/\s+/g,"-");return`
                <tr>
                  <td><strong>${a}</strong></td>
                  <td><span class="client-tag">${v(T)}</span></td>
                  <td>
                    <span class="owner-tag">${v(h)}</span>
                    ${C?`<span class="co-owner-sub">👥 Co: ${v(C)}</span>`:""}
                  </td>
                  <td><strong>${v(E.title)}</strong></td>
                  <td><div class="desc-text">${j}</div></td>
                  <td><span class="badge ${Z}">${v(E.priority||"Medium")}</span></td>
                  <td><span class="status-tag status-${S}">${v(E.status||"Pending")}</span></td>
                </tr>
              `}).join("")}
          </tbody>
        </table>

        <div class="footer">
          <span>Generated automatically by CI360 Daily Planner & Task Manager</span>
          <span>Printed on: ${new Date().toLocaleString()}</span>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        <\/script>
      </body>
      </html>
    `;p.document.write(H),p.document.close(),$("Report generated for printing & PDF download! 📄")}function ke(){const e=Ge(),i=Bt(r.selectedDate,c.weekStartsOn),b=ze(i[0]),y=ze(i[6]),_=`
      <div class="ci360-planner-modal" style="max-width:540px;">
        <div class="ci360-modal-header">
          <h3>📊 Download Specific Admin Report</h3>
          <button type="button" class="ci360-modal-close" id="btnAdminRepClose">×</button>
        </div>

        <div class="ci360-modal-form">
          <p style="font-size:12.5px;color:var(--text-3);margin:0 0 16px;">
            Export a comprehensive administrative report containing full <strong>Task Descriptions</strong>, <strong>Client Names</strong>, <strong>Job Owners</strong>, and <strong>Co-Owners</strong>.
          </p>

          <!-- Report Scope -->
          <div class="form-group">
            <label for="admRepScope">Date Range / Scope</label>
            <select id="admRepScope" class="input">
              <option value="week" selected>Current Week (${b} – ${y})</option>
              <option value="today">Today Only (${ze(e)})</option>
              <option value="all">All Available Tasks</option>
            </select>
          </div>

          <!-- Employee Filter -->
          <div class="form-group">
            <label for="admRepPersonnel">Filter by Employee / Person</label>
            <select id="admRepPersonnel" class="input">
              <option value="all" ${!r.reportPersonnelId||r.reportPersonnelId==="all"?"selected":""}>👥 All Team Members</option>
              ${r.personnelList.map(f=>`
                <option value="${f._id}" ${String(f._id)===String(r.reportPersonnelId)?"selected":""}>👤 ${v(f.name)} (${v(f.department||f.role||"Member")})</option>
              `).join("")}
            </select>
          </div>

          <!-- Status Filter -->
          <div class="form-group">
            <label for="admRepStatus">Filter by Status</label>
            <select id="admRepStatus" class="input">
              <option value="all" selected>All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <!-- Feature Highlights Checklist -->
          <div style="background:var(--bg-hover);border:1px solid var(--border-sm);border-radius:var(--r-md);padding:10px 14px;margin-bottom:18px;font-size:12px;color:var(--text-2);">
            <div style="font-weight:700;margin-bottom:4px;color:var(--text-1);">Included in this export:</div>
            <div>✓ <strong>Job Owner Name</strong> & Primary Assignee</div>
            <div>✓ <strong>Client Name</strong> & Account association</div>
            <div>✓ Full <strong>Task Description / Notes</strong></div>
            <div>✓ Multiple <strong>Co-Owners & Collaborators</strong></div>
            <div>✓ Priority, Category, and Real-time Status</div>
          </div>

          <div class="ci360-modal-footer" style="display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="ci360-btn-secondary" id="btnAdminRepCancel">Cancel</button>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn small" id="btnAdminRepCsv" style="background:#059669;color:#fff;font-weight:700;border:none;border-radius:var(--r-sm);padding:8px 14px;cursor:pointer;">
                📊 Export CSV / Excel
              </button>
              <button type="button" class="ci360-btn-primary" id="btnAdminRepPdf" style="font-weight:700;padding:8px 16px;">
                📄 Download Admin PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `,L=Lt(_),q=L.querySelector("#btnAdminRepClose"),I=L.querySelector("#btnAdminRepCancel"),z=L.querySelector("#btnAdminRepPdf"),M=L.querySelector("#btnAdminRepCsv"),p=()=>L.remove();q&&(q.onclick=p),I&&(I.onclick=p);const B=()=>{const f=L.querySelector("#admRepScope")?.value||"week",P=L.querySelector("#admRepPersonnel")?.value||"all",H=L.querySelector("#admRepStatus")?.value||"all";let E="";if(P!=="all"){const d=r.personnelList.find(o=>String(o._id)===String(P));d&&(E+=`Person: ${d.name} · `)}return H!=="all"&&(E+=`Status: ${H}`),{scope:f,personnelId:P,status:H,filterSummary:E.replace(/\s*·\s*$/,"")}};z&&(z.onclick=()=>{const f=B();p(),st({...f,isAdminReport:!0,title:"CI360 Admin Detailed Executive Task Report"})}),M&&(M.onclick=()=>{const f=B();p(),mt(f)})}function mt(e={}){const i=Bt(r.selectedDate,c.weekStartsOn),b=Ge();let y=r.tasks.filter(p=>{if(p.isDeleted===!0)return!1;const B=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):""),f=p.assignedDateStr||(p.assignedDate?new Date(p.assignedDate).toISOString().slice(0,10):"")||B;return e.scope==="today"?B===b||f===b:e.scope==="all"?!0:p.status==="In Progress"&&f&&B?i.some(P=>P>=f&&P<=B):i.includes(B)||i.includes(f)});e.personnelId&&e.personnelId!=="all"&&(y=y.filter(p=>{const B=String(p.personnelId?._id||p.personnelId||""),f=Array.isArray(p.coOwners)&&p.coOwners.some(P=>String(P.personnelId?._id||P.personnelId||"")===String(e.personnelId));return B===String(e.personnelId)||f})),e.status&&e.status!=="all"&&(y=y.filter(p=>p.status===e.status));const _=["Date","Client Name","Job Owner","Primary Assignee","Co-Owners","Task Title","Description","Priority","Category","Status","Created By"],L=y.map(p=>{const B=p.completionDateStr||p.dateStr||(p.dueDate?new Date(p.dueDate).toISOString().slice(0,10):""),f=p.jobId?.preferredPersonName||p.jobId?.assignments&&p.jobId.assignments[0]?.personId?.name||p.personnelId?.name||p.userId?.name||p.createdByName||"",P=p.clientId?.name||p.jobId?.clientId?.name||p.clientId?.company||"",H=p.personnelId?.name||p.userId?.name||"",E=Array.isArray(p.coOwners)?p.coOwners.map(Y=>Y.name).filter(Boolean).join("; "):"",d=p.title||"",o=p.description||"",a=p.priority||"Medium",h=p.category||"General",T=p.status||"Pending",j=p.createdByName||p.createdBy?.name||"",C=Y=>`"${String(Y||"").replace(/"/g,'""').replace(/\r?\n/g," ")}"`;return[C(B),C(P),C(f),C(H),C(E),C(d),C(o),C(a),C(h),C(T),C(j)].join(",")}),q="\uFEFF"+[_.join(","),...L].join(`\r
`),I=new Blob([q],{type:"text/csv;charset=utf-8;"}),z=URL.createObjectURL(I),M=document.createElement("a");M.href=z,M.download=`ci360-admin-report-${b}.csv`,document.body.appendChild(M),M.click(),document.body.removeChild(M),URL.revokeObjectURL(z),$("Admin CSV report downloaded! 📊")}function ct(){const i=Lt(`
      <div class="ci360-planner-modal" style="max-width:560px">
        <div class="ci360-modal-header">
          <h3>Backup & Restore Planner</h3>
          <button type="button" class="ci360-modal-close" id="btnBackupClose">×</button>
        </div>

        <div class="ci360-modal-form">
          
          <!-- Export Section -->
          <div class="card" style="padding:16px;margin-bottom:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>💾</span> Export Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Download all your planner tasks, timestamps, priorities, and descriptions as a standardized JSON backup file.
            </p>
            <button type="button" class="ci360-btn-primary" id="btnDownloadBackupJson">
              Download JSON Backup
            </button>
          </div>

          <!-- Restore Section -->
          <div class="card" style="padding:16px;border:1px solid var(--border-sm)">
            <h4 style="margin:0 0 6px;font-size:14px;display:flex;align-items:center;gap:6px">
              <span>🔄</span> Restore Planner Backup
            </h4>
            <p style="font-size:12px;color:var(--text-3);margin:0 0 12px">
              Upload a previously exported JSON backup file. Existing records will be preserved safely.
            </p>

            <input type="file" id="restoreFileInput" accept=".json,application/json" style="margin-bottom:12px">
            
            <div id="restorePreviewArea" style="display:none;background:var(--bg-elevated);padding:12px;border-radius:8px;margin-bottom:12px;font-size:12px">
              <strong id="restoreCountText">0 tasks detected in file</strong>
              <div style="margin-top:8px">
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
                  <input type="radio" name="restoreMode" value="merge" checked> Merge (skip duplicates)
                </label>
                <label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px">
                  <input type="radio" name="restoreMode" value="overwrite"> Overwrite matching tasks
                </label>
              </div>
            </div>

            <button type="button" class="ci360-btn-secondary" id="btnExecuteRestore" disabled>
              Restore Tasks
            </button>
          </div>

        </div>
      </div>
    `),b=()=>i.remove();i.querySelector("#btnBackupClose").onclick=b;const y=i.querySelector("#btnDownloadBackupJson");y.onclick=async()=>{y.disabled=!0,y.textContent="Generating backup...";try{const M=await Me("/tasks/backup"),p=new Blob([JSON.stringify(M,null,2)],{type:"application/json"}),B=URL.createObjectURL(p),f=document.createElement("a");f.href=B,f.download=`ci360-planner-backup-${Ge()}.json`,document.body.appendChild(f),f.click(),f.remove(),$("Planner backup downloaded successfully! 💾")}catch(M){$("Backup export failed: "+M.message,!0)}finally{y.disabled=!1,y.textContent="Download JSON Backup"}};const _=i.querySelector("#restoreFileInput"),L=i.querySelector("#restorePreviewArea"),q=i.querySelector("#restoreCountText"),I=i.querySelector("#btnExecuteRestore");let z=null;_.onchange=M=>{const p=M.target.files[0];if(!p)return;const B=new FileReader;B.onload=f=>{try{const P=JSON.parse(f.target.result),H=Array.isArray(P.tasks)?P.tasks:Array.isArray(P)?P:null;if(!H||H.length===0){$("Invalid backup file: No tasks found",!0);return}z=H,L.style.display="block",q.textContent=`Valid backup: ${H.length} tasks ready to restore.`,I.disabled=!1}catch(P){$("Error parsing JSON backup file: "+P.message,!0),L.style.display="none",I.disabled=!0}},B.readAsText(p)},I.onclick=async()=>{if(!z||z.length===0)return;I.disabled=!0,I.textContent="Restoring...";const M=i.querySelector('input[name="restoreMode"]:checked')?.value||"merge";try{const p=await ye("/tasks/restore",{tasks:z,mode:M});$(`Restored ${p.restoredCount} tasks! (${p.skippedCount} skipped) ✨`),b(),await O()}catch(p){$("Restore failed: "+p.message,!0),I.disabled=!1,I.textContent="Retry Restore"}}}function ft(){const e=`
      <div class="ci360-planner-modal" style="max-width:520px">
        <div class="ci360-modal-header">
          <h3>Planner Preferences</h3>
          <button type="button" class="ci360-modal-close" id="btnSettingsClose">×</button>
        </div>

        <form id="settingsForm" class="ci360-modal-form">
          <div class="form-group">
            <label for="setDisplayName">Planner Display Title</label>
            <input type="text" id="setDisplayName" class="input" value="${v(c.displayName||"Daily Planner")}">
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setWeekStart">Week Starts On</label>
              <select id="setWeekStart" class="input">
                <option value="1" ${c.weekStartsOn===1?"selected":""}>Monday</option>
                <option value="0" ${c.weekStartsOn===0?"selected":""}>Sunday</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setTimezone">Timezone</label>
              <input type="text" id="setTimezone" class="input" value="${v(c.timezone||"Asia/Kolkata")}" readonly>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="setDefaultPriority">Default Task Priority</label>
              <select id="setDefaultPriority" class="input">
                <option value="Low" ${c.defaultPriority==="Low"?"selected":""}>Low</option>
                <option value="Medium" ${c.defaultPriority==="Medium"?"selected":""}>Medium</option>
                <option value="High" ${c.defaultPriority==="High"?"selected":""}>High</option>
                <option value="Urgent" ${c.defaultPriority==="Urgent"?"selected":""}>Urgent</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="setDensity">Card Density</label>
              <select id="setDensity" class="input">
                <option value="comfortable" ${c.density==="comfortable"?"selected":""}>Comfortable</option>
                <option value="compact" ${c.density==="compact"?"selected":""}>Compact</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top:8px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setSound" ${c.soundEnabled?"checked":""}>
              <span>Play subtle audio chime when completing a task</span>
            </label>
          </div>

          <!-- Desktop & Laptop Notifications -->
          <div class="form-group" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
            <div style="font-weight:600;font-size:13px;margin-bottom:4px;color:var(--text-1);">🔔 Desktop & Laptop Notifications (Brave & All Browsers)</div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:8px;">Receive real-time popups on your laptop and browser when tasks are assigned, dates change, and due alerts arrive.</div>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="checkbox" id="setNotifEnabled" ${typeof window<"u"&&localStorage.getItem("ci360_notif_enabled")!=="false"&&typeof Notification<"u"&&Notification.permission==="granted"?"checked":""}>
              <span>Enable Browser & Laptop Notifications</span>
            </label>
            <div style="margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn ghost small" id="btnPlannerTestNotif" style="padding:4px 10px;font-size:11.5px;">🔔 Send Test Notification</button>
              <span style="font-size:11px;color:var(--text-3);" id="plannerNotifStatusLabel">${typeof Notification<"u"&&Notification.permission==="granted"?"🟢 Active on this laptop":typeof Notification<"u"&&Notification.permission==="denied"?"🔴 Blocked in browser":"⚪ Ready to enable"}</span>
            </div>
            <div style="margin-top:6px;font-size:11px;color:var(--text-3);">
              💡 <strong>Brave, Chrome & Edge Tip:</strong> Notifications show in Windows Action Center. In Brave, ensure notifications are allowed under the site shield/lock icon in the URL bar.
            </div>
          </div>

          <div class="ci360-modal-footer">
            <button type="button" class="ci360-btn-secondary" id="btnCancelSettings">Cancel</button>
            <button type="submit" class="ci360-btn-primary">Save Preferences</button>
          </div>
        </form>
      </div>
    `,i=Lt(e),b=()=>i.remove();i.querySelector("#btnSettingsClose").onclick=b,i.querySelector("#btnCancelSettings").onclick=b;const y=i.querySelector("#btnPlannerTestNotif");y&&(y.onclick=async()=>{if("Notification"in window&&Notification.permission!=="granted"&&!await requestNotificationPermission()){Notification.permission==="denied"?alert(`Notifications are blocked by your browser.

In Brave or Chrome, click the lock or shield icon on the left of the address bar, set Notifications to "Allow", and reload.`):$("Please grant notification permission in your browser.",!0);return}localStorage.setItem("ci360_notif_enabled","true");const _=i.querySelector("#setNotifEnabled");_&&(_.checked=!0);const L=i.querySelector("#plannerNotifStatusLabel");L&&(L.textContent="🟢 Active on this laptop"),await triggerSystemNotification({title:"CI360 Planner Alert 🔔",message:"Laptop & browser notifications are active and ready!",id:"ci360-planner-test-"+Date.now()}),$("Test notification sent to your laptop/browser! 🔔")}),i.querySelector("#settingsForm").onsubmit=_=>{_.preventDefault(),c.displayName=i.querySelector("#setDisplayName").value.trim()||"Daily Planner",c.weekStartsOn=Number(i.querySelector("#setWeekStart").value),c.defaultPriority=i.querySelector("#setDefaultPriority").value,c.density=i.querySelector("#setDensity").value,c.soundEnabled=i.querySelector("#setSound").checked;const L=i.querySelector("#setNotifEnabled")?.checked;localStorage.setItem("ci360_notif_enabled",L?"true":"false"),L&&"Notification"in window&&Notification.permission==="default"&&requestNotificationPermission(),qa(c),$("Planner preferences saved! ⚙️"),b(),W()}}}function Ra(){if(document.getElementById("ci360-planner-styles"))return;const s=document.createElement("style");s.id="ci360-planner-styles",s.textContent=`
    /* CI360 Dayfolio Planner Module Styles */
    .ci360-planner-wrap,
    .ci360-planner-wrap * {
      box-sizing: border-box !important;
    }

    .ci360-planner-wrap {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 0 60px !important;
      box-sizing: border-box !important;
      font-family: var(--font-sans);
      color: var(--text-1);
    }

    .ci360-planner-content,
    .ci360-today-focus-section,
    .ci360-tasks-container,
    .ci360-task-list,
    .ci360-quick-add-bar,
    .ci360-progress-summary-card,
    .ci360-planner-nav-strip,
    .ci360-planner-header {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }

    /* Header (Hero Card) */
    .ci360-planner-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      padding: 18px 24px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.88) 45%, rgba(255, 255, 255, 0.95) 100%);
      border: 1px solid rgba(186, 230, 253, 0.7);
      box-shadow: 0 4px 20px rgba(186, 230, 253, 0.28);
      flex-wrap: wrap;
    }
    [data-theme="dark"] .ci360-planner-header {
      background: linear-gradient(135deg, rgba(6, 24, 60, 0.85) 0%, rgba(5, 15, 38, 0.95) 100%);
      border: 1px solid rgba(56, 189, 248, 0.25);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(125, 211, 252, 0.18);
    }
    .ci360-planner-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .ci360-planner-hero-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 112, 243, 0.12);
      border: 1px solid rgba(0, 112, 243, 0.2);
      color: #0070F3;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.15);
    }
    [data-theme="dark"] .ci360-planner-hero-icon {
      background: rgba(0, 112, 243, 0.2);
      border-color: rgba(56, 189, 248, 0.35);
      color: #38BDF8;
      box-shadow: 0 0 18px rgba(0, 112, 243, 0.35);
    }
    .ci360-planner-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-planner-heading {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-1);
      margin: 0;
      font-family: var(--font-heading);
    }
    .ci360-planner-subheading {
      font-size: 13.5px;
      color: var(--text-3);
      margin: 0;
    }

    /* Header Actions */
    .ci360-planner-header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ci360-view-switcher {
      display: flex;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 3px;
      gap: 2px;
      box-shadow: var(--shadow-xs);
    }
    .ci360-switch-btn {
      background: transparent;
      border: none;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-switch-btn:hover {
      color: var(--text-1);
      background: var(--bg-hover);
    }
    .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
    }
    [data-theme="dark"] .ci360-switch-btn.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }

    .ci360-btn-primary {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35);
      transition: all var(--t-fast);
    }
    .ci360-btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.45);
    }
    [data-theme="dark"] .ci360-btn-primary {
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45);
    }
    .ci360-btn-secondary {
      background: var(--bg-card);
      color: var(--text-2);
      border: 1px solid var(--border-sm);
      padding: 8px 14px;
      border-radius: var(--r-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all var(--t-fast);
    }
    .ci360-btn-secondary:hover {
      background: var(--bg-hover);
      color: var(--text-1);
      border-color: var(--border-md);
    }

    /* Dropdown */
    .ci360-dropdown-wrap {
      position: relative;
    }
    .ci360-dropdown-menu {
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow-lg);
      min-width: 260px;
      z-index: 100;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .ci360-dropdown-menu.hidden {
      display: none !important;
    }
    .ci360-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: var(--r-sm);
      text-align: left;
      cursor: pointer;
      color: var(--text-1);
      transition: background var(--t-fast);
      width: 100%;
    }
    .ci360-menu-item:hover {
      background: var(--bg-hover);
    }
    .ci360-menu-item .icon {
      font-size: 16px;
      width: 24px;
      text-align: center;
    }
    .ci360-menu-item .meta strong {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
    }
    .ci360-menu-item .meta small {
      display: block;
      font-size: 11px;
      color: var(--text-3);
    }
    .ci360-dropdown-divider {
      height: 1px;
      background: var(--border-xs);
      margin: 4px 0;
    }

    /* Date Nav Strip */
    .ci360-planner-nav-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 8px 16px;
      flex-wrap: wrap;
      box-shadow: var(--shadow-xs);
    }
    .ci360-date-nav-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-nav-arrow {
      background: transparent;
      border: 1px solid var(--border-sm);
      width: 32px;
      height: 32px;
      border-radius: var(--r-md);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-2);
      transition: all var(--t-fast);
    }
    .ci360-nav-arrow:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-date-picker-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: var(--r-md);
      background: var(--bg-hover);
      border: 1px solid var(--border-sm);
      cursor: pointer;
      position: relative;
      user-select: none;
    }
    .ci360-date-picker-badge:hover {
      border-color: var(--accent);
    }
    .ci360-date-picker-badge .date-text {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .ci360-hidden-date-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      width: 1px;
      height: 1px;
    }
    .ci360-today-btn {
      background: transparent;
      border: 1px solid var(--border-sm);
      padding: 5px 14px;
      border-radius: var(--r-full);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
    }
    .ci360-today-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="dark"] .ci360-today-btn.is-current {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-team-filter-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-label-inline {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
    }
    .ci360-select-inline {
      padding: 6px 12px;
      font-size: 12.5px;
      border-radius: var(--r-md);
      border: 1px solid var(--border-sm);
      background: var(--bg-app);
      color: var(--text-1);
      cursor: pointer;
    }

    /* Progress Summary Card */
    .ci360-progress-summary-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-xl);
      padding: 16px 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    [data-theme="dark"] .ci360-progress-summary-card {
      background: rgba(8, 18, 38, 0.7);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }
    .ci360-summary-main {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .ci360-ring-stat {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 14px;
      background: var(--bg-app);
      border: 1px solid var(--border-xs);
      border-radius: var(--r-lg);
    }
    [data-theme="dark"] .ci360-ring-stat {
      background: rgba(10, 22, 48, 0.6);
      border-color: rgba(56, 189, 248, 0.14);
    }
    .ci360-circular-progress {
      position: relative;
      width: 64px;
      height: 64px;
    }
    .ci360-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .ci360-circular-svg .circle-bg {
      fill: none;
      stroke: var(--border-sm);
      stroke-width: 3.5;
    }
    .ci360-circular-svg .circle-fill {
      fill: none;
      stroke: #0070F3;
      stroke-width: 3.5;
      stroke-linecap: round;
      transition: stroke-dasharray 0.4s ease;
    }
    [data-theme="dark"] .ci360-circular-svg .circle-fill {
      stroke: #38BDF8;
    }
    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .ring-num {
      font-size: 14px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1;
    }
    .ring-label {
      font-size: 9.5px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-3);
      margin-top: 2px;
    }

    .ci360-summary-kpis {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      flex-wrap: wrap;
    }
    .kpi-box {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #FFFFFF;
      padding: 12px 18px;
      border-radius: var(--r-lg);
      flex: 1;
      min-width: 140px;
      border: 1px solid var(--border-sm);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .kpi-box {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .kpi-box:hover {
      transform: translateY(-1px);
    }
    .kpi-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-icon-wrap.total {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    .kpi-icon-wrap.completed {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
    }
    .kpi-icon-wrap.in-prog {
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
    }
    .kpi-icon-wrap.pending {
      background: rgba(139, 92, 246, 0.1);
      color: #8B5CF6;
    }
    .kpi-icon-wrap.overdue {
      background: rgba(239, 68, 68, 0.1);
      color: #EF4444;
    }
    .kpi-text-wrap {
      display: flex;
      flex-direction: column;
    }
    .kpi-box .kpi-num {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-1);
      line-height: 1.1;
    }
    .kpi-box .kpi-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-3);
      margin-top: 1px;
    }
    .kpi-box.completed .kpi-num { color: var(--green-500); }
    .kpi-box.in-progress .kpi-num { color: var(--amber-500); }
    .kpi-box.overdue {
      background: rgba(239, 68, 68, 0.08);
      border-color: rgba(239, 68, 68, 0.2);
    }
    .kpi-box.overdue .kpi-num { color: var(--red-500); }

    .ci360-linear-progress-wrap {
      width: 100%;
      height: 4px;
      background: var(--border-xs);
      border-radius: var(--r-full);
      overflow: hidden;
      margin-top: 10px;
    }
    .ci360-linear-bar {
      height: 100%;
      background: linear-gradient(90deg, #0070F3, #10B981);
      border-radius: var(--r-full);
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Today Focus Section */
    .ci360-today-focus-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-focus-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-focus-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ci360-focus-title {
      font-size: 19px;
      font-weight: 800;
      color: var(--text-1);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-focus-title::before {
      content: '';
      width: 3.5px;
      height: 18px;
      border-radius: 2px;
      background: #0070F3;
      display: inline-block;
    }
    .ci360-task-count-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--r-full);
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
    }
    [data-theme="dark"] .ci360-task-count-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
    }

    .ci360-focus-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ci360-filter-pills {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
    .filter-pill {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 6px 14px !important;
      border-radius: 999px !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      color: var(--text-3, #64748B) !important;
      cursor: pointer !important;
      transition: all var(--t-fast) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1.2 !important;
    }
    [data-theme="dark"] .filter-pill {
      background: transparent !important;
      border: none !important;
      color: #8EA4C8 !important;
    }
    .filter-pill:hover {
      color: var(--text-1, #0F172A) !important;
      background: rgba(0, 0, 0, 0.04) !important;
    }
    [data-theme="dark"] .filter-pill:hover {
      color: #F8FAFC !important;
      background: rgba(255, 255, 255, 0.06) !important;
    }
    .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      font-weight: 700 !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35) !important;
    }
    [data-theme="dark"] .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(0, 112, 243, 0.45) !important;
    }
    .filter-pill.overdue.active {
      background: rgba(239, 68, 68, 0.15) !important;
      color: #EF4444 !important;
    }

    .ci360-search-box {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      padding: 6px 12px;
      min-width: 180px;
      position: relative;
    }
    .ci360-search-box input {
      border: none;
      background: transparent;
      font-size: 12.5px;
      color: var(--text-1);
      outline: none;
      width: 100%;
    }
    .clear-search-btn {
      background: transparent;
      border: none;
      font-size: 14px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
    }

    /* Quick-Add Bar */
    .ci360-quick-add-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      padding: 10px 16px;
      box-shadow: var(--shadow-xs);
      flex-wrap: wrap;
      transition: border-color var(--t-fast);
    }
    .ci360-quick-add-bar:focus-within {
      border-color: var(--accent);
      border-style: solid;
    }
    .ci360-quick-add-input-wrap {
      flex: 1;
      min-width: 240px;
    }
    .ci360-quick-input {
      width: 100%;
      border: none;
      background: transparent;
      font-size: 14px;
      color: var(--text-1);
      outline: none;
      font-family: inherit;
    }
    .ci360-quick-input::placeholder {
      color: var(--text-4);
    }
    .ci360-quick-add-meta {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ci360-quick-select {
      background: var(--bg-app);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-2);
      outline: none;
      cursor: pointer;
    }
    .ci360-quick-add-btn {
      background: #0070F3;
      color: #FFFFFF;
      border: none;
      border-radius: var(--r-md);
      padding: 7px 16px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: all var(--t-fast);
      box-shadow: 0 2px 6px rgba(0, 112, 243, 0.3);
    }
    .ci360-quick-add-btn:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    /* Task List & Cards */
    .ci360-task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ci360-task-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-left: 3.5px solid #0070F3;
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    [data-theme="dark"] .ci360-task-card {
      background: rgba(8, 18, 38, 0.85);
      border-color: rgba(56, 189, 248, 0.16);
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }
    .ci360-task-card:hover {
      box-shadow: var(--shadow-sm);
      border-color: var(--border-md);
      transform: translateY(-1px);
    }
    .ci360-task-card.is-completed {
      background: var(--bg-elevated);
      opacity: 0.75;
      border-left-color: var(--green-500);
    }
    .ci360-task-card.is-overdue {
      border-left: 3.5px solid var(--red-500) !important;
    }

    /* Checkbox */
    .ci360-task-check {
      background: transparent;
      border: 2px solid var(--border-md);
      width: 22px;
      height: 22px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: transparent;
      transition: all var(--t-fast);
      margin-top: 2px;
      flex-shrink: 0;
    }
    .ci360-task-check:hover {
      border-color: var(--accent);
    }
    .ci360-task-check.checked {
      background: var(--green-500);
      border-color: var(--green-500);
      color: #FFFFFF;
      transform: scale(1.05);
    }
    .ci360-task-check .check-svg {
      stroke: currentColor;
    }

    /* Task Body */
    .ci360-task-body {
      flex: 1;
      min-width: 0;
    }
    .ci360-task-title-row {
      margin-bottom: 4px;
    }
    .ci360-task-title {
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.35;
      word-break: break-word;
    }
    .ci360-task-card.is-completed .ci360-task-title {
      text-decoration: line-through;
      color: var(--text-4);
    }
    .ci360-task-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
      margin-bottom: 8px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ci360-task-badges {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    /* Badges */
    .ci360-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      line-height: 1.4;
    }
    .ci360-badge .badge-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
    }
    /* Priority Badges */
    .ci360-badge.pri-urgent { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.pri-high { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.pri-medium { background: rgba(59, 130, 246, 0.12); color: var(--blue-600); }
    .ci360-badge.pri-low { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }

    /* Status Badges */
    .ci360-badge.status-completed { background: rgba(16, 185, 129, 0.12); color: var(--green-600); }
    .ci360-badge.status-in-progress { background: rgba(245, 158, 11, 0.14); color: var(--amber-600); }
    .ci360-badge.status-pending { background: var(--bg-hover); color: var(--text-3); }

    .ci360-badge.category-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.time-badge { background: var(--bg-hover); color: var(--text-2); font-weight: 500; }
    .ci360-badge.completion-badge {
      background: rgba(37, 99, 235, 0.12);
      color: #2563EB;
      font-weight: 700;
      border: 1px solid rgba(37, 99, 235, 0.25);
    }
    [data-theme="dark"] .ci360-badge.completion-badge {
      background: rgba(59, 130, 246, 0.2);
      color: #93C5FD;
      border-color: rgba(59, 130, 246, 0.35);
    }
    .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.1);
      color: #0070F3;
      font-weight: 600;
      border: 1px solid rgba(0, 112, 243, 0.2);
    }
    [data-theme="dark"] .ci360-badge.creator-badge {
      background: rgba(0, 112, 243, 0.2);
      color: #38BDF8;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .ci360-badge.overdue-badge { background: rgba(239, 68, 68, 0.12); color: var(--red-600); }
    .ci360-badge.personnel-badge { background: #E0F2FE; color: #0070F3; }
    [data-theme="dark"] .ci360-badge.personnel-badge { background: rgba(0, 112, 243, 0.2); color: #38BDF8; }

    .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.14);
      color: #D97706;
      font-weight: 700;
      border: 1px solid rgba(245, 158, 11, 0.35);
    }
    [data-theme="dark"] .ci360-badge.date-changed-badge {
      background: rgba(245, 158, 11, 0.22);
      color: #FBBF24;
      border-color: rgba(245, 158, 11, 0.45);
    }

    /* Task Actions */
    .ci360-task-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      opacity: 0.6;
      transition: opacity var(--t-fast);
    }
    .ci360-task-card:hover .ci360-task-actions {
      opacity: 1;
    }
    .task-action-btn {
      background: transparent;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: var(--r-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-3);
      transition: all var(--t-fast);
    }
    .task-action-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .task-action-btn.delete:hover {
      color: var(--red-500);
      background: rgba(239, 68, 68, 0.1);
    }

    /* Empty State */
    .ci360-empty-focus-state {
      text-align: center;
      padding: 48px 24px;
      background: var(--bg-card);
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-xl);
    }
    .ci360-empty-focus-state .empty-icon-wrap {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .ci360-empty-focus-state h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 6px;
    }
    .ci360-empty-focus-state p {
      font-size: 13px;
      color: var(--text-3);
      max-width: 420px;
      margin: 0 auto;
    }

    /* Weekly Grid Layout */
    .ci360-weekly-planner-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ci360-week-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .ci360-week-banner .week-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0 0 2px;
    }
    .ci360-week-banner .week-range-text {
      font-size: 13px;
      color: var(--text-3);
    }
    .ci360-week-banner .week-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ci360-week-grid.modern-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 16px !important;
      align-items: stretch !important;
    }
    @media (max-width: 1200px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 640px) {
      .ci360-week-grid.modern-grid {
        grid-template-columns: 1fr !important;
      }
    }

    .ci360-weekly-day-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 270px;
      transition: all 0.2s ease;
    }
    [data-theme="dark"] .ci360-weekly-day-card {
      background: #111827;
      border-color: #1f2937;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    .ci360-weekly-day-card:hover {
      box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
      border-color: var(--border-md, #cbd5e1);
    }

    /* Header */
    .weekly-day-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      background: transparent;
    }
    [data-theme="dark"] .weekly-day-header {
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    .weekly-day-header.today-banner {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%) !important;
      color: #ffffff !important;
      border-bottom: none !important;
    }

    /* Date Badge Box */
    .day-badge-box {
      width: 44px;
      height: 48px;
      border-radius: 12px;
      background: #eff2fe;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    [data-theme="dark"] .day-badge-box {
      background: #1e293b;
    }
    .weekly-day-header.today-banner .day-badge-box {
      background: rgba(0, 0, 0, 0.28) !important;
    }
    .day-badge-name {
      font-size: 11px;
      font-weight: 700;
      color: #4f46e5;
      line-height: 1;
      margin-bottom: 2px;
    }
    .weekly-day-header.today-banner .day-badge-name {
      color: rgba(255, 255, 255, 0.9) !important;
    }
    .day-badge-num {
      font-size: 17px;
      font-weight: 800;
      color: #1e293b;
      line-height: 1;
    }
    [data-theme="dark"] .day-badge-num {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-badge-num {
      color: #ffffff !important;
    }

    /* Day Title & Progress Row */
    .day-header-meta {
      flex: 1;
      min-width: 0;
    }
    .day-full-name {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    [data-theme="dark"] .day-full-name {
      color: #f8fafc;
    }
    .weekly-day-header.today-banner .day-full-name {
      color: #ffffff !important;
    }
    .day-header-stats-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .day-done-label {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .weekly-day-header.today-banner .day-done-label {
      color: rgba(255, 255, 255, 0.85) !important;
    }
    .day-progress-track {
      height: 4px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
      width: 90px;
      max-width: 100%;
    }
    [data-theme="dark"] .day-progress-track {
      background: #334155;
    }
    .weekly-day-header.today-banner .day-progress-track {
      background: rgba(255, 255, 255, 0.3) !important;
    }
    .day-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .weekly-day-header.today-banner .day-progress-bar {
      background: #ffffff !important;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    /* Action Clipboard Button */
    .day-action-clipboard-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      color: #4f46e5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .day-action-clipboard-btn {
      background: #1e293b;
      border-color: #334155;
      color: #818cf8;
    }
    .day-action-clipboard-btn:hover {
      background: #eff2fe;
      border-color: #c7d2fe;
      transform: scale(1.05);
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: #ffffff !important;
    }
    .weekly-day-header.today-banner .day-action-clipboard-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }

    /* Day Tasks List */
    .weekly-day-tasks {
      padding: 12px 14px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      overflow-y: auto;
      max-height: 360px;
    }
    .weekly-empty-state {
      padding: 24px 0;
      text-align: center;
      font-size: 12px;
      color: var(--text-4, #94a3b8);
    }
    .weekly-task-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
      font-size: 13px;
    }
    .weekly-check-btn {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      padding: 0;
      transition: all 0.15s ease;
    }
    [data-theme="dark"] .weekly-check-btn {
      border-color: #475569;
    }
    .weekly-check-btn.checked {
      background: #22c55e !important;
      border-color: #22c55e !important;
      color: #ffffff !important;
    }
    .weekly-check-btn:hover:not(.checked) {
      border-color: #4f46e5;
    }
    .weekly-task-title {
      flex: 1;
      min-width: 0;
      font-weight: 500;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    [data-theme="dark"] .weekly-task-title {
      color: #e2e8f0;
    }
    .weekly-task-title.strike {
      text-decoration: line-through;
      color: var(--text-4, #94a3b8);
      opacity: 0.65;
    }
    .weekly-pri-badge {
      font-size: 10.5px;
      font-weight: 700;
      border-radius: 5px;
      padding: 1.5px 7px;
      flex-shrink: 0;
    }
    .weekly-pri-badge.pri-medium {
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #dbeafe;
    }
    .weekly-pri-badge.pri-urgent,
    .weekly-pri-badge.pri-high {
      background: #fef2f2;
      color: #ef4444;
      border: 1px solid #fee2e2;
    }
    .weekly-pri-badge.pri-low {
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #dcfce7;
    }
    [data-theme="dark"] .weekly-pri-badge.pri-medium {
      background: rgba(37, 99, 235, 0.15);
      color: #60a5fa;
      border-color: rgba(37, 99, 235, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-urgent,
    [data-theme="dark"] .weekly-pri-badge.pri-high {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.3);
    }
    [data-theme="dark"] .weekly-pri-badge.pri-low {
      background: rgba(22, 163, 74, 0.15);
      color: #4ade80;
      border-color: rgba(22, 163, 74, 0.3);
    }

    /* 8th Card: Week at a Glance */
    .week-glance-card {
      background: linear-gradient(180deg, rgba(238, 242, 255, 0.6) 0%, rgba(255, 255, 255, 1) 40%) !important;
      padding: 18px 16px !important;
    }
    [data-theme="dark"] .week-glance-card {
      background: linear-gradient(180deg, rgba(30, 27, 75, 0.3) 0%, #111827 40%) !important;
    }
    .glance-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .glance-icon {
      font-size: 18px;
    }
    .glance-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0;
    }
    [data-theme="dark"] .glance-title {
      color: #f8fafc;
    }
    .glance-metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }
    .glance-metric-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    [data-theme="dark"] .glance-metric-item {
      background: #1e293b;
      border-color: #334155;
    }
    .glance-m-icon {
      font-size: 16px;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eff2fe;
      flex-shrink: 0;
    }
    .glance-m-data {
      display: flex;
      flex-direction: column;
    }
    .glance-m-val {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
      line-height: 1.1;
    }
    [data-theme="dark"] .glance-m-val {
      color: #f8fafc;
    }
    .glance-m-lbl {
      font-size: 11px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }
    .glance-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .glance-progress-track {
      height: 6px;
      background: #e2e8f0;
      border-radius: 999px;
      overflow: hidden;
    }
    [data-theme="dark"] .glance-progress-track {
      background: #334155;
    }
    .glance-progress-bar {
      height: 100%;
      background: #4f46e5;
      border-radius: 999px;
      transition: width 0.3s ease;
    }
    .glance-progress-caption {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      font-weight: 600;
      text-align: center;
    }
    .mini-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-1);
      line-height: 1.25;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mini-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 3px;
    }
    .mini-pri {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
    }
    .mini-pri.pri-urgent { background: rgba(239, 68, 68, 0.15); color: var(--red-600); }
    .mini-pri.pri-high { background: rgba(245, 158, 11, 0.18); color: var(--amber-600); }
    .mini-pri.pri-medium { background: rgba(59, 130, 246, 0.15); color: var(--blue-600); }
    .mini-pri.pri-low { background: rgba(16, 185, 129, 0.15); color: var(--green-600); }
    .mini-time {
      font-size: 9.5px;
      color: var(--text-3);
    }
    .day-col-add-btn {
      margin-top: 8px;
      background: transparent;
      border: 1px dashed var(--border-sm);
      border-radius: var(--r-sm);
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-3);
      cursor: pointer;
      transition: all var(--t-fast);
      width: 100%;
    }
    .day-col-add-btn:hover {
      background: var(--bg-hover);
      color: var(--accent);
      border-color: var(--accent);
    }

    /* Report Section */
    .ci360-report-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .ci360-report-kpis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
    }

    /* Modal Styling */
    .ci360-planner-modal {
      width: 100%;
      max-width: 580px;
      background: var(--bg-card);
      border-radius: var(--r-xl);
      padding: 24px;
      box-shadow: var(--shadow-xl);
      color: var(--text-1);
    }
    .ci360-modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .ci360-modal-header h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1);
      margin: 0;
    }
    .ci360-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      color: var(--text-4);
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
    }
    .ci360-modal-close:hover {
      color: var(--text-1);
    }
    .ci360-modal-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    @media (max-width: 600px) {
      .form-row { flex-direction: column; }
    }
    .flex-1 { flex: 1; }
    .form-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-2);
      margin-bottom: 4px;
    }
    .form-group label.required::after {
      content: ' *';
      color: var(--red-500);
    }
    .ci360-modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
      padding-top: 14px;
      border-top: 1px solid var(--border-xs);
    }

    /* Dropzone & Import Preview */
    .ci360-dropzone {
      border: 2px dashed var(--border-md);
      border-radius: var(--r-lg);
      padding: 24px;
      text-align: center;
      cursor: pointer;
      background: var(--bg-app);
      transition: all var(--t-fast);
    }
    .ci360-dropzone:hover, .ci360-dropzone.dragover {
      border-color: var(--accent);
      background: var(--brand-50);
    }
    [data-theme="dark"] .ci360-dropzone:hover, [data-theme="dark"] .ci360-dropzone.dragover {
      background: rgba(0, 112, 243, 0.15);
    }
    .ci360-dropzone .drop-icon {
      font-size: 28px;
      margin-bottom: 6px;
    }
    .ci360-dropzone .drop-text {
      font-size: 13px;
      color: var(--text-2);
    }
    .ci360-dropzone .drop-sub {
      font-size: 11px;
      color: var(--text-4);
      margin-top: 2px;
    }

    .ci360-import-preview-wrap {
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      background: var(--bg-app);
      overflow: hidden;
    }
    .ci360-import-preview-wrap .preview-header {
      padding: 8px 12px;
      background: var(--bg-hover);
      border-bottom: 1px solid var(--border-xs);
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ci360-import-preview-wrap .preview-list {
      max-height: 180px;
      overflow-y: auto;
      padding: 6px 12px;
    }
    .preview-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
      border-bottom: 1px solid var(--border-xs);
    }
    .preview-item.is-duplicate {
      opacity: 0.6;
    }
    .preview-index {
      color: var(--text-4);
      font-size: 11px;
      width: 20px;
    }
    .preview-title {
      flex: 1;
      color: var(--text-1);
    }

    /* Compact Density */
    .ci360-planner-wrap.is-compact .ci360-task-card {
      padding: 8px 12px;
      gap: 10px;
    }
    .ci360-planner-wrap.is-compact .ci360-task-title {
      font-size: 13.5px;
    }
    .ci360-planner-wrap.is-compact .ci360-progress-summary-card {
      padding: 12px 18px;
    }
    .ci360-planner-wrap.is-compact .kpi-box {
      padding: 6px 12px;
      min-width: 80px;
    }

    /* Past Date Banner */
    .ci360-past-date-banner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      border-radius: var(--r-lg);
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      margin-bottom: 8px;
    }
    .past-banner-icon {
      font-size: 22px;
      flex-shrink: 0;
    }
    .past-banner-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .past-banner-title {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-1);
    }
    .past-banner-desc {
      font-size: 12.5px;
      color: var(--text-3);
      line-height: 1.4;
    }
    .day-col-locked-note {
      text-align: center;
      padding: 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-4);
      background: var(--bg-hover);
      border-radius: var(--r-sm);
      margin-top: 8px;
    }
    .ci360-btn-primary.is-locked-past {
      opacity: 0.75;
      background: var(--text-4);
      cursor: not-allowed;
    }

    /* Admin Employee Grouping & Collapsible Cards */
    .ci360-emp-groups-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .ci360-emp-group-card {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-lg);
      overflow: hidden;
      box-shadow: var(--shadow-xs);
      transition: all var(--t-fast);
    }
    .ci360-emp-group-card:hover {
      border-color: var(--border-md);
    }
    .ci360-emp-group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 18px;
      background: var(--bg-elevated);
      cursor: pointer;
      user-select: none;
      transition: background var(--t-fast);
    }
    .ci360-emp-group-header:hover {
      background: var(--bg-hover);
    }
    .emp-group-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
    }
    .emp-collapse-icon {
      font-size: 11px;
      color: var(--text-3);
      width: 14px;
      text-align: center;
      transition: transform var(--t-fast);
    }
    .emp-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 112, 243, 0.15);
      color: #0070F3;
      font-weight: 800;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .emp-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .emp-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-1);
    }
    .emp-subtitle {
      font-size: 11.5px;
      color: var(--text-3);
    }
    .emp-group-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .emp-stat-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--r-full);
      background: var(--bg-card);
      border: 1px solid var(--border-xs);
      color: var(--text-2);
    }
    .emp-stat-pill.done {
      color: var(--green-600);
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .emp-stat-pill.in-prog {
      color: var(--amber-600);
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.2);
    }
    .emp-stat-pill.pending {
      color: var(--text-3);
      background: var(--bg-hover);
    }
    .emp-mini-bar-wrap {
      width: 50px;
      height: 6px;
      border-radius: var(--r-full);
      background: var(--border-xs);
      overflow: hidden;
    }
    .emp-mini-bar-fill {
      height: 100%;
      background: var(--green-500);
      border-radius: var(--r-full);
      transition: width 0.3s ease;
    }
    .ci360-emp-group-body {
      padding: 12px 16px;
      border-top: 1px solid var(--border-xs);
    }

    /* ── COMPREHENSIVE LIGHT THEME ENHANCEMENTS FOR DAILY PLANNER ── */
    [data-theme="light"] .ci360-planner-wrap,
    html:not([data-theme="dark"]) .ci360-planner-wrap {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-heading,
    html:not([data-theme="dark"]) .ci360-planner-heading {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-planner-subheading,
    html:not([data-theme="dark"]) .ci360-planner-subheading {
      color: #64748B;
    }
    [data-theme="light"] .ci360-view-switcher,
    html:not([data-theme="dark"]) .ci360-view-switcher {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-switch-btn,
    html:not([data-theme="dark"]) .ci360-switch-btn {
      color: #64748B;
    }
    [data-theme="light"] .ci360-switch-btn:hover,
    html:not([data-theme="dark"]) .ci360-switch-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-switch-btn.active,
    html:not([data-theme="dark"]) .ci360-switch-btn.active {
      background: #0070F3;
      color: #FFFFFF;
    }
    [data-theme="light"] .ci360-btn-secondary,
    html:not([data-theme="dark"]) .ci360-btn-secondary {
      background: #FFFFFF;
      color: #334155;
      border-color: #CBD5E1;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-btn-secondary:hover,
    html:not([data-theme="dark"]) .ci360-btn-secondary:hover {
      background: #F8FAFC;
      color: #0F172A;
      border-color: #94A3B8;
    }
    [data-theme="light"] .ci360-dropdown-menu,
    html:not([data-theme="dark"]) .ci360-dropdown-menu {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
    }
    [data-theme="light"] .ci360-menu-item,
    html:not([data-theme="dark"]) .ci360-menu-item {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-menu-item:hover,
    html:not([data-theme="dark"]) .ci360-menu-item:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .ci360-menu-item .meta small,
    html:not([data-theme="dark"]) .ci360-menu-item .meta small {
      color: #64748B;
    }
    [data-theme="light"] .ci360-planner-nav-strip,
    html:not([data-theme="dark"]) .ci360-planner-nav-strip {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .ci360-nav-arrow,
    html:not([data-theme="dark"]) .ci360-nav-arrow {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-date-picker-badge,
    html:not([data-theme="dark"]) .ci360-date-picker-badge {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-date-picker-badge .date-text,
    html:not([data-theme="dark"]) .ci360-date-picker-badge .date-text {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-today-btn,
    html:not([data-theme="dark"]) .ci360-today-btn {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #475569;
    }
    [data-theme="light"] .ci360-today-btn.is-current,
    html:not([data-theme="dark"]) .ci360-today-btn.is-current {
      background: #E0F2FE;
      color: #0070F3;
      border-color: #BAE6FD;
    }
    [data-theme="light"] .ci360-select-inline,
    html:not([data-theme="dark"]) .ci360-select-inline {
      background: #FFFFFF;
      border-color: #CBD5E1;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-progress-summary-card,
    html:not([data-theme="dark"]) .ci360-progress-summary-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .kpi-box,
    html:not([data-theme="dark"]) .kpi-box {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .kpi-box .kpi-num,
    html:not([data-theme="dark"]) .kpi-box .kpi-num {
      color: #0F172A;
    }
    [data-theme="light"] .kpi-box .kpi-label,
    html:not([data-theme="dark"]) .kpi-box .kpi-label {
      color: #64748B;
    }
    [data-theme="light"] .ring-num,
    html:not([data-theme="dark"]) .ring-num {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-circular-svg .circle-bg,
    html:not([data-theme="dark"]) .ci360-circular-svg .circle-bg {
      stroke: #E2E8F0;
    }
    [data-theme="light"] .ci360-focus-title,
    html:not([data-theme="dark"]) .ci360-focus-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-filter-pills,
    html:not([data-theme="dark"]) .ci360-filter-pills {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    [data-theme="light"] .filter-pill,
    html:not([data-theme="dark"]) .filter-pill {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      color: #64748B !important;
    }
    [data-theme="light"] .filter-pill:hover,
    html:not([data-theme="dark"]) .filter-pill:hover {
      background: rgba(0, 0, 0, 0.04) !important;
      color: #0F172A !important;
    }
    [data-theme="light"] .filter-pill.active,
    html:not([data-theme="dark"]) .filter-pill.active {
      background: #0070F3 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.35) !important;
    }
    [data-theme="light"] .ci360-search-box,
    html:not([data-theme="dark"]) .ci360-search-box {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .ci360-search-box input,
    html:not([data-theme="dark"]) .ci360-search-box input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-search-box input::placeholder,
    html:not([data-theme="dark"]) .ci360-search-box input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-add-bar,
    html:not([data-theme="dark"]) .ci360-quick-add-bar {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    [data-theme="light"] .ci360-quick-input,
    html:not([data-theme="dark"]) .ci360-quick-input {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-quick-input::placeholder,
    html:not([data-theme="dark"]) .ci360-quick-input::placeholder {
      color: #94A3B8;
    }
    [data-theme="light"] .ci360-quick-select,
    html:not([data-theme="dark"]) .ci360-quick-select {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #334155;
    }
    [data-theme="light"] .ci360-task-card,
    html:not([data-theme="dark"]) .ci360-task-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      border-left: 3.5px solid #0070F3;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-task-card:hover,
    html:not([data-theme="dark"]) .ci360-task-card:hover {
      border-color: #CBD5E1;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    [data-theme="light"] .ci360-task-card.is-completed,
    html:not([data-theme="dark"]) .ci360-task-card.is-completed {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-task-title,
    html:not([data-theme="dark"]) .ci360-task-title {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-task-desc,
    html:not([data-theme="dark"]) .ci360-task-desc {
      color: #475569;
    }
    [data-theme="light"] .ci360-task-check,
    html:not([data-theme="dark"]) .ci360-task-check {
      border-color: #CBD5E1;
    }
    [data-theme="light"] .task-action-btn,
    html:not([data-theme="dark"]) .task-action-btn {
      color: #64748B;
    }
    [data-theme="light"] .task-action-btn:hover,
    html:not([data-theme="dark"]) .task-action-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
    }
    [data-theme="light"] .ci360-past-date-banner,
    html:not([data-theme="dark"]) .ci360-past-date-banner {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    [data-theme="light"] .past-banner-title,
    html:not([data-theme="dark"]) .past-banner-title {
      color: #92400E;
    }
    [data-theme="light"] .past-banner-desc,
    html:not([data-theme="dark"]) .past-banner-desc {
      color: #B45309;
    }
    [data-theme="light"] .ci360-emp-group-card,
    html:not([data-theme="dark"]) .ci360-emp-group-card {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    [data-theme="light"] .ci360-emp-group-header,
    html:not([data-theme="dark"]) .ci360-emp-group-header {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-emp-group-header:hover,
    html:not([data-theme="dark"]) .ci360-emp-group-header:hover {
      background: #F1F5F9;
    }
    [data-theme="light"] .emp-avatar,
    html:not([data-theme="dark"]) .emp-avatar {
      background: #E0F2FE;
      color: #0070F3;
      border: 1px solid #BAE6FD;
    }
    [data-theme="light"] .emp-name,
    html:not([data-theme="dark"]) .emp-name {
      color: #0F172A;
    }
    [data-theme="light"] .emp-subtitle,
    html:not([data-theme="dark"]) .emp-subtitle {
      color: #64748B;
    }
    [data-theme="light"] .emp-stat-pill,
    html:not([data-theme="dark"]) .emp-stat-pill {
      background: #FFFFFF;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .ci360-day-column,
    html:not([data-theme="dark"]) .ci360-day-column {
      background: #FFFFFF;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .day-col-header .day-name,
    html:not([data-theme="dark"]) .day-col-header .day-name {
      color: #64748B;
    }
    [data-theme="light"] .day-col-header .day-number,
    html:not([data-theme="dark"]) .day-col-header .day-number {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-mini-task-card,
    html:not([data-theme="dark"]) .ci360-mini-task-card {
      background: #F8FAFC;
      border-color: #E2E8F0;
    }
    [data-theme="light"] .ci360-mini-task-card:hover,
    html:not([data-theme="dark"]) .ci360-mini-task-card:hover {
      background: #FFFFFF;
      border-color: #CBD5E1;
    }
    [data-theme="light"] .mini-title,
    html:not([data-theme="dark"]) .mini-title {
      color: #0F172A;
    }
    [data-theme="light"] .day-col-add-btn,
    html:not([data-theme="dark"]) .day-col-add-btn {
      border: 1px dashed #CBD5E1;
      color: #64748B;
    }
    [data-theme="light"] .day-col-add-btn:hover,
    html:not([data-theme="dark"]) .day-col-add-btn:hover {
      border-color: #0070F3;
      color: #0070F3;
      background: #E0F2FE;
    }
    [data-theme="light"] .ci360-planner-modal,
    html:not([data-theme="dark"]) .ci360-planner-modal {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #E2E8F0;
      box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    [data-theme="light"] .ci360-modal-header h3,
    html:not([data-theme="dark"]) .ci360-modal-header h3 {
      color: #0F172A;
    }
    [data-theme="light"] .ci360-modal-form label,
    html:not([data-theme="dark"]) .ci360-modal-form label {
      color: #334155;
    }
    [data-theme="light"] .ci360-modal-form .input,
    html:not([data-theme="dark"]) .ci360-modal-form .input {
      background: #FFFFFF;
      color: #0F172A;
      border: 1px solid #CBD5E1;
    }
    [data-theme="light"] .ci360-badge.creator-badge,
    html:not([data-theme="dark"]) .ci360-badge.creator-badge {
      background: #F5F3FF;
      color: #6D28D9;
      border-color: #DDD6FE;
    }
    [data-theme="light"] .ci360-badge.completion-badge,
    html:not([data-theme="dark"]) .ci360-badge.completion-badge {
      background: #EFF6FF;
      color: #1D4ED8;
      border-color: #BFDBFE;
    }
    [data-theme="light"] .ci360-badge.date-changed-badge,
    html:not([data-theme="dark"]) .ci360-badge.date-changed-badge {
      background: #FFFBEB;
      color: #B45309;
      border-color: #FDE68A;
    }

    /* Task Thumbnails Strip */
    .ci360-task-thumb-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
      align-items: center;
    }
    .ci360-att-thumb-box {
      width: 44px;
      height: 44px;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid var(--border-sm);
      background: var(--bg-hover);
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ci360-att-thumb-box:hover {
      transform: scale(1.06);
      border-color: var(--accent);
    }
    .ci360-att-thumb-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .att-more-count {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-3);
      padding: 4px 6px;
    }

    /* Recent Tasks Modal & Activity Rows */
    .recent-tasks-modal {
      max-width: 860px !important;
      width: 95vw;
    }
    .recent-modal-header-tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .recent-tab-btn {
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      color: var(--text-2);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .recent-tab-btn:hover {
      background: var(--bg-hover);
      color: var(--text-1);
    }
    .recent-tab-btn.active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
    .recent-task-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-sm);
      border-radius: var(--r-md);
      margin-bottom: 8px;
      gap: 12px;
      transition: all 0.15s ease;
    }
    .recent-task-row:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .task-paste-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(0, 112, 243, 0.08);
      border: 1px dashed rgba(0, 112, 243, 0.3);
      border-radius: 6px;
      font-size: 11.5px;
      color: var(--text-2);
      margin-top: 8px;
    }
    [data-theme="light"] .recent-task-row,
    html:not([data-theme="dark"]) .recent-task-row {
      background: #FFFFFF;
      border-color: #E2E8F0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    [data-theme="light"] .recent-tab-btn,
    html:not([data-theme="dark"]) .recent-tab-btn {
      background: #F8FAFC;
      border-color: #E2E8F0;
      color: #475569;
    }
    [data-theme="light"] .recent-tab-btn.active,
    html:not([data-theme="dark"]) .recent-tab-btn.active {
      background: #2563EB;
      color: #FFFFFF;
      border-color: #2563EB;
    }

    /* Mobile Responsive Optimizations for Planner */
    @media (max-width: 768px) {
      .ci360-planner-wrap {
        padding: 0 0 60px 0 !important;
        margin: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-planner-header {
        flex-direction: column !important;
        align-items: stretch !important;
        padding: 14px !important;
        gap: 12px !important;
        border-radius: 14px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-planner-header-left {
        width: 100% !important;
        gap: 10px !important;
      }
      .ci360-planner-hero-icon {
        width: 42px !important;
        height: 42px !important;
        font-size: 20px !important;
      }
      .ci360-planner-header-actions {
        width: 100% !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
      }
      .ci360-view-switcher {
        width: 100% !important;
        display: flex !important;
      }
      .ci360-switch-btn {
        flex: 1 !important;
        justify-content: center !important;
        padding: 7px 8px !important;
        font-size: 12px !important;
      }
      .ci360-today-focus-section {
        padding: 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-task-item {
        padding: 12px !important;
        gap: 10px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .ci360-task-badges-row {
        gap: 4px !important;
      }
      .ci360-badge {
        font-size: 10.5px !important;
        padding: 2px 7px !important;
      }
      .recent-tasks-modal {
        width: 96vw !important;
        max-width: 96vw !important;
      }
      .recent-modal-header-tabs {
        width: 100% !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
        scrollbar-width: none !important;
      }
      .recent-task-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 8px !important;
      }
    }
  `,document.head.appendChild(s)}function Na(s){return s!==null?{comment:s,variations:[]}:{variations:[]}}function Oa(s,n,t,g,k){const m={move:s,variations:k};return n&&(m.suffix=n),t&&(m.nag=t),g!==null&&(m.comment=g),m}function Ua(...s){const[n,...t]=s;let g=n;for(const k of t)k!==null&&(g.variations=[k,...k.variations],k.variations=[],g=k);return n}function Ha(s,n){if(n.marker&&n.marker.comment){let t=n.root;for(;;){const g=t.variations[0];if(!g){t.comment=n.marker.comment;break}t=g}}return{headers:s,root:n.root,result:(n.marker&&n.marker.result)??void 0}}function Ga(s,n){function t(){this.constructor=s}t.prototype=n.prototype,s.prototype=new t}function zt(s,n,t,g){var k=Error.call(this,s);return Object.setPrototypeOf&&Object.setPrototypeOf(k,zt.prototype),k.expected=n,k.found=t,k.location=g,k.name="SyntaxError",k}Ga(zt,Error);function oa(s,n,t){return t=t||" ",s.length>n?s:(n-=s.length,t+=t.repeat(n),s+t.slice(0,n))}zt.prototype.format=function(s){var n="Error: "+this.message;if(this.location){var t=null,g;for(g=0;g<s.length;g++)if(s[g].source===this.location.source){t=s[g].text.split(/\r\n|\n|\r/g);break}var k=this.location.start,m=this.location.source&&typeof this.location.source.offset=="function"?this.location.source.offset(k):k,c=this.location.source+":"+m.line+":"+m.column;if(t){var r=this.location.end,O=oa("",m.line.toString().length," "),X=t[k.line-1],F=k.line===r.line?r.column:X.length+1,R=F-k.column||1;n+=`
 --> `+c+`
`+O+` |
`+m.line+" | "+X+`
`+O+" | "+oa("",k.column-1," ")+oa("",R,"^")}else n+=`
 at `+c}return n};zt.buildMessage=function(s,n){var t={literal:function(X){return'"'+k(X.text)+'"'},class:function(X){var F=X.parts.map(function(R){return Array.isArray(R)?m(R[0])+"-"+m(R[1]):m(R)});return"["+(X.inverted?"^":"")+F.join("")+"]"},any:function(){return"any character"},end:function(){return"end of input"},other:function(X){return X.description}};function g(X){return X.charCodeAt(0).toString(16).toUpperCase()}function k(X){return X.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(F){return"\\x0"+g(F)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(F){return"\\x"+g(F)})}function m(X){return X.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,function(F){return"\\x0"+g(F)}).replace(/[\x10-\x1F\x7F-\x9F]/g,function(F){return"\\x"+g(F)})}function c(X){return t[X.type](X)}function r(X){var F=X.map(c),R,V;if(F.sort(),F.length>0){for(R=1,V=1;R<F.length;R++)F[R-1]!==F[R]&&(F[V]=F[R],V++);F.length=V}switch(F.length){case 1:return F[0];case 2:return F[0]+" or "+F[1];default:return F.slice(0,-1).join(", ")+", or "+F[F.length-1]}}function O(X){return X?'"'+k(X)+'"':"end of input"}return"Expected "+r(s)+" but "+O(n)+" found."};function Wa(s,n){n=n!==void 0?n:{};var t={},g=n.grammarSource,k={pgn:_e},m=_e,c="[",r='"',O="]",X=".",F="O-O-O",R="O-O",V="0-0-0",W="0-0",me="$",$e="{",Je="}",nt=";",bt="(",Ft=")",lt="1-0",qe="0-1",dt="1/2-1/2",kt="*",Be=/^[a-zA-Z]/,wt=/^[^"]/,Re=/^[0-9]/,Ve=/^[.]/,pe=/^[a-zA-Z1-8\-=]/,st=/^[+#]/,ke=/^[!?]/,mt=/^[^}]/,ct=/^[^\r\n]/,ft=/^[ \t\r\n]/,e=Ie("tag pair"),i=be("[",!1),b=be('"',!1),y=be("]",!1),_=Ie("tag name"),L=Pe([["a","z"],["A","Z"]],!1,!1),q=Ie("tag value"),I=Pe(['"'],!0,!1),z=Ie("move number"),M=Pe([["0","9"]],!1,!1),p=be(".",!1),B=Pe(["."],!1,!1),f=Ie("standard algebraic notation"),P=be("O-O-O",!1),H=be("O-O",!1),E=be("0-0-0",!1),d=be("0-0",!1),o=Pe([["a","z"],["A","Z"],["1","8"],"-","="],!1,!1),a=Pe(["+","#"],!1,!1),h=Ie("suffix annotation"),T=Pe(["!","?"],!1,!1),j=Ie("NAG"),C=be("$",!1),Y=Ie("brace comment"),Z=be("{",!1),S=Pe(["}"],!0,!1),A=be("}",!1),U=Ie("rest of line comment"),ae=be(";",!1),G=Pe(["\r",`
`],!0,!1),ne=Ie("variation"),le=be("(",!1),oe=be(")",!1),ue=Ie("game termination marker"),Ee=be("1-0",!1),ee=be("0-1",!1),Se=be("1/2-1/2",!1),Ce=be("*",!1),ie=Ie("whitespace"),fe=Pe([" ","	","\r",`
`],!1,!1),ve=function(w,l){return Ha(w,l)},Oe=function(w){return Object.fromEntries(w)},Ue=function(w,l){return[w,l]},ge=function(w,l){return{root:w,marker:l}},je=function(w,l){return Ua(Na(w),...l.flat())},Ne=function(w,l,x,J,te){return Oa(w,l,x,J,te)},Te=function(w){return w},Ae=function(w){return w.replace(/[\r\n]+/g," ")},Le=function(w){return w.trim()},D=function(w){return w},N=function(w,l){return{result:w,comment:l}},u=n.peg$currPos|0,se=[{line:1,column:1}],re=u,Fe=n.peg$maxFailExpected||[],K=n.peg$silentFails|0,xe;if(n.startRule){if(!(n.startRule in k))throw new Error(`Can't start parsing from rule "`+n.startRule+'".');m=k[n.startRule]}function be(w,l){return{type:"literal",text:w,ignoreCase:l}}function Pe(w,l,x){return{type:"class",parts:w,inverted:l,ignoreCase:x}}function pt(){return{type:"end"}}function Ie(w){return{type:"other",description:w}}function De(w){var l=se[w],x;if(l)return l;if(w>=se.length)x=se.length-1;else for(x=w;!se[--x];);for(l=se[x],l={line:l.line,column:l.column};x<w;)s.charCodeAt(x)===10?(l.line++,l.column=1):l.column++,x++;return se[w]=l,l}function we(w,l,x){var J=De(w),te=De(l),he={source:g,start:{offset:w,line:J.line,column:J.column},end:{offset:l,line:te.line,column:te.column}};return he}function Q(w){u<re||(u>re&&(re=u,Fe=[]),Fe.push(w))}function He(w,l,x){return new zt(zt.buildMessage(w,l),w,l,x)}function _e(){var w,l,x;return w=u,l=Qe(),x=ea(),w=ve(l,x),w}function Qe(){var w,l,x;for(w=u,l=[],x=ht();x!==t;)l.push(x),x=ht();return x=Ze(),w=Oe(l),w}function ht(){var w,l,x,J,te,he,ot;return K++,w=u,Ze(),s.charCodeAt(u)===91?(l=c,u++):(l=t,K===0&&Q(i)),l!==t?(Ze(),x=Ut(),x!==t?(Ze(),s.charCodeAt(u)===34?(J=r,u++):(J=t,K===0&&Q(b)),J!==t?(te=Ht(),s.charCodeAt(u)===34?(he=r,u++):(he=t,K===0&&Q(b)),he!==t?(Ze(),s.charCodeAt(u)===93?(ot=O,u++):(ot=t,K===0&&Q(y)),ot!==t?w=Ue(x,te):(u=w,w=t)):(u=w,w=t)):(u=w,w=t)):(u=w,w=t)):(u=w,w=t),K--,w===t&&K===0&&Q(e),w}function Ut(){var w,l,x;if(K++,w=u,l=[],x=s.charAt(u),Be.test(x)?u++:(x=t,K===0&&Q(L)),x!==t)for(;x!==t;)l.push(x),x=s.charAt(u),Be.test(x)?u++:(x=t,K===0&&Q(L));else l=t;return l!==t?w=s.substring(w,u):w=l,K--,w===t&&(l=t,K===0&&Q(_)),w}function Ht(){var w,l,x;for(K++,w=u,l=[],x=s.charAt(u),wt.test(x)?u++:(x=t,K===0&&Q(I));x!==t;)l.push(x),x=s.charAt(u),wt.test(x)?u++:(x=t,K===0&&Q(I));return w=s.substring(w,u),K--,l=t,K===0&&Q(q),w}function ea(){var w,l,x;return w=u,l=It(),Ze(),x=Pt(),x===t&&(x=null),Ze(),w=ge(l,x),w}function It(){var w,l,x,J;for(w=u,l=vt(),l===t&&(l=null),x=[],J=Mt();J!==t;)x.push(J),J=Mt();return w=je(l,x),w}function Mt(){var w,l,x,J,te,he,ot,ut;if(w=u,Ze(),Gt(),Ze(),l=ta(),l!==t){for(x=aa(),x===t&&(x=null),J=[],te=qt();te!==t;)J.push(te),te=qt();for(te=Ze(),he=vt(),he===t&&(he=null),ot=[],ut=yt();ut!==t;)ot.push(ut),ut=yt();w=Ne(l,x,J,he,ot)}else u=w,w=t;return w}function Gt(){var w,l,x,J,te,he;for(K++,w=u,l=[],x=s.charAt(u),Re.test(x)?u++:(x=t,K===0&&Q(M));x!==t;)l.push(x),x=s.charAt(u),Re.test(x)?u++:(x=t,K===0&&Q(M));if(s.charCodeAt(u)===46?(x=X,u++):(x=t,K===0&&Q(p)),x!==t){for(J=Ze(),te=[],he=s.charAt(u),Ve.test(he)?u++:(he=t,K===0&&Q(B));he!==t;)te.push(he),he=s.charAt(u),Ve.test(he)?u++:(he=t,K===0&&Q(B));l=[l,x,J,te],w=l}else u=w,w=t;return K--,w===t&&(l=t,K===0&&Q(z)),w}function ta(){var w,l,x,J,te,he;if(K++,w=u,l=u,s.substr(u,5)===F?(x=F,u+=5):(x=t,K===0&&Q(P)),x===t&&(s.substr(u,3)===R?(x=R,u+=3):(x=t,K===0&&Q(H)),x===t&&(s.substr(u,5)===V?(x=V,u+=5):(x=t,K===0&&Q(E)),x===t&&(s.substr(u,3)===W?(x=W,u+=3):(x=t,K===0&&Q(d)),x===t))))if(x=u,J=s.charAt(u),Be.test(J)?u++:(J=t,K===0&&Q(L)),J!==t){if(te=[],he=s.charAt(u),pe.test(he)?u++:(he=t,K===0&&Q(o)),he!==t)for(;he!==t;)te.push(he),he=s.charAt(u),pe.test(he)?u++:(he=t,K===0&&Q(o));else te=t;te!==t?(J=[J,te],x=J):(u=x,x=t)}else u=x,x=t;return x!==t?(J=s.charAt(u),st.test(J)?u++:(J=t,K===0&&Q(a)),J===t&&(J=null),x=[x,J],l=x):(u=l,l=t),l!==t?w=s.substring(w,u):w=l,K--,w===t&&(l=t,K===0&&Q(f)),w}function aa(){var w,l,x;for(K++,w=u,l=[],x=s.charAt(u),ke.test(x)?u++:(x=t,K===0&&Q(T));x!==t;)l.push(x),l.length>=2?x=t:(x=s.charAt(u),ke.test(x)?u++:(x=t,K===0&&Q(T)));return l.length<1?(u=w,w=t):w=l,K--,w===t&&(l=t,K===0&&Q(h)),w}function qt(){var w,l,x,J,te;if(K++,w=u,Ze(),s.charCodeAt(u)===36?(l=me,u++):(l=t,K===0&&Q(C)),l!==t){if(x=u,J=[],te=s.charAt(u),Re.test(te)?u++:(te=t,K===0&&Q(M)),te!==t)for(;te!==t;)J.push(te),te=s.charAt(u),Re.test(te)?u++:(te=t,K===0&&Q(M));else J=t;J!==t?x=s.substring(x,u):x=J,x!==t?w=Te(x):(u=w,w=t)}else u=w,w=t;return K--,w===t&&K===0&&Q(j),w}function vt(){var w;return w=na(),w===t&&(w=gt()),w}function na(){var w,l,x,J,te;if(K++,w=u,s.charCodeAt(u)===123?(l=$e,u++):(l=t,K===0&&Q(Z)),l!==t){for(x=u,J=[],te=s.charAt(u),mt.test(te)?u++:(te=t,K===0&&Q(S));te!==t;)J.push(te),te=s.charAt(u),mt.test(te)?u++:(te=t,K===0&&Q(S));x=s.substring(x,u),s.charCodeAt(u)===125?(J=Je,u++):(J=t,K===0&&Q(A)),J!==t?w=Ae(x):(u=w,w=t)}else u=w,w=t;return K--,w===t&&(l=t,K===0&&Q(Y)),w}function gt(){var w,l,x,J,te;if(K++,w=u,s.charCodeAt(u)===59?(l=nt,u++):(l=t,K===0&&Q(ae)),l!==t){for(x=u,J=[],te=s.charAt(u),ct.test(te)?u++:(te=t,K===0&&Q(G));te!==t;)J.push(te),te=s.charAt(u),ct.test(te)?u++:(te=t,K===0&&Q(G));x=s.substring(x,u),w=Le(x)}else u=w,w=t;return K--,w===t&&(l=t,K===0&&Q(U)),w}function yt(){var w,l,x,J;return K++,w=u,Ze(),s.charCodeAt(u)===40?(l=bt,u++):(l=t,K===0&&Q(le)),l!==t?(x=It(),x!==t?(Ze(),s.charCodeAt(u)===41?(J=Ft,u++):(J=t,K===0&&Q(oe)),J!==t?w=D(x):(u=w,w=t)):(u=w,w=t)):(u=w,w=t),K--,w===t&&K===0&&Q(ne),w}function Pt(){var w,l,x;return K++,w=u,s.substr(u,3)===lt?(l=lt,u+=3):(l=t,K===0&&Q(Ee)),l===t&&(s.substr(u,3)===qe?(l=qe,u+=3):(l=t,K===0&&Q(ee)),l===t&&(s.substr(u,7)===dt?(l=dt,u+=7):(l=t,K===0&&Q(Se)),l===t&&(s.charCodeAt(u)===42?(l=kt,u++):(l=t,K===0&&Q(Ce))))),l!==t?(Ze(),x=vt(),x===t&&(x=null),w=N(l,x)):(u=w,w=t),K--,w===t&&(l=t,K===0&&Q(ue)),w}function Ze(){var w,l;for(K++,w=[],l=s.charAt(u),ft.test(l)?u++:(l=t,K===0&&Q(fe));l!==t;)w.push(l),l=s.charAt(u),ft.test(l)?u++:(l=t,K===0&&Q(fe));return K--,l=t,K===0&&Q(ie),w}if(xe=m(),n.peg$library)return{peg$result:xe,peg$currPos:u,peg$FAILED:t,peg$maxFailExpected:Fe,peg$maxFailPos:re};if(xe!==t&&u===s.length)return xe;throw xe!==t&&u<s.length&&Q(pt()),He(Fe,re<s.length?s.charAt(re):null,re<s.length?we(re,re+1):we(re,re))}/**
 * @license
 * Copyright (c) 2025, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */const Qt=0xffffffffffffffffn;function ra(s,n){return(s<<n|s>>64n-n)&0xffffffffffffffffn}function va(s,n){return s*n&Qt}function Ka(s){return function(){let n=BigInt(s&Qt),t=BigInt(s>>64n&Qt);const g=va(ra(va(n,5n),7n),9n);return t^=n,n=(ra(n,24n)^t^t<<16n)&Qt,t=ra(t,37n),s=t<<64n|n,g}}const Zt=Ka(0xa187eb39cdcaed8f31c4b365b102e01en),Va=Array.from({length:2},()=>Array.from({length:6},()=>Array.from({length:128},()=>Zt()))),Ya=Array.from({length:8},()=>Zt()),Ja=Array.from({length:16},()=>Zt()),sa=Zt(),et="w",rt="b",We="p",ua="n",Xt="b",Nt="r",Ct="q",Ke="k",la="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";class Vt{color;from;to;piece;captured;promotion;flags;san;lan;before;after;constructor(n,t){const{color:g,piece:k,from:m,to:c,flags:r,captured:O,promotion:X}=t,F=Ye(m),R=Ye(c);this.color=g,this.piece=k,this.from=F,this.to=R,this.san=n._moveToSan(t,n._moves({legal:!0})),this.lan=F+R,this.before=n.fen(),n._makeMove(t),this.after=n.fen(),n._undoMove(),this.flags="";for(const V in ce)ce[V]&r&&(this.flags+=_t[V]);O&&(this.captured=O),X&&(this.promotion=X,this.lan+=X)}isCapture(){return this.flags.indexOf(_t.CAPTURE)>-1}isPromotion(){return this.flags.indexOf(_t.PROMOTION)>-1}isEnPassant(){return this.flags.indexOf(_t.EP_CAPTURE)>-1}isKingsideCastle(){return this.flags.indexOf(_t.KSIDE_CASTLE)>-1}isQueensideCastle(){return this.flags.indexOf(_t.QSIDE_CASTLE)>-1}isBigPawn(){return this.flags.indexOf(_t.BIG_PAWN)>-1}}const Xe=-1,_t={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q",NULL_MOVE:"-"},ce={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64,NULL_MOVE:128},ba={Event:"?",Site:"?",Date:"????.??.??",Round:"?",White:"?",Black:"?",Result:"*"},Qa={WhiteTitle:null,BlackTitle:null,WhiteElo:null,BlackElo:null,WhiteUSCF:null,BlackUSCF:null,WhiteNA:null,BlackNA:null,WhiteType:null,BlackType:null,EventDate:null,EventSponsor:null,Section:null,Stage:null,Board:null,Opening:null,Variation:null,SubVariation:null,ECO:null,NIC:null,Time:null,UTCTime:null,UTCDate:null,TimeControl:null,SetUp:null,FEN:null,Termination:null,Annotator:null,Mode:null,PlyCount:null},Xa={...ba,...Qa},de={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},da={b:[16,32,17,15],w:[-16,-32,-17,-15]},ya={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},Za=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],en=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],tn={p:1,n:2,b:4,r:8,q:16,k:32},an="pnbrqkPNBRQK",ka=[ua,Xt,Nt,Ct],nn=7,on=6,rn=1,sn=0,Yt={[Ke]:ce.KSIDE_CASTLE,[Ct]:ce.QSIDE_CASTLE},St={w:[{square:de.a1,flag:ce.QSIDE_CASTLE},{square:de.h1,flag:ce.KSIDE_CASTLE}],b:[{square:de.a8,flag:ce.QSIDE_CASTLE},{square:de.h8,flag:ce.KSIDE_CASTLE}]},ln={b:rn,w:on},ca="--";function Tt(s){return s>>4}function Ot(s){return s&15}function Ca(s){return"0123456789".indexOf(s)!==-1}function Ye(s){const n=Ot(s),t=Tt(s);return"abcdefgh".substring(n,n+1)+"87654321".substring(t,t+1)}function jt(s){return s===et?rt:et}function dn(s){const n=s.split(/\s+/);if(n.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const t=parseInt(n[5],10);if(isNaN(t)||t<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const g=parseInt(n[4],10);if(isNaN(g)||g<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(n[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(n[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(n[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const k=n[0].split("/");if(k.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let c=0;c<k.length;c++){let r=0,O=!1;for(let X=0;X<k[c].length;X++)if(Ca(k[c][X])){if(O)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};r+=parseInt(k[c][X],10),O=!0}else{if(!/^[prnbqkPRNBQK]$/.test(k[c][X]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};r+=1,O=!1}if(r!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(n[3][1]=="3"&&n[1]=="w"||n[3][1]=="6"&&n[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const m=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:c,regex:r}of m){if(!r.test(n[0]))return{ok:!1,error:`Invalid FEN: missing ${c} king`};if((n[0].match(r)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${c} kings`}}return Array.from(k[0]+k[7]).some(c=>c.toUpperCase()==="P")?{ok:!1,error:"Invalid FEN: some pawns are on the edge rows"}:{ok:!0}}function cn(s,n){const t=s.from,g=s.to,k=s.piece;let m=0,c=0,r=0;for(let O=0,X=n.length;O<X;O++){const F=n[O].from,R=n[O].to,V=n[O].piece;k===V&&t!==F&&g===R&&(m++,Tt(t)===Tt(F)&&c++,Ot(t)===Ot(F)&&r++)}return m>0?c>0&&r>0?Ye(t):r>0?Ye(t).charAt(1):Ye(t).charAt(0):""}function $t(s,n,t,g,k,m=void 0,c=ce.NORMAL){const r=Tt(g);if(k===We&&(r===nn||r===sn))for(let O=0;O<ka.length;O++){const X=ka[O];s.push({color:n,from:t,to:g,piece:k,captured:m,promotion:X,flags:c|ce.PROMOTION})}else s.push({color:n,from:t,to:g,piece:k,captured:m,flags:c})}function wa(s){let n=s.charAt(0);return n>="a"&&n<="h"?s.match(/[a-h]\d.*[a-h]\d/)?void 0:We:(n=n.toLowerCase(),n==="o"?Ke:n)}function pa(s){return s.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class Sa{_board=new Array(128);_turn=et;_header={};_kings={w:Xe,b:Xe};_epSquare=-1;_halfMoves=0;_moveNumber=0;_history=[];_comments={};_castling={w:0,b:0};_hash=0n;_positionCount=new Map;constructor(n=la,{skipValidation:t=!1}={}){this.load(n,{skipValidation:t})}clear({preserveHeaders:n=!1}={}){this._board=new Array(128),this._kings={w:Xe,b:Xe},this._turn=et,this._castling={w:0,b:0},this._epSquare=Xe,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=n?this._header:{...Xa},this._hash=this._computeHash(),this._positionCount=new Map,this._header.SetUp=null,this._header.FEN=null}load(n,{skipValidation:t=!1,preserveHeaders:g=!1}={}){let k=n.split(/\s+/);if(k.length>=2&&k.length<6){const r=["-","-","0","1"];n=k.concat(r.slice(-(6-k.length))).join(" ")}if(k=n.split(/\s+/),!t){const{ok:r,error:O}=dn(n);if(!r)throw new Error(O)}const m=k[0];let c=0;this.clear({preserveHeaders:g});for(let r=0;r<m.length;r++){const O=m.charAt(r);if(O==="/")c+=8;else if(Ca(O))c+=parseInt(O,10);else{const X=O<"a"?et:rt;this._put({type:O.toLowerCase(),color:X},Ye(c)),c++}}this._turn=k[1],k[2].indexOf("K")>-1&&(this._castling.w|=ce.KSIDE_CASTLE),k[2].indexOf("Q")>-1&&(this._castling.w|=ce.QSIDE_CASTLE),k[2].indexOf("k")>-1&&(this._castling.b|=ce.KSIDE_CASTLE),k[2].indexOf("q")>-1&&(this._castling.b|=ce.QSIDE_CASTLE),this._epSquare=k[3]==="-"?Xe:de[k[3]],this._halfMoves=parseInt(k[4],10),this._moveNumber=parseInt(k[5],10),this._hash=this._computeHash(),this._updateSetup(n),this._incPositionCount()}fen({forceEnpassantSquare:n=!1}={}){let t=0,g="";for(let c=de.a8;c<=de.h1;c++){if(this._board[c]){t>0&&(g+=t,t=0);const{color:r,type:O}=this._board[c];g+=r===et?O.toUpperCase():O.toLowerCase()}else t++;c+1&136&&(t>0&&(g+=t),c!==de.h1&&(g+="/"),t=0,c+=8)}let k="";this._castling[et]&ce.KSIDE_CASTLE&&(k+="K"),this._castling[et]&ce.QSIDE_CASTLE&&(k+="Q"),this._castling[rt]&ce.KSIDE_CASTLE&&(k+="k"),this._castling[rt]&ce.QSIDE_CASTLE&&(k+="q"),k=k||"-";let m="-";if(this._epSquare!==Xe)if(n)m=Ye(this._epSquare);else{const c=this._epSquare+(this._turn===et?16:-16),r=[c+1,c-1];for(const O of r){if(O&136)continue;const X=this._turn;if(this._board[O]?.color===X&&this._board[O]?.type===We){this._makeMove({color:X,from:O,to:this._epSquare,piece:We,captured:We,flags:ce.EP_CAPTURE});const F=!this._isKingAttacked(X);if(this._undoMove(),F){m=Ye(this._epSquare);break}}}}return[g,this._turn,k,m,this._halfMoves,this._moveNumber].join(" ")}_pieceKey(n){if(!this._board[n])return 0n;const{color:t,type:g}=this._board[n],k={w:0,b:1}[t],m={p:0,n:1,b:2,r:3,q:4,k:5}[g];return Va[k][m][n]}_epKey(){return this._epSquare===Xe?0n:Ya[this._epSquare&7]}_castlingKey(){const n=this._castling.w>>5|this._castling.b>>3;return Ja[n]}_computeHash(){let n=0n;for(let t=de.a8;t<=de.h1;t++){if(t&136){t+=7;continue}this._board[t]&&(n^=this._pieceKey(t))}return n^=this._epKey(),n^=this._castlingKey(),this._turn==="b"&&(n^=sa),n}_updateSetup(n){this._history.length>0||(n!==la?(this._header.SetUp="1",this._header.FEN=n):(this._header.SetUp=null,this._header.FEN=null))}reset(){this.load(la)}get(n){return this._board[de[n]]}findPiece(n){const t=[];for(let g=de.a8;g<=de.h1;g++){if(g&136){g+=7;continue}!this._board[g]||this._board[g]?.color!==n.color||this._board[g].color===n.color&&this._board[g].type===n.type&&t.push(Ye(g))}return t}put({type:n,color:t},g){return this._put({type:n,color:t},g)?(this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),!0):!1}_set(n,t){this._hash^=this._pieceKey(n),this._board[n]=t,this._hash^=this._pieceKey(n)}_put({type:n,color:t},g){if(an.indexOf(n.toLowerCase())===-1||!(g in de))return!1;const k=de[g];if(n==Ke&&!(this._kings[t]==Xe||this._kings[t]==k))return!1;const m=this._board[k];return m&&m.type===Ke&&(this._kings[m.color]=Xe),this._set(k,{type:n,color:t}),n===Ke&&(this._kings[t]=k),!0}_clear(n){this._hash^=this._pieceKey(n),delete this._board[n]}remove(n){const t=this.get(n);return this._clear(de[n]),t&&t.type===Ke&&(this._kings[t.color]=Xe),this._updateCastlingRights(),this._updateEnPassantSquare(),this._updateSetup(this.fen()),t}_updateCastlingRights(){this._hash^=this._castlingKey();const n=this._board[de.e1]?.type===Ke&&this._board[de.e1]?.color===et,t=this._board[de.e8]?.type===Ke&&this._board[de.e8]?.color===rt;(!n||this._board[de.a1]?.type!==Nt||this._board[de.a1]?.color!==et)&&(this._castling.w&=-65),(!n||this._board[de.h1]?.type!==Nt||this._board[de.h1]?.color!==et)&&(this._castling.w&=-33),(!t||this._board[de.a8]?.type!==Nt||this._board[de.a8]?.color!==rt)&&(this._castling.b&=-65),(!t||this._board[de.h8]?.type!==Nt||this._board[de.h8]?.color!==rt)&&(this._castling.b&=-33),this._hash^=this._castlingKey()}_updateEnPassantSquare(){if(this._epSquare===Xe)return;const n=this._epSquare+(this._turn===et?-16:16),t=this._epSquare+(this._turn===et?16:-16),g=[t+1,t-1];if(this._board[n]!==null||this._board[this._epSquare]!==null||this._board[t]?.color!==jt(this._turn)||this._board[t]?.type!==We){this._hash^=this._epKey(),this._epSquare=Xe;return}const k=m=>!(m&136)&&this._board[m]?.color===this._turn&&this._board[m]?.type===We;g.some(k)||(this._hash^=this._epKey(),this._epSquare=Xe)}_attacked(n,t,g){const k=[];for(let m=de.a8;m<=de.h1;m++){if(m&136){m+=7;continue}if(this._board[m]===void 0||this._board[m].color!==n)continue;const c=this._board[m],r=m-t;if(r===0)continue;const O=r+119;if(Za[O]&tn[c.type]){if(c.type===We){if(r>0&&c.color===et||r<=0&&c.color===rt)if(g)k.push(Ye(m));else return!0;continue}if(c.type==="n"||c.type==="k")if(g){k.push(Ye(m));continue}else return!0;const X=en[O];let F=m+X,R=!1;for(;F!==t;){if(this._board[F]!=null){R=!0;break}F+=X}if(!R)if(g){k.push(Ye(m));continue}else return!0}}return g?k:!1}attackers(n,t){return t?this._attacked(t,de[n],!0):this._attacked(this._turn,de[n],!0)}_isKingAttacked(n){const t=this._kings[n];return t===-1?!1:this._attacked(jt(n),t)}hash(){return this._hash.toString(16)}isAttacked(n,t){return this._attacked(t,de[n])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const n={b:0,n:0,r:0,q:0,k:0,p:0},t=[];let g=0,k=0;for(let m=de.a8;m<=de.h1;m++){if(k=(k+1)%2,m&136){m+=7;continue}const c=this._board[m];c&&(n[c.type]=c.type in n?n[c.type]+1:1,c.type===Xt&&t.push(k),g++)}if(g===2)return!0;if(g===3&&(n[Xt]===1||n[ua]===1))return!0;if(g===n[Xt]+2){let m=0;const c=t.length;for(let r=0;r<c;r++)m+=t[r];if(m===0||m===c)return!0}return!1}isThreefoldRepetition(){return this._getPositionCount(this._hash)>=3}isDrawByFiftyMoves(){return this._halfMoves>=100}isDraw(){return this.isDrawByFiftyMoves()||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isDraw()}moves({verbose:n=!1,square:t=void 0,piece:g=void 0}={}){const k=this._moves({square:t,piece:g});return n?k.map(m=>new Vt(this,m)):k.map(m=>this._moveToSan(m,k))}_moves({legal:n=!0,piece:t=void 0,square:g=void 0}={}){const k=g?g.toLowerCase():void 0,m=t?.toLowerCase(),c=[],r=this._turn,O=jt(r);let X=de.a8,F=de.h1,R=!1;if(k)if(k in de)X=F=de[k],R=!0;else return[];for(let W=X;W<=F;W++){if(W&136){W+=7;continue}if(!this._board[W]||this._board[W].color===O)continue;const{type:me}=this._board[W];let $e;if(me===We){if(m&&m!==me)continue;$e=W+da[r][0],this._board[$e]||($t(c,r,W,$e,We),$e=W+da[r][1],ln[r]===Tt(W)&&!this._board[$e]&&$t(c,r,W,$e,We,void 0,ce.BIG_PAWN));for(let Je=2;Je<4;Je++)$e=W+da[r][Je],!($e&136)&&(this._board[$e]?.color===O?$t(c,r,W,$e,We,this._board[$e].type,ce.CAPTURE):$e===this._epSquare&&$t(c,r,W,$e,We,We,ce.EP_CAPTURE))}else{if(m&&m!==me)continue;for(let Je=0,nt=ya[me].length;Je<nt;Je++){const bt=ya[me][Je];for($e=W;$e+=bt,!($e&136);){if(!this._board[$e])$t(c,r,W,$e,me);else{if(this._board[$e].color===r)break;$t(c,r,W,$e,me,this._board[$e].type,ce.CAPTURE);break}if(me===ua||me===Ke)break}}}}if((m===void 0||m===Ke)&&(!R||F===this._kings[r])){if(this._castling[r]&ce.KSIDE_CASTLE){const W=this._kings[r],me=W+2;!this._board[W+1]&&!this._board[me]&&!this._attacked(O,this._kings[r])&&!this._attacked(O,W+1)&&!this._attacked(O,me)&&$t(c,r,this._kings[r],me,Ke,void 0,ce.KSIDE_CASTLE)}if(this._castling[r]&ce.QSIDE_CASTLE){const W=this._kings[r],me=W-2;!this._board[W-1]&&!this._board[W-2]&&!this._board[W-3]&&!this._attacked(O,this._kings[r])&&!this._attacked(O,W-1)&&!this._attacked(O,me)&&$t(c,r,this._kings[r],me,Ke,void 0,ce.QSIDE_CASTLE)}}if(!n||this._kings[r]===-1)return c;const V=[];for(let W=0,me=c.length;W<me;W++)this._makeMove(c[W]),this._isKingAttacked(r)||V.push(c[W]),this._undoMove();return V}move(n,{strict:t=!1}={}){let g=null;if(typeof n=="string")g=this._moveFromSan(n,t);else if(n===null)g=this._moveFromSan(ca,t);else if(typeof n=="object"){const m=this._moves();for(let c=0,r=m.length;c<r;c++)if(n.from===Ye(m[c].from)&&n.to===Ye(m[c].to)&&(!("promotion"in m[c])||n.promotion===m[c].promotion)){g=m[c];break}}if(!g)throw typeof n=="string"?new Error(`Invalid move: ${n}`):new Error(`Invalid move: ${JSON.stringify(n)}`);if(this.isCheck()&&g.flags&ce.NULL_MOVE)throw new Error("Null move not allowed when in check");const k=new Vt(this,g);return this._makeMove(g),this._incPositionCount(),k}_push(n){this._history.push({move:n,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_movePiece(n,t){this._hash^=this._pieceKey(n),this._board[t]=this._board[n],delete this._board[n],this._hash^=this._pieceKey(t)}_makeMove(n){const t=this._turn,g=jt(t);if(this._push(n),n.flags&ce.NULL_MOVE){t===rt&&this._moveNumber++,this._halfMoves++,this._turn=g,this._epSquare=Xe;return}if(this._hash^=this._epKey(),this._hash^=this._castlingKey(),n.captured&&(this._hash^=this._pieceKey(n.to)),this._movePiece(n.from,n.to),n.flags&ce.EP_CAPTURE&&(this._turn===rt?this._clear(n.to-16):this._clear(n.to+16)),n.promotion&&(this._clear(n.to),this._set(n.to,{type:n.promotion,color:t})),this._board[n.to].type===Ke){if(this._kings[t]=n.to,n.flags&ce.KSIDE_CASTLE){const k=n.to-1,m=n.to+1;this._movePiece(m,k)}else if(n.flags&ce.QSIDE_CASTLE){const k=n.to+1,m=n.to-2;this._movePiece(m,k)}this._castling[t]=0}if(this._castling[t]){for(let k=0,m=St[t].length;k<m;k++)if(n.from===St[t][k].square&&this._castling[t]&St[t][k].flag){this._castling[t]^=St[t][k].flag;break}}if(this._castling[g]){for(let k=0,m=St[g].length;k<m;k++)if(n.to===St[g][k].square&&this._castling[g]&St[g][k].flag){this._castling[g]^=St[g][k].flag;break}}if(this._hash^=this._castlingKey(),n.flags&ce.BIG_PAWN){let k;t===rt?k=n.to-16:k=n.to+16,!(n.to-1&136)&&this._board[n.to-1]?.type===We&&this._board[n.to-1]?.color===g||!(n.to+1&136)&&this._board[n.to+1]?.type===We&&this._board[n.to+1]?.color===g?(this._epSquare=k,this._hash^=this._epKey()):this._epSquare=Xe}else this._epSquare=Xe;n.piece===We?this._halfMoves=0:n.flags&(ce.CAPTURE|ce.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,t===rt&&this._moveNumber++,this._turn=g,this._hash^=sa}undo(){const n=this._hash,t=this._undoMove();if(t){const g=new Vt(this,t);return this._decPositionCount(n),g}return null}_undoMove(){const n=this._history.pop();if(n===void 0)return null;this._hash^=this._epKey(),this._hash^=this._castlingKey();const t=n.move;this._kings=n.kings,this._turn=n.turn,this._castling=n.castling,this._epSquare=n.epSquare,this._halfMoves=n.halfMoves,this._moveNumber=n.moveNumber,this._hash^=this._epKey(),this._hash^=this._castlingKey(),this._hash^=sa;const g=this._turn,k=jt(g);if(t.flags&ce.NULL_MOVE)return t;if(this._movePiece(t.to,t.from),t.piece&&(this._clear(t.from),this._set(t.from,{type:t.piece,color:g})),t.captured)if(t.flags&ce.EP_CAPTURE){let m;g===rt?m=t.to-16:m=t.to+16,this._set(m,{type:We,color:k})}else this._set(t.to,{type:t.captured,color:k});if(t.flags&(ce.KSIDE_CASTLE|ce.QSIDE_CASTLE)){let m,c;t.flags&ce.KSIDE_CASTLE?(m=t.to+1,c=t.to-1):(m=t.to-2,c=t.to+1),this._movePiece(c,m)}return t}pgn({newline:n=`
`,maxWidth:t=0}={}){const g=[];let k=!1;for(const V in this._header)this._header[V]&&g.push(`[${V} "${this._header[V]}"]`+n),k=!0;k&&this._history.length&&g.push(n);const m=V=>{const W=this._comments[this.fen()];if(typeof W<"u"){const me=V.length>0?" ":"";V=`${V}${me}{${W}}`}return V},c=[];for(;this._history.length>0;)c.push(this._undoMove());const r=[];let O="";for(c.length===0&&r.push(m(""));c.length>0;){O=m(O);const V=c.pop();if(!V)break;if(!this._history.length&&V.color==="b"){const W=`${this._moveNumber}. ...`;O=O?`${O} ${W}`:W}else V.color==="w"&&(O.length&&r.push(O),O=this._moveNumber+".");O=O+" "+this._moveToSan(V,this._moves({legal:!0})),this._makeMove(V)}if(O.length&&r.push(m(O)),r.push(this._header.Result||"*"),t===0)return g.join("")+r.join(" ");const X=function(){return g.length>0&&g[g.length-1]===" "?(g.pop(),!0):!1},F=function(V,W){for(const me of W.split(" "))if(me){if(V+me.length>t){for(;X();)V--;g.push(n),V=0}g.push(me),V+=me.length,g.push(" "),V++}return X()&&V--,V};let R=0;for(let V=0;V<r.length;V++){if(R+r[V].length>t&&r[V].includes("{")){R=F(R,r[V]);continue}R+r[V].length>t&&V!==0?(g[g.length-1]===" "&&g.pop(),g.push(n),R=0):V!==0&&(g.push(" "),R++),g.push(r[V]),R+=r[V].length}return g.join("")}header(...n){for(let t=0;t<n.length;t+=2)typeof n[t]=="string"&&typeof n[t+1]=="string"&&(this._header[n[t]]=n[t+1]);return this._header}setHeader(n,t){return this._header[n]=t??ba[n]??null,this.getHeaders()}removeHeader(n){return n in this._header?(this._header[n]=ba[n]||null,!0):!1}getHeaders(){const n={};for(const[t,g]of Object.entries(this._header))g!==null&&(n[t]=g);return n}loadPgn(n,{strict:t=!1,newlineChar:g=`\r?
`}={}){g!==`\r?
`&&(n=n.replace(new RegExp(g,"g"),`
`));const k=Wa(n);this.reset();const m=k.headers;let c="";for(const X in m)X.toLowerCase()==="fen"&&(c=m[X]),this.header(X,m[X]);if(!t)c&&this.load(c,{preserveHeaders:!0});else if(m.SetUp==="1"){if(!("FEN"in m))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(m.FEN,{preserveHeaders:!0})}let r=k.root;for(;r;){if(r.move){const X=this._moveFromSan(r.move,t);if(X==null)throw new Error(`Invalid move in PGN: ${r.move}`);this._makeMove(X),this._incPositionCount()}r.comment!==void 0&&(this._comments[this.fen()]=r.comment),r=r.variations[0]}const O=k.result;O&&Object.keys(this._header).length&&this._header.Result!==O&&this.setHeader("Result",O)}_moveToSan(n,t){let g="";if(n.flags&ce.KSIDE_CASTLE)g="O-O";else if(n.flags&ce.QSIDE_CASTLE)g="O-O-O";else{if(n.flags&ce.NULL_MOVE)return ca;if(n.piece!==We){const k=cn(n,t);g+=n.piece.toUpperCase()+k}n.flags&(ce.CAPTURE|ce.EP_CAPTURE)&&(n.piece===We&&(g+=Ye(n.from)[0]),g+="x"),g+=Ye(n.to),n.promotion&&(g+="="+n.promotion.toUpperCase())}return this._makeMove(n),this.isCheck()&&(this.isCheckmate()?g+="#":g+="+"),this._undoMove(),g}_moveFromSan(n,t=!1){let g=pa(n);if(t||(g==="0-0"?g="O-O":g==="0-0-0"&&(g="O-O-O")),g==ca)return{color:this._turn,from:0,to:0,piece:"k",flags:ce.NULL_MOVE};let k=wa(g),m=this._moves({legal:!0,piece:k});for(let V=0,W=m.length;V<W;V++)if(g===pa(this._moveToSan(m[V],m)))return m[V];if(t)return null;let c,r,O,X,F,R=!1;if(r=g.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),r?(c=r[1],O=r[2],X=r[3],F=r[4],O.length==1&&(R=!0)):(r=g.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),r&&(c=r[1],O=r[2],X=r[3],F=r[4],O.length==1&&(R=!0))),k=wa(g),m=this._moves({legal:!0,piece:c||k}),!X)return null;for(let V=0,W=m.length;V<W;V++)if(O){if((!c||c.toLowerCase()==m[V].piece)&&de[O]==m[V].from&&de[X]==m[V].to&&(!F||F.toLowerCase()==m[V].promotion))return m[V];if(R){const me=Ye(m[V].from);if((!c||c.toLowerCase()==m[V].piece)&&de[X]==m[V].to&&(O==me[0]||O==me[1])&&(!F||F.toLowerCase()==m[V].promotion))return m[V]}}else if(g===pa(this._moveToSan(m[V],m)).replace("x",""))return m[V];return null}ascii(){let n=`   +------------------------+
`;for(let t=de.a8;t<=de.h1;t++){if(Ot(t)===0&&(n+=" "+"87654321"[Tt(t)]+" |"),this._board[t]){const g=this._board[t].type,m=this._board[t].color===et?g.toUpperCase():g.toLowerCase();n+=" "+m+" "}else n+=" . ";t+1&136&&(n+=`|
`,t+=8)}return n+=`   +------------------------+
`,n+="     a  b  c  d  e  f  g  h",n}perft(n){const t=this._moves({legal:!1});let g=0;const k=this._turn;for(let m=0,c=t.length;m<c;m++)this._makeMove(t[m]),this._isKingAttacked(k)||(n-1>0?g+=this.perft(n-1):g++),this._undoMove();return g}setTurn(n){return this._turn==n?!1:(this.move("--"),!0)}turn(){return this._turn}board(){const n=[];let t=[];for(let g=de.a8;g<=de.h1;g++)this._board[g]==null?t.push(null):t.push({square:Ye(g),type:this._board[g].type,color:this._board[g].color}),g+1&136&&(n.push(t),t=[],g+=8);return n}squareColor(n){if(n in de){const t=de[n];return(Tt(t)+Ot(t))%2===0?"light":"dark"}return null}history({verbose:n=!1}={}){const t=[],g=[];for(;this._history.length>0;)t.push(this._undoMove());for(;;){const k=t.pop();if(!k)break;n?g.push(new Vt(this,k)):g.push(this._moveToSan(k,this._moves())),this._makeMove(k)}return g}_getPositionCount(n){return this._positionCount.get(n)??0}_incPositionCount(){this._positionCount.set(this._hash,(this._positionCount.get(this._hash)??0)+1)}_decPositionCount(n){const t=this._positionCount.get(n)??0;t===1?this._positionCount.delete(n):this._positionCount.set(n,t-1)}_pruneComments(){const n=[],t={},g=k=>{k in this._comments&&(t[k]=this._comments[k])};for(;this._history.length>0;)n.push(this._undoMove());for(g(this.fen());;){const k=n.pop();if(!k)break;this._makeMove(k),g(this.fen())}this._comments=t}getComment(){return this._comments[this.fen()]}setComment(n){this._comments[this.fen()]=n.replace("{","[").replace("}","]")}deleteComment(){return this.removeComment()}removeComment(){const n=this._comments[this.fen()];return delete this._comments[this.fen()],n}getComments(){return this._pruneComments(),Object.keys(this._comments).map(n=>({fen:n,comment:this._comments[n]}))}deleteComments(){return this.removeComments()}removeComments(){return this._pruneComments(),Object.keys(this._comments).map(n=>{const t=this._comments[n];return delete this._comments[n],{fen:n,comment:t}})}setCastlingRights(n,t){for(const k of[Ke,Ct])t[k]!==void 0&&(t[k]?this._castling[n]|=Yt[k]:this._castling[n]&=~Yt[k]);this._updateCastlingRights();const g=this.getCastlingRights(n);return(t[Ke]===void 0||t[Ke]===g[Ke])&&(t[Ct]===void 0||t[Ct]===g[Ct])}getCastlingRights(n){return{[Ke]:(this._castling[n]&Yt[Ke])!==0,[Ct]:(this._castling[n]&Yt[Ct])!==0}}moveNumber(){return this._moveNumber}}async function bn(s,n={}){const t=n.currentUser||{},g=n.userRole||t?.role||"employee";let k="chat",m=[],c=null,r=[],O=[],X=null,F=null,R=!1,V=null,W=null;s.innerHTML=`
    <div class="bonding-wrap" id="bonding-app-root">
      <!-- Top Navigation & Header Bar -->
      <div class="bonding-nav-bar">
        <div class="bonding-nav-left">
          <div class="bonding-logo-badge">💬</div>
          <div>
            <h2 class="bonding-title">Team Chat & Lounge</h2>
            <p class="bonding-subtitle">Direct Messages · Group Lounges · Multiplayer Games</p>
          </div>
        </div>

        <!-- View Switcher Tabs -->
        <div class="bonding-view-tabs">
          <button class="bonding-view-tab active" id="tab-nav-chat">
            <span>💬</span> <span>Team Chat</span>
          </button>
          <button class="bonding-view-tab" id="tab-nav-lounge">
            <span>🎮</span> <span>Lounge & Games</span>
          </button>
        </div>

        <div class="bonding-nav-right">
          <button class="bonding-top-action-btn primary" id="btn-top-challenge" title="Challenge an Employee">
            <span>⚔️</span> <span>Challenge</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-chat" title="Start a Personal Chat">
            <span>👤</span> <span>New Chat</span>
          </button>
          <button class="bonding-top-action-btn" id="btn-top-new-group" title="Create a Group Lounge">
            <span>👥</span> <span>+ Group</span>
          </button>
        </div>
      </div>

      <!-- Main Chat Layout (Shown when currentView === 'chat') -->
      <div class="bonding-chat-layout mobile-view-chat" id="bonding-chat-main-wrap">
        <!-- Sidebar: Direct Chats & Group Lounges -->
        <aside class="bonding-sidebar">
          <div class="bonding-search-box">
            <input type="text" id="bonding-search-input" placeholder="Search conversations or teammates..." />
          </div>

          <!-- Group Lounges Section -->
          <div class="bonding-section-header">
            <span class="bonding-section-title">GROUP LOUNGES</span>
            <button class="bonding-mini-btn" id="btn-create-group" title="Create New Group">
              <span>+</span> New Group
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-group-list">
            <div class="bonding-loading-text">Loading groups...</div>
          </div>

          <!-- Direct 1-on-1 Messages Section -->
          <div class="bonding-section-header" style="margin-top: 18px;">
            <span class="bonding-section-title">DIRECT MESSAGES</span>
            <button class="bonding-mini-btn" id="btn-new-direct-chat" title="New Direct Message">
              <span>+</span> New Chat
            </button>
          </div>
          <div class="bonding-channel-list" id="bonding-direct-list">
            <div class="bonding-loading-text">Loading direct chats...</div>
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="bonding-chat-main" id="bonding-chat-panel">
          <div class="bonding-chat-loading">Loading conversation...</div>
        </main>
      </div>

      <!-- Lounge & Multiplayer Games Arena Layout (Shown when currentView === 'lounge_games') -->
      <div class="bonding-lounge-layout" id="bonding-lounge-main-wrap" style="display: none;">
        <div class="bonding-loading-text" style="padding: 40px; text-align: center;">Loading Lounge & Games Arena...</div>
      </div>
    </div>

    <!-- Modals container -->
    <div id="bonding-modals-root"></div>
  `,pn(),await lt(),Re();const me=s.querySelector("#tab-nav-chat"),$e=s.querySelector("#tab-nav-lounge"),Je=s.querySelector("#bonding-chat-main-wrap"),nt=s.querySelector("#bonding-lounge-main-wrap");me?.addEventListener("click",async()=>{k="chat",me.classList.add("active"),$e.classList.remove("active"),Je.style.display="grid",nt.style.display="none",Re(),c&&await qe(c._id)}),$e?.addEventListener("click",async()=>{k="lounge_games",$e.classList.add("active"),me.classList.remove("active"),Je.style.display="none",nt.style.display="block",await y()}),s.querySelector("#btn-top-new-chat")?.addEventListener("click",B),s.querySelector("#btn-top-new-group")?.addEventListener("click",f),s.querySelector("#btn-top-challenge")?.addEventListener("click",()=>L());const bt=s.querySelector("#bonding-search-input");bt&&bt.addEventListener("input",d=>{const o=d.target.value.toLowerCase().trim();s.querySelectorAll(".bonding-channel-item").forEach(h=>{const T=h.textContent.toLowerCase();h.style.display=T.includes(o)?"flex":"none"})}),kt(),new MutationObserver((d,o)=>{document.body.contains(s)||(F&&clearInterval(F),W&&clearInterval(W),o.disconnect())}).observe(document.body,{childList:!0,subtree:!0});async function lt(){try{const[d,o]=await Promise.all([Me("/bonding/channels").catch(()=>[]),Me("/bonding/colleagues").catch(()=>[])]);if(m=d,r=o,m.length>0){const a=localStorage.getItem("ci360_bonding_active_channel");a&&m.some(h=>h._id===a)?c=m.find(h=>h._id===a):c||(c=m.find(h=>h.name.includes("Lounge"))||m[0])}Be(),c&&await qe(c._id)}catch(d){console.error("Failed to load bonding data",d)}}async function qe(d,o=!1){if(d)try{localStorage.setItem("ci360_bonding_active_channel",d),O=await Me(`/bonding/channels/${d}/messages`),o?i():b()}catch(a){console.error("Failed to load messages",a)}}let dt=0;function kt(){F&&clearInterval(F),F=setInterval(async()=>{try{if(!document.body.contains(s)){clearInterval(F);return}if(dt++,dt%2===0){const d=await Me("/bonding/channels").catch(()=>null);d&&JSON.stringify(d.map(o=>o._id+o.lastMessage?.sentAt))!==JSON.stringify(m.map(o=>o._id+o.lastMessage?.sentAt))&&(m=d,Be())}k==="chat"&&c?await qe(c._id,!0):k==="lounge_games"&&await y(!0)}catch{}},3e3)}function Be(){const d=s.querySelector("#bonding-group-list"),o=s.querySelector("#bonding-direct-list");if(!d||!o)return;const a=m.filter(T=>T.type==="group"),h=m.filter(T=>T.type==="direct");if(a.length===0)d.innerHTML='<div class="bonding-empty-text">No group lounges yet. Click + New Group to start one!</div>';else{const T=t?._id||t?.id,j=g==="superadmin"||t?.role==="superadmin";d.innerHTML=a.map(C=>{const Y=c&&c._id===C._id,S=C.createdBy&&C.createdBy.userId&&String(C.createdBy.userId)===String(T)||j;return`
          <div class="bonding-channel-item ${Y?"active":""}" data-channel-id="${C._id}">
            <div class="bonding-channel-icon">${C.avatar||"👥"}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(C.name)}</div>
              <div class="bonding-channel-preview">${v(C.lastMessage?.content||"No messages yet")}</div>
            </div>
            
            ${S?`
              <button class="bonding-channel-del-btn" data-channel-id="${C._id}" title="Delete Group (Creator only)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            `:`
              <button class="bonding-channel-leave-btn" data-channel-id="${C._id}" title="Leave Group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `}
          </div>
        `}).join("")}h.length===0?o.innerHTML='<div class="bonding-empty-text">No direct messages yet. Click + New Chat to start a conversation!</div>':o.innerHTML=h.map(T=>{const j=c&&c._id===T._id,C=T.displayName||T.name||"Colleague",Y=C.slice(0,1).toUpperCase();return`
          <div class="bonding-channel-item ${j?"active":""}" data-channel-id="${T._id}">
            <div class="bonding-channel-avatar">${Y}</div>
            <div class="bonding-channel-info">
              <div class="bonding-channel-name">${v(C)}</div>
              <div class="bonding-channel-preview">${v(T.lastMessage?.content||"Say hello...")}</div>
            </div>
            <button class="bonding-channel-del-btn" data-channel-id="${T._id}" title="Delete 1-on-1 Chat">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `}).join(""),wt()}function wt(){const d=s.querySelectorAll(".bonding-channel-item");d.forEach(o=>{o.onclick=async a=>{if(a.target.closest(".bonding-channel-del-btn")||a.target.closest(".bonding-channel-leave-btn"))return;const h=o.dataset.channelId,T=m.find(j=>j._id===h);if(T){c=T,d.forEach(C=>C.classList.remove("active")),o.classList.add("active");const j=s.querySelector("#bonding-chat-main-wrap");j&&(j.classList.remove("mobile-view-sidebar"),j.classList.add("mobile-view-chat")),Re(),await qe(T._id)}}}),s.querySelectorAll(".bonding-channel-leave-btn").forEach(o=>{o.onclick=async a=>{a.stopPropagation();const h=o.dataset.channelId,j=m.find(C=>C._id===h)?.name||"this group";if(confirm(`Are you sure you want to leave the group "${j}"?`))try{o.disabled=!0,await ye(`/bonding/channels/${h}/leave`,{}),$(`You left "${j}"`,"info"),m=m.filter(C=>C._id!==h),c&&c._id===h&&(c=m.find(C=>C.type==="group")||m[0]||null,Re(),c&&await qe(c._id)),Be()}catch(C){$(C.message||"Failed to leave group","error"),o.disabled=!1}}}),s.querySelectorAll(".bonding-channel-del-btn").forEach(o=>{o.onclick=async a=>{a.stopPropagation();const h=o.dataset.channelId,T=m.find(Y=>Y._id===h),j=T&&T.type==="direct",C=j?"this 1-on-1 chat":`the group "${T?.name||""}"`;if(confirm(`Are you sure you want to delete ${C}? All messages will be permanently removed.`))try{o.disabled=!0,await at(`/bonding/channels/${h}`),$(j?"1-on-1 chat deleted":"Group deleted","success"),m=m.filter(Y=>Y._id!==h),c&&c._id===h&&(c=m[0]||null,Re(),c&&await qe(c._id)),Be()}catch(Y){$(Y.message||"Failed to delete conversation","error"),o.disabled=!1}}}),s.querySelector("#btn-create-group")?.addEventListener("click",f),s.querySelector("#btn-new-direct-chat")?.addEventListener("click",B)}function Re(){const d=s.querySelector("#bonding-chat-panel");if(!d)return;if(!c){d.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">💬</div>
          <h4>Select a Conversation</h4>
          <p>Choose a group lounge or direct message on the left to start chatting with your colleagues.</p>
        </div>
      `;return}const o=v(c.displayName||c.name),a=(c.members||[]).length,h=c.type==="group",T=t?._id||t?.id,j=h?null:(c.members||[]).find(S=>S.userId?.toString()!==T?.toString()),C=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(T),Y=g==="superadmin"||t?.role==="superadmin",Z=C||Y;d.innerHTML=`
      <div class="bonding-chat-header">
        <div class="bonding-chat-header-info">
          <button type="button" class="bonding-header-btn mobile-back-channels-btn" id="btn-mobile-back-channels" title="Back to All Chats">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Chats</span>
          </button>
          <div class="bonding-chat-header-avatar">${h?c.avatar||"👥":"👤"}</div>
          <div class="bonding-chat-header-titles">
            <div class="bonding-chat-title">${o}</div>
            <div class="bonding-chat-sub">
              ${h?`<span>${a} members</span> · <span>${v(c.description||"Public Lounge")}</span>`:'<span>Direct Chat</span> · <span class="status-online">🟢 Active</span>'}
            </div>
          </div>
        </div>

        <div class="bonding-chat-header-actions">
          <!-- Quick Challenge Button -->
          <button class="bonding-header-btn challenge-highlight" id="btn-chat-challenge" title="Challenge to Multiplayer Game">
            <span>⚔️</span> <span>Challenge Game</span>
          </button>

          <!-- Clear messages button -->
          <button class="bonding-header-btn" id="btn-clear-chat" title="Clear All Messages in this Chat">
            <span>🧹</span> <span>Clear Chat</span>
          </button>

          ${h?`
            <button class="bonding-header-btn" id="btn-manage-members">
              <span>👥</span> <span>Members (${a})</span>
            </button>
            ${Z?`
              <button class="bonding-header-btn danger" id="btn-delete-group" title="Delete this group (Creator only)">
                <span>🗑️</span> <span>Delete Group</span>
              </button>
            `:`
              <button class="bonding-header-btn danger" id="btn-leave-group" title="Leave this group">
                <span>🚪</span> <span>Leave Group</span>
              </button>
            `}
          `:`
            <button class="bonding-header-btn danger" id="btn-delete-direct" title="Delete 1-on-1 Chat">
              <span>🗑️</span> <span>Delete Chat</span>
            </button>
          `}
        </div>
      </div>

      <div class="bonding-messages-container" id="bonding-messages-feed">
        ${Ve()}
      </div>

      <div class="bonding-chat-input-bar">
        <button class="bonding-input-action-btn" id="btn-quick-emoji" title="Insert Emoji">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
        <button class="bonding-input-action-btn" id="btn-input-challenge" title="Send Multiplayer Challenge">
          <span>🎮</span>
        </button>
        <input
          type="text"
          id="bonding-message-input"
          class="bonding-input-field"
          placeholder="Type a message or challenge to a game... (Press Enter to send)"
          autocomplete="off"
        />
        <button class="bonding-send-btn" id="btn-send-message">
          <span>Send</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `,st(j),ke(j),mt(),e()}function Ve(){if(!O||O.length===0)return`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">👋</div>
          <h4>No messages yet</h4>
          <p>Be the first to say hello or challenge a colleague to a multiplayer game!</p>
        </div>
      `;const d=t?._id||t?.id;return O.map(o=>{const a=o.sender&&o.sender.userId&&d&&o.sender.userId.toString()===d.toString();if(o.type==="system")return`
          <div class="bonding-msg-system" data-msg-id="${o._id}">
            <span>ℹ️</span> <span>${v(o.content)}</span>
            <button class="bonding-msg-del-btn mini" data-msg-id="${o._id}" title="Delete Message">&times;</button>
          </div>
        `;if(o.type==="challenge"&&o.challengeData){const C=o.challengeData,Y=C.gameTitle||"Game Challenge",Z=C.gameType||"dotsboxes",S=Z==="dotsboxes"?"🎮":Z==="ludo"?"🎲":Z==="chess"?"♟️":"❌",A=C.gameState?.invitationId,U=C.targetUserId?.toString(),ae=o.sender?.userId?.toString(),G=d&&U===d.toString(),ne=d&&ae===d.toString();return`
          <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${o._id}">
            <div class="bonding-msg-avatar" title="${v(o.sender?.name||"Teammate")}">
              ${(o.sender?.name||"U").slice(0,1).toUpperCase()}
            </div>
            <div class="bonding-msg-bubble-wrap">
              <div class="bonding-msg-meta">
                <span class="bonding-msg-time">${E(o.createdAt)}</span>
                <button class="bonding-msg-del-btn" data-msg-id="${o._id}" title="Delete Challenge Message">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              <!-- Interactive Game Card -->
              <div class="bonding-game-card-bubble">
                <div class="game-bubble-top">
                  <div class="game-bubble-icon">${S}</div>
                  <div class="game-bubble-details">
                    <h4 class="game-bubble-title">${v(Y)}</h4>
                    <p class="game-bubble-desc">${v(o.content)}</p>
                  </div>
                </div>

                <div class="game-bubble-status">
                  ${C.status==="pending"?'<span class="badge amber">⏳ Awaiting Response</span>':C.status==="active"||C.status==="accepted"?'<span class="badge green">🟢 Match Active</span>':C.status==="declined"?'<span class="badge red">❌ Challenge Declined</span>':C.status==="cancelled"?'<span class="badge gray">🚫 Challenge Cancelled</span>':`<span class="badge gray">${v(C.status?.toUpperCase()||"COMPLETED")}</span>`}
                </div>

                <div class="game-bubble-actions">
                  ${C.status==="pending"&&G?`
                      <button class="game-btn-accept btn-respond-invite" data-invite-id="${A}" data-action="accept">
                        ⚔️ Accept Challenge
                      </button>
                      <button class="game-btn-decline btn-respond-invite" data-invite-id="${A}" data-action="decline">
                        Decline
                      </button>
                    `:C.status==="pending"&&ne?`
                        <div class="game-pending-text">Waiting for opponent to accept...</div>
                        <button class="game-btn-cancel btn-respond-invite" data-invite-id="${A}" data-action="cancel">
                          Cancel
                        </button>
                      `:C.status==="declined"||C.status==="cancelled"?`
                        <div class="game-pending-text" style="font-size:11.5px;color:var(--text-3);font-style:italic;">
                          ${C.status==="declined"?"Challenge was declined":"Challenge was cancelled"}
                        </div>
                      `:`
                        <button class="game-btn-play btn-launch-match-from-card" data-match-id="${C.gameState?.matchId||""}" data-invite-id="${A||""}">
                          🎮 Enter Match Arena
                        </button>
                      `}
                </div>
              </div>

              ${pe(o)}
            </div>
          </div>
        `}const h=v(o.sender?.name||"Teammate"),T=E(o.createdAt),j=pe(o);return`
        <div class="bonding-msg-row ${a?"self":"other"}" data-msg-id="${o._id}">
          <div class="bonding-msg-avatar" title="${h}">${h.slice(0,1).toUpperCase()}</div>
          <div class="bonding-msg-bubble-wrap">
            <div class="bonding-msg-meta">
              <span class="bonding-msg-time">${T}</span>
              <button class="bonding-msg-del-btn" data-msg-id="${o._id}" title="Delete Message">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <div class="bonding-msg-bubble">
              ${v(o.content).replace(/\n/g,"<br/>")}
            </div>
            ${j}
          </div>
        </div>
      `}).join("")}function pe(d){const o=d.reactions||[];return!o||o.length===0?"":`
      <div class="bonding-reactions-row">
        ${o.map(h=>{const T=t?._id||t?.id;return`
        <button class="bonding-rxn-tag ${(h.users||[]).some(C=>C.toString()===T?.toString())?"active":""}" data-msg-id="${d._id}" data-emoji="${h.emoji}">
          <span>${h.emoji}</span> <span>${h.users?h.users.length:1}</span>
        </button>
      `}).join("")}
      </div>
    `}function st(d){const o=s.querySelector("#btn-mobile-back-channels");o&&(o.onclick=Z=>{Z.stopPropagation();const S=s.querySelector("#bonding-chat-main-wrap");S&&(S.classList.remove("mobile-view-chat"),S.classList.add("mobile-view-sidebar"))});const a=s.querySelector("#btn-chat-challenge");a&&(a.onclick=()=>{d?L(null,d.userId||d._id):L()});const h=s.querySelector("#btn-manage-members");h&&(h.onclick=z);const T=s.querySelector("#btn-delete-group");T&&(T.onclick=p);const j=s.querySelector("#btn-leave-group");j&&(j.onclick=M);const C=s.querySelector("#btn-delete-direct");C&&(C.onclick=async()=>{if(c&&confirm("Are you sure you want to delete this 1-on-1 chat? All messages will be permanently removed."))try{C.disabled=!0,await at(`/bonding/channels/${c._id}`),$("1-on-1 chat deleted successfully","success");const Z=c._id;m=m.filter(S=>S._id!==Z),c=m[0]||null,Be(),Re(),c&&await qe(c._id)}catch(Z){$(Z.message||"Could not delete 1-on-1 chat","error"),C.disabled=!1}});const Y=s.querySelector("#btn-clear-chat");Y&&(Y.onclick=async()=>{if(c&&confirm("Are you sure you want to clear all messages in this conversation?"))try{Y.disabled=!0,await at(`/bonding/channels/${c._id}/messages`),$("Chat messages cleared","success"),O=[],b()}catch(Z){$(Z.message||"Could not clear chat messages","error")}finally{Y.disabled=!1}})}function ke(d){const o=s.querySelector("#bonding-message-input"),a=s.querySelector("#btn-send-message"),h=s.querySelector("#btn-quick-emoji"),T=s.querySelector("#btn-input-challenge");o&&o.addEventListener("keydown",j=>{j.key==="Enter"&&!j.shiftKey&&(j.preventDefault(),ct())}),a&&(a.onclick=ct),T&&(T.onclick=()=>{d?L(null,d.userId||d._id):L()}),h&&(h.onclick=j=>{j.stopPropagation(),o&&P(h,C=>{const Y=o.selectionStart??o.value.length,Z=o.selectionEnd??o.value.length,S=o.value;o.value=S.substring(0,Y)+C+S.substring(Z),o.focus();const A=Y+C.length;try{o.setSelectionRange(A,A)}catch{}})})}function mt(){s.querySelectorAll(".btn-respond-invite").forEach(h=>{h.onclick=async()=>{const T=h.dataset.inviteId,j=h.dataset.action;await q(T,j)}}),s.querySelectorAll(".btn-launch-match-from-card").forEach(h=>{h.onclick=async()=>{const T=h.dataset.matchId,j=h.dataset.inviteId;if(T){I(T);return}try{h.disabled=!0;const C=await Me("/bonding/invitations"),Z=(C.incoming||[]).concat(C.sent||[]).find(U=>U._id===j||U.matchId&&U.matchId.toString()===j);if(Z&&Z.matchId){I(Z.matchId);return}const A=(await Me("/bonding/matches").catch(()=>[])||[]).find(U=>U.invitationId===j||U._id===j);if(A){I(A._id);return}$("Match has not started yet or has finished","warning")}catch(C){$(C.message||"Could not load match","error")}finally{h.disabled=!1}}}),s.querySelectorAll(".bonding-msg-del-btn").forEach(h=>{h.onclick=async T=>{T.stopPropagation();const j=h.dataset.msgId;if(confirm("Are you sure you want to delete this message?"))try{h.disabled=!0,await at(`/bonding/messages/${j}`),O=O.filter(C=>C._id!==j),i(),$("Message deleted","success")}catch(C){$(C.message||"Failed to delete message","error"),h.disabled=!1}}}),s.querySelectorAll(".bonding-rxn-tag").forEach(h=>{h.onclick=async()=>{const T=h.dataset.msgId,j=h.dataset.emoji;await ft(T,j)}}),s.querySelectorAll(".bonding-add-rxn-btn").forEach(h=>{h.onclick=T=>{const j=h.dataset.msgId;H(T.currentTarget,async C=>{await ft(j,C)})}})}async function ct(){const d=s.querySelector("#bonding-message-input");if(!d||!c||R)return;const o=d.value.trim();if(o)try{R=!0,d.value="";const a=await ye(`/bonding/channels/${c._id}/messages`,{content:o,type:"text"});O.push(a),b(),e()}catch(a){$(a.message||"Failed to send message","error")}finally{R=!1,d.focus()}}async function ft(d,o){try{const a=await ye(`/bonding/messages/${d}/react`,{emoji:o}),h=O.find(T=>T._id===d);h&&(h.reactions=a,i())}catch(a){$(a.message||"Failed to react","error")}}function e(){const d=s.querySelector("#bonding-messages-feed");d&&(d.scrollTop=d.scrollHeight)}function i(){const d=s.querySelector("#bonding-messages-feed");if(!d)return;const o=d.scrollHeight-d.scrollTop<=d.clientHeight+80;d.innerHTML=Ve(),mt(),o&&e()}function b(){const d=s.querySelector("#bonding-messages-feed");d&&(d.innerHTML=Ve(),mt())}async function y(d=!1){const o=s.querySelector("#bonding-lounge-main-wrap");if(o){d||(o.innerHTML='<div class="bonding-loading-text" style="padding:40px;text-align:center">Loading Games Arena & Live Matches...</div>');try{const a=await Me("/bonding/games/overview");X=a;const h=a.myStats||{},T=a.availableGames||[],j=a.incomingChallenges||[],C=a.sentChallenges||[],Y=a.activeMatches||[],Z=a.recentMatches||[],S=t?._id||t?.id;o.innerHTML=`
        <div class="lounge-container">
          <!-- Top Stats Ribbon -->
          <div class="lounge-stats-ribbon">
            <div class="lounge-stat-card">
              <span class="stat-num">${h.gamesPlayed||0}</span>
              <span class="stat-lbl">Matches Played</span>
            </div>
            <div class="lounge-stat-card highlight">
              <span class="stat-num">${h.wins||0}</span>
              <span class="stat-lbl">Victories 🏆</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${h.losses||0}</span>
              <span class="stat-lbl">Losses</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${h.draws||0}</span>
              <span class="stat-lbl">Draws</span>
            </div>
            <div class="lounge-stat-card">
              <span class="stat-num">${h.gamesPlayed>0?Math.round((h.wins||0)/h.gamesPlayed*100):0}%</span>
              <span class="stat-lbl">Win Rate</span>
            </div>
          </div>

          <!-- Section 1: Available Games Cards -->
          <div class="lounge-section">
            <div class="lounge-section-head">
              <h3>🎮 Available Multiplayer Games</h3>
              <p>Voluntary casual competition with colleagues during breaks. Pick a game and challenge any employee!</p>
            </div>

            <div class="lounge-games-grid">
              ${T.map(A=>`
                <div class="lounge-game-card" data-game-id="${A.id}">
                  <div class="game-card-icon">${A.icon}</div>
                  <div class="game-card-content">
                    <h4 class="game-card-title">${v(A.name)}</h4>
                    <p class="game-card-desc">${v(A.desc)}</p>
                    <div class="game-card-meta">
                      <span class="meta-pill">⏱️ ${A.duration}</span>
                      ${A.id==="ludo"||A.id==="dotsboxes"?`<span class="meta-pill">👥 Up to 4 Players</span><span class="meta-pill">${A.id==="dotsboxes"?"🎮 16 Boxes Grid":"🎯 4 Pawns / Base"}</span>`:'<span class="meta-pill">👥 2 Players</span>'}
                    </div>
                  </div>
                  <button class="lounge-card-challenge-btn btn-challenge-game" data-game-id="${A.id}" data-game-title="${v(A.name)}">
                    ${A.id==="dotsboxes"?"⚔️ Play Dots & Boxes (2P–4P)":A.id==="ludo"?"⚔️ Play Ludo (2P–4P)":"⚔️ Challenge Employee"}
                  </button>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Section 2: Active Matches & Pending Challenges (2-col grid) -->
          <div class="lounge-two-col">
            <!-- Left: Incoming & Sent Challenges -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>📬 Game Invitations</span>
                <span class="badge blue">${j.length+C.length} Total</span>
              </div>

              <!-- Incoming -->
              <h5 class="sub-box-title">Incoming Challenges (${j.length})</h5>
              ${j.length===0?'<div class="box-empty-text">No incoming challenges waiting. Start one with a teammate!</div>':`
                  <div class="lounge-invites-list">
                    ${j.map(A=>`
                      <div class="lounge-invite-item incoming">
                        <div class="invite-left">
                          <div class="invite-avatar">${(A.sender.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(A.gameTitle)}</span>
                            <span class="invite-sender">from <strong>${v(A.sender.name)}</strong> (${v(A.sender.role)})</span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <button class="btn-invite-accept btn-respond-invite" data-invite-id="${A._id}" data-action="accept">
                            Accept ⚔️
                          </button>
                          <button class="btn-invite-decline btn-respond-invite" data-invite-id="${A._id}" data-action="decline">
                            Decline
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

              <!-- Sent -->
              <h5 class="sub-box-title" style="margin-top: 18px;">Sent Challenges (${C.length})</h5>
              ${C.length===0?'<div class="box-empty-text">No pending outgoing invitations.</div>':`
                  <div class="lounge-invites-list">
                    ${C.map(A=>`
                      <div class="lounge-invite-item outgoing">
                        <div class="invite-left">
                          <div class="invite-avatar">${(A.recipient.name||"U").slice(0,1).toUpperCase()}</div>
                          <div class="invite-info">
                            <span class="invite-title">${v(A.gameTitle)}</span>
                            <span class="invite-sender">sent to <strong>${v(A.recipient.name)}</strong></span>
                          </div>
                        </div>
                        <div class="invite-actions">
                          <span class="badge amber">Pending</span>
                          <button class="btn-invite-cancel btn-respond-invite" data-invite-id="${A._id}" data-action="cancel">
                            Cancel
                          </button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}
            </div>

            <!-- Right: Active Matches -->
            <div class="lounge-card-box">
              <div class="lounge-box-title">
                <span>⚡ Active Multiplayer Matches</span>
                <span class="badge green">${Y.length} Live</span>
              </div>

              ${Y.length===0?'<div class="box-empty-text" style="padding: 24px 0">No active matches in progress right now. Accept an invitation or challenge a teammate to begin!</div>':`
                  <div class="lounge-active-matches-list">
                    ${Y.map(A=>{const ae=(A.players||A.gameState?.players||[A.player1,A.player2].filter(Boolean)).filter(oe=>oe.userId&&oe.userId.toString()!==S?.toString()),G=A.player1?.userId?.toString()===S?.toString()?A.player2:A.player1,ne=ae.length>0?ae.map(oe=>v(oe.name)).join(", "):G?.name?v(G.name):"Colleagues",le=S&&A.currentTurnUserId&&A.currentTurnUserId.toString()===S.toString();return`
                        <div class="lounge-active-match-card ${le?"turn-active":""}">
                          <div class="active-match-left">
                            <span class="match-game-icon">${A.gameType==="dotsboxes"?"🎮":A.gameType==="ludo"?"🎲":A.gameType==="chess"?"♟️":"❌"}</span>
                            <div>
                              <div class="match-game-title">${v(A.gameTitle)}</div>
                              <div class="match-opp-text">Opponent(s): <strong>${ne}</strong></div>
                            </div>
                          </div>

                          <div class="active-match-right">
                            <span class="match-turn-tag ${le?"my-turn":"wait"}">
                              ${le?"⚡ Your Turn!":"⏳ Opponent Turn"}
                            </span>
                            <button class="btn-resume-match" data-match-id="${A._id}">
                              Resume Match 🎮
                            </button>
                            <button class="btn-delete-match" data-match-id="${A._id}" title="Delete Match">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      `}).join("")}
                  </div>
                `}
            </div>
          </div>

          <!-- Section 3: Recent Completed Matches -->
          <div class="lounge-section" style="margin-top: 24px;">
            <div class="lounge-section-head" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <h3>📜 Recent Completed Matches</h3>
                <p>Audit results, rematch recent opponents, or review match outcomes.</p>
              </div>
              ${Z.length>0?`
                <button class="btn-clear-matches" id="btn-clear-matches" title="Clear all completed matches">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  <span>Clear History</span>
                </button>
              `:""}
            </div>

            ${Z.length===0?'<div class="box-empty-text">No recently completed matches found.</div>':`
                <div class="lounge-recent-matches-grid">
                  ${Z.map(A=>{const ae=S&&A.player1.userId.toString()===S.toString()?A.player2:A.player1,G=S&&A.winnerId&&A.winnerId.toString()===S.toString(),ne=A.status==="draw";return`
                      <div class="recent-match-card">
                        <div class="recent-card-head">
                          <span class="recent-game-title">${v(A.gameTitle)}</span>
                          <span class="recent-date">${E(A.completedAt||A.updatedAt)}</span>
                          <button class="btn-delete-match mini" data-match-id="${A._id}" title="Delete Match Record">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="recent-card-body">
                          <div>Opponent: <strong>${v(ae.name)}</strong></div>
                          <div class="recent-outcome ${G?"win":ne?"draw":"loss"}">
                            ${G?"🏆 VICTORY":ne?"🤝 DRAW":"DEFEAT"}
                            <span style="font-size:11px;font-weight:normal;color:var(--text-3)">(${v(A.winningReason||A.status)})</span>
                          </div>
                        </div>
                        <div style="display:flex;gap:8px;margin-top:4px;">
                          <button class="btn-recent-rematch" data-match-id="${A._id}" style="flex:1;">
                            🔄 Rematch
                          </button>
                          <button class="btn-delete-match text-btn" data-match-id="${A._id}" title="Delete Match Record">
                            Delete
                          </button>
                        </div>
                      </div>
                    `}).join("")}
                </div>
              `}
          </div>
        </div>
      `,_()}catch(a){o.innerHTML=`
        <div class="bonding-empty-feed">
          <div class="bonding-empty-icon">⚠️</div>
          <h4>Failed to load Games Arena</h4>
          <p>${v(a.message)}</p>
        </div>
      `}}}function _(){s.querySelectorAll(".btn-challenge-game").forEach(o=>{o.onclick=()=>{const a=o.dataset.gameId;L(a)}}),s.querySelectorAll(".btn-respond-invite").forEach(o=>{o.onclick=async()=>{const a=o.dataset.inviteId,h=o.dataset.action;await q(a,h),await y()}}),s.querySelectorAll(".btn-resume-match").forEach(o=>{o.onclick=()=>{const a=o.dataset.matchId;I(a)}}),s.querySelectorAll(".btn-recent-rematch").forEach(o=>{o.onclick=async()=>{const a=o.dataset.matchId;try{o.disabled=!0;const h=await ye(`/bonding/matches/${a}/action`,{action:"rematch"});h.match&&($("Rematch created! Opening arena ⚔️","success"),I(h.match._id))}catch(h){$(h.message||"Could not start rematch","error")}finally{o.disabled=!1}}}),s.querySelectorAll(".btn-delete-match").forEach(o=>{o.onclick=async a=>{a.stopPropagation();const h=o.dataset.matchId;if(confirm("Are you sure you want to delete this match record?"))try{o.disabled=!0,await at(`/bonding/matches/${h}`),$("Match deleted successfully","success"),await y()}catch(T){$(T.message||"Failed to delete match","error")}finally{o.disabled=!1}}});const d=s.querySelector("#btn-clear-matches");d&&(d.onclick=async()=>{if(confirm("Are you sure you want to delete all completed matches in history?"))try{d.disabled=!0,await at("/bonding/matches?filter=completed"),$("Completed matches history cleared","success"),await y()}catch(o){$(o.message||"Failed to clear matches","error")}finally{d.disabled=!1}})}function L(d=null,o=null){const a=s.querySelector("#bonding-modals-root"),h=t?._id||t?.id,T=new Set(["employee","admin","superadmin"]),j=r.filter(G=>!G.isSelf&&G._id.toString()!==h?.toString()&&T.has(G.role));let C=d||"dotsboxes",Y=o?o.toString():null,Z=2,S=Y?[Y]:[],A="none";function U(){const G=j.find(ue=>ue._id.toString()===Y),ne=C==="dotsboxes"||C==="ludo",le=Z-1,oe=S.length===le;a.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card challenge-flow-modal">
            <div class="bonding-modal-header">
              <h3>⚔️ ${C==="dotsboxes"?"Play Dots & Boxes (2P, 3P, 4P)":C==="ludo"?"Play Ludo (2P, 3P, 4P)":"Multiplayer Game Challenge"}</h3>
              <button class="bonding-modal-close">&times;</button>
            </div>

            <div class="bonding-modal-body">
              <!-- Step 1: Select Game -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">Step 1 — Choose Game</div>
                <div class="game-select-pills">
                  <button class="game-pill-btn ${C==="dotsboxes"?"active":""}" data-game="dotsboxes">
                    <span>🎮</span> <span>Dots & Boxes</span>
                  </button>
                  <button class="game-pill-btn ${C==="ludo"?"active":""}" data-game="ludo">
                    <span>🎲</span> <span>Ludo Royale</span>
                  </button>
                  <button class="game-pill-btn ${C==="tictactoe"?"active":""}" data-game="tictactoe">
                    <span>❌</span> <span>Tic-Tac-Toe</span>
                  </button>
                </div>
              </div>

              <!-- MULTIPLAYER: Step 2 Player Count Selector (2P, 3P, 4P) -->
              ${ne?`
                <div class="flow-step-box">
                  <div class="flow-step-lbl">Step 2 — Select Player Mode</div>
                  <div class="ludo-mode-pills">
                    <button class="ludo-mode-btn ${Z===2?"active":""}" data-count="2">
                      👥 2P Duel (1v1)
                    </button>
                    <button class="ludo-mode-btn ${Z===3?"active":""}" data-count="3">
                      ⚔️ 3P Battle (3 Players)
                    </button>
                    <button class="ludo-mode-btn ${Z===4?"active":""}" data-count="4">
                      👑 4P Royale (4 Players)
                    </button>
                  </div>
                </div>
              `:""}

              <!-- Step: Opponent Selection -->
              <div class="flow-step-box">
                <div class="flow-step-lbl">
                  ${ne?`Step ${ne?3:2} — Select Colleagues to Play With (${S.length}/${le} Selected) *`:"Step 2 — Select Employee to Challenge *"}
                </div>
                <div class="emp-search-wrap">
                  <input type="text" id="flow-emp-search" placeholder="🔍 Search employee by name or role..." class="bonding-input" />
                </div>

                <div class="eligible-emp-list" id="eligible-emp-list-wrap">
                  ${j.map(ue=>{const Ee=ne?S.includes(ue._id.toString()):Y===ue._id.toString();return`
                      <div class="eligible-emp-item ${Ee?"selected":""}" data-user-id="${ue._id}">
                        <div class="emp-item-avatar">${ue.name.slice(0,1).toUpperCase()}</div>
                        <div class="emp-item-info">
                          <span class="emp-item-name">${v(ue.name)}</span>
                          <span class="emp-item-role">${v(ue.role==="superadmin"?"Superadmin":ue.role==="admin"?"Admin":"Employee")} · ${v(ue.email||"")}</span>
                        </div>
                        <button class="btn-select-opponent ${Ee?"active":""}">
                          ${Ee?"Selected ✓":"Select"}
                        </button>
                      </div>
                    `}).join("")}
                </div>
              </div>

              <!-- Confirmation Card -->
              <div class="flow-confirmation-card">
                <div class="confirm-head">Match Summary:</div>
                <div class="confirm-body">
                  <div><strong>Game:</strong> ${C==="dotsboxes"?`🎮 Dots & Boxes (${Z} Players)`:C==="ludo"?`🎲 Ludo (${Z} Players · 4 Pawns)`:"❌ Tic-Tac-Toe Challenge"}</div>
                  ${ne?`
                    <div><strong>Opponents:</strong> ${S.length>0?S.map(ue=>{const Ee=j.find(ee=>ee._id.toString()===ue);return Ee?`<strong>${v(Ee.name)}</strong>`:"Colleague"}).join(", "):'<span style="color:#ef4444">⚠️ Please select '+le+" colleague(s)</span>"}</div>
                  `:`
                    <div><strong>Opponent:</strong> ${G?`<strong>${v(G.name)}</strong> (${v(G.role)})`:'<span style="color:#ef4444">⚠️ No employee selected yet</span>'}</div>
                  `}
                </div>
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-challenge-flow">Cancel</button>
              <button class="bonding-btn-primary" id="btn-submit-challenge-flow" ${(ne?!oe:!Y)?"disabled":""}>
                ${C==="dotsboxes"?`Start ${Z}P Dots & Boxes 🎮`:C==="ludo"?`Start ${Z}P Ludo Match 🎲`:"Send Challenge 🚀"}
              </button>
            </div>
          </div>
        </div>
      `,ae()}function ae(){a.querySelector(".bonding-modal-close").onclick=()=>{a.innerHTML=""},a.querySelector("#btn-cancel-challenge-flow").onclick=()=>{a.innerHTML=""},a.querySelectorAll(".game-pill-btn").forEach(le=>{le.onclick=()=>{C=le.dataset.game,U()}}),a.querySelectorAll(".ludo-mode-btn").forEach(le=>{le.onclick=()=>{Z=Number(le.dataset.count),S=S.slice(0,Z-1),U()}});const G=a.querySelector("#flow-emp-search");G&&(G.oninput=le=>{const oe=le.target.value.toLowerCase().trim();a.querySelectorAll(".eligible-emp-item").forEach(ue=>{const Ee=ue.textContent.toLowerCase();ue.style.display=Ee.includes(oe)?"flex":"none"})}),a.querySelectorAll(".eligible-emp-item").forEach(le=>{le.onclick=()=>{const oe=le.dataset.userId;if(C==="dotsboxes"||C==="ludo"){const Ee=Z-1;S.includes(oe)?S=S.filter(ee=>ee!==oe):S.length<Ee?S.push(oe):S[Ee-1]=oe}else Y=oe;U()}});const ne=a.querySelector("#btn-submit-challenge-flow");ne&&(ne.onclick=async()=>{if(C==="dotsboxes"){const le=Z-1;if(S.length<le){$(`Please select ${le} colleague(s) to play with`,"warning");return}try{ne.disabled=!0,ne.textContent="Launching Dots & Boxes...";const oe=await ye("/bonding/matches/instant-dotsboxes",{playerCount:Z,targetUserIds:S});a.innerHTML="",$(`Dots & Boxes match started (${Z} Players)! 🎮`,"success"),oe&&oe._id&&I(oe._id)}catch(oe){$(oe.message||"Failed to start Dots & Boxes match","error"),ne.disabled=!1,ne.textContent=`Start ${Z}P Dots & Boxes 🎮`}return}if(C==="ludo"){const le=Z-1;if(S.length<le){$(`Please select ${le} colleague(s) to play with`,"warning");return}try{ne.disabled=!0,ne.textContent="Launching Match...";const oe=await ye("/bonding/matches/instant-ludo",{playerCount:Z,targetUserIds:S});a.innerHTML="",$(`Ludo match started (${Z} Players)! 🎲`,"success"),oe&&oe._id&&I(oe._id)}catch(oe){$(oe.message||"Failed to start Ludo match","error"),ne.disabled=!1,ne.textContent=`Start ${Z}P Ludo Match 🎲`}return}if(!Y){$("Please select an employee to challenge","warning");return}try{ne.disabled=!0,ne.textContent="Sending Challenge...",await ye("/bonding/invitations",{gameType:C,targetUserId:Y,matchSettings:{timerMode:A},channelId:null}),$("Game challenge delivered to personal chat! Awaiting acceptance ⚔️","success"),a.innerHTML="",await loadChannels();const le=m.find(oe=>oe.type==="direct"&&oe.members?.some(ue=>(ue.userId||ue._id)?.toString()===Y));le?selectChannel(le):c&&await qe(c._id),k==="lounge_games"&&await y()}catch(le){$(le.message||"Could not send challenge","error"),ne.disabled=!1,ne.textContent="Send Challenge 🚀"}})}U()}async function q(d,o){if(!(!d||!o))try{const a=await Jt(`/bonding/invitations/${d}/respond`,{action:o});o==="accept"?($("Challenge accepted! Entering match arena ⚔️","success"),a.match&&I(a.match._id)):o==="decline"?($("Challenge declined","info"),s.querySelectorAll(`[data-invite-id="${d}"]`).forEach(h=>{const T=h.closest(".lounge-invite-item")||h.closest(".bonding-msg-row");T&&T.remove()})):o==="cancel"&&($("Challenge cancelled","info"),s.querySelectorAll(`[data-invite-id="${d}"]`).forEach(h=>{const T=h.closest(".lounge-invite-item")||h.closest(".bonding-msg-row");T&&T.remove()})),c&&await qe(c._id),k==="lounge_games"&&await y()}catch(a){$(a.message||"Action failed","error")}}async function I(d){if(!d)return;V=d,W&&clearInterval(W);const o=s.querySelector("#bonding-modals-root");let a=null,h=null,T=[],j="",C=null,Y=!1,Z=!1,S=0;function A(ee){return ee?JSON.stringify({status:ee.status,turn:ee.currentTurnUserId?.toString(),turnColor:ee.turn,movesCount:ee.moves?.length,dice:ee.gameState?.dice,rolled:ee.gameState?.rolled,lastRoll:ee.gameState?.lastRoll,lastRollColor:ee.gameState?.lastRollColor,lastRollBy:ee.gameState?.lastRollBy,lastActionText:ee.gameState?.lastActionText,tokens:ee.gameState?.tokens,board:ee.gameState?.board,grid:ee.gameState?.grid,fen:ee.gameState?.fen,hLines:ee.gameState?.hLines,vLines:ee.gameState?.vLines,boxes:ee.gameState?.boxes,scores:ee.gameState?.scores,draw:ee.drawOfferedBy?.toString(),rematchOfferedBy:ee.rematchOfferedBy?.toString(),rematchDeclined:!!ee.rematchDeclined}):""}async function U(){try{return a=await Me(`/bonding/matches/${d}`),a}catch(ee){return $(ee.message||"Could not load match","error"),ae(),null}}if(a=await U(),!a)return;j=A(a);function ae(){W&&clearInterval(W),C&&clearTimeout(C),Y=!1,V=null,o.innerHTML="",k==="lounge_games"&&y(!0),c&&qe(c._id,!0)}W=setInterval(async()=>{if(!V||V!==d){clearInterval(W);return}if(!(Z&&Date.now()-S<2500))try{const ee=await Me(`/bonding/matches/${d}`);if(!ee)return;const Se=A(ee);if(Se!==j){if(j=Se,a=ee,ee.rematchDeclined){$("Rematch was declined","info"),ae();return}G()}}catch{}},800);function G(){if(!a)return;const ee=t?._id||t?.id,Se=ee&&a.player1?.userId?.toString()===ee.toString(),Ce=Se?a.player1:a.player2||a.player1,ie=Se&&a.player2||a.player1,fe=ee&&a.currentTurnUserId&&a.currentTurnUserId.toString()===ee.toString(),ve=a.status!=="active";let Oe=[];a.gameState?.players&&Array.isArray(a.gameState.players)&&a.gameState.players.length>0?Oe=a.gameState.players:Oe=[a.player1,a.player2].filter(Boolean);const Ue=[{emoji:"🐻",name:"Gentle Bear"},{emoji:"🦌",name:"Clever Deer"},{emoji:"🦊",name:"Swift Fox"},{emoji:"🦁",name:"Mighty Lion"}];o.innerHTML=`
        <div class="bonding-modal-backdrop">
          <div class="bonding-modal-card game-arena-modal arena-split-layout">
            <!-- Dedicated Top-Right Close Button -->
            <button class="arena-close-btn" id="btn-close-arena" title="Exit Match">&times;</button>

            <!-- Left Sidebar Panel with Players & Controls -->
            <aside class="arena-sidebar-panel">
              <div class="arena-sidebar-players">
                ${Oe.map((ge,je)=>{const Ne=Ue[je]||{emoji:"🎮",name:"Challenger"},Te=ge.userId&&ee&&ge.userId.toString()===ee.toString();let Ae=!1,Le="✕";if(a.gameType==="tictactoe"){const se=ge.assignedRole||(je===0?"X":"O");Ae=(a.turn===se||a.currentTurnUserId&&ge.userId&&a.currentTurnUserId.toString()===ge.userId.toString())&&!ve,Le=se==="O"?"◯":"✕"}else if(a.gameType==="dotsboxes"){const se=a.turn||a.gameState?.turnColor;Ae=(ge.color&&ge.color===se||a.gameState?.turnIndex!==void 0&&a.gameState.turnIndex===je||a.currentTurnUserId&&ge.userId&&a.currentTurnUserId.toString()===ge.userId.toString())&&!ve,Le="⏹"}else if(a.gameType==="ludo"){const se=a.turn||a.gameState?.turnColor;Ae=(ge.color&&ge.color===se||a.currentTurnUserId&&ge.userId&&a.currentTurnUserId.toString()===ge.userId.toString())&&!ve,Le="🎲"}else{const se=ge.assignedRole||(je===0?"white":"black");Ae=(a.turn===se||a.currentTurnUserId&&ge.userId&&a.currentTurnUserId.toString()===ge.userId.toString())&&!ve,Le="♟"}let D="";a.gameType==="dotsboxes"&&a.gameState?.scores?D=` · ${a.gameState.scores[ge.color]||0} pts`:a.gameType==="ludo"&&a.gameState?.tokens&&(D=` · ${(a.gameState.tokens[ge.color]||[]).filter(Fe=>Fe.step>=57).length}/4 Home`);const N=ge.name?ge.name:Ne.name,u=Te?"You":"Opponent";return`
                    <div class="game-sidebar-player-row ${Ae?"active-turn":""}">
                      <div class="turn-indicator-slot">
                        ${Ae?`
                          <div class="turn-pointer-pill">
                            <span class="pill-sym">${Le}</span>
                            <span class="pill-txt">Turn</span>
                          </div>
                        `:""}
                      </div>
                      <div class="game-player-avatar-circle p-color-${je}">
                        <span class="avatar-emoji">${Ne.emoji}</span>
                      </div>
                      <div class="game-player-meta">
                        <div class="game-player-name" title="${v(N)}">${v(N)}</div>
                        <div class="game-player-role">${u}${D}</div>
                      </div>
                    </div>
                  `}).join("")}
              </div>

              <!-- Sidebar Bottom Footer -->
              <div class="arena-sidebar-footer">
                <div class="game-code-display">Game code: <strong>${(a._id||"7370").slice(-4).toUpperCase()}</strong></div>
                <div class="arena-sidebar-divider"></div>
                <div class="arena-sidebar-actions">
                  ${ve?`
                    <button class="sidebar-action-item danger" id="btn-arena-delete-match" type="button" title="Delete Match">
                      <span class="action-icon">🗑️</span>
                      <span>Delete Match</span>
                    </button>
                  `:`
                    <button class="sidebar-action-item" id="btn-arena-draw" type="button" title="Offer Draw to Opponent">
                      <span class="action-icon">🤝</span>
                      <span>Offer Draw</span>
                    </button>
                    <button class="sidebar-action-item" id="btn-arena-resign" type="button" title="Surrender Match">
                      <span class="action-icon">🏳️</span>
                      <span>Surrender</span>
                    </button>
                  `}
                  <button class="sidebar-action-item" id="btn-sidebar-leave" type="button" title="Exit Match">
                    <span class="action-icon">🚪</span>
                    <span>Leave Game</span>
                  </button>
                </div>
              </div>
            </aside>

            <!-- Right Main Arena Canvas -->
            <main class="arena-main-content">
              <!-- Draw Offer Notification -->
              ${a.drawOfferedBy&&a.drawOfferedBy.toString()!==ee?.toString()&&!ve?`
                <div class="arena-draw-offer-banner">
                  <span>🤝 ${v(ie?.name||"Opponent")} has offered a draw. Accept?</span>
                  <div style="display:flex;gap:8px;">
                    <button class="btn-accept-draw" id="btn-confirm-accept-draw">Accept Draw</button>
                    <button class="btn-decline-draw" id="btn-confirm-decline-draw">Decline</button>
                  </div>
                </div>
              `:""}

              <!-- Main Playing Board -->
              <div class="arena-board-wrap">
                ${a.gameType==="dotsboxes"?ne(Se):""}
                ${a.gameType==="chess"?le(Se):""}
                ${a.gameType==="tictactoe"?oe():""}
                ${a.gameType==="ludo"?ue(Se):""}
              </div>

              <!-- Match Result Banner (When finished) -->
              ${ve?`
                <div class="arena-game-over-banner">
                  <div class="game-over-icon">${a.winnerId&&a.winnerId.toString()===ee?.toString()?"🏆":a.status==="draw"?"🤝":"🎖️"}</div>
                  <div class="game-over-text">
                    <h4>${a.winnerId&&a.winnerId.toString()===ee?.toString()?"VICTORY!":a.status==="draw"?"STALEMATE / DRAW":`${v(a.winnerName)} Wins!`}</h4>
                    <p>Reason: ${v(a.winningReason||"Match concluded")}</p>
                  </div>
                  <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                    ${a.rematchOfferedBy&&a.rematchOfferedBy.toString()===ee?.toString()?`
                      <div class="game-pending-text" style="font-size:12px;color:var(--text-2);padding:6px 12px;background:rgba(255,255,255,0.06);border-radius:var(--r-md);border:1px solid rgba(255,255,255,0.1);">
                        ⏳ Rematch requested. Waiting for opponent...
                      </div>
                    `:a.rematchOfferedBy?`
                      <button class="btn-arena-rematch" id="btn-arena-accept-rematch" style="background:#10b981;border-color:#10b981;">
                        ✅ Accept Rematch
                      </button>
                      <button class="btn-arena-action" id="btn-arena-decline-rematch" style="border:1px solid rgba(255,255,255,0.15);">
                        ❌ Decline
                      </button>
                    `:`
                      <button class="btn-arena-rematch" id="btn-arena-rematch-action">
                        🔄 Request Rematch
                      </button>
                    `}
                    <button class="btn-arena-action danger" id="btn-arena-delete-match-ended">
                      🗑️ Delete Match
                    </button>
                  </div>
                </div>
              `:""}
            </main>
          </div>
        </div>
      `,Ee(fe,Se,Ce)}function ne(ee,Se,Ce){const ie=a.gameState||{},fe=ie.rows||4,ve=ie.cols||4,Oe=ie.players||[{...a.player1,color:"red",assignedRole:"red"},{...a.player2,color:"blue",assignedRole:"blue"}],Ue=ie.activeColors||["red","blue"],ge=a.turn||ie.turnColor||"red",je=t?._id||t?.id,Te=(Oe.find(xe=>xe.userId&&xe.userId.toString()===je?.toString())||Oe[0])?.color||(ee?"red":"blue"),Ae=Te===ge&&a.status==="active",Le=ie.scores||{red:0,blue:0,green:0,amber:0},D=ie.hLines||Array(fe+1).fill(null).map(()=>Array(ve).fill(null)),N=ie.vLines||Array(fe).fill(null).map(()=>Array(ve+1).fill(null)),u=ie.boxes||Array(fe).fill(null).map(()=>Array(ve).fill(null)),se={red:{name:"Red",hex:"#ef4444",light:"rgba(239,68,68,0.18)",border:"#f87171"},blue:{name:"Blue",hex:"#3b82f6",light:"rgba(59,130,246,0.18)",border:"#60a5fa"},green:{name:"Green",hex:"#10b981",light:"rgba(16,185,129,0.18)",border:"#34d399"},amber:{name:"Amber",hex:"#f59e0b",light:"rgba(245,158,11,0.18)",border:"#fbbf24"}},re=Oe.find(xe=>xe.color===ge),Fe=re?v(re.name):ge.toUpperCase();let K=[];for(let xe=0;xe<=fe*2;xe++)for(let be=0;be<=ve*2;be++){const Pe=xe%2===0,pt=be%2===0;if(Pe&&pt)K.push(`
              <div class="dots-cell dot-intersection" data-r="${xe/2}" data-c="${be/2}">
                <span class="dots-dot"></span>
              </div>
            `);else if(Pe&&!pt){const Ie=xe/2,De=Math.floor(be/2),we=D[Ie]&&D[Ie][De],Q=!!we,He=we?.color||"",_e=Ae&&!Q&&a.status==="active";K.push(`
              <div 
                class="dots-cell dots-line h-line ${Q?"drawn color-"+He:""} ${_e?"clickable my-color-"+Te:""}"
                data-type="h" 
                data-r="${Ie}" 
                data-c="${De}"
                role="button"
                tabindex="${_e?"0":"-1"}"
                title="${Q?`Drawn by ${v(we.player||He)}`:_e?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else if(!Pe&&pt){const Ie=Math.floor(xe/2),De=be/2,we=N[Ie]&&N[Ie][De],Q=!!we,He=we?.color||"",_e=Ae&&!Q&&a.status==="active";K.push(`
              <div 
                class="dots-cell dots-line v-line ${Q?"drawn color-"+He:""} ${_e?"clickable my-color-"+Te:""}"
                data-type="v" 
                data-r="${Ie}" 
                data-c="${De}"
                role="button"
                tabindex="${_e?"0":"-1"}"
                title="${Q?`Drawn by ${v(we.player||He)}`:_e?"Click to draw line":""}"
              >
                <div class="dots-line-bar"></div>
              </div>
            `)}else{const Ie=Math.floor(xe/2),De=Math.floor(be/2),we=u[Ie]&&u[Ie][De],Q=!!we,He=we?.owner||"",_e=we?.ownerName?we.ownerName.charAt(0).toUpperCase():He.charAt(0).toUpperCase();K.push(`
              <div class="dots-cell dots-box ${Q?"claimed color-"+He:""}" data-br="${Ie}" data-bc="${De}">
                ${Q?`
                  <div class="dots-box-claim-badge">
                    <span class="box-owner-initial">${_e}</span>
                    <span class="box-score-tag">+1</span>
                  </div>
                `:""}
              </div>
            `)}}return`
        <div class="dotsboxes-arena-layout">
          <!-- Scoreboard Header for up to 4 Players -->
          <div class="dotsboxes-scoreboard">
            ${Ue.map(xe=>{const be=Oe.find(De=>De.color===xe)||{name:se[xe].name},Pe=ge===xe&&a.status==="active",pt=be.userId&&be.userId.toString()===je?.toString(),Ie=Le[xe]||0;return`
                <div class="dots-player-card ${xe} ${Pe?"is-turn-active":""}">
                  <div class="dots-player-header">
                    <span class="dots-player-dot" style="background:${se[xe].hex}"></span>
                    <span class="dots-player-name">${v(be.name)} ${pt?"(You)":""}</span>
                    ${Pe?'<span class="dots-turn-pill">TURN</span>':""}
                  </div>
                  <div class="dots-player-score">
                    <span class="score-val" style="color:${se[xe].hex}">${Ie}</span>
                    <span class="score-lbl">boxes</span>
                  </div>
                </div>
              `}).join("")}
          </div>

          <!-- Board Grid Container (9x9) -->
          <div class="dotsboxes-board-wrapper">
            <div class="dotsboxes-grid">
              ${K.join("")}
            </div>
          </div>

          <!-- Console & Status Bar -->
          <div class="dotsboxes-console-bar">
            <div class="dots-guidance ${Ae?"highlight":""}">
              ${Ae?`👉 It is your turn (<strong>${se[Te].name}</strong>)! Click any open line between two dots to draw.`:`⏳ Waiting for <strong>${Fe}</strong> (<strong>${se[ge]?.name||ge}</strong>) to draw a line...`}
            </div>
            <div class="dots-caption">
              ${v(ie.lastActionText||"Connect 4 sides to claim a box and earn a bonus turn!")}
            </div>
          </div>
        </div>
      `}function le(ee){const Se=a.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",Ce=new Sa(Se),ie=ee?a.player1.assignedRole==="white":a.player2.assignedRole==="white",fe={p:"♟",r:"♜",n:"♞",b:"♝",q:"♛",k:"♚",P:"♙",R:"♖",N:"♘",B:"♗",Q:"♕",K:"♔"},ve=ie?["a","b","c","d","e","f","g","h"]:["h","g","f","e","d","c","b","a"],Oe=ie?[8,7,6,5,4,3,2,1]:[1,2,3,4,5,6,7,8];let Ue='<div class="chess-board-grid">';for(const Ne of Oe)for(const Te of ve){const Ae=`${Te}${Ne}`,Le=Ce.get(Ae),D=(Te.charCodeAt(0)-97+Ne)%2!==0,N=h===Ae,u=T.includes(Ae),se=Le?Le.color==="w"?fe[Le.type.toUpperCase()]:fe[Le.type]:"";Ue+=`
            <div class="chess-sq ${D?"light":"dark"} ${N?"selected":""} ${u?"legal-dot":""}" data-square="${Ae}">
              ${se?`<span class="chess-piece ${Le.color==="w"?"white-piece":"black-piece"}">${se}</span>`:""}
            </div>
          `}Ue+="</div>";const je=(a.moves||[]).map(Ne=>`
        <span class="chess-move-token">${Ne.moveNum}. ${Ne.moveData?.san||""}</span>
      `).join(" ");return`
        <div class="chess-arena-layout">
          ${Ue}
          <div class="chess-sidebar-notation">
            <div class="notation-head">Move Notation</div>
            <div class="notation-feed">${je||'<span class="muted">No moves yet</span>'}</div>
          </div>
        </div>
      `}function oe(){const ee=a.gameState?.board||Array(9).fill(null),Se=a.winningCells||[];return`
        <div class="ttt-modern-court">
          <div class="ttt-modern-grid">
            ${ee.map((Ce,ie)=>{const fe=Se.includes(ie);let ve="";return Ce==="X"?ve=`
                  <svg class="ttt-svg-symbol x" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <line x1="15" y1="15" x2="43" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                    <line x1="43" y1="15" x2="15" y2="43" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
                  </svg>
                `:Ce==="O"&&(ve=`
                  <svg class="ttt-svg-symbol o" width="58" height="58" viewBox="0 0 58 58" fill="none">
                    <circle cx="29" cy="29" r="16" stroke="#FF2A5F" stroke-width="8" fill="none"/>
                  </svg>
                `),`
                <div class="ttt-cell ttt-modern-tile ${Ce?"filled":"empty"} ${fe?"win-cell":""}" data-cell-idx="${ie}">
                  ${ve}
                </div>
              `}).join("")}
          </div>
        </div>
      `}function ue(ee,Se,Ce){const ie=a.gameState||{},fe=ie.activeColors||["red","green"],ve=ie.players||[{...a.player1,color:"red",assignedRole:"red",isBot:!1},{...a.player2,color:"green",assignedRole:"green",isBot:!1}],Oe=ie.tokens||{},Ue=l=>{const x=Oe[l]||(l==="red"?ie.p1Tokens:l==="green"?ie.p2Tokens:[])||[];return Array.from({length:4},(J,te)=>x[te]||{id:te,step:-1})},ge=Ue("red"),je=Ue("green"),Ne=Ue("yellow"),Te=Ue("blue"),Ae=t?._id||t?.id,D=(ve.find(l=>l.userId&&l.userId.toString()===Ae?.toString())||ve[0])?.color||(ee?"red":"green"),N=ie.turnColor||a.turn||"red",u=D===N&&a.status==="active",se=!!ie.rolled,re=ie.dice,Fe=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]],K=[[7,1],[7,2],[7,3],[7,4],[7,5]],xe=[[1,7],[2,7],[3,7],[4,7],[5,7]],be=[[7,13],[7,12],[7,11],[7,10],[7,9]],Pe=[[13,7],[12,7],[11,7],[10,7],[9,7]],pt=[0,8,13,21,26,34,39,47];function Ie(l,x){return x<0?null:x>=56?l==="red"?[7,6]:l==="green"?[6,7]:l==="yellow"?[7,8]:[8,7]:l==="red"?x<=50?Fe[x]:K[x-51]:l==="green"?x<=50?Fe[(13+x)%52]:xe[x-51]:l==="yellow"?x<=50?Fe[(26+x)%52]:be[x-51]:x<=50?Fe[(39+x)%52]:Pe[x-51]}function De(l,x){return l!==D||!u||!se||!re||a.status!=="active"?!1:x.step===-1?re===6:x.step>=0&&x.step+re<=56}const we={},Q=(l,x)=>{x.forEach(J=>{if(J.step>=0&&J.step<56){const te=Ie(l,J.step);if(te){const he=te[0]+","+te[1];(we[he]=we[he]||[]).push({color:l,id:J.id,step:J.step,movable:De(l,J)})}}})};fe.includes("red")&&Q("red",ge),fe.includes("green")&&Q("green",je),fe.includes("yellow")&&Q("yellow",Ne),fe.includes("blue")&&Q("blue",Te);const He={};Fe.forEach(([l,x],J)=>{He[l+","+x]=J});const _e={};K.forEach(([l,x],J)=>{_e[l+","+x]=J+1});const Qe={};xe.forEach(([l,x],J)=>{Qe[l+","+x]=J+1});const ht={};be.forEach(([l,x],J)=>{ht[l+","+x]=J+1});const Ut={};Pe.forEach(([l,x],J)=>{Ut[l+","+x]=J+1});const Ht=[];for(let l=0;l<15;l++)for(let x=0;x<15;x++){if(l<6&&x<6||l<6&&x>8||l>8&&x<6||l>8&&x>8||l>=6&&l<=8&&x>=6&&x<=8)continue;const J=l+","+x,te=He[J],he=te!==void 0&&pt.includes(te),ot=l===6&&x===1,ut=l===1&&x===8,it=l===8&&x===13,Wt=l===13&&x===6,Ia=_e[J],Aa=Qe[J],Da=ht[J],_a=Ut[J];let xt="ludo-cell";ot?xt+=" cell-red-start":ut?xt+=" cell-green-start":it?xt+=" cell-yellow-start":Wt?xt+=" cell-blue-start":Ia?xt+=" cell-red-stretch":Aa?xt+=" cell-green-stretch":Da?xt+=" cell-yellow-stretch":_a?xt+=" cell-blue-stretch":he&&(xt+=" cell-safe-star");const Ea=we[J]||[];Ht.push(`
            <div class="${xt}" style="grid-row:${l+1};grid-column:${x+1}" data-pos="${J}">
              ${he?'<span class="cell-star-glyph">⭐</span>':""}
              ${ot||ut||it||Wt?'<span class="cell-arrow-glyph">➔</span>':""}
              ${Ea.map(At=>`
                <div class="ludo-token token-${At.color} ${At.movable?"movable":""}" data-token-id="${At.id}" data-color="${At.color}" title="${At.color.toUpperCase()} Pawn ${At.id+1}">
                  <span>${At.id+1}</span>
                </div>
              `).join("")}
            </div>
          `)}function ea(l,x=!1){if(x||!l)return`
            <div class="ludo-direct-number-box num-prompt" role="img" aria-label="Dice ready">
              <span class="ludo-direct-num prompt-icon" style="font-size:30px;line-height:1;">🎲</span>
            </div>
          `;const J=Math.max(1,Math.min(6,Number(l)||1));return`
          <div class="ludo-direct-number-box num-${J}" role="img" aria-label="Number ${J}">
            <span class="ludo-direct-num">${J}</span>
          </div>
        `}function It(l,x,J,te,he){const ot=`${l}-yard`;if(!J)return`
            <div class="ludo-yard ${ot}">
              <div class="yard-box decorative">
                <div class="yard-title">${x} (Inactive)</div>
              </div>
            </div>
          `;const ut=he.filter(it=>it.step===56).length;return`
          <div class="ludo-yard ${ot} ${N===l?"yard-active-turn":""}">
            <div class="yard-box">
              <div class="yard-title">
                <span>${x}</span>
                ${ut>0?`<span class="yard-home-badge" title="${ut} of 4 pawns reached Home!">👑 ${ut}/4 Home</span>`:""}
                ${te?`<small class="yard-player-lbl">${v(te.name)}${te.isBot?" 🤖":""}</small>`:""}
              </div>
              <div class="yard-slots">
                ${he.map((it,Wt)=>`
                  <div class="yard-token-slot ${it.step===56?"slot-home":""}">
                    ${it.step===-1?`
                      <div class="ludo-token token-${l} ${De(l,it)?"movable":""}" data-token-id="${it.id}" data-color="${l}" title="${l.toUpperCase()} Pawn ${it.id+1}">
                        <span>${it.id+1}</span>
                      </div>
                    `:it.step===56?`
                      <div class="ludo-token token-reached-home token-${l}" title="${l.toUpperCase()} Pawn ${it.id+1} Reached Home! 👑">
                        <span class="home-crown-mini">👑</span>
                        <span>${it.id+1}</span>
                      </div>
                    `:`<span class="slot-empty">${Wt+1}</span>`}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `}const Mt=ve.find(l=>l.color==="red"),Gt=ve.find(l=>l.color==="green"),ta=ve.find(l=>l.color==="yellow"),aa=ve.find(l=>l.color==="blue"),qt=ve.find(l=>l.color===N)||(N==="red"?Mt:Gt),vt=qt?v(qt.name):N.toUpperCase(),na={red:"🔴",green:"🟢",yellow:"🟡",blue:"🔵"}[N]||"🔴",gt=!!(se&&(re||ie.lastRoll&&ie.lastRollColor===N)),yt=re||(gt?ie.lastRoll:null),Pt=u&&!gt&&a.status==="active",w=Ue(D).filter(l=>De(D,l));return`
        <div class="ludo-arena-layout">
          <div class="ludo-board-grid">
            <!-- 1. Red Base Yard (Top-Left 6x6) -->
            ${It("red","🔴 Red Base",fe.includes("red"),Mt,ge)}

            <!-- 2. Green Base Yard (Top-Right 6x6) -->
            ${It("green","🟢 Green Base",fe.includes("green"),Gt,je)}

            <!-- 3. Blue Base Yard (Bottom-Left 6x6) -->
            ${It("blue","🔵 Blue Base",fe.includes("blue"),aa,Te)}

            <!-- 4. Yellow Base Yard (Bottom-Right 6x6) -->
            ${It("yellow","🟡 Yellow Base",fe.includes("yellow"),ta,Ne)}

            <!-- 5. Center Home Victory Zone (3x3) with celebratory crowned pawns -->
            <div class="ludo-center-home">
              <div class="home-triangle red-tri">
                ${ge.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn red" title="Red Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle green-tri">
                ${je.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn green" title="Green Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle yellow-tri">
                ${Ne.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn yellow" title="Yellow Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-triangle blue-tri">
                ${Te.filter(l=>l.step===56).map(l=>`<div class="home-tri-pawn blue" title="Blue Pawn ${l.id+1} Home! 👑">👑${l.id+1}</div>`).join("")}
              </div>
              <div class="home-center-core">
                <span class="home-crown">🏆</span>
                <div class="home-finished-tokens">
                  ${[...ge.filter(l=>l.step===56).map(l=>({col:"red",id:l.id})),...je.filter(l=>l.step===56).map(l=>({col:"green",id:l.id})),...Ne.filter(l=>l.step===56).map(l=>({col:"yellow",id:l.id})),...Te.filter(l=>l.step===56).map(l=>({col:"blue",id:l.id}))].map(l=>`
                    <div class="tok-home-champion ${l.col}" title="${l.col.toUpperCase()} Pawn ${l.id+1} Reached Home! 👑">
                      <span class="champ-crown">👑</span>
                      <span class="champ-num">${l.id+1}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- 6. All Track Cells -->
            ${Ht.join("")}
          </div>

          <!-- Ludo Action & Interactive Dice Console -->
          <div class="ludo-interactive-console">
            <div class="ludo-dice-interactive-box">
              <div 
                class="ludo-3d-dice ${Pt?"clickable":""} ${gt?"just-rolled":""} border-${N}"
                id="btn-interactive-ludo-dice"
                role="button"
                tabindex="${Pt?"0":"-1"}"
                title="${Pt?"Tap dice to roll!":u?"Choose a pawn to move":gt?`${vt} rolled ${yt}`:`Waiting for ${vt} to roll`}"
                style="${Pt?"cursor:pointer;touch-action:manipulation;":""}"
              >
                ${ea(yt,!gt)}
              </div>
            </div>

            <div class="ludo-console-status-pane">
              <div class="ludo-turn-indicator-bar">
                <span class="ludo-turn-dot ${N}"></span>
                <span class="ludo-turn-player-tag">
                  <strong>${vt}</strong> (${N.toUpperCase()})
                </span>
                ${u?'<span class="badge green" style="font-size:10px;padding:2px 6px;">YOUR TURN</span>':`<span class="badge blue" style="font-size:10px;padding:2px 6px;">OPPONENT'S TURN</span>`}
              </div>

              <div class="ludo-guidance-message ${u&&gt?"highlight":""}">
                ${u&&!gt&&a.status==="active"?"👉 It is your turn! <strong>Click the dice</strong> to roll!":u&&gt&&a.status==="active"?w.length>0?w.length===1?`🎲 Rolled <strong>${yt}</strong>! Auto-advancing single pawn...`:`🎲 Rolled <strong>${yt}</strong>! Tap your <strong>glowing pawn</strong> to move!`:`🎲 Rolled <strong>${yt}</strong>. No legal moves possible — turn passing...`:a.status==="active"?gt?`🎲 ${na} <strong>${vt}</strong> rolled <strong>${yt}</strong>!`:`⏳ Waiting for <strong>${vt}</strong> to roll the dice...`:"🏁 Match Concluded"}
              </div>

              <div class="ludo-last-action-caption">
                ${v(ie.lastActionText||"Match live!")}
              </div>
            </div>
          </div>
        </div>
      `}function Ee(ee,Se,Ce){const ie=o.querySelector("#btn-close-arena");ie&&(ie.onclick=ae);const fe=o.querySelector("#btn-sidebar-leave");fe&&(fe.onclick=ae);const ve=o.querySelector("#btn-arena-settings");ve&&(ve.onclick=()=>{$(`🎮 ${a.gameTitle} • Code ${(a._id||"7370").slice(-4).toUpperCase()} • Audio & Visual cues enabled`,"info")});const Oe=o.querySelector("#btn-arena-resign");Oe&&(Oe.onclick=async()=>{if(confirm("Are you sure you want to resign this match?"))try{Oe.disabled=!0,await ye(`/bonding/matches/${d}/action`,{action:"resign"}),await U(),G()}catch(D){$(D.message||"Resign failed","error"),Oe.disabled=!1}});const Ue=o.querySelector("#btn-arena-draw");Ue&&(Ue.onclick=async()=>{try{await ye(`/bonding/matches/${d}/action`,{action:"offer_draw"}),$("Draw offer sent to opponent","info"),await U(),G()}catch(D){$(D.message||"Draw offer failed","error")}});const ge=o.querySelector("#btn-confirm-accept-draw");ge&&(ge.onclick=async()=>{try{await ye(`/bonding/matches/${d}/action`,{action:"accept_draw"}),$("Draw agreed!","info"),await U(),G()}catch(D){$(D.message,"error")}});const je=o.querySelector("#btn-confirm-decline-draw");je&&(je.onclick=async()=>{try{await ye(`/bonding/matches/${d}/action`,{action:"decline_draw"}),await U(),G()}catch(D){$(D.message,"error")}}),[o.querySelector("#btn-arena-delete-match"),o.querySelector("#btn-arena-delete-match-ended")].filter(Boolean).forEach(D=>{D.onclick=async()=>{if(confirm("Are you sure you want to permanently delete this match?"))try{D.disabled=!0,await at(`/bonding/matches/${d}`),$("Match deleted","success"),ae(),k==="lounge_games"&&await y()}catch(N){$(N.message||"Failed to delete match","error"),D.disabled=!1}}});const Te=o.querySelector("#btn-arena-rematch-action");Te&&(Te.onclick=async()=>{try{Te.disabled=!0,Te.textContent="Requesting...";const D=await ye(`/bonding/matches/${d}/action`,{action:"rematch_request"});D.match&&(a=D.match,j=A(D.match),G(),$("Rematch request sent! Waiting for opponent ⚔️","info"))}catch(D){$(D.message||"Rematch request failed","error"),Te.disabled=!1,Te.textContent="🔄 Request Rematch"}});const Ae=o.querySelector("#btn-arena-accept-rematch");Ae&&(Ae.onclick=async()=>{try{Ae.disabled=!0,Ae.textContent="Starting...";const D=await ye(`/bonding/matches/${d}/action`,{action:"rematch_accept"});D.match&&(a=D.match,j=A(D.match),$("Rematch started! Same game is live ⚔️","success"),G())}catch(D){$(D.message||"Could not accept rematch","error"),Ae.disabled=!1}});const Le=o.querySelector("#btn-arena-decline-rematch");if(Le&&(Le.onclick=async()=>{try{await ye(`/bonding/matches/${d}/action`,{action:"rematch_decline"}),$("Rematch declined","info"),ae()}catch{ae()}}),a.gameType==="dotsboxes"&&ee&&a.status==="active"&&o.querySelectorAll(".dots-line.clickable").forEach(D=>{D.onclick=async()=>{const N=D.dataset.type,u=D.dataset.r,se=D.dataset.c;try{D.style.opacity="0.5";const re=await ye(`/bonding/matches/${d}/move`,{type:N,r:u,c:se});a=re,j=A(re),G()}catch(re){D.style.opacity="1",$(re.message||"Failed to draw line","error")}}}),a.gameType==="chess"&&ee&&a.status==="active"){const D=a.gameState?.fen||"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",N=new Sa(D),u=Ce.assignedRole==="white"?"w":"b";o.querySelectorAll(".chess-sq").forEach(se=>{se.onclick=async()=>{const re=se.dataset.square;if(h){if(h===re){h=null,T=[],G();return}if(T.includes(re)){const K=N.get(h);let xe;K&&K.type==="p"&&(re.endsWith("8")||re.endsWith("1"))&&(xe=prompt("Pawn Promotion! Choose: q (Queen), r (Rook), b (Bishop), n (Knight)","q")||"q");try{const be={from:h,to:re,promotion:xe?xe.toLowerCase():void 0};h=null,T=[],a=await ye(`/bonding/matches/${d}/move`,{move:be}),G()}catch(be){$(be.message||"Illegal chess move","error"),h=null,T=[],G()}return}}const Fe=N.get(re);Fe&&Fe.color===u?(h=re,T=N.moves({square:re,verbose:!0}).map(xe=>xe.to),G()):(h=null,T=[],G())}})}if(a.gameType==="tictactoe"&&ee&&a.status==="active"&&o.querySelectorAll(".ttt-cell.empty").forEach(D=>{D.onclick=async()=>{const N=D.dataset.cellIdx;try{D.style.opacity="0.5",a=await ye(`/bonding/matches/${d}/move`,{cellIndex:Number(N)}),G()}catch(u){$(u.message||"Invalid move","error")}}}),a.gameType==="ludo"&&a.status==="active"){const D=a.gameState||{},N=!!D.rolled,u=D.turnColor||a.turn||"red",se=!!(N&&(D.dice||D.lastRoll&&D.lastRollColor===u)),re=t?._id||t?.id,Fe=D.players||[{...a.player1,color:"red",assignedRole:"red",isBot:!1},{...a.player2,color:"green",assignedRole:"green",isBot:!1}],K=re&&a.player1.userId.toString()===re.toString(),be=(Fe.find(we=>we.userId&&we.userId.toString()===re?.toString())||(K?Fe[0]:Fe[1]))?.color||(K?"red":"green"),Pe=be===u&&a.status==="active",pt=Fe.find(we=>we.color===u)||(u==="red"?a.player1:a.player2),Ie=v(pt?.name||(u==="red"?"Player 1":"Player 2")),De=o.querySelector("#btn-interactive-ludo-dice");if(De){const we=async Q=>{if(Q&&(Q.preventDefault(),Q.stopPropagation()),!Pe){$(`${Ie}'s turn right now`,"info");return}if(se){$("Dice already rolled! Tap your glowing pawn to move.","info");return}if(a.status!=="active"){$("Match has ended","info");return}if(Z||De.dataset.rolling==="true")return;Z=!0,S=Date.now(),De.dataset.rolling="true",De.classList.add("rolling");let He=0;const _e=setInterval(()=>{He++;const Qe=Math.floor(Math.random()*6)+1;De.innerHTML=renderNumberDisplay(Qe),He>=4&&clearInterval(_e)},50);try{const Qe=await ye(`/bonding/matches/${d}/move`,{action:"roll"});clearInterval(_e),a=Qe,j=A(Qe),G()}catch(Qe){clearInterval(_e),$(Qe.message||"Failed to roll dice","error"),De&&(delete De.dataset.rolling,De.classList.remove("rolling"))}finally{Z=!1}};De.onclick=we,De.onkeydown=Q=>{(Q.key==="Enter"||Q.key===" ")&&(Q.preventDefault(),we(Q))}}if(Pe&&se){const Q=(D.tokens||{})[be]||[],He=D.dice||D.lastRoll||0,_e=Q.filter(Qe=>Qe.step===-1&&He===6||Qe.step>=0&&Qe.step+He<=56);if(_e.length===1&&!Y){Y=!0;const Qe=_e[0];C&&clearTimeout(C),C=setTimeout(async()=>{try{const ht=await ye(`/bonding/matches/${d}/move`,{action:"move",tokenId:Number(Qe.id)});a=ht,j=A(ht),Y=!1,G()}catch(ht){Y=!1,$(ht.message||"Auto-move failed","error")}},400)}}Pe&&N&&o.querySelectorAll(".ludo-token.movable").forEach(we=>{we.onclick=async Q=>{Q.stopPropagation();const He=we.dataset.tokenId;try{we.style.opacity="0.5";const _e=await ye(`/bonding/matches/${d}/move`,{action:"move",tokenId:Number(He)});a=_e,j=A(_e),G()}catch(_e){$(_e.message||"Invalid token move","error"),we.style.opacity="1"}}})}}G()}function z(){if(!c||c.type==="direct")return;const d=s.querySelector("#bonding-modals-root"),o=S=>S==="employee"||S==="admin"||S==="superadmin",a=c.members||[],h=new Set(a.map(S=>S.userId?.toString())),T=r.filter(S=>o(S.role)&&!h.has(S._id.toString()));d.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Group Members · ${v(c.name)}</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>

          <div class="bonding-modal-body">
            <!-- Add New Member Section -->
            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Colleague to this Group (Employees & Admins only):</label>
              <div class="bonding-add-member-row">
                <select id="sel-add-colleague" class="bonding-select">
                  <option value="">Select an employee or admin to add...</option>
                  ${T.map(S=>`
                    <option value="${S._id}">${v(S.name)} (${v(S.role==="superadmin"?"Superadmin":S.role==="admin"?"Admin":"Employee")})</option>
                  `).join("")}
                </select>
                <button class="bonding-btn-primary" id="btn-submit-add-member" ${T.length===0?"disabled":""}>
                  Add to Group
                </button>
              </div>
              ${T.length===0?'<div class="bonding-hint-text">All active employees and administrators are already members of this group!</div>':""}
            </div>

            <!-- Current Members List -->
            <div class="bonding-form-section" style="margin-top: 20px;">
              <label class="bonding-form-label">Current Members (${a.length}):</label>
              <div class="bonding-members-list">
                ${a.map(S=>{const A=t?._id||t?.id,U=A&&S.userId&&S.userId.toString()===A.toString(),ae=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(A),G=g==="superadmin"||t?.role==="superadmin",ne=ae||G;return`
                    <div class="bonding-member-item">
                      <div class="bonding-member-left">
                        <div class="bonding-member-avatar">${(S.name||"U").slice(0,1).toUpperCase()}</div>
                        <div class="bonding-member-info">
                          <span class="bonding-member-name">${v(S.name)} ${U?'<span class="you-badge">(You)</span>':""}</span>
                          <span class="bonding-member-role">${v(S.role||"Member")}</span>
                        </div>
                      </div>
                      <div class="bonding-member-actions">
                        ${U?`
                          <button class="bonding-btn-danger btn-leave-group-action" data-user-id="${S.userId}">
                            🚪 Leave Group
                          </button>
                        `:ne?`
                          <button class="bonding-btn-danger btn-remove-member" data-user-id="${S.userId}" data-name="${v(S.name)}">
                            Remove
                          </button>
                        `:""}
                      </div>
                    </div>
                  `}).join("")}
              </div>
            </div>

            ${(()=>{const S=t?._id||t?.id,A=c.createdBy&&c.createdBy.userId&&String(c.createdBy.userId)===String(S),U=g==="superadmin"||t?.role==="superadmin";return A||U?`
                <!-- Delete Group Option in Modal (Creator only) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Delete Group</strong>
                    <span>Permanently delete this group lounge and remove all its messages.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-delete-group">
                    Delete Group
                  </button>
                </div>
              `:`
                <!-- Leave Group Option in Modal (Members) -->
                <div class="bonding-danger-zone">
                  <div class="danger-zone-text">
                    <strong>Leave Group</strong>
                    <span>Exit this group lounge. You can rejoin if invited again.</span>
                  </div>
                  <button class="bonding-btn-danger" id="btn-modal-leave-group">
                    🚪 Leave Group
                  </button>
                </div>
              `})()}
          </div>
        </div>
      </div>
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""};const j=d.querySelector("#btn-modal-delete-group");j&&(j.onclick=()=>{d.innerHTML="",p()});const C=d.querySelector("#btn-modal-leave-group");C&&(C.onclick=()=>{d.innerHTML="",M()}),d.querySelectorAll(".btn-leave-group-action").forEach(S=>{S.onclick=()=>{d.innerHTML="",M()}});const Y=d.querySelector("#btn-submit-add-member");Y&&(Y.onclick=async()=>{const A=d.querySelector("#sel-add-colleague").value;if(!A){$("Please select a colleague to add","warning");return}try{Y.disabled=!0,Y.textContent="Adding...";const U=await Jt(`/bonding/channels/${c._id}/members`,{action:"add",userIds:[A]});$("Colleague added to group! 🎉","success"),c=U.channel,d.innerHTML="",await qe(c._id),Re()}catch(U){$(U.message||"Failed to add member","error"),Y.disabled=!1,Y.textContent="Add to Group"}}),d.querySelectorAll(".btn-remove-member").forEach(S=>{S.onclick=async()=>{const A=S.dataset.userId,U=S.dataset.name;if(confirm(`Are you sure you want to remove ${U} from this group?`))try{S.disabled=!0;const ae=await Jt(`/bonding/channels/${c._id}/members`,{action:"remove",userId:A});$(`${U} removed from group`,"info"),c=ae.channel,d.innerHTML="",await qe(c._id),Re()}catch(ae){$(ae.message||"Failed to remove member","error"),S.disabled=!1}}})}async function M(){if(!c||c.type==="direct")return;const d=c.name;if(confirm(`Are you sure you want to leave the group "${d}"?`))try{await ye(`/bonding/channels/${c._id}/leave`,{}),$(`You left "${d}"`,"info"),m=await Me("/bonding/channels").catch(()=>[]),c=m.find(a=>a.type==="group")||m[0]||null,Be(),Re(),c&&await qe(c._id)}catch(a){$(a.message||"Failed to leave group","error")}}async function p(){if(!c||c.type==="direct")return;const d=c.name;if(confirm(`Are you sure you want to delete the group "${d}"?

All messages in this lounge will be deleted.`))try{await at(`/bonding/channels/${c._id}`),$(`Group "${d}" deleted successfully`,"success"),m=await Me("/bonding/channels").catch(()=>[]),c=m.find(a=>a.type==="group")||m[0]||null,Be(),Re(),c&&await qe(c._id)}catch(a){$(a.message||"Failed to delete group","error")}}function B(){const d=s.querySelector("#bonding-modals-root"),o=T=>T==="employee"||T==="admin"||T==="superadmin",a=r.filter(T=>!T.isSelf&&o(T.role));d.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>💬 Start a Personal Direct Chat</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <p class="bonding-hint-text">Choose any employee or administrator to start a 1-on-1 private conversation.</p>
            <div class="bonding-user-pick-list">
              ${a.map(T=>`
                <div class="bonding-user-pick-item" data-user-id="${T._id}" data-name="${v(T.name)}">
                  <div class="bonding-member-avatar">${T.name.slice(0,1).toUpperCase()}</div>
                  <div class="bonding-user-pick-info">
                    <span class="user-pick-name">${v(T.name)}</span>
                    <span class="user-pick-role">${v(T.role==="superadmin"?"Superadmin":T.role==="admin"?"Admin":"Employee")} · ${v(T.email||"")}</span>
                  </div>
                  <button class="bonding-btn-primary">Chat Now</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelectorAll(".bonding-user-pick-item").forEach(T=>{T.onclick=async()=>{const j=T.dataset.userId;try{const C=await ye("/bonding/channels",{type:"direct",targetUserId:j});d.innerHTML="",m=await Me("/bonding/channels"),c=m.find(Y=>Y._id===C._id)||C,Be(),Re(),await qe(c._id)}catch(C){$(C.message||"Failed to open personal chat","error")}}})}function f(){const d=s.querySelector("#bonding-modals-root"),o=C=>C==="employee"||C==="admin"||C==="superadmin",a=r.filter(C=>!C.isSelf&&o(C.role));d.innerHTML=`
      <div class="bonding-modal-backdrop">
        <div class="bonding-modal-card">
          <div class="bonding-modal-header">
            <h3>👥 Create a New Group Lounge</h3>
            <button class="bonding-modal-close">&times;</button>
          </div>
          <div class="bonding-modal-body">
            <div class="bonding-form-section">
              <label class="bonding-form-label">Group Name *</label>
              <input type="text" id="new-group-name" class="bonding-input" placeholder="e.g. Design Sync, Dev Team, Marketing Lounge..." />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Description (Optional)</label>
              <input type="text" id="new-group-desc" class="bonding-input" placeholder="What is this group about?" />
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Select Group Icon</label>
              <div class="bonding-avatar-picker" id="new-group-avatar-pick">
                <span class="avatar-opt active">👥</span>
                <span class="avatar-opt">☕</span>
                <span class="avatar-opt">💡</span>
                <span class="avatar-opt">🚀</span>
                <span class="avatar-opt">💬</span>
                <span class="avatar-opt">🍕</span>
                <span class="avatar-opt">🎯</span>
                <span class="avatar-opt">⭐</span>
              </div>
            </div>

            <div class="bonding-form-section">
              <label class="bonding-form-label">Add Initial Members (Employees & Admins only)</label>
              <div class="bonding-member-checkboxes">
                ${a.map(C=>`
                  <label class="bonding-check-label">
                    <input type="checkbox" class="new-group-member-chk" value="${C._id}" />
                    <span>${v(C.name)} (${v(C.role==="superadmin"?"Superadmin":C.role==="admin"?"Admin":"Employee")})</span>
                  </label>
                `).join("")}
              </div>
            </div>

            <div class="bonding-modal-footer">
              <button class="bonding-btn-secondary" id="btn-cancel-create-grp">Cancel</button>
              <button class="bonding-btn-primary" id="btn-confirm-create-grp">Create Group 🎉</button>
            </div>
          </div>
        </div>
      </div>
    `,d.querySelector(".bonding-modal-close").onclick=()=>{d.innerHTML=""},d.querySelector("#btn-cancel-create-grp").onclick=()=>{d.innerHTML=""};let h="👥";const T=d.querySelectorAll(".avatar-opt");T.forEach(C=>{C.onclick=()=>{T.forEach(Y=>Y.classList.remove("active")),C.classList.add("active"),h=C.textContent.trim()}});const j=d.querySelector("#btn-confirm-create-grp");j.onclick=async()=>{const C=d.querySelector("#new-group-name"),Y=d.querySelector("#new-group-desc"),Z=C.value.trim();if(!Z){$("Please enter a group name","warning"),C.focus();return}const S=d.querySelectorAll(".new-group-member-chk:checked"),A=Array.from(S).map(U=>U.value);try{j.disabled=!0,j.textContent="Creating...";const U=await ye("/bonding/channels",{type:"group",name:Z,description:Y.value.trim(),avatar:h,memberIds:A});$(`Group "${Z}" created! 🎉`,"success"),d.innerHTML="",m=await Me("/bonding/channels"),c=m.find(ae=>ae._id===U._id)||U,Be(),Re(),await qe(c._id)}catch(U){$(U.message||"Failed to create group","error"),j.disabled=!1,j.textContent="Create Group 🎉"}}}function P(d,o){const a=document.querySelector(".bonding-chat-emoji-palette");if(a){a.remove();return}const h=[{name:"Smileys & Faces",icon:"😀",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","😉","😍","🥰","😘","😋","😎","🤔","🤨","😐","😴","🤯","🥳","🥺"]},{name:"Hands & People",icon:"👍",emojis:["👍","👎","👏","🙌","👐","🤝","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","👇","💪","🫡","🙏","🙋","🙆"]},{name:"Celebration & Work",icon:"🎉",emojis:["🎉","🎊","🔥","✨","💯","🚀","🎯","🏆","🥇","⭐","🌟","💡","📌","💼","📊","📈","⏱️","⏳","✅","❌","⚡"]},{name:"Break & Fun",icon:"☕",emojis:["☕","🍵","🍕","🍔","🍟","🎂","🍰","🍩","🍿","🍺","🍻","🎮","🎲","🎯","🧩","🎵","🏖️","⚽","❤️","💖","💙"]}];let T=0;const j=document.createElement("div");j.className="bonding-chat-emoji-palette";function C(){const S=h[T];j.innerHTML=`
        <div class="emoji-palette-tabs">
          ${h.map((A,U)=>`
            <button class="emoji-tab-btn ${U===T?"active":""}" data-cat-idx="${U}" title="${A.name}">
              ${A.icon}
            </button>
          `).join("")}
        </div>
        <div class="emoji-palette-header">
          <span>${S.name}</span>
          <button class="emoji-palette-close" type="button">&times;</button>
        </div>
        <div class="emoji-palette-grid">
          ${S.emojis.map(A=>`
            <button class="chat-emoji-cell" data-e="${A}" type="button">${A}</button>
          `).join("")}
        </div>
      `,j.querySelectorAll(".emoji-tab-btn").forEach(A=>{A.onclick=U=>{U.stopPropagation(),T=Number(A.dataset.catIdx),C()}}),j.querySelector(".emoji-palette-close").onclick=A=>{A.stopPropagation(),j.remove()},j.querySelectorAll(".chat-emoji-cell").forEach(A=>{A.onclick=U=>{U.stopPropagation(),o(A.dataset.e),j.remove()}})}C();const Y=d.getBoundingClientRect();j.style.position="fixed",j.style.bottom=`${window.innerHeight-Y.top+8}px`,j.style.left=`${Math.max(12,Math.min(window.innerWidth-300,Y.left-40))}px`,document.body.appendChild(j);const Z=S=>{!j.contains(S.target)&&S.target!==d&&!d.contains(S.target)&&(j.remove(),document.removeEventListener("click",Z))};setTimeout(()=>document.addEventListener("click",Z),10)}function H(d,o){const a=document.querySelector(".bonding-emoji-popup");a&&a.remove();const h=["👍","❤️","🔥","😂","🎉","👏","🎯","✨","🙌","💯","🚀","💡"],T=document.createElement("div");T.className="bonding-emoji-popup",T.innerHTML=h.map(Y=>`<button class="emoji-opt-btn" data-e="${Y}">${Y}</button>`).join("");const j=d.getBoundingClientRect();T.style.top=`${j.bottom+window.scrollY+6}px`,T.style.left=`${j.left+window.scrollX}px`,document.body.appendChild(T),T.querySelectorAll(".emoji-opt-btn").forEach(Y=>{Y.onclick=Z=>{Z.stopPropagation(),o(Y.dataset.e),T.remove()}});const C=Y=>{T.contains(Y.target)||(T.remove(),document.removeEventListener("click",C))};setTimeout(()=>document.addEventListener("click",C),10)}function E(d){if(!d)return"";try{return new Date(d).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}}function pn(){const s=document.getElementById("ci360-bonding-styles");s&&s.remove();const n=document.createElement("style");n.id="ci360-bonding-styles",n.textContent=`
    /* Root Wrap */
    .bonding-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 2px;
      font-family: inherit;
      color: var(--text-1, #0f172a);
    }

    /* Top Navigation / Header Bar */
    .bonding-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(224, 242, 254, 0.75) 0%, rgba(240, 249, 255, 0.88) 45%, rgba(255, 255, 255, 0.95) 100%);
      border: 1px solid rgba(186, 230, 253, 0.7);
      padding: 16px 24px;
      box-shadow: 0 4px 20px rgba(186, 230, 253, 0.28);
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .bonding-nav-bar {
      background: linear-gradient(135deg, rgba(6, 24, 60, 0.85) 0%, rgba(5, 15, 38, 0.95) 100%) !important;
      border: 1px solid rgba(56, 189, 248, 0.25) !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(125, 211, 252, 0.18) !important;
    }

    .bonding-nav-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .bonding-logo-badge {
      font-size: 24px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0284C7 0%, #0070F3 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0, 112, 243, 0.35);
      color: #ffffff;
      flex-shrink: 0;
    }

    .bonding-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
      margin: 0 0 2px 0;
    }

    [data-theme="dark"] .bonding-title {
      color: #f9fafb !important;
    }

    .bonding-subtitle {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    [data-theme="dark"] .bonding-subtitle {
      color: #9ca3af !important;
    }

    /* View Switcher Tabs */
    .bonding-view-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-muted, #f1f5f9);
      padding: 4px;
      border-radius: 12px;
    }

    [data-theme="dark"] .bonding-view-tabs {
      background: #1e293b;
    }

    .bonding-view-tab {
      padding: 8px 16px;
      border-radius: 9px;
      border: none;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-2, #475569);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-view-tab {
      color: #94a3b8;
    }

    .bonding-view-tab.active {
      background: var(--bg-card, #ffffff);
      color: #0070F3;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    }

    [data-theme="dark"] .bonding-view-tab.active {
      background: #0f172a;
      color: #38BDF8;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }

    .bonding-nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-top-action-btn {
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-1, #1e293b);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-top-action-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .bonding-top-action-btn:hover {
      background: var(--bg-hover, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .bonding-top-action-btn:hover {
      background: #283548;
      border-color: #475569;
    }

    .bonding-top-action-btn.primary {
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      box-shadow: 0 3px 8px rgba(0, 112, 243, 0.3);
    }

    .bonding-top-action-btn.primary:hover {
      opacity: 0.93;
      transform: translateY(-1px);
    }

    /* Main Chat Layout */
    .bonding-chat-layout {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 0;
      height: calc(100vh - 210px);
      min-height: 580px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .bonding-chat-layout {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .mobile-back-channels-btn {
      display: none;
    }

    @media (max-width: 1024px) {
      .bonding-chat-layout {
        grid-template-columns: 280px 1fr;
      }
    }

    @media (max-width: 768px) {
      .bonding-wrap {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      .bonding-nav-bar {
        padding: 12px 14px !important;
        border-radius: 14px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-nav-left {
        width: 100% !important;
        gap: 10px !important;
      }

      .bonding-title {
        font-size: 16px !important;
      }

      .bonding-subtitle {
        font-size: 11.5px !important;
      }

      .bonding-view-tabs {
        width: 100% !important;
        display: flex !important;
        padding: 3px !important;
        gap: 4px !important;
        box-sizing: border-box !important;
      }

      .bonding-view-tab {
        flex: 1 !important;
        justify-content: center !important;
        padding: 8px 10px !important;
        font-size: 12.5px !important;
      }

      .bonding-nav-right {
        width: 100% !important;
        display: flex !important;
        gap: 6px !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
      }

      .bonding-top-action-btn {
        flex: 1 !important;
        justify-content: center !important;
        padding: 7px 6px !important;
        font-size: 11px !important;
      }

      .bonding-chat-layout {
        display: flex !important;
        flex-direction: column !important;
        height: calc(100dvh - 210px) !important;
        min-height: 480px !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 14px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }

      .bonding-chat-layout.mobile-view-sidebar .bonding-sidebar {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        border-right: none !important;
        border-bottom: none !important;
        padding: 12px !important;
      }

      .bonding-chat-layout.mobile-view-sidebar .bonding-chat-main {
        display: none !important;
      }

      .bonding-chat-layout.mobile-view-chat .bonding-sidebar {
        display: none !important;
      }

      .bonding-chat-layout.mobile-view-chat .bonding-chat-main {
        display: flex !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 0 !important;
      }

      .mobile-back-channels-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        padding: 5px 9px !important;
        background: rgba(0, 112, 243, 0.1) !important;
        color: #0070F3 !important;
        border: 1px solid rgba(0, 112, 243, 0.25) !important;
        border-radius: 8px !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        flex-shrink: 0 !important;
      }

      [data-theme="dark"] .mobile-back-channels-btn {
        background: rgba(56, 189, 248, 0.15) !important;
        color: #38BDF8 !important;
        border-color: rgba(56, 189, 248, 0.3) !important;
      }

      .bonding-chat-header {
        padding: 10px 12px !important;
        gap: 8px !important;
        flex-direction: column !important;
        align-items: stretch !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-chat-header-info {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        min-width: 0 !important;
      }

      .bonding-chat-header-titles {
        flex: 1 !important;
        min-width: 0 !important;
      }

      .bonding-chat-title {
        font-size: 14px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .bonding-chat-sub {
        font-size: 11px !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }

      .bonding-chat-header-actions {
        display: flex !important;
        gap: 6px !important;
        width: 100% !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
        scrollbar-width: none !important;
        padding-bottom: 2px !important;
      }

      .bonding-header-btn {
        padding: 5px 9px !important;
        font-size: 11px !important;
        flex-shrink: 0 !important;
      }

      .bonding-chat-input-bar {
        padding: 8px 10px !important;
        gap: 6px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-input-field {
        height: 38px !important;
        min-height: 38px !important;
        padding: 0 10px !important;
        font-size: 13px !important;
      }

      .bonding-send-btn {
        height: 38px !important;
        padding: 0 12px !important;
        font-size: 12px !important;
      }

      .bonding-messages-container {
        padding: 12px 10px !important;
        gap: 8px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .bonding-msg-row {
        max-width: 92% !important;
      }

      .bonding-game-card-bubble {
        max-width: 100% !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .lounge-container {
        width: 100% !important;
        max-width: 100% !important;
        gap: 14px !important;
      }

      .lounge-stats-ribbon {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
      }

      .lounge-two-col {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }

      .lounge-card-box {
        padding: 14px !important;
      }
    }

    /* Sidebar */
    .bonding-sidebar {
      background: transparent;
      border: none;
      border-right: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 0;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      box-shadow: none;
    }

    [data-theme="dark"] .bonding-sidebar {
      background: transparent;
      border-color: transparent;
      border-right: 1px solid var(--border-subtle, #1f2937);
    }

    .bonding-search-box input {
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s ease;
    }

    [data-theme="dark"] .bonding-search-box input {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px 0;
    }

    .bonding-section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.8px;
      color: var(--text-3, #94a3b8);
    }

    .bonding-mini-btn {
      font-size: 11.5px;
      font-weight: 600;
      color: #0070F3;
      background: transparent;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 6px;
      border-radius: 6px;
    }

    .bonding-mini-btn:hover {
      background: rgba(0, 112, 243, 0.1);
    }

    .bonding-channel-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-channel-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
      position: relative;
    }

    .bonding-channel-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-channel-item:hover {
      background: #1e293b;
    }

    .bonding-channel-item.active {
      background: rgba(0, 112, 243, 0.12);
      border-left: 3px solid #0070F3;
    }

    [data-theme="dark"] .bonding-channel-item.active {
      background: rgba(0, 112, 243, 0.22);
      border-left-color: #38BDF8;
    }

    .bonding-channel-avatar, .bonding-channel-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-channel-avatar, [data-theme="dark"] .bonding-channel-icon {
      background: #2e3b52;
      color: #c7d2fe;
    }

    .bonding-channel-info {
      flex: 1;
      min-width: 0;
    }

    .bonding-channel-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-1, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-channel-name {
      color: #f1f5f9;
    }

    .bonding-channel-preview {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bonding-channel-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-left: auto;
    }

    .bonding-channel-item:hover .bonding-channel-del-btn {
      opacity: 0.75;
    }

    .bonding-channel-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    /* Main Chat Panel */
    .bonding-chat-main {
      background: transparent;
      border: none;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: none;
    }

    [data-theme="dark"] .bonding-chat-main {
      background: transparent;
      border-color: transparent;
    }

    .bonding-chat-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .bonding-chat-header {
      border-color: #1f2937;
    }

    .bonding-chat-header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .bonding-chat-header-avatar {
      font-size: 20px;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(0, 112, 243, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-chat-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-chat-title {
      color: #f9fafb;
    }

    .bonding-chat-sub {
      font-size: 12px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-online {
      color: #10b981;
      font-weight: 600;
    }

    .bonding-chat-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-header-btn {
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: transparent;
      color: var(--text-2, #334155);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .bonding-header-btn {
      border-color: #334155;
      color: #cbd5e1;
    }

    .bonding-header-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-header-btn:hover {
      background: #1e293b;
    }

    .bonding-header-btn.challenge-highlight {
      background: rgba(0, 112, 243, 0.12);
      border-color: #38BDF8;
      color: #0070F3;
    }

    [data-theme="dark"] .bonding-header-btn.challenge-highlight {
      background: rgba(0, 112, 243, 0.25);
      color: #a5b4fc;
    }

    .bonding-header-btn.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.3);
    }

    .bonding-header-btn.danger:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    /* Messages container */
    .bonding-messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bonding-empty-feed {
      margin: auto;
      text-align: center;
      color: var(--text-3, #94a3b8);
      padding: 40px 20px;
    }

    .bonding-empty-icon {
      font-size: 40px;
      margin-bottom: 8px;
    }

    .bonding-msg-row {
      display: flex;
      gap: 10px;
      max-width: 78%;
    }

    .bonding-msg-row.self {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .bonding-msg-row.other {
      align-self: flex-start;
    }

    .bonding-msg-avatar {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: #e2e8f0;
      color: #475569;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    [data-theme="dark"] .bonding-msg-avatar {
      background: #334155;
      color: #f1f5f9;
    }

    .bonding-msg-bubble-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .bonding-msg-row.self .bonding-msg-bubble-wrap {
      align-items: flex-end;
    }

    .bonding-msg-meta {
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bonding-msg-del-btn {
      opacity: 0;
      background: transparent;
      border: none;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      font-size: 11px;
    }

    .bonding-msg-row:hover .bonding-msg-del-btn,
    .bonding-msg-system:hover .bonding-msg-del-btn {
      opacity: 0.75;
    }

    .bonding-msg-del-btn:hover {
      opacity: 1 !important;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.12);
    }

    .bonding-msg-del-btn.mini {
      margin-left: 8px;
      font-size: 14px;
      line-height: 1;
    }

    .bonding-msg-sender {
      font-weight: 600;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .bonding-msg-sender {
      color: #cbd5e1;
    }

    .bonding-msg-bubble {
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-msg-bubble {
      background: #1e293b;
      color: #f8fafc;
    }

    .bonding-msg-row.self .bonding-msg-bubble {
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
    }

    .bonding-msg-system {
      align-self: center;
      background: rgba(0, 112, 243, 0.08);
      color: #0284C7;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0;
    }

    [data-theme="dark"] .bonding-msg-system {
      background: rgba(0, 112, 243, 0.2);
      color: #a5b4fc;
    }

    /* Game Card inside Chat Stream */
    .bonding-game-card-bubble {
      background: var(--bg-surface, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 14px;
      padding: 14px;
      width: 290px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    [data-theme="dark"] .bonding-game-card-bubble {
      background: #1a2333;
      border-color: #334155;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    }

    .game-bubble-top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .game-bubble-icon {
      font-size: 26px;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(0, 112, 243, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-bubble-title {
      font-size: 14.5px;
      font-weight: 700;
      margin: 0 0 2px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-bubble-title {
      color: #f9fafb;
    }

    .game-bubble-desc {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin: 0;
    }

    .game-bubble-status {
      margin: 8px 0;
    }

    .game-bubble-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 10px;
    }

    .game-btn-accept {
      flex: 1;
      padding: 7px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .game-btn-decline {
      padding: 7px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-2, #64748b);
    }

    .game-btn-cancel {
      padding: 5px 10px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .game-btn-play {
      flex: 1;
      padding: 8px 12px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.3);
    }

    /* Reactions row */
    .bonding-reactions-row {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 2px;
    }

    .bonding-rxn-tag {
      padding: 2px 7px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-card, #ffffff);
      font-size: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    [data-theme="dark"] .bonding-rxn-tag {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-rxn-tag.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
    }

    .bonding-add-rxn-btn {
      padding: 2px 6px;
      border-radius: 12px;
      border: 1px dashed var(--border-sm, #cbd5e1);
      background: transparent;
      font-size: 11.5px;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
    }

    /* Input bar - Kept strictly in 1 single clean line */
    .bonding-chat-input-bar {
      padding: 10px 18px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      flex-direction: row !important;
      align-items: center !important;
      gap: 10px;
      background: var(--bg-card, #ffffff);
      flex-wrap: nowrap !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .bonding-chat-input-bar {
      background: var(--bg-surface, #111827);
      border-color: #1f2937;
    }

    .bonding-input-action-btn {
      font-size: 18px;
      padding: 6px;
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.15s ease;
      flex-shrink: 0 !important;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-input-action-btn:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-input-action-btn:hover {
      background: #1e293b;
    }

    .bonding-input-field {
      flex: 1 1 auto !important;
      height: 42px !important;
      min-height: 42px !important;
      max-height: 42px !important;
      line-height: normal !important;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      padding: 0 14px !important;
      border-radius: 10px;
      font-size: 13.5px;
      color: inherit;
      outline: none;
      font-family: inherit;
      box-sizing: border-box !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .bonding-input-field {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-send-btn {
      flex-shrink: 0 !important;
      height: 42px !important;
      padding: 0 18px !important;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-sizing: border-box !important;
      white-space: nowrap !important;
    }

    /* =========================================================================
       LOUNGE & GAMES ARENA VIEW STYLES
       ========================================================================= */
    .lounge-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .lounge-stats-ribbon {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }

    .lounge-stat-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-stat-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-stat-card .stat-num {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-stat-card .stat-num {
      color: #f9fafb;
    }

    .lounge-stat-card .stat-lbl {
      font-size: 12px;
      color: var(--text-3, #64748b);
      margin-top: 3px;
    }

    .lounge-stat-card.highlight .stat-num {
      color: #10b981;
    }

    .lounge-section {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px 22px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    [data-theme="dark"] .lounge-section {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-section-head h3 {
      font-size: 17px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .lounge-section-head h3 {
      color: #f9fafb;
    }

    .lounge-section-head p {
      font-size: 13px;
      color: var(--text-3, #64748b);
      margin: 0 0 16px 0;
    }

    .lounge-games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .lounge-game-card {
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s ease;
    }

    [data-theme="dark"] .lounge-game-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-game-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
      border-color: #0070F3;
    }

    .game-card-icon {
      font-size: 34px;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: rgba(0, 112, 243, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-card-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .game-card-title {
      color: #f9fafb;
    }

    .game-card-desc {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .game-card-meta {
      display: flex;
      gap: 6px;
    }

    .meta-pill {
      font-size: 11.5px;
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      padding: 3px 8px;
      border-radius: 8px;
      color: var(--text-2, #475569);
    }

    [data-theme="dark"] .meta-pill {
      background: #25334c;
      border-color: #3b4d6e;
      color: #cbd5e1;
    }

    .lounge-card-challenge-btn {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: auto;
      transition: opacity 0.15s ease;
    }

    .lounge-card-challenge-btn:hover {
      opacity: 0.93;
    }

    .lounge-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 900px) {
      .lounge-two-col {
        grid-template-columns: 1fr;
      }
    }

    .lounge-card-box {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 16px;
      padding: 20px;
    }

    [data-theme="dark"] .lounge-card-box {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
    }

    .lounge-box-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .sub-box-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .box-empty-text {
      font-size: 12.5px;
      color: var(--text-3, #94a3b8);
      font-style: italic;
      padding: 8px 0;
    }

    .lounge-invites-list, .lounge-active-matches-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .lounge-invite-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      gap: 10px;
    }

    [data-theme="dark"] .lounge-invite-item {
      background: #182234;
      border-color: #2b3952;
    }

    .invite-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .invite-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .invite-info {
      display: flex;
      flex-direction: column;
    }

    .invite-title {
      font-size: 13px;
      font-weight: 700;
    }

    .invite-sender {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .btn-invite-accept {
      padding: 6px 12px;
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-invite-decline {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 7px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .btn-invite-cancel {
      padding: 5px 9px;
      background: transparent;
      border: 1px solid #ef4444;
      color: #ef4444;
      border-radius: 6px;
      font-size: 11.5px;
      cursor: pointer;
    }

    .lounge-active-match-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      gap: 10px;
      flex-wrap: wrap;
    }

    [data-theme="dark"] .lounge-active-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .lounge-active-match-card.turn-active {
      border-color: #10b981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
    }

    .active-match-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .match-game-icon {
      font-size: 26px;
    }

    .match-game-title {
      font-size: 14px;
      font-weight: 700;
    }

    .match-opp-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .active-match-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .match-turn-tag {
      font-size: 11.5px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .match-turn-tag.my-turn {
      background: rgba(16, 185, 129, 0.15);
      color: #059669;
    }

    .match-turn-tag.wait {
      background: rgba(148, 163, 184, 0.15);
      color: #64748b;
    }

    .btn-resume-match {
      padding: 7px 14px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }

    .lounge-recent-matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }

    .recent-match-card {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #e2e8f0);
      background: var(--bg-muted, #f8fafc);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    [data-theme="dark"] .recent-match-card {
      background: #182234;
      border-color: #2b3952;
    }

    .recent-card-head {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: 700;
    }

    .recent-date {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .recent-outcome.win { color: #10b981; font-weight: 700; }
    .recent-outcome.loss { color: #ef4444; font-weight: 700; }
    .recent-outcome.draw { color: #f59e0b; font-weight: 700; }

    .btn-recent-rematch {
      padding: 6px 10px;
      border: 1px solid #0070F3;
      background: transparent;
      color: #0070F3;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 4px;
    }

    .btn-delete-match {
      padding: 6px 10px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-3, #94a3b8);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-delete-match:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    .btn-delete-match.mini {
      padding: 3px 6px;
      border: none;
    }

    .btn-delete-match.text-btn {
      border: 1px solid rgba(239, 68, 68, 0.35);
      color: #ef4444;
      background: rgba(239, 68, 68, 0.04);
      margin-top: 4px;
    }

    .btn-delete-match.text-btn:hover {
      background: rgba(239, 68, 68, 0.12);
    }

    .btn-clear-matches {
      padding: 6px 12px;
      background: transparent;
      border: 1px solid var(--border-sm, #e2e8f0);
      color: var(--text-2, #64748b);
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .btn-clear-matches {
      border-color: #334155;
      color: #94a3b8;
    }

    .btn-clear-matches:hover {
      color: #ef4444;
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
    }

    /* Leaderboard Table */
    .lounge-lb-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .lounge-lb-table th {
      text-align: left;
      padding: 10px 12px;
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: var(--text-3, #94a3b8);
      border-bottom: 2px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table th {
      border-color: #334155;
    }

    .lounge-lb-table td {
      padding: 12px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .lounge-lb-table td {
      border-color: #1e293b;
    }

    .lb-player-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .lb-avatar {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
      color: #4338ca;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* =========================================================================
       CHALLENGE FLOW MODAL STYLES (MANDATORY EMPLOYEE SELECTION)
       ========================================================================= */
    .challenge-flow-modal {
      width: 520px;
      max-width: 95vw;
    }

    .flow-step-box {
      margin-bottom: 16px;
    }

    .flow-step-lbl {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--text-3, #94a3b8);
      margin-bottom: 8px;
    }

    .game-select-pills {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .game-pill-btn {
      padding: 10px 8px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: var(--text-1, #0f172a);
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    [data-theme="dark"] .game-pill-btn {
      background: #1e293b;
      border-color: #334155;
      color: #f1f5f9;
    }

    .game-pill-btn.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
    }

    .emp-search-wrap {
      margin-bottom: 8px;
    }

    .eligible-emp-list {
      max-height: 180px;
      overflow-y: auto;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    [data-theme="dark"] .eligible-emp-list {
      border-color: #334155;
    }

    .eligible-emp-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .eligible-emp-item:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .eligible-emp-item:hover {
      background: #25334c;
    }

    .eligible-emp-item.selected {
      background: rgba(0, 112, 243, 0.12);
      border-left: 3px solid #0070F3;
    }

    .emp-item-avatar {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: #e2e8f0;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emp-item-info {
      flex: 1;
      margin-left: 8px;
    }

    .emp-item-name {
      font-size: 13px;
      font-weight: 700;
      display: block;
    }

    .emp-item-role {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
    }

    .btn-select-opponent {
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      background: transparent;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-select-opponent.active {
      background: #0070F3;
      color: #ffffff;
      border-color: #0070F3;
    }

    .timer-opts-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .timer-radio-lbl {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .timer-radio-lbl {
      background: #1e293b;
    }

    .flow-confirmation-card {
      background: rgba(0, 112, 243, 0.08);
      border: 1px solid rgba(0, 112, 243, 0.2);
      border-radius: 10px;
      padding: 12px;
      font-size: 12.5px;
    }

    .confirm-head {
      font-weight: 700;
      margin-bottom: 6px;
      color: #0070F3;
    }

    .confirm-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* =========================================================================
       LIVE GAME ARENA MODAL & SPLIT LAYOUT (DARK THEME WITH LEFT SIDEBAR)
       ========================================================================= */
    .game-arena-modal.arena-split-layout {
      width: 740px !important;
      max-width: 95vw !important;
      min-height: 480px !important;
      max-height: 90vh !important;
      padding: 0 !important;
      background: #13151b !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 22px !important;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8) !important;
      display: flex !important;
      flex-direction: row !important;
      overflow: hidden !important;
      position: relative !important;
    }

    [data-theme="dark"] .game-arena-modal.arena-split-layout {
      background: #111319 !important;
      border-color: rgba(255, 255, 255, 0.08) !important;
    }

    /* Left Sidebar Panel */
    .arena-sidebar-panel {
      width: 250px !important;
      flex-shrink: 0 !important;
      background: #161922 !important;
      border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
      padding: 24px 18px !important;
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
      position: relative !important;
    }

    .arena-sidebar-players {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
    }

    .game-sidebar-player-row {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      position: relative !important;
    }

    .turn-indicator-slot {
      width: 70px !important;
      display: flex !important;
      justify-content: flex-end !important;
      align-items: center !important;
      flex-shrink: 0 !important;
    }

    .turn-pointer-pill {
      position: relative !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 4px !important;
      background: #0070F3 !important;
      color: #ffffff !important;
      font-size: 11px !important;
      font-weight: 800 !important;
      padding: 4px 8px !important;
      border-radius: 6px !important;
      letter-spacing: 0.2px !important;
      box-shadow: 0 2px 8px rgba(0, 112, 243, 0.4) !important;
    }

    .turn-pointer-pill::after {
      content: '' !important;
      position: absolute !important;
      right: -5px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 0 !important;
      height: 0 !important;
      border-top: 5px solid transparent !important;
      border-bottom: 5px solid transparent !important;
      border-left: 5px solid #0070F3 !important;
    }

    .turn-pointer-pill .pill-sym {
      font-size: 11px !important;
      line-height: 1 !important;
    }

    .turn-pointer-pill .pill-txt {
      font-size: 11px !important;
      line-height: 1 !important;
      text-transform: capitalize !important;
    }

    .game-player-avatar-circle {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      background: #202531 !important;
      border: 2px solid rgba(255, 255, 255, 0.12) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 20px !important;
      flex-shrink: 0 !important;
      transition: all 0.2s ease !important;
    }

    .game-sidebar-player-row.active-turn .game-player-avatar-circle {
      border-color: #0070F3 !important;
      box-shadow: 0 0 14px rgba(0, 112, 243, 0.45) !important;
    }

    .game-player-meta {
      display: flex !important;
      flex-direction: column !important;
      min-width: 0 !important;
    }

    .game-player-name {
      font-size: 13.5px !important;
      font-weight: 700 !important;
      color: #f1f5f9 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .game-player-role {
      font-size: 11.5px !important;
      color: #94a3b8 !important;
      font-weight: 500 !important;
    }

    /* Sidebar Footer */
    .arena-sidebar-footer {
      margin-top: auto !important;
      padding-top: 24px !important;
    }

    .game-code-display {
      font-size: 12.5px !important;
      color: #94a3b8 !important;
      margin-bottom: 12px !important;
      font-weight: 500 !important;
    }

    .game-code-display strong {
      color: #f1f5f9 !important;
      letter-spacing: 0.5px !important;
    }

    .arena-sidebar-divider {
      height: 1px !important;
      background: rgba(255, 255, 255, 0.08) !important;
      margin-bottom: 12px !important;
    }

    .arena-sidebar-actions {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
    }

    .sidebar-action-item {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      padding: 8px 10px !important;
      border-radius: 8px !important;
      background: transparent !important;
      border: none !important;
      color: #cbd5e1 !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      text-align: left !important;
      transition: all 0.15s ease !important;
      width: 100% !important;
    }

    .sidebar-action-item:hover {
      background: rgba(255, 255, 255, 0.06) !important;
      color: #ffffff !important;
    }

    .sidebar-action-item.danger:hover {
      background: rgba(239, 68, 68, 0.15) !important;
      color: #ef4444 !important;
    }

    .sidebar-action-item .action-icon {
      font-size: 15px !important;
      opacity: 0.85 !important;
    }

    /* Right Main Content Area */
    .arena-main-content {
      flex: 1 !important;
      background: #13151b !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 24px !important;
      box-sizing: border-box !important;
      position: relative !important;
      overflow-y: auto !important;
    }

    /* Modern Tic-Tac-Toe Court & Tiles matching screenshot */
    .ttt-modern-court {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      user-select: none !important;
    }

    .ttt-modern-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 104px) !important;
      grid-template-rows: repeat(3, 104px) !important;
      gap: 14px !important;
      padding: 12px !important;
      box-sizing: border-box !important;
    }

    .ttt-modern-tile {
      width: 104px !important;
      height: 104px !important;
      border-radius: 18px !important;
      background: #1c202a !important;
      border: 1px solid rgba(255, 255, 255, 0.04) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      cursor: default !important;
    }

    .ttt-modern-tile.empty {
      cursor: pointer !important;
    }

    .ttt-modern-tile.empty:hover {
      background: #242938 !important;
      border-color: #2563EB !important;
      transform: scale(1.03) !important;
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.35) !important;
    }

    .ttt-modern-tile.win-cell {
      background: rgba(37, 99, 235, 0.2) !important;
      border-color: #38BDF8 !important;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.6) !important;
      animation: tttWinGlow 1s infinite alternate !important;
    }

    .ttt-svg-symbol {
      display: block !important;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4)) !important;
    }

    @media (max-width: 680px) {
      .game-arena-modal.arena-split-layout {
        flex-direction: column !important;
        height: auto !important;
        max-height: 92vh !important;
      }
      .arena-sidebar-panel {
        width: 100% !important;
        border-right: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
        padding: 16px !important;
      }
      .ttt-modern-grid {
        grid-template-columns: repeat(3, 84px) !important;
        grid-template-rows: repeat(3, 84px) !important;
        gap: 8px !important;
      }
      .ttt-modern-tile {
        width: 84px !important;
        height: 84px !important;
      }
    }

    /* Dedicated Top-Right Close Button */
    .arena-close-btn {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255,255,255,0.08);
      border: none;
      color: #94a3b8;
      font-size: 22px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
      z-index: 10;
    }

    .arena-close-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      transform: scale(1.08);
    }

    /* Arena Header */
    .arena-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 14px;
      padding-right: 36px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .arena-header {
      border-color: #1e293b;
    }

    .arena-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .arena-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(0, 112, 243, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .arena-title {
      font-size: 18px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .arena-title {
      color: #f8fafc;
    }

    .arena-players-vs {
      font-size: 12.5px;
      color: var(--text-3, #64748b);
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .player-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .player-tag strong {
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .player-tag strong {
      color: #f1f5f9;
    }

    .vs-pill {
      font-weight: 800;
      font-size: 10px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
    }

    /* Turn Banner */
    .arena-turn-banner {
      padding: 7px 14px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .arena-turn-banner.my-turn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.5);
      animation: pulseGlow 1.8s infinite;
    }

    .arena-turn-banner.opp-turn {
      background: var(--bg-muted, #f1f5f9);
      color: var(--text-2, #64748b);
      border: 1px solid var(--border-sm, #cbd5e1);
    }

    [data-theme="dark"] .arena-turn-banner.opp-turn {
      background: #1e293b;
      color: #94a3b8;
      border-color: #334155;
    }

    .arena-turn-banner.ended {
      background: rgba(0, 112, 243, 0.12);
      color: #0070F3;
      border: 1px solid #38BDF8;
    }

    /* Sub Toolbar */
    .arena-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-sm, #f1f5f9);
    }

    [data-theme="dark"] .arena-toolbar {
      border-color: #1e293b;
    }

    .arena-tip-text {
      font-size: 12px;
      color: var(--text-3, #64748b);
      font-weight: 500;
    }

    .arena-action-btns {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-arena-action {
      padding: 5px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-card, #ffffff);
      color: var(--text-2, #475569);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s ease;
    }

    .btn-arena-action:hover {
      background: var(--bg-muted, #f8fafc);
      border-color: #94a3b8;
    }

    [data-theme="dark"] .btn-arena-action {
      background: #1e293b;
      border-color: #334155;
      color: #cbd5e1;
    }

    [data-theme="dark"] .btn-arena-action:hover {
      background: #25334c;
      border-color: #475569;
    }

    .btn-arena-action.danger {
      color: #ef4444;
      border-color: rgba(239, 68, 68, 0.4);
    }

    .btn-arena-action.danger:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
    }

    /* Draw Offer Notification */
    .arena-draw-offer-banner {
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid #f59e0b;
      padding: 10px 14px;
      border-radius: 10px;
      margin: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 13px;
    }

    .btn-accept-draw {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
    }

    .btn-decline-draw {
      background: transparent;
      border: 1px solid #cbd5e1;
      padding: 5px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    /* Main Playing Board Arena Wrapper */
    .arena-board-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      width: 100%;
      min-height: 380px;
      box-sizing: border-box;
    }

    /* =========================================================================
       TIC-TAC-TOE BOARD (AUTHENTIC SQUARE 3x3 COURT)
       ========================================================================= */
    .ttt-court {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px;
      user-select: none;
    }

    .ttt-board-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 98px) !important;
      grid-template-rows: repeat(3, 98px) !important;
      gap: 10px !important;
      width: 324px !important;
      height: 324px !important;
      min-width: 324px !important;
      min-height: 324px !important;
      max-width: 324px !important;
      max-height: 324px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      background: var(--bg-muted, #f1f5f9);
      padding: 10px;
      border-radius: 24px;
      border: 1px solid var(--border-sm, #cbd5e1);
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.04);
      box-sizing: border-box !important;
    }

    [data-theme="dark"] .ttt-board-grid {
      background: #090e1a;
      border-color: #1e293b;
      box-shadow: inset 0 2px 14px rgba(0,0,0,0.6);
    }

    .ttt-cell {
      width: 94px !important;
      height: 94px !important;
      min-width: 94px !important;
      min-height: 94px !important;
      max-width: 94px !important;
      max-height: 94px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 52px;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      background: var(--bg-card, #ffffff);
      border: 2px solid var(--border-sm, #e2e8f0);
      box-shadow: 0 4px 10px rgba(0,0,0,0.04);
    }

    [data-theme="dark"] .ttt-cell {
      background: #151d2e;
      border-color: #243247;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .ttt-cell.empty:hover {
      background: #e0e7ff;
      border-color: #0070F3;
      transform: scale(1.04);
      box-shadow: 0 6px 18px rgba(0, 112, 243, 0.25);
    }

    [data-theme="dark"] .ttt-cell.empty:hover {
      background: #1e2a42;
      border-color: #38BDF8;
      box-shadow: 0 0 16px rgba(129, 140, 248, 0.35);
    }

    .ttt-cell.win-cell {
      background: #d1fae5 !important;
      border-color: #10b981 !important;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
      animation: tttWinGlow 1s infinite alternate;
    }

    [data-theme="dark"] .ttt-cell.win-cell {
      background: rgba(16, 185, 129, 0.25) !important;
      border-color: #34d399 !important;
      box-shadow: 0 0 25px rgba(52, 211, 153, 0.6) !important;
    }

    @keyframes tttWinGlow {
      from { transform: scale(1); }
      to { transform: scale(1.05); }
    }

    .ttt-x {
      color: #0284C7;
      filter: drop-shadow(0 2px 4px rgba(0, 112, 243, 0.3));
    }

    [data-theme="dark"] .ttt-x {
      color: #38BDF8;
      text-shadow: 0 0 16px rgba(129, 140, 248, 0.85);
    }

    .ttt-o {
      color: #ea580c;
      filter: drop-shadow(0 2px 4px rgba(234, 88, 12, 0.3));
    }

    [data-theme="dark"] .ttt-o {
      color: #fbbf24;
      text-shadow: 0 0 16px rgba(251, 191, 36, 0.85);
    }

    /* =========================================================================
       CONNECT FOUR BOARD (AUTHENTIC TABLETOP DISK RACK)
       ========================================================================= */
    .c4-board-rack {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      margin: 0 auto;
      user-select: none;
    }

    /* Top Drop Arrow Column Buttons */
    .c4-drop-arrows-row {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      margin-bottom: 8px !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .c4-drop-col-btn {
      width: 48px !important;
      height: 36px !important;
      min-width: 48px !important;
      min-height: 36px !important;
      border-radius: 10px;
      border: 1px solid #c7d2fe;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 5px rgba(0,0,0,0.06);
    }

    .c4-drop-col-btn:hover {
      background: #0284C7;
      color: #ffffff;
      transform: translateY(3px);
      box-shadow: 0 4px 12px rgba(0, 112, 243, 0.4);
    }

    [data-theme="dark"] .c4-drop-col-btn {
      background: #1e293b;
      border-color: #3b82f6;
      color: #60a5fa;
    }

    [data-theme="dark"] .c4-drop-col-btn:hover {
      background: #2563eb;
      color: #ffffff;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    }

    /* The Main Blue Game Rack */
    .c4-grid-slots {
      display: grid !important;
      grid-template-columns: repeat(7, 48px) !important;
      grid-template-rows: repeat(6, 48px) !important;
      gap: 8px !important;
      width: fit-content !important;
      height: fit-content !important;
      min-width: 400px !important;
      min-height: 344px !important;
      max-width: 400px !important;
      max-height: 344px !important;
      place-items: center !important;
      align-content: center !important;
      justify-content: center !important;
      padding: 14px !important;
      border-radius: 22px !important;
      box-sizing: border-box !important;
      background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 60%, #1e40af 100%) !important;
      border: 3px solid #1e40af !important;
      box-shadow: 0 16px 36px rgba(37, 99, 235, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3) !important;
      position: relative;
      z-index: 2;
    }

    [data-theme="dark"] .c4-grid-slots {
      background: linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 60%, #172554 100%) !important;
      border: 3px solid #3b82f6 !important;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2) !important;
    }

    /* Tabletop Stand Feet */
    .c4-rack-stand {
      display: flex;
      justify-content: space-between;
      width: 410px;
      height: 14px;
      margin-top: -2px;
      position: relative;
      z-index: 1;
    }

    .c4-stand-leg {
      width: 46px;
      height: 14px;
      background: #1e3a8a;
      border-radius: 0 0 8px 8px;
    }

    [data-theme="dark"] .c4-stand-leg {
      background: #0f172a;
      border: 1px solid #1e3a8a;
    }

    /* Slot Circular Container */
    .c4-slot {
      width: 48px !important;
      height: 48px !important;
      min-width: 48px !important;
      min-height: 48px !important;
      max-width: 48px !important;
      max-height: 48px !important;
      aspect-ratio: 1 / 1 !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer;
      position: relative;
      background: #090e1a !important;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8) !important;
      transition: transform 0.15s ease;
    }

    .c4-slot:hover {
      transform: scale(1.04);
    }

    /* Empty Hole Inset */
    .c4-hole {
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      background: #0b1329 !important;
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.9) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }

    /* Checkers Discs */
    .c4-disc {
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      max-width: 44px !important;
      max-height: 44px !important;
      aspect-ratio: 1 / 1 !important;
      border-radius: 50% !important;
      flex-shrink: 0 !important;
      box-sizing: border-box !important;
      animation: dropDiscAnim 0.3s cubic-bezier(0.25, 1, 0.5, 1);
      position: relative;
    }

    @keyframes dropDiscAnim {
      0% { transform: translateY(-160px); opacity: 0; }
      80% { transform: translateY(6px); opacity: 1; }
      100% { transform: translateY(0); opacity: 1; }
    }

    /* Red Disc */
    .c4-disc.red {
      background: radial-gradient(circle at 35% 35%, #f87171 0%, #ef4444 35%, #dc2626 70%, #991b1b 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 5px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.4) !important;
      border: 3px double rgba(255,255,255,0.3) !important;
    }

    /* Yellow Disc */
    .c4-disc.yellow {
      background: radial-gradient(circle at 35% 35%, #fef08a 0%, #facc15 35%, #eab308 70%, #a16207 100%) !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -3px 5px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.3) !important;
      border: 3px double rgba(0,0,0,0.2) !important;
    }

    /* Winning Disc Aura */
    .c4-slot.win-disc .c4-disc {
      box-shadow: 0 0 16px #ffffff, 0 0 28px #fbbf24 !important;
      animation: c4WinDiscPulse 0.9s infinite alternate !important;
    }

    @keyframes c4WinDiscPulse {
      from { transform: scale(1); filter: brightness(1); }
      to { transform: scale(1.1); filter: brightness(1.2); }
    }

    /* =========================================================================
       CHESS DUEL BOARD (AUTHENTIC TOURNAMENT 8x8)
       ========================================================================= */
    .chess-arena-layout {
      display: flex;
      gap: 18px;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }

    .chess-board-grid {
      display: grid !important;
      grid-template-columns: repeat(8, 48px) !important;
      grid-template-rows: repeat(8, 48px) !important;
      width: 384px !important;
      height: 384px !important;
      min-width: 384px !important;
      min-height: 384px !important;
      border: 4px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25);
      box-sizing: border-box !important;
    }

    @media (max-width: 520px) {
      .chess-board-grid {
        grid-template-columns: repeat(8, 40px) !important;
        grid-template-rows: repeat(8, 40px) !important;
        width: 320px !important;
        height: 320px !important;
        min-width: 320px !important;
        min-height: 320px !important;
      }
    }

    .chess-sq {
      width: 100% !important;
      height: 100% !important;
      aspect-ratio: 1 / 1 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      position: relative;
      box-sizing: border-box !important;
    }

    .chess-sq.light {
      background: #f0d9b5;
    }

    .chess-sq.dark {
      background: #b58863;
    }

    [data-theme="dark"] .chess-sq.light {
      background: #cbd5e1;
    }

    [data-theme="dark"] .chess-sq.dark {
      background: #475569;
    }

    .chess-sq.selected {
      background: #38bdf8 !important;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    }

    .chess-sq.legal-dot::after {
      content: '';
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.75);
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
      position: absolute;
    }

    .chess-piece {
      font-size: 34px;
      line-height: 1;
      user-select: none;
      transition: transform 0.1s ease;
    }

    .chess-piece:hover {
      transform: scale(1.12);
    }

    .chess-piece.white-piece {
      color: #ffffff;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.8));
    }

    .chess-piece.black-piece {
      color: #0f172a;
      filter: drop-shadow(0 1px 2px rgba(255,255,255,0.4));
    }

    .chess-sidebar-notation {
      width: 160px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 10px;
      padding: 10px;
      height: 384px;
      display: flex;
      flex-direction: column;
    }

    [data-theme="dark"] .chess-sidebar-notation {
      background: #182234;
      border-color: #2b3952;
    }

    .notation-head {
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-3, #94a3b8);
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .notation-feed {
      flex: 1;
      overflow-y: auto;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-content: flex-start;
    }


    /* =========================================================================
       LUDO MULTIPLAYER DUEL BOARD (15x15 AUTHENTIC CROSS)
       ========================================================================= */
    .ludo-arena-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: 100%;
    }

    .ludo-board-grid {
      display: grid !important;
      grid-template-columns: repeat(15, 26px) !important;
      grid-template-rows: repeat(15, 26px) !important;
      width: 390px !important;
      height: 390px !important;
      border: 3px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0,0,0,0.28);
      background: #ffffff;
      user-select: none;
      box-sizing: border-box !important;
      position: relative;
    }

    @media (max-width: 480px) {
      .ludo-board-grid {
        grid-template-columns: repeat(15, 21px) !important;
        grid-template-rows: repeat(15, 21px) !important;
        width: 315px !important;
        height: 315px !important;
      }
    }

    /* Yards */
    .ludo-yard {
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ludo-yard.red-yard {
      grid-column: 1 / 7;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    .ludo-yard.green-yard {
      grid-column: 10 / 16;
      grid-row: 1 / 7;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .ludo-yard.blue-yard {
      grid-column: 1 / 7;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .ludo-yard.yellow-yard {
      grid-column: 10 / 16;
      grid-row: 10 / 16;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    .ludo-yard.yard-active-turn {
      outline: 3px solid #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.6);
      transform: scale(1.02);
      z-index: 2;
    }

    .yard-player-lbl {
      display: block;
      font-size: 8.5px;
      color: #64748b;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }

    .yard-box {
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.15);
      padding: 6px;
      box-sizing: border-box;
    }

    .yard-box.decorative {
      opacity: 0.65;
    }

    .yard-title {
      font-size: 10.5px;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .yard-slots {
      display: grid !important;
      grid-template-columns: repeat(2, 28px);
      grid-template-rows: repeat(2, 28px);
      gap: 6px;
      align-items: center;
      justify-content: center;
    }

    .yard-token-slot {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f1f5f9;
      border: 1.5px dashed #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .slot-empty {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 700;
    }

    /* Center Home Victory Area */
    .ludo-center-home {
      grid-column: 7 / 10;
      grid-row: 7 / 10;
      position: relative;
      background: #1e293b;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .home-triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    .home-triangle.red-tri {
      top: 0; left: 0; bottom: 0;
      border-width: 39px 0 39px 39px;
      border-color: transparent transparent transparent #ef4444;
    }

    .home-triangle.green-tri {
      top: 0; left: 0; right: 0;
      border-width: 39px 39px 0 39px;
      border-color: #10b981 transparent transparent transparent;
    }

    .home-triangle.yellow-tri {
      top: 0; right: 0; bottom: 0;
      border-width: 39px 39px 39px 0;
      border-color: transparent #f59e0b transparent transparent;
    }

    .home-triangle.blue-tri {
      bottom: 0; left: 0; right: 0;
      border-width: 0 39px 39px 39px;
      border-color: transparent transparent #3b82f6 transparent;
    }

    .home-center-core {
      position: relative;
      z-index: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .home-crown {
      font-size: 18px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }

    .home-finished-tokens {
      display: flex;
      gap: 3px;
      margin-top: 2px;
    }

    .tok-finished {
      font-size: 9px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0,0,0,0.6);
      color: #fff;
    }

    /* Pathway Cells */
    .ludo-cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.5px solid #cbd5e1;
      background: #ffffff;
      box-sizing: border-box;
      font-size: 11px;
    }

    [data-theme="dark"] .ludo-cell {
      background: #1e293b;
      border-color: #334155;
    }

    .cell-red-start {
      background: #fee2e2 !important;
      border: 1.5px solid #ef4444 !important;
    }

    .cell-green-start {
      background: #d1fae5 !important;
      border: 1.5px solid #10b981 !important;
    }

    .cell-red-stretch {
      background: #ef4444 !important;
      color: #ffffff !important;
    }

    .cell-green-stretch {
      background: #10b981 !important;
      color: #ffffff !important;
    }

    .cell-safe-star {
      background: #fef3c7 !important;
    }

    .cell-star-glyph {
      font-size: 11px;
      line-height: 1;
      position: absolute;
      opacity: 0.85;
      pointer-events: none;
    }

    .cell-arrow-glyph {
      font-size: 10px;
      font-weight: 800;
      color: inherit;
      position: absolute;
      opacity: 0.7;
      pointer-events: none;
    }

    /* Tokens */
    .ludo-token {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 10px;
      color: #ffffff;
      cursor: default;
      transition: all 0.15s ease;
      z-index: 10;
      user-select: none;
    }

    .ludo-token.token-red {
      background: radial-gradient(circle at 35% 35%, #f87171, #b91c1c);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(185, 28, 28, 0.7);
    }

    .ludo-token.token-green {
      background: radial-gradient(circle at 35% 35%, #34d399, #047857);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(4, 120, 87, 0.7);
    }

    .ludo-token.token-yellow {
      background: radial-gradient(circle at 35% 35%, #fde047, #d97706);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(217, 119, 6, 0.7);
    }

    .ludo-token.token-blue {
      background: radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8);
      border: 1.5px solid #ffffff;
      box-shadow: 0 2px 5px rgba(29, 78, 216, 0.7);
    }

    .cell-yellow-start {
      background: #fef3c7 !important;
      border: 1.5px solid #f59e0b !important;
    }

    .cell-blue-start {
      background: #dbeafe !important;
      border: 1.5px solid #3b82f6 !important;
    }

    .cell-yellow-stretch {
      background: #f59e0b !important;
      color: #ffffff !important;
    }

    .cell-blue-stretch {
      background: #3b82f6 !important;
      color: #ffffff !important;
    }

    .tok-finished.yellow { background: #d97706; }
    .tok-finished.blue { background: #2563eb; }

    .progress-pill.yellow { border-left: 4px solid #f59e0b; }
    .progress-pill.blue { border-left: 4px solid #3b82f6; }

    .ludo-players-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .player-tag.turn-active {
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
      border-color: #38bdf8 !important;
    }

    .ludo-mode-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .ludo-mode-btn {
      flex: 1;
      min-width: 90px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-sm, #334155);
      background: var(--bg-card, #1e293b);
      color: var(--text-1, #e2e8f0);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }

    .ludo-mode-btn.active {
      background: #3b82f6;
      border-color: #60a5fa;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
    }

    .ludo-token.movable {
      cursor: pointer !important;
      animation: ludoTokPulse 0.9s infinite alternate !important;
      transform: scale(1.18);
      box-shadow: 0 0 10px #38bdf8, 0 0 18px #0284c7 !important;
    }

    .ludo-token.movable:hover {
      transform: scale(1.3) !important;
    }

    @keyframes ludoTokPulse {
      from { transform: scale(1.1); filter: brightness(1); }
      to { transform: scale(1.22); filter: brightness(1.25); }
    }

    /* ── Ludo Interactive 3D Dice Console ── */
    .ludo-interactive-console {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      background: var(--bg-muted, #f8fafc);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 14px;
      padding: 12px 16px;
      box-sizing: border-box;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    [data-theme="dark"] .ludo-interactive-console {
      background: #151f32;
      border-color: #2b3952;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }

    .ludo-dice-interactive-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .ludo-3d-dice {
      position: relative;
      width: 64px;
      height: 64px;
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
      border-radius: 14px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 6px 0 #cbd5e1, 0 10px 20px rgba(0, 0, 0, 0.25), inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.08) !important;
      border: 3px solid #cbd5e1 !important;
      cursor: default;
      transition: transform 0.12s ease, opacity 0.12s ease;
      user-select: none;
      box-sizing: border-box !important;
      touch-action: manipulation;
    }

    [data-theme="dark"] .ludo-3d-dice {
      background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%) !important;
      box-shadow: 0 4px 0 #94a3b8, 0 8px 16px rgba(0, 0, 0, 0.45) !important;
    }

    .ludo-3d-dice.clickable {
      cursor: pointer !important;
      animation: ludoDicePulse 1.8s ease-in-out infinite alternate !important;
    }

    @keyframes ludoDicePulse {
      0% { transform: scale(0.98); }
      100% { transform: scale(1.04); }
    }

    .ludo-3d-dice.clickable:hover {
      transform: translateY(-2px);
    }

    .ludo-3d-dice.clickable:active {
      transform: translateY(2px) scale(0.96);
    }

    .ludo-3d-dice.border-red {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 0 #dc2626, 0 6px 14px rgba(239, 68, 68, 0.3) !important;
    }
    .ludo-3d-dice.border-green {
      border-color: #10b981 !important;
      box-shadow: 0 4px 0 #059669, 0 6px 14px rgba(16, 185, 129, 0.3) !important;
    }
    .ludo-3d-dice.border-yellow {
      border-color: #f59e0b !important;
      box-shadow: 0 4px 0 #d97706, 0 6px 14px rgba(245, 158, 11, 0.3) !important;
    }
    .ludo-3d-dice.border-blue {
      border-color: #3b82f6 !important;
      box-shadow: 0 4px 0 #2563eb, 0 6px 14px rgba(59, 130, 246, 0.3) !important;
    }

    .ludo-direct-number-box {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 100% !important;
      user-select: none !important;
      pointer-events: none !important;
    }

    .ludo-direct-num {
      font-size: 38px !important;
      font-weight: 900 !important;
      line-height: 1 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif !important;
      color: #0f172a !important;
      letter-spacing: -1px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      pointer-events: none !important;
    }

    [data-theme="dark"] .ludo-direct-num {
      color: #0f172a !important;
    }

    .ludo-direct-number-box.num-6 .ludo-direct-num {
      color: #ef4444 !important;
      text-shadow: 0 1px 4px rgba(239, 68, 68, 0.35);
    }

    .ludo-3d-dice.rolling {
      animation: ludoDiceWobble 0.22s ease-in-out infinite alternate !important;
      pointer-events: none !important;
    }

    @keyframes ludoDiceWobble {
      0% { transform: rotate(-7deg) scale(0.96); }
      100% { transform: rotate(7deg) scale(1.04); }
    }

    .ludo-3d-dice.just-rolled {
      animation: ludoDicePop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }

    @keyframes ludoDicePop {
      0% { transform: scale(0.85); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    .ludo-dice-svg {
      display: block !important;
      width: 52px !important;
      height: 52px !important;
      pointer-events: none !important;
      user-select: none !important;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.08));
    }

    .ludo-dice-face {
      width: 48px !important;
      height: 48px !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      grid-template-rows: repeat(3, 1fr) !important;
      gap: 3px !important;
      padding: 3px !important;
      box-sizing: border-box !important;
    }

    .ludo-pip {
      display: block !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50% !important;
      margin: auto !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      line-height: 0 !important;
      font-size: 0 !important;
    }

    .ludo-pip.ludo-pip-empty {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: auto !important;
      width: 10px !important;
      height: 10px !important;
    }

    .ludo-pip.ludo-pip-filled {
      visibility: visible !important;
      opacity: 1 !important;
      background: radial-gradient(circle at 35% 35%, #334155, #0f172a) !important;
      box-shadow: inset 0 2px 3px rgba(0,0,0,0.85), 0 1px 1px rgba(255,255,255,0.9) !important;
    }

    .ludo-dice-face.face-1 .ludo-pip.ludo-pip-filled {
      background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c) !important;
      width: 16px !important;
      height: 16px !important;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(239, 68, 68, 0.45) !important;
    }

    .ludo-dice-action-badge {
      font-size: 10.5px;
      font-weight: 800;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      text-align: center;
      white-space: nowrap;
    }

    .badge-click-roll {
      display: inline-flex !important;
      align-items: center !important;
      gap: 5px !important;
      color: #ffffff !important;
      background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
      padding: 4px 11px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      box-shadow: 0 3px 8px rgba(37, 99, 235, 0.35) !important;
      cursor: pointer !important;
      font-size: 10.5px !important;
      font-weight: 800 !important;
      animation: badgePulse 1.2s infinite alternate !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
    }

    .badge-click-roll:hover {
      transform: translateY(-1px) scale(1.05) !important;
      box-shadow: 0 5px 12px rgba(37, 99, 235, 0.5) !important;
    }

    .badge-click-roll:active {
      transform: translateY(1px) scale(0.97) !important;
    }

    @keyframes badgePulse {
      from { transform: scale(0.98); opacity: 0.92; }
      to { transform: scale(1.03); opacity: 1; }
    }

    .badge-rolled-val {
      color: #047857 !important;
      background: rgba(16, 185, 129, 0.16) !important;
      padding: 4px 10px !important;
      border-radius: 8px !important;
      border: 1px solid rgba(16, 185, 129, 0.35) !important;
      font-weight: 800 !important;
    }

    [data-theme="dark"] .badge-rolled-val {
      color: #34d399 !important;
      background: rgba(16, 185, 129, 0.2) !important;
    }

    .badge-last-roll {
      color: var(--text-2, #64748b) !important;
      background: var(--bg-card, #e2e8f0) !important;
      padding: 3px 8px !important;
      border-radius: 6px !important;
      border: 1px solid rgba(100, 116, 139, 0.25) !important;
    }

    .badge-waiting {
      color: var(--text-3, #94a3b8);
      font-size: 10px;
    }

    .ludo-console-status-pane {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .ludo-turn-indicator-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }

    .ludo-turn-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .ludo-turn-dot.red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .ludo-turn-dot.green { background: #10b981; box-shadow: 0 0 6px #10b981; }
    .ludo-turn-dot.yellow { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
    .ludo-turn-dot.blue { background: #3b82f6; box-shadow: 0 0 6px #3b82f6; }

    .ludo-turn-player-tag {
      font-size: 12.5px;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .ludo-turn-player-tag {
      color: #f1f5f9;
    }

    .ludo-guidance-message {
      font-size: 12px;
      color: var(--text-2, #64748b);
      line-height: 1.4;
    }

    .ludo-guidance-message.highlight {
      color: #0284c7;
      font-weight: 700;
    }

    [data-theme="dark"] .ludo-guidance-message.highlight {
      color: #38bdf8;
    }

    .ludo-last-action-caption {
      font-size: 11px;
      color: var(--text-3, #94a3b8);
      background: var(--bg-card, #ffffff);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--border-sm, #e2e8f0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-theme="dark"] .ludo-last-action-caption {
      background: #0f172a;
      border-color: #334155;
      color: #94a3b8;
    }

    /* ── Home Finished Celebratory Pawns & Badges ── */
    .yard-home-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 800;
      color: #b45309;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 5px;
    }

    [data-theme="dark"] .yard-home-badge {
      color: #fde047;
      background: rgba(245, 158, 11, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }

    .tok-home-champion {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px 5px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f59e0b, #d97706);
      border: 1.5px solid #fef08a;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.3);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      animation: homePawnGlow 1.5s infinite alternate;
    }

    .home-tri-pawn {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      font-weight: 800;
      padding: 1px 3px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: #fef08a;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.9);
      z-index: 6;
    }
    .home-triangle.red-tri .home-tri-pawn { left: 4px; top: 35%; }
    .home-triangle.green-tri .home-tri-pawn { top: 4px; left: 35%; }
    .home-triangle.yellow-tri .home-tri-pawn { right: 4px; top: 35%; }
    .home-triangle.blue-tri .home-tri-pawn { bottom: 4px; left: 35%; }

    .ludo-token.token-reached-home {
      background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%) !important;
      border: 2px solid #fef08a !important;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.9), 0 2px 4px rgba(0,0,0,0.4) !important;
      color: #ffffff !important;
      position: relative;
      animation: homePawnGlow 1.4s infinite alternate;
    }
    .home-crown-mini {
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8));
    }
    .yard-token-slot.slot-home {
      border-color: rgba(245, 158, 11, 0.7) !important;
      background: rgba(245, 158, 11, 0.1) !important;
    }

    @keyframes homePawnGlow {
      from { box-shadow: 0 0 6px #f59e0b; }
      to { box-shadow: 0 0 14px #fbbf24; transform: scale(1.05); }
    }

    [data-theme="dark"] .progress-pill.green {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #86efac;
    }

    .chess-move-token {
      background: var(--bg-card, #ffffff);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    /* Game Over Banner in Modal */
    .arena-game-over-banner {
      margin-top: 14px;
      padding: 14px 18px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(0, 112, 243, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%);
      border: 1px solid #38BDF8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .game-over-icon {
      font-size: 32px;
    }

    .game-over-text h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 800;
      color: #0284C7;
    }

    [data-theme="dark"] .game-over-text h4 {
      color: #a5b4fc;
    }

    .game-over-text p {
      margin: 2px 0 0 0;
      font-size: 12.5px;
      color: var(--text-2, #475569);
    }

    .btn-arena-rematch {
      padding: 8px 16px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 112, 243, 0.3);
    }

    /* General modal shared components */
    .bonding-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 16px;
      box-sizing: border-box;
    }

    .bonding-modal-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #e2e8f0);
      border-radius: 18px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      animation: modalFadeIn 0.2s ease-out;
    }

    [data-theme="dark"] .bonding-modal-card {
      background: var(--bg-surface, #111827);
      border-color: var(--border-subtle, #1f2937);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .bonding-modal-header {
      padding: 16px 22px;
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [data-theme="dark"] .bonding-modal-header {
      border-color: #1f2937;
    }

    .bonding-modal-header h3 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    .bonding-modal-close {
      background: transparent;
      border: none;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      color: var(--text-3, #94a3b8);
    }

    .bonding-modal-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bonding-modal-footer {
      padding: 14px 22px;
      border-top: 1px solid var(--border-sm, #e2e8f0);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }

    [data-theme="dark"] .bonding-modal-footer {
      border-color: #1f2937;
    }

    .bonding-form-label {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      display: block;
      color: var(--text-1, #0f172a);
    }

    [data-theme="dark"] .bonding-form-label {
      color: #f1f5f9;
    }

    .bonding-input, .bonding-select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 9px;
      border: 1px solid var(--border-sm, #cbd5e1);
      background: var(--bg-muted, #f8fafc);
      color: inherit;
      font-size: 13px;
      outline: none;
    }

    [data-theme="dark"] .bonding-input, [data-theme="dark"] .bonding-select {
      background: #1e293b;
      border-color: #334155;
    }

    .bonding-btn-primary {
      padding: 9px 16px;
      background: linear-gradient(135deg, #0070F3 0%, #0284C7 100%);
      color: #ffffff;
      border: none;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .bonding-btn-secondary {
      padding: 9px 14px;
      background: transparent;
      border: 1px solid #cbd5e1;
      color: var(--text-2, #475569);
      border-radius: 9px;
      font-size: 13px;
      cursor: pointer;
    }

    .bonding-btn-danger {
      padding: 6px 12px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .bonding-add-member-row {
      display: flex;
      gap: 10px;
    }

    .bonding-members-list {
      max-height: 200px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .bonding-member-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      background: var(--bg-muted, #f8fafc);
    }

    [data-theme="dark"] .bonding-member-item {
      background: #1e293b;
    }

    .bonding-member-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bonding-member-avatar {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 12px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bonding-member-name {
      font-size: 13px;
      font-weight: 600;
    }

    .bonding-member-role {
      font-size: 11px;
      color: var(--text-3, #64748b);
      margin-left: 6px;
    }

    .you-badge {
      font-size: 11px;
      color: #0070F3;
      font-weight: 700;
    }

    .bonding-danger-zone {
      margin-top: 16px;
      padding: 14px;
      border: 1px dashed rgba(239, 68, 68, 0.4);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: rgba(239, 68, 68, 0.03);
    }

    .danger-zone-text strong {
      display: block;
      color: #ef4444;
      font-size: 13px;
    }

    .danger-zone-text span {
      font-size: 12px;
      color: var(--text-3, #64748b);
    }

    .bonding-user-pick-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 280px;
      overflow-y: auto;
    }

    .bonding-user-pick-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 10px;
      background: var(--bg-muted, #f8fafc);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    [data-theme="dark"] .bonding-user-pick-item {
      background: #1e293b;
    }

    .bonding-user-pick-item:hover {
      background: rgba(0, 112, 243, 0.1);
    }

    .bonding-user-pick-info {
      flex: 1;
      margin-left: 10px;
    }

    .user-pick-name {
      font-size: 13.5px;
      font-weight: 700;
      display: block;
    }

    .user-pick-role {
      font-size: 11.5px;
      color: var(--text-3, #64748b);
    }

    .bonding-avatar-picker {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .avatar-opt {
      font-size: 22px;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid var(--border-sm, #cbd5e1);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .avatar-opt.active {
      border-color: #0070F3;
      background: rgba(0, 112, 243, 0.12);
      transform: scale(1.08);
    }

    .bonding-member-checkboxes {
      max-height: 180px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 10px;
      padding: 8px;
    }

    .bonding-check-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
    }

    .bonding-check-label:hover {
      background: var(--bg-hover, #f1f5f9);
    }

    [data-theme="dark"] .bonding-check-label:hover {
      background: #1e293b;
    }

    .bonding-emoji-popup {
      position: absolute;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.18);
      z-index: 10001;
    }

    [data-theme="dark"] .bonding-emoji-popup {
      background: #1c2638;
      border-color: #334361;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .emoji-opt-btn {
      font-size: 24px;
      padding: 8px;
      border: none;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .emoji-opt-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      transform: scale(1.2);
    }

    [data-theme="dark"] .emoji-opt-btn:hover {
      background: #2a374f;
    }

    /* Organized Chat Emoji Palette (Floating above input bar) */
    .bonding-chat-emoji-palette {
      width: 320px;
      max-width: calc(100vw - 24px);
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border-sm, #cbd5e1);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
      z-index: 10002;
      overflow: hidden;
      animation: bondingPalettePop 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes bondingPalettePop {
      from { opacity: 0; transform: translateY(8px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    [data-theme="dark"] .bonding-chat-emoji-palette {
      background: #111827;
      border-color: #374151;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.55);
    }

    .emoji-palette-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 10px;
      background: var(--bg-muted, #f8fafc);
      border-bottom: 1px solid var(--border-sm, #e2e8f0);
    }

    [data-theme="dark"] .emoji-palette-tabs {
      background: #1f2937;
      border-color: #374151;
    }

    .emoji-tab-btn {
      flex: 1;
      height: 36px;
      padding: 0;
      border: none;
      background: transparent;
      font-size: 20px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .emoji-tab-btn:hover {
      background: var(--bg-hover, #f1f5f9);
      transform: scale(1.08);
    }

    [data-theme="dark"] .emoji-tab-btn:hover {
      background: #374151;
    }

    .emoji-tab-btn.active {
      background: rgba(0, 112, 243, 0.14);
      border-bottom: 2px solid #0070F3;
      transform: scale(1.1);
    }

    [data-theme="dark"] .emoji-tab-btn.active {
      background: rgba(0, 112, 243, 0.25);
      border-bottom-color: #38BDF8;
    }

    .emoji-palette-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-3, #94a3b8);
    }

    .emoji-palette-close {
      border: none;
      background: transparent;
      font-size: 20px;
      line-height: 1;
      color: var(--text-3, #94a3b8);
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .emoji-palette-close:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    .emoji-palette-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
      padding: 8px 12px 14px;
      max-height: 220px;
      overflow-y: auto;
    }

    .chat-emoji-cell {
      height: 42px;
      border: none;
      background: transparent;
      font-size: 24px;
      line-height: 1;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.12s ease, background 0.12s ease;
      user-select: none;
    }

    .chat-emoji-cell:hover {
      background: rgba(0, 112, 243, 0.12);
      transform: scale(1.22);
    }

    [data-theme="dark"] .chat-emoji-cell:hover {
      background: rgba(0, 112, 243, 0.22);
    }
    /* Dots & Boxes 4x4 Arena & Multiplayer Board Styles */
    .dotsboxes-arena-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
    }
    .dotsboxes-scoreboard {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      width: 100%;
    }
    .dots-player-card {
      display: flex;
      flex-direction: column;
      padding: 8px 14px;
      border-radius: 12px;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      min-width: 90px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .dots-player-card.is-turn-active {
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }
    .dots-player-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 4px;
    }
    .dots-player-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 6px currentColor;
    }
    .dots-player-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
    }
    .dots-turn-pill {
      font-size: 9px;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 4px;
      background: #38bdf8;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin-left: auto;
    }
    .dots-player-score {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .dots-player-score .score-val {
      font-size: 20px;
      font-weight: 900;
      line-height: 1;
    }
    .dots-player-score .score-lbl {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
    .dotsboxes-board-wrapper {
      position: relative;
      padding: 18px;
      background: rgba(15, 23, 42, 0.9);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dotsboxes-grid {
      display: grid;
      grid-template-columns: 14px 52px 14px 52px 14px 52px 14px 52px 14px;
      grid-template-rows: 14px 52px 14px 52px 14px 52px 14px 52px 14px;
      align-items: center;
      justify-items: center;
      user-select: none;
    }
    .dots-cell.dot-intersection {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }
    .dots-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #f8fafc;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
      pointer-events: none;
    }
    .dots-cell.dots-line {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      z-index: 3;
    }
    .dots-cell.dots-line.h-line {
      width: 52px;
      height: 14px;
    }
    .dots-cell.dots-line.v-line {
      width: 14px;
      height: 52px;
    }
    .dots-cell.dots-line.h-line .dots-line-bar {
      width: 50px;
      height: 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      transition: all 0.15s ease;
    }
    .dots-cell.dots-line.v-line .dots-line-bar {
      width: 6px;
      height: 50px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      transition: all 0.15s ease;
    }
    .dots-cell.dots-line.clickable {
      cursor: pointer;
    }
    .dots-cell.dots-line.clickable:hover .dots-line-bar {
      background: rgba(56, 189, 248, 0.85);
      box-shadow: 0 0 10px #38bdf8;
      transform: scale(1.15);
    }
    .dots-cell.dots-line.drawn.color-red .dots-line-bar {
      background: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
    }
    .dots-cell.dots-line.drawn.color-blue .dots-line-bar {
      background: #3b82f6;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
    }
    .dots-cell.dots-line.drawn.color-green .dots-line-bar {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
    }
    .dots-cell.dots-line.drawn.color-amber .dots-line-bar {
      background: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
    }
    .dots-cell.dots-box {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 1;
    }
    .dots-cell.dots-box.claimed {
      animation: boxClaimPop 0.3s ease-out;
    }
    @keyframes boxClaimPop {
      0% { transform: scale(0.6); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .dots-cell.dots-box.claimed.color-red {
      background: rgba(239, 68, 68, 0.22);
      border: 1px solid rgba(239, 68, 68, 0.45);
    }
    .dots-cell.dots-box.claimed.color-blue {
      background: rgba(59, 130, 246, 0.22);
      border: 1px solid rgba(59, 130, 246, 0.45);
    }
    .dots-cell.dots-box.claimed.color-green {
      background: rgba(16, 185, 129, 0.22);
      border: 1px solid rgba(16, 185, 129, 0.45);
    }
    .dots-cell.dots-box.claimed.color-amber {
      background: rgba(245, 158, 11, 0.22);
      border: 1px solid rgba(245, 158, 11, 0.45);
    }
    .dots-box-claim-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .box-owner-initial {
      font-size: 16px;
      font-weight: 900;
      color: #f8fafc;
    }
    .box-score-tag {
      font-size: 9px;
      font-weight: 800;
      color: #38bdf8;
      margin-top: 2px;
    }
    .dotsboxes-console-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 100%;
      text-align: center;
      padding: 8px 12px;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .dots-guidance {
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .dots-guidance.highlight {
      color: #38bdf8;
    }
    .dots-guidance strong {
      color: #ffffff;
    }
    .dots-caption {
      font-size: 11.5px;
      color: #94a3b8;
    }

    /* Chat Emoji Palette Popover */
    .chat-emoji-picker-popover {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 10px;
      width: 290px;
      max-height: 260px;
      background: var(--bg-surface, #1e293b);
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.12));
      border-radius: 14px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      z-index: 10005;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: popoverFadeIn 0.15s ease-out;
    }
    @keyframes popoverFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .emoji-picker-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(0, 0, 0, 0.15);
      padding: 4px;
      gap: 2px;
    }
    .emoji-picker-tab {
      flex: 1;
      padding: 4px;
      font-size: 15px;
      background: transparent;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: background 0.12s;
    }
    .emoji-picker-tab:hover, .emoji-picker-tab.active {
      background: rgba(255, 255, 255, 0.12);
    }
    .emoji-picker-body {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
    }
    .emoji-picker-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      padding: 6px 2px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: transform 0.1s, background 0.1s;
    }
    .emoji-picker-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: scale(1.2);
    }

    `,document.head.appendChild(n)}function $a(s){if(!s)return"";const n=v(s),t=/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;return n.replace(t,g=>`<a href="${g}" target="_blank" rel="noopener noreferrer" class="ci-360-inline-link">${g} ↗</a>`)}const ga=[{key:"To Do",label:"To Do",badgeClass:"todo"},{key:"Content",label:"Content",badgeClass:"content"},{key:"Design",label:"Design",badgeClass:"design"},{key:"Under Review",label:"Under Review",badgeClass:"review"},{key:"Ready to Leave",label:"Ready to Leave",badgeClass:"ready"}],Et=[{key:"Task",label:"Task",icon:"📝",slug:"task"},{key:"Bug",label:"Bug",icon:"🐛",slug:"bug"},{key:"Feature",label:"Feature",icon:"✨",slug:"feature"},{key:"Internal",label:"Internal",icon:"🏢",slug:"internal"},{key:"Infrastructure",label:"Infrastructure",icon:"⚙️",slug:"infrastructure"},{key:"Client Request",label:"Client Request",icon:"💼",slug:"client-request"},{key:"General",label:"General",icon:"📌",slug:"general"}],Rt=[{key:"Critical",label:"Critical",icon:"🔴 ⬆⬆",color:"#ef4444"},{key:"High",label:"High",icon:"🟠 ⬆",color:"#f97316"},{key:"Medium",label:"Medium",icon:"🟡 〓",color:"#eab308"},{key:"Low",label:"Low",icon:"🟢 ⬇",color:"#22c55e"}];async function mn(s,n={}){const{userRole:t="employee",currentUser:g=null,initialTicketId:k=null}=n,m=t==="superadmin"||t==="admin";if(t==="client"||g&&g.role==="client"){s.innerHTML=`
      <div style="padding:40px;text-align:center;color:#ef4444;font-size:16px;font-weight:700;">
        ⛔ Access Denied: Support Tickets are internal to company staff only.
      </div>
    `;return}let c=[],r={},O=[],X=[],F={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:n.initialJobId||"all",myIssuesOnly:!1},R=null,V="comments",W=!1;s.innerHTML=`
    <div class="ci-360-module-wrap">
      <!-- Top Header Toolbar -->
      <div class="ci-360-header-bar">
        <div class="ci-360-header-left">
          <div class="ci-360-breadcrumb">
            <span class="ci-360-project-icon">CI</span>
            <span>CI360 / SUPPORT / ${m?"ALL TICKETS (ADMIN)":"MY ASSIGNED TICKETS"}</span>
          </div>
          <div class="ci-360-title-row">
            <h2 class="ci-360-main-title">🎫 ${m?"Support Tickets Board":"Support Tickets"}</h2>
          </div>
        </div>
        <div class="ci-360-header-actions">
          <button class="btn-ci-360-secondary" id="btn-ci-360-refresh" title="Refresh Board">
            🔄 Refresh
          </button>
          <button class="btn-ci-360-primary" id="btn-ci-360-create-ticket">
            + Create Ticket
          </button>
        </div>
      </div>

      <!-- Stats Overview Ribbon -->
      <div class="ci-360-stats-ribbon" id="ci-360-stats-root">
        <div class="ci-360-stat-card"><span class="ci-360-stat-val">—</span><span class="ci-360-stat-lbl">Loading Stats...</span></div>
      </div>

      <!-- Filter Toolbar -->
      <div class="ci-360-filter-bar">
        <div class="ci-360-filter-left">
          <div class="ci-360-search-wrap">
            <span class="ci-360-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input type="text" id="ci-360-search-input" class="ci-360-search-input" placeholder="Search ticket (ID, title, description)..." />
          </div>

          <select id="ci-360-filter-priority" class="ci-360-filter-select">
            <option value="all">Priority: All</option>
            <option value="Critical">🔴 Critical</option>
            <option value="High">🟠 High</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <select id="ci-360-filter-category" class="ci-360-filter-select">
            <option value="all">Category: All</option>
            ${Et.map(e=>`<option value="${e.key}">${e.icon} ${e.label}</option>`).join("")}
          </select>

          <select id="ci-360-filter-job" class="ci-360-filter-select">
            <option value="all">Linked Job: All</option>
          </select>

          <select id="ci-360-filter-assignee" class="ci-360-filter-select">
            <option value="all">Assignee: All</option>
            <option value="unassigned">Unassigned</option>
          </select>

          <button type="button" class="ci-360-pill-filter" id="ci-360-pill-my-issues">
            Only My Issues
          </button>

          <span class="ci-360-clear-filters" id="ci-360-clear-filters" style="display:none;">Clear Filters</span>
        </div>
      </div>

      <!-- Scrum Board Columns Container -->
      <div class="ci-360-board-columns" id="ci-360-board-columns-root">
        <div style="padding:40px;color:#94a3b8;font-size:14px;font-weight:600;">
          Loading Scrum Board...
        </div>
      </div>

      <!-- Modal Injection Root -->
      <div id="ci-360-modals-root"></div>
    </div>
  `,await Promise.all([nt(),Je(),bt(),Ft()]),lt(),dt(),qe(),Re(),k&&st(k);const me=setInterval(()=>{if(!document.contains(s)){clearInterval(me);return}!(s.querySelector(".dragging")||s.querySelector("input:focus")||s.querySelector("textarea:focus"))&&!R&&pe()},12e3),$e=()=>{document.contains(s)&&!R&&pe()};window.addEventListener("focus",$e);async function Je(){try{const e=new URLSearchParams;F.search&&e.set("search",F.search),F.priority!=="all"&&e.set("priority",F.priority),F.category!=="all"&&e.set("category",F.category),F.assigneeId!=="all"&&e.set("assigneeId",F.assigneeId),F.jobId&&F.jobId!=="all"&&e.set("jobId",F.jobId),F.reporterId&&F.reporterId!=="all"&&e.set("reporterId",F.reporterId),F.scope==="created"&&e.set("reporterId",g?._id||g?.id),F.scope==="assigned"&&e.set("assigneeId",g?._id||g?.id),F.myIssuesOnly&&e.set("myIssuesOnly","true");const i=await Me("/tickets?"+e.toString());c=Array.isArray(i)?i:[]}catch(e){$(e.message||"Failed to load tickets",!0),c=[]}}async function nt(){try{r=await Me("/tickets/stats")}catch(e){console.warn("Could not fetch ticket stats:",e)}}async function bt(){try{let e;try{e=await Me("/tickets/staff")}catch{e=await Me("/users")}O=(e||[]).filter(i=>i.active!==!1&&i.role!=="client")}catch(e){console.warn("Could not fetch employees:",e),O=[]}}async function Ft(){try{const e=await Me("/jobs?limit=250");X=Array.isArray(e)?e:e?.jobs||[]}catch(e){console.warn("Could not fetch jobs:",e)}}function lt(){const e=s.querySelector("#ci-360-stats-root");e&&(e.innerHTML=`
      <div class="ci-360-stat-card ${F.status==="all"&&!F.myIssuesOnly?"active":""}" data-stat-filter="all">
        <span class="ci-360-stat-val">${r.total||0}</span>
        <span class="ci-360-stat-lbl">Total Tickets</span>
      </div>
      <div class="ci-360-stat-card ${F.status==="To Do"?"active":""}" data-stat-filter="To Do">
        <span class="ci-360-stat-val">${r.toDo||0}</span>
        <span class="ci-360-stat-lbl">To Do</span>
      </div>
      <div class="ci-360-stat-card content ${F.status==="Content"?"active":""}" data-stat-filter="Content">
        <span class="ci-360-stat-val">${r.content??(r.inProgress||0)}</span>
        <span class="ci-360-stat-lbl">Content</span>
      </div>
      <div class="ci-360-stat-card design ${F.status==="Design"?"active":""}" data-stat-filter="Design">
        <span class="ci-360-stat-val">${r.design||0}</span>
        <span class="ci-360-stat-lbl">Design</span>
      </div>
      <div class="ci-360-stat-card review ${F.status==="Under Review"?"active":""}" data-stat-filter="Under Review">
        <span class="ci-360-stat-val">${r.underReview||0}</span>
        <span class="ci-360-stat-lbl">Under Review</span>
      </div>
      <div class="ci-360-stat-card ready ${F.status==="Ready to Leave"?"active":""}" data-stat-filter="Ready to Leave">
        <span class="ci-360-stat-val">${r.readyToLeave??(r.resolved||r.closed||0)}</span>
        <span class="ci-360-stat-lbl">Ready to Leave</span>
      </div>
      <div class="ci-360-stat-card critical" data-stat-filter="critical">
        <span class="ci-360-stat-val">${r.critical||0}</span>
        <span class="ci-360-stat-lbl">Critical 🔴</span>
      </div>
      <div class="ci-360-stat-card overdue" data-stat-filter="overdue">
        <span class="ci-360-stat-val">${r.overdue||0}</span>
        <span class="ci-360-stat-lbl">Overdue ⚠️</span>
      </div>
    `,e.querySelectorAll(".ci-360-stat-card").forEach(i=>{i.onclick=async()=>{const b=i.dataset.statFilter;b==="all"?(F.status="all",F.priority="all"):b==="critical"?(F.priority="Critical",F.status="all"):(F.status=b,F.priority="all"),await pe()}}))}function qe(){const e=s.querySelector("#ci-360-filter-assignee");e&&(e.innerHTML=`
        <option value="all">Assignee: All</option>
        <option value="unassigned">Unassigned</option>
        ${O.map(b=>`
          <option value="${b._id}" ${F.assigneeId===b._id.toString()?"selected":""}>
            ${v(b.name)} (${v(b.role)})
          </option>
        `).join("")}
      `);const i=s.querySelector("#ci-360-filter-job");i&&(i.innerHTML=`
        <option value="all">Linked Job: All</option>
        ${X.map(b=>`
          <option value="${b._id}" ${F.jobId===b._id.toString()?"selected":""}>
            📁 ${v(b.title||"Untitled Job")}
          </option>
        `).join("")}
      `)}function dt(){const e=s.querySelector("#ci-360-board-columns-root");if(!e)return;const i={};ga.forEach(b=>{i[b.key]=[]}),c.forEach(b=>{let y=b.status||"To Do";y==="In Progress"?y="Content":y==="Resolved"?y="Under Review":y==="Closed"&&(y="Ready to Leave"),i[y]||(i[y]=[]),i[y].push(b)}),e.innerHTML=ga.map(b=>{const y=i[b.key]||[];return`
        <div class="ci-360-board-column" data-status="${b.key}">
          <div class="ci-360-column-header">
            <div class="ci-360-col-title-wrap">
              <span class="ci-360-col-title">${v(b.label)}</span>
              <span class="ci-360-col-badge">${y.length}</span>
            </div>
          </div>
          <div class="ci-360-cards-list" data-column-status="${b.key}">
            ${y.length===0?`
              <div style="padding:18px 6px;text-align:center;color:#475569;font-size:11px;font-style:italic;">
                No tickets
              </div>
            `:y.map(_=>kt(_)).join("")}
          </div>
        </div>
      `}).join(""),Be(),wt()}function kt(e){const i=Et.find(f=>f.key===e.category)||Et[0],b=Rt.find(f=>f.key===e.priority)||Rt[2],y=e.dueDate&&new Date(e.dueDate)<new Date&&e.status!=="Ready to Leave"&&e.status!=="Closed",_=(e.subtasks||[]).filter(f=>f.completed).length,L=(e.subtasks||[]).length,q=Array.isArray(e.assignees)&&e.assignees.length>0?e.assignees:e.assignee&&e.assignee.userId?[e.assignee]:[],I=g?._id||g?.id,z=e.reporter&&e.reporter.userId&&String(e.reporter.userId)===String(I)||e.userId&&String(e.userId)===String(I),M=t==="superadmin"||g?.role==="superadmin",p=z||M;let B="";if(q.length===0)B='<div class="ci-360-avatar unassigned" title="Unassigned">?</div>';else{const f=q.slice(0,3),P=q.length-3;B=`
        <div class="ci-360-avatar-group">
          ${f.map(H=>`
            <div class="ci-360-avatar" title="Assignee: ${v(H.name||"Member")} (${v(H.role||"")})">
              ${(H.avatar||H.name?.slice(0,1)||"U").toUpperCase()}
            </div>
          `).join("")}
          ${P>0?`
            <div class="ci-360-avatar extra-count" title="${P} more assignees: ${v(q.slice(3).map(H=>H.name).join(", "))}">
              +${P}
            </div>
          `:""}
        </div>
      `}return`
      <div class="ci-360-card" draggable="true" data-ticket-id="${e._id}">
        <div class="ci-360-card-top">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="ci-360-category-pill ${i.slug}">
              ${i.icon} ${i.label}
            </span>
            ${z?`
              <span class="ci-360-reporter-tag" title="You created this ticket">
                ✍️ By You
              </span>
            `:""}
            ${e.dueDate?`
              <span class="ci-360-due-pill ${y?"overdue":""}" title="Due Date">
                ${y?"⚠️ ":"📅 "}
                ${new Date(e.dueDate).toISOString().slice(0,10)}
              </span>
            `:""}
          </div>
          ${p?`
            <button type="button" class="ci-360-card-quick-del btn-delete-card-ticket" data-ticket-id="${e._id}" data-ticket-num="${v(e.ticketId)}" title="Delete Ticket (${M?"Superadmin":"Creator"})">
              🗑️
            </button>
          `:""}
        </div>

        <div class="ci-360-card-title" title="${v(e.title)}">
          ${v(e.title)}
        </div>

        ${e.jobTitle||e.jobId&&e.jobId.title?`
          <div class="ci-360-card-job-link" title="Linked Internal Job: ${v(e.jobTitle||e.jobId.title)}">
            📁 ${v(e.jobTitle||e.jobId.title)}
          </div>
        `:""}

        ${e.linkUrl||e.links&&e.links.length>0?`
          <div style="margin: 4px 0 2px 0;">
            <a href="${v(e.linkUrl||e.links[0]?.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-card-link-badge" onclick="event.stopPropagation();" title="Open URL: ${v(e.linkUrl||e.links[0]?.url)}">
              🔗 ${e.links&&e.links[0]?.title?v(e.links[0].title):"External Link"} ↗
            </a>
          </div>
        `:""}

        <div class="ci-360-card-bottom">
          <div class="ci-360-card-id-row">
            <span class="ci-360-pri-icon" title="Priority: ${b.label}">${b.icon}</span>
            <span class="ci-360-ticket-id">${v(e.ticketId)}</span>
          </div>

          <div class="ci-360-card-assignee-row">
            ${L>0?`
              <span class="ci-360-subtask-badge" title="${_} of ${L} subtasks completed">
                ☑ ${_}/${L}
              </span>
            `:""}
            ${B}
          </div>
        </div>
      </div>
    `}function Be(){const e=s.querySelectorAll(".ci-360-card"),i=s.querySelectorAll(".ci-360-board-column");e.forEach(b=>{b.ondragstart=y=>{y.dataTransfer.setData("text/plain",b.dataset.ticketId),b.classList.add("dragging")},b.ondragend=()=>{b.classList.remove("dragging")}}),i.forEach(b=>{b.ondragover=y=>{y.preventDefault(),b.classList.add("drag-over")},b.ondragleave=()=>{b.classList.remove("drag-over")},b.ondrop=async y=>{y.preventDefault(),b.classList.remove("drag-over");const _=y.dataTransfer.getData("text/plain"),L=b.dataset.status;if(!_||!L)return;const q=c.find(p=>p._id.toString()===_);if(!q||q.status===L)return;const I=q.status,z=q.assignees?[...q.assignees]:[],M=q.assignee?{...q.assignee}:null;if(q.status=L,L==="Under Review"){const p={name:"John",role:"Staff",email:"john@ci360.local",avatar:"J"};q.assignee=p,q.assignees=[p]}dt();try{const p=await tt(`/tickets/${_}/status`,{status:L}),B=L==="Under Review"?`Moved ${p.ticketId} to Under Review (Default assigned to John)`:`Moved ${p.ticketId} to ${L}`;$(B,!1),await pe()}catch(p){$(p.message||"Status update failed",!0),q.status=I,q.assignees=z,q.assignee=M,await pe()}}})}function wt(){s.querySelectorAll(".btn-delete-card-ticket").forEach(e=>{e.onclick=async i=>{i.stopPropagation(),i.preventDefault();const b=e.dataset.ticketId,y=e.dataset.ticketNum||"ticket";if(confirm(`Are you sure you want to permanently delete ticket ${y}?`)){e.disabled=!0;try{await at(`/tickets/${b}`),$(`Ticket ${y} deleted`,!1),await pe()}catch(_){$(_.message||"Failed to delete ticket",!0),e.disabled=!1}}}}),s.querySelectorAll(".ci-360-card").forEach(e=>{e.onclick=i=>{if(i.target.tagName==="A"||i.target.closest(".btn-delete-card-ticket"))return;const b=e.dataset.ticketId;st(b)}})}function Re(){const e=s.querySelector("#btn-ci-360-refresh");e&&(e.onclick=async()=>{await pe(),$("Board updated",!1)});const i=s.querySelector("#btn-ci-360-create-ticket");i&&(i.onclick=()=>{ft()});const b=s.querySelector("#ci-360-search-input");let y=null;b&&(b.oninput=H=>{clearTimeout(y),y=setTimeout(async()=>{F.search=H.target.value.trim(),Ve(),await pe()},300)});const _=s.querySelector("#ci-360-filter-priority");_&&(_.onchange=async H=>{F.priority=H.target.value,Ve(),await pe()});const L=s.querySelector("#ci-360-filter-category");L&&(L.onchange=async H=>{F.category=H.target.value,Ve(),await pe()});const q=s.querySelector("#ci-360-filter-job");q&&(q.onchange=async H=>{F.jobId=H.target.value,Ve(),await pe()});const I=s.querySelector("#ci-360-filter-assignee");I&&(I.onchange=async H=>{F.assigneeId=H.target.value,Ve(),await pe()});const z=s.querySelector("#ci-360-pill-my-issues");z&&(z.onclick=async()=>{F.myIssuesOnly=!F.myIssuesOnly,z.classList.toggle("active",F.myIssuesOnly),Ve(),await pe()});const M=s.querySelector("#ci-360-pill-scope-all"),p=s.querySelector("#ci-360-pill-scope-assigned"),B=s.querySelector("#ci-360-pill-scope-created"),f=async H=>{F.scope=H,M&&M.classList.toggle("active",H==="all"),p&&p.classList.toggle("active",H==="assigned"),B&&B.classList.toggle("active",H==="created"),Ve(),await pe()};M&&(M.onclick=()=>f("all")),p&&(p.onclick=()=>f("assigned")),B&&(B.onclick=()=>f("created"));const P=s.querySelector("#ci-360-clear-filters");P&&(P.onclick=async()=>{F={search:"",status:"all",priority:"all",category:"all",assigneeId:"all",reporterId:"all",scope:"all",jobId:"all",myIssuesOnly:!1},b&&(b.value=""),_&&(_.value="all"),L&&(L.value="all");const H=s.querySelector("#ci-360-filter-job");H&&(H.value="all"),I&&(I.value="all"),z&&z.classList.remove("active"),M&&M.classList.add("active"),p&&p.classList.remove("active"),B&&B.classList.remove("active"),Ve(),await pe()})}function Ve(){const e=s.querySelector("#ci-360-clear-filters");if(!e)return;const i=F.search||F.priority!=="all"||F.category!=="all"||F.jobId&&F.jobId!=="all"||F.assigneeId!=="all"||F.myIssuesOnly||F.scope&&F.scope!=="all";e.style.display=i?"inline":"none"}async function pe(){await Je(),dt()}async function st(e){const i=s.querySelector("#ci-360-modals-root");if(i){i.innerHTML=`
      <div class="ci-360-modal-backdrop">
        <div class="ci-360-modal-card" style="align-items:center;justify-content:center;">
          <div style="color:#94a3b8;font-size:15px;font-weight:600;">Loading Issue Details...</div>
        </div>
      </div>
    `;try{R=await Me(`/tickets/${e}`)}catch(b){$(b.message||"Could not load ticket",!0),i.innerHTML="";return}ke()}}function ke(){const e=s.querySelector("#ci-360-modals-root");if(!e||!R)return;const i=R,b=Et.find(a=>a.key===i.category)||Et[0];Rt.find(a=>a.key===i.priority)||Rt[2];const y=i.subtasks||[],_=y.filter(a=>a.completed).length,L=y.length>0?Math.round(_/y.length*100):0,q=i.attachments||[],I=i.comments||[],z=(i.history||[]).slice().reverse(),M=i.workLogs||[],p=i.linkedTickets||[],B=g?._id||g?.id,f=i.reporter&&i.reporter.userId&&String(i.reporter.userId)===String(B)||i.userId&&String(i.userId)===String(B),P=t==="superadmin"||g?.role==="superadmin",H=f||P,E=Array.isArray(i.assignees)&&i.assignees.length>0?i.assignees:i.assignee&&i.assignee.userId?[i.assignee]:[];E.some(a=>a&&a.userId&&String(a.userId)===String(B));const d=i.jobId?._id?i.jobId._id.toString():i.jobId?i.jobId.toString():"",o=i.jobTitle||i.jobId&&i.jobId.title||"";e.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-detail-backdrop">
        <div class="ci-360-modal-card">
          <!-- Top Bar -->
          <div class="ci-360-modal-header">
            <div class="ci-360-modal-title-row">
              <span class="ci-360-category-pill ${b.slug}">${b.icon} ${b.label}</span>
              <span class="ci-360-ticket-id" style="font-size:13px;color:#38bdf8;">${v(i.ticketId)}</span>
            </div>
            <button class="ci-360-modal-close" id="btn-close-ci-360-modal" title="Close (Esc)">&times;</button>
          </div>

          <!-- 2-Column Body -->
          <div class="ci-360-detail-body">
            <!-- Left Main Column (68%) -->
            <div class="ci-360-detail-main">
              <!-- Issue Title Header -->
              <div class="ci-360-issue-header-wrap">
                <input type="text" class="ci-360-editable-title" id="inp-detail-title" value="${v(i.title)}" title="Click to edit title" />
              </div>

              <!-- Description Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Description</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-desc-edit">
                    ${W?"Cancel":"✏️ Edit"}
                  </button>
                </div>

                ${W?`
                  <div class="ci-360-editor-toolbar">
                    <button type="button" class="ci-360-tool-btn" data-fmt="bold"><strong>B</strong></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="italic"><em>I</em></button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="bullet">• List</button>
                    <button type="button" class="ci-360-tool-btn" data-fmt="code">&lt;/&gt;</button>
                  </div>
                  <textarea id="inp-detail-desc" class="ci-360-desc-editor" rows="6">${v(i.description||"")}</textarea>
                  <div style="display:flex;gap:8px;margin-top:6px;">
                    <button class="btn-ci-360-primary" id="btn-save-desc">Save Description</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-desc">Cancel</button>
                  </div>
                `:`
                  <div class="ci-360-desc-wrap" id="view-detail-desc">
                    ${i.description?$a(i.description):'<span style="color:#64748b;font-style:italic;">No description provided. Click "Edit" to add details.</span>'}
                  </div>
                `}
              </div>

              <!-- Reference & External URLs (Figma, Loom, Live App, Docs) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>🔗 Reference &amp; External Links (${(i.links||[]).length+(i.linkUrl&&!(i.links||[]).some(a=>a.url===i.linkUrl)?1:0)})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-toggle-add-link" style="font-size:11px;padding:4px 9px;">
                    + Add Link
                  </button>
                </div>

                <div id="add-link-form" class="ci-360-form-box" style="display:none;padding:12px;margin-bottom:10px;">
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <input type="url" id="inp-new-link-url" class="ci-360-form-input" placeholder="Paste link URL (e.g. https://figma.com/..., https://loom.com/..., live website)..." />
                    <input type="text" id="inp-new-link-title" class="ci-360-form-input" placeholder="Link label / description (Optional, e.g. Figma UI, Loom Video, Live App)..." />
                    <div style="display:flex;gap:8px;justify-content:flex-end;">
                      <button type="button" class="btn-ci-360-secondary" id="btn-cancel-new-link" style="font-size:12px;padding:6px 12px;">Cancel</button>
                      <button type="button" class="btn-ci-360-primary" id="btn-save-new-link" style="font-size:12px;padding:6px 12px;">Save Link 🔗</button>
                    </div>
                  </div>
                </div>

                ${i.links&&i.links.length>0||i.linkUrl?`
                  <div class="ci-360-links-list" style="display:flex;flex-direction:column;gap:8px;">
                    ${i.linkUrl&&!(i.links||[]).some(a=>a.url===i.linkUrl)?`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(i.linkUrl)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(i.linkUrl)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">Primary Reference Link</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(i.linkUrl)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(i.linkUrl)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                        </div>
                      </div>
                    `:""}
                    ${(i.links||[]).map(a=>`
                      <div class="ci-360-link-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:8px;">
                        <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                          <span style="font-size:16px;">🔗</span>
                          <div style="min-width:0;flex:1;">
                            <a href="${v(a.url)}" target="_blank" rel="noopener noreferrer" class="ci-360-link-anchor" style="font-size:12.5px;font-weight:700;color:#38bdf8;text-decoration:none;display:inline-flex;align-items:center;gap:4px;word-break:break-all;">
                              ${v(a.title||a.url)} <span>↗</span>
                            </a>
                            <div style="font-size:11px;color:#94a3b8;">
                              ${a.title?`<span style="word-break:break-all;">${v(a.url)}</span> · `:""}Added by ${v(a.addedBy||"Staff")}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <button type="button" class="btn-ci-360-secondary btn-copy-link" data-url="${v(a.url)}" style="font-size:11px;padding:3px 8px;">Copy</button>
                          <a href="${v(a.url)}" target="_blank" rel="noopener noreferrer" class="btn-ci-360-primary" style="font-size:11px;padding:3px 9px;text-decoration:none;">Open ↗</a>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${a.id}" title="Remove Link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No reference links added yet. Click "+ Add Link" to attach Figma, Loom, Live App, or Drive links.</div>
                `}
              </div>

              <!-- Attachments Section (Fast streaming - any file format up to 1GB) -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Attachments (${q.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-trigger-detail-upload" style="font-size:11px;padding:4px 9px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                    <span>📎 Upload Any File / Video (Up to 1GB)</span>
                  </button>
                  <input type="file" id="inp-detail-att-upload" multiple style="display:none;" />
                </div>

                <div id="detail-att-upload-progress" style="display:none;margin-top:8px;"></div>

                ${q.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No attachments yet. Upload MP4 videos (up to 1GB), screen recordings, screenshots, or logs.</div>
                `:`
                  <div class="ci-360-attachments-grid">
                    ${q.map(a=>{const h=a.type&&a.type.includes("video")||a.name&&a.name.match(/\.(mp4|mov|webm|avi|mkv)$/i)||a.url&&a.url.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
                        <div class="ci-360-att-card ${h?"is-video":""}" style="${h?"grid-column: 1 / -1; display:flex; flex-direction:column; gap:6px;":""}">
                          <div style="display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;">
                            <div class="ci-360-att-left">
                              <span style="font-size:${h?"16px":"13px"};">${h?"🎬":"📎"}</span>
                              <div style="display:flex;flex-direction:column;min-width:0;">
                                <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="ci-360-att-name" title="${v(a.name)}">
                                  ${v(a.name)}
                                </a>
                                <span style="font-size:10.5px;color:#94a3b8;">${fa(a.size)} ${h?"• MP4 Video":""}</span>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                              ${h?`
                                <button type="button" class="btn-play-att-video" data-slot="video-slot-${a.id}" style="background:#0284c7;color:#fff;border:none;border-radius:4px;padding:3px 9px;font-size:11px;font-weight:600;cursor:pointer;">
                                  ▶ Play Video
                                </button>
                              `:""}
                              <a href="${a.url}" download="${v(a.name)}" class="btn-ci-360-secondary" style="font-size:11px;padding:3px 7px;text-decoration:none;" title="Download">⬇</a>
                              <button type="button" class="ci-360-att-del btn-del-att" data-att-id="${a.id}" title="Delete file">&times;</button>
                            </div>
                          </div>
                          ${h?`
                            <div class="ci-360-video-slot" id="video-slot-${a.id}" style="display:none;margin-top:6px;width:100%;">
                              <video controls preload="metadata" style="width:100%;max-height:360px;border-radius:6px;background:#000;">
                                <source src="${a.url}" type="${a.type||"video/mp4"}">
                                Your browser does not support HTML5 video streaming.
                              </video>
                            </div>
                          `:""}
                        </div>
                      `}).join("")}
                  </div>
                `}
              </div>

              <!-- Subtasks Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Subtasks (${_}/${y.length})</span>
                  <span style="font-size:11px;color:#10b981;font-weight:700;">${L}% Done</span>
                </div>

                <div class="ci-360-subtask-progress">
                  <div class="ci-360-subtask-bar" style="width:${L}%"></div>
                </div>

                <div class="ci-360-subtask-list">
                  ${y.map(a=>`
                    <div class="ci-360-subtask-item">
                      <div class="ci-360-subtask-left">
                        <input type="checkbox" class="ci-360-subtask-cb cb-subtask-toggle" data-subtask-id="${a.id}" ${a.completed?"checked":""} />
                        <span class="ci-360-subtask-title ${a.completed?"done":""}">${v(a.title)}</span>
                      </div>
                      <button type="button" class="ci-360-att-del btn-del-subtask" data-subtask-id="${a.id}" title="Remove subtask">&times;</button>
                    </div>
                  `).join("")}
                </div>

                <div class="ci-360-subtask-add-row">
                  <input type="text" id="inp-new-subtask" class="ci-360-subtask-input" placeholder="+ Add a subtask (press Enter)..." />
                  <button type="button" class="btn-ci-360-secondary" id="btn-add-subtask">Add</button>
                </div>
              </div>

              <!-- Linked Work Items Section -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span>Linked Work Items (${p.length})</span>
                  <button type="button" class="btn-ci-360-secondary" id="btn-open-link-dialog" style="font-size:11px;padding:4px 8px;">
                    🔗 Link Issue
                  </button>
                </div>

                ${p.length===0?`
                  <div style="color:#64748b;font-size:12px;font-style:italic;">No linked issues.</div>
                `:`
                  <div style="display:flex;flex-direction:column;gap:6px;">
                    ${p.map(a=>`
                      <div class="ci-360-subtask-item">
                        <div style="display:flex;align-items:center;gap:8px;">
                          <span style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;">${v(a.relationship)}</span>
                          <span class="ci-360-ticket-id" style="color:#38bdf8;">${v(a.ticketId)}</span>
                          <span class="ci-360-linked-title" style="font-size:12.5px;">${v(a.title)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                          <span class="ci-360-col-badge">${v(a.status||"Open")}</span>
                          <button type="button" class="ci-360-att-del btn-del-link" data-link-id="${a.id}" title="Remove link">&times;</button>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `}

                <div id="ci-360-link-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin-top:6px;">
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="sel-link-rel" class="ci-360-select-field" style="width:140px;">
                      <option value="relates to">relates to</option>
                      <option value="blocks">blocks</option>
                      <option value="is blocked by">is blocked by</option>
                      <option value="duplicates">duplicates</option>
                    </select>
                    <input type="text" id="inp-link-target" class="ci-360-subtask-input" placeholder="Ticket ID (e.g. SUP-002)..." style="flex:1;" />
                    <button class="btn-ci-360-primary" id="btn-submit-link">Link</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Dedicated Linked Internal Job Block -->
              <div class="ci-360-section-block">
                <div class="ci-360-sec-title">
                  <span style="display:flex;align-items:center;gap:6px;">📁 Linked Internal Job</span>
                  <button type="button" class="ci-360-tool-btn" id="btn-toggle-job-link">
                    ${o?"✏️ Change Job":"+ Link a Job"}
                  </button>
                </div>
                ${o?`
                  <div class="ci-360-linked-job-card">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:22px;">📁</span>
                      <div>
                        <div class="ci-360-job-card-title" style="font-weight:700;font-size:13px;">${v(o)}</div>
                        <div style="font-size:11px;color:#38bdf8;">CI360 Job ID: ${v(d)}</div>
                      </div>
                    </div>
                    <button type="button" class="ci-360-tool-btn" id="btn-unlink-job" style="color:#ef4444;border-color:rgba(239,68,68,0.3);" title="Remove job link">
                      ✕ Unlink
                    </button>
                  </div>
                `:`
                  <div style="color:#64748b;font-size:12.5px;font-style:italic;padding:4px 0;">
                    No job linked yet. Click "+ Link a Job" to associate this ticket with a client deliverable or project.
                  </div>
                `}

                <div id="ci-360-job-link-box" class="ci-360-form-box" style="display:none;padding:12px;border-radius:6px;margin-top:8px;">
                  <label class="ci-360-form-label" style="font-size:11.5px;font-weight:700;display:block;margin-bottom:6px;">Choose Job to Link:</label>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <select id="inp-modal-job-select" class="ci-360-select-field" style="flex:1;min-width:220px;">
                      <option value="">-- Select a Job --</option>
                      ${X.map(a=>`
                        <option value="${a._id}" ${d===a._id.toString()?"selected":""}>
                          📁 ${v(a.title||"Untitled Job")}
                        </option>
                      `).join("")}
                    </select>
                    <button class="btn-ci-360-primary" id="btn-save-job-link">Link Job</button>
                    <button class="btn-ci-360-secondary" id="btn-cancel-job-link">Cancel</button>
                  </div>
                </div>
              </div>

              <!-- Activity Tabs Section -->
              <div class="ci-360-section-block" style="margin-top:10px;">
                <div class="ci-360-sec-title">Activity</div>
                <div class="ci-360-activity-tabs">
                  <button type="button" class="ci-360-act-tab ${V==="comments"?"active":""}" data-act-tab="comments">
                    Comments (${I.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${V==="history"?"active":""}" data-act-tab="history">
                    History (${z.length})
                  </button>
                  <button type="button" class="ci-360-act-tab ${V==="worklog"?"active":""}" data-act-tab="worklog">
                    Work Log (${M.length})
                  </button>
                </div>

                <!-- A. Comments Tab -->
                ${V==="comments"?`
                  <div class="ci-360-comments-feed">
                    ${I.map(a=>`
                      <div class="ci-360-comment-item">
                        <div class="ci-360-avatar" style="background:#2563eb;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-comment-main">
                          <div class="ci-360-comment-head">
                            <span class="ci-360-comment-author">${v(a.userName)} <span style="font-size:10px;color:#94a3b8;font-weight:400;">(${v(a.userRole)})</span></span>
                            <span class="ci-360-comment-time">${ia(a.createdAt)}</span>
                          </div>
                          <div class="ci-360-comment-body">${$a(a.content)}</div>
                        </div>
                      </div>
                    `).join("")}

                    <!-- Add Comment Composer -->
                    <div class="ci-360-comment-composer">
                      <div class="ci-360-avatar" style="background:#3b82f6;">
                        ${(g?.name||"U").slice(0,1).toUpperCase()}
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                        <textarea id="inp-new-comment" class="ci-360-comment-textarea" rows="2" placeholder="Add an internal comment..."></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                          <button class="btn-ci-360-primary" id="btn-submit-comment">Save Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `:""}

                <!-- B. History Tab -->
                ${V==="history"?`
                  <div class="ci-360-history-feed">
                    ${z.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No recorded history.</div>
                    `:z.map(a=>`
                      <div class="ci-360-history-item">
                        <div class="ci-360-avatar unassigned" style="width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"S").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-history-main">
                          <div class="ci-360-history-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(a.userName)}</span>
                            <span class="ci-360-comment-time">${ia(a.timestamp)}</span>
                          </div>
                          <div style="font-size:12px;color:#94a3b8;">
                            Changed <strong class="ci-360-history-field">${v(a.field)}</strong>:
                            ${a.from?`<span style="text-decoration:line-through;color:#ef4444;">${v(a.from)}</span> ➔ `:""}
                            <span style="color:#10b981;font-weight:600;">${v(a.to)}</span>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}

                <!-- C. Work Log Tab -->
                ${V==="worklog"?`
                  <div class="ci-360-worklog-feed">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:12px;color:#94a3b8;">Total Logged: <strong>${i.loggedHours||0} hrs</strong></span>
                      <button class="btn-ci-360-secondary" id="btn-open-worklog-dialog" style="font-size:11px;padding:4px 8px;">
                        ⏱️ Log Work
                      </button>
                    </div>

                    <div id="ci-360-worklog-box" class="ci-360-form-box" style="display:none;padding:10px;border-radius:6px;margin:6px 0;">
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <input type="text" id="inp-worklog-time" class="ci-360-subtask-input" placeholder="Time spent (e.g. 2h 30m, 45m)..." />
                        <input type="text" id="inp-worklog-desc" class="ci-360-subtask-input" placeholder="Description of work performed..." />
                        <div style="display:flex;justify-content:flex-end;gap:6px;">
                          <button class="btn-ci-360-primary" id="btn-submit-worklog">Log</button>
                          <button class="btn-ci-360-secondary" id="btn-cancel-worklog">Cancel</button>
                        </div>
                      </div>
                    </div>

                    ${M.length===0?`
                      <div style="color:#64748b;font-size:12px;font-style:italic;">No work logged yet.</div>
                    `:M.map(a=>`
                      <div class="ci-360-worklog-item">
                        <div class="ci-360-avatar" style="background:#10b981;width:20px;height:20px;font-size:9px;">
                          ${(a.userName||"U").slice(0,1).toUpperCase()}
                        </div>
                        <div class="ci-360-worklog-main">
                          <div class="ci-360-worklog-head">
                            <span class="ci-360-comment-author" style="font-size:12px;">${v(a.userName)} logged <strong style="color:#38bdf8;">${v(a.timeSpent)}</strong></span>
                            <span class="ci-360-comment-time">${ia(a.loggedAt)}</span>
                          </div>
                          ${a.description?`<div class="ci-360-comment-body" style="font-size:12px;">${v(a.description)}</div>`:""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            </div>

            <!-- Right Sidebar Panel (32%) -->
            <div class="ci-360-detail-sidebar">
              <!-- Status -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Status</span>
                <select id="sel-detail-status" class="ci-360-select-field">
                  ${ga.map(a=>{let h=i.status||"To Do";return h==="In Progress"?h="Content":h==="Resolved"?h="Under Review":h==="Closed"&&(h="Ready to Leave"),`
                      <option value="${a.key}" ${h===a.key?"selected":""}>
                        ${a.label}
                      </option>
                    `}).join("")}
                </select>
              </div>

              <!-- Priority -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Priority</span>
                <select id="sel-detail-priority" class="ci-360-select-field">
                  ${Rt.map(a=>`
                    <option value="${a.key}" ${i.priority===a.key?"selected":""}>
                      ${a.icon} ${a.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Assignees (Multi-Employee Team Assignment) -->
              <div class="ci-360-side-field">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span class="ci-360-side-lbl" style="margin-bottom:0;">Assigned Personnel (${E.length})</span>
                  
                    <button type="button" class="ci-360-tool-btn" id="btn-toggle-assignee-picker" style="font-size:11px;padding:2px 7px;">
                      ✏️ Assign / Change
                    </button>
                  
                </div>

                <div class="ci-360-assigned-chips-wrap">
                  ${E.length===0?`
                    <span style="font-size:12px;color:#64748b;font-style:italic;">Unassigned</span>
                  `:E.map(a=>`
                    <div class="ci-360-assignee-chip">
                      <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                        ${(a.avatar||a.name?.slice(0,1)||"U").toUpperCase()}
                      </div>
                      <span class="ci-360-assignee-chip-name" title="${v(a.name)}">${v(a.name)}</span>
                      ${`
                        <button type="button" class="ci-360-assignee-chip-remove btn-remove-assignee" data-user-id="${a.userId}" title="Remove ${v(a.name)}">&times;</button>
                      `}
                    </div>
                  `).join("")}
                </div>

                <!-- Interactive Multi-select Assignee Picker -->
                <div id="ci-360-detail-assignee-box" class="ci-360-form-box" style="display:none;margin-top:8px;padding:10px;border-radius:6px;">
                  <div class="ci-360-assignee-header" style="font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                    <span>ASSIGN / REASSIGN EMPLOYEES</span>
                    <button type="button" id="btn-close-detail-assignee-box" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:13px;">✕</button>
                  </div>
                  <div class="ci-360-emp-checklist" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;">
                    ${O.map(a=>{const h=E.some(T=>T&&T.userId&&String(T.userId)===String(a._id));return`
                        <label class="ci-360-emp-check-item ${h?"selected":""}">
                          <input type="checkbox" class="chk-detail-emp" value="${a._id}" ${h?"checked":""} />
                          <div class="ci-360-avatar" style="width:18px;height:18px;font-size:9px;">${(a.name||"U").slice(0,1).toUpperCase()}</div>
                          <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                            ${v(a.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(a.role)})</span>
                          </span>
                        </label>
                      `}).join("")}
                  </div>
                  <div style="margin-top:8px;display:flex;justify-content:flex-end;gap:6px;">
                    <button type="button" class="btn-ci-360-primary" id="btn-save-detail-assignees" style="font-size:11px;padding:4px 10px;">
                      Save Assignees
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reporter (Read Only) -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Reporter</span>
                <div style="display:flex;align-items:center;gap:8px;margin-top:2px;">
                  <div class="ci-360-avatar" style="background:#2563eb;">
                    ${(i.reporter?.name||"U").slice(0,1).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-size:12.5px;font-weight:600;color:#f8fafc;">${v(i.reporter?.name||"Staff")}</div>
                    <div style="font-size:11px;color:#94a3b8;">${v(i.reporter?.role||"employee")}</div>
                  </div>
                </div>
              </div>

              <!-- Category -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Category</span>
                <select id="sel-detail-category" class="ci-360-select-field">
                  ${Et.map(a=>`
                    <option value="${a.key}" ${i.category===a.key?"selected":""}>
                      ${a.icon} ${a.label}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Due Date -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Due Date</span>
                <input type="date" id="inp-detail-duedate" class="ci-360-date-field" value="${i.dueDate?new Date(i.dueDate).toISOString().slice(0,10):""}" />
              </div>

              <!-- Linked Job / Project -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Linked Internal Project / Job</span>
                <select id="sel-detail-job" class="ci-360-select-field">
                  <option value="">None (Workspace General)</option>
                  ${X.map(a=>`
                    <option value="${a._id}" ${d===a._id.toString()?"selected":""}>
                      📁 ${v(a.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Estimated & Logged Time -->
              <div class="ci-360-side-field">
                <span class="ci-360-side-lbl">Time Tracking</span>
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;">
                  <span>Logged: <strong>${i.loggedHours||0}h</strong></span>
                  <span>/ Est: <input type="number" id="inp-detail-esthours" class="ci-360-est-input" value="${i.estimatedHours||0}" />h</span>
                </div>
              </div>

              <!-- Timestamps -->
              <div style="padding-top:14px;border-top:1px solid #243248;display:flex;flex-direction:column;gap:4px;font-size:11px;color:#64748b;">
                <div>Created: ${new Date(i.createdAt).toLocaleString()}</div>
                <div>Updated: ${new Date(i.updatedAt).toLocaleString()}</div>
                ${i.resolvedAt?`<div style="color:#10b981;">Resolved: ${new Date(i.resolvedAt).toLocaleString()}</div>`:""}
              </div>

              <!-- Actions (Delete - Creator or Superadmin) -->
              ${H?`
                <div style="padding-top:10px;">
                  <button type="button" class="ci-360-tool-btn" id="btn-delete-ticket" style="color:#ef4444;border-color:rgba(239,68,68,0.4);width:100%;padding:6px;">
                    🗑️ Delete Ticket
                  </button>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </div>
    `,mt()}function mt(){const e=s.querySelector("#ci-360-modals-root");if(!e||!R)return;const i=e.querySelector("#btn-close-ci-360-modal");i&&(i.onclick=ct);const b=e.querySelector("#ci-360-detail-backdrop");b&&(b.onclick=D=>{D.target===b&&ct()});const y=e.querySelector("#inp-detail-title");y&&(y.onchange=async()=>{const D=y.value.trim();if(D)try{R=await tt(`/tickets/${R._id}`,{title:D}),await pe()}catch(N){$(N.message||"Failed to update title",!0)}});const _=e.querySelector("#btn-toggle-desc-edit");_&&(_.onclick=()=>{W=!W,ke()});const L=e.querySelector("#btn-cancel-desc");L&&(L.onclick=()=>{W=!1,ke()});const q=e.querySelector("#btn-save-desc");q&&(q.onclick=async()=>{const D=e.querySelector("#inp-detail-desc")?.value;try{R=await tt(`/tickets/${R._id}`,{description:D}),W=!1,ke(),await pe(),$("Description saved",!1)}catch(N){$(N.message||"Failed to save description",!0)}});const I=e.querySelector("#sel-detail-status");I&&(I.onchange=async D=>{try{const N=await tt(`/tickets/${R._id}/status`,{status:D.target.value});R=N,ke(),await nt(),lt(),await pe();const u=N.status==="Under Review"?"Status changed to Under Review (Default assigned to John)":`Status changed to ${N.status}`;$(u,!1)}catch(N){$(N.message||"Status change failed",!0)}});const z=e.querySelector("#sel-detail-priority");z&&(z.onchange=async D=>{try{R=await tt(`/tickets/${R._id}`,{priority:D.target.value}),ke(),await pe()}catch(N){$(N.message,!0)}});const M=e.querySelector("#btn-toggle-assignee-picker"),p=e.querySelector("#ci-360-detail-assignee-box"),B=e.querySelector("#btn-close-detail-assignee-box"),f=e.querySelector("#btn-save-detail-assignees");M&&p&&(M.onclick=()=>{const D=p.style.display==="none";p.style.display=D?"block":"none"}),B&&p&&(B.onclick=()=>{p.style.display="none"}),e.querySelectorAll(".chk-detail-emp").forEach(D=>{D.onchange=()=>{D.closest(".ci-360-emp-check-item")?.classList.toggle("selected",D.checked)}}),f&&(f.onclick=async()=>{const D=Array.from(e.querySelectorAll(".chk-detail-emp:checked")).map(N=>N.value);try{f.disabled=!0,R=await tt(`/tickets/${R._id}`,{assigneeIds:D}),ke(),await pe(),$("Assignees updated!",!1)}catch(N){$(N.message,!0),f.disabled=!1}}),e.querySelectorAll(".btn-remove-assignee").forEach(D=>{D.onclick=async()=>{const N=D.dataset.userId,se=(Array.isArray(R.assignees)&&R.assignees.length>0?R.assignees:R.assignee?.userId?[R.assignee]:[]).filter(re=>re&&re.userId&&String(re.userId)!==String(N)).map(re=>String(re.userId));try{R=await tt(`/tickets/${R._id}`,{assigneeIds:se}),ke(),await pe(),$("Assignee removed",!1)}catch(re){$(re.message,!0)}}});const P=e.querySelector("#sel-detail-category");P&&(P.onchange=async D=>{try{R=await tt(`/tickets/${R._id}`,{category:D.target.value}),ke(),await pe()}catch(N){$(N.message,!0)}});const H=e.querySelector("#inp-detail-duedate");H&&(H.onchange=async D=>{try{R=await tt(`/tickets/${R._id}`,{dueDate:D.target.value||null}),ke(),await pe()}catch(N){$(N.message,!0)}});const E=e.querySelector("#sel-detail-job");E&&(E.onchange=async D=>{try{R=await tt(`/tickets/${R._id}`,{jobId:D.target.value||null}),ke(),await pe(),$(D.target.value?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(N){$(N.message,!0)}});const d=e.querySelector("#btn-toggle-job-link"),o=e.querySelector("#ci-360-job-link-box");d&&o&&(d.onclick=()=>{o.style.display=o.style.display==="none"?"block":"none"});const a=e.querySelector("#btn-cancel-job-link");a&&o&&(a.onclick=()=>{o.style.display="none"});const h=e.querySelector("#btn-save-job-link");h&&(h.onclick=async()=>{const D=e.querySelector("#inp-modal-job-select")?.value||null;try{R=await tt(`/tickets/${R._id}`,{jobId:D}),ke(),await pe(),$(D?"Job linked to ticket! 📁":"Job unlinked",!1)}catch(N){$(N.message,!0)}});const T=e.querySelector("#btn-unlink-job");T&&(T.onclick=async()=>{if(confirm("Unlink this job from the support ticket?"))try{R=await tt(`/tickets/${R._id}`,{jobId:null}),ke(),await pe(),$("Job unlinked",!1)}catch(D){$(D.message,!0)}});const j=e.querySelector("#inp-detail-esthours");j&&(j.onchange=async D=>{try{R=await tt(`/tickets/${R._id}`,{estimatedHours:Number(D.target.value)||0})}catch(N){$(N.message,!0)}}),e.querySelectorAll(".cb-subtask-toggle").forEach(D=>{D.onchange=async()=>{const N=D.dataset.subtaskId;try{R=await tt(`/tickets/${R._id}/subtasks/${N}`,{completed:D.checked}),ke(),await pe()}catch(u){$(u.message,!0)}}}),e.querySelectorAll(".btn-del-subtask").forEach(D=>{D.onclick=async()=>{const N=D.dataset.subtaskId;try{R=await at(`/tickets/${R._id}/subtasks/${N}`),ke(),await pe()}catch(u){$(u.message,!0)}}});const C=e.querySelector("#inp-new-subtask"),Y=e.querySelector("#btn-add-subtask"),Z=async()=>{const D=C?.value.trim();if(D)try{R=await ye(`/tickets/${R._id}/subtasks`,{title:D}),ke(),await pe()}catch(N){$(N.message,!0)}};Y&&(Y.onclick=Z),C&&(C.onkeydown=D=>{D.key==="Enter"&&(D.preventDefault(),Z())});const S=e.querySelector("#btn-toggle-add-link"),A=e.querySelector("#add-link-form"),U=e.querySelector("#btn-cancel-new-link"),ae=e.querySelector("#btn-save-new-link"),G=e.querySelector("#inp-new-link-url"),ne=e.querySelector("#inp-new-link-title");S&&A&&(S.onclick=()=>{const D=A.style.display==="none";A.style.display=D?"block":"none",D&&G&&G.focus()}),U&&A&&(U.onclick=()=>{A.style.display="none",G&&(G.value=""),ne&&(ne.value="")}),ae&&G&&(ae.onclick=async()=>{const D=G.value.trim(),N=ne?.value.trim()||"";if(!D){$("Please enter a valid URL link",!0);return}try{ae.disabled=!0,ae.textContent="Saving...",R=await ye(`/tickets/${R._id}/links`,{url:D,title:N}),ke(),await pe(),$("Reference link added! 🔗",!1)}catch(u){$(u.message||"Failed to save link",!0),ae.disabled=!1,ae.textContent="Save Link 🔗"}}),e.querySelectorAll(".btn-copy-link").forEach(D=>{D.onclick=()=>{const N=D.dataset.url;N&&(navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(N).then(()=>{$("Link copied to clipboard! 📋")}).catch(()=>{$("Link: "+N)}):$("Link: "+N))}}),e.querySelectorAll(".btn-del-link").forEach(D=>{D.onclick=async()=>{const N=D.dataset.linkId;try{R=await at(`/tickets/${R._id}/links/${N}`),ke(),await pe(),$("Link removed")}catch(u){$(u.message||"Failed to remove link",!0)}}});const le=e.querySelector("#btn-trigger-detail-upload"),oe=e.querySelector("#inp-detail-att-upload"),ue=e.querySelector("#detail-att-upload-progress");le&&oe&&(le.onclick=D=>{D.preventDefault(),oe.click()}),oe&&(oe.onchange=async()=>{const D=Array.from(oe.files||[]);if(oe.value="",!!D.length){ue&&(ue.style.display="block",ue.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${D.length} file(s)</strong> in parallel...</span>
              <span id="att-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="att-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{const u=(await ha(D,se=>{const re=e.querySelector("#att-prog-pct"),Fe=e.querySelector("#att-prog-bar");re&&(re.textContent=`${se}%`),Fe&&(Fe.style.width=`${se}%`)})).map(se=>({name:se.name,url:se.url,size:se.size||0,type:se.type||"application/octet-stream"}));u.length&&(R=await ye(`/tickets/${R._id}/attachments`,{attachments:u}),ke(),$(`Successfully attached ${u.length} file(s)! 📎`,!1))}catch(N){console.error("Upload error:",N),$(`Upload failed: ${N.message}`,!0)}finally{ue&&(ue.style.display="none")}}}),e.querySelectorAll(".btn-play-att-video").forEach(D=>{D.onclick=()=>{const N=D.dataset.slot,u=e.querySelector("#"+N);if(u){const se=u.style.display==="none";u.style.display=se?"block":"none",D.textContent=se?"⏸ Close Video":"▶ Play Video";const re=u.querySelector("video");re&&se?re.play().catch(()=>{}):re&&re.pause()}}}),e.querySelectorAll(".btn-del-att").forEach(D=>{D.onclick=async()=>{const N=D.dataset.attId;try{R=await at(`/tickets/${R._id}/attachments/${N}`),ke()}catch(u){$(u.message,!0)}}}),e.querySelectorAll(".ci-360-act-tab").forEach(D=>{D.onclick=()=>{V=D.dataset.actTab,ke()}});const Ee=e.querySelector("#inp-new-comment"),ee=e.querySelector("#btn-submit-comment");ee&&Ee&&(ee.onclick=async()=>{const D=Ee.value.trim();if(D)try{ee.disabled=!0,ee.textContent="Saving...",R=await ye(`/tickets/${R._id}/comments`,{content:D}),ke(),$("Comment added",!1)}catch(N){$(N.message||"Failed to add comment",!0)}finally{ee.disabled=!1}});const Se=e.querySelector("#btn-open-link-dialog"),Ce=e.querySelector("#ci-360-link-box"),ie=e.querySelector("#btn-cancel-link"),fe=e.querySelector("#btn-submit-link"),ve=e.querySelector("#inp-link-target"),Oe=e.querySelector("#sel-link-rel");Se&&Ce&&(Se.onclick=()=>{Ce.style.display="block"}),ie&&Ce&&(ie.onclick=()=>{Ce.style.display="none"}),fe&&Ce&&(fe.onclick=async()=>{const D=ve?.value.trim(),N=Oe?.value||"relates to";if(D)try{fe.disabled=!0,R=await ye(`/tickets/${R._id}/links`,{targetTicketId:D,relationship:N}),ke(),$(`Linked with ${D}`,!1)}catch(u){$(u.message||"Failed to link ticket",!0)}finally{fe.disabled=!1}}),e.querySelectorAll(".btn-del-link").forEach(D=>{D.onclick=async()=>{const N=D.dataset.linkId;try{R=await at(`/tickets/${R._id}/links/${N}`),ke()}catch(u){$(u.message,!0)}}});const Ue=e.querySelector("#btn-open-worklog-dialog"),ge=e.querySelector("#ci-360-worklog-box"),je=e.querySelector("#btn-cancel-worklog"),Ne=e.querySelector("#btn-submit-worklog"),Te=e.querySelector("#inp-worklog-time"),Ae=e.querySelector("#inp-worklog-desc");Ue&&ge&&(Ue.onclick=()=>{ge.style.display="block"}),je&&ge&&(je.onclick=()=>{ge.style.display="none"}),Ne&&ge&&(Ne.onclick=async()=>{const D=Te?.value.trim(),N=Ae?.value.trim();if(!D){$("Enter time spent (e.g. 2h 30m)",!0);return}try{Ne.disabled=!0,R=await ye(`/tickets/${R._id}/worklogs`,{timeSpent:D,description:N}),ke(),$("Work logged",!1)}catch(u){$(u.message||"Failed to log work",!0)}finally{Ne.disabled=!1}});const Le=e.querySelector("#btn-delete-ticket");Le&&(Le.onclick=async()=>{if(confirm(`Are you sure you want to permanently delete ticket ${R.ticketId}?`))try{Le.disabled=!0,await at(`/tickets/${R._id}`),$(`Ticket ${R.ticketId} deleted`,!1),ct(),await nt(),lt(),await pe()}catch(D){$(D.message||"Failed to delete ticket",!0),Le.disabled=!1}})}function ct(){R=null,W=!1;const e=s.querySelector("#ci-360-modals-root");e&&(e.innerHTML="")}function ft(e=null){const i=s.querySelector("#ci-360-modals-root");if(!i)return;const b=e||(F.jobId&&F.jobId!=="all"?F.jobId:null);i.innerHTML=`
      <div class="ci-360-modal-backdrop" id="ci-360-create-backdrop">
        <div class="ci-360-modal-card" style="max-width:680px;height:auto;max-height:92vh;">
          <div class="ci-360-modal-header">
            <h3 style="margin:0;font-size:16px;font-weight:700;color:#f8fafc;">
              🎫 Create Support Ticket
            </h3>
            <button class="ci-360-modal-close" id="btn-close-create-modal">&times;</button>
          </div>

          <div style="padding:22px;overflow-y:auto;flex:1;">
            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Issue Type / Category *</label>
                <select id="create-ticket-cat" class="ci-360-select-field">
                  ${Et.map(o=>`<option value="${o.key}">${o.icon} ${o.label}</option>`).join("")}
                </select>
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Priority *</label>
                <select id="create-ticket-pri" class="ci-360-select-field">
                  <option value="Medium" selected>🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Summary / Title *</label>
              <input type="text" id="create-ticket-title" class="ci-360-form-input" placeholder="e.g. Navigation dropdown glitch on Safari mobile" required />
            </div>

            <div class="ci-360-form-group">
              <label class="ci-360-form-label">Description (Provide details, steps, or context)</label>
              <textarea id="create-ticket-desc" class="ci-360-form-textarea" rows="4" placeholder="Describe the issue, requirements, or internal request..."></textarea>
            </div>

            <div class="ci-360-form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin-bottom:0;">Assign Employees (Choose one or multiple)</label>
                <div style="display:flex;gap:8px;">
                  <button type="button" id="btn-create-assign-self" style="background:none;border:none;color:#38bdf8;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    + Select Myself
                  </button>
                  <button type="button" id="btn-create-clear-assign" style="background:none;border:none;color:#94a3b8;font-size:11px;cursor:pointer;">
                    Clear All
                  </button>
                </div>
              </div>

              <div class="ci-360-emp-checklist-box">
                <div class="ci-360-emp-checklist" id="create-emp-checklist">
                  ${O.map(o=>{const a=g&&String(g._id||g.id)===String(o._id);return`
                      <label class="ci-360-emp-check-item ${a?"selected":""}">
                        <input type="checkbox" class="chk-create-emp" value="${o._id}" ${a?"checked":""} />
                        <div class="ci-360-avatar" style="width:20px;height:20px;font-size:10px;">
                          ${(o.name||"U").slice(0,1).toUpperCase()}
                        </div>
                        <span class="ci-360-emp-name" style="font-size:12px;flex:1;">
                          ${v(o.name)} <span class="ci-360-emp-role" style="font-size:10.5px;color:#94a3b8;">(${v(o.role)})${a?" — (You)":""}</span>
                        </span>
                      </label>
                    `}).join("")}
                </div>
              </div>
              <div id="create-assignee-hint" style="font-size:11px;color:#94a3b8;margin-top:4px;">
                Check all employees you want to assign to this ticket.
              </div>
            </div>

            <div class="ci-360-form-grid-2">
              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Due Date (Optional)</label>
                <input type="date" id="create-ticket-duedate" class="ci-360-date-field" />
              </div>

              <div class="ci-360-form-group">
                <label class="ci-360-form-label">Related Job / Internal Project (Optional)</label>
                <select id="create-ticket-job" class="ci-360-select-field">
                  <option value="">None (General Workspace Issue)</option>
                  ${X.map(o=>`
                    <option value="${o._id}" ${b&&String(b)===String(o._id)?"selected":""}>
                      📁 ${v(o.title||"Untitled Job")}
                    </option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- External Reference URL / Link -->
            <div class="ci-360-form-group">
              <label class="ci-360-form-label">🔗 External Reference Link / URL (Optional)</label>
              <input type="url" id="create-ticket-url" class="ci-360-form-input" placeholder="e.g. https://figma.com/..., https://loom.com/..., live website URL, Google Drive..." />
            </div>

            <!-- Attachments & Fast File Uploader (Up to 1GB) -->
            <div class="ci-360-form-group" style="margin-top:14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label class="ci-360-form-label" style="margin:0;">Attachments &amp; Files (All formats up to 1GB)</label>
                <span id="create-att-count" style="font-size:11px;color:#94a3b8;">0 files attached</span>
              </div>
              <label class="ci-360-att-dropzone" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;border-radius:8px;cursor:pointer;transition:border-color 0.2s;">
                <div style="font-size:18px;">📁 ⚡</div>
                <div style="font-size:12px;font-weight:600;color:#e2e8f0;">Click or drag &amp; drop files or videos here</div>
                <div style="font-size:10.5px;color:#64748b;">Fast parallel uploading: MP4, MOV, WebM, images, PDFs, archives (Up to 1GB supported)</div>
                <input type="file" id="inp-create-ticket-att" multiple style="display:none;" />
              </label>
              <div id="create-att-progress" style="display:none;margin-top:8px;"></div>
              <div id="create-att-list" class="ci-360-attachments-grid" style="margin-top:8px;"></div>
            </div>
          </div>

          <div class="ci-360-modal-footer">
            <button type="button" class="btn-ci-360-secondary" id="btn-cancel-create-ticket">Cancel</button>
            <button type="button" class="btn-ci-360-primary" id="btn-submit-create-ticket">Create Ticket 🚀</button>
          </div>
        </div>
      </div>
    `;const y=()=>{i.querySelectorAll(".ci-360-emp-check-item").forEach(o=>{const a=o.querySelector(".chk-create-emp");o.classList.toggle("selected",!!a?.checked)})};i.querySelectorAll(".chk-create-emp").forEach(o=>{o.onchange=y});const _=i.querySelector("#btn-create-assign-self");_&&g&&(_.onclick=()=>{const o=String(g._id||g.id);i.querySelectorAll(".chk-create-emp").forEach(a=>{a.value===o&&(a.checked=!0)}),y()});const L=i.querySelector("#btn-create-clear-assign");L&&(L.onclick=()=>{i.querySelectorAll(".chk-create-emp").forEach(o=>{o.checked=!1}),y()});const q=[],I=i.querySelector("#inp-create-ticket-att"),z=i.querySelector("#create-att-list"),M=i.querySelector("#create-att-count"),p=i.querySelector("#create-att-progress"),B=()=>{M&&(M.textContent=`${q.length} file(s) attached`),z&&(z.innerHTML=q.map((o,a)=>{const h=o.type&&o.type.includes("video")||o.name&&o.name.match(/\.(mp4|mov|webm|avi|mkv)$/i);return`
          <div class="ci-360-att-card">
            <div class="ci-360-att-left">
              <span>${h?"🎬":"📎"}</span>
              <div style="display:flex;flex-direction:column;min-width:0;">
                <span class="ci-360-att-name" title="${v(o.name)}">${v(o.name)}</span>
                <span style="font-size:10px;color:#94a3b8;">${fa(o.size)} ${h?"• MP4":""}</span>
              </div>
            </div>
            <button type="button" class="ci-360-att-del btn-del-pending-att" data-idx="${a}" title="Remove">&times;</button>
          </div>
        `}).join(""),z.querySelectorAll(".btn-del-pending-att").forEach(o=>{o.onclick=()=>{q.splice(Number(o.dataset.idx),1),B()}}))};I&&(I.onchange=async()=>{const o=Array.from(I.files||[]);if(I.value="",!!o.length){p&&(p.style.display="block",p.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:11.5px;color:#cbd5e1;">
              <span>Fast uploading <strong>${o.length} file(s)</strong> in parallel...</span>
              <span id="create-prog-pct" style="font-weight:700;color:#38bdf8;">0%</span>
            </div>
            <div style="width:100%;height:4px;background:#334155;border-radius:2px;overflow:hidden;">
              <div id="create-prog-bar" style="width:0%;height:100%;background:linear-gradient(90deg, #38bdf8, #0ea5e9);transition:width 0.15s ease;"></div>
            </div>
          `);try{(await ha(o,h=>{const T=i.querySelector("#create-prog-pct"),j=i.querySelector("#create-prog-bar");T&&(T.textContent=`${h}%`),j&&(j.style.width=`${h}%`)})).forEach(h=>{q.push({name:h.name,url:h.url,size:h.size||0,type:h.type||"application/octet-stream"})}),B()}catch(a){$(`Failed to upload files: ${a.message}`,!0)}finally{p&&(p.style.display="none"),I.value=""}}});const f=()=>{i.innerHTML=""},P=i.querySelector("#btn-close-create-modal");P&&(P.onclick=f);const H=i.querySelector("#btn-cancel-create-ticket");H&&(H.onclick=f);const E=i.querySelector("#ci-360-create-backdrop");E&&(E.onclick=o=>{o.target===E&&f()});const d=i.querySelector("#btn-submit-create-ticket");d&&(d.onclick=async()=>{const o=i.querySelector("#create-ticket-title")?.value.trim(),a=i.querySelector("#create-ticket-desc")?.value.trim(),h=i.querySelector("#create-ticket-cat")?.value||"Task",T=i.querySelector("#create-ticket-pri")?.value||"Medium",C=Array.from(i.querySelectorAll(".chk-create-emp:checked")).map(A=>A.value),Y=i.querySelector("#create-ticket-duedate")?.value||null,Z=i.querySelector("#create-ticket-job")?.value||null,S=i.querySelector("#create-ticket-url")?.value.trim()||"";if(!o){$("Ticket summary / title is required",!0);return}try{d.disabled=!0,d.textContent="Creating...";const A=await ye("/tickets",{title:o,description:a,category:h,priority:T,assigneeIds:C,assigneeId:C[0]||null,dueDate:Y,jobId:Z,linkUrl:S,attachments:q});$(`Ticket ${A.ticketId} created! 🎫`,!1),f(),await nt(),lt(),await pe(),st(A._id)}catch(A){$(A.message||"Could not create ticket",!0),d.disabled=!1,d.textContent="Create Ticket 🚀"}})}s._openCreateTicketModal=ft,s._openTicketDetailModal=st,s._setJobFilter=async e=>{F.jobId=e||"all";const i=s.querySelector("#ci-360-filter-job");i&&(i.value=F.jobId),Ve(),await pe()}}export{mn as a,bn as b,un as i};
