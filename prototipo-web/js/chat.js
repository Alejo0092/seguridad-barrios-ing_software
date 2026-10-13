/* CHAT COMUNITARIO (HU-04) */
function renderChat(){$("#msgs").innerHTML=S.msgs.map(m=>`<div class="bub ${m.me?"me":""} ${m.av?"av":""}"><small>${m.av?"📢 Aviso · ":""}${esc(m.u)}</small>${esc(m.t)}</div>`).join("");$("#msgs").scrollTop=1e5}
async function send(){const t=$("#mi").value.trim();if(!t)return;S.msgs.push({u:$("#who").textContent,t,me:1,av:$("#av").checked});$("#mi").value="";renderChat();log("Mensaje enviado al chat");
 await sleep(1500);S.msgs.push({u:"Carlos (Casa 14)",t:["Gracias por avisar, estaré pendiente.","Yo también lo vi, ya lo reporté.","Recibido, vecino."][Math.random()*3|0],me:0});renderChat()}
$("#ms").onclick=send;$("#mi").onkeydown=e=>e.key=="Enter"&&send();
