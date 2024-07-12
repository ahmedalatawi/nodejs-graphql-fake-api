import gql from "graphql-tag";

export const createCelebrity = gql`
  mutation createCelebrity($celebrity: CelebrityInput!) {
    createCelebrity(celebrity: $celebrity) {
      name
      bio
      photoUrl
      dateOfBirth
    }
  }
`;
