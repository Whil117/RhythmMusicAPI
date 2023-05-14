import parseImage from '../parseImage';
// interface Colors {
//   /**
//    * Color in hexadecimal string
//    * @example '#62342b'
//    */
//   hex: string;
//   /**
//    * Red canal from 0 to 255
//    * @example 98
//    */
//   red: number;
//   /**
//    * Green canal from 0 to 255
//    * @example 52
//    */
//   green: number;
//   /**
//    * Blue canal from 0 to 255
//    * @example 43
//    */
//   blue: number;
//   /**
//    * Area of the color and his neighbouring colors from 0 to 1
//    * @example 0.5915
//    */
//   area: number;
//   /**
//    * Color saturation from 0 to 1
//    * @example 0.2156862
//    */
//   saturation: number;
// }

export const getColorByIMG = async (url: string, maxColors?: number) =>
  await parseImage({
    maxColors: maxColors ?? 2,
    onError: function (): void {
      throw new Error('Function not implemented.');
    },
    rgb: false,
    src: url
  });

// const filterHexColors = (colors: Colors[]) => {
//   let result = [];

//   for (const iterator of colors) {
//     const hex = (iterator.red + iterator.green + iterator.blue) / 3;
//     const isAccept = hex < 200 && hex > 30;
//     if (isAccept) {
//       result.push(iterator);
//     }
//   }
//   return result;
// };

const getColorImage = async (src: string) => {
  const colors = await getColorByIMG(src, 2);
  return colors?.map((item) => ({ hex: item as string }));
};
export default getColorImage;
