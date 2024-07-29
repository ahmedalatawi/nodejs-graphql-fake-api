import { Celebrity } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { Celebrity as ICelebrity } from "./types";

export const normalizeName = (name: string) => name.trim().toLocaleLowerCase();

export async function verifyAndCreateCelebrity(
  celebrity: ICelebrity,
  prisma: PrismaClient
): Promise<Celebrity> {
  const { name, dateOfBirth } = celebrity;

  const celebrityExists = await prisma.celebrity.findUnique({
    where: {
      name: normalizeName(name),
    },
  });

  if (celebrityExists) {
    throw new Error("Name already exists! Try adding another celebrity.");
  }

  return await prisma.celebrity.create({
    data: {
      ...celebrity,
      name: normalizeName(name),
      dateOfBirth: new Date(dateOfBirth),
    },
  });
}

export async function verifyAndUpdateCelebrity(
  celebrity: ICelebrity,
  prisma: PrismaClient
): Promise<Celebrity> {
  const { id: celebrityId, name, dateOfBirth } = celebrity;

  if (!celebrityId) {
    throw new Error("Celebrity ID is required to update a celebrity.");
  }

  const celebrityById = await prisma.celebrity.findUnique({
    where: {
      id: celebrityId,
    },
  });

  if (!celebrityById) {
    throw new Error(`Celebrity ID: ${celebrityId} not found.`);
  }

  const celebrityExists = await prisma.celebrity.findUnique({
    where: {
      name: normalizeName(name),
    },
  });

  if (celebrityExists && celebrityId !== celebrityExists.id) {
    throw new Error(`Name: ${name} already exists! Try another name.`);
  }

  const { id, ...rest } = celebrity;

  return await prisma.celebrity.update({
    where: {
      id,
    },
    data: {
      ...rest,
      name: normalizeName(name),
      dateOfBirth: new Date(dateOfBirth),
    },
  });
}
