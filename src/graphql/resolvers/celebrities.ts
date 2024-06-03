import { Celebrity } from "@prisma/client";
import { GraphQLError } from "graphql";
import { verifyAndCreateCelebrity } from "../../util/functions";
import { GraphQLContext, Celebrity as ICelebrity } from "../../util/types";

const resolvers = {
  Query: {
    getCelebrities: async function getCelebrities(
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<Array<Celebrity>> {
      const { prisma } = context;

      try {
        return await prisma.celebrity.findMany();
      } catch (error: any) {
        console.error("getCelebrities: ", error);
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
  },
};

export default resolvers;
