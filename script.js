const modal=document.getElementById("modal"),title=document.getElementById("modalTitle"),desc=document.getElementById("modalDesc"),input=document.getElementById("input"),result=document.getElementById("result");let current="";
const tools={
prompt:["Generador de prompts","Describe lo que quieres conseguir y te damos una plantilla de prompt más completa."],
summary:["Resumidor de textos","Pega un texto y crea un resumen rápido basado en sus ideas principales."],
rewrite:["Mejorador de texto","Indica el texto y el estilo que buscas para crear una versión mejor estructurada."],
email:["Generador de emails","Escribe el objetivo del email y genera una estructura profesional editable."],
ideas:["Generador de ideas","Introduce un tema y obtén una lista de ideas para desarrollarlo."],
image:["Prompt para imágenes","Describe la imagen y crea una plantilla detallada para un generador visual."],
code:["Explicador de código","Pega código y prepara una solicitud clara para que una IA lo explique."],
plan:["Planificador rápido","Introduce un objetivo y genera una estructura de tareas y pasos."],
titles:["Generador de títulos","Introduce el tema y genera diferentes enfoques de títulos."],
translate:["Asistente de traducción","Indica idioma de origen, destino y texto para preparar una traducción contextual."]
};
function openTool(id){current=id;title.textContent=tools[id][0];desc.textContent=tools[id][1];input.value="";result.classList.remove("show");result.textContent="";modal.classList.add("show")}
function closeTool(){modal.classList.remove("show")}
modal.addEventListener("click",e=>{if(e.target===modal)closeTool()});
function runTool(){
 const x=input.value.trim();if(!x){result.textContent="Escribe algo primero.";result.classList.add("show");return}
 let out="";
 if(current==="summary"){let s=x.replace(/\s+/g," ").trim();let sentences=s.split(/(?<=[.!?])\s+/);out=(sentences.length>3?sentences.slice(0,3):sentences).join(" ")+"\n\nNota: esta V1 ofrece un resumen local básico. Puedes conectar una API de IA para un resumen semántico avanzado."}
 else if(current==="prompt"){out=`Actúa como un experto en ${x}.\n\nObjetivo: ${x}\nContexto: [añade aquí el contexto]\nPúblico: [indica el público]\nFormato de respuesta: [indica el formato]\nRestricciones: [indica límites o requisitos]\n\nAntes de responder, comprueba que has entendido el objetivo y entrega una respuesta clara y accionable.`}
 else if(current==="rewrite"){out=`Reescribe el siguiente texto sobre "${x}" para que sea más claro, natural y profesional. Mantén el significado original, elimina repeticiones y mejora la estructura. Devuelve solo la versión final.`}
 else if(current==="email"){out=`Asunto: ${x}\n\nHola [nombre],\n\nTe escribo para ${x.toLowerCase()}.\n\n[Incluye aquí los detalles principales]\n\nQuedo a tu disposición para cualquier duda.\n\nUn saludo,\n[Nombre]`}
 else if(current==="ideas"){out=`Ideas para: ${x}\n\n1. Guía para principiantes\n2. Lista de errores frecuentes\n3. Comparativa de opciones\n4. Caso práctico\n5. Tutorial paso a paso\n6. Preguntas frecuentes\n7. Checklist descargable\n8. Vídeo corto explicativo\n\nPuedes ampliar cada idea con una IA generativa.`}
 else if(current==="image"){out=`Prompt visual:\n"${x}. Fotografía cinematográfica, composición profesional, iluminación cuidada, alto nivel de detalle, profundidad de campo, estética moderna, formato 16:9."`}
 else if(current==="code"){out=`Prompt para IA:\n\n"Explica este código relacionado con ${x}. Describe qué hace, qué partes son importantes, posibles errores y cómo mejorarlo. Explica los conceptos con ejemplos sencillos."`}
 else if(current==="plan"){out=`PLAN DE ACCIÓN: ${x}\n\n1. Definir objetivo y resultado final\n2. Dividir el objetivo en tareas\n3. Priorizar las tareas importantes\n4. Ejecutar la primera tarea\n5. Revisar el progreso\n6. Ajustar y completar\n\nPuedes convertir cada paso en una tarea concreta.`}
 else if(current==="titles"){out=`Títulos para: ${x}\n\n• Guía completa para ${x}\n• Todo lo que necesitas saber sobre ${x}\n• 7 cosas que nadie te cuenta sobre ${x}\n• Cómo empezar con ${x} desde cero\n• ${x}: errores que debes evitar\n• La forma más sencilla de entender ${x}`}
 else if(current==="translate"){out=`Solicitud de traducción:\n\n"Traduce el siguiente texto de forma natural al idioma indicado. Mantén el significado, adapta expresiones culturales cuando sea necesario y conserva el tono original.\n\nTexto: ${x}"`}
 result.textContent=out;result.classList.add("show");
}
document.getElementById("search").addEventListener("input",e=>filter(e.target.value));
document.querySelectorAll(".cat").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter(document.getElementById("search").value,b.dataset.cat)}));
function filter(q="",cat="all"){document.querySelectorAll(".card").forEach(c=>{let ok=(cat==="all"||c.dataset.cat===cat)&&c.dataset.name.toLowerCase().includes(q.toLowerCase());c.style.display=ok?"block":"none"})}
