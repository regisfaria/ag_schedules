function ConvertStringHourToInt(stringHour: string): number {
  const [unparsedHour, unparsedMinutes] = stringHour.split(':');

  const parsedHour = Number(unparsedHour) * 60 + Number(unparsedMinutes);

  return parsedHour;
}

export default ConvertStringHourToInt;
