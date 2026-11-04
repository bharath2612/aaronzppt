const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
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
 assert.equal(await page.evaluate(()=>deck.getConfig().transition),'none');
 // Brand: white canvas, with the orange palette replacing the Imtiaz deck's green.
 const css=name=>page.evaluate(n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim(),name);
 assert.equal(await css('--brand'),'#cf4000');assert.equal(await css('--orange'),'#ff6b35');assert.equal(await css('--paper'),'#fff');
 assert.equal(await page.locator('.c-card.lead').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(207, 64, 0)');
 // Slides with no confirmed facts must show visible placeholders, not invented content.
 for(const id of ['product','revenue','raise'])assert(await page.locator('#'+id+' .todo').count()>0,id+' lost its placeholders');
 assert.deepEqual(await page.locator('#team h3').allTextContents(),['Jikku Luke','Surinder Jaiswani','Bharath Chippa']);
 // Timelines: roughly 2 months today, the same day with Aaronz, both from the commission milestone.
 for(const id of ['problem','solution']){assert.equal(await page.locator('#'+id+' .inv-time li').count(),3);assert.match(await page.locator('#'+id+' .inv-time li h3').first().textContent(),/Commission milestone/);}
 // The timeline spans the whole column, ending at the right edge with its last step right-aligned.
 for(const id of ['problem','solution']){await page.evaluate(id=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id===id)),id);await page.waitForTimeout(200);const g=await page.evaluate(id=>{const q=s=>document.querySelector('#'+id+' '+s).getBoundingClientRect();const lastLi=document.querySelector('#'+id+' .inv-time li:last-child');return {time:q('.inv-time'),call:q('.c-head'),last:lastLi.getBoundingClientRect(),align:getComputedStyle(lastLi).textAlign};},id);assert(Math.abs(g.time.width-g.call.width)<2&&Math.abs(g.last.right-g.call.right)<2,id+' timeline does not span the column');assert.equal(g.align,'right');}
 assert.match(await page.locator('#solution .source').textContent(),/before 2 pm/);
 assert.match(await page.locator('#problem h2').textContent(),/Roughly 2 months/);assert.deepEqual(await page.locator('#problem .inv-who .c-tag').allTextContents(),['Brokerages','Developers','The market']);assert.match(await page.locator('#problem .inv-who .lead').textContent(),/Developers/);assert.match(await page.locator('#solution .inv-call').textContent(),/same day/);
 const wording=await page.evaluate(()=>document.querySelector('.slides').textContent);assert(!/24 hours|DLD registration|DLD reservation/.test(wording),'old wording still shown');
 assert.equal(await page.locator('#developers h2').textContent(),'Handpicked developers only');
 // The developer slide names every factor the user listed.
 assert.deepEqual(await page.locator('#developers .inv-factors h3').allTextContents(),['Reputation','Social reputation','Banking history','Balance sheets','Leverage']);
 const text=await page.evaluate(()=>document.body.textContent);assert(!/channel connect/i.test(text),'Channel Connect mentioned');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'investor deck mobile overflow');await mobile.screenshot({path:'.build/investor-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: investor deck, nine slide layouts, orange palette, placeholders, timelines, developer factors, fonts, logos, and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
