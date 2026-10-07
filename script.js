const modal = document.getElementById("modal");
const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDesc");
const input = document.getElementById("input");
const result = document.getElementById("result");

let current = "";

const tools = {
  prompt: [
    "Generador de prompts",
    "Describe lo que quieres conseguir y te damos una plantilla de prompt más completa."
  ],
  summary: [
    "Resumidor de textos",
    "Pega un texto y crea un resumen rápido basado en sus ideas principales."
  ],
  rewrite: [
    "Mejorador de texto",
    "Indica el texto y el estilo que buscas para crear una versión mejor estructurada."
  ],
  email: [
    "Generador de emails",
    "Escribe el objetivo del email y genera una estructura profesional editable."
  ],
  ideas: [
    "Generador de ideas",
    "Introduce un tema y obtén una lista de ideas para desarrollarlo."
  ],
  image: [
    "Prompt para imágenes",
    "Describe la imagen y crea una plantilla detallada para un generador visual."
  ],
  code: [
    "Explicador de código",
    "Pega código y prepara una solicitud clara para que una IA lo explique."
  ],
  plan: [
    "Planificador rápido",
    "Introduce un objetivo y genera una estructura de tareas y pasos."
  ],
  titles: [
    "Generador de títulos",
    "Introduce el tema y genera diferentes enfoques de títulos."
  ],
  translate: [
    "Asistente de traducción",
    "Indica idioma de origen, destino y texto para preparar una traducción contextual."
  ]
};

function openTool(id) {
  current = id;

  title.textContent = tools[id][0];
  desc.textContent = tools[id][1];

  input.value = "";
  result.textContent = "";
  result.classList.remove("show");

  modal.classList.add("show");
}

function closeTool() {
  modal.classList.remove("show");
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeTool();
  }
});

async function runTool() {
  const x = input.value.trim();

  if (!x) {
    result.textContent = "Escribe algo primero.";
    result.classList.add("show");
    return;
  }

  result.textContent = "LOCO IA está pensando...";
  result.classList.add("show");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: x,
        tool: current
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "No se pudo generar la respuesta."
      );
    }

    result.textContent = data.result;
    result.classList.add("show");

  } catch (error) {
    console.error(error);

    result.textContent =
      "Ha ocurrido un error al conectar con LOCO IA. Inténtalo de nuevo.";

    result.classList.add("show");
  }
}

document
  .getElementById("search")
  .addEventListener("input", function (e) {
    filter(e.target.value);
  });

document.querySelectorAll(".cat").forEach(function (button) {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".cat")
      .forEach(function (item) {
        item.classList.remove("active");
      });

    button.classList.add("active");

    filter(
      document.getElementById("search").value,
      button.dataset.cat
    );
  });
});

function filter(q = "", cat = "all") {
  document.querySelectorAll(".card").forEach(function (card) {
    const categoryOK =
      cat === "all" || card.dataset.cat === cat;

    const nameOK =
      card.dataset.name
        .toLowerCase()
        .includes(q.toLowerCase());

    card.style.display =
      categoryOK && nameOK ? "block" : "none";
  });
}
