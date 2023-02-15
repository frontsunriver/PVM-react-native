export function convertEpochToDateMonthYear(epoch) {
  const epochDate = new Date(epoch);
  const date = epochDate.getDate();
  const year = epochDate.getFullYear();
  const month = epochDate.getMonth();
  let monthInString = "January";

  const hours = epochDate.getHours();
  const minutes = epochDate.getMinutes();

  switch (month) {
    // if month = 1
    case 1:
      monthInString = "February";
      break;

    case 2:
      monthInString = "March";
      break;

    case 3:
      monthInString = "April";
      break;

    case 4:
      monthInString = "May";
      break;

    case 5:
      monthInString = "June";
      break;

    case 6:
      monthInString = "July";
      break;

    case 7:
      monthInString = "August";
      break;

    case 8:
      monthInString = "September";
      break;

    case 9:
      monthInString = "October";
      break;

    case 10:
      monthInString = "November";
      break;

    case 11:
      monthInString = "December";
      break;
  }

  return `${date} ${monthInString} ${year}, ${hours}:${minutes}`;
}
