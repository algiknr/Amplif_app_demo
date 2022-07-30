/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      Release
      Score
      Vote_Count
      Liked
      Watched
      user
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
      Release
      Score
      Vote_Count
      Liked
      Watched
      user
      createdAt
      updatedAt
      _version
     
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
      Release
      Score
      Vote_Count
      Liked
      Watched
      user
      createdAt
      updatedAt
      _version
 
    }
  }
`;
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
      id
      title
      score
      description
      createdAt
      updatedAt
    
    }
  }
`;
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
      id
      title
      score
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
      id
      title
      score
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
