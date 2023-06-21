import { CONFIG_SPOTIFY } from '@Config/spotify';

const convertAlbums = async (albums?: SpotifyApi.AlbumObjectSimplified[]) => {
  return await Promise.all(
    albums?.map(async (item) => {
      const albm = await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(item?.id);
      return {
        id: item?.id,
        album_type: item?.album_type,
        artists: item?.artists?.map((item) => ({
          id: item?.id,
          name: item?.name,
          spotify_url: item?.external_urls?.spotify,
          uri: item?.uri
        })),
        album_group: albm?.body?.album_group,
        label: albm?.body?.label,
        popularity: albm?.body?.popularity,
        available_markets: item?.available_markets,
        spotify_url: item?.external_urls?.spotify,
        photo: item?.images?.[0]?.url,
        name: item?.name,
        release_date: item?.release_date,
        release_date_precision: item?.release_date_precision,
        total_tracks: item?.total_tracks,
        uri: item?.uri
      };
    }) ?? []
  );
};

export default convertAlbums;
