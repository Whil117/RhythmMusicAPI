/* eslint-disable no-unused-vars */
type Args = {
  command:
    | 'toggle'
    | 'playerReadyAck'
    | 'play'
    | 'togglePlay'
    | 'seek'
    | 'sendMessageToEmbed';
  timestamp?: number;
};

type Props = {
  contentWindow: {
    postMessage: (values: Args, Total?: string) => void;
  };
};

const useIframe = () => {
  const SPOTIFYIFRAMEREF = document?.querySelector(
    'iframe[src*="spotify.com/embed"]'
  ) as unknown as Props;

  const spotifyEmbedWindow = SPOTIFYIFRAMEREF?.contentWindow;
  return spotifyEmbedWindow;
};

export default useIframe;
