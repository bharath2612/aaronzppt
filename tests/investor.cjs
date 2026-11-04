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
 const ids=['home','team','problem','solution','market','product','revenue','developers','raise'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/investor-'+ids[i]+'.png'});
  // Content must stay inside the slide and clear of the absolutely positioned source note.
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.c-meta')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);}
 assert.equal(await page.locator('#slideCount').textContent(),'09 / 09');
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
 for(const id of ['revenue','raise'])assert(await page.locator('#'+id+' .todo').count()>0,id+' lost its placeholders');
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
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'investor deck mobile overflow');await mobile.screenshot({path:'.build/investor-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: investor deck, nine slide layouts, orange palette, placeholders, timelines, developer tests, fonts, logos, and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
