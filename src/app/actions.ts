'use server';

import { GoogleGenAI } from "@google/genai";
import { saveScriptOnDB } from "./services/ScriptService";

export async function generateScript(userId: string, prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: String(prompt),
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No output";
  const content = JSON.parse(JSON.stringify(text));
  await saveScriptOnDB({ userId, prompt, content });
  
  return content;
}
