/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovieListItem = /* GraphQL */ `
  query GetMovieListItem($id: ID!) {
    getMovieListItem(id: $id) {
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
export const listMovieListItems = /* GraphQL */ `
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
        Release
        Score
        Vote_Count
        Liked
        Watched
        user
        createdAt
        updatedAt
        _deleted
        _version
    
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMovieListItems = /* GraphQL */ `
  query SyncMovieListItems(
    $filter: ModelMovieListItemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMovieListItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
       
      }
      nextToken
      startedAt
    }
  }
`;
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
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
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMovies = /* GraphQL */ `
  query SyncMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMovies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
