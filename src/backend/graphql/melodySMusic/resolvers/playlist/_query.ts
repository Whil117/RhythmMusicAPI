/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { PlaylistModel } from '../../models/playlist';
import getterFilterTracks from '../../utils';
import controllerPlaylists from './controller';

type IArgumentsAlbumArtist = {
  take: number;
  skip: number;
  namePlaylist: string;
};

type IArgumentsPlaylist = {
  playlistById: string;
};

type IArgumentsPlaylists = {
  take: number;
  skip: number;
  order: string;
  artistId: string;
  filter: {
    artistName: string;
  };
};

const ResolverQueryPlaylist = {
  SpotifySearchPlaylist: async (
    _: unknown,
    { take, skip, namePlaylist }: IArgumentsAlbumArtist
  ) => {
    const searchedPlaylist = await CONFIG_SPOTIFY.SPOTIFY_API.searchPlaylists(
      namePlaylist ?? 'Red Velvet',
      {
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const playlistQuery = searchedPlaylist?.body?.playlists;

    return await controllerPlaylists({
      playlists: playlistQuery?.items,
      total: playlistQuery?.total as number,
      take,
      skip
    });
  },
  playlistById: async (_: unknown, { playlistById }: IArgumentsPlaylist) => {
    const spotifyPlaylist = await CONFIG_SPOTIFY.SPOTIFY_API.getPlaylist(
      playlistById
    ).then((res) => res.body);

    const newPlaylistUpdate = {
      collaborative: spotifyPlaylist?.collaborative,
      description: spotifyPlaylist?.description,
      spotify_url: spotifyPlaylist?.external_urls?.spotify,
      id: spotifyPlaylist?.id,
      photo: spotifyPlaylist?.images?.[0]?.url,
      name: spotifyPlaylist?.name,
      owner: {
        name: spotifyPlaylist?.owner?.display_name,
        id: spotifyPlaylist?.owner?.id,
        type: spotifyPlaylist?.owner?.type,
        uri: spotifyPlaylist?.owner?.uri,
        spotify_url: spotifyPlaylist?.owner?.external_urls?.spotify
      },
      total_tracks: spotifyPlaylist?.tracks?.total,
      uri: spotifyPlaylist?.uri
    };

    const isExist = await PlaylistModel.findOne({
      id: playlistById
    });
    if (!isExist) {
      await PlaylistModel.create(newPlaylistUpdate);
    } else {
      await PlaylistModel.findOneAndUpdate(
        {
          id: playlistById
        },
        newPlaylistUpdate
      );
    }
    return newPlaylistUpdate;
  },
  listPlaylists: async (
    _: unknown,
    { take, skip, order, filter }: IArgumentsPlaylists
  ) => {
    const constructorFilter =
      getterFilterTracks(filter ?? {}, (value) => {
        return {
          playlistName: {
            name: { $regex: value || '', $options: 'i' }
          }
        };
      }) ?? {};
    const artits = await PlaylistModel.find({
      ...constructorFilter
    })
      .skip(take * skip - take)
      .limit(take)
      // .where('id')
      // .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub')
      .sort({ createdAt: order === 'DESC' ? -1 : 1 })
      .lean()
      .exec();

    const totalCount = await PlaylistModel.countDocuments({
      ...constructorFilter
    });

    const totalFindedArtists = artits?.length ?? 0;
    const totalFinded = totalCount ?? 0;
    return {
      items: artits,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 1
      }
    };
  }
};

export default ResolverQueryPlaylist;
