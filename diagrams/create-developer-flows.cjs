// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
// One four-step brokerage journey: Flow A enters at step 1, Flow B (already booked) at step 2.
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', blue = '#426a96', grey = '#5f6b64', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `flows-${++serial}`;
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
function shape(type, label, x, y, w, h, color, fill, size = 24) {
  const el = base(type, x, y, w, h, {strokeColor:color, backgroundColor:fill,
    roundness:type === 'rectangle' ? {type:3} : {type:2}});
  const n = label.split('\n').length;
  text(label, x+16, y+(h-n*size*1.3)/2, w-32, size, color, 'center', el);
  return el;
}
const box = (label, x, y, color, fill, w = 340, h = 150, size = 24) =>
  shape('rectangle', label, x, y, w, h, color, fill, size);
function stroke(points, color, arrow = true) {
  const [x,y] = points[0];
  return base(arrow?'arrow':'line', x, y,
    Math.max(...points.map(p=>p[0]))-Math.min(...points.map(p=>p[0])),
    Math.max(...points.map(p=>p[1]))-Math.min(...points.map(p=>p[1])),
    {points:points.map(p=>[p[0]-x,p[1]-y]), strokeColor:color, strokeStyle:'solid',
      strokeWidth:2, roughness:0, startBinding:null, endBinding:null,
      startArrowhead:null, endArrowhead:arrow?'arrow':null, elbowed:false});
}
function connect(a, b, color) {
  const el = stroke([[a.x+a.width+8,a.y+a.height/2],[b.x-10,b.y+b.height/2]], color);
  el.startBinding = {elementId:a.id,focus:0,gap:8}; el.endBinding = {elementId:b.id,focus:0,gap:10};
  a.boundElements.push({id:el.id,type:'arrow'}); b.boundElements.push({id:el.id,type:'arrow'});
}
const W = 380, H = 190, F = 26;
const step = (label, x, cy, color = green, fill = '#e8f1e8', h = H) => box(label, x, cy-h/2, color, fill, W, h, F);

text('Aaronz × Developer / Getting your brokerages paid faster', 40, 25, 3100, 52);
text('One journey for both situations. Flow A starts at step 1; Flow B starts at step 2 because the unit is already booked. At step 2 the brokerage chooses Express or Normal.', 40, 100, 3100, 28, muted);

const topY = 420, midY = 700, lowY = 980;

// Flow A: sale done, unit not booked → starts at step 1.
text('FLOW A  ·  Sale not yet done', 60, 225, 1300, 30, green);
const a0 = step('You share the Aaronz\nbooking link with\nyour brokerages', 60, topY);
const s1 = step('STEP 1 · Book the unit\nBrokerage opens the link,\nselects the unit and\ncompletes the booking', 520, topY, green, '#dcebdc', 220);
connect(a0, s1, green);

// Flow B: booked, invoice not raised → starts at step 2.
text('FLOW B  ·  Sale done, yet to raise invoice', 60, lowY-200, 1300, 30, blue);
const b0 = step('You notify brokerages\nwith un-raised invoices:\n“Get paid instantly with\nour Aaronz partnership”', 60, lowY, blue, '#edf3fa', 220);
const b1 = step('Brokerage clicks\nthe link', 520, lowY, blue, '#edf3fa');
connect(b0, b1, blue);
text('Flow B skips step 1', 520, lowY+120, W, 22, blue, 'center');

// Step 2 + decision.
const s2 = step('STEP 2 · Raise the invoice\n“Raise your invoice now and\nget commission within 24h”', 1000, midY, green, '#dcebdc', 220);
stroke([[908,topY],[1190,topY],[1190,midY-120]], green);
stroke([[908,lowY],[1190,lowY],[1190,midY+120]], blue);
const d = shape('diamond', 'Express or\nNormal?', 1470, midY-140, 300, 280, green, '#e8f1e8', 28);
connect(s2, d, green);
stroke([[1778,midY],[1830,midY],[1830,topY],[1880,topY]], green);
stroke([[1778,midY],[1830,midY],[1830,lowY],[1880,lowY]], grey);
text('EXPRESS', 1690, topY+20, 130, 24, green, 'right');
text('NORMAL', 1690, lowY-60, 130, 24, grey, 'right');

// Express branch: steps 3 and 4.
const s3 = step('STEP 3 · Review & accept\nCheck the amount, accept\nthe terms and the\nagreement', 1890, topY, green, '#dcebdc', 220);
const s4 = step('STEP 4 · Confirm your\nbank account', 2350, topY, green, '#dcebdc', 220);
const paid = box('DONE\nCommission paid\nwithin 24 hours', 2810, topY-110, green, '#cfe5cf', 380, 220, 30);
connect(s3, s4, green); connect(s4, paid, green);

// Normal branch: existing terms.
const n1 = box('Upload the invoice the usual way\nNo early payment requested', 1890, lowY-95, grey, '#f1f3f2', 840, 190, F);
const n2 = box('Paid when the\ndeveloper pays\n30 / 60 days, as per\nthe agreement', 2810, lowY-110, grey, '#f1f3f2', 380, 220, F);
connect(n1, n2, grey);

text('Until the Aaronz app is live, the shared link is the booking channel.', 60, 1180, 3100, 24, muted);

// Developer integration models, transcribed from the whiteboard photo (IMG_5916).
stroke([[40,1260],[3190,1260]], '#dce3dc', false);
text('Developer integration models', 40, 1300, 3100, 46);
text('Transcribed from the whiteboard', 40, 1365, 3100, 26, muted);
const cols = [440, 800, 1160, 1520, 1880, 2240, 2600];
const node = (label, col, cy, color = green, fill = '#e8f1e8', w = 300) => box(label, cols[col], cy-50, color, fill, w, 100, 26);
const dev = (label, cy) => box(label, 60, cy-55, ink, '#ffffff', 320, 110, 32);
function chain(nodes, color = green) { for (let i = 1; i < nodes.length; i++) connect(nodes[i-1], nodes[i], color); }

// Emaar: App → Checkout & Email (API) → Agreement → Pay.
const eY = 1580;
const emaar = dev('EMAAR', eY);
const eCheckout = node('Checkout\n& Email', 1, eY);
chain([emaar, node('App', 0, eY), eCheckout, node('Agreement', 2, eY), node('Pay', 3, eY, green, '#dcebdc')]);
box('API', 860, 1430, ink, '#ffffff', 180, 60, 26);
stroke([[950,eY-58],[950,1498]], ink);

// Imtiaz: White label → S.N.I or N.S.N.I.
const iTop = 1800, iLow = 1960, iY = (iTop+iLow)/2;
const imtiaz = dev('IMTIAZ', iY);
const white = node('White label', 0, iY);
connect(imtiaz, white, green);
const sni = node('S.N.I', 1, iTop, blue, '#edf3fa');
const nsni = node('N.S.N.I', 1, iLow, blue, '#edf3fa');
stroke([[748,iY],[770,iY],[770,iTop],[790,iTop]], blue);
stroke([[748,iY],[770,iY],[770,iLow],[790,iLow]], blue);
chain([sni, node('Email', 2, iTop), node('Agreement', 3, iTop), node('Pay', 4, iTop, green, '#dcebdc')]);
connect(nsni, box('Mimic App  +  Inventory ★  +  Booking  +  Agreement  +  Pay', cols[2], iLow-50, green, '#e8f1e8', 1740, 100, 26), green);

// Danube: does not want the app.
const dY = 2160;
chain([dev('DANUBE', dY), node('Don\'t want App', 0, dY, grey, '#f1f3f2'), node('Email', 1, dY), node('Agreement', 2, dY), node('Pay', 3, dY, green, '#dcebdc')]);

// All developers: inventory pushed in real time into the app.
const allY = 2360;
const all = box('ALL DEVELOPERS', 60, allY-60, ink, '#ffffff', 320, 120, 32);
all.strokeWidth = 3;
const mimic = node('App (mimic)', 1, allY);
chain([all, node('App → Push\ninventory RT', 0, allY), mimic, node('Agreement', 2, allY), node('Checkout', 3, allY), node('Pay', 4, allY, green, '#dcebdc')]);
stroke([[950,allY+58],[950,allY+130]], '#b4472e');
text('HANDLING MONEY?', 790, allY+140, 320, 28, '#b4472e', 'center');

// FastPay RECAP vs Aaronz: process comparison. FastPay steps from its product pages (accessed 1 Oct 2026, deck Competition slide).
stroke([[40,2560],[3190,2560]], '#dce3dc', false);
text('FastPay vs Aaronz / How the process differs', 40, 2600, 3100, 46);
text('FastPay works outside the developer’s flow and needs developer approval after the invoice. Aaronz sits inside the developer’s usual booking and invoice flow, at the source.', 40, 2665, 3100, 26, muted);
const pcols = [420, 860, 1300, 1740, 2180, 2620];
const pnode = (label, col, cy, color, fill) => box(label, pcols[col], cy-70, color, fill, 380, 140, 24);
const amber = '#a5641b';

const fY = 2860;
const fp = box('FASTPAY\nOutside the\ndeveloper flow', 60, fY-80, grey, '#ffffff', 320, 160, 28);
chain([fp,
  pnode('Sale and invoice sit in\nthe developer’s system', 0, fY, grey, '#f1f3f2'),
  pnode('Agency submits the invoice\nto FastPay, a separate\nplatform', 1, fY, grey, '#f1f3f2'),
  pnode('Developer must approve\neach invoice', 2, fY, amber, '#fbf4e6'),
  pnode('KYC, eligibility and\nprocessing cut-offs', 3, fY, amber, '#fbf4e6'),
  pnode('Partner funds the agency\n2–9 days after approval', 4, fY, grey, '#f1f3f2'),
  pnode('Developer repays\nthe partner at term', 5, fY, grey, '#f1f3f2')], grey);

const zY = 3110;
const az = box('AARONZ\nAt the source', 60, zY-80, green, '#ffffff', 320, 160, 28);
az.strokeWidth = 3;
chain([az,
  pnode('Booking and invoice happen\nin the developer’s own flow\n(Aaronz link / app)', 0, zY, green, '#e8f1e8'),
  pnode('Express option offered\nat checkout', 1, zY, green, '#e8f1e8'),
  pnode('Brokerage reviews the amount\nand accepts the terms', 2, zY, green, '#e8f1e8'),
  pnode('Brokerage confirms\nbank account', 3, zY, green, '#e8f1e8'),
  pnode('Commission paid\nwithin 24 hours', 4, zY, green, '#cfe5cf'),
  pnode('Developer pays Aaronz\non the agreed due date', 5, zY, green, '#e8f1e8')], green);

text('No separate approval chase: the invoice is raised inside the developer’s flow, so it is already known to the developer.', 1300, zY+85, 1500, 22, green);
text('FastPay steps per its product pages, accessed 1 Oct 2026 (see the deck’s Competition slide). Aaronz timings are our proposal, not yet live.', 40, 3260, 3100, 22, muted);

const scene = {type:'excalidraw', version:2, source:'https://excalidraw.com', elements,
  appState:{viewBackgroundColor:'#ffffff', gridSize:null, exportBackground:true, exportWithDarkMode:false}, files:{}};
const out = path.join(__dirname, 'aaronz-developer-flows.excalidraw');
fs.writeFileSync(out, JSON.stringify(scene, null, 2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
