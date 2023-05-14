/* eslint-disable no-unused-vars */
import { OperationVariables, QueryResult } from '@apollo/client';
import { GraphQLResolveInfo } from 'graphql';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { Router } from 'next/router';
import { ReactNode } from 'react';

export type Layout = (page: ReactNode) => ReactNode;

export type NextPageFC<L = any, P = any, IP = P> = NextPage<P, IP> & L;
export type QueryTypeChildren = { children: ReactNode };
export type QueryType = QueryResult<
  IQueryFilter<'albumById'>,
  OperationVariables
>;
export type QueryTypeNode = {
  query: QueryType;
  role?: string | string[];
};

export type AppPropsWithLayout<L = any, P = any> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P> & L;
  router: Router;
  __N_SSG?: boolean | undefined;
  __N_SSP?: boolean | undefined;
};

export type IQueryFilter<T extends keyof IQuery> = Pick<IQuery, T>;
export type IMutationFilter<T extends keyof IMutation> = Pick<IMutation, T>;

export type IGraphQLResponseRoot = {
  data?: IQuery | IMutation;
  errors?: Array<IGraphQLResponseError>;
};

interface IGraphQLResponseError {
  message: string;
  locations?: Array<IGraphQLResponseErrorLocation>;
  [propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export interface IQuery {
  listArtistBySlug?: Array<IArtist | null>;
  artistById?: IArtist;
  listAlbums?: IAlbumWithOptions;
  listAlbumBySlug?: Array<IAlbumType | null>;
  albumById?: IAlbumType;
  audioById?: ITrack;
  listPlaylistsBySlug?: Array<IlistPlaylistsBySlug | null>;
  playListById?: IlistPlaylistsBySlug;
  listByType?: IlistByType;
  Search?: ISearch;
  lyricByTrackId?: ILyricByTrack;
}

export interface IArtistFilter {
  slug: string;
  limit?: number;
  offset?: string;
}

export interface IArtist {
  external_urls?: ISpotify;
  followers?: IArtistFollowers;
  genres?: Array<string | null>;
  href?: string;
  id?: string;
  images?: Array<IImage | null>;
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
  customize?: ICustomize;
}

export interface ISpotify {
  spotify?: string;
}

export interface IArtistFollowers {
  href?: string;
  total?: number;
}

export interface IImage {
  url?: string;
  height?: number;
  width?: number;
}

export interface ICustomize {
  colors?: ICustomizeColorsByType;
}

export interface ICustomizeColorsByType {
  profile?: ICustomizeColors;
  background?: ICustomizeColors;
}

export interface ICustomizeColors {
  primary?: string;
  secondary?: string;
  tertiary?: string;
}

export interface IlistAlbumsInput {
  artist?: IlistAlbumsArtistInput;
  slug?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export interface IlistAlbumsArtistInput {
  id?: string;
}

export interface IAlbumWithOptions {
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  page?: number;
  total?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  items?: Array<IAlbumType | null>;
}

export interface IAlbumType {
  customize?: ICustmize;
  id?: string;
  uri?: string;
  total_tracks?: number;
  restrictions?: IRestrictionsObject;
  release_date_precision?: string;
  release_date?: string;
  images?: Array<IImage | null>;
  external_urls?: ISpotify;
  available_markets?: Array<string | null>;
  copyrights?: string;
  external_ids?: IExternalIds;
  genres?: Array<string | null>;
  label?: string;
  tracks?: ITracksFilterByAlbum;
  popularity?: number;
  artists?: Array<IArtist | null>;
  album_type?: string;
  album_group?: string;
  name?: string;
  type?: string;
  href?: string;
}

export interface ICustmize {
  font?: Ifont;
  background?: Ibackground;
}

export interface Ifont {
  color?: string;
}

export interface Ibackground {
  color?: string;
}

export interface IRestrictionsObject {
  reason?: string;
}

export interface IExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface ITracksFilterByAlbum {
  href?: string;
  items?: Array<ISong | null>;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
}

export interface ISong {
  artists?: Array<ITrackArtist | null>;
  available_markets?: Array<string | null>;
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_urls?: ISpotify;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: ITrackLinkObject;
  restrictions?: IRestrictionsObject;
  name?: string;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
  album?: IAlbumType;
}

export interface ITrackArtist {
  external_urls?: ISpotify;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface ITrackLinkObject {
  external_urls?: ISpotify;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}

export interface ITrack {
  id?: string;
  audio?: IAudio;
}

export interface IAudio {
  name?: string;
  artists?: Array<IAudioArtists | null>;
  urls?: Array<IAudioUrls | null>;
}

export interface IAudioArtists {
  external_urls?: IAudioExternalArtis;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface IAudioExternalArtis {
  spotify?: string;
}

export interface IAudioUrls {
  url?: string;
}

export interface IlistPlaylistsBySlug {
  collaborative?: boolean;
  description?: string;
  external_urls?: ISpotify;
  href?: string;
  id?: string;
  images?: Array<IImage | null>;
  name?: string;
  owner?: IOwner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: IPlaylistTracks;
  type?: string;
  uri?: string;
}

export interface IOwner {
  display_name?: string;
  external_urls?: ISpotify;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}

export interface IPlaylistTracks {
  href?: string;
  items?: Array<ISong | null>;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total?: number;
}

export interface IlistByType {
  artists?: Array<IArtist | null>;
  albums?: Array<IAlbumType | null>;
  playlist?: Array<IlistPlaylistsBySlug | null>;
}

export interface ISearch {
  artists?: Array<IArtist | null>;
  albums?: Array<IAlbumType | null>;
  playlists?: Array<IlistPlaylistsBySlug | null>;
}

export interface IlyricByTrackInput {
  id: string;
}

export interface ILyricByTrack {
  id?: string;
  name?: string;
  artists?: Array<IArtistByLyric | null>;
  duration?: number;
  lyrics?: Array<ILyric | null>;
}

export interface IArtistByLyric {
  id?: string;
  name?: string;
  image?: string;
  color?: string;
}

export interface ILyric {
  id?: string;
  phrase?: string;
  start?: number;
  translates?: Array<ITranslate | null>;
  artists?: Array<IArtistByLyric | null>;
  notifies?: Array<INotify | null>;
}

export interface ITranslate {
  id?: string;
  phrase?: string;
  lang?: string;
}

export interface INotify {
  id?: string;
  message?: string;
  user_name?: string;
}

export interface IMutation {
  deleteAlbum?: IdeleteAlbum;
  createSyncronousTrack?: ITrack;
  updateLyricByTrackId?: ILyricByTrack;
}

export interface IdeleteAlbumInput {
  id?: string;
}

export interface IdeleteAlbum {
  message?: string;
}

export interface IINPUTEDITLYRICS {
  id?: string;
  lyric?: string;
  time?: number;
  artist?: string;
  line?: number;
}

export interface IUpdateLyricByTrackInput {
  id: string;
  name?: string;
  duration?: number;
  lyrics?: Array<ILyricInput | null>;
}

export interface ILyricInput {
  id: string;
  phrase: string;
  start: number;
  artists?: Array<IArtistByLyricInput | null>;
  translates?: Array<ITranslateInput | null>;
  notifies?: Array<INotifyInput | null>;
}

export interface IArtistByLyricInput {
  id?: string;
  name?: string;
  image?: string;
  color?: string;
}

export interface ITranslateInput {
  id?: string;
  phrase?: string;
  lang?: string;
}

export interface INotifyInput {
  id?: string;
  message?: string;
  user_name?: string;
}

export interface IfontInput {
  color?: string;
}

export interface IbackgroundInput {
  color?: string;
}

export interface ICustomizeInput {
  font?: IfontInput;
  background?: IbackgroundInput;
}

export interface ISongInput {
  id: string;
  name: string;
  album_id: string;
  duration: number;
  image?: string;
  url: string;
}

export interface IAlbumInput {
  id: string;
  name: string;
  description?: string;
  songs?: Array<ISongInput | null>;
  image?: string;
  type?: string;
  author: string;
  href?: string;
  backgroundCover?: string;
  customize?: ICustomizeInput;
  biography?: string;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface IResolver {
  Query?: IQueryTypeResolver;
  Artist?: IArtistTypeResolver;
  Spotify?: ISpotifyTypeResolver;
  ArtistFollowers?: IArtistFollowersTypeResolver;
  Image?: IImageTypeResolver;
  Customize?: ICustomizeTypeResolver;
  CustomizeColorsByType?: ICustomizeColorsByTypeTypeResolver;
  CustomizeColors?: ICustomizeColorsTypeResolver;
  AlbumWithOptions?: IAlbumWithOptionsTypeResolver;
  AlbumType?: IAlbumTypeTypeResolver;
  Custmize?: ICustmizeTypeResolver;
  font?: IfontTypeResolver;
  background?: IbackgroundTypeResolver;
  RestrictionsObject?: IRestrictionsObjectTypeResolver;
  ExternalIds?: IExternalIdsTypeResolver;
  TracksFilterByAlbum?: ITracksFilterByAlbumTypeResolver;
  Song?: ISongTypeResolver;
  TrackArtist?: ITrackArtistTypeResolver;
  TrackLinkObject?: ITrackLinkObjectTypeResolver;
  Track?: ITrackTypeResolver;
  Audio?: IAudioTypeResolver;
  AudioArtists?: IAudioArtistsTypeResolver;
  AudioExternalArtis?: IAudioExternalArtisTypeResolver;
  AudioUrls?: IAudioUrlsTypeResolver;
  listPlaylistsBySlug?: IlistPlaylistsBySlugTypeResolver;
  Owner?: IOwnerTypeResolver;
  PlaylistTracks?: IPlaylistTracksTypeResolver;
  listByType?: IlistByTypeTypeResolver;
  Search?: ISearchTypeResolver;
  LyricByTrack?: ILyricByTrackTypeResolver;
  ArtistByLyric?: IArtistByLyricTypeResolver;
  Lyric?: ILyricTypeResolver;
  Translate?: ITranslateTypeResolver;
  Notify?: INotifyTypeResolver;
  Mutation?: IMutationTypeResolver;
  deleteAlbum?: IdeleteAlbumTypeResolver;
}
export interface IQueryTypeResolver<TParent = any> {
  listArtistBySlug?: QueryToListArtistBySlugResolver<TParent>;
  artistById?: QueryToArtistByIdResolver<TParent>;
  listAlbums?: QueryToListAlbumsResolver<TParent>;
  listAlbumBySlug?: QueryToListAlbumBySlugResolver<TParent>;
  albumById?: QueryToAlbumByIdResolver<TParent>;
  audioById?: QueryToAudioByIdResolver<TParent>;
  listPlaylistsBySlug?: QueryToListPlaylistsBySlugResolver<TParent>;
  playListById?: QueryToPlayListByIdResolver<TParent>;
  listByType?: QueryToListByTypeResolver<TParent>;
  Search?: QueryToSearchResolver<TParent>;
  lyricByTrackId?: QueryToLyricByTrackIdResolver<TParent>;
}

export interface QueryToListArtistBySlugArgs {
  filter?: IArtistFilter;
}
export interface QueryToListArtistBySlugResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToListArtistBySlugArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToArtistByIdArgs {
  id: string;
}
export interface QueryToArtistByIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToArtistByIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToListAlbumsArgs {
  filter?: IlistAlbumsInput;
}
export interface QueryToListAlbumsResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToListAlbumsArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToListAlbumBySlugArgs {
  filter?: IlistAlbumsInput;
}
export interface QueryToListAlbumBySlugResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToListAlbumBySlugArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToAlbumByIdArgs {
  id: string;
}
export interface QueryToAlbumByIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToAlbumByIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToAudioByIdArgs {
  id?: string;
}
export interface QueryToAudioByIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToAudioByIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToListPlaylistsBySlugArgs {
  filter?: IArtistFilter;
}
export interface QueryToListPlaylistsBySlugResolver<
  TParent = any,
  TResult = any
> {
  (
    parent: TParent,
    args: QueryToListPlaylistsBySlugArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToPlayListByIdArgs {
  id: string;
}
export interface QueryToPlayListByIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToPlayListByIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToListByTypeArgs {
  type?: Array<string | null>;
  limit?: number;
}
export interface QueryToListByTypeResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToListByTypeArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToSearchArgs {
  filter?: IArtistFilter;
}
export interface QueryToSearchResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToSearchArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface QueryToLyricByTrackIdArgs {
  filter?: IlyricByTrackInput;
}
export interface QueryToLyricByTrackIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToLyricByTrackIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface IArtistTypeResolver<TParent = any> {
  external_urls?: ArtistToExternal_urlsResolver<TParent>;
  followers?: ArtistToFollowersResolver<TParent>;
  genres?: ArtistToGenresResolver<TParent>;
  href?: ArtistToHrefResolver<TParent>;
  id?: ArtistToIdResolver<TParent>;
  images?: ArtistToImagesResolver<TParent>;
  name?: ArtistToNameResolver<TParent>;
  popularity?: ArtistToPopularityResolver<TParent>;
  type?: ArtistToTypeResolver<TParent>;
  uri?: ArtistToUriResolver<TParent>;
  customize?: ArtistToCustomizeResolver<TParent>;
}

export interface ArtistToExternal_urlsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToFollowersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToGenresResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToImagesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToPopularityResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistToCustomizeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ISpotifyTypeResolver<TParent = any> {
  spotify?: SpotifyToSpotifyResolver<TParent>;
}

export interface SpotifyToSpotifyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IArtistFollowersTypeResolver<TParent = any> {
  href?: ArtistFollowersToHrefResolver<TParent>;
  total?: ArtistFollowersToTotalResolver<TParent>;
}

export interface ArtistFollowersToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistFollowersToTotalResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IImageTypeResolver<TParent = any> {
  url?: ImageToUrlResolver<TParent>;
  height?: ImageToHeightResolver<TParent>;
  width?: ImageToWidthResolver<TParent>;
}

export interface ImageToUrlResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ImageToHeightResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ImageToWidthResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ICustomizeTypeResolver<TParent = any> {
  colors?: CustomizeToColorsResolver<TParent>;
}

export interface CustomizeToColorsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ICustomizeColorsByTypeTypeResolver<TParent = any> {
  profile?: CustomizeColorsByTypeToProfileResolver<TParent>;
  background?: CustomizeColorsByTypeToBackgroundResolver<TParent>;
}

export interface CustomizeColorsByTypeToProfileResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface CustomizeColorsByTypeToBackgroundResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ICustomizeColorsTypeResolver<TParent = any> {
  primary?: CustomizeColorsToPrimaryResolver<TParent>;
  secondary?: CustomizeColorsToSecondaryResolver<TParent>;
  tertiary?: CustomizeColorsToTertiaryResolver<TParent>;
}

export interface CustomizeColorsToPrimaryResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface CustomizeColorsToSecondaryResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface CustomizeColorsToTertiaryResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAlbumWithOptionsTypeResolver<TParent = any> {
  href?: AlbumWithOptionsToHrefResolver<TParent>;
  limit?: AlbumWithOptionsToLimitResolver<TParent>;
  next?: AlbumWithOptionsToNextResolver<TParent>;
  offset?: AlbumWithOptionsToOffsetResolver<TParent>;
  previous?: AlbumWithOptionsToPreviousResolver<TParent>;
  page?: AlbumWithOptionsToPageResolver<TParent>;
  total?: AlbumWithOptionsToTotalResolver<TParent>;
  hasNextPage?: AlbumWithOptionsToHasNextPageResolver<TParent>;
  hasPreviousPage?: AlbumWithOptionsToHasPreviousPageResolver<TParent>;
  items?: AlbumWithOptionsToItemsResolver<TParent>;
}

export interface AlbumWithOptionsToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToLimitResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToNextResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToOffsetResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToPreviousResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToPageResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToTotalResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToHasNextPageResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToHasPreviousPageResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumWithOptionsToItemsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAlbumTypeTypeResolver<TParent = any> {
  customize?: AlbumTypeToCustomizeResolver<TParent>;
  id?: AlbumTypeToIdResolver<TParent>;
  uri?: AlbumTypeToUriResolver<TParent>;
  total_tracks?: AlbumTypeToTotal_tracksResolver<TParent>;
  restrictions?: AlbumTypeToRestrictionsResolver<TParent>;
  release_date_precision?: AlbumTypeToRelease_date_precisionResolver<TParent>;
  release_date?: AlbumTypeToRelease_dateResolver<TParent>;
  images?: AlbumTypeToImagesResolver<TParent>;
  external_urls?: AlbumTypeToExternal_urlsResolver<TParent>;
  available_markets?: AlbumTypeToAvailable_marketsResolver<TParent>;
  copyrights?: AlbumTypeToCopyrightsResolver<TParent>;
  external_ids?: AlbumTypeToExternal_idsResolver<TParent>;
  genres?: AlbumTypeToGenresResolver<TParent>;
  label?: AlbumTypeToLabelResolver<TParent>;
  tracks?: AlbumTypeToTracksResolver<TParent>;
  popularity?: AlbumTypeToPopularityResolver<TParent>;
  artists?: AlbumTypeToArtistsResolver<TParent>;
  album_type?: AlbumTypeToAlbum_typeResolver<TParent>;
  album_group?: AlbumTypeToAlbum_groupResolver<TParent>;
  name?: AlbumTypeToNameResolver<TParent>;
  type?: AlbumTypeToTypeResolver<TParent>;
  href?: AlbumTypeToHrefResolver<TParent>;
}

export interface AlbumTypeToCustomizeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToTotal_tracksResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToRestrictionsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToRelease_date_precisionResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToRelease_dateResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToImagesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToExternal_urlsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToAvailable_marketsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToCopyrightsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToExternal_idsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToGenresResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToLabelResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToTracksResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToPopularityResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToAlbum_typeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToAlbum_groupResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AlbumTypeToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ICustmizeTypeResolver<TParent = any> {
  font?: CustmizeToFontResolver<TParent>;
  background?: CustmizeToBackgroundResolver<TParent>;
}

export interface CustmizeToFontResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface CustmizeToBackgroundResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IfontTypeResolver<TParent = any> {
  color?: fontToColorResolver<TParent>;
}

export interface fontToColorResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IbackgroundTypeResolver<TParent = any> {
  color?: backgroundToColorResolver<TParent>;
}

export interface backgroundToColorResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IRestrictionsObjectTypeResolver<TParent = any> {
  reason?: RestrictionsObjectToReasonResolver<TParent>;
}

export interface RestrictionsObjectToReasonResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IExternalIdsTypeResolver<TParent = any> {
  isrc?: ExternalIdsToIsrcResolver<TParent>;
  ean?: ExternalIdsToEanResolver<TParent>;
  upc?: ExternalIdsToUpcResolver<TParent>;
}

export interface ExternalIdsToIsrcResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ExternalIdsToEanResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ExternalIdsToUpcResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ITracksFilterByAlbumTypeResolver<TParent = any> {
  href?: TracksFilterByAlbumToHrefResolver<TParent>;
  items?: TracksFilterByAlbumToItemsResolver<TParent>;
  limit?: TracksFilterByAlbumToLimitResolver<TParent>;
  next?: TracksFilterByAlbumToNextResolver<TParent>;
  offset?: TracksFilterByAlbumToOffsetResolver<TParent>;
  previous?: TracksFilterByAlbumToPreviousResolver<TParent>;
  total?: TracksFilterByAlbumToTotalResolver<TParent>;
}

export interface TracksFilterByAlbumToHrefResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToItemsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToLimitResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToNextResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToOffsetResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToPreviousResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TracksFilterByAlbumToTotalResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ISongTypeResolver<TParent = any> {
  artists?: SongToArtistsResolver<TParent>;
  available_markets?: SongToAvailable_marketsResolver<TParent>;
  disc_number?: SongToDisc_numberResolver<TParent>;
  duration_ms?: SongToDuration_msResolver<TParent>;
  explicit?: SongToExplicitResolver<TParent>;
  external_urls?: SongToExternal_urlsResolver<TParent>;
  href?: SongToHrefResolver<TParent>;
  id?: SongToIdResolver<TParent>;
  is_playable?: SongToIs_playableResolver<TParent>;
  linked_from?: SongToLinked_fromResolver<TParent>;
  restrictions?: SongToRestrictionsResolver<TParent>;
  name?: SongToNameResolver<TParent>;
  preview_url?: SongToPreview_urlResolver<TParent>;
  track_number?: SongToTrack_numberResolver<TParent>;
  type?: SongToTypeResolver<TParent>;
  uri?: SongToUriResolver<TParent>;
  album?: SongToAlbumResolver<TParent>;
}

export interface SongToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToAvailable_marketsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToDisc_numberResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToDuration_msResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToExplicitResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToExternal_urlsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToIs_playableResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToLinked_fromResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToRestrictionsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToPreview_urlResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToTrack_numberResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SongToAlbumResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ITrackArtistTypeResolver<TParent = any> {
  external_urls?: TrackArtistToExternal_urlsResolver<TParent>;
  href?: TrackArtistToHrefResolver<TParent>;
  id?: TrackArtistToIdResolver<TParent>;
  name?: TrackArtistToNameResolver<TParent>;
  type?: TrackArtistToTypeResolver<TParent>;
  uri?: TrackArtistToUriResolver<TParent>;
}

export interface TrackArtistToExternal_urlsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackArtistToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackArtistToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackArtistToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackArtistToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackArtistToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ITrackLinkObjectTypeResolver<TParent = any> {
  external_urls?: TrackLinkObjectToExternal_urlsResolver<TParent>;
  href?: TrackLinkObjectToHrefResolver<TParent>;
  id?: TrackLinkObjectToIdResolver<TParent>;
  type?: TrackLinkObjectToTypeResolver<TParent>;
  uri?: TrackLinkObjectToUriResolver<TParent>;
}

export interface TrackLinkObjectToExternal_urlsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackLinkObjectToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackLinkObjectToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackLinkObjectToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackLinkObjectToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ITrackTypeResolver<TParent = any> {
  id?: TrackToIdResolver<TParent>;
  audio?: TrackToAudioResolver<TParent>;
}

export interface TrackToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TrackToAudioResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAudioTypeResolver<TParent = any> {
  name?: AudioToNameResolver<TParent>;
  artists?: AudioToArtistsResolver<TParent>;
  urls?: AudioToUrlsResolver<TParent>;
}

export interface AudioToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioToUrlsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAudioArtistsTypeResolver<TParent = any> {
  external_urls?: AudioArtistsToExternal_urlsResolver<TParent>;
  href?: AudioArtistsToHrefResolver<TParent>;
  id?: AudioArtistsToIdResolver<TParent>;
  name?: AudioArtistsToNameResolver<TParent>;
  type?: AudioArtistsToTypeResolver<TParent>;
  uri?: AudioArtistsToUriResolver<TParent>;
}

export interface AudioArtistsToExternal_urlsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioArtistsToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioArtistsToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioArtistsToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioArtistsToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface AudioArtistsToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAudioExternalArtisTypeResolver<TParent = any> {
  spotify?: AudioExternalArtisToSpotifyResolver<TParent>;
}

export interface AudioExternalArtisToSpotifyResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IAudioUrlsTypeResolver<TParent = any> {
  url?: AudioUrlsToUrlResolver<TParent>;
}

export interface AudioUrlsToUrlResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IlistPlaylistsBySlugTypeResolver<TParent = any> {
  collaborative?: listPlaylistsBySlugToCollaborativeResolver<TParent>;
  description?: listPlaylistsBySlugToDescriptionResolver<TParent>;
  external_urls?: listPlaylistsBySlugToExternal_urlsResolver<TParent>;
  href?: listPlaylistsBySlugToHrefResolver<TParent>;
  id?: listPlaylistsBySlugToIdResolver<TParent>;
  images?: listPlaylistsBySlugToImagesResolver<TParent>;
  name?: listPlaylistsBySlugToNameResolver<TParent>;
  owner?: listPlaylistsBySlugToOwnerResolver<TParent>;
  public?: listPlaylistsBySlugToPublicResolver<TParent>;
  snapshot_id?: listPlaylistsBySlugToSnapshot_idResolver<TParent>;
  tracks?: listPlaylistsBySlugToTracksResolver<TParent>;
  type?: listPlaylistsBySlugToTypeResolver<TParent>;
  uri?: listPlaylistsBySlugToUriResolver<TParent>;
}

export interface listPlaylistsBySlugToCollaborativeResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToDescriptionResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToExternal_urlsResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToHrefResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToImagesResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToNameResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToOwnerResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToPublicResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToSnapshot_idResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToTracksResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToTypeResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listPlaylistsBySlugToUriResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IOwnerTypeResolver<TParent = any> {
  display_name?: OwnerToDisplay_nameResolver<TParent>;
  external_urls?: OwnerToExternal_urlsResolver<TParent>;
  href?: OwnerToHrefResolver<TParent>;
  id?: OwnerToIdResolver<TParent>;
  type?: OwnerToTypeResolver<TParent>;
  uri?: OwnerToUriResolver<TParent>;
}

export interface OwnerToDisplay_nameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface OwnerToExternal_urlsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface OwnerToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface OwnerToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface OwnerToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface OwnerToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IPlaylistTracksTypeResolver<TParent = any> {
  href?: PlaylistTracksToHrefResolver<TParent>;
  items?: PlaylistTracksToItemsResolver<TParent>;
  limit?: PlaylistTracksToLimitResolver<TParent>;
  next?: PlaylistTracksToNextResolver<TParent>;
  offset?: PlaylistTracksToOffsetResolver<TParent>;
  previous?: PlaylistTracksToPreviousResolver<TParent>;
  total?: PlaylistTracksToTotalResolver<TParent>;
}

export interface PlaylistTracksToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToItemsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToLimitResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToNextResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToOffsetResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToPreviousResolver<
  TParent = any,
  TResult = any
> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface PlaylistTracksToTotalResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IlistByTypeTypeResolver<TParent = any> {
  artists?: listByTypeToArtistsResolver<TParent>;
  albums?: listByTypeToAlbumsResolver<TParent>;
  playlist?: listByTypeToPlaylistResolver<TParent>;
}

export interface listByTypeToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listByTypeToAlbumsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface listByTypeToPlaylistResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ISearchTypeResolver<TParent = any> {
  artists?: SearchToArtistsResolver<TParent>;
  albums?: SearchToAlbumsResolver<TParent>;
  playlists?: SearchToPlaylistsResolver<TParent>;
}

export interface SearchToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SearchToAlbumsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface SearchToPlaylistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ILyricByTrackTypeResolver<TParent = any> {
  id?: LyricByTrackToIdResolver<TParent>;
  name?: LyricByTrackToNameResolver<TParent>;
  artists?: LyricByTrackToArtistsResolver<TParent>;
  duration?: LyricByTrackToDurationResolver<TParent>;
  lyrics?: LyricByTrackToLyricsResolver<TParent>;
}

export interface LyricByTrackToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricByTrackToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricByTrackToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricByTrackToDurationResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricByTrackToLyricsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IArtistByLyricTypeResolver<TParent = any> {
  id?: ArtistByLyricToIdResolver<TParent>;
  name?: ArtistByLyricToNameResolver<TParent>;
  image?: ArtistByLyricToImageResolver<TParent>;
  color?: ArtistByLyricToColorResolver<TParent>;
}

export interface ArtistByLyricToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistByLyricToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistByLyricToImageResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ArtistByLyricToColorResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ILyricTypeResolver<TParent = any> {
  id?: LyricToIdResolver<TParent>;
  phrase?: LyricToPhraseResolver<TParent>;
  start?: LyricToStartResolver<TParent>;
  translates?: LyricToTranslatesResolver<TParent>;
  artists?: LyricToArtistsResolver<TParent>;
  notifies?: LyricToNotifiesResolver<TParent>;
}

export interface LyricToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricToPhraseResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricToStartResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricToTranslatesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricToArtistsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface LyricToNotifiesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface ITranslateTypeResolver<TParent = any> {
  id?: TranslateToIdResolver<TParent>;
  phrase?: TranslateToPhraseResolver<TParent>;
  lang?: TranslateToLangResolver<TParent>;
}

export interface TranslateToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TranslateToPhraseResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface TranslateToLangResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface INotifyTypeResolver<TParent = any> {
  id?: NotifyToIdResolver<TParent>;
  message?: NotifyToMessageResolver<TParent>;
  user_name?: NotifyToUser_nameResolver<TParent>;
}

export interface NotifyToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface NotifyToMessageResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface NotifyToUser_nameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}

export interface IMutationTypeResolver<TParent = any> {
  deleteAlbum?: MutationToDeleteAlbumResolver<TParent>;
  createSyncronousTrack?: MutationToCreateSyncronousTrackResolver<TParent>;
  updateLyricByTrackId?: MutationToUpdateLyricByTrackIdResolver<TParent>;
}

export interface MutationToDeleteAlbumArgs {
  input: IdeleteAlbumInput;
}
export interface MutationToDeleteAlbumResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: MutationToDeleteAlbumArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface MutationToCreateSyncronousTrackArgs {
  slug?: string;
  edit_lyrics?: Array<IINPUTEDITLYRICS | null>;
}
export interface MutationToCreateSyncronousTrackResolver<
  TParent = any,
  TResult = any
> {
  (
    parent: TParent,
    args: MutationToCreateSyncronousTrackArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface MutationToUpdateLyricByTrackIdArgs {
  input?: IUpdateLyricByTrackInput;
}
export interface MutationToUpdateLyricByTrackIdResolver<
  TParent = any,
  TResult = any
> {
  (
    parent: TParent,
    args: MutationToUpdateLyricByTrackIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult;
}

export interface IdeleteAlbumTypeResolver<TParent = any> {
  message?: deleteAlbumToMessageResolver<TParent>;
}

export interface deleteAlbumToMessageResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}
