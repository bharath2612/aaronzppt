const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const url=pathToFileURL(process.cwd()+'/imtiaz.html').href;const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 const ids=['home','proposal','how-it-works','cfo','money','source-advantage','pilot','future','market','next-steps','faq'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/imtiaz-'+ids[i]+'.png'});
  // Content must stay inside the slide and clear of the absolutely positioned source note.
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source,:scope>.bottom-note');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(x=>x.getClientRects().length&&getComputedStyle(x).position!=='absolute'&&!x.closest('.source,.bottom-note')).filter(x=>{const b=x.getBoundingClientRect();return b.bottom>limit+2||b.right>r.right+2}).map(x=>x.id||x.className||x.tagName)});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);}
 assert.equal(await page.locator('#slideCount').textContent(),'11 / 11');
 // The booking email button opens the live payout page in a new tab.
 for(const a of await page.locator('#how-it-works .mail-letter a').all()){assert.equal(await a.getAttribute('href'),'https://today-ai-zeta.vercel.app/presentations/imtiaz-commission');assert.equal(await a.getAttribute('target'),'_blank');}
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Imtiaz deck mobile overflow');await mobile.screenshot({path:'.build/imtiaz-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: Imtiaz deck, eleven slide layouts, booking email button to the live payout page, and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
