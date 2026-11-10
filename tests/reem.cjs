const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');const crypto=require('node:crypto');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const url=pathToFileURL(process.cwd()+'/reem/index.html').href;const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 page.on('requestfailed',r=>errors.push('failed to load '+r.url()));
 await page.goto(url);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 // The financier brief: market, the three problems, and the solution.
 const ids=['home','market','market-ad','problem','problem-brokerages','problem-brokers','problem-gap','solution'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/reem-'+ids[i]+'.png'});
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);
  const orphans=await page.locator('#'+ids[i]).evaluate(el=>[...el.querySelectorAll('p,h3,h2,h1')].filter(n=>!n.closest('aside.notes')&&n.getClientRects().length).filter(n=>{const text=n.firstChild&&n.childNodes.length===1&&n.firstChild.nodeType===3?n.firstChild:null;if(!text)return false;const value=text.textContent;const cut=value.trimEnd().lastIndexOf(' ');if(cut<1)return false;const top=(a,b)=>{const r=document.createRange();r.setStart(text,a);r.setEnd(text,b);return r.getClientRects()[0].top;};return top(cut+1,value.trimEnd().length)-top(cut-1,cut)>2;}).map(n=>n.textContent));
  assert.deepEqual(orphans,[],ids[i]+' single word on a last line');}
 assert.equal(await page.locator('#slideCount').textContent(),'08 / 08');
 assert(await page.evaluate(()=>document.fonts.check('500 48px Inter')),'Inter not loaded');
 assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'logo failed to load');
 assert.equal(await page.evaluate(()=>deck.getConfig().transition),'none');
 // Market: DLD's reported sales value, with 2021 and 2022 estimated from DLD transaction data.
 const sales=[71.7,148.6,262.7,410.2,521,680];
 assert.deepEqual(await page.locator('#market .bars .val').allTextContents(),sales.map(v=>'AED '+v+'B'));
 assert.deepEqual(await page.locator('#market .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','DLD DATA','DLD DATA','','','']);assert.match(await page.locator('#market .source').textContent(),/DLD data: 2021 and 2022 add up every sales registration in DLD transaction data/);assert(!/Atlas/.test(await page.evaluate(()=>document.querySelector('.slides').textContent)),'Atlas named in the deck');assert.match(await page.locator('#market .source').textContent(),/Annual Data Review 2025/);
 // Bar heights are proportional to the values, with the tallest at 85%.
 for(const id of ['market'])assert.deepEqual(await page.locator('#'+id+' .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),sales.map(v=>Math.round(v/sales[5]*850)/10));
 // Abu Dhabi: 2021 from ADREC's 2025 report, 2022 to 2025 from its H1 2026 report (two halves added), 2026 to date from ADREC transaction records.
 const ad=[15,26,52,53,94,136.7];
 assert.deepEqual(await page.locator('#market-ad .bars .val').allTextContents(),ad.map(v=>'AED '+Math.round(v)+'B'));
 assert.deepEqual(await page.locator('#market-ad .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),ad.map(v=>Math.round(v/ad[5]*850)/10));
 assert.equal(Math.round(ad[4]/ad[0]),6);assert.match(await page.locator('#market-ad .source').textContent(),/H1 2026 report, sum of half-year values/);assert.match(await page.locator('#market-ad h2').textContent(),/6× in four years/);
 assert.deepEqual(await page.locator('#market-ad .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','','','','','YTD']);
 // 2026 is the highlighted bar and the only year on the side cards.
 assert.deepEqual(await page.locator('#market-ad .bars li').evaluateAll(l=>l.map(e=>e.className)),['','','','','','now']);
 assert.equal(await page.locator('#market-ad .bar-side .lead strong').textContent(),'AED 137B');assert.equal(Math.round((ad[5]/ad[4]-1)*100),45);assert.match(await page.locator('#market-ad .bar-side').textContent(),/\+45%[\s\S]*83%/);
 // The problem follows one commission down the chain: developer, brokerage, broker, then the gap to fund.
 assert.deepEqual(await page.locator('[id^="problem"] .c-eyebrow').allTextContents(),['02The problem · Developers','02The problem · Brokerages','02The problem · Brokers','02The problem · The gap']);
 assert.deepEqual(await page.locator('[id^="problem"] .chain .node.on').allTextContents(),['Developer','Brokerage','Broker']);
 assert.match(await page.locator('#problem-brokers .months').textContent(),/About 2 months[\s\S]*2 to 3 months/);
 // The gap slide: today the brokerage waits months 3 and 4; with Aaronz those two months are one block Aaronz funds.
 assert.equal(await page.locator('#problem-gap h2').textContent(),'Aaronz fills the market gap');
 assert.equal(await page.locator('#problem-gap .gapcell').count(),1);assert.match(await page.locator('#problem-gap .fill').textContent(),/Finance partner funds about 2 months/);assert.match(await page.locator('#problem-gap .cell.end.us').textContent(),/Aaronz takes its fee from the funder/);assert.match(await page.locator('#problem-gap .pin-start').textContent(),/Aaronz pays the brokerage through the finance partner/);assert.match(await page.locator('#problem-gap .pin-end').textContent(),/Developer pays the money back to the finance partner/);
 // Both two-month blocks sit exactly under Month 3 to Month 4.
 const g=await page.evaluate(()=>{const q=s=>document.querySelector('#problem-gap '+s).getBoundingClientRect();const m=[...document.querySelectorAll('#problem-gap .cal-months span')].map(e=>e.getBoundingClientRect());return {m3:m[3].left,m4:m[4].right,fill:q('.fill'),gap:q('.gapcell'),fit:q('.fit'),start:q('.pin-start'),end:q('.pin-end')};});
 assert(Math.abs(g.start.left-g.m3)<2&&Math.abs(g.end.right-g.m4)<2,'start and end pins not at the start of month 3 and the end of month 4');
 for(const b of [g.fill,g.gap,g.fit])assert(Math.abs(b.left-g.m3)<2&&Math.abs(b.right-g.m4)<2,'gap block not under months 3 and 4');
 assert.match(await page.locator('#problem-gap .inv-call').textContent(),/Aaronz pays the brokerage through a finance partner, and the developer repays the partner/);
 // Solution: the worked example adds up (AED 100,000, 45 days, 18% split 12% to the partner and 6% to Aaronz).
 const charge=r=>Math.round(100000*r*45/365*100)/100;assert.equal(charge(.18),2219.18);assert.equal(charge(.12),1479.45);assert.equal(charge(.06),739.73);
 assert.deepEqual(await page.locator('#solution .amt').allTextContents(),['AED 97,780.82','AED 1,479.45','AED 739.73']);
 assert.equal(await page.locator('#commission,#allocation').count(),0,'removed slides are back');
 assert.equal(await page.locator('#market h2').textContent(),'Dubai property sales grew 10× in five years');
 // The deck goes to more than one party, so it names no recipient anywhere a viewer can see.
 assert(!/reem/i.test(await page.evaluate(()=>document.title+document.querySelector('meta[name=description]').content+document.body.innerText+document.getElementById('deckPdf').getAttribute('href'))),'recipient named in the deck');
 const text=await page.evaluate(()=>document.querySelector('.slides').textContent);
 assert(!/automatically/i.test(text),'banned word in the deck');assert(!/channel connect|mawarid/i.test(text),'third party named');
 const sheet=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,8);
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="reem.css"]').getAttribute('href')),'reem.css?v='+sheet('reem/reem.css'),'update the ?v= hash on reem.css in reem/index.html');
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="../investor/investor.css"]').getAttribute('href')),'../investor/investor.css?v='+sheet('investor/investor.css'),'update the ?v= hash on investor.css in reem/index.html');
 assert(fs.statSync('reem/aaronz-commission-finance.pdf').size>100000,'PDF missing');
 await page.click('#viewToggle');assert(await page.evaluate(()=>document.body.classList.contains('reader')));await page.click('#viewToggle');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Reem deck mobile overflow');await mobile.screenshot({path:'.build/reem-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: Reem deck, eight slide layouts, market figures, problem slides, worked example, PDF and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
