const formatHours = (date) => {
  const result = date.split('T')[1].split(':');

  const hours = `${result[0]}:${result[1]}`;
  return hours;
};

export default formatHours;
