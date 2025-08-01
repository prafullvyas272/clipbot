'use server';

import { GoogleGenAI } from "@google/genai";
import { saveScriptOnDB } from "./services/ScriptService";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { generateAudioFile } from "@/utils/utils";
import { downloadGeneratedAudio } from "@/utils/utils";
import 'dotenv/config';

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

export async function generateAudio(userId: string, prompt: string) {
  const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
  });

  const audio = await elevenlabs.textToSpeech.convert('ZthjuvLPty3kTMaNKVKb', {
    text: prompt,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });

  await generateAudioFile(audio);
  return audio;
}

export async function playAudio(audio) {
  await play(audio);
}

export async function downloadAudio() {
  return await downloadGeneratedAudio();
}

