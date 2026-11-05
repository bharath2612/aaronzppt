// Funding simulation: compares equity only, our own debt and partner funding. All amounts are computed in USD.
(()=>{
 const root=document.getElementById('funding');if(!root)return;
 const PEG=3.6725,DAYS=60,LOSS=.0025,CUSHION=.1,PRE=20e6,BUILD=1e6,COSTS={74:1e6,150:1.5e6,300:2e6};
 const state={volume:300,rate:9,fee:15};
 const $=id=>document.getElementById(id);
 const money=n=>{
  const aed=document.documentElement.dataset.currency==='aed';const v=Math.abs(n)*(aed?PEG:1);const p=aed?'AED ':'$';
  const body=v>=1e9?(v/1e9).toFixed(2)+'B':v>=1e7?(v/1e6).toFixed(1)+'M':(v/1e6).toFixed(2)+'M';
  return (n<0?'−':'')+p+body.replace(/\.0+(?=[MB])/,'');
 };
 const pct=n=>n.toFixed(1)+'%';
 function model(volumeM,rate,fee){
  const volume=volumeM*1e6,capital=volume*DAYS/360,fees=capital*fee/100,loss=volume*LOSS,costs=COSTS[volumeM];
  const row=(equity,funded,r)=>{const cost=funded*r/100,profit=fees-cost-loss-costs,keep=PRE/(PRE+equity);return {equity,funded,keep:keep*100,cost,profit,share:profit*keep};};
  return {equityOnly:row(capital+BUILD,0,0),ownDebt:row(capital*CUSHION+BUILD,capital*(1-CUSHION),rate),partner:row(BUILD,capital,rate)};
 }
 const breakEven=(rate,fee)=>{const margin=(fee-rate)*DAYS/36000-LOSS;return margin>0?1e6/margin:null;};
 function render(){
  const m=model(state.volume,state.rate,state.fee);
  for(const [key,r] of Object.entries(m)){
   $(key+'Equity').textContent=money(r.equity);
   $(key+'Funded').textContent=r.funded?money(r.funded):'None';
   $(key+'Keep').textContent=pct(r.keep);
   $(key+'Cost').textContent=r.cost?money(r.cost):'None';
   $(key+'Profit').textContent=money(r.profit);
   $(key+'Share').textContent=money(r.share);
  }
  const be=breakEven(state.rate,state.fee);
  $('fundCall').textContent='Best case for dilution: founders keep '+pct(m.partner.keep)+(be?', and partner funding covers '+money(1e6)+' of costs at '+money(be)+' of advances a year.':'. At this fee and rate, partner funding never covers its costs.');
  root.querySelectorAll('[data-fund]').forEach(b=>{b.setAttribute('aria-pressed',String(state[b.dataset.fund]===+b.dataset.value));if(b.dataset.fund==='volume')b.textContent=money(+b.dataset.value*1e6);});
 }
 root.addEventListener('click',e=>{
  const b=e.target.closest('[data-fund]');if(!b)return;
  state[b.dataset.fund]=+b.dataset.value;render();
  // Mouse clicks give the arrow keys back to the deck; keyboard users keep focus.
  if(e.detail>0)b.blur();
 });
 document.addEventListener('currencychange',render);
 window.fundingModel=model;
 render();
})();
