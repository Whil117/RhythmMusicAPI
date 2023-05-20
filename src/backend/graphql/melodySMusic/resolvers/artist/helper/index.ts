const convertArtists = (artists?: SpotifyApi.ArtistObjectFull[]) => {
  return artists?.map((iterator) => ({
    id: iterator?.id,
    name: iterator?.name,
    photo: iterator?.images?.[0]?.url,
    followers: iterator?.followers?.total ?? 0,
    popularity: iterator?.popularity,
    genres: iterator?.genres,
    uri: iterator?.uri,
    spotify_url: iterator?.external_urls?.spotify
  }));
};

export default convertArtists;
