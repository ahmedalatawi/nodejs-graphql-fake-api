import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Celebrity {
    id: ID!
    name: String!
    bio: String
    dateOfBirth: Date!
    photoUrl: String
  }

  input CelebrityInput {
    name: String!
    bio: String
    dateOfBirth: Date!
    photoUrl: String
  }

  type Query {
    celebrity(id: ID!): Celebrity
    celebrities: [Celebrity]
  }

  type Mutation {
    createCelebrity(celebrity: CelebrityInput!): Celebrity
  }
`;

export default typeDefs;
