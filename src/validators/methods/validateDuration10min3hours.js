const NOUGHT = 0;
const ONE = 1;
const SIX = 6;
const TEN = 10;
const ONE_HUNDRED_EIGHTY = 180;

const validateDuration10min3hours = function (startTime, errorMessage) {
  return this.test('duration10min3hours', errorMessage, function (value) {
    try {
      const splitStartTimeString = startTime.split(':');
      const splitValueString = value.split(':');
      const start_time_hours = parseInt(splitStartTimeString[NOUGHT]);
      const end_time_hours = parseInt(splitValueString[NOUGHT]);
      const start_time_minutes = parseInt(splitStartTimeString[ONE]);
      const end_time_minutes = parseInt(splitValueString[ONE]);
      const maxDifference = ONE_HUNDRED_EIGHTY; // 3 hours in 10-minute increments
      const minDifference = ONE; // 10 minutes in 10-minute increments
      const start_time = start_time_hours * SIX + start_time_minutes / TEN;
      const end_time = end_time_hours * SIX + end_time_minutes / TEN;
      const timeDifference = end_time - start_time;

      if (timeDifference > maxDifference) {
        return false;
      }

      if (timeDifference < minDifference) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  });
};

export default validateDuration10min3hours;
