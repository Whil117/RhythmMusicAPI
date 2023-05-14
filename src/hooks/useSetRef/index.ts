/* eslint-disable no-unused-vars */
import { SetStateAction } from 'jotai';
import { MutableRefObject, useEffect } from 'react';

const useSetRef = <T = any>(
  ref: MutableRefObject<T | any>,
  set: (e: SetStateAction<T>) => void
) => {
  useEffect(() => {
    if (ref.current as MutableRefObject<T | any>) {
      set(ref as any);
    }
  }, [ref, set]);
};

export default useSetRef;
