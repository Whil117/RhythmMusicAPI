const convertWithCommas = (numbers: number) => {
  return `${numbers
    ?.toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Followers`;
};
export default convertWithCommas;
