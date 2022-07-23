
export const createMovieListItem = /* GraphQL */ `
  mutation CreateMovieListItem(
    $input: CreateMovieListItemInput!
    $condition: ModelMovieListItemConditionInput
  ) {
    createMovieListItem(input: $input, condition: $condition) {
      id
      name
      description
      image
      Score
      Release
      Vote_Count
      Liked
      Watched
      createdAt
      updatedAt
    }
  }
`;

export const updateMovieListItem = /* GraphQL */ `
  mutation UpdateMovieListItem(
    $input: UpdateMovieListItemInput!
    $condition: ModelMovieListItemConditionInput
  ) {
    updateMovieListItem(input: $input, condition: $condition) {
     id
      name
      description
      image
      Score
      Release
      Vote_Count
      Liked
      Watched
      createdAt
      updatedAt
    }
  }
`;

export const deleteMovieListItem = /* GraphQL */ `
  mutation DeleteMovieListItem(
    $input: DeleteMovieListItemInput!
    $condition: ModelMovieListItemConditionInput
  ) {
    deleteMovieListItem(input: $input, condition: $condition) {
      id
      name
      description
      image
      Score
      Release
      Vote_Count
      Liked
      Watched
      createdAt
      updatedAt
      updatedAt
    }
  }
`;

