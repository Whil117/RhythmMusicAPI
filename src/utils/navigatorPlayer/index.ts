type NavigatorProps = {
  title: string;
  artist_name: string;
  album_name: string;
  image: string;
};

export const NavigatorPlayerMetadata = (props: NavigatorProps) => {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: props?.title,
    artist: props?.artist_name,
    album: props?.album_name,
    artwork: [
      {
        src: props.image,
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  });
};
