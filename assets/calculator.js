(()=>{

let mode="market";
const defaults={market:13.59,share:1,processed:100,fee:3,rate:6.59,days:60,advance:90,charges:0,basis:360};
const $=id=>document.getElementById(id);
function calculate(v){const captured=v.mode==='processed'?v.processed:v.market*v.share/100,volume=captured*v.advance/100,revenue=volume*v.fee/100,interest=volume*v.rate/100*v.days/v.basis,charges=volume*v.charges/100;return{captured,volume,revenue,interest,charges,retained:revenue-interest-charges,netRate:v.fee-v.rate*v.days/v.basis-v.charges,breakEven:v.rate*v.days/v.basis+v.charges};}
const number=n=>new Intl.NumberFormat('en-AE',{notation:'compact',compactDisplay:'short',maximumFractionDigits:2}).format(Object.is(n,-0)?0:n);
const money=n=>'AED '+number(n);
const pct=n=>new Intl.NumberFormat('en-AE',{maximumFractionDigits:2}).format(n)+'%';
function update(){const v={mode};let valid=true;for(const key of Object.keys(defaults)){if(mode==='market'&&key==='processed'||mode==='processed'&&(key==='market'||key==='share'))continue;const el=$(key);v[key]=Number(el.value);if(el.value===''||!Number.isFinite(v[key])||!el.checkValidity())valid=false;}
 $('error').textContent=valid?'':'Enter valid values in every field. Percentages must be between 0 and 100.';$('results').hidden=!valid;if(!valid)return;
 if(mode==='market')v.market*=Number($('marketUnit').value);else v.processed*=Number($('processedUnit').value);
 const r=calculate(v);if(mode==='market')$('marketHint').textContent=money(v.market)+' per year';$('retained').textContent=number(r.retained);$('total').textContent=money(r.retained);$('total').classList.toggle('negative',r.retained<0);$('perDeal').textContent=money(r.netRate*1000);$('retention').textContent=r.revenue>0?pct(r.retained/r.revenue*100):'—';
 for(const [id,val] of Object.entries({captured:r.captured,volume:r.volume,revenue:r.revenue,interest:-r.interest,bankCharges:-r.charges}))$(id).textContent=money(val);
 const bankFraction=r.revenue>0?(r.interest+r.charges)/r.revenue:0;$('bankBar').style.width=(Math.min(1,bankFraction)*100)+'%';$('ourBar').style.width=(r.revenue>0?Math.max(0,1-bankFraction)*100:0)+'%';$('bankLegend').textContent='Bank cost: '+(r.revenue>0?pct(bankFraction*100)+' of fees':money(r.interest+r.charges));$('ourLegend').textContent='Retained: '+(r.revenue>0?pct(r.retained/r.revenue*100):money(r.retained));
 $('explain').textContent='Bank interest over '+v.days+' days is '+pct(v.rate*v.days/v.basis)+' of advances. Your fee must exceed '+pct(r.breakEven)+' to cover the modeled bank costs. '+(r.retained<0?'This scenario loses money before operating costs. ':'')+'Assumes interest on the gross advance for the full duration and an agreement allowing your company to retain the fee balance.';
}
function setMode(next){mode=next;const direct=mode==='processed';$('marketField').hidden=direct;$('shareField').hidden=direct;$('processedField').hidden=!direct;$('marketMode').setAttribute('aria-pressed',String(!direct));$('processedMode').setAttribute('aria-pressed',String(direct));$('capturedLabel').textContent=direct?'Annual commission processed':'Commission value captured';$('formula').textContent='Model: '+(direct?'annual commission processed':'annual market × share')+' × advance rate × (customer fee − annual bank rate × days ÷ year basis − bank charges).';update();}
$('marketMode').addEventListener('click',()=>setMode('market'));$('processedMode').addEventListener('click',()=>setMode('processed'));
$('form').addEventListener('input',update);$('form').addEventListener('change',update);$('form').addEventListener('submit',e=>e.preventDefault());$('reset').addEventListener('click',()=>{$('marketUnit').value='1000000000';$('processedUnit').value='1000000';for(const [key,val] of Object.entries(defaults))$(key).value=val;setMode('market');});update();

})();