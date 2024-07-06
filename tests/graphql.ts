export const createCelebrity = /* GraphQL */ `
  mutation createCelebrity(
    $name: String!
    $bio: String
    $dateOfBirth: String!
    $photoUrl: String
  ) {
    createCelebrity(
      name: $name
      bio: $bio
      dateOfBirth: $dateOfBirth
      photoUrl: $photoUrl
    ) {
      id
      name
      bio
      dateOfBirth
      photoUrl
    }
  }
`;
