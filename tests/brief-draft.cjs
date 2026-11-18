// Draft brief: the financier brief plus the pricing and credit risk slides after the money flow, at /brief-draft/.
const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
const {build}=require('../tools/build-brief-draft.cjs');
(async()=>{
 // The committed page is exactly what the build produces from the current brief, so the two never drift apart.
 assert.equal(fs.readFileSync('brief-draft/index.html','utf8'),build(),'brief-draft/index.html is stale: run npm run export:brief-draft');
 const browser=await chromium.launch({headless:true});
 try{
 const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push('failed to load '+r.url()));
 await page.goto(pathToFileURL(process.cwd()+'/brief-draft/index.html').href);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 const ids=await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id));
 assert.equal(ids.length,21);assert.deepEqual(ids.slice(-4),['business-model','break-risk','pricing','credit-risk']);
 assert.match(await page.title(),/Draft$/);assert.equal(await page.locator('.nav-logo .draft-tag').textContent(),'Draft');
 assert.equal(await page.locator('#deckPdf').getAttribute('href'),'aaronz-commission-finance-draft.pdf');assert(fs.existsSync('brief-draft/aaronz-commission-finance-draft.pdf'),'draft PDF missing');
 const conf=await page.locator('#home .conf').textContent();
 for(const id of ['break-risk','pricing','credit-risk']){
  await page.evaluate(id=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id===id)),id);await page.waitForTimeout(300);await page.screenshot({path:'.build/brief-draft-'+id+'.png'});
  const problems=await page.locator('#'+id).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.conf')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],id+' overflow: '+problems);
  assert.equal(await page.locator('#'+id+'>.conf').textContent(),conf,id+' confidentiality line');
  assert(await page.locator('#'+id+'>.conf').evaluate(el=>{const n=el.parentElement.querySelector(':scope>.source');return !n||n.getBoundingClientRect().bottom<=el.getBoundingClientRect().top+1;}),id+' confidentiality line overlaps the source');
 }
 // Pricing: two options, unknown rates shown as To be added, and the scale figure matches its formula.
 assert.deepEqual(await page.locator('#pricing .pr-table .cm-head span').allTextContents(),['','Option A · Brokerage pays','Option B · Developer pays']);
 assert.equal(await page.locator('#pricing .todo').count(),3);
 assert.equal(Math.round(100000*0.01*50/365),137);assert.match(await page.locator('#pricing .source').textContent(),/AED 137 = AED 100,000 × 1% × 50 ÷ 365/);
 // Credit risk: six risks, each with a control and a status.
 assert.equal(await page.locator('#credit-risk .rk-table .cm-row:not(.cm-head)').count(),6);
 assert.deepEqual(await page.locator('#credit-risk .rk-tag').allTextContents(),['To be agreed','Decision needed','Decision needed','To be built','To be built','To be agreed']);
 // Same rules as the brief: no recipient named, no banned word, notes on every new slide.
 const text=await page.evaluate(()=>document.title+document.body.innerText);
 assert(!/\breem\b/i.test(text),'recipient named in the draft');assert(!/automatically/i.test(text),'banned word in the draft');
 assert.equal(await page.locator('#pricing aside.notes,#credit-risk aside.notes').count(),2);
 // Phone reader view: the tables stack into one column without overflowing.
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(pathToFileURL(process.cwd()+'/brief-draft/index.html').href);await mobile.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());
 await mobile.evaluate(()=>document.getElementById('viewToggle').click());await mobile.waitForFunction(()=>document.body.classList.contains('reader')&&innerWidth<500);await mobile.waitForTimeout(500);
 const wide=await mobile.evaluate(()=>[...document.querySelectorAll('#pricing *,#credit-risk *')].filter(n=>n.getBoundingClientRect().right>innerWidth+1&&!n.closest('aside.notes')).map(n=>n.tagName+'.'+n.className));
 assert.deepEqual(wide,[],'draft slides overflow on a phone: '+wide);
 for(const id of ['home','pricing','credit-risk']){await mobile.locator('#'+id).scrollIntoViewIfNeeded();await mobile.locator('#'+id).screenshot({path:'.build/brief-draft-'+id+'-mobile.png'});}
 assert.deepEqual(errors,[]);
 console.log('Passed: draft brief, built from the brief, twenty-one slides, pricing and credit risk slides, confidentiality line, draft PDF and phone reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
