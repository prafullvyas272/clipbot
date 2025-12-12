
import prisma from "../../../lib/prisma";

export async function saveVideoOnDB({ userId, prompt, video }: { userId: string, prompt: string, video: any|null }) {
  try {

    // Store Video on AWS Cloud

    

    // Get the data from aws and store these
    const videoRecord = await prisma.video.create({
      data: {
        userId,
        title: prompt,
        videoFile: video.videoFile, // assuming video has these properties
        size: video.size,
        duration: video.duration,
        thumbnail: video.thumbnail, // optional: include if available
      },
    });


    return videoRecord;
  } catch (error) {
    throw new Error("Failed to save script: " + (error as Error).message);
  }
}