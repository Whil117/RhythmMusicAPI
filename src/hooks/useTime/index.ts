import { ISong } from '@Types/index';

type Tracks = ISong;

export type UseTimeProps = { tracks?: Tracks[]; duration_ms?: number };

const convertMsToTime = (duration_ms: number) => {
  const hours = Math.floor(duration_ms / 3600000);
  const minutes = Math.floor(duration_ms / 60000) - hours * 60;
  const seconds = Math.round((duration_ms % 60000) / 1000);
  return {
    hours,
    minutes,
    seconds
  };
};

const reduceDuration = (tracks?: Tracks[]) => {
  let result = 0;
  for (const iterator of tracks ?? []) {
    result += iterator?.duration_ms || 0;
  }
  return result;
};

export function addLeadingZeros(num: number) {
  return String(num).padStart(2, '0');
}

const useTime = ({ tracks, duration_ms }: UseTimeProps) => {
  const ARRTRACKS = tracks as Tracks[];
  const isTracks = ARRTRACKS?.length > 0;
  const tracksMs = reduceDuration(tracks);
  const returnMs = convertMsToTime(tracksMs || (duration_ms as number));

  if (isTracks) {
    if (returnMs?.hours !== 0) {
      return `${returnMs?.hours} Hrs ${addLeadingZeros(
        returnMs?.minutes
      )} Mins`;
    }
    return `${returnMs?.minutes} Mins`;
  } else if (duration_ms) {
    return `${returnMs?.minutes}:${addLeadingZeros(returnMs?.seconds)}`;
  }
};
export default useTime;
