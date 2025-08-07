import prisma from '../../../lib/prisma';

export async function saveGeneratedAudioInDB(userId: string, text: string, audioFile: string) {
  try {
    const response = await prisma.generatedSpeech.create({
      data: {
        userId,
        text,
        audioFile,
      },
    });

    return response;
  } catch (error) {
    console.error('Error saving audio to DB:', error);
  }
}
