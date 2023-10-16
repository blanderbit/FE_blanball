const NOUGHT = 0;
const ONE = 1;

const validateMinStartTime = function (errorMessage) {
  return this.test('isOneHourLater', errorMessage, function (time) {
    try {
      const splitTimeString = time.split(':');
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const hour = parseInt(splitTimeString[NOUGHT]);
      const minute = parseInt(splitTimeString[ONE]);

      return (
        hour > currentHour + ONE ||
        (hour === currentHour + ONE && minute > currentMinute)
      );
    } catch {
      return false;
    }
  });
};

export default validateMinStartTime;
