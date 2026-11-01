// "How brokerages would select" slide: payout date and amount picker.
(()=>{
 const root=document.getElementById('select');if(!root)return;
 const commission=100000,usual=45,fees={0:1500,15:750,30:250,45:0};
 const dld=new Date(2026,10,3);
 const on=d=>{const x=new Date(dld);x.setDate(x.getDate()+d);return x.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'}).replace(',','');};
 const aed=n=>'AED '+n.toLocaleString('en-US');
 const $=id=>document.getElementById(id);
 let days=0,share=100;
 function render(){
  const full=days===usual||share===100;
  const part=full?commission:commission*share/100;
  const fee=full?fees[days]:fees[days]*share/100;
  $('selAmount').textContent=aed(part-fee);
  $('selDate').textContent=on(days);
  $('selRest').hidden=full;
  $('selRest').textContent=full?'':'then '+aed(commission-part)+' on '+on(usual);
  $('selFee').textContent=fee?'Early-payout fee '+aed(fee):'No fee on the usual date';
  $('selConfirm').hidden=false;$('selDone').hidden=true;
  root.querySelectorAll('[data-days]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.days===days)));
  root.querySelectorAll('[data-share]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.share===share)));
 }
 root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.days)days=+b.dataset.days;
  if(b.dataset.share)share=+b.dataset.share;
  if(b.dataset.days||b.dataset.share)render();
  if(b.id==='selConfirm'){b.hidden=true;$('selDone').hidden=false;}
  // Mouse clicks give the arrow keys back to the deck; keyboard users keep focus.
  if(e.detail>0)b.blur();
 });
 render();
})();
