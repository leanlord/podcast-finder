export const formatDate = (date) => {
  const formattedDate = getDate(date);
  return `${formattedDate.day} ${monthNames[formattedDate.month]} ${
    formattedDate.year
  }`;
};

const getDate = (date) => {
  const d = new Date(date);
  const month = d.getMonth();
  const day = "" + d.getDate();
  const year = "" + d.getFullYear();
  return {
    month,
    day,
    year,
  };
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
