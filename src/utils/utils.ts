import fs from "fs";
import path from "path";
import formidable from "formidable";
import { uploadToS3 } from "@/app/services/AWSService";

// Disable Next.js built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function generateAudioFile(
  audio: Buffer | Uint8Array | string | ReadableStream<Uint8Array>
): Promise<string> {
  // Generate a unique filename
  const filename = `audio_${Date.now()}.mp3`;

  // If audio is a ReadableStream, convert it to a Buffer first
  let audioToUpload: Buffer | Uint8Array | string;
  if (
    typeof ReadableStream !== "undefined" &&
    audio instanceof ReadableStream
  ) {
    // Convert ReadableStream to Buffer
    const reader = audio.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
    while (!done) {
      const { value, done: isDone } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = isDone;
    }
    audioToUpload = Buffer.concat(chunks);
  } else {
    audioToUpload = audio as Buffer | Uint8Array | string;
  }

  // Upload the audio buffer to S3
  const s3Url = await uploadToS3({
    fileBuffer: audioToUpload,
    fileName: filename,
    contentType: "audio/mpeg",
  });

  return s3Url;
}


export async function downloadGeneratedAudio() {
  // Path to the audio file stored in storage/files/usera
  const audioFilePath = path.resolve(process.cwd(), 'storage', 'files', 'usera', 'audio.mp3');

  // Check if the file exists
  if (!fs.existsSync(audioFilePath)) {
    throw new Error('Audio file not found for usera.');
  }

  // Read the file as a buffer
  const audioBuffer = await fs.promises.readFile(audioFilePath);

  // Return the buffer (you may want to return a stream or set headers if using in an API route)
  return audioBuffer
}