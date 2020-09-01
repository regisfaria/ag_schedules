interface Request {
  id: string;
  openTime: number;
  closeTime: number;
}

class ListSchedulesAvailableForRest {
  public async execute({ openTime, closeTime }: Request): Promise<number[]> {
    let formatedOpenHour = 0;
    let formatedCloseHour = 0;
    let formatedCloseMinute = 0;

    const startTimeMod = openTime % 60;

    if (startTimeMod === 0) {
      formatedOpenHour = openTime / 60;
    } else {
      formatedOpenHour = Math.floor(openTime / 60);
    }

    const closeTimeMod = closeTime % 60;

    if (closeTimeMod === 0) {
      formatedCloseHour = closeTime / 60;
    } else {
      formatedCloseHour = Math.floor(closeTime / 60);
      formatedCloseMinute = closeTimeMod;
    }

    const createArrayForStartHours = Array.from(
      { length: formatedCloseHour - formatedOpenHour - 1 },
      (_, index) => index + formatedOpenHour + 1,
    );

    if (formatedCloseMinute !== 59) {
      createArrayForStartHours.pop();
    }

    return createArrayForStartHours;
  }
}

export default ListSchedulesAvailableForRest;
