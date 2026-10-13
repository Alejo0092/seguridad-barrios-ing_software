/* ESCENA INTERACTIVA DEL LOGIN */
(function(){const sc=$("#scene"),cm=$("#cm"),chip=$("#chip"),hs=[...document.querySelectorAll(".house")];
 function upd(m){const n=hs.filter(h=>h.classList.contains("on")).length;chip.textContent=m||(n?`${n} de ${hs.length} vecinos conectados · la cámara está vigilando`:"Toca las casas para encender las luces del barrio")}
 hs.forEach(h=>{h.onclick=()=>{h.classList.toggle("on");upd(h.classList.contains("on")?h.dataset.t+" se conectó al barrio":h.dataset.t+" se desconectó")};
  h.onmouseenter=()=>upd(h.dataset.t);h.onmouseleave=()=>upd()});
 cm.parentNode.style.cursor="pointer";cm.parentNode.onclick=()=>upd("📹 Cámara de la esquina: grabando en vivo");
 $("#login").addEventListener("pointermove",e=>{const r=cm.getBoundingClientRect(),a=Math.atan2(e.clientY-(r.top+r.height/2),e.clientX-(r.left+r.width/2))*180/Math.PI;
  const d=Math.abs(a)>90?(a>0?180-a:-180-a):a;cm.setAttribute("transform","rotate("+Math.max(-35,Math.min(35,Math.abs(a)>90?(a>0?-(180-a):(180+a)):a))+")")})})();
