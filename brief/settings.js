// Deck settings: a side sheet to pick the primary colour and hide or show slides.
// Choices are saved in this browser only, so they never change what other viewers see.
(()=>{
 const HIDDEN_KEY='brief-hidden-slides',ACCENT_KEY='brief-accent';
 const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
 const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Storage can be blocked; the choice still applies for this visit. */}};
 const accents=[['orange','Orange','#ff6b35'],['blue','Blue','#6ea8ff'],['indigo','Indigo','#a5a6f6'],['amber','Amber','#f5b83d'],['slate','Slate','#a9b8cb']];
 const root=document.documentElement;
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
 const savedAccent=read(ACCENT_KEY,'orange');applyAccent(accents.some(a=>a[0]===savedAccent)?savedAccent:'orange');
 place();keepHashValid();
 // After the first load the deck has to be told its slides changed.
 function refresh(){
  const current=deck.getCurrentSlide();let target=current;
  if(hidden.has(current.id)){const at=all.indexOf(current);target=all.slice(at+1).find(s=>!hidden.has(s.id))||all.slice(0,at).reverse().find(s=>!hidden.has(s.id));}
  place();deck.sync();deck.slide(visible().indexOf(target));keepHashValid();updateNavigation();
 }
 const button=document.getElementById('settingsToggle');
 const scrim=document.createElement('div');scrim.className='set-scrim';scrim.hidden=true;
 const sheet=document.createElement('aside');sheet.id='settingsSheet';sheet.className='set-sheet';sheet.hidden=true;sheet.setAttribute('role','dialog');sheet.setAttribute('aria-label','Deck settings');
 sheet.innerHTML='<div class="set-head"><h2>Settings</h2><button type="button" class="set-close" aria-label="Close settings">×</button></div>'
  +'<h3>Primary colour</h3><div class="set-swatches" role="radiogroup" aria-label="Primary colour">'+accents.map(([id,name,color])=>'<button type="button" role="radio" data-accent-id="'+id+'" aria-label="'+name+'" title="'+name+'"><i style="background:'+color+'"></i><span>'+name+'</span></button>').join('')+'</div>'
  +'<div class="set-row"><h3>Slides</h3><button type="button" class="set-all">Show all</button></div><ul class="set-list"></ul>'
  +'<p class="set-foot">Saved in this browser only. The shared link and the PDF are not changed.</p>';
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
 sheet.querySelector('.set-all').addEventListener('click',()=>{hidden.clear();save(HIDDEN_KEY,[]);refresh();paint();});
})();
