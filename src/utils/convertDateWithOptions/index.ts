const convertDateWithOptions = (
  date: string,
  locale: 'en-US',
  options?: Intl.DateTimeFormatOptions
) => {
  const DateFormat = new Date(date).toLocaleString(locale, options);
  return `${DateFormat}`;
};

export default convertDateWithOptions;
