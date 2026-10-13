const stages = [
 ['Dicing Saw','Corte de oblea','Monta la oblea sobre tape, alinea, corta e inspecciona los dados.','Dados separados','dicing-saw-trainer','#2765db'],
 ['Support & Substrate','Preparación del soporte','Explora leadframes y sustratos, sus geometrías y aplicaciones.','Soporte seleccionado','support-substrate-trainer','#7554c6'],
 ['Plasma inicial','Limpieza superficial','Prepara las superficies del soporte antes de colocar el dado.','Superficie preparada','plasma-initial-trainer','#078bac'],
 ['Die Attach','Colocación del dado','Dosifica adhesivo, transfiere el dado y ajusta su posición sobre el soporte.','Dado adherido','die-attach-trainer','#be7908'],
 ['Plasma post-attach','Preparación para Wire Bonding','Limpia las superficies de unión después de la adhesión del dado.','Pads y fingers limpios','plasma-wb-trainer','#008776'],
 ['Wire Bonding','Interconexión eléctrica','Enhebra el microalambre, localiza los pads y forma las conexiones.','Dado interconectado','wire-bonding-trainer','#247caf'],
 ['Moldeo','Encapsulado','Carga la tira, realiza el ciclo de moldeo y observa el ensamble encapsulado.','Tira encapsulada','moldeo-atp-trainer','#ad487c'],
 ['Trim / Form','Separación y formado','Recorta, forma los terminales y transfiere los componentes a la bandeja.','Componentes separados','trim-form-atp-trainer','#c36628'],
 ['Final Test','Verificación funcional','Utiliza instrumentos virtuales para medir, probar y clasificar dispositivos.','Componentes verificados','final-test-atp-trainer','#228255']
];
const key='atp-hub:last-stage';

// AQUÍ ESTÁ EL CAMBIO CLAVE: Ruta local en lugar de https://...
const url=s=>`./${s[4]}/index.html`;

const num=i=>String(i+1).padStart(2,'0');
const imageDescriptions = [
 'Ilustración de una cuchilla de dicing sobre una oblea cuadriculada montada en un aro con tape.',
 'Ilustración de un leadframe de cobre y un sustrato PCB antes del ensamble.',
 'Ilustración de limpieza con plasma de un leadframe sin dados montados.',
 'Ilustración de una herramienta de vacío colocando un dado sobre el leadframe.',
 'Ilustración de limpieza con plasma de un leadframe con dados adheridos.',
 'Ilustración de la formación de un lazo de microalambre entre el dado y el leadframe.',
 'Ilustración de un molde abierto con una tira de componentes encapsulados.',
 'Ilustración del troquelado y formado de terminales de un componente.',
 'Ilustración de un componente en un banco de prueba con instrumentos de medición.'
];
document.getElementById('stages').innerHTML=stages.map((s,i)=>`<article style="--accent:${s[5]}" id="stage-${i}"><figure class="module-visual"><img src="images/stage-${num(i)}.png" alt="${imageDescriptions[i]}" width="1536" height="1024" loading="${i<3?'eager':'lazy'}" decoding="async"><figcaption>ETAPA ${num(i)}</figcaption></figure><div class="card-top"><span class="number">${num(i)}</span><span class="category">${s[1]}</span></div><h3>${s[0]}</h3><p>${s[2]}</p><div class="result"><small>RESULTADO</small><span>${s[3]}</span></div><a data-stage="${i}" href="${url(s)}" target="_blank" rel="noopener" aria-label="Abrir simulador ${s[0]}" >Abrir simulador <span aria-hidden="true">↗</span></a><span class="last" hidden>Última etapa abierta</span></article>`).join('');
document.getElementById('route').innerHTML='<ol class="visual-flow">'+stages.map((s,i)=>`<li><a href="#stage-${i}" aria-label="Ir a etapa ${i+1}: ${s[0]}"><img src="images/stage-${num(i)}.png" alt="" width="1536" height="1024"><b>PASO ${num(i)}</b><strong>${s[0]}</strong><small>${s[3]}</small></a>${i<8?'<span class="flow-arrow" aria-hidden="true">→</span>':''}</li>`).join('')+'</ol>';
function update(i){if(!Number.isInteger(i)||i<0||i>=stages.length)return;const s=stages[i];const a=document.getElementById('continue');a.href=url(s);a.dataset.stage=String(i);document.getElementById('continue-label').textContent='VOLVER A LA ÚLTIMA ETAPA';document.getElementById('continue-title').textContent=`${num(i)} · ${s[0]} ↗`;document.querySelectorAll('.last').forEach((el,n)=>el.hidden=n!==i);}
document.getElementById('continue').dataset.stage='0';
try{const saved=localStorage.getItem(key);if(saved!==null)update(Number(saved));}catch{}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-stage]');if(!a)return;const i=Number(a.dataset.stage);try{localStorage.setItem(key,String(i));}catch{}update(i);});