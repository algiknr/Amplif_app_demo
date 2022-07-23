/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovieListItem = /* GraphQL */ `
  query GetMovieListItem($id: ID!) {
    getMovieListItem(id: $id) {
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
export const listMovielistItems = /* GraphQL */ `
  query ListMovieListItems(
    $filter: ModelMovieListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovieListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
