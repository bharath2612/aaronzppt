const { chromium }=require('@playwright/test');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const url=pathToFileURL(process.cwd()+'/imtiaz.html').href;const errors=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
 const ids=['home','process','how-it-works','select','proposal','cfo','source-advantage','market','pilot','future','next-steps','faq'];
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('.slides>section')].map(s=>s.id)),ids);
 for(let i=0;i<ids.length;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(300);await page.screenshot({path:'.build/imtiaz-'+ids[i]+'.png'});
  // Content must stay inside the slide and clear of the absolutely positioned source note.
  const problems=await page.locator('#'+ids[i]).evaluate(el=>{const r=el.getBoundingClientRect();const note=el.querySelector(':scope>.source,:scope>.bottom-note');const limit=note?note.getBoundingClientRect().top:r.bottom;return [...el.querySelectorAll('*')].filter(x=>x.getClientRects().length&&getComputedStyle(x).position!=='absolute'&&!x.closest('.source,.bottom-note')).filter(x=>{const b=x.getBoundingClientRect();return b.bottom>limit+2||b.right>r.right+2}).map(x=>x.id||x.className||x.tagName)});
  assert.deepEqual(problems,[],ids[i]+' overflow: '+problems);}
 assert.equal(await page.locator('#slideCount').textContent(),'12 / 12');
 // The email's call to action opens the selection slide, where the payout choice updates the amount.
 const cta=page.locator('#how-it-works .mail-button');assert.equal(await cta.textContent(),'Get commission now');assert.equal(await cta.getAttribute('href'),'#/select');
 await page.evaluate(()=>deck.slide(2));await cta.click();await page.waitForFunction(()=>location.hash==='#/select');
 assert.equal(await page.locator('#selAmount').textContent(),'AED 98,500');
 await page.click('#select [data-days="15"]');await page.click('#select [data-share="50"]');
 assert.equal(await page.locator('#selAmount').textContent(),'AED 49,625');assert.equal(await page.locator('#selRest').textContent(),'then AED 50,000 on Fri 18 Dec 2026');
 await page.click('#select [data-days="45"]');assert.equal(await page.locator('#selAmount').textContent(),'AED 100,000');assert(await page.locator('#selRest').isHidden());
 await page.click('#selConfirm');assert(await page.locator('#selDone').isVisible());
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Imtiaz deck mobile overflow');await mobile.screenshot({path:'.build/imtiaz-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: Imtiaz deck, twelve slide layouts, email call to action and payout selection, and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
