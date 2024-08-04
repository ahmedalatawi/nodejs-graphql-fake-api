import gql from "graphql-tag";

const CelebrityInput = `
  id: ID
  name: String!
  bio: String
  dateOfBirth: Date!
  photoUrl: String
`;

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
    editable: Boolean
  }

  input UpdateCelebrityInput {
    ${CelebrityInput}
  }

  input CreateCelebrityInput {
    ${CelebrityInput}
    editable: Boolean
  }

  type Query {
    celebrity(id: ID!): Celebrity
    celebrities: [Celebrity]
  }

  type Mutation {
    createCelebrity(celebrity: CreateCelebrityInput!): Celebrity
    updateCelebrity(celebrity: UpdateCelebrityInput!): Celebrity
    deleteCelebrity(id: ID!): Celebrity
    deleteAllCelebrities: BatchPayload
  }
`;

export default typeDefs;
