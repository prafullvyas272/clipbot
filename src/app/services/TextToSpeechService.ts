import path from 'path';
import prisma from '../../../lib/prisma';

export async function saveGeneratedAudioInDB(userId: string, text: string, audioFile: string) {
  try {
    // Normalize path and extract relative part from /public
    const publicDir = path.join(process.cwd(), 'public');
    const relativePath = '/' + path.relative(publicDir, audioFile).replace(/\\/g, '/');

    const response = await prisma.generatedSpeech.create({
      data: {
        userId,
        text,
        audioFile: relativePath, // ✅ Save relative path
      },
    });

    return response;
  } catch (error) {
    console.error('Error saving audio to DB:', error);
  }
}
