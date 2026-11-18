// Builds brief-draft/index.html: the financier brief plus the draft slides in brief-draft/slides.html, after the money flow.
// The brief stays the source for every other slide, so re-run this (npm run export:brief-draft) after any brief change.
const fs=require('node:fs');const crypto=require('node:crypto');const path=require('node:path');
const root=path.join(__dirname,'..');
function build(){
 let html=fs.readFileSync(path.join(root,'brief/index.html'),'utf8');
 const slides=fs.readFileSync(path.join(root,'brief-draft/slides.html'),'utf8').replace(/^<!--[\s\S]*?-->\n/,'').trim();
 const conf=html.match(/<p class="conf">[\s\S]*?<\/p>/)[0];
 const cssHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'brief-draft/draft.css'))).digest('hex').slice(0,8);
 const once=(from,to)=>{const n=typeof from==='string'?html.split(from).length-1:(html.match(new RegExp(from.source,'g'))||[]).length;if(n!==1)throw new Error('expected one match for '+from+', found '+n);html=html.replace(from,()=>to);};
 once(/<title>[^<]*<\/title>/,'<title>AaronzPay · Commission finance · Draft</title>');
 const v=(html.match(/href="brief\.css\?v=([0-9a-f]+)">/)||[])[1];if(!v)throw new Error('brief.css link not found');
 once('href="brief.css?v='+v+'">','href="../brief/brief.css?v='+v+'"><link rel="stylesheet" href="draft.css?v='+cssHash+'">');
 once('<script src="settings.js"></script>','<script src="../brief/settings.js"></script>');
 once('aria-label="AaronzPay">Aaronz<span class="wm-pay">Pay</span></span></a>','aria-label="AaronzPay">Aaronz<span class="wm-pay">Pay</span></span><span class="draft-tag">Draft</span></a>');
 once('<a href="#/break-model">Money flow</a>','<a href="#/break-model">Money flow</a><a href="#/break-pricing">Pricing</a><a href="#/break-credit">Credit risk</a>');
 once('href="aaronz-commission-finance.pdf"','href="aaronz-commission-finance-draft.pdf"');
 once('\n\n</div></div><footer','\n\n'+slides.replace(/<!--conf-->/g,conf)+'\n\n</div></div><footer');
 const total=(html.match(/<section id=/g)||[]).length;
 html=html.replace(/<span id="slideCount">01 \/ \d+<\/span>/,'<span id="slideCount">01 / '+total+'</span>');
 return html;
}
module.exports={build};
if(require.main===module){fs.writeFileSync(path.join(root,'brief-draft/index.html'),build());console.log('Wrote brief-draft/index.html');}
