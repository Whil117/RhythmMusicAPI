type Input = {
  r: number;
  g: number;
  b: number;
};
const TrainedNet = (input: Input) => {
  const convert = new Float32Array([input['r'], input['g'], input['b']]);
  return {
    white:
      1 /
      (1 +
        1 /
          Math.exp(
            -10.37766170501709 +
              (12.204835891723633 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      6.169667720794678 -
                        4.042087078094482 * (convert[0] || 0) -
                        19.438833236694336 * (convert[1] || 0) +
                        14.434931755065918 * (convert[2] || 0)
                    )) +
              (11.918014526367188 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      2.6512327194213867 -
                        3.513329029083252 * (convert[0] || 0) -
                        17.795860290527344 * (convert[1] || 0) +
                        17.435640335083008 * (convert[2] || 0)
                    )) +
              (9.877058982849121 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      5.760010242462158 -
                        3.2945780754089355 * (convert[0] || 0) -
                        8.6066312789917 * (convert[1] || 0) -
                        7.926300525665283 * (convert[2] || 0)
                    ))
          )),
    black:
      1 /
      (1 +
        1 /
          Math.exp(
            10.386853218078613 -
              (12.263668060302734 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      6.169667720794678 -
                        4.042087078094482 * (convert[0] || 0) -
                        19.438833236694336 * (convert[1] || 0) +
                        14.434931755065918 * (convert[2] || 0)
                    )) -
              (11.879143714904785 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      2.6512327194213867 -
                        3.513329029083252 * (convert[0] || 0) -
                        17.795860290527344 * (convert[1] || 0) +
                        17.435640335083008 * (convert[2] || 0)
                    )) -
              (9.865546226501465 * 1) /
                (1 +
                  1 /
                    Math.exp(
                      5.760010242462158 -
                        3.2945780754089355 * (convert[0] || 0) -
                        8.6066312789917 * (convert[1] || 0) -
                        7.926300525665283 * (convert[2] || 0)
                    ))
          ))
  };
};

// const train = [
//   { input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 } },
//   { input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 } },
//   { input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
//   { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
//   { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
//   { input: { r: 0.07, g: 0.34, b: 0.0 }, output: { white: 1 } },
//   { input: { r: 1.0, g: 0.5, b: 0.5 }, output: { black: 1 } }
// ];

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) ?? [];
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};

const isBackDark = (hex: string) => {
  const RESULTBLACKORWHITE = TrainedNet(hexToRgb(hex));

  if (RESULTBLACKORWHITE.black > RESULTBLACKORWHITE.white) {
    return '#000000';
  }
  return '#fff';
};

export default isBackDark;
