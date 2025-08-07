import fs from "fs";
import path from "path";

/**
 * Saves the provided audio buffer as an mp3 file in storage/files/usera/
 * @param audio Buffer | Uint8Array - The audio data to save as mp3
 * @returns The file path where the audio was saved
 */
export async function generateAudioFile(
  audio: Buffer | Uint8Array | string | ReadableStream<Uint8Array>
): Promise<string> {
  const dir = path.resolve(process.cwd(), "public/storage/files/usera");
  // Ensure the directory exists
  await fs.promises.mkdir(dir, { recursive: true });

  // Generate a unique filename
  const filename = `audio_${Date.now()}.mp3`;
  const filePath = path.join(dir, filename);

  // If audio is a ReadableStream, convert it to a Buffer first
  let audioToWrite: Buffer | Uint8Array | string;
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
    audioToWrite = Buffer.concat(chunks);
  } else {
    audioToWrite = audio as Buffer | Uint8Array | string;
  }

  // Write the audio buffer to the file
  await fs.promises.writeFile(filePath, audioToWrite);

  return filePath;
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