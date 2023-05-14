import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';
import getColorImage from './extractColors';

export const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/800px-A_black_image.jpg?20201103073518';

const COLOR_IMG_ATOM = atomWithStorage('IMAGESWAP', defaultImage);
export const COLORS_ATOM = atom(
  async (get) => (await getColorImage(get(COLOR_IMG_ATOM))) ?? ['#000000']
);

const UseColor = (URL: string) => {
  const setColorURL = useSetAtom(COLOR_IMG_ATOM);
  const [color] = useAtom(COLORS_ATOM);
  useEffect(() => {
    setColorURL((URL as string) ?? defaultImage);
  }, [URL]);
  return color;
};

export default UseColor;
