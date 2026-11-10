const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');const crypto=require('node:crypto');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const url=pathToFileURL(process.cwd()+'/brief/index.html').href;const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 page.on('requestfailed',r=>errors.push('failed to load '+r.url()));
 await page.goto(url);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 // The financier brief: market, the three problems, and the solution.
 const ids=['home','break-market','market','market-ad','market-rak','problem','problem-brokerages','problem-brokers','problem-gap','solution'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/brief-'+ids[i]+'.png'});
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);
  const orphans=await page.locator('#'+ids[i]).evaluate(el=>[...el.querySelectorAll('p,h3,h2,h1')].filter(n=>!n.closest('aside.notes')&&n.getClientRects().length).filter(n=>{const text=n.firstChild&&n.childNodes.length===1&&n.firstChild.nodeType===3?n.firstChild:null;if(!text)return false;const value=text.textContent;const cut=value.trimEnd().lastIndexOf(' ');if(cut<1)return false;const top=(a,b)=>{const r=document.createRange();r.setStart(text,a);r.setEnd(text,b);return r.getClientRects()[0].top;};return top(cut+1,value.trimEnd().length)-top(cut-1,cut)>2;}).map(n=>n.textContent));
  assert.deepEqual(orphans,[],ids[i]+' single word on a last line');}
 assert.equal(await page.locator('#slideCount').textContent(),'10 / 10');
 assert(await page.evaluate(()=>document.fonts.check('500 48px Inter')),'Inter not loaded');
 assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'logo failed to load');
 assert.equal(await page.evaluate(()=>deck.getConfig().transition),'none');
 // Market: DLD's reported sales value, with 2021 and 2022 estimated from DLD transaction data.
 const sales=[71.7,148.6,262.7,410.2,521,680];
 assert.deepEqual(await page.locator('#market .bars .val').allTextContents(),[...sales.map(v=>'AED '+v+'B'),'AED 423.4B']);
 // 2026: DLD data to date, plus an empty box for the amount still needed to match 2025 (labelled as a gap, not a forecast).
 assert.equal(Math.round(680-423.4),257);assert.match(await page.locator('#market .bar.fc').textContent(),/To match 2025AED 257B/);assert(!/forecast/i.test(await page.locator('#market .bars').textContent()));assert.match(await page.locator('#market .source').textContent(),/not a forecast/);
 assert.deepEqual(await page.locator('#market .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','','','','','','YTD']);assert.match(await page.locator('#market .source').textContent(),/2021 and 2022 add up every sales registration in DLD transaction data/);assert(!/Atlas/.test(await page.evaluate(()=>document.querySelector('.slides').textContent)),'Atlas named in the deck');assert.match(await page.locator('#market .source').textContent(),/Annual Data Review 2025/);
 // Bar heights are proportional to the values, with the tallest at 85%.
 assert.deepEqual(await page.locator('#market .bar:not(.fc)').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),[...sales,423.4].map(v=>Math.round(v/sales[5]*850)/10));assert.equal(parseFloat(await page.locator('#market .bar.fc').evaluate(e=>e.style.height)),Math.round(256.6/680*850)/10);
 // Abu Dhabi: 2020 and 2021 from ADREC's 2025 report, 2022 to 2025 from its H1 2026 report (two halves added), 2026 to date from ADREC transaction records.
 const ad=[38,15,26,52,53,94,136.7];
 assert.deepEqual(await page.locator('#market-ad .bars .val').allTextContents(),ad.map(v=>'AED '+Math.round(v)+'B'));
 assert.deepEqual(await page.locator('#market-ad .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),ad.map(v=>Math.round(v/ad[6]*850)/10));
 assert.match(await page.locator('#market-ad .source').textContent(),/H1 2026 report, sum of half-year values/);assert.equal(await page.locator('#market-ad h2').textContent(),'Abu Dhabi property sales are rising sharply');
 assert.deepEqual(await page.locator('#market-ad .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','','','','','','YTD']);
 // 2026 is the highlighted bar and the only year on the side cards.
 assert.deepEqual(await page.locator('#market-ad .bars li').evaluateAll(l=>l.map(e=>e.className)),['','','','','','','now']);
 assert.equal(await page.locator('#market-ad .bar-side .lead strong').textContent(),'AED 137B');assert.equal(Math.round((ad[6]/ad[5]-1)*100),45);assert.match(await page.locator('#market-ad .bar-side').textContent(),/\+45%[\s\S]*83%/);
 // RAK: completed property sales, 2020 to 2026 (January to September); off-plan is reported separately and left out.
 const rak=[1001412200,1738994965,2184141723,3482718683,6438983837,3192316419,2123794299].map(v=>v/1e9);
 assert.deepEqual(await page.locator('#market-rak .bars .val').allTextContents(),rak.map(v=>'AED '+v.toFixed(1)+'B'));
 assert.deepEqual(await page.locator('#market-rak .bar:not(.fc)').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),rak.map(v=>Math.round(v/rak[4]*850)/10));
 assert(rak[5]/rak[0]>3,'more than tripled');assert.equal(await page.locator('#market-rak h2').textContent(),'RAK completed sales have more than tripled since 2020');
 assert.equal((1077030/1e6).toFixed(2),'1.08');assert.equal((563541/1e6).toFixed(2),'0.56');
 assert.deepEqual(await page.locator('#market-rak .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','','','','','','JAN–SEP']);
 // The 2024 anomaly is labelled on its bar; 2026 carries an empty box for the gap to 2025, as on Dubai.
 assert.equal(await page.locator('#market-rak .bar .in').textContent(),'Includes AED 2.65B of tourism land');
 assert.equal((rak[5]-rak[6]).toFixed(1),'1.1');assert.match(await page.locator('#market-rak .bar.fc').textContent(),/To match 2025AED 1.1B/);assert.equal(await page.locator('#market-rak .bar.fc').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)','gap box must stay empty');
 for(const id of ['market','market-rak'])assert.equal(await page.locator('#'+id+' .bar.fc').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)',id+' gap box must stay empty');assert.equal(await page.locator('#market-rak .bar.fc').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)','gap box must stay empty');
 assert.equal(parseFloat(await page.locator('#market-rak .bar.fc').evaluate(e=>e.style.height)),Math.round((rak[5]-rak[6])/rak[4]*850)/10);
 // 2026 is the highlighted bar and leads the side cards.
 assert.deepEqual(await page.locator('#market-rak .bars li').evaluateAll(l=>l.map(e=>e.className)),['','','','','','','now']);assert.equal(Math.round(rak[6]/rak[5]*100),67);assert.match(await page.locator('#market-rak .bar-side').textContent(),/67%/);assert.equal(await page.locator('#market-rak .bar-side .lead strong').textContent(),'AED 2.1B');
 assert.match(await page.locator('#market-rak .source').textContent(),/completed property sales; off-plan sales are reported separately and not included/);
 // The problem follows one commission down the chain: developer, brokerage, broker, then the gap to fund.
 assert.deepEqual(await page.locator('[id^="problem"] .c-eyebrow').allTextContents(),['02The problem · Developers','02The problem · Brokerages','02The problem · Brokers','02The problem · The gap']);
 assert.deepEqual(await page.locator('[id^="problem"] .chain .node.on').allTextContents(),['Developer','Brokerage','Broker']);
 assert.match(await page.locator('#problem-brokers .months').textContent(),/About 2 months[\s\S]*2 to 3 months/);
 assert.deepEqual(await page.locator('#problem-brokers .ticks li').allTextContents(),['Month 1Engages the lead','Month 2Closes the deal','Month 3Completes registration','Month 4Waits for payment','Month 5Receives the commission']);
 // The gap slide: today the brokerage waits months 3 and 4; with Aaronz those two months are one block Aaronz funds.
 assert.equal(await page.locator('#problem-gap h2').textContent(),'Aaronz fills the market gap');
 // The gap: today's wait is the full five-month line; with Aaronz it ends at closing, 40% of that length.
 await page.evaluate(()=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id==='problem-gap')));await page.waitForTimeout(200);
 const w=await page.evaluate(()=>[...document.querySelectorAll('#problem-gap .gap-wait .wait-track')].map(e=>e.getBoundingClientRect().width));
 assert.equal(w.length,2);assert(Math.abs(w[1]/w[0]-0.4)<0.01,'Aaronz line is not 40% of today: '+w);
 assert.match(await page.locator('#problem-gap .gap-wait').textContent(),/Up to 5 months[\s\S]*About 2 months[\s\S]*Paid at closing/);
 // One thin line per row with its breakpoints, no filler boxes, and the lines stay slim.
 assert.deepEqual(await page.locator('#problem-gap .gap-wait .bp b').allTextContents(),['Work starts','Deal closes','Paid','Work starts','Paid at closing']);assert.equal(await page.locator('#problem-gap .saved,#problem-gap .seg').count(),0);
 assert(await page.locator('#problem-gap .gap-wait .wait-track').first().evaluate(e=>e.getBoundingClientRect().height)<=16,'gap lines too tall');
 assert.match(await page.locator('#problem-gap .inv-call').textContent(),/Aaronz pays the brokerage through a finance partner, and the developer repays the partner/);
 // Solution: benefits for each audience in words, with no pricing or worked example.
 assert.deepEqual(await page.locator('#solution .benefits .c-tag').allTextContents(),['Developers','Brokerages','Brokers']);
 assert.equal(await page.locator('#solution .inv-time').count(),0,'the gap slide already shows the timeline');
 assert(!/%|AED/.test(await page.locator('#solution').evaluate(e=>{const c=e.cloneNode(true);c.querySelector('aside.notes')?.remove();return c.textContent;})),'pricing shown on the solution slide');
 assert.equal(await page.locator('#commission,#allocation').count(),0,'removed slides are back');
 // The cover is the title alone, then a section break introduces the market.
 assert.equal(await page.locator('#home .c-lede').count(),0);assert.equal(await page.locator('#break-market h2').textContent(),'The market');
 assert.equal(await page.locator('#market h2').textContent(),'Dubai property sales grew 10× in five years');
 // The deck goes to more than one party, so it names no recipient anywhere a viewer can see.
 assert(!/reem/i.test(await page.evaluate(()=>document.title+document.querySelector('meta[name=description]').content+document.body.innerText+document.getElementById('deckPdf').getAttribute('href'))),'recipient named in the deck');
 const text=await page.evaluate(()=>document.querySelector('.slides').textContent);
 assert(!/automatically/i.test(text),'banned word in the deck');assert(!/channel connect|mawarid/i.test(text),'third party named');
 const sheet=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,8);
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="brief.css"]').getAttribute('href')),'brief.css?v='+sheet('brief/brief.css'),'update the ?v= hash on brief.css in brief/index.html');
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="../investor/investor.css"]').getAttribute('href')),'../investor/investor.css?v='+sheet('investor/investor.css'),'update the ?v= hash on investor.css in brief/index.html');
 assert(fs.statSync('brief/aaronz-commission-finance.pdf').size>100000,'PDF missing');
 await page.click('#viewToggle');assert(await page.evaluate(()=>document.body.classList.contains('reader')));await page.click('#viewToggle');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 for(const id of ['market','market-ad','market-rak'])assert(await mobile.evaluate(id=>[...document.querySelectorAll('#'+id+' .bars li')].every(l=>l.getBoundingClientRect().right<=innerWidth+1),id),id+' chart wider than the phone screen');
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'brief deck mobile overflow');await mobile.screenshot({path:'.build/brief-mobile.png',fullPage:true});
 // The old /reem/ address forwards to /brief/, keeping the slide.
 const old=await browser.newPage();await old.goto(pathToFileURL(process.cwd()+'/reem/index.html').href+'#/market-ad');await old.waitForURL(/\/brief\/index\.html#\/market-ad$/);await old.close();
 assert.deepEqual(errors,[]);console.log('Passed: financier brief deck, ten slide layouts, market figures, problem slides, solution benefits, old-address redirect, PDF and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
