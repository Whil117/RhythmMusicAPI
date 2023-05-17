const convertPlaylists = (
  playlists?: SpotifyApi.PlaylistObjectSimplified[]
) => {
  return playlists?.map((item) => {
    return {
      collaborative: item?.collaborative,
      description: item?.description,
      spotify_url: item?.external_urls?.spotify,
      id: item?.id,
      photo: item?.images?.[0]?.url,
      name: item?.name,
      owner: {
        name: item?.owner?.display_name,
        id: item?.owner?.id,
        type: item?.owner?.type,
        uri: item?.owner?.uri,
        spotify_url: item?.owner?.external_urls?.spotify
      },
      total_tracks: item?.tracks?.total,
      uri: item?.uri
    };
  });
};

export default convertPlaylists;
