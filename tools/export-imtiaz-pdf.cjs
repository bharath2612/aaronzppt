// Exports imtiaz.html to imtiaz.pdf: one 1440×800 page per slide, rendered without the site chrome.
const {chromium}=require('@playwright/test');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:800},deviceScaleFactor:2});
  await page.goto(pathToFileURL(process.cwd()+'/imtiaz.html').href);
  await page.waitForFunction(()=>typeof deck!=='undefined'&&deck.isReady());await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{document.body.classList.add('presenting');deck.configure({transition:'none',progress:false});deck.layout();});
  const total=await page.evaluate(()=>deck.getTotalSlides());const shots=[];
  for(let i=0;i<total;i++){await page.evaluate(i=>deck.slide(i),i);await page.waitForTimeout(250);shots.push((await page.screenshot()).toString('base64'));}
  const doc=await browser.newPage();
  await doc.setContent('<style>@page{size:1440px 800px;margin:0}body{margin:0}img{display:block;width:1440px;height:800px;page-break-after:always}</style>'+shots.map(s=>'<img src="data:image/png;base64,'+s+'">').join(''));
  await doc.pdf({path:'imtiaz.pdf',width:'1440px',height:'800px',printBackground:true});
  console.log('Wrote imtiaz.pdf with '+total+' pages.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
