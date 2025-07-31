'use server';

import { GoogleGenAI } from "@google/genai";

export async function generateScript(prompt: string) {
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

  // ✅ Extract the plain text content
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

  // ✅ Return only plain serializable data
  return JSON.parse(JSON.stringify(text));
}
