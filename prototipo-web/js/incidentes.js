/* INCIDENTES Y EVIDENCIAS (HU-08, HU-15) */
async function huella(f){try{const b=await f.arrayBuffer(),h=await Logica.sha256Hex(b);return{h,ok:await Logica.verificarIntegridad(b,h)}}catch(e){return{h:"no disponible en este navegador",ok:false}}}
$("#isb").onclick=async()=>{const f=$("#ie").files[0];
 if(f){const v=Logica.validarEvidencia({type:f.type,size:f.size});if(!v.ok){toast(v.motivo);return}}
 const arch=f?{n:f.name,s:Math.round(f.size/1024),...await huella(f)}:null;
 const i=Logica.crearIncidente(S.incs,{tipo:$("#it").value,descripcion:$("#id").value,ubicacion:$("#iu").value,archivo:arch});
 if(!i){toast("Describe el incidente antes de enviar.");return}
 S.incs.unshift(i);mark("#c98a0b",110+Math.random()*400,60+Math.random()*290,i.id,"m-inc");$("#id").value="";$("#ie").value="";renderInc();stats();toast("Reporte "+i.id+" enviado");log(`Incidente ${i.id} reportado${f?" con evidencia":""}`)};
function renderInc(){const c=Logica.puedeClasificar(S.role);$("#ils").innerHTML=S.incs.map(i=>`<div class="item" style="align-items:flex-start"><div><b>${i.id} · ${esc(i.t)}</b><div class="mut">${esc(i.d)} — ${esc(i.u)}</div>${i.f?`<div class="hash">📎 ${esc(i.f.n)} (${i.f.s} KB)<br>SHA-256: ${esc(i.f.h.slice(0,32))}… ${i.f.ok?'<span class="tag ok">integridad verificada</span>':'<span class="tag MEDIO">sin verificar</span>'}</div>`:""}</div>${c?`<select data-r="${i.id}" style="width:auto"><option ${i.r=="BAJO"?"selected":""}>BAJO</option><option ${i.r=="MEDIO"?"selected":""}>MEDIO</option><option ${i.r=="ALTO"?"selected":""}>ALTO</option></select>`:`<span class="tag ${i.r}">${i.r}</span>`}</div>`).join("")||'<p class="mut">Aún no hay reportes.</p>';
 document.querySelectorAll("[data-r]").forEach(s=>s.onchange=()=>{Logica.clasificar(S.incs.find(x=>x.id==s.dataset.r),s.value);log(`Incidente ${s.dataset.r} clasificado ${s.value}`)})}
