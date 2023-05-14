/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vibrant from 'node-vibrant';
import { Vec3 } from 'node-vibrant/lib/color';
import { ImageSource } from 'node-vibrant/lib/typing';
import { ReactNode } from 'react';

export type Props = {
  onError?: (err: Object) => void;
  getColors?: (colors: (string | Vec3)[]) => void;
  rgb: boolean;
  src: string;
  maxColors: number;
  children?: ReactNode;
};

export type Image = ImageSource;

const parseImage = async (props: Props) => {
  const colors = await Vibrant.from(props?.src)
    .maxColorCount(props.maxColors)
    .getSwatches()
    .then((swatches) => {
      props?.getColors &&
        props?.getColors(
          getColorsFromSwatches(swatches as getColorsFromSwatches, props)
        );
      return getColorsFromSwatches(swatches as getColorsFromSwatches, props);
    });
  return colors;
};

export type getColorsFromSwatches = {
  [key: string]: {
    getHex: () => string;
    getRgb: () => Vec3;
  };
};

export const getColorsFromSwatches = (
  swatches = {} as getColorsFromSwatches,
  props: Props
) => {
  const colors = Object.entries(swatches).map(([key, swatch]) => {
    return props?.rgb ? swatch?.getRgb() : swatch?.getHex();
  });

  return colors;
};

export default parseImage;
