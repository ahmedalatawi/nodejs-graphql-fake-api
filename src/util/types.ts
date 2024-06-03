import { PrismaClient } from "@prisma/client";

export interface Celebrity {
  id: string;
  name: string;
  bio: string;
  dateOfBirth: string;
  photoUrl: string;
}

export interface GraphQLContext {
  prisma: PrismaClient;
}
