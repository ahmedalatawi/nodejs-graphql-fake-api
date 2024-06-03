import { Celebrity } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Celebrity as ICelebrity } from "./types";

export async function verifyAndCreateCelebrity(
  celebrity: ICelebrity,
  prisma: PrismaClient
): Promise<Celebrity> {
  const { name, dateOfBirth } = celebrity;

  const normalizeName = (name: string) => name.trim().toLocaleLowerCase();

  /**
   * Check if name already exists
   */
  const celebrityExists = await prisma.celebrity.findUnique({
    where: {
      name: normalizeName(name),
    },
  });

  if (celebrityExists) {
    throw new Error("Name already exists! Try adding another celebrity.");
  }

  /**
   * create celebrity
   */
  return await prisma.celebrity.create({
    data: {
      ...celebrity,
      name: normalizeName(name),
      dateOfBirth: new Date(dateOfBirth),
    },
  });
}
