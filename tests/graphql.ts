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

export const updateCelebrity = gql`
  mutation updateCelebrity($celebrity: CelebrityInput!) {
    updateCelebrity(celebrity: $celebrity) {
      name
      bio
      photoUrl
      dateOfBirth
    }
  }
`;
