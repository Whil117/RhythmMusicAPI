/* eslint-disable no-unused-vars */
const getterFilterTracks = (
  filter: { [key: string]: string },
  currentKeys: (value: string) => any
) => {
  return Object.entries(filter).reduce((acc, curr) => {
    const key = curr?.[0];
    const value = curr?.[1];

    const filt = currentKeys?.(value)?.[key];
    return {
      ...acc,
      ...filt
    };
  }, {});
};

export default getterFilterTracks;
