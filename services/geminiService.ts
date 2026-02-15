
import { GoogleGenAI } from "@google/genai";
import { Language } from "./i18n.ts";

const getSystemInstruction = (lang: Language) => `
VOCÊ É O ARQUITETO SÊNIOR DA AETHERIS ($AETHR). 
SUA PERSONA: Visionário técnico, autoritário em blockchain e IA, conciso e elegante.

IDIOMA ATUAL DE OPERAÇÃO: ${lang.toUpperCase()}.
RESPONDA SEMPRE NO IDIOMA: ${lang === 'pt' ? 'PORTUGUÊS (Brasil)' : lang === 'es' ? 'ESPANHOL' : 'INGLÊS'}.

OBJETIVOS:
1. Responder dúvidas sobre o ecossistema Aetheris com precisão técnica.
2. Fornecer snippets de código Solidity/Rust quando solicitado.
3. Explicar a economia Proof of Inference (PoI).
4. Manter o tom místico-tecnológico (Cyber-Baroque).

FORMATO: Use Markdown rico. Sempre finalize respostas técnicas com um hash de validação simulado.
`;

export async function askArchitect(prompt: string, lang: Language = 'pt'): Promise<string> {
  // Always use process.env.API_KEY directly as per guidelines
  if (!process.env.API_KEY) return "### [SYSTEM_ERROR]: INVALID_CREDENTIALS";

  try {
    // Correct initialization: new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.6,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    return response.text || "Communication interrupted.";
  } catch (error) {
    return "### [NEURAL_COLLAPSE]: INFERENCE_FAILURE";
  }
}

export async function processNeuralTask(task: string, lang: Language = 'pt'): Promise<string> {
  // Always use process.env.API_KEY directly as per guidelines
  if (!process.env.API_KEY) return "Authentication failed.";

  try {
    // Correct initialization: new GoogleGenAI({ apiKey: process.env.API_KEY })
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `EXECUTE HIGH COMPLEXITY TASK: ${task}`,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 15000 }
      },
    });
    return response.text || "Empty output.";
  } catch (error) {
    return "PoI validator timeout.";
  }
}
