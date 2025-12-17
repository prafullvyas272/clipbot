'use server'

import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

/**
 * 
 * @returns 
 */
export async function getAvailablePlans() {
  try {

    const plans = await prisma.stripeProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        prices: true,
      }
    });


    return plans;

    // return NextResponse.json(plans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get plans: " + (error as Error).message },
      { status: 500 }
    );
  }
}
