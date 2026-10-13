/* CÁMARAS (HU-03) */
$("#cams").innerHTML=CAMS.map((c,i)=>`<div class="card" style="padding:8px"><div class="cam ${c[1]?"":"off"}"><svg viewBox="0 0 100 60"><path d="M0 45h100M20 45V25h25v20M60 45V15h20v30" stroke="#fff" fill="none"/></svg><div class="b tp"><span class="${c[1]?"live":""}">${c[1]?"● EN VIVO":"SIN CONEXIÓN"}</span><span class="ts"></span></div><div class="b bt"><span>${c[0]}</span><span>CAM-0${i+1}</span></div></div></div>`).join("");
setInterval(()=>document.querySelectorAll(".ts").forEach(e=>e.textContent=new Date().toLocaleTimeString("es-CO")),1000);
/* marcadores de cámaras en el mapa */
CAMS.forEach((c,i)=>mark(c[1]?"#2a5bd7":"#8a949e",POS[i][0],POS[i][1],"CAM-0"+(i+1),"m-cam"));
