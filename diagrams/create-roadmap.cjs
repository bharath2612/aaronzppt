// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `roadmap-${++serial}`;
  const el = {id, type, x, y, width, height, angle: 0, strokeColor: ink,
    backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1.5,
    strokeStyle: 'solid', roughness: 0.7, opacity: 100, groupIds: [],
    frameId: null, index: null, roundness: null, seed: serial * 7919,
    version: 1, versionNonce: serial * 997, isDeleted: false, boundElements: [],
    updated: 1792656000000, link: null, locked: false, ...extra};
  elements.push(el); return el;
}
function text(value, x, y, w, size = 24, color = ink, align = 'left', container = null) {
  const h = value.split('\n').length * size * 1.3;
  const el = base('text', x, y, w, h, {text:value, originalText:value,
    fontSize:size, fontFamily:2, lineHeight:1.3, textAlign:align,
    verticalAlign:'middle', containerId:container?.id || null, autoResize:false,
    strokeColor:color, strokeWidth:1, roughness:0});
  if (container) container.boundElements.push({id:el.id,type:'text'});
  return el;
}
function box(label, x, y, w=380, h=108, color=green, fill='#e8f1e8', size=25) {
  const el = base('rectangle', x,y,w,h,{strokeColor:color,backgroundColor:fill,
    roundness:{type:3}});
  const n = label.split('\n').length;
  text(label,x+16,y+(h-n*size*1.3)/2,w-32,size,color,'center',el);
  return el;
}
function stroke(points, color='#a8b5aa', dashed=false, arrow=false) {
  const [x,y] = points[0];
  return base(arrow?'arrow':'line',x,y,
    Math.max(...points.map(p=>p[0]))-Math.min(...points.map(p=>p[0])),
    Math.max(...points.map(p=>p[1]))-Math.min(...points.map(p=>p[1])),
    {points:points.map(p=>[p[0]-x,p[1]-y]),strokeColor:color,
      strokeStyle:dashed?'dashed':'solid',strokeWidth:arrow?2:1,roughness:0,
      startBinding:null,endBinding:null,startArrowhead:null,endArrowhead:arrow?'arrow':null,
      elbowed:false});
}
function connect(a,b,color=green) {
  const el=stroke([[a.x+a.width+8,a.y+a.height/2],[b.x-10,b.y+b.height/2]],color,false,true);
  el.startBinding={elementId:a.id,focus:0,gap:8};el.endBinding={elementId:b.id,focus:0,gap:10};
  a.boundElements.push({id:el.id,type:'arrow'});b.boundElements.push({id:el.id,type:'arrow'});
}

text('Aaronz / Four-week launch roadmap',40,25,2250,48);
text('Monday 26 October–Sunday 22 November 2026  •  Seven parallel workstreams',40,100,2300,27,muted);
text('Weeks 1 & 2: setup and readiness',280,175,1000,27,green);
text('Weeks 3 & 4: test, onboard and launch',1320,175,1050,27,green);
stroke([[280,218],[1220,218]],green);stroke([[1320,218],[2260,218]],green);
const columns = [[280,'Week 1','26 Oct–1 Nov'],[800,'Week 2','2–8 Nov'],[1320,'Week 3','9–15 Nov'],[1840,'Week 4','16–22 Nov']];
for(const [x,week,date] of columns){text(week,x,245,420,30);text(date,x,290,420,23,muted);}
for(const x of [750,1270,1790])stroke([[x,335],[x,1695]],'#dce3dc',true);
const plan = [
 {label:'Licence',y:365,color:green,fill:'#e8f1e8',items:[
  'Initiate / progress\nlicence application\nStart Monday 26 Oct',
  'Pursue licence approval\nTarget: end of Week 2\n8 Nov',
  'Secure required approval\nResolve outstanding items\nBefore signing / funding',
  'Licence ready for launch\nRequired approval in place\nbefore first invoice funding']},
 {label:'Capital',y:555,color:'#426a96',fill:'#edf3fa',items:[
  'Approach funders\nConfirm capital needs\nAlongside licence + outreach',
  'Agree facility terms\nConfirm limits, pricing\nand funding conditions',
  'Complete funding paperwork\nCapital available\nTarget: 15 Nov',
  'Make funding available\nfor approved invoices\nMonitor facility headroom']},
 {label:'Banking',y:745,color:'#377c85',fill:'#e9f5f5',items:[
  'Choose banking partner\nMap who pays whom\nDefine accounts + controls',
  'Set up required accounts\nAgree payout / collection route\nSet approvals + reconciliation',
  'Connect bank / payment rail\nTest payouts + reconciliation\nConfirm settlement readiness',
  'Operate payouts + collections\nReconcile each invoice\nTrack exceptions + balances']},
 {label:'Agreements',y:935,color:'#92692d',fill:'#fbf4e6',items:[
  'Draft developer agreement\nDuring developer outreach\nDefine payment milestones',
  'Finalise paperwork\nPayment terms + recourse\nTarget: 8 Nov',
  'Sign developer agreements\nConfirm due dates\nand collection instructions',
  'Signed agreements ready\nfor each onboarded developer\nConfirm eligible invoices']},
 {label:'Developers',y:1125,color:green,fill:'#e8f1e8',items:[
  'Licence in pipeline →\nstart developer outreach\nBuild interested shortlist',
  'Confirm first developers\nready to onboard\nTarget: 8 Nov',
  'Onboard first developers\nOnce licence + paperwork ready\n9–15 Nov',
  'Activate developers\nSubmit first invoices\nSupport initial transactions']},
 {label:'Marketing',y:1315,color:'#80578d',fill:'#f4edf6',items:[
  'Create Instagram, TikTok,\nX + LinkedIn accounts\nPlan audience, messaging,\nbudget + content calendar',
  'Lock ads + mockups by 8 Nov\nPrepare landing page + tracking\nLaunch awareness + developer-\nonboarding campaign',
  'Run campaign + retargeting\nCapture leads; follow up\nReview enquiries + cost\nper qualified lead',
  'Optimise creative + spend\nConvert leads to onboarding\nPublish launch content\nReport campaign results']},
 {label:'App / portal',y:1525,color:'#5b64a1',fill:'#eff0fb',items:[
  'Portal core: complete\nStart app development 26 Oct\nBuild invoice + payment-\nstatus screens',
  'Build payment integration\nShow pending / paid / failed\nPrepare App Store + Google\nPlay listings and mockups',
  'Test invoice → payout → repay\nPilot / UAT + TestFlight\nFix issues; submit apps\nfor store review',
  'Release tested portal\nPublish iOS / Android apps\nwhen store approvals arrive\nMonitor payments + errors']},
];
const ends=[];
for(const lane of plan){
 text(lane.label,40,lane.y+47,225,28,lane.color);
 const height=lane.items[0].split('\n').length>3?150:130;
 const nodes=lane.items.map((label,i)=>box(label,columns[i][0],lane.y,420,height,lane.color,lane.fill,23));
 for(let i=0;i<3;i++)connect(nodes[i],nodes[i+1],lane.color);
 stroke([[40,lane.y+height+25],[2260,lane.y+height+25]],'#e3e8e2');
 if(lane.label!=='Marketing')ends.push(nodes[3]);
}
// All operational readiness inputs converge; marketing continues alongside launch.
for(const b of ends)stroke([[b.x+b.width+8,b.y+b.height/2],[2350,b.y+b.height/2]],green);
stroke([[2350,430],[2350,1750],[800,1750],[800,1810]],green,false,true);
text('Operational readiness converges here',40,1745,680,24,muted);
box('LAUNCH CHECKPOINT\nLicence + capital + banking / settlement ready\nSigned developers + tested portal / payment flow',280,1820,1040,150,green,'#dcebdc',26);
stroke([[1330,1895],[1480,1895]],green,false,true);
box('FIRST INVOICES BY 22 NOVEMBER\nVerify invoices → release advances\nStart settlement operations',1490,1820,770,150,green,'#dcebdc',27);
text('App Store / Google Play approval is an external dependency; the portal supports the initial launch.',40,2035,2320,24,muted);
text('Planning targets. Portal core completion reflects the supplied status. Developer repayment follows each agreed due date.',40,2090,2320,22,muted);
const scene={type:'excalidraw',version:2,source:'https://excalidraw.com',elements,
 appState:{viewBackgroundColor:'#ffffff',gridSize:null,exportBackground:true,exportWithDarkMode:false},files:{}};
const out=path.join(__dirname,'aaronz-roadmap.excalidraw');
fs.writeFileSync(out,JSON.stringify(scene,null,2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
