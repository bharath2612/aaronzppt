// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
// Ready homes, manual flow: the staged commission payout against the buyer's 2% cheque, as the user defined it on 26 Nov 2026, with the transfer-day handover problem.
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', blue = '#426a96', orange = '#b4472e', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `readyproc-${++serial}`;
  const el = {id, type, x, y, width, height, angle: 0, strokeColor: ink,
    backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1.5,
    strokeStyle: 'solid', roughness: 0.7, opacity: 100, groupIds: [],
    frameId: null, index: null, roundness: null, seed: serial * 7919,
    version: 1, versionNonce: serial * 997, isDeleted: false, boundElements: [],
    updated: 1795680000000, link: null, locked: false, ...extra};
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
function box(label, x, y, w, h, color, fill, size = 24) {
  const el = base('rectangle', x, y, w, h, {strokeColor:color, backgroundColor:fill, roundness:{type:3}});
  const n = label.split('\n').length;
  text(label, x+14, y+(h-n*size*1.3)/2, w-28, size, color, 'center', el);
  return el;
}
function arrow(a, b, color, dashed = false) {
  // Right if b is beside a, down if b is below a.
  const right = b.x >= a.x + a.width;
  const sx = right ? a.x+a.width+6 : a.x+a.width/2, sy = right ? a.y+a.height/2 : a.y+a.height+6;
  const ex = right ? b.x-8 : sx, ey = right ? sy : b.y-8;
  const el = base('arrow', sx, sy, ex-sx, ey-sy, {
    points:[[0,0],[ex-sx,ey-sy]], strokeColor:color, strokeWidth:2, roughness:0,
    strokeStyle: dashed ? 'dashed' : 'solid',
    startBinding:{elementId:a.id,focus:0,gap:6}, endBinding:{elementId:b.id,focus:0,gap:8},
    startArrowhead:null, endArrowhead:'arrow', elbowed:false});
  a.boundElements.push({id:el.id,type:'arrow'}); b.boundElements.push({id:el.id,type:'arrow'});
}

const red = '#a12b2b';
const W = 340, GAP = 64, X0 = 40, col = i => X0 + i*(W+GAP);

text('Ready homes: manual flow', 40, 25, 2360, 44);
text('The broker hands the buyer\'s 2% commission cheque to AaronzPay and is paid in four stages. Both cheques are written in the finance partner\'s name.', 40, 92, 2360, 24, muted);

const steps = [
  ['1  MOU (FORM F) SIGNED\nBuyer gives two non-cashable\ncheques: 8% deposit and\n2% commission, written to\nthe finance partner', ink, '#ffffff'],
  ['2  BROKER ASKS FOR PAYOUT\nHands the 2% cheque\nto AaronzPay in person.\nBuyer KYC, acknowledgement', orange, '#fbeeea'],
  ['3  PAYOUT 1\n50% of the commission\nonce AaronzPay holds\nthe 2% cheque', green, '#e8f1e8'],
  ['4  PAYOUT 2\n15% when the valuation\nis done or the bank issues\nits final offer letter', green, '#e8f1e8'],
  ['5  PAYOUT 3\n15% when the\ntransfer is booked', green, '#e8f1e8'],
  ['6  TRANSFER DAY\nBuyer takes the 2% cheque\nback and gives a manager\'s\ncheque, also to the finance\npartner. PAYOUT 4: 20%', red, '#fbeaea'],
].map(([label, color, fill], i) => box(label, col(i), 170, W, 210, color, fill, 22));
steps.slice(1).forEach((b, i) => arrow(steps[i], b, ink));

// Where the 2% cheque physically is.
text('WHERE THE 2% CHEQUE IS', 40, 430, 800, 22, muted);
const c1 = box('With the broker', col(0), 470, W, 80, ink, '#ffffff', 22);
const c2 = box('With AaronzPay, from the first payout until transfer day', col(1), 470, 4*W+3*GAP, 80, orange, '#fbeeea', 22);
const c3 = box('Must be back in the\nbuyer\'s hand, on the spot', col(5), 470, W, 80, red, '#fbeaea', 22);
arrow(c1, c2, ink); arrow(c2, c3, red);

const bw = 744;
box('THE BIGGEST RISK: CHEQUE PICKUP AND DELIVERY\nThe 2% cheque has to travel from the broker to AaronzPay, and be back in the buyer\'s hand on transfer day.\nThe swap is hand to hand: the buyer gives the manager\'s cheque and takes the non-cashable cheque back on the spot.\nThe manager\'s cheque then has to reach the finance partner. The buyer\'s process should not change.', 40, 620, 2*bw+64, 210, red, '#fbeaea', 22).strokeWidth = 3;
box('BOTH CHEQUES ARE WRITTEN IN\nTHE FINANCE PARTNER\'S NAME\nThe non-cashable 2% commission cheque\nThe manager\'s cheque on transfer day', 1656, 620, bw, 210, ink, '#ffffff', 22);

text('The four payouts add up to 100% of the commission: 50%, 15%, 15% and 20%.', 40, 870, 2360, 22, muted);

const scene = {type:'excalidraw', version:2, source:'https://excalidraw.com', elements,
  appState:{viewBackgroundColor:'#ffffff', gridSize:null, exportBackground:true, exportWithDarkMode:false}, files:{}};
const out = path.join(__dirname, 'aaronz-ready-homes-process.excalidraw');
fs.writeFileSync(out, JSON.stringify(scene, null, 2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
