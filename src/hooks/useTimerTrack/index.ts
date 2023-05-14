/* eslint-disable no-unused-vars */
import { PLAY_IFRAME_ATOM } from '@Components/@atoms/AtomPlayerIframe';
import useIframe from '@Utils/useRefIframe';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM, {
  InitialState
} from '_jotai/player/reducer';

type Props = {
  start?: number;
  end: number;
  play: boolean;
  ms?: number;
  repeat?: boolean;
  callback?: () => void;
  onCompleted: (controls: InitialState) => void;
};

export const timerAtom = atom(0);

const useTimer = (props: Props) => {
  const { ms } = props;
  const [timer, setTimer] = useAtom(timerAtom);
  const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const spotifyEmbedWindow = useIframe();

  useEffect(() => {
    const intervalTimer = setTimeout(() => {
      if (playIFRAME || controls?.controls?.repeat) {
        setTimer(0);
        setPlayIFRAME(true);
        spotifyEmbedWindow?.postMessage({ command: 'play' }, '*');
      }
    }, 1200);
    return () => clearInterval(intervalTimer);
  }, [controls?.currentTrack?.id]);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      if (props?.play) {
        if (props?.end) {
          if (timer >= props?.end) {
            props?.onCompleted(controls);
          } else {
            setTimer((prev: number) => prev + 1);
            clearTimeout(intervalTimer);
          }
        }
        clearTimeout(intervalTimer);
      }
    }, ms ?? 1000);

    return () => clearInterval(intervalTimer);
  }, [timer, props?.play, ms, props?.end, props.start]);

  return {
    timer,
    setTimer
  };
};

export default useTimer;
