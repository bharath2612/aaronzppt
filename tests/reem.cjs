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
 // The financier brief: market, the three problems, the solution, and where we are.
 const ids=['home','market','commission','problem','problem-brokers','problem-brokerages','solution','allocation'];
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
 // Market: DLD's reported sales value (2021 and 2022 recalculated from DLD records), and commission at 2% of it.
 const sales=[71.7,148.6,262.7,410.2,521,680];
 assert.deepEqual(await page.locator('#market .bars .val').allTextContents(),sales.map(v=>'AED '+v+'B'));
 assert.deepEqual(await page.locator('#commission .bars .val').allTextContents(),sales.map(v=>'AED '+(v*.02).toFixed(1)+'B'));
 assert.equal(Math.round((sales[5]/sales[4]-1)*100),31);assert.match(await page.locator('#commission .bar-side').textContent(),/\+31%/);
 assert.deepEqual(await page.locator('#market .bars li').evaluateAll(l=>l.map(e=>e.querySelector('.est')?.textContent||'')),['','Estimated','Estimated','','','']);assert.match(await page.locator('#market .source').textContent(),/Estimated: 2021 and 2022 add up every sales registration in DLD transaction data/);assert(!/Atlas/.test(await page.evaluate(()=>document.querySelector('.slides').textContent)),'Atlas named in the deck');assert.match(await page.locator('#market .source').textContent(),/Annual Data Review 2025/);
 // Bar heights are proportional to the values, with the tallest at 85%.
 for(const id of ['market','commission'])assert.deepEqual(await page.locator('#'+id+' .bar').evaluateAll(b=>b.map(e=>parseFloat(e.style.height))),sales.map(v=>Math.round(v/sales[5]*850)/10));
 assert.match(await page.locator('#commission .source').textContent(),/2%/);
 // The three problem slides match the investor deck.
 assert.deepEqual(await page.locator('[id^="problem"] .c-eyebrow').allTextContents(),['02The problem · Developers','02The problem · Brokers','02The problem · Brokerages']);
 const investor=fs.readFileSync('investor/index.html','utf8');for(const id of ['problem','problem-brokers','problem-brokerages']){const html=await page.locator('#'+id).evaluate(e=>e.querySelector('.c-head h2').textContent);assert(investor.includes('<h2>'+html.replace(/'/g,'&#39;')+'</h2>'),id+' headline differs from the investor deck');}
 // Solution: the worked example adds up (AED 100,000, 45 days, 18% split 12% to the partner and 6% to Aaronz).
 const charge=r=>Math.round(100000*r*45/365*100)/100;assert.equal(charge(.18),2219.18);assert.equal(charge(.12),1479.45);assert.equal(charge(.06),739.73);
 assert.deepEqual(await page.locator('#solution .amt').allTextContents(),['AED 97,780.82','AED 1,479.45','AED 739.73']);
 // Where we are: the four grades and their ceilings from the routing rules draft.
 assert.deepEqual(await page.locator('#allocation .grades strong').allTextContents(),['Under 4%','4% to 8%','8% to 15%','15% or more']);
 assert.deepEqual(await page.locator('#allocation .cap').allTextContents(),["Up to 15% of a funder's money","Up to 10% of a funder's money","Up to 5% of a funder's money",'Not funded']);
 const text=await page.evaluate(()=>document.querySelector('.slides').textContent);
 assert(!/automatically/i.test(text),'banned word in the deck');assert(!/channel connect|mawarid/i.test(text),'third party named');
 const sheet=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,8);
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="reem.css"]').getAttribute('href')),'reem.css?v='+sheet('reem/reem.css'),'update the ?v= hash on reem.css in reem/index.html');
 assert.equal(await page.evaluate(()=>document.querySelector('link[href^="../investor/investor.css"]').getAttribute('href')),'../investor/investor.css?v='+sheet('investor/investor.css'),'update the ?v= hash on investor.css in reem/index.html');
 assert(fs.statSync('reem/aaronz-reem.pdf').size>100000,'PDF missing');
 await page.click('#viewToggle');assert(await page.evaluate(()=>document.body.classList.contains('reader')));await page.click('#viewToggle');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto(url);await mobile.waitForFunction(()=>document.body.classList.contains('reader'));await mobile.waitForTimeout(500);
 assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Reem deck mobile overflow');await mobile.screenshot({path:'.build/reem-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('Passed: Reem deck, eight slide layouts, market figures, problem slides, worked example, grades, PDF and mobile reader layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
