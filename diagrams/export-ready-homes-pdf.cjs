// Builds diagrams/aaronz-ready-homes-flows.pdf: the manual flow and the advanced flow for ready-home commissions, one per landscape A4 page.
// Re-render the two PNGs first (see the create-ready-homes-*.cjs scripts), then run: node diagrams/export-ready-homes-pdf.cjs
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const img = name => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, name)).toString('base64');
const page = (n, label, title, lead, file, extra = '') => `<section>
<header><span class="brand">Aaronz<b>Pay</b></span><span>Ready homes commission &middot; Flow ${n} of 2</span></header>
<p class="label">${label}</p><h1>${title}</h1><p class="lead">${lead}</p>
<img src="${img(file)}" alt="${title}">${extra}
<footer>Internal working draft, 27 November 2026. Figures and stages are to be confirmed.</footer></section>`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>AaronzPay: ready homes commission flows</title><style>
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box}body{margin:0;font-family:Helvetica,Arial,sans-serif;color:#243d33}
section{width:297mm;height:210mm;padding:12mm 14mm 10mm;display:flex;flex-direction:column;page-break-after:always;position:relative}
section:last-child{page-break-after:auto}
header{display:flex;justify-content:space-between;font-size:9pt;color:#68766d;border-bottom:.3mm solid #d5dbd7;padding-bottom:3mm}
.brand{font-weight:700;color:#243d33;font-size:11pt}.brand b{color:#276749}
.label{margin:4mm 0 0;font-size:9pt;letter-spacing:.12em;text-transform:uppercase;color:#68766d}
h1{margin:1.5mm 0 0;font-size:22pt;font-weight:600;letter-spacing:-.01em}
.lead{margin:2mm 0 4mm;font-size:10.5pt;color:#4a5a51}
img{width:100%;border:.3mm solid #d5dbd7;border-radius:2mm}
ol{margin:3.5mm 0 0;padding-left:5mm;columns:2;column-gap:12mm;font-size:9pt;line-height:1.38}
li{break-inside:avoid;margin-bottom:1mm}
footer{position:absolute;left:14mm;right:14mm;bottom:7mm;font-size:8pt;color:#68766d}
</style></head><body>
${page(1, 'Flow 1', 'Manual flow', 'The broker hands the buyer\'s 2% commission cheque to AaronzPay, which holds it until transfer day and pays the commission in four stages. Both cheques are written in the finance partner\'s name.', 'aaronz-ready-homes-process.png')}
${page(2, 'Flow 2 &middot; Recommended', 'Advanced flow: the cheque never leaves the broker', 'Same four payouts. Documents are uploaded and checked by AI, so the 2% cheque is never picked up or delivered. The broker visits AaronzPay once, at the end.', 'aaronz-ready-homes-ai-flow.png', `<ol>
<li><b>Onboarding, once per brokerage.</b> The brokerage signs the AaronzPay agreement online and gives one security cheque or a direct debit mandate.</li>
<li><b>MOU signed.</b> The buyer gives two non-cashable cheques, 8% deposit and 2% commission, the 2% one in the finance partner's name. Both stay with the broker.</li>
<li><b>Upload.</b> The broker uploads a photo of the 2% cheque and the signed MOU, and signs an undertaking to hold the cheque for AaronzPay.</li>
<li><b>AI check and first payout.</b> AI checks the amount, that the payee is the finance partner, and the names against the MOU and KYC. 50% is paid.</li>
<li><b>Milestones.</b> 15% on the bank's final offer letter and 15% on the transfer booking, each uploaded and checked.</li>
<li><b>Transfer day.</b> Buyer and broker swap cheques as they do today. The broker then brings the manager's cheque, written in the finance partner's name, to AaronzPay in person and is paid the last 20%.</li>
</ol>`)}
</body></html>`;
(async () => {
  const browser = await chromium.launch();
  try {
    const p = await browser.newPage();
    await p.setContent(html, {waitUntil: 'load'});
    const out = path.join(__dirname, 'aaronz-ready-homes-flows.pdf');
    await p.pdf({path: out, format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true});
    await p.setViewportSize({width: 1123, height: 794});
    const overflow = await p.evaluate(() => [...document.querySelectorAll('section')].map(s => { const f = s.querySelector('footer').getBoundingClientRect().top; return [...s.children].filter(c => c.tagName !== 'FOOTER' && c.getBoundingClientRect().bottom > f).map(c => c.tagName); }));
    if (overflow.some(o => o.length)) throw new Error('content runs into the footer: ' + JSON.stringify(overflow));
    console.log('Wrote ' + out);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
