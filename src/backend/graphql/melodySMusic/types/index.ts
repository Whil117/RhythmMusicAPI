import { gql } from 'apollo-server-core';

const MainTypesDefs = gql`
  #graphql

  type IPaginationInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type IArtist {
    id: String
    name: String
    photo: String
    followers: Int
    popularity: Int
    genres: [String]
    uri: String
    spotify_url: String
  }

  type IAlbum {
    id: String
    album_type: String
    artists: [IArtist]
    available_markets: [String]
    spotify_url: String
    photo: String
    name: String
    release_date: String
    release_date_precision: String
    total_tracks: Int
    uri: String
  }

  type ITrack {
    id: String
    name: String
    artists: [IArtist]
    available_markets: [String]
    album_id: String
    album: IAlbum
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    spotify_url: String
    preview_url: String
    track_number: Int
    uri: String
  }

  type IOwn {
    name: String
    id: String
    type: String
    uri: String
    spotify_url: String
  }

  type IPlaylist {
    collaborative: Boolean
    description: String
    spotify_url: String
    id: String
    photo: String
    name: String
    owner: IOwn
    total_tracks: Int
    uri: String
  }

  type ISearchArtistByName {
    items: [IArtist]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  type ISearchAlbumByArtistId {
    items: [IAlbum]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  type ISearchAlbumTracks {
    items: [ITrack]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  type ISearchPlaylist {
    items: [IPlaylist]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  type Query {
    SpotifysearchArtistByName(
      take: Int!
      skip: Int!
      nameArtist: String!
    ): ISearchArtistByName
    SpotifyAlbumsByArtistId(
      take: Int!
      skip: Int!
      artistId: ID!
    ): ISearchAlbumByArtistId

    SpotifyTracksAlbumById(
      take: Int!
      skip: Int!
      albumId: ID!
    ): ISearchAlbumTracks
    listAlbums: [IAlbum]
    SpotifySearchPlaylist(
      take: Int!
      skip: Int!
      namePlaylist: String!
    ): ISearchPlaylist
    SpotifyTracksByPlaylist(
      take: Int!
      skip: Int!
      playlistId: String!
    ): ISearchAlbumTracks

    ############UPDATE
    albumUpdateQuery(albumId: String!): IAlbum
    albumById(albumId: String!): IAlbum
  }

  type Mutation {
    updateArtistById: String
    updateAlbumById: String
  }
`;

export default MainTypesDefs;
