import { atom, useAtom, useAtomValue } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { useEffect } from 'react';

type Props = {
  start?: number;
  end?: number;
  ms?: number;
  callback?: () => void;
};

export const loadTimerAtom = atom(true);
export const DragPagesAtom = atom(false);
const timerAtom = atomFamily((init: number) => {
  const timerInsideAtom = atom(init, (_, set, arg: number) => {
    set(loadTimerAtom, false);
    set(timerInsideAtom, arg);
  });
  return timerInsideAtom;
});

const useTimerDrag = (props: Props) => {
  const { start, end, ms, callback } = props;
  const drag = useAtomValue(DragPagesAtom);
  const [timer, setTimer] = useAtom(timerAtom(start ?? 3));
  const [load, setLoad] = useAtom(loadTimerAtom);

  useEffect(() => {
    if (drag) {
      const intervalTimer = setInterval(() => {
        if (timer === (end ?? 3)) {
          if (!load && callback) callback();
          clearTimeout(intervalTimer);
          setLoad(true);
        } else {
          setTimer(timer + 1);
        }
      }, ms ?? 1000);

      return () => clearInterval(intervalTimer);
    }
  }, [timer, drag]);

  return {
    timer,
    setTimer
  };
};

export default useTimerDrag;
