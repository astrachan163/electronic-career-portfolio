'use strict';
const projects = [
 {id:'sanctum',name:'CS646 Sanctum',group:'Cybersecurity',status:'Playable local Godot prototype',skills:['TypeScript','React','Godot','Cryptography'],summary:'A course study interface evolving into a five-district learning world.',role:'I built the study hub and a local Godot source prototype with driving, district entry, topic inspection, and a synthetic SHA-256 exhibit.',demo:'hash',package:null},
 {id:'how-built',name:'How this scroll site was built',group:'AI & software',status:'Case study',skills:['GSAP','ScrollTrigger','Video','Canvas'],summary:'Case study of the scroll-scrubbed 3D portfolio story: all-intra video, ScrollTrigger math, and canvas fallback.',role:'I documented build decisions from measured fps and encode results for interview walkthroughs.',package:{href:'work/how-built/',badge:'static export',role:'I authored this case study of the scroll-scrub architecture.',labels:['Measured fps and seek tables','All-intra encode sizes','Bounded canvas LRU (40)']}},
 {id:'tutor',name:'MaqkrsTutor',group:'AI & software',status:'Native macOS application',skills:['SwiftUI','SwiftData','Ollama','RAG'],summary:'A local study assistant with document-focused retrieval and explicit study actions.',role:'I built the SwiftUI/SwiftData app, RAG pipeline, and local model orchestration.',url:'https://github.com/astrachan163/MaqkrsTutor-public',package:{href:'work/local-ai-tutor/',badge:'interactive simulation',role:'I built the SwiftUI/SwiftData app, RAG pipeline, and local model orchestration.',labels:['Document ingestion pipeline','Native sentence-aware chunker','sqlite-vec vector store']}},
 {id:'ghs',name:'GHS Learning Platform',group:'Education',status:'Development platform',skills:['Firebase','Authorization','Cloud functions'],summary:'A learning platform with a foundation-first development and security workflow.',role:'I contributed security-minded work on a team project (authorization, threat modeling, DevSecOps).',package:{href:'work/ghs-secure-sdlc/',badge:'interactive simulation',role:'I contributed security-minded work on a team project (authorization, threat modeling, DevSecOps).',labels:['STRIDE threat model','OWASP Top 10 coverage map','Security CI (SBOM + npm audit)']}},
 {id:'adaptivehs',name:'AdaptiveHS',group:'Education',status:'Local Firebase isolation updated',skills:['Next.js','Firebase','Role-based UI'],summary:'Parent, student and teacher workflows for a homeschool learning portal.',role:'I built the full-stack app (Next.js, auth portals, mock AI tools).',package:{href:'work/adaptivehs/',badge:'interactive simulation',role:'I built the full-stack app (Next.js, auth portals, mock AI tools).',labels:['Auth portals','Firebase isolation notes']}},
 {id:'adaptiveprep',name:'AdaptivePrep Studio',group:'Education',status:'Assessment prototype',skills:['Next.js','Genkit','Assessment'],summary:'Multi-role assessment authoring and personalized question workflows.',role:'I built the assessment prototype. This is a separate product from AdaptiveHS.',package:null},
 {id:'blockchain',name:'Blockchain team project',group:'Cybersecurity',status:'Academic team project',skills:['Python','SHA-256','CI','QA'],summary:'Transaction and block construction, team testing and packaging.',role:'I led QA and maintained team repository procedures.',demo:'transaction',package:null},
 {id:'citadel',name:'Citadel / SynergyDock',group:'AI & software',status:'Local prototype + architecture',skills:['Java','Python','MCP','Authorization'],summary:'A tool architecture centered on controlled requests and explicit boundaries.',role:'I architected and implemented the Java WebSocket gate, MCP action sandbox, and multi-tool orchestration.',demo:'policy',package:{href:'work/citadel/',badge:'interactive simulation',role:'I architected and implemented the Java WebSocket gate, MCP action sandbox, and multi-tool orchestration.',labels:['Java WebSocket gate + Bucket4j rate limit','TOOL_CALL parse + schema lock','Sandbox path + CLI traversal deny']}},
 {id:'cockpit',name:'Study Cockpit',group:'Cloud & systems',status:'Local application',skills:['Python','Jupyter','Content pipelines'],summary:'A local dashboard and curation workflow for course materials.',role:'I built the local pipeline, dashboard server, and curation + training scripts.',package:{href:'work/study-cockpit/',badge:'interactive simulation',role:'I built the local pipeline, dashboard server, and curation + training scripts.',labels:['Dashboard server (Mode A)','Ollama curation loop','One-click launcher']}},
 {id:'aws',name:'Cloud file sharing',group:'Cloud & systems',status:'Academic application',skills:['AWS','S3','Lambda','HMAC'],summary:'A course file-sharing system with expiring access and automatic deletion.',role:'Solo CS532 coursework project — design, Flask app, Lambda notify, IAM templates, and fake-AWS unit tests.',package:{href:'work/file-share/',badge:'interactive simulation',role:'Solo CS532 coursework project — design, Flask app, Lambda notify, IAM templates, and fake-AWS unit tests.',labels:['HMAC token create + verify (Flask)','HMAC token mint + SES notify (Lambda)','Auto-delete after all recipients download (tests)']}},
 {id:'network',name:'Networking study worlds',group:'Cybersecurity',status:'Course interfaces',skills:['React','3D UI','Networking'],summary:'Visual study hubs for networking and network security.',role:'I built this portfolio-safe synthetic fork (Vite + React Three Fiber hub); the original course repo is untouched.',package:{href:'work/networking-3d/',badge:'static export',role:'I built this portfolio-safe synthetic fork (Vite + React Three Fiber hub); the original course repo is untouched.',labels:['Synthetic work copy used for this build']}},
 {id:'threat',name:'STRIDE threat modeling',group:'Cybersecurity',status:'Academic analysis',skills:['Threat modeling','STRIDE','Security analysis'],summary:'Structured analysis of system threats and mitigations.',role:'I authored coursework threat models; a sanitized exhibit is the next public step.',package:null},
 {id:'forensics',name:'Forensics study engineering',group:'Cybersecurity',status:'Private study toolkit',skills:['Python','Validation','Digital forensics'],summary:'A validated lexicon and cross-reference workflow for forensic study materials.',role:'I built supporting validation and study-reference materials.',package:null},
 {id:'maqkrs',name:'Maqkrs Command Center',group:'AI & software',status:'Product family',skills:['TypeScript','Firebase','Multi-tenant design'],summary:'A command-center product family with business and education workflows.',role:'I developed prototypes and backend components and am consolidating interface work into one canonical product.',package:null},
 {id:'legacy',name:'Legacy Meadows',group:'Applied products',status:'Existing guide + web3 planning',skills:['React','Content design','Web3 planning'],summary:'A marketing and guide product family with a proposed web3 extension.',role:'Existing marketing source and hosted guide are separate artifacts. No escrow implementation is claimed.',package:null},
 {id:'jefcoed',name:'JEFCOED ESL support',group:'Education',status:'Archived interface',skills:['React','Firebase','Training'],summary:'A support interface for ESL and Seal of Biliteracy workflows.',role:'I built a training/support interface.',package:null},
 {id:'aether',name:'Aether / Victorious Herbal',group:'Applied products',status:'Storefront project',skills:['Next.js','Firebase','Commerce'],summary:'A storefront and business-workflow project.',role:'I developed the storefront path; public demonstration needs a client-safe sample catalog.',package:null}
];
let selected=new URLSearchParams(location.search).get('project')||'sanctum',filter='All',worldAvailable=false,worldUrl='';
if(!projects.some(project=>project.id===selected))selected='sanctum';
const byId=id=>document.getElementById(id);
const safe=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stops=[
 {id:'sanctum',title:'CS646 World',summary:'A five district study world connects cryptography concepts to hands-on interaction.',x:44,y:43,target:'sanctum'},
 {id:'tutor',title:'MaqkrsTutor',summary:'Local study software makes document-grounded learning easier to inspect.',x:61,y:20,target:'tutor'},
 {id:'ghs',title:'Secure learning',summary:'The GHS platform explores role-aware educational workflows and a cloud foundation.',x:83,y:40,target:'ghs'},
 {id:'cockpit',title:'Cloud systems',summary:'Study Cockpit and AWS course work connect curation, sharing, and infrastructure.',x:72,y:68,target:'cockpit'},
 {id:'leadership',title:'Leadership',summary:'Teaching, student service, technical coordination, and creative production.',x:88,y:16,target:'experience'}
];
let activeStop=0;
function selectProject(id,{focusDetail=false,scroll=false}={}){
 const project=projects.find(item=>item.id===id);if(!project)return;
 selected=id;
 for(const button of byId('projects').querySelectorAll('[data-project]'))button.setAttribute('aria-pressed',String(button.dataset.project===id));
 renderDetail();
 const url=new URL(location.href);url.searchParams.set('project',id);history.replaceState(null,'',url.pathname+url.search+url.hash);
 if(scroll)byId('work').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 if(focusDetail)byId('detail').focus({preventScroll:!scroll});
}
function packageStatus(p){
 if(p.package)return p.package.badge;
 if(p.id==='sanctum')return worldAvailable?'hosted world':'Case study';
 return 'Case study';
}
function renderList(){
 const query=byId('search').value.toLowerCase();
 const list=projects.filter(p=>(filter==='All'||p.group===filter)&&[p.name,p.group,p.summary,...p.skills].join(' ').toLowerCase().includes(query));
 byId('count').textContent=`${list.length} project ${list.length===1?'family':'families'}`;
 byId('projects').replaceChildren();
 if(!list.length){byId('projects').textContent='No projects match. Try a different skill or category.';byId('detail').innerHTML='<h2>No matching projects</h2><p>Clear the search or choose another capability.</p>';return;}
 if(!list.some(p=>p.id===selected))selected=list[0].id;
 for(const p of list){const button=document.createElement('button');button.className='project';button.type='button';button.dataset.project=p.id;button.setAttribute('aria-pressed',String(p.id===selected));button.innerHTML=`<span class="category">${safe(p.group)}</span><strong>${safe(p.name)}</strong><small>${safe(p.status)}</small><span class="demo-badge">${safe(packageStatus(p))}</span>`;button.addEventListener('click',()=>selectProject(p.id));button.addEventListener('keydown',event=>{if(event.key!=='ArrowDown'&&event.key!=='ArrowUp')return;event.preventDefault();const all=[...byId('projects').querySelectorAll('[data-project]')];const next=Math.max(0,Math.min(all.length-1,all.indexOf(button)+(event.key==='ArrowDown'?1:-1)));all[next].focus();});byId('projects').append(button);}
 renderDetail();
}
function renderPackageBlock(p){
 if(p.package){
  const labels=(p.package.labels||[]).map(label=>`<li>${safe(label)}</li>`).join('');
  return `<div class="package-card"><span class="demo-badge">${safe(p.package.badge)}</span><p class="package-role">${safe(p.package.role)}</p>${labels?`<h3>Highlights</h3><ul class="evidence-labels">${labels}</ul>`:''}<div class="detail-actions"><a href="${safe(p.package.href)}">Open demo package ↗</a></div></div>`;
 }
 if(p.id==='sanctum'&&worldAvailable){
  return `<div class="package-card"><span class="demo-badge">hosted world</span><div class="detail-actions"><a href="${safe(worldUrl)}" target="_blank" rel="noopener noreferrer">Enter the Godot world ↗</a></div></div>`;
 }
 return `<div class="package-card package-case-study"><span class="demo-badge">Case study</span><p>Shown here as a case-study card with scope and my role. Interactive simulations use synthetic data where noted.</p></div>`;
}
function renderDetail(){
 const p=projects.find(p=>p.id===selected);
 const contribution=p.package?p.package.role:p.role;
 byId('detail').innerHTML=`<span class="pill">${safe(p.status)}</span><h2>${safe(p.name)}</h2><p class="detail-lead">${safe(p.summary)}</p><div class="tags">${p.skills.map(s=>`<span>${safe(s)}</span>`).join('')}</div><h3>My role</h3><p>${safe(contribution)}</p>${renderPackageBlock(p)}<div class="detail-actions">${p.url?`<a href="${safe(p.url)}" target="_blank" rel="noopener noreferrer">Inspect public project source ↗</a>`:''}</div>${p.id==='sanctum'&&!worldAvailable?'<p class="world-status">The local Godot prototype is playable on my Mac. The browser interaction below is a separate original example.</p>':''}<div id="demo"></div>`;
 if(p.id==='sanctum')byId('demo').insertAdjacentHTML('beforebegin','<div class="game-preview"><p class="eyebrow">FIVE-DISTRICT GODOT WORLD / CAPTURED SEPTEMBER 2026</p><a href="assets/sanctum-world-aerial.png" target="_blank" rel="noopener noreferrer"><img src="assets/sanctum-world-aerial.png" width="1280" height="720" loading="lazy" alt="Aerial render of the five-district CS646 Sanctum world, with roads radiating from a central roundabout to themed rooms"></a><div class="game-preview-pair"><a href="assets/sanctum-money-room.png" target="_blank" rel="noopener noreferrer"><img src="assets/sanctum-money-room.png" width="1280" height="720" loading="lazy" alt="Top-down render of the money district room with a gold-lit exchange counter and Q1 exhibit"></a><a href="assets/sanctum-consensus-room.png" target="_blank" rel="noopener noreferrer"><img src="assets/sanctum-consensus-room.png" width="1280" height="720" loading="lazy" alt="Top-down render of a block assembly room with a blockchain table and two exhibits"></a></div><p class="game-caption">Current Godot source renders show original procedural geometry across the world and rooms.</p></div>');
 if(p.demo==='hash')hashDemo();
 else if(p.demo==='transaction')transactionDemo();
 else if(p.demo==='policy')policyDemo();
 else if(!p.package)byId('demo').innerHTML='<div class="demo"><h3>Case study</h3><p>This project is represented with its current scope. Interactive simulations use synthetic data where noted.</p></div>';
}
function hashDemo(){
 byId('demo').innerHTML='<div class="demo"><p class="eyebrow">ORIGINAL PORTFOLIO DEMONSTRATION</p><h3>Change a message. Inspect its hash.</h3><p>SHA-256 runs in your browser. The same message gives the same digest.</p><label>Message<input id="message" value="Build systems people can trust" maxlength="2000"></label><button id="hash">Compute SHA-256</button><output id="hash-result" aria-live="polite">Ready to compute.</output></div>';
 byId('hash').addEventListener('click',async()=>{const output=byId('hash-result');try{if(!globalThis.crypto?.subtle)throw new Error('Secure browser context required');const value=byId('message').value;const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));output.textContent=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');}catch{output.textContent='This demo needs HTTPS or localhost and a browser with Web Crypto support.';}});
}
function transactionDemo(){
 byId('demo').innerHTML='<div class="demo"><p class="eyebrow">SYNTHETIC CONCEPT DEMONSTRATION</p><h3>Balance a transaction.</h3><p>Explore value conservation using whole-number toy units. This example sends no currency.</p><div class="fields"><label>Available input<input id="input" type="number" min="0" max="1000000" step="1" value="24"></label><label>Recipient<input id="recipient" type="number" min="0" max="1000000" step="1" value="15"></label><label>Fee<input id="fee" type="number" min="0" max="1000000" step="1" value="1"></label></div><output id="balance" aria-live="polite"></output></div>';
 const calculate=()=>{const values=['input','recipient','fee'].map(id=>byId(id).value.trim()===''?NaN:Number(byId(id).value));const[a,b,c]=values;byId('balance').textContent=values.some(v=>!Number.isSafeInteger(v)||v<0||v>1000000)?'Enter whole numbers between 0 and 1,000,000.':a<b+c?'Invalid: recipient plus fee exceeds the input.':`Change = ${a-b-c} units. ${a} = ${b} + ${a-b-c} + ${c}.`;};['input','recipient','fee'].forEach(id=>byId(id).addEventListener('input',calculate));calculate();
}
function policyDemo(){
 byId('demo').innerHTML='<div class="demo"><p class="eyebrow">SIMULATED POLICY / NO REAL TOOL EXECUTION</p><h3>Inspect an authorization decision.</h3><label>Caller<select id="role"><option value="viewer">Viewer</option><option value="analyst">Analyst</option></select></label><label>Requested action<select id="action"><option value="read">Read synthetic report</option><option value="run">Run approved analysis</option><option value="delete">Delete records</option></select></label><output id="decision" aria-live="polite"></output><p class="small">This small rule example illustrates explicit permission checks. Production authorization requires independent server-side enforcement.</p></div>';
 const decide=()=>{const role=byId('role').value,action=byId('action').value;const allowed=action==='read'||(role==='analyst'&&action==='run');byId('decision').textContent=(allowed?'ALLOW':'DENY')+' · '+(action==='delete'?'Deletion is outside this demo’s permission set.':allowed?'The selected role has this permission.':'This action requires the analyst role.');};['role','action'].forEach(id=>byId(id).addEventListener('change',decide));decide();
}
for(const category of ['All',...new Set(projects.map(p=>p.group))]){const button=document.createElement('button');button.type='button';button.textContent=category;button.setAttribute('aria-pressed',String(category==='All'));button.addEventListener('click',()=>{filter=category;for(const child of byId('filters').children)child.setAttribute('aria-pressed',String(child===button));renderList();});byId('filters').append(button);}
byId('search').addEventListener('input',renderList);
renderList();

function showStop(index){
 activeStop=index;
 const stop=stops[index];
 byId('landmark-number').textContent=String(index+1).padStart(2,'0')+' / 05';
 byId('landmark-title').textContent=stop.title;
 byId('landmark-summary').textContent=stop.summary;
 byId('landmark-open').innerHTML=(stop.id==='sanctum'&&worldAvailable?'Enter world':'Open project')+' <span aria-hidden="true">↗</span>';
 for(const button of document.querySelectorAll('.landmark'))button.setAttribute('aria-current',String(button.dataset.stop===stop.id));
}
const stage=byId('map-stage');
const rover=byId('rover');
const roverPosition={x:44,y:43};
const pressed=new Set();
const movement={ArrowUp:[0,-1],KeyW:[0,-1],ArrowDown:[0,1],KeyS:[0,1],ArrowLeft:[-1,0],KeyA:[-1,0],ArrowRight:[1,0],KeyD:[1,0]};
let previousFrame=0;
function paintRover(dx=0,dy=0){
 rover.style.left=roverPosition.x+'%';rover.style.top=roverPosition.y+'%';
 if(dx||dy)rover.style.transform=`translate(-50%,-50%) rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)`;
}
function nearestStop(){
 let best=0,bestDistance=Infinity;
 stops.forEach((stop,index)=>{const distance=(stop.x-roverPosition.x)**2+(stop.y-roverPosition.y)**2;if(distance<bestDistance){best=index;bestDistance=distance;}});
 if(best!==activeStop)showStop(best);
}
function animateDrive(time){
 const elapsed=Math.min(32,time-(previousFrame||time));previousFrame=time;
 if(pressed.size){let dx=0,dy=0;for(const key of pressed){dx+=movement[key][0];dy+=movement[key][1];}if(dx||dy){const length=Math.hypot(dx,dy);roverPosition.x=Math.max(25,Math.min(96,roverPosition.x+dx/length*elapsed*.028));roverPosition.y=Math.max(9,Math.min(84,roverPosition.y+dy/length*elapsed*.028));paintRover(dx,dy);nearestStop();}}
 requestAnimationFrame(animateDrive);
}
stage.addEventListener('keydown',event=>{
 if(event.target!==stage)return;
 if(movement[event.code]){event.preventDefault();pressed.add(event.code);}
 if(event.key==='Enter'){event.preventDefault();openStop();}
});
stage.addEventListener('keyup',event=>pressed.delete(event.code));
stage.addEventListener('blur',()=>pressed.clear());
window.addEventListener('blur',()=>pressed.clear());
document.querySelectorAll('.landmark').forEach(button=>button.addEventListener('click',()=>{const index=stops.findIndex(stop=>stop.id===button.dataset.stop);if(index<0)return;showStop(index);roverPosition.x=stops[index].x;roverPosition.y=stops[index].y;paintRover();}));
function openStop(){
 const stop=stops[activeStop];
 if(stop.id==='sanctum'&&worldAvailable){location.href=worldUrl;return;}
 if(stop.target==='experience'){byId('experience').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return;}
 const targetProject=projects.find(project=>project.id===stop.target);
 if(!targetProject)return;
 if(filter!=='All'||byId('search').value){filter='All';byId('search').value='';for(const button of byId('filters').children)button.setAttribute('aria-pressed',String(button.textContent==='All'));renderList();}
 selectProject(stop.target,{focusDetail:true,scroll:true});
}
byId('landmark-open').addEventListener('click',openStop);
byId('drive-button').addEventListener('click',()=>{stage.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});stage.focus({preventScroll:true});});
document.querySelectorAll('[data-select-project]').forEach(link=>link.addEventListener('click',event=>{const id=link.dataset.selectProject;if(!projects.some(project=>project.id===id))return;event.preventDefault();if(filter!=='All'||byId('search').value){filter='All';byId('search').value='';for(const button of byId('filters').children)button.setAttribute('aria-pressed',String(button.textContent==='All'));renderList();}selectProject(id,{focusDetail:true,scroll:true});}));
showStop(0);paintRover();requestAnimationFrame(animateDrive);
fetch('data/site-config.json',{cache:'no-store'}).then(async response=>{
 if(!response.ok)return;
 const config=await response.json();
 if(typeof config.worldUrl!=='string')return;
 const allowedHosts=/^(cs646-sanctum-world\.web\.app|[a-z0-9]+\.cloudfront\.net)$/;
 const entry=new URL(config.worldUrl,location.href);
 if(entry.protocol!=='https:'||!allowedHosts.test(entry.hostname))return;
 worldUrl=entry.href;
 worldAvailable=true;
 if(typeof config.worldUrlFallback==='string'){
  try{
   const fb=new URL(config.worldUrlFallback,location.href);
   if(fb.protocol==='https:'&&allowedHosts.test(fb.hostname)&&fb.href!==worldUrl){
    const link=document.createElement('a');
    link.href=fb.href;link.target='_blank';link.rel='noopener noreferrer';
    link.textContent='Fallback world URL ↗';link.className='world-fallback-link';
    link.hidden=true;link.id='world-fallback-link';
    document.body.append(link);
   }
  }catch(_){}
 }
 showStop(activeStop);if(selected==='sanctum')renderDetail();renderList();
}).catch(()=>{});

let certificatesLoaded=false;
byId('learning-certificates').addEventListener('toggle',async event=>{
 if(!event.target.open||certificatesLoaded)return;
 const list=byId('certificate-list');list.textContent='Loading certificate entries…';
 try{
  const response=await fetch('data/linkedin-learning.json');if(!response.ok)throw new Error('Certificate index unavailable');
  const data=await response.json();if(!Array.isArray(data.entries)||data.entries.length!==30)throw new Error('Certificate index incomplete');
  list.replaceChildren();
  for(const entry of data.entries){
   if(typeof entry.title!=='string'||typeof entry.completed_on!=='string'||typeof entry.url!=='string'||!entry.url.startsWith('https://www.linkedin.com/learning/certificates/'))continue;
   const item=document.createElement('li');const title=document.createElement('a');title.href=entry.url;title.target='_blank';title.rel='noopener noreferrer';title.textContent=entry.title;
   const date=document.createElement('time');date.dateTime=entry.completed_on;date.textContent='Completed '+entry.completed_on;
   item.append(title,date);list.append(item);
  }
  certificatesLoaded=true;
 }catch{list.textContent='The local certificate index could not be loaded. Use the LinkedIn listing above.';}
});
