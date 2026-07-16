"use client";

import { useMemo, useState } from "react";

type CaseRecord = {
  id: string; title: string; category: string; status: string; priority: string;
  investigator: string; agency: string; opened: string; updated: string; progress: number;
};

const seedCases: CaseRecord[] = [
  { id:"ICAC-2026-0147", title:"Irregular road maintenance contract", category:"Procurement fraud", status:"Investigation", priority:"Critical", investigator:"L. Kila", agency:"Department of Works", opened:"08 Jul 2026", updated:"18 min ago", progress:68 },
  { id:"ICAC-2026-0142", title:"Undisclosed interest in ICT tender", category:"Conflict of interest", status:"Assessment", priority:"High", investigator:"M. Peni", agency:"Public Authority", opened:"03 Jul 2026", updated:"2 hrs ago", progress:34 },
  { id:"ICAC-2026-0134", title:"Suspected payroll ghost employees", category:"Misappropriation", status:"Investigation", priority:"High", investigator:"J. Aihi", agency:"Provincial Administration", opened:"24 Jun 2026", updated:"Yesterday", progress:52 },
  { id:"ICAC-2026-0128", title:"Improper facilitation payments", category:"Bribery", status:"Legal review", priority:"Medium", investigator:"R. Tamu", agency:"State-Owned Enterprise", opened:"16 Jun 2026", updated:"15 Jul 2026", progress:81 },
  { id:"ICAC-2026-0119", title:"Tender evaluation manipulation", category:"Procurement fraud", status:"Referred", priority:"Medium", investigator:"S. Wama", agency:"District Authority", opened:"02 Jun 2026", updated:"12 Jul 2026", progress:100 },
];

const activity = [
  ["Evidence added", "Bank statement bundle · ICAC-2026-0147", "18 min ago", "LK"],
  ["Assessment approved", "Matter advanced to preliminary investigation", "2 hrs ago", "MP"],
  ["Interview scheduled", "Witness 03 · Interview Room 2", "Yesterday", "JA"],
  ["Legal opinion uploaded", "Admissibility review completed", "15 Jul", "RT"],
];

const nav = ["Overview", "Complaints", "Cases", "Investigations", "Evidence", "Tasks", "Reports"];

function Pill({children, tone="slate"}:{children:React.ReactNode;tone?:string}) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [cases, setCases] = useState(seedCases);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<CaseRecord | null>(null);
  const [form, setForm] = useState({title:"", category:"Procurement fraud", agency:"", priority:"Medium"});
  const filtered = useMemo(() => cases.filter(c => `${c.id} ${c.title} ${c.agency}`.toLowerCase().includes(query.toLowerCase())), [cases, query]);

  function flash(message:string){ setNotice(message); setTimeout(()=>setNotice(""),2600); }
  function addCase(e:React.FormEvent){
    e.preventDefault();
    const next:CaseRecord={id:`ICAC-2026-${String(148+cases.length-5).padStart(4,"0")}`,title:form.title,category:form.category,status:"Assessment",priority:form.priority,investigator:"Unassigned",agency:form.agency,opened:"16 Jul 2026",updated:"Just now",progress:10};
    setCases([next,...cases]); setModal(false); setForm({title:"",category:"Procurement fraud",agency:"",priority:"Medium"}); flash(`${next.id} created successfully`);
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="crest">IC</div><div><strong>ICAC</strong><span>Papua New Guinea</span></div></div>
      <div className="workspace"><span>INVESTIGATION WORKSPACE</span><b>Case Management</b></div>
      <nav>{nav.map(item=><button key={item} className={active===item?"active":""} onClick={()=>{setActive(item);setSelected(null)}}><span className="nav-icon">{item[0]}</span>{item}{item==="Tasks"&&<em>7</em>}</button>)}</nav>
      <div className="security"><span>● PROTECTED</span><p>Prototype environment</p><small>Data is stored in this browser session only.</small></div>
      <div className="profile"><div className="avatar">AM</div><div><b>Anna Mek</b><span>Senior Investigator</span></div><button>•••</button></div>
    </aside>

    <main>
      <header><div className="mobile-brand">ICAC · ECMS</div><div className="search"><span>⌕</span><input aria-label="Search records" placeholder="Search case ID, subject or agency…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-btn">?</button><button className="icon-btn alert">♢<i/></button><button className="new-btn" onClick={()=>setModal(true)}>＋ New case</button></header>

      {notice&&<div className="toast">✓ {notice}</div>}
      <div className="content">
        {selected ? <CaseDetail item={selected} onBack={()=>setSelected(null)} flash={flash}/> : active==="Overview" ? <>
          <section className="intro"><div><p>THURSDAY, 16 JULY 2026</p><h1>Good morning, Anna.</h1><span>Here is the current operational picture across your case portfolio.</span></div><div className="classification">OFFICIAL: SENSITIVE</div></section>
          <section className="stats">
            <article><div><span>OPEN COMPLAINTS</span><b>38</b><small><i className="up">↑ 6</i> this month</small></div><strong>◎</strong></article>
            <article><div><span>ACTIVE CASES</span><b>{cases.filter(c=>c.status!=="Referred").length+19}</b><small>Across 6 teams</small></div><strong>▣</strong></article>
            <article><div><span>HIGH-RISK MATTERS</span><b>7</b><small><i className="warn">3</i> require attention</small></div><strong>△</strong></article>
            <article><div><span>TASKS DUE</span><b>12</b><small><i className="late">4 overdue</i></small></div><strong>◷</strong></article>
          </section>
          <section className="grid-main">
            <div className="panel caseload"><div className="panel-head"><div><h2>Case portfolio</h2><p>Active matters by investigation stage</p></div><select aria-label="Reporting period"><option>Last 30 days</option><option>This quarter</option></select></div>
              <div className="chart-wrap"><div className="donut"><div><b>62</b><span>Total matters</span></div></div><div className="legend">
                {[["Assessment",14,"blue"],["Investigation",24,"gold"],["Legal review",9,"purple"],["Referred",11,"green"],["On hold",4,"grey"]].map(x=><div key={x[0]}><i className={String(x[2])}/><span>{x[0]}</span><b>{x[1]}</b></div>)}
              </div></div>
            </div>
            <div className="panel activity"><div className="panel-head"><div><h2>Recent activity</h2><p>Updates from your assigned matters</p></div><button onClick={()=>flash("Activity log opened")}>View all</button></div>
              {activity.map((a,i)=><div className="activity-row" key={a[0]}><div className={`activity-icon a${i}`}>{a[3]}</div><div><b>{a[0]}</b><p>{a[1]}</p></div><time>{a[2]}</time></div>)}
            </div>
          </section>
          <CasesTable rows={filtered} onSelect={setSelected}/>
        </> : <ModuleView name={active} rows={filtered} onSelect={setSelected} flash={flash}/>} 
      </div>
    </main>

    {modal&&<div className="modal-backdrop" onMouseDown={()=>setModal(false)}><form className="modal" onSubmit={addCase} onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><span>NEW MATTER</span><h2>Create case record</h2></div><button type="button" onClick={()=>setModal(false)}>×</button></div><p>Open a new matter for preliminary assessment. A unique reference will be generated automatically.</p><label>Case title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Brief description of allegation"/></label><div className="form-grid"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Procurement fraud</option><option>Bribery</option><option>Conflict of interest</option><option>Misappropriation</option></select></label><label>Priority<select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label></div><label>Agency or entity<input required value={form.agency} onChange={e=>setForm({...form,agency:e.target.value})} placeholder="Subject organisation"/></label><div className="modal-actions"><button type="button" onClick={()=>setModal(false)}>Cancel</button><button className="primary" type="submit">Create case</button></div></form></div>}
  </div>
}

function CasesTable({rows,onSelect}:{rows:CaseRecord[];onSelect:(x:CaseRecord)=>void}){
 return <section className="panel table-panel"><div className="panel-head"><div><h2>Priority matters</h2><p>Cases requiring review or recent action</p></div><button>View all cases →</button></div><div className="table-scroll"><table><thead><tr><th>CASE REFERENCE</th><th>MATTER</th><th>STATUS</th><th>PRIORITY</th><th>LEAD</th><th>LAST UPDATED</th></tr></thead><tbody>{rows.map(c=><tr key={c.id} onClick={()=>onSelect(c)}><td><b>{c.id}</b></td><td><strong>{c.title}</strong><span>{c.agency}</span></td><td><Pill tone={c.status.toLowerCase().replace(" ","")}>{c.status}</Pill></td><td><Pill tone={c.priority.toLowerCase()}>{c.priority}</Pill></td><td>{c.investigator}</td><td>{c.updated}</td></tr>)}</tbody></table>{!rows.length&&<div className="empty">No records match your search.</div>}</div></section>
}

function ModuleView({name,rows,onSelect,flash}:{name:string;rows:CaseRecord[];onSelect:(x:CaseRecord)=>void;flash:(x:string)=>void}){
 const summaries:Record<string,[string,string,string][]>={
  Complaints:[["RECEIVED THIS MONTH","18","6 awaiting triage"],["UNDER ASSESSMENT","14","Average age: 9 days"],["REFERRED OUT","5","Since 1 July"]],
  Cases:[["ACTIVE MATTERS","24","Across 6 teams"],["HIGH PRIORITY","7","3 due for review"],["CLOSED THIS MONTH","6","Median: 87 days"]],
  Investigations:[["ACTIVE OPERATIONS","12","4 multi-agency"],["INTERVIEWS SCHEDULED","9","Next 14 days"],["LEGAL DIRECTIONS","3","Awaiting advice"]],
  Evidence:[["EVIDENCE ITEMS","1,284","Across active matters"],["ADDED THIS WEEK","47","Chain verified"],["CUSTODY ALERTS","0","No exceptions"]],
  Tasks:[["MY OPEN TASKS","12","4 due this week"],["TEAM TASKS","38","86% on schedule"],["OVERDUE","4","Requires action"]],
  Reports:[["MONTHLY BRIEFS","6","2026 reporting year"],["DASHBOARDS","4","Live prototype views"],["SCHEDULED","3","Next: 31 July"]]
 };
 return <><section className="intro module-title"><div><p>CASE MANAGEMENT</p><h1>{name}</h1><span>Manage, monitor and report on ICAC {name.toLowerCase()}.</span></div><button className="outline" onClick={()=>flash(`${name} register exported`)}>Export register</button></section><section className="stats compact">{summaries[name].map(x=><article key={x[0]}><div><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div></article>)}</section>{name==="Evidence"?<EvidencePanel/>:name==="Tasks"?<TaskPanel/>:name==="Reports"?<ReportsPanel flash={flash}/>:<CasesTable rows={rows} onSelect={onSelect}/>}</>
}

function EvidencePanel(){const items=[["EV-0147-032","Bank statement bundle","Financial record","ICAC-2026-0147","Evidence vault A","Verified"],["EV-0142-011","Tender evaluation file","Document","ICAC-2026-0142","Digital repository","Verified"],["EV-0134-026","Payroll export — June","Digital data","ICAC-2026-0134","Forensic lab","In analysis"],["EV-0128-008","Interview recording","Audio/video","ICAC-2026-0128","Evidence vault B","Sealed"]];return <section className="panel table-panel"><div className="panel-head"><div><h2>Evidence register</h2><p>Custody status and current location</p></div><button>＋ Register item</button></div><div className="table-scroll"><table><thead><tr><th>ITEM ID</th><th>DESCRIPTION</th><th>TYPE</th><th>CASE</th><th>LOCATION</th><th>CUSTODY</th></tr></thead><tbody>{items.map(i=><tr key={i[0]}><td><b>{i[0]}</b></td><td><strong>{i[1]}</strong></td><td>{i[2]}</td><td>{i[3]}</td><td>{i[4]}</td><td><Pill tone="green">{i[5]}</Pill></td></tr>)}</tbody></table></div></section>}
function TaskPanel(){return <section className="panel task-list"><div className="panel-head"><div><h2>Investigation actions</h2><p>Assigned tasks ordered by due date</p></div><button>＋ Add task</button></div>{[["Finalise witness interview plan","ICAC-2026-0147","Today","Critical"],["Review procurement committee minutes","ICAC-2026-0142","17 Jul","High"],["Submit forensic analysis request","ICAC-2026-0134","19 Jul","Medium"],["Prepare referral brief for prosecutor","ICAC-2026-0128","22 Jul","High"]].map(t=><label key={t[0]}><input type="checkbox"/><div><b>{t[0]}</b><span>{t[1]}</span></div><time>{t[2]}</time><Pill tone={t[3].toLowerCase()}>{t[3]}</Pill></label>)}</section>}
function ReportsPanel({flash}:{flash:(x:string)=>void}){return <section className="report-grid">{[["Executive operational brief","Monthly overview for Commissioner and executive team","Last generated 30 Jun"],["Case ageing analysis","Open matters by age, stage, priority and team","Updated today"],["Complaint source trends","Channels, allegations and referral outcomes","Updated 15 Jul"],["Investigation performance","Milestones, workload and completion indicators","Updated today"]].map((r,i)=><article className="panel" key={r[0]}><span className="report-icon">{["▤","◴","◫","▥"][i]}</span><h3>{r[0]}</h3><p>{r[1]}</p><small>{r[2]}</small><button onClick={()=>flash(`${r[0]} generated`)}>Generate report →</button></article>)}</section>}

function CaseDetail({item,onBack,flash}:{item:CaseRecord;onBack:()=>void;flash:(x:string)=>void}){return <><button className="back" onClick={onBack}>← Back to portfolio</button><section className="case-hero"><div><div className="case-meta"><span>{item.id}</span><Pill tone={item.priority.toLowerCase()}>{item.priority} priority</Pill></div><h1>{item.title}</h1><p>{item.agency} · {item.category}</p></div><button className="outline" onClick={()=>flash("Case brief generated")}>Generate case brief</button></section><div className="detail-grid"><section className="panel timeline"><div className="panel-head"><div><h2>Investigation timeline</h2><p>Recorded actions and decisions</p></div><button>＋ Add entry</button></div>{[["Matter opened and registered",item.opened,"Complaint accepted for preliminary assessment."],["Assessment authorised","10 Jul 2026","Jurisdiction and evidential threshold confirmed."],["Investigation plan approved","13 Jul 2026","Lead investigator and operational milestones assigned."],["Evidence received","16 Jul 2026","Custody receipt generated and integrity verified."]].map((x,i)=><div className="timeline-row" key={x[0]}><i className={i===3?"current":""}/><div><b>{x[0]}</b><p>{x[2]}</p></div><time>{x[1]}</time></div>)}</section><aside className="panel facts"><h2>Case details</h2><dl><dt>Status</dt><dd><Pill tone={item.status.toLowerCase().replace(" ","")}>{item.status}</Pill></dd><dt>Lead investigator</dt><dd>{item.investigator}</dd><dt>Date opened</dt><dd>{item.opened}</dd><dt>Progress</dt><dd><div className="progress"><i style={{width:`${item.progress}%`}}/></div>{item.progress}%</dd><dt>Classification</dt><dd>OFFICIAL: Sensitive</dd></dl><button onClick={()=>flash("Case details updated")}>Edit case details</button></aside></div></>}
