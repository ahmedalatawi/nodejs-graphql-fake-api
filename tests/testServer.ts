import { ApolloServer } from "apollo-server-express";

import typeDefs from "../src/graphql/typeDefs";
import resolvers from "../src/graphql/resolvers";

export const constructTestServer = ({ context = {} } = {}): {
  server: ApolloServer;
} => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  return { server };
};
