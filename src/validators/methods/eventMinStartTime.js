import * as yup from 'yup';

const eventMinStartTimeValidator = (errorMessage) => {
  yup.addMethod(yup.string, 'isOneHourLater', function () {
    return this.test('isOneHourLater', errorMessage, function (time) {
      try {
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const hour = parseInt(time.split(':')[0]);
        const minute = parseInt(time.split(':')[1]);
        return (
          hour > currentHour + 1 ||
          (hour === currentHour + 1 && minute > currentMinute)
        );
      } catch {
        return false;
      }
    });
  });
};

export default eventMinStartTimeValidator;
