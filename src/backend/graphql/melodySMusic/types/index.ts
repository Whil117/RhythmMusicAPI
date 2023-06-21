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
    album_group: String
    label: String
    popularity: Int
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

  type ISearchAll {
    albums: ISearchAlbumByArtistId
    artists: ISearchArtistByName
    playlists: ISearchPlaylist
    tracks: ISearchAlbumTracks
  }

  type listAlbumsByArtistPagination {
    items: [IAlbum]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  type ListArtistsPagination {
    items: [IArtist]
    totalCount: Int
    pageInfo: IPaginationInfo
  }

  enum SearchInclude {
    album
    artist
    playlist
    track
  }

  enum OrderPagination {
    ASC
    DESC
  }
  input InputListArtistFilter {
    artistName: String
    followers: OrderPagination
    createdAt: OrderPagination
    popularity: OrderPagination
    genres: [String]
  }

  input InputListAlbumByArtist {
    artistName: String
    artistId: String
    albumName: String
    label: String
    release_date: OrderPagination
    total_tracks: OrderPagination
    createdAt: OrderPagination
    popularity: OrderPagination
  }

  input InputFilterTracks {
    artistId: String
    artistName: String
    albumId: String
    trackName: String
    explicit: Boolean
    track_number: OrderPagination
    createdAt: OrderPagination
    duration_ms: OrderPagination
    name: OrderPagination
    disc_number: OrderPagination
  }

  input InputFilterPlaylists {
    playlistName: String
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

    SpotifySearch(
      includeSearch: [SearchInclude]!
      search: String!
      take: Int!
      skip: Int!
    ): ISearchAll
    ############UPDATE

    # listAlbumsByArtistId(
    #   take: Int!
    #   skip: Int!
    #   artistId: String!
    #   filter: InputListAlbumByArtist
    #   order: OrderPagination
    # ): listAlbumsByArtistPagination

    listAlbums(
      take: Int!
      skip: Int!
      filter: InputListAlbumByArtist
    ): listAlbumsByArtistPagination
    listArtists(
      take: Int!
      skip: Int!
      filter: InputListArtistFilter
    ): ListArtistsPagination

    listPlaylists(
      take: Int!
      skip: Int!
      filter: InputFilterPlaylists
      order: OrderPagination!
    ): ISearchPlaylist

    listTracks(
      take: Int!
      skip: Int!
      filter: InputFilterTracks
    ): ISearchAlbumTracks
    # listTracksByAlbumId(
    #   take: Int!
    #   skip: Int!
    #   albumId: ID!
    #   order: OrderPagination!
    # ): ISearchAlbumTracks
    artistById(artistId: ID!): IArtist
    albumById(albumId: String!): IAlbum
    playlistById(playlistById: ID!): IPlaylist
    trackById(trackId: String!): ITrack
  }
  type Mutation {
    defaultMutate: String
  }
`;

export default MainTypesDefs;
