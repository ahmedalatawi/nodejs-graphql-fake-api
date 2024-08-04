import { Celebrity } from "@prisma/client";
import { GraphQLError } from "graphql";
import {
  verifyAndCreateCelebrity,
  verifyAndDeleteCelebrity,
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
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ): Promise<Array<Celebrity>> {
      const { prisma } = context;

      try {
        return await prisma.celebrity.findMany();
      } catch (error) {
        console.error("celebrities: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    celebrity: async function celebrity(
      _: unknown,
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
      } catch (error) {
        console.error("celebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createCelebrity: async function createCelebrity(
      _: unknown,
      args: { celebrity: ICelebrity },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { celebrity } = args;

      try {
        return await verifyAndCreateCelebrity(celebrity, prisma);
      } catch (error) {
        console.error("createCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    updateCelebrity: async function updateCelebrity(
      _: unknown,
      args: { celebrity: ICelebrity },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { celebrity } = args;

      try {
        return await verifyAndUpdateCelebrity(celebrity, prisma);
      } catch (error) {
        console.error("updateCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    deleteCelebrity: async function deleteCelebrity(
      _: unknown,
      args: { id: string },
      context: GraphQLContext
    ): Promise<Celebrity> {
      const { prisma } = context;
      const { id } = args;

      try {
        return await verifyAndDeleteCelebrity(id, prisma);
      } catch (error) {
        console.error("deleteCelebrity: ", error);
        throw new GraphQLError(error?.message);
      }
    },
    deleteAllCelebrities: async function deleteAllCelebrities(
      _: unknown,
      __: unknown,
      context: GraphQLContext
    ): Promise<BatchPayload> {
      const { prisma } = context;

      try {
        return await prisma.celebrity.deleteMany({});
      } catch (error) {
        console.error("deleteAllCelebrities: ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export default resolvers;
