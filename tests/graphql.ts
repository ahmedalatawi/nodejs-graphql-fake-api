import gql from "graphql-tag";

export const celebrity = gql`
  query celebrity($id: ID!) {
    celebrity(id: $id) {
      name
      bio
      photoUrl
      dateOfBirth
    }
  }
`;

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

export const deleteCelebrity = gql`
  mutation deleteCelebrity($id: ID!) {
    deleteCelebrity(id: $id) {
      name
      bio
      photoUrl
      dateOfBirth
    }
  }
`;

export const deleteAllCelebrities = gql`
  mutation deleteAllCelebrities {
    deleteAllCelebrities {
      count
    }
  }
`;
