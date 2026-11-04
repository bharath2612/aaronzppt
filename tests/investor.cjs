const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');const crypto=require('node:crypto');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const url=pathToFileURL(process.cwd()+'/investor/index.html').href;const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 page.on('requestfailed',r=>errors.push('failed to load '+r.url()));
 await page.goto(url);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 const ids=['home','team','problem','solution','market','product','revenue','agents','developers','competition','raise'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/investor-'+ids[i]+'.png'});
  // Content must stay inside the slide and clear of the absolutely positioned source note.
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);
  // No paragraph or card title may leave one word alone on its last line.
  const orphans=await page.locator('#'+ids[i]).evaluate(el=>[...el.querySelectorAll('p,h3,h2,h1')].filter(n=>!n.closest('aside.notes')&&n.getClientRects().length).filter(n=>{const text=n.firstChild&&n.childNodes.length===1&&n.firstChild.nodeType===3?n.firstChild:null;if(!text)return false;const value=text.textContent;const cut=value.trimEnd().lastIndexOf(' ');if(cut<1)return false;const top=(a,b)=>{const r=document.createRange();r.setStart(text,a);r.setEnd(text,b);return r.getClientRects()[0].top;};return top(cut+1,value.trimEnd().length)-top(cut-1,cut)>2;}).map(n=>n.textContent));
  assert.deepEqual(orphans,[],ids[i]+' single word on a last line');}
 assert.equal(await page.locator('#slideCount').textContent(),'11 / 11');
 assert(await page.evaluate(()=>document.fonts.check('500 48px Inter')),'Inter not loaded');
 assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'logo failed to load');
 // Nav and cover use the one-line Aaronz AI logo.
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.nav-logo img,.c-lockup img')].map(i=>i.getAttribute('src'))),['aaronz-ai-logo.svg','aaronz-ai-logo.svg']);
 assert.equal(await page.evaluate(()=>deck.getConfig().transition),'none');
 // Brand: white canvas, with the orange palette replacing the Imtiaz deck's green.
 const css=name=>page.evaluate(n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim(),name);
 assert.equal(await css('--brand'),'#cf4000');assert.equal(await css('--orange'),'#ff6b35');assert.equal(await css('--paper'),'#fff');
 assert.equal(await page.locator('.c-card.lead').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(207, 64, 0)');
 // Slides with no confirmed facts must show visible placeholders, not invented content.
 for(const id of ['raise'])assert(await page.locator('#'+id+' .todo').count()>0,id+' lost its placeholders');
 assert.deepEqual(await page.locator('#team h3').allTextContents(),['Surandar Jesrani','Jikku Luke','Bharath Chippa']);
 // Timelines: months today, the same day with Aaronz, both from the commission milestone.
 for(const id of ['problem','solution']){assert.equal(await page.locator('#'+id+' .inv-time li').count(),3);assert.match(await page.locator('#'+id+' .inv-time li h3').first().textContent(),/Commission milestone/);}
 // The timeline spans the whole column, ending at the right edge with its last step right-aligned.
 for(const id of ['problem','solution']){await page.evaluate(id=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id===id)),id);await page.waitForTimeout(200);const g=await page.evaluate(id=>{const q=s=>document.querySelector('#'+id+' '+s).getBoundingClientRect();const lastLi=document.querySelector('#'+id+' .inv-time li:last-child');return {time:q('.inv-time'),call:q('.c-head'),last:lastLi.getBoundingClientRect(),align:getComputedStyle(lastLi).textAlign};},id);assert(Math.abs(g.time.width-g.call.width)<2&&Math.abs(g.last.right-g.call.right)<2,id+' timeline does not span the column');assert.equal(g.align,'right');}
 assert.match(await page.locator('#solution .source').textContent(),/before 2 pm/);
 assert.equal(await page.locator('#problem h2').textContent(),'Brokerages wait months to receive their commission');
 // Every problem card has a matching solution card, in the same order.
 for(const id of ['problem','solution']){assert.deepEqual(await page.locator('#'+id+' .inv-who .c-tag').allTextContents(),['Brokerages','Agents','Developers','The risk']);assert.equal(await page.locator('#'+id+' .inv-who .lead').count(),0,'problem and solution cards must all look the same');}
 assert.equal(await page.locator('#solution h2').textContent(),'We pay them the same day');
 const wording=await page.evaluate(()=>document.querySelector('.slides').textContent);assert(!/24 hours|DLD registration|DLD reservation/.test(wording),'old wording still shown');
 assert.equal(await page.locator('#developers h2').textContent(),'Every developer tested before we sign');
 assert.equal(await page.locator('#home h1 mark').textContent(),'paid the same day.');assert.match(await page.locator('#home h1').textContent(),/^Real estate commissions, paid the same day\./);
 assert.equal(await page.locator('#market h2').textContent(),"Dubai's commission market: $3.7B and growing fast");assert.match(await page.locator('#problem .c-head').textContent(),/months away/);
 // The founder banned this word from the pitch, including speaker notes.
 assert(!/automatically/i.test(await page.evaluate(()=>document.querySelector('.slides').textContent)),'banned word in the deck');
 // The spread example adds up: $25,000 at 15% and 9%, by days until the developer pays.
 for(const [days,fee,cost,spread] of [[30,313,188,125],[60,625,375,250],[90,938,563,375]]){assert.equal(Math.round(25000*.15*days/360),fee);assert.equal(Math.round(25000*.09*days/360),cost);assert.equal(Math.round(25000*.06*days/360),spread);}
 const moneyRows=await page.locator('#revenue tbody tr').allTextContents();assert.equal(moneyRows.length,3);assert.match(moneyRows[1],/60 days\$625\$375\$250/);const spreadText=await page.locator('#revenue .lead').textContent();for(const figure of ['$25,000','60 days','15% a year','9% a year','$625','$375','$250'])assert(spreadText.includes(figure),figure);
 assert(!/100,000/.test(await page.locator('#revenue').textContent()),'old example amount still shown');
 // Competition: two global players with the larger cards, then two local; only Lyte shows a valuation figure.
 assert.deepEqual(await page.locator('#competition .global h3').allTextContents(),['Lyte','Tongo']);assert.deepEqual(await page.locator('#competition .local h3').allTextContents(),['FastPay RECAP','ACOT']);assert.deepEqual(await page.locator('#competition .label').allTextContents(),['valuation','raised · valuation not disclosed','Valuation not disclosed','Valuation not disclosed']);
 assert.match(await page.locator('#problem .inv-time').textContent(),/30 to 90 days/);
 // Agent product maths: 4.5% flat on $10,000, 9% cost of money, and the 5% take-up scenario.
 for(const [days,cost,spread] of [[30,75,375],[60,150,300],[90,225,225]]){assert.equal(Math.round(10000*.09*days/360),cost);assert.equal(450-cost,spread);}
 const agentPool=3.7e9*.5,agentOut=agentPool*.05*.8;assert.equal(Math.round(agentOut/1e6),74);assert.equal((agentOut*.045/1e6).toFixed(1),'3.3');assert.equal((agentOut*.09*60/360/1e6).toFixed(1),'1.1');assert.equal(((agentOut*.045-agentOut*.09*60/360)/1e6).toFixed(1),'2.2');assert.equal((agentOut/6/1e6).toFixed(1),'12.3');
 assert.match(await page.locator('#agents .lead').textContent(),/\$74M.*\$12\.3M.*\$2\.2M/);
 // Product slide is filled in, and team names are centred.
 assert.equal(await page.locator('#product h2').textContent(),'A product, not a service');assert.equal(await page.locator('#product .todo').count(),0);assert.match(await page.locator('#product .inv-call').textContent(),/Zero bloat/);
 assert.equal(await page.locator('#team .c-card').first().evaluate(e=>getComputedStyle(e).textAlign),'center');
 // The stylesheet link carries a hash of the file, so browsers can't pair new slides with an old cached stylesheet.
 const sheet=fs.readFileSync('investor/investor.css');const version=crypto.createHash('sha256').update(sheet).digest('hex').slice(0,8);assert.equal(await page.evaluate(()=>document.querySelector('link[href^="investor.css"]').getAttribute('href')),'investor.css?v='+version,'update the ?v= hash on investor.css in investor/index.html');
 // The developer slide shows the five tests and the firm ending.
 assert.deepEqual(await page.locator('#developers .inv-factors h3').allTextContents(),['Reputation','Cash flow','Payment record','Market share','Unsold inventory']);assert.match(await page.locator('#developers .inv-call').textContent(),/all five, we don.t sign/);
 // All visible figures are in US dollars; AED appears only in the market slide's speaker note.
 assert(!/AED/.test(await page.evaluate(()=>{const c=document.querySelector('.slides').cloneNode(true);c.querySelectorAll('aside.notes').forEach(n=>n.remove());return c.textContent;})),'AED still shown');assert.match(await page.locator('#market .mkt-stats').textContent(),/\$185\.8B/);
 const text=await page.evaluate(()=>document.body.textContent);assert(!/channel connect/i.test(text),'Channel Connect mentioned');
 // Currency switch: USD by default, every figure changes in AED, and the PDF link follows.
 assert.equal(await page.locator('#currency').inputValue(),'usd');assert.equal(await page.locator('#deckPdf').getAttribute('href'),'aaronz-investor-usd.pdf');
 const aed=await browser.newPage({viewport:{width:1440,height:1000}});aed.on('pageerror',e=>errors.push(e.message));await aed.goto(url);await aed.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await aed.selectOption('#currency','aed');
 assert.equal(await aed.locator('#deckPdf').getAttribute('href'),'aaronz-investor-aed.pdf');
 const slideText=await aed.evaluate(()=>{const c=document.querySelector('.slides').cloneNode(true);c.querySelectorAll('aside.notes').forEach(n=>n.remove());return c.textContent;});assert(!slideText.includes('$'),'dollar sign left in AED: '+(slideText.match(/.{20}\$.{10}/)||[''])[0]);
 for(const figure of ['AED 682.5B','AED 13.59B','AED 293B','AED 2,300','AED 920','AED 1,665','AED 8.15M','AED 121M'])assert(slideText.includes(figure),figure);
 for(const [c,cost,fee,spread,base] of [[30,690,1150,460,92000],[60,1380,2300,920,92000],[90,2070,3450,1380,92000]]){assert.equal(Math.round(base*.09*c/360),cost);assert.equal(Math.round(base*.15*c/360),fee);assert.equal(fee-cost,spread);}
 for(let i=0;i<ids.length;i++){await aed.evaluate(i=>deck.slide(i),i);await aed.waitForTimeout(250);await aed.screenshot({path:'.build/investor-aed-'+ids[i]+'.png'});
  const over=await aed.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});assert.deepEqual(over,[],'AED '+ids[i]+' overflow: '+over);}
 // Switching currency must not change how a figure looks: the market headline stays large in both currencies.
 for(const [view,slide] of [[page,4],[aed,4]]){await view.evaluate(i=>deck.slide(i),slide);await view.waitForTimeout(200);assert.equal(await view.locator('#market .mkt-stats strong data').first().evaluate(e=>getComputedStyle(e).fontSize),'44px');}
 // Table figures stay on one line in AED.
 await aed.evaluate(i=>deck.slide(i),7);await aed.waitForTimeout(200);assert.deepEqual(await aed.locator('#agents tbody td').evaluateAll(cells=>cells.filter(c=>c.scrollWidth>c.clientWidth+1||c.getClientRects()[0].height>60).map(c=>c.textContent)),[]);
 assert(!/\ba AED/.test(await aed.evaluate(()=>document.querySelector('.slides').textContent)),'a AED grammar');
 // The choice survives a reload, a link can set it, and both PDFs exist; reading mode still works.
 await aed.reload();await aed.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());assert.equal(await aed.locator('#currency').inputValue(),'aed');
 for(const c of ['usd','aed'])assert(fs.statSync('investor/aaronz-investor-'+c+'.pdf').size>100000,c+' PDF missing');
 await aed.click('#viewToggle');assert(await aed.evaluate(()=>document.body.classList.contains('reader')));await aed.click('#viewToggle');
 await aed.goto(url+'?currency=usd');assert.equal(await aed.locator('#currency').inputValue(),'usd');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'investor deck mobile overflow');await mobile.screenshot({path:'.build/investor-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: investor deck, eleven slide layouts, orange palette, placeholders, timelines, developer tests, currency switch, fonts, logos, and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
