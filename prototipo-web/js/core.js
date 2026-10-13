/* NÚCLEO: estado, utilidades, login, navegación, notificaciones, historial (HU-01, HU-05, HU-11, HU-13) */
const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const {ROLES,esc}=Logica,NAV=Logica.NAV;
const S={role:"",alerts:[],incs:[],logs:[],n:0,msgs:[{u:"Marta (Torre 2)",t:"Buenas noches, vecinos. ¿Alguien más vio el carro blanco en la entrada?",me:0},{u:"Administración",t:"Recordatorio: la reunión del barrio es el sábado a las 4 p.m.",me:0,av:1}]};
const CAMS=[["Portería principal",1],["Parque central",1],["Parqueadero",1],["Calle 12 (sur)",0]];
const POS=[[90,70],[330,60],[520,200],[230,330]];
function toast(t){const d=document.createElement("div");d.textContent=t;$("#toast").append(d);setTimeout(()=>d.remove(),4000)}
function log(a){S.logs.unshift({t:new Date().toLocaleTimeString("es-CO"),u:$("#who").textContent,a});renderLog()}
function notify(t){S.n++;$("#nc").textContent=S.n;$("#nc").classList.remove("hide");toast(t)}
function renderLog(){$("#hl").innerHTML=S.logs.map(l=>`<div class="item"><span>${esc(l.a)}</span><span class="mut">${esc(l.u)} · ${l.t}</span></div>`).join("")||'<p class="mut">Sin actividad todavía.</p>'}
function show(id){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("hide",v.id!="v-"+id));document.querySelectorAll(".nv").forEach(b=>b.classList.toggle("on",b.dataset.id==id));$("#ttl").textContent=NAV.find(n=>n[0]==id)[1]}
function enter(){const r=$("#rl").value;S.role=r;$("#login").classList.add("hide");$("#app").classList.remove("hide");
 $("#who").textContent=$("#em").value.split("@")[0];$("#rtag").textContent=ROLES[r];
 $("#nav").innerHTML=Logica.modulosPorRol(r).map(n=>`<button class="nv" data-id="${n[0]}"><span>${n[2]}</span>${n[1]}</button>`).join("");
 document.querySelectorAll(".nv").forEach(b=>b.onclick=()=>show(b.dataset.id));
 $("#avl").classList.toggle("hide",r!="adm");show("mapa");log("Inicio de sesión como "+ROLES[r]);stats();renderChat();renderAl()}
$("#go").onclick=enter;$("#out").onclick=()=>{log("Cierre de sesión");$("#app").classList.add("hide");$("#login").classList.remove("hide")};
$("#bell").onclick=()=>{S.n=0;$("#nc").classList.add("hide")};
