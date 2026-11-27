// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
// Ready homes, AI-native flow: the 2% cheque stays with the broker, documents are uploaded and checked, payouts are staged.
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', blue = '#426a96', orange = '#b4472e', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `readyai-${++serial}`;
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

const W = 340, GAP = 64, X0 = 40, col = i => X0 + i*(W+GAP);

text('Ready homes: AI-native flow (recommended)', 40, 25, 2360, 44);
text('The 2% cheque never leaves the broker. AI checks the documents, and the broker visits AaronzPay once, with the manager\'s cheque.', 40, 92, 2360, 24, muted);

const steps = [
  ['1  MOU (FORM F) SIGNED\nBuyer gives two non-cashable\ncheques: 8% deposit and\n2% commission, written to\nthe finance partner', ink, '#ffffff'],
  ['2  BROKER UPLOADS\nA photo of the 2% cheque\nand the signed MOU.\nSigns an undertaking online', blue, '#edf3fa'],
  ['3  AI CHECKS, PAYOUT 1\nAmount, payee and names\nmatch the MOU and KYC.\n50% of the commission', green, '#e8f1e8'],
  ['4  PAYOUT 2\n15% when the bank\'s final\noffer letter is uploaded\nand checked', green, '#e8f1e8'],
  ['5  PAYOUT 3\n15% when the transfer\nbooking is uploaded\nand checked', green, '#e8f1e8'],
  ['6  TRANSFER DAY\nBuyer and broker swap\ncheques, as today. Broker\nbrings the manager\'s cheque\nto AaronzPay. Last 20% paid', green, '#e8f1e8'],
].map(([label, color, fill], i) => box(label, col(i), 170, W, 210, color, fill, 22));
steps.slice(1).forEach((b, i) => arrow(steps[i], b, ink));

// Where the 2% cheque physically is.
text('WHERE THE 2% CHEQUE IS', 40, 430, 800, 22, muted);
const c1 = box('With the broker, from the MOU until transfer day. No pickup, no delivery', col(0), 470, 5*W+4*GAP, 80, green, '#e8f1e8', 22);
const c2 = box('Broker hands it back\nto the buyer, as today', col(5), 470, W, 80, green, '#e8f1e8', 22);
arrow(c1, c2, green);

const bw = 744;
box('ONCE PER BROKERAGE, AT ONBOARDING\nSigns the AaronzPay agreement online\nGives one security cheque or a direct debit mandate\nDone once, not repeated\nfor each deal', 40, 620, bw, 240, ink, '#ffffff', 22);
box('WHAT AI DOES\nReads the cheque photo and the MOU\nChecks the amount is 2% of the price\nChecks the payee is the finance partner\nChecks names against the MOU and KYC\nChecks each milestone document before a payout', 848, 620, bw, 240, blue, '#edf3fa', 22);
box('WHAT CHANGES FOR EACH PARTY\nBuyer: two cheques in place of one\nBroker: uploads from a phone, one visit at the end\nAaronzPay: no pickup or delivery of the 2% cheque\nTransfer day: the same swap as today', 1656, 620, bw, 240, green, '#ffffff', 22);

text('Both the non-cashable 2% cheque and the manager\'s cheque are written in the finance partner\'s name. Trade-off: without the cheque in hand, AaronzPay relies on the brokerage\'s undertaking and its security.', 40, 900, 2360, 22, muted);

const scene = {type:'excalidraw', version:2, source:'https://excalidraw.com', elements,
  appState:{viewBackgroundColor:'#ffffff', gridSize:null, exportBackground:true, exportWithDarkMode:false}, files:{}};
const out = path.join(__dirname, 'aaronz-ready-homes-ai-flow.excalidraw');
fs.writeFileSync(out, JSON.stringify(scene, null, 2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
