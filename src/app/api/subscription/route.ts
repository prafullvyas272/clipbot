import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

/**
 * 
 * @param request Method to get the available plans
 * @returns 
 */
export async function GET(request: Request) {
  try {

    const plans = await prisma.stripeProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get plans: " + (error as Error).message },
      { status: 500 }
    );
  }
}
