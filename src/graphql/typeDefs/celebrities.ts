import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type BatchPayload {
    count: Int
  }

  type Celebrity {
    id: ID!
    name: String!
    bio: String
    dateOfBirth: Date!
    photoUrl: String
  }

  input CelebrityInput {
    id: ID
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
    updateCelebrity(celebrity: CelebrityInput!): Celebrity
    deleteCelebrity(id: ID!): Celebrity
    deleteAllCelebrities: BatchPayload
  }
`;

export default typeDefs;
