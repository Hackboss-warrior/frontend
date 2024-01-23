const dateFormat = (zuluDatestring) => {
  const zuluDate = new Date(zuluDatestring);
  const day = zuluDate.getUTCDate();
  const month = zuluDate.getUTCMonth() + 1;
  const year = zuluDate.getUTCFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${day}/${formattedMonth}/${year}`;
};

export default dateFormat;
