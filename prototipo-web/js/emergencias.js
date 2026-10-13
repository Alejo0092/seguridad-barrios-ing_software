/* EMERGENCIAS Y ALERTAS (HU-09, HU-14) */
$("#pb").onclick=()=>$("#cf").classList.remove("hide");$("#cn").onclick=()=>$("#cf").classList.add("hide");
function step(t,c){const l=document.createElement("li");l.className=c||"";l.textContent=t;$("#steps").append(l)}
$("#cy").onclick=async()=>{$("#cf").classList.add("hide");$("#steps").innerHTML="";const t0=performance.now();
 step("Obteniendo tu ubicación…");await sleep(500);step("Emergencia registrada","ok");await sleep(400);
 const a=Logica.crearAlerta(S.alerts,new Date().toLocaleTimeString("es-CO"));S.alerts.unshift(a);step(`Alerta ${a.id} creada · nivel ALTO`,"ok");
 const fail=Math.random()<.5;
 const r=await Logica.enviarConReintentos(async n=>{await sleep(500);return !(fail&&n==0)},3,n=>step(`Envío falló · reintento ${n} de 3`,"bad"));
 const s=((performance.now()-t0)/1000).toFixed(1);
 if(r.ok)step(`SMS y push enviados al responsable en ${s} s (meta: menos de 5 s)`,"ok");else step("No se pudo notificar tras 3 reintentos: la alerta queda registrada y pendiente de envío","bad");
 mark("#d64545",120+Math.random()*380,60+Math.random()*290,a.id,"m-al");renderAl();stats();notify(r.ok?"🚨 Alerta "+a.id+" enviada al responsable":"⚠️ Alerta "+a.id+" registrada, notificación pendiente");log("Emergencia activada ("+a.id+")")};
function renderAl(){const c=Logica.puedeClasificar(S.role);$("#als").innerHTML=S.alerts.length?S.alerts.map(a=>`<div class="item"><div><b>${a.id}</b> <span class="tag ${a.e}">${a.e.replace("_"," ")}</span><div class="mut">${a.h} · nivel ${a.n}</div></div>${c&&a.e!="ATENDIDA"?`<button class="btn sm" data-a="${a.id}">${a.e=="ACTIVA"?"Atender":"Cerrar"}</button>`:""}</div>`).join(""):'<p class="mut">Sin alertas activas.</p>';
 document.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const a=S.alerts.find(x=>x.id==b.dataset.a);a.e=Logica.siguienteEstado(a.e);log(`Alerta ${a.id} → ${a.e}`);renderAl();stats()})}
