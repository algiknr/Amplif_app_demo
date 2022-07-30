/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovieListItem = /* GraphQL */ `
  subscription OnCreateMovieListItem($owner: String) {
    onCreateMovieListItem(owner: $owner) {
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
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateMovieListItem = /* GraphQL */ `
  subscription OnUpdateMovieListItem($owner: String) {
    onUpdateMovieListItem(owner: $owner) {
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
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteMovieListItem = /* GraphQL */ `
  subscription OnDeleteMovieListItem($owner: String) {
    onDeleteMovieListItem(owner: $owner) {
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
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
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
