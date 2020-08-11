// This function get the date and hour like as string, and corvert both to typeof Date

function ConvertStringHourToInt(stringDate: string,stringHour: string): Date {
  const [unparsedYear, unparsedMonth, unparsedDay] = stringDate.split('-');

  const [unparsedHour, unparsedMinutes] = stringHour.split(':');

  const parsedYear = Number(unparsedYear);

  // Remember the function date, inicialize in zero(January is 0, february is 1)
  const parsedMonth = Number(unparsedMonth) - 1;

  const parsedDay = Number(unparsedDay);

  const parsedHour = Number(unparsedHour)  ;

  const parsedMinutes = Number(unparsedMinutes);

  const dateFormated = new Date(parsedYear, parsedMonth , parsedDay, parsedHour , parsedMinutes);

  console.log(dateFormated);

  return dateFormated;
}

export default ConvertStringHourToInt;
