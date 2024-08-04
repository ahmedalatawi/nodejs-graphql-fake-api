import { PrismaClient } from "@prisma/client";

export interface Celebrity {
  id: string;
  name: string;
  bio: string;
  dateOfBirth: string;
  birthPlace: string;
  photoUrl: string;
  editable: boolean;
}

export interface GraphQLContext {
  prisma: PrismaClient;
}

export type BatchPayload = {
  count: number;
};
