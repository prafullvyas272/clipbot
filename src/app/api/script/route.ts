import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId } = await request.json()

    const scripts = await prisma.generatedScript.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(scripts);
  } catch (error) {
    throw new Error("Failed to get scripts: " + (error as Error).message);
  }
}
