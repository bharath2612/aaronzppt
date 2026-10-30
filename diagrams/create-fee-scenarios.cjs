// Native, editable Excalidraw elements. Render with the official @excalidraw/cli.
// Fee scenarios per AED 100K advanced: developer payment duration sets our annual rate.
const fs = require('node:fs');
const path = require('node:path');
const elements = [];
let serial = 0;
const ink = '#243d33', green = '#276749', blue = '#426a96', red = '#b4472e', muted = '#68766d';
function base(type, x, y, width, height, extra = {}) {
  const id = `fees-${++serial}`;
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
function box(label, x, y, w, h, color, fill, size = 26) {
  const el = base('rectangle', x, y, w, h, {strokeColor:color, backgroundColor:fill, roundness:{type:3}});
  const n = label.split('\n').length;
  text(label, x+16, y+(h-n*size*1.3)/2, w-32, size, color, 'center', el);
  return el;
}
function down(a, b, color) {
  const x = a.x+a.width/2;
  const el = base('arrow', x, a.y+a.height+6, 0, b.y-a.y-a.height-14, {
    points:[[0,0],[0,b.y-a.y-a.height-14]], strokeColor:color, strokeWidth:2, roughness:0,
    startBinding:{elementId:a.id,focus:0,gap:6}, endBinding:{elementId:b.id,focus:0,gap:8},
    startArrowhead:null, endArrowhead:'arrow', elbowed:false});
  a.boundElements.push({id:el.id,type:'arrow'}); b.boundElements.push({id:el.id,type:'arrow'});
}

const advance = 100000, bankRate = 12, basis = 360;
const scenarios = [{days:30, rate:18}, {days:60, rate:15}, {days:90, rate:12}];
const aed = n => 'AED ' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
const pct = n => Number(n.toFixed(4)) + '%';

text('Aaronz / What we earn per AED 100K, by developer payment duration', 40, 25, 1900, 46);
text(`Fee = our annual rate × days ÷ ${basis}. Bank cost = ${bankRate}% a year × days ÷ ${basis}. 100% of the commission advanced; no extra bank charges.`, 40, 95, 1900, 24, muted);

scenarios.forEach(({days, rate}, i) => {
  const x = 60 + i*640, w = 560;
  const fee = rate*days/basis, earn = advance*fee/100, bank = advance*bankRate/100*days/basis, left = earn-bank;
  const head = box(`${days} DAYS\nDeveloper pays in ${days/30} month${days > 30 ? 's' : ''}`, x, 180, w, 120, ink, '#ffffff', 30);
  head.strokeWidth = 3;
  const r = box(`Our annual rate\n${rate}%  (${pct(rate/12)} a month)`, x, 350, w, 110, blue, '#edf3fa');
  const f = box(`Fee we charge\n${pct(fee)} of the advance`, x, 510, w, 110, blue, '#edf3fa');
  const e = box(`We earn per AED 100K\n${aed(earn)}`, x, 670, w, 120, green, '#e8f1e8', 28);
  const b = box(`We pay the bank\n${aed(bank)}`, x, 840, w, 120, red, '#fbeeea', 28);
  const l = box(`LEFT FOR US\n${aed(left)}`, x, 1010, w, 140, green, '#cfe5cf', 34);
  l.strokeWidth = 3;
  down(head, r, ink); down(r, f, blue); down(f, e, green); down(e, b, red); down(b, l, green);
  text(`${(left/earn*100).toFixed(1)}% of the fee is ours`, x, 1165, w, 22, muted, 'center');
});

text('Before operating costs, credit losses and taxes. Bank rate of 12% a year is an assumption, not a quote.', 40, 1225, 1900, 22, muted);

const scene = {type:'excalidraw', version:2, source:'https://excalidraw.com', elements,
  appState:{viewBackgroundColor:'#ffffff', gridSize:null, exportBackground:true, exportWithDarkMode:false}, files:{}};
const out = path.join(__dirname, 'aaronz-fee-scenarios.excalidraw');
fs.writeFileSync(out, JSON.stringify(scene, null, 2)+'\n');
console.log(`Created ${out}: ${elements.length} editable elements`);
