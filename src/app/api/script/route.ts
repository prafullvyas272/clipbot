import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const scripts = await prisma.generatedScript.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(scripts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get scripts: " + (error as Error).message },
      { status: 500 }
    );
  }
}
