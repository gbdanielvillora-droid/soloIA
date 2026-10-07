export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message, tool } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Falta el mensaje" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "La API de OpenAI no está configurada"
      });
    }

    const instructions = {
      prompt: "Actúa como un experto en creación y optimización de prompts. Crea prompts profesionales, detallados y fáciles de usar.",
      summary: "Resume el texto destacando las ideas principales. Sé claro y conciso.",
      rewrite: "Reescribe el texto para que sea más claro, natural, profesional y bien estructurado, manteniendo su significado.",
      email: "Crea un email profesional, natural y bien estructurado según el objetivo indicado.",
      ideas: "Genera ideas originales, prácticas y variadas sobre el tema indicado.",
      image: "Crea un prompt profesional y detallado para generar una imagen con IA.",
      code: "Explica el código de forma sencilla, indicando qué hace, posibles errores y mejoras.",
      plan: "Crea un plan de acción práctico, ordenado y realista.",
      titles: "Genera títulos atractivos, variados y profesionales.",
      translate: "Traduce el contenido de forma natural, manteniendo el significado y el tono original."
    };

    const instruction =
      instructions[tool] || "Responde de forma útil, clara y profesional.";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions: instruction,
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({
        error: data?.error?.message || "Error de OpenAI"
      });
    }

    const output =
      data.output_text ||
      data.output
        ?.flatMap(item => item.content || [])
        ?.filter(item => item.type === "output_text")
        ?.map(item => item.text)
        ?.join("") ||
      "No se recibió respuesta.";

    return res.status(200).json({
      result: output
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
