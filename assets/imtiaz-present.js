// Imtiaz deck presenting: a Present button that goes fullscreen without the site chrome.
(()=>{
 const button=document.getElementById('presentToggle');if(!button)return;
 button.addEventListener('click',()=>{
  if(document.body.classList.contains('reader'))document.getElementById('viewToggle').click();
  if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.();
 });
 document.addEventListener('fullscreenchange',()=>{
  const on=!!document.fullscreenElement;
  document.body.classList.toggle('presenting',on);button.textContent=on?'Exit':'Present';
  requestAnimationFrame(()=>deck.layout());
 });
})();
