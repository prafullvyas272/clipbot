import prisma from "../../../lib/prisma";

export async function saveScriptOnDB({ userId, prompt, content }: { userId: string, prompt: string, content: string }) {
  try {
    const script = await prisma.generatedScript.create({
      data: {
        userId,
        prompt,
        content,
      },
    });
    return script;
  } catch (error) {
    throw new Error("Failed to save script: " + (error as Error).message);
  }
}