import prisma from "../../lib/prisma";

export async function saveUserToDB(userData: {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  image?: string | null;
  provider?: string;
  providerAccountId?: string;
}) {
  if (!userData.email) return;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: userData.name ?? '',
        password: '',
        email: userData.email,
        image: userData.image,
        provider: userData.provider,
        providerAccountId: userData.providerAccountId,
      },
    });
  }
}
