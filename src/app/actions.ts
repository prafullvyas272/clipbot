'use server';

import { GoogleGenAI } from "@google/genai";
import { saveScriptOnDB } from "./services/ScriptService";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { generateAudioFile } from "@/utils/utils";
import { downloadGeneratedAudio } from "@/utils/utils";
import { saveGeneratedAudioInDB } from "./services/TextToSpeechService";
import 'dotenv/config';
import RunwayML, { TaskFailedError } from "@runwayml/sdk";
import { saveVideoOnDB } from "./services/RunwayMLService";



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

  // Generate audio with prompt and eleven labs client
  const audio = await elevenlabs.textToSpeech.convert('ZthjuvLPty3kTMaNKVKb', {
    text: prompt,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });

  // Save the generated audio to s3
  const generatedAudioFilePath = await generateAudioFile(audio);
  console.log(generatedAudioFilePath)
  const savedAudio = await saveGeneratedAudioInDB(userId, prompt, generatedAudioFilePath);
  return savedAudio;
}

export async function downloadAudio() {
  return await downloadGeneratedAudio();
}

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
});

export async function generateVideo(userId: string, prompt: string) {
    
  // Create a new image-to-video task using the "gen4_turbo" model
  try {
    // TODO need to uncomment when we have credits
    // const video = await client.textToVideo
    //   .create({
    //     model: "veo3.1",
    //     promptText: prompt,
    //     ratio: "1280:720",
    //     duration: 4, // Allowed values: 4, 6, or 8
    //   })
    //   .waitForTaskOutput();

    const video = {
      videoFile: 'testVideoFileUrl',
      size: 10.2,
      duration: 4,
      thumbnail: 'testingThumbnail',
    }
    
    console.log("Video Generation complete:", video);
    const savedVideo = await saveVideoOnDB({userId, prompt, video});
    console.log("Video Saved on DB and AWS complete" , savedVideo);

    return savedVideo;
  } catch (error) {
    if (error instanceof TaskFailedError) {
      console.error("The video failed to generate.");
      console.error(error.taskDetails);
    } else {
      console.error(error);
    }
  }
}
