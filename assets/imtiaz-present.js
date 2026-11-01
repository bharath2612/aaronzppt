// Imtiaz deck presenting: soft fade between slides, and a Present button that goes fullscreen without the site chrome.
(()=>{
 deck.on('ready',()=>deck.configure({transition:'fade',transitionSpeed:'fast'}));
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
