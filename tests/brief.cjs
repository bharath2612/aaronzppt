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
 // The financier brief: market, commissions, the three problems, the solution and the outcome.
 const ids=['home','break-market','market','market-ad','market-sharjah','market-rak','break-commission','commission','problem','problem-brokers','problem-brokerages','problem-developers','break-solution','problem-gap','break-outcome','outcome','break-model','business-model'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/brief-'+ids[i]+'.png'});
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);
  const orphans=await page.locator('#'+ids[i]).evaluate(el=>[...el.querySelectorAll('p,h3,h2,h1')].filter(n=>!n.closest('aside.notes')&&n.getClientRects().length).filter(n=>{const text=n.firstChild&&n.childNodes.length===1&&n.firstChild.nodeType===3?n.firstChild:null;if(!text)return false;const value=text.textContent;const cut=value.trimEnd().lastIndexOf(' ');if(cut<1)return false;const top=(a,b)=>{const r=document.createRange();r.setStart(text,a);r.setEnd(text,b);return r.getClientRects()[0].top;};return top(cut+1,value.trimEnd().length)-top(cut-1,cut)>2;}).map(n=>n.textContent));
  assert.deepEqual(orphans,[],ids[i]+' single word on a last line');}
 assert.equal(await page.locator('#slideCount').textContent(),'18 / 18');
 assert(await page.evaluate(()=>document.fonts.check('500 48px Inter')),'Inter not loaded');
 assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'logo failed to load');
 assert.equal(await page.evaluate(()=>deck.getConfig().transition),'none');
 // Market: DLD's reported sales value, with 2021 and 2022 estimated from DLD transaction data; 2026 shown only to the date the data runs to.
 const sales=[71.7,148.6,262.7,410.2,521,680],ad=[38,15,26,52,53,94,136.7];
 const rak=[1001412200,1738994965,2184141723,3482718683,6438983837,3192316419,2123794299].map(v=>v/1e9);
 assert.deepEqual(await page.locator('#market .bars .val').allTextContents(),sales.map(v=>'AED '+v+'B'));
 assert.deepEqual(await page.locator('#market .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),[...sales,423.4].map(v=>Math.round(v/sales[5]*850)/10));
 assert.equal(await page.locator('#market .bar .in').textContent(),'Till 10 NovAED 423.4B');assert.match(await page.locator('#market .source').textContent(),/2021 and 2022 are estimated from DLD transaction data\. 2026 runs to 10 November\./);
 assert.deepEqual(await page.locator('#market-ad .bars .val').allTextContents(),ad.slice(0,-1).map(v=>'AED '+Math.round(v)+'B'));
 assert.deepEqual(await page.locator('#market-ad .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),ad.map(v=>Math.round(v/ad[6]*850)/10));
 assert.equal(await page.locator('#market-ad .bar .in').textContent(),'Till 9 NovAED 137B');assert.match(await page.locator('#market-ad .source').textContent(),/H1 2026 report, sum of half-year values/);assert.equal(await page.locator('#market-ad h2').textContent(),'Abu Dhabi property sales are rising sharply');
 assert.equal(await page.locator('#market-ad .bar-side .lead strong').textContent(),'AED 94B');
 assert.deepEqual(await page.locator('#market-rak .bars .val').allTextContents(),rak.slice(0,-1).map(v=>'AED '+v.toFixed(1)+'B'));
 assert.deepEqual(await page.locator('#market-rak .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),rak.map(v=>Math.round(v/rak[4]*850)/10));
 assert(rak[5]/rak[0]>3,'more than tripled');assert.equal(await page.locator('#market-rak h2').textContent(),'RAK completed sales have more than tripled since 2020');
 assert.deepEqual(await page.locator('#market-rak .bar .in').allTextContents(),['Includes AED 2.65B of tourism land','Till SepAED 2.1B']);
 assert.equal(await page.locator('#market-rak .bar-side .lead strong').textContent(),'AED 3.2B');
 assert.match(await page.locator('#market-rak .source').textContent(),/completed property sales; off-plan sales are reported separately and not included[\s\S]*2026 runs January to September/);
 // All three side cards follow one pattern: 2025 sales value, number of sales, and off-plan share by number of sales.
 assert.deepEqual(await page.evaluate(()=>['market','market-ad','market-rak'].map(id=>[...document.querySelectorAll('#'+id+' .bar-side strong')].map(e=>e.textContent))),[['AED 680B','217,889','63%'],['AED 94B','25,114','66%'],['AED 3.2B','8,599','66%']]);
 assert.deepEqual([134688/215116,16697/25114].map(v=>Math.round(v*100)),[63,66]);assert.equal(Math.round(5635/(2964+5635)*100),66);
 for(const id of ['market','market-ad'])assert.match(await page.locator('#'+id+' .bar-side').textContent(),/2025 sales were off.plan$/);assert.match(await page.locator('#market-rak .bar-side').textContent(),/8,599sales in 2025[\s\S]*2025 sales were off.plan$/);
 // Sharjah: 2020 completed only, 2021 to 2024 completed plus off-plan, 2025 and 2026 total transactions (asterisked); 2025 highlighted.
 const shj=[4.95710169,10.419899866+3.6,8.821491836+4.2,11.122070433+7.337288466,16.448879975+11.98907533,65.6,46.5];
 assert.deepEqual(await page.locator('#market-sharjah .bars .val').allTextContents(),['AED 5.0B*','AED 14.0B','AED 13.0B','AED 18.5B','AED 28.4B','AED 65.6B*']);
 assert.deepEqual(await page.locator('#market-sharjah .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),shj.map(v=>Math.round(v/65.6*850)/10));
 assert.deepEqual(await page.locator('#market-sharjah .bar .in').allTextContents(),['Includes mortgages and others','Till SepAED 46.5B*']);
 assert(shj[4]/shj[1]>=2,'doubled');assert.equal(await page.locator('#market-sharjah h2').textContent(),'Sharjah property sales have doubled since 2021');
 assert.equal(await page.locator('#market-sharjah .bars li.now .yr').textContent(),'2025');assert.equal(Math.round(11.98907533/shj[4]*100),42);
 assert.deepEqual(await page.locator('#market-sharjah .bar-side strong').allTextContents(),['AED 65.6B','18,333','42%']);
 assert.match(await page.locator('#market-sharjah .source').textContent(),/\* 2020 is completed sales only[\s\S]*2025 and 2026 are total transaction value, including mortgages/);
 // All three: 2025 highlighted, side cards about 2025 only, no box projecting the rest of 2026, no tags above the bars.
 for(const id of ['market','market-ad','market-rak']){assert.equal(await page.locator('#'+id+' .bars li.now .yr').textContent(),'2025');assert(!/2026/.test(await page.locator('#'+id+' .bar-side').textContent()),id+' side cards mention 2026');assert.equal(await page.locator('#'+id+' .bar.fc,#'+id+' .bars .est').count(),0,id+' projects 2026');assert(!/dashed|Q4|forecast/i.test(await page.locator('#'+id).textContent()),id+' mentions the rest of 2026');}
 // Commissions: 4% of off-plan sales, 2025 and 2026 to date, for the three emirates (RAK 2026 not published).
 const off={dxb:[292886732524,200915946076],ad:[59220000000,103330000000],rak:[11198476786]};
 const c25=(off.dxb[0]+off.ad[0]+off.rak[0])*.04/1e9,c26=(off.dxb[1]+off.ad[1])*.04/1e9;
 assert.equal(c25.toFixed(1),'14.5');assert.equal(c26.toFixed(1),'12.2');assert.equal((c25+c26).toFixed(1),'26.7');
 assert.equal(await page.locator('#commission h2').textContent(),'AED 26.7B of off-plan commission in under two years');assert.match(await page.locator('#commission .c-head>p:not(.c-eyebrow)').textContent(),/an average of 4% of off-plan sales/);
 assert.deepEqual(await page.locator('#commission .cm-total strong').allTextContents(),['AED 14.5B','AED 12.2B']);
 assert.deepEqual(await page.locator('#commission .cm-row:not(.cm-head):not(.cm-total) strong').allTextContents(),['AED 11.7B','AED 8.0B','AED 2.4B','AED 4.1B','AED 0.45B']);
 assert.match(await page.locator('#commission .cm-table').textContent(),/Not yet published/);assert.equal(await page.locator('#break-commission h2').textContent(),'Commissions');
 // The problem: a section break, then brokers, brokerages and developers, each a statement and its facts.
 assert.equal(await page.locator('#problem h2').textContent(),'The problem');
 assert.deepEqual(await page.locator('[id^="problem-"] .c-eyebrow').allTextContents(),['03The problem · Brokers','03The problem · Brokerages','03The problem · Developers','04The solution · The gap']);
 assert.deepEqual(await page.locator('#problem-brokers .facts p').allTextContents(),['No loan facility against the commission they are owed','No salary: they live from one commission to the next','Less motivation to sell more while earlier commissions are unpaid','Trust is missing']);
 assert.equal(await page.locator('#problem-brokerages .facts li').count(),4);assert.equal(await page.locator('#problem-developers .facts li').count(),4);assert.equal(await page.locator('#problem-brokerages .facts li').last().textContent(),'04Managing a business on cash predictions is not a business');assert.match(await page.locator('#problem-developers .facts').textContent(),/Paying brokers late damages their reputation[\s\S]*No risk partner or fin-real-tech solution/);
 assert.match(await page.locator('#problem-developers .facts').textContent(),/no digital view of who is owed what/);
 // The gap slide: today 3 to 4 months (about 1.5 months to registration, a week to invoice, 30 days, 10 to 15 days late, 15 days to pay out); with Aaronz Pay, paid at registration.
 assert.equal(await page.locator('#problem-gap h2').textContent(),'Aaronz Pay fills the market gap');
 assert.equal(45+7+30+12.5+15,109.5);
 await page.evaluate(()=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id==='problem-gap')));await page.waitForTimeout(200);
 const w=await page.evaluate(()=>[...document.querySelectorAll('#problem-gap .gap-wait .wait-track')].map(e=>e.getBoundingClientRect().width));
 assert.equal(w.length,2);assert(Math.abs(w[1]/w[0]-45/110)<0.01,'Aaronz Pay line is not 45 of 110 days: '+w);
 assert.match(await page.locator('#problem-gap .gap-wait').textContent(),/3 to 4 months[\s\S]*1 week[\s\S]*30 days[\s\S]*10–15 days late[\s\S]*15 days[\s\S]*1\.5 months[\s\S]*Registration complete, invoice raised and paid immediately/);
 assert.deepEqual(await page.locator('#problem-gap .gap-wait .bp b').allTextContents(),['Engages lead','Unit booked','Registration complete','Invoice raised','Payment due','Invoice settled to brokerage','Payout to broker','Engages lead','Unit booked','Registration complete, invoice raised and paid immediately']);
 // Timeline labels above the line never overlap.
 assert.deepEqual(await page.evaluate(()=>{const b=[...document.querySelectorAll('#problem-gap .wait-row:first-child .bp b')].map(e=>e.getBoundingClientRect());const bad=[];for(let i=1;i<b.length;i++)if(b[i].left<b[i-1].right-1)bad.push(i);return bad;}),[]);
 assert(await page.locator('#problem-gap .gap-wait .wait-track').first().evaluate(e=>e.getBoundingClientRect().height)<=16,'gap lines too tall');
 assert.equal(await page.locator('#problem-gap .inv-call').count(),0,'gap slide ends on the timeline');
 // The brand is the AaronzPay wordmark (no dot, Pay in the primary colour): no Aaronz.AI anywhere a viewer sees it.
 assert(!/Aaronz\.AI|aaronz-ai-logo/.test(await page.evaluate(()=>document.title+document.querySelector('meta[name=description]').content+document.body.innerHTML.replace(/<aside class="notes">[\s\S]*?<\/aside>/g,''))),'old brand shown');
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.nav-logo .wm,.c-lockup .wm')].map(e=>e.textContent+'|'+e.getAttribute('aria-label'))),['AaronzPay|Aaronz Pay','AaronzPay|Aaronz Pay']);
 assert.equal(await page.locator('.c-lockup .wm-pay').evaluate(e=>getComputedStyle(e).color),await page.evaluate(()=>{const d=document.createElement('i');d.style.color='var(--brand)';document.body.append(d);const c=getComputedStyle(d).color;d.remove();return c;}));
 // Money flow: six steps on one line, with Aaronz's own steps marked.
 assert.equal(await page.locator('#break-model h2').textContent(),'Money flow');assert.equal(await page.locator('#commission-ready').count(),0);assert(!/business model/i.test(await page.evaluate(()=>document.body.innerText)),'old section name shown');assert.equal(await page.locator('#business-model h2').textContent(),'From registration to settlement in six steps');
 assert.deepEqual(await page.locator('#business-model .rail .who').allTextContents(),['Developer','Brokerage','Aaronz Pay','Finance partner','Developer','Aaronz Pay']);
 assert.deepEqual(await page.locator('#business-model .rail li.us .n').allTextContents(),['3','6']);
 assert.match(await page.locator('#business-model .rail').textContent(),/Marks the broker eligible for commission[\s\S]*Pays the commission amount[\s\S]*To the finance partner[\s\S]*Settles the finance partner and collects its fee[\s\S]*Finance partner receives a fee/);assert.match(await page.locator('#business-model .inv-call').textContent(),/Aaronz Pay settles with the finance partner and collects its fee/);
 assert(!/%/.test(await page.locator('#business-model .rail').textContent()),'pricing shown on the flow');
 await page.evaluate(()=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id==='business-model')));await page.waitForTimeout(200);assert(await page.evaluate(()=>Math.abs(document.querySelector('.rail-phases span:last-child').getBoundingClientRect().left-document.querySelectorAll('.rail li')[4].getBoundingClientRect().left)<2),'Repayment label not above step 5');
 // Outcome: broker, brokerage, developer in that order, three problem lines turned around for each, with no pricing.
 assert.deepEqual(await page.locator('#outcome h3').allTextContents(),['Broker','Brokerage','Developer']);assert.equal(await page.locator('#outcome h2').textContent(),'A win-win-win for brokers, brokerages and developers');assert.match(await page.locator('#outcome').textContent(),/Gains trust[\s\S]*not on speculation[\s\S]*A risk partner who takes care of commission/);
 assert.deepEqual(await page.locator('#outcome .c-card').evaluateAll(c=>c.map(e=>e.querySelectorAll('li').length)),[4,4,4]);
 assert.deepEqual([await page.locator('#break-solution h2').textContent(),await page.locator('#break-outcome h2').textContent()],['The solution','The outcome']);
 assert(!/%|AED/.test(await page.locator('#outcome').evaluate(e=>{const c=e.cloneNode(true);c.querySelector('aside.notes')?.remove();return c.textContent;})),'pricing shown on the outcome slide');
 assert.equal(await page.locator('#allocation').count(),0,'removed slide is back');
 // The cover is the title alone, then a section break introduces the market.
 assert.equal(await page.locator('#home .c-lede').textContent(),'AaronzPay.today');assert.equal(await page.locator('#break-market h2').textContent(),'The market');
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
 await mobile.goto(url);await mobile.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await mobile.waitForTimeout(500);
 // Phones open as slides at the exact desktop layout, with swiping on; the stacked layout is only in "Read as page".
 assert.equal(await mobile.evaluate(()=>document.body.classList.contains('reader')),false);assert.equal(await mobile.evaluate(()=>innerWidth),1440);assert.equal(await mobile.evaluate(()=>deck.getConfig().touch),true);
 for(let i=0;i<ids.length;i++){await mobile.evaluate(i=>deck.slide(i),i);await mobile.waitForTimeout(120);const a=await mobile.locator('#'+ids[i]).evaluate(el=>[el.offsetWidth,el.offsetHeight,[...el.querySelectorAll('h2,h3,li,article')].map(n=>n.offsetLeft+','+n.offsetTop+','+n.offsetWidth).join(';')]);await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(120);const b=await page.locator('#'+ids[i]).evaluate(el=>[el.offsetWidth,el.offsetHeight,[...el.querySelectorAll('h2,h3,li,article')].map(n=>n.offsetLeft+','+n.offsetTop+','+n.offsetWidth).join(';')]);assert.deepEqual(a,b,ids[i]+' layout differs on a phone');}
 await mobile.evaluate(()=>document.getElementById('viewToggle').click());await mobile.waitForFunction(()=>document.body.classList.contains('reader')&&innerWidth<500);await mobile.waitForTimeout(500);
 for(const id of ['market','market-ad','market-rak'])assert(await mobile.evaluate(id=>[...document.querySelectorAll('#'+id+' .bars li')].every(l=>l.getBoundingClientRect().right<=innerWidth+1),id),id+' chart wider than the phone screen');
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'brief deck mobile overflow');await mobile.screenshot({path:'.build/brief-mobile.png',fullPage:true});
 // The old /reem/ address forwards to /brief/, keeping the slide.
 const old=await browser.newPage();await old.goto(pathToFileURL(process.cwd()+'/reem/index.html').href+'#/market-ad');await old.waitForURL(/\/brief\/index\.html#\/market-ad$/);await old.close();
 // Settings: hide and show slides, pick the primary colour, and keep both on reload.
 const set=await browser.newPage({viewport:{width:1440,height:1000}});set.on('pageerror',e=>errors.push(e.message));
 await set.goto(url);await set.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());
 assert.equal(await set.evaluate(()=>document.documentElement.dataset.accent),'indigo');assert.equal(await set.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()),'#4f46e5');
 assert.equal(await set.locator('#settingsSheet').isVisible(),false);await set.click('#settingsToggle');assert(await set.locator('#settingsSheet').isVisible());
 assert.equal(await set.locator('.set-list input').count(),ids.length);assert.equal(await set.locator('.set-list .set-t').first().textContent(),'Cover');
 const toggle=async id=>set.locator('.set-list label').filter({has:set.locator('input[data-slide="'+id+'"]')}).click();
 await toggle('market-rak');assert.equal(await set.locator('#market-rak').count(),0);assert.match(await set.locator('#slideCount').textContent(),/ \/ 17$/);assert.equal(await set.evaluate(()=>deck.getTotalSlides()),17);
 await toggle('break-solution');assert.equal(await set.locator('.site-nav nav a[href="#/break-solution"]').isVisible(),false);
 await set.locator('[data-accent-id="blue"]').click();assert.equal(await set.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()),'#1d5fd1');
 assert.equal(await set.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--fix').trim()),'#1f6b4a');
 await set.keyboard.press('Escape');assert.equal(await set.locator('#settingsSheet').isVisible(),false);assert.equal(await set.evaluate(()=>deck.isOverview()),false);
 await set.reload();await set.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());assert.equal(await set.locator('#market-rak').count(),0);assert.equal(await set.evaluate(()=>document.documentElement.dataset.accent),'blue');
 await set.click('#settingsToggle');await set.click('.set-all');assert.deepEqual(await set.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids,'slides not restored in order');
 // Hiding the slide on screen moves to the next one, and the cover can be hidden without errors.
 await set.evaluate(()=>deck.slide(0));await toggle('home');assert.equal(await set.evaluate(()=>deck.getCurrentSlide().id),'break-market');await set.reload();await set.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());assert.equal(await set.evaluate(()=>deck.getCurrentSlide().id),'break-market');
 await set.evaluate(()=>{localStorage.clear();});await set.close();
 // PDF: the default state downloads the file on the site; any other colour or hidden slide prints exactly what is on screen.
 const out=await browser.newPage({viewport:{width:1440,height:1000}});out.on('pageerror',e=>errors.push(e.message));await out.goto(url);await out.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());
 await out.evaluate(()=>{window.printed=0;window.print=()=>{window.printed++;};window.prevented=[];window.addEventListener('click',e=>{if(e.target.id==='deckPdf'){window.prevented.push(e.defaultPrevented);e.preventDefault();}});});
 await out.click('#deckPdf');assert.deepEqual(await out.evaluate(()=>[window.printed,window.prevented]),[0,[false]],'default state should download the site PDF');
 const pages=b=>(b.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
 assert.equal(pages(await out.pdf({preferCSSPageSize:true,printBackground:true})),ids.length,'one page per slide');
 await out.click('#settingsToggle');await out.locator('.set-list label').filter({has:out.locator('input[data-slide="market-rak"]')}).click();await out.locator('[data-accent-id="amber"]').click();await out.click('.set-close');
 await out.click('#deckPdf');assert.deepEqual(await out.evaluate(()=>[window.printed,window.prevented[1]]),[1,true],'changed settings should print');
 assert.equal(pages(await out.pdf({preferCSSPageSize:true,printBackground:true})),ids.length-1,'hidden slide must not print');
 await out.emulateMedia({media:'print'});assert.equal(await out.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()),'#8f5a00');
 await out.setViewportSize({width:1440,height:800});await out.waitForTimeout(150);for(const id of ['market','problem-gap','outcome'])await out.locator('#'+id).screenshot({path:'.build/brief-print-'+id+'.png'});
 assert.deepEqual(await out.evaluate(()=>[...document.querySelectorAll('.slides>section')].filter(s=>s.offsetHeight!==799||s.offsetWidth!==1440).map(s=>s.id)),[],'print pages must fit a 1440x800 page');
 // Commission rate: the settings dropdown recalculates every commission figure, and a changed rate prints.
 await out.emulateMedia({media:'screen'});await out.setViewportSize({width:1440,height:1000});await out.click('#settingsToggle');await out.selectOption('#setRate','5');await out.click('.set-close');
 assert.equal(await out.locator('#commission h2').textContent(),'AED 33.4B of off-plan commission in under two years');assert.deepEqual(await out.locator('#commission .cm-total strong').allTextContents(),['AED 18.2B','AED 15.2B']);
 assert.deepEqual(await out.locator('#commission .cm-row:not(.cm-head):not(.cm-total) strong').allTextContents(),['AED 14.6B','AED 10.0B','AED 3.0B','AED 5.2B','AED 0.56B']);assert.match(await out.locator('#commission .c-head>p:not(.c-eyebrow)').textContent(),/average of 5%/);
 await out.emulateMedia({media:'screen'});await out.reload();await out.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());assert.equal(await out.locator('#commission .cm-total strong').first().textContent(),'AED 18.2B','rate not remembered');
 await out.evaluate(()=>{localStorage.clear();});await out.close();
 assert.deepEqual(errors,[]);console.log('Passed: financier brief deck, eighteen slide layouts, market figures, problem slides, outcome slide, old-address redirect, settings sheet, PDF for current settings, commission rate, phone slides and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
