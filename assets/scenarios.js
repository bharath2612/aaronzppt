(()=>{

const $=id=>document.getElementById(id);
const days=[30,60,90],advance=100000,basis=360;
const defaults={scBank:12,scFixed:0,scRate30:18,scRate60:15,scRate90:12};
const aed=n=>'AED '+new Intl.NumberFormat('en-AE',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Object.is(n,-0)?0:n);
const pct=n=>new Intl.NumberFormat('en-AE',{maximumFractionDigits:4}).format(n)+'%';
function read(id){const el=$(id),ok=el.value!==''&&el.checkValidity()&&Number.isFinite(Number(el.value));el.setAttribute('aria-invalid',String(el.value!==''&&!ok));return ok?Number(el.value):null;}
function update(){const bank=read('scBank'),fixed=read('scFixed');
 for(const d of days){const rate=read('scRate'+d);
  const fee=rate===null?null:rate*d/basis,earn=fee===null?null:advance*fee/100,cost=bank===null?null:advance*bank/100*d/basis;
  const left=earn===null||cost===null?null:earn-cost,net=left===null||fixed===null?null:left+fixed;
  const show=(key,value,format)=>{$(key+d).textContent=value===null?'—':format(value);};
  show('scFee',fee,pct);show('scEarn',earn,aed);show('scCost',cost,n=>aed(-n));show('scLeft',left,aed);show('scFix',fixed,aed);show('scNet',net,aed);
  $('scLeft'+d).classList.toggle('negative',left!==null&&left<0);$('scNet'+d).classList.toggle('negative',net!==null&&net<0);
 }
}
$('scenarioForm').addEventListener('input',update);$('scenarioForm').addEventListener('submit',e=>e.preventDefault());
$('scReset').addEventListener('click',()=>{for(const [key,val] of Object.entries(defaults))$(key).value=val;update();});update();

})();
