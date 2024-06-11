import { Celebrity } from "@prisma/client";
import { GraphQLError } from "graphql";
import {
  verifyAndCreateCelebrity,
  verifyAndUpdateCelebrity,
} from "../../util/functions";
import {
  BatchPayload,
  GraphQLContext,
  Celebrity as ICelebrity,
} from "../../util/types";

const resolvers = {
  Query: {
    celebrities: async function celebrities(
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<Array<Celebrity>> {
      const { prisma } = context;

      try {
        return await prisma.celebrity.findMany();
      } catch (error: any) {
        console.error("celebrities: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    celebrity: async function celebrity(
      _: any,
      args: { id: string },
      context: GraphQLContext
    ) {
      const { id } = args;
      const { prisma } = context;

      try {
        return await prisma.celebrity.findUnique({
          where: {
            id,
          },
        });
      } catch (error: any) {
        console.error("celebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createCelebrity: async function createCelebrity(
      _: any,
      args: { celebrity: ICelebrity },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { celebrity } = args;

      try {
        return await verifyAndCreateCelebrity(celebrity, prisma);
      } catch (error: any) {
        console.error("createCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    updateCelebrity: async function updateCelebrity(
      _: any,
      args: { celebrity: ICelebrity },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { celebrity } = args;

      try {
        return await verifyAndUpdateCelebrity(celebrity, prisma);
      } catch (error: any) {
        console.error("updateCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    deleteCelebrity: async function deleteCelebrity(
      _: any,
      args: { id: string },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { id } = args;

      try {
        return await prisma.celebrity.delete({
          where: {
            id,
          },
        });
      } catch (error: any) {
        console.error("deleteCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    deleteAllCelebrities: async function deleteAllCelebrities(
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<BatchPayload> {
      const { prisma } = context;

      try {
        return await prisma.celebrity.deleteMany({});
      } catch (error: any) {
        console.error("deleteAllCelebrities: ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export default resolvers;
