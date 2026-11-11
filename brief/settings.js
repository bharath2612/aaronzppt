// Deck settings: a side sheet to pick the primary colour and hide or show slides.
// Choices are saved in this browser only, so they never change what other viewers see.
(()=>{
 const HIDDEN_KEY='brief-hidden-slides',ACCENT_KEY='brief-accent',RATE_KEY='brief-commission-rate',EST_KEY='brief-commission-estimate';
 const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
 const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Storage can be blocked; the choice still applies for this visit. */}};
 const accents=[['orange','Orange','#ff6b35'],['blue','Blue','#6ea8ff'],['indigo','Indigo','#a5a6f6'],['amber','Amber','#f5b83d'],['slate','Slate','#a9b8cb']];
 const root=document.documentElement;
 // Phones open as slides at the full desktop layout, so nothing inside a slide rearranges.
 const phone=Math.min(screen.width,screen.height)<=800;
 const viewport=document.querySelector('meta[name=viewport]');
 function phoneSlides(on){viewport.content=on?'width=1440':'width=device-width,initial-scale=1';document.body.classList.toggle('phone-slides',on);}
 if(phone){
  phoneSlides(true);
  const swipe=()=>deck.configure({touch:true});
  window.addEventListener('load',()=>{if(deck.isReady())swipe();else deck.on('ready',swipe);});
  document.getElementById('viewToggle').addEventListener('click',()=>setTimeout(()=>{const slides=!document.body.classList.contains('reader');phoneSlides(slides);deck.configure({touch:slides});if(slides)setTimeout(()=>deck.layout(),60);},0));
 }
 const holder=document.querySelector('.slides');
 const all=[...holder.children].filter(n=>n.matches('section'));
 const titleOf=s=>s.id==='home'?'Cover':(s.classList.contains('c-break')?'Section: ':'')+s.querySelector('h2').textContent;
 const known=id=>all.some(s=>s.id===id);
 const hidden=new Set(read(HIDDEN_KEY,[]).filter(known));
 if(hidden.size>=all.length)hidden.clear();
 const visible=()=>all.filter(s=>!hidden.has(s.id));
 function applyAccent(id){root.dataset.accent=id;}
 function place(){all.forEach(s=>{if(hidden.has(s.id))s.remove();else holder.appendChild(s);});
  document.querySelectorAll('.site-nav nav a').forEach(a=>{a.hidden=hidden.has(a.hash.replace('#/',''));});}
 function keepHashValid(){const id=location.hash.replace(/^#\/?/,'');if(id?hidden.has(id):hidden.has('home'))history.replaceState(null,'','#/'+visible()[0].id);}
 const DEFAULT_ACCENT='indigo';
 const savedAccent=read(ACCENT_KEY,DEFAULT_ACCENT);applyAccent(accents.some(a=>a[0]===savedAccent)?savedAccent:DEFAULT_ACCENT);
 place();keepHashValid();
 // After the first load the deck has to be told its slides changed.
 function refresh(){
  const current=deck.getCurrentSlide();let target=current;
  if(hidden.has(current.id)){const at=all.indexOf(current);target=all.slice(at+1).find(s=>!hidden.has(s.id))||all.slice(0,at).reverse().find(s=>!hidden.has(s.id));}
  place();deck.sync();deck.slide(visible().indexOf(target));keepHashValid();updateNavigation();
 }
 // The PDF file on the site is the default deck. Any other choice prints what is on screen, so Save as PDF matches it.
 // Commission slide: every figure is an off-plan base value times the average rate chosen here.
 const DEFAULT_RATE=4,rates=[3,3.5,4,4.5,5,5.5,6];
 let rate=read(RATE_KEY,DEFAULT_RATE);if(!rates.includes(rate))rate=DEFAULT_RATE;
 let estimate=read(EST_KEY,false)===true;
 const money=v=>'AED '+(v>=1?v.toFixed(1):v.toFixed(2))+'B';
 const sum=list=>list.split(',').reduce((a,b)=>a+parseFloat(b),0);
 function applyRate(){
  const r=rate/100;
  document.querySelectorAll('[data-cm]').forEach(el=>{el.textContent=money(parseFloat(el.dataset.cm)*r);});
  document.querySelectorAll('[data-cm-sum]').forEach(el=>{el.textContent=money((sum(el.dataset.cmSum)+(estimate&&el.dataset.cmEstSum?sum(el.dataset.cmEstSum):0))*r);});
  // Unpublished cells: an estimate when switched on, otherwise "Not yet published".
  document.querySelectorAll('[data-cm-est]').forEach(el=>{const b=parseFloat(el.dataset.cmEst);el.innerHTML=estimate?'<strong>'+money(b*r)+'<i class="cm-est-tag">EST</i></strong><em>on AED '+b.toFixed(1)+'B off&#8209;plan, estimated</em>':'<em class="na">Not yet published</em>';});
  document.querySelectorAll('.cm-est-note').forEach(el=>{el.hidden=!estimate;});
  document.querySelectorAll('.cm-rate').forEach(el=>{el.textContent=rate+'%';});
 }
 applyRate();
 document.getElementById('deckPdf').addEventListener('click',e=>{if(root.dataset.accent===DEFAULT_ACCENT&&hidden.size===0&&rate===DEFAULT_RATE&&!estimate)return;e.preventDefault();window.print();});
 const button=document.getElementById('settingsToggle');
 const scrim=document.createElement('div');scrim.className='set-scrim';scrim.hidden=true;
 const sheet=document.createElement('aside');sheet.id='settingsSheet';sheet.className='set-sheet';sheet.hidden=true;sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Deck settings');
 sheet.innerHTML='<div class="set-head"><h2>Settings</h2><button type="button" class="set-close" aria-label="Close settings">×</button></div>'
  +'<h3>Primary colour</h3><div class="set-swatches" role="radiogroup" aria-label="Primary colour">'+accents.map(([id,name,color])=>'<button type="button" role="radio" data-accent-id="'+id+'" aria-label="'+name+'" title="'+name+'"><i style="background:'+color+'"></i><span>'+name+'</span></button>').join('')+'</div>'
  +'<h3>Commission rate</h3><label class="set-rate">Average off-plan commission<select id="setRate">'+rates.map(r=>'<option value="'+r+'">'+r+'%</option>').join('')+'</select></label>'
  +'<label class="set-rate">Estimate unpublished values<span class="set-toggle"><input type="checkbox" role="switch" id="setEst"><i class="set-switch"></i></span></label>'
  +'<div class="set-row"><h3>Slides</h3><button type="button" class="set-all">Show all</button></div><ul class="set-list"></ul>'
  +'<p class="set-foot">Saved in this browser only. The shared link is not changed; the PDF button follows these settings.</p>';
 document.body.append(scrim,sheet);
 const list=sheet.querySelector('.set-list');
 list.innerHTML=all.map((s,i)=>'<li><label><span class="set-n">'+String(i+1).padStart(2,'0')+'</span><span class="set-t"></span><input type="checkbox" role="switch" data-slide="'+s.id+'"><i class="set-switch"></i></label></li>').join('');
 list.querySelectorAll('.set-t').forEach((t,i)=>{t.textContent=titleOf(all[i]);});
 function paint(){
  const boxes=[...list.querySelectorAll('input')];
  boxes.forEach(b=>{b.checked=!hidden.has(b.dataset.slide);b.disabled=b.checked&&visible().length===1;b.closest('li').classList.toggle('off',!b.checked);});
  sheet.querySelectorAll('[data-accent-id]').forEach(b=>b.setAttribute('aria-checked',String(b.dataset.accentId===root.dataset.accent)));
  sheet.querySelector('.set-all').disabled=hidden.size===0;
 }
 function open(value){sheet.hidden=!value;scrim.hidden=!value;button.setAttribute('aria-expanded',String(value));if(value){paint();sheet.querySelector('.set-close').focus();}else if(document.activeElement&&sheet.contains(document.activeElement))button.focus();}
 button.addEventListener('click',()=>open(sheet.hidden));
 scrim.addEventListener('click',()=>open(false));
 sheet.querySelector('.set-close').addEventListener('click',()=>open(false));
 document.addEventListener('keydown',e=>{if(!sheet.hidden&&e.key==='Escape'){e.stopImmediatePropagation();e.preventDefault();open(false);}},true);
 document.addEventListener('fullscreenchange',()=>open(false));
 sheet.querySelector('.set-swatches').addEventListener('click',e=>{const b=e.target.closest('[data-accent-id]');if(!b)return;applyAccent(b.dataset.accentId);save(ACCENT_KEY,b.dataset.accentId);paint();});
 list.addEventListener('change',e=>{const id=e.target.dataset.slide;if(e.target.checked)hidden.delete(id);else hidden.add(id);save(HIDDEN_KEY,[...hidden]);refresh();paint();});
 const rateSelect=sheet.querySelector('#setRate');rateSelect.value=String(rate);
 rateSelect.addEventListener('change',()=>{rate=parseFloat(rateSelect.value);save(RATE_KEY,rate);applyRate();});
 const estBox=sheet.querySelector('#setEst');estBox.checked=estimate;
 estBox.addEventListener('change',()=>{estimate=estBox.checked;save(EST_KEY,estimate);applyRate();});
 sheet.querySelector('.set-all').addEventListener('click',()=>{hidden.clear();save(HIDDEN_KEY,[]);refresh();paint();});
})();
