// Investor deck currency switch. Every money figure carries both values in data-usd and data-aed.
(()=>{
 const select=document.getElementById('currency');const pdf=document.getElementById('deckPdf');if(!select)return;
 const valid=c=>c==='usd'||c==='aed'?c:null;
 const read=()=>{try{return localStorage.getItem('investor-currency');}catch{return null;}};
 const save=c=>{try{localStorage.setItem('investor-currency',c);}catch{/* Storage can be blocked; the switch still works for this visit. */}};
 function apply(currency){
  document.querySelectorAll('[data-usd]').forEach(el=>{el.textContent=el.dataset[currency];});
  document.documentElement.dataset.currency=currency;select.value=currency;
  pdf.href='aaronz-investor-'+currency+'.pdf';
  document.dispatchEvent(new Event('currencychange'));
  if(typeof deck!=='undefined'&&deck.isReady())deck.layout();
 }
 select.addEventListener('change',()=>{save(select.value);apply(select.value);select.blur();});
 apply(valid(new URLSearchParams(location.search).get('currency'))||valid(read())||'usd');
})();
