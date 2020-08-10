function ConvertIntHourToString(intHour: number): string {
  const hourMod = intHour % 60;

  // If hour is XX:00
  if (hourMod === 0) {
    const parsedHour = intHour / 60;
    const formatedHour = `${parsedHour}:00`;

    return formatedHour;
  }

  const parsedHour = Math.floor(intHour / 60);
  const formatedHour = `${parsedHour}:${hourMod}`;

  return formatedHour;
}

export default ConvertIntHourToString;
