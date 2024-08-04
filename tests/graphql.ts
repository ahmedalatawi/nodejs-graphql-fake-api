import gql from "graphql-tag";

export const celebrity = gql`
  query celebrity($id: ID!) {
    celebrity(id: $id) {
      name
      bio
      photoUrl
      dateOfBirth
      birthPlace
      editable
    }
  }
`;

export const celebrities = gql`
  query celebrities {
    celebrities {
      name
      bio
      photoUrl
      dateOfBirth
      birthPlace
      editable
    }
  }
`;

export const createCelebrity = gql`
  mutation createCelebrity($celebrity: CreateCelebrityInput!) {
    createCelebrity(celebrity: $celebrity) {
      name
      bio
      photoUrl
      dateOfBirth
      birthPlace
      editable
    }
  }
`;

export const updateCelebrity = gql`
  mutation updateCelebrity($celebrity: UpdateCelebrityInput!) {
    updateCelebrity(celebrity: $celebrity) {
      name
      bio
      photoUrl
      dateOfBirth
      birthPlace
      editable
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
      birthPlace
      editable
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
