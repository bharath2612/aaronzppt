// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
// One commission product, two sources: off-plan (developer repays) and ready homes (financed against the buyer's 2% commission cheque).
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', blue = '#426a96', orange = '#b4472e', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `ready-${++serial}`;
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
function lane(title, note, y, steps) {
  text(title, 40, y, 1400, 34, ink);
  text(note, 40, y+46, 2300, 22, muted);
  const w = 340, gap = 64, top = y+100, h = 170;
  const boxes = steps.map(([who, what, kind], i) => {
    const color = kind === 'us' ? green : kind === 'new' ? orange : ink;
    const fill = kind === 'us' ? '#e8f1e8' : kind === 'new' ? '#fbeeea' : '#ffffff';
    return box(`${i+1}  ${who.toUpperCase()}\n${what}`, 40 + i*(w+gap), top, w, h, color, fill);
  });
  boxes.slice(1).forEach((b, i) => arrow(boxes[i], b, ink));
  return boxes;
}

text('AaronzPay: one commission product, off-plan and ready homes', 40, 25, 2300, 46);
text('Same middle steps. Ready homes change who starts the deal and where the repayment comes from (orange).', 40, 95, 2300, 24, muted);

lane('OFF-PLAN  (today)', 'The developer owes the commission. Repaid about 50 days after registration.', 170, [
  ['Developer', 'Marks the broker eligible\non registration'],
  ['Brokerage', 'Chooses payment terms\nand raises the invoice'],
  ['AaronzPay', 'Approves\nand routes', 'us'],
  ['Finance partner', 'Pays the commission\nto the brokerage'],
  ['Developer', 'Repays the\nfinance partner'],
  ['Finance partner', 'Settles and pays\nAaronzPay its fee', 'us'],
]);

const ready = lane('READY HOMES  (new)', 'The buyer owes the commission. Financed against the 2% commission cheque, repaid on transfer day.', 560, [
  ['Buyer', 'Signs the MOU and\ngives two cheques', 'new'],
  ['Brokerage', 'Chooses payment terms\nand raises the invoice'],
  ['AaronzPay', 'Holds the 2% cheque\nand approves', 'new'],
  ['Finance partner', 'Pays the commission\nto the brokerage'],
  ['Brokerage', 'Cashes the 2% cheque on\ntransfer day and repays', 'new'],
  ['Finance partner', 'Settles and pays\nAaronzPay its fee', 'us'],
]);

// Detail under the ready-homes lane.
const cheques = box('AT THE MOU: THE 10% DEPOSIT AS TWO CHEQUES\n8% deposit\n2% commission, made out to the brokerage\nThe commission cheque cannot be taken back,\neven if the deal falls through', 40, 920, 744, 230, orange, '#ffffff', 22);
arrow(ready[0], cheques, orange, true);
const types = box('CASH, MORTGAGE OR BOTH\nAll financed at the MOU\nMOU to transfer: cash about 2 to 4 weeks,\nmortgage about 6 to 8 weeks', 848, 920, 744, 230, blue, '#edf3fa', 22);
const repay = box('REPAYMENT\nOn transfer day the brokerage cashes\nthe 2% cheque and repays the finance partner,\nwhich then pays AaronzPay its fee', 1656, 920, 744, 230, green, '#ffffff', 22);
arrow(ready[4], repay, green, true);

text('Draft for discussion. Pricing and credit risk for ready homes are not yet decided.', 40, 1190, 2300, 22, muted);

const scene = {type:'excalidraw', version:2, source:'https://excalidraw.com', elements,
  appState:{viewBackgroundColor:'#ffffff', gridSize:null, exportBackground:true, exportWithDarkMode:false}, files:{}};
const out = path.join(__dirname, 'aaronz-ready-homes-flow.excalidraw');
fs.writeFileSync(out, JSON.stringify(scene, null, 2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
