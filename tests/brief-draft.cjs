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
 assert.equal(ids.length,22);assert.deepEqual(ids.slice(-5),['business-model','break-pricing','pricing','break-credit','credit-risk']);
 assert.match(await page.title(),/Draft$/);assert.equal(await page.locator('.nav-logo .draft-tag').textContent(),'Draft');
 assert.equal(await page.locator('#deckPdf').getAttribute('href'),'aaronz-commission-finance-draft.pdf');assert(fs.existsSync('brief-draft/aaronz-commission-finance-draft.pdf'),'draft PDF missing');
 const conf=await page.locator('#home .conf').textContent();
 for(const id of ['break-pricing','pricing','break-credit','credit-risk']){
  await page.evaluate(id=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id===id)),id);await page.waitForTimeout(300);await page.screenshot({path:'.build/brief-draft-'+id+'.png'});
  const problems=await page.locator('#'+id).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(n=>!n.closest('aside.notes,.source,.conf')).filter(n=>{const b=n.getBoundingClientRect();return b.width>0&&(b.bottom>limit+1||b.left<r.left-1||b.right>r.right+1);}).map(n=>n.tagName+'.'+n.className);});
  assert.deepEqual(problems,[],id+' overflow: '+problems);
  const orphans=await page.locator('#'+id).evaluate(el=>[...el.querySelectorAll('p,h3,h2,h1,strong,span')].filter(n=>!n.closest('aside.notes')&&n.getClientRects().length).filter(n=>{const text=n.firstChild&&n.childNodes.length===1&&n.firstChild.nodeType===3?n.firstChild:null;if(!text)return false;const value=text.textContent;const cut=value.trimEnd().lastIndexOf(' ');if(cut<1)return false;const top=(a,b)=>{const r=document.createRange();r.setStart(text,a);r.setEnd(text,b);return r.getClientRects()[0].top;};return top(cut+1,value.trimEnd().length)-top(cut-1,cut)>2;}).map(n=>n.textContent));
  assert.deepEqual(orphans,[],id+' single word on a last line');
  // Pricing labels such as "Finance partner" stay on one line.
  const broken=await page.locator('#'+id).evaluate(el=>[...el.querySelectorAll('.px-path,.px-flow strong,.px-split span')].filter(n=>n.getClientRects().length&&n.getBoundingClientRect().height>parseFloat(getComputedStyle(n).lineHeight)*1.5&&!n.closest('.px-split')).map(n=>n.textContent));
  assert.deepEqual(broken,[],id+' label wraps: '+broken);
  assert.equal(await page.locator('#'+id+'>.conf').textContent(),conf,id+' confidentiality line');
  assert(await page.locator('#'+id+'>.conf').evaluate(el=>{const n=el.parentElement.querySelector(':scope>.source');return !n||n.getBoundingClientRect().bottom<=el.getBoundingClientRect().top+1;}),id+' confidentiality line overlaps the source');
 }
 // Pricing: one AED 100,000 commission through two options; the finance partner earns the same 1.5% either way.
 assert.deepEqual(await page.locator('#pricing .px-opt h3').allTextContents(),['Brokerage pays','Brokerage and developer share']);
 const flows=await page.locator('#pricing .px-opt').evaluateAll(os=>os.map(o=>[...o.querySelectorAll('.px-flow strong')].map(s=>+s.textContent.replace(/[^0-9]/g,''))));
 assert.deepEqual(flows,[[98500,100000],[99250,100750]]);for(const [paid,repaid] of flows)assert.equal(repaid-paid,100000*0.015);
 assert.deepEqual(await page.locator('#pricing .px-split').evaluateAll(ss=>ss.map(s=>s.textContent)),['Brokerage · AED 1,500','Brokerage · AED 750Developer · AED 750']);
 assert.equal(Math.round(1.5*365/50),11);assert.match(await page.locator('#pricing .source').textContent(),/1\.5% charge for about 50 days is about 11% a year/);
 assert.match(await page.locator('#pricing .source').textContent(),/Example figures/);
 // Credit risk: three facts about the exposure, then seven controls across three stages, each with a status.
 assert.deepEqual(await page.locator('#credit-risk .cr-facts strong').allTextContents(),['The developer','About 50 days','Confirmed']);
 await page.evaluate(()=>deck.slide([...document.querySelectorAll('.slides>section')].findIndex(s=>s.id==='credit-risk')));await page.waitForTimeout(300);
 assert(await page.evaluate(()=>{const f=document.querySelector('#credit-risk .cr-facts').getBoundingClientRect(),s=document.querySelector('#credit-risk .cr-stages').getBoundingClientRect();return f.bottom<s.top&&Math.abs(f.left-s.left)<1&&Math.abs(f.right-s.right)<1;}),'credit risk stages overlap or misalign with the facts');
 assert.deepEqual(await page.locator('#credit-risk .cr-stage').evaluateAll(ss=>ss.map(s=>s.querySelectorAll('li').length)),[3,2,2]);
 assert.deepEqual(await page.locator('#credit-risk .cr-tag').allTextContents(),['To be built','To be built','To be agreed','To be agreed','To be agreed','Decision needed','Decision needed']);
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
 for(const id of ['pricing','credit-risk']){await mobile.locator('#'+id).scrollIntoViewIfNeeded();await mobile.locator('#'+id).screenshot({path:'.build/brief-draft-'+id+'-mobile.png'});}
 assert.deepEqual(errors,[]);
 console.log('Passed: draft brief, built from the brief, twenty-two slides, pricing and credit risk slides, confidentiality line, draft PDF and phone reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
