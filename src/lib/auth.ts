'use server'

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    return user;
  } catch {
    return null;
  }
}
