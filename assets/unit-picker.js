(()=>{
 const names={'1000000000':['Billions','1,000,000,000'],'1000000':['Millions','1,000,000'],'1000':['Thousands','1,000'],'1':['Dirhams','1']};
 const pickers=[];
 for(const id of ['marketUnit','processedUnit']){
  const select=document.getElementById(id);if(!select)continue;
  const wrap=document.createElement('div');wrap.className='unit-picker';select.before(wrap);wrap.append(select);select.hidden=true;
  const trigger=document.createElement('button');trigger.type='button';trigger.className='unit-trigger';trigger.id=id+'Trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
  const menu=document.createElement('div');menu.className='unit-menu';menu.id=id+'Menu';menu.role='listbox';menu.setAttribute('aria-label',select.getAttribute('aria-label'));menu.hidden=true;trigger.setAttribute('aria-controls',menu.id);
  const options=[...select.options].map(option=>{const button=document.createElement('button');button.type='button';button.className='unit-option';button.role='option';button.dataset.value=option.value;button.tabIndex=-1;button.innerHTML='<span class="unit-symbol">'+option.text+'</span><span class="unit-description"><strong>'+names[option.value][0]+'</strong><small>'+names[option.value][1]+' AED</small></span><span class="unit-check" aria-hidden="true">✓</span>';menu.append(button);button.addEventListener('click',()=>{select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));sync();close(true);});return button;});
  function sync(){trigger.innerHTML='<span>'+select.selectedOptions[0].text+'</span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';trigger.setAttribute('aria-label',select.getAttribute('aria-label')+': '+names[select.value][0]);options.forEach(b=>b.setAttribute('aria-selected',String(b.dataset.value===select.value)));}
  function close(focus=false){menu.hidden=true;trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus();}
  function open(){pickers.forEach(p=>p.close());menu.hidden=false;trigger.setAttribute('aria-expanded','true');options.find(b=>b.dataset.value===select.value).focus();}
  trigger.addEventListener('click',()=>menu.hidden?open():close(true));trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();e.stopPropagation();open();}});
  menu.addEventListener('keydown',e=>{const i=options.indexOf(document.activeElement);let next;if(e.key==='ArrowDown')next=(i+1)%options.length;if(e.key==='ArrowUp')next=(i-1+options.length)%options.length;if(e.key==='Home')next=0;if(e.key==='End')next=options.length-1;if(next!==undefined){e.preventDefault();e.stopPropagation();options[next].focus();}if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);}if(e.key==='Tab')close(true);});
  wrap.addEventListener('focusout',e=>{if(!wrap.contains(e.relatedTarget))close();});select.addEventListener('change',sync);wrap.append(trigger,menu);pickers.push({wrap,close,sync});sync();
 }
 document.addEventListener('pointerdown',e=>pickers.forEach(p=>{if(!p.wrap.contains(e.target))p.close();}));
 document.getElementById('reset')?.addEventListener('click',()=>queueMicrotask(()=>pickers.forEach(p=>{p.sync();p.close();})));
 document.querySelectorAll('.mode-toggle button').forEach(b=>b.addEventListener('click',()=>pickers.forEach(p=>p.close())));
})();
