export default (number, minDecs = 2, maxDecs = 6, locale = "en-US") =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: minDecs,
    maximumFractionDigits: maxDecs
  })
    .format(number)
    .toLocaleString(locale);
