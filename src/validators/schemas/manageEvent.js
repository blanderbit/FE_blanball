import * as yup from 'yup';
import eventMinStartTimeValidator from '../methods/eventMinStartTime';

eventMinStartTimeValidator('errors.time-more-than-one-hour');

yup.addMethod(yup.mixed, 'duration10min3hours', function (startTime, errorMessage) {
  return this.test('duration10min3hours', errorMessage, function (value) {
    try {
      const start_time_hours = parseInt(startTime.split(':')[0]);
      const end_time_hours = parseInt(value.split(':')[0]);
      const start_time_minutes = parseInt(startTime.split(':')[1]);
      const end_time_minutes = parseInt(value.split(':')[1]);
      const maxDifference = 180; // 3 hours in 10-minute increments
      const minDifference = 1; // 10 minutes in 10-minute increments
      const start_time = start_time_hours * 6 + start_time_minutes / 10;
      const end_time = end_time_hours * 6 + end_time_minutes / 10;
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
});

yup.addMethod(yup.mixed, 'durationMustBeRound', function (startTime, errorMessage) {
  return this.test('durationMustBeRound', errorMessage, function (value) {
    try {
      const [hours1, minutes1] = startTime.split(':').map(Number);
      const [hours2, minutes2] = value.split(':').map(Number);
      const totalMinutes1 = hours1 * 60 + minutes1;
      const totalMinutes2 = hours2 * 60 + minutes2;
      const timeDifference = Math.abs(totalMinutes1 - totalMinutes2);
      return timeDifference % 10 === 0;
    } catch {
      return false;
    }
  });
});

export default {
  schema: (currentStep) => {
    if (currentStep === 1) {
      return yup.object({
        gender: yup.string().required('errors.required'),
        type: yup.string().required('errors.required'),
        name: yup
          .string()
          .required('errors.required')
          .max(255, 'errors.max255'),
        time: yup
          .string()
          .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'errors.invalid-time')
          .min(5, 'errors.invalid-time')
          .required('errors.required')
          .isOneHourLater('errors.time-more-than-one-hour'),
        end_time: yup
          .string()
          .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'errors.invalid-time')
          .required('errors.required')
          .min(5, 'errors.invalid-time')
          .when('time', (time, schema, value) => {
            if (time)
              return schema
               .duration10min3hours(time, 'errors.duration-10min-3hours')
               .durationMustBeRound(time, 'errors.duration-must-be-round')
            return schema;
          }),
        place: yup.object({
          place_name: yup.string().required(() => 'errors.required'),
          lat: yup.number().required('errors.required'),
          lon: yup.number().required('errors.required'),
        }),
      });
    }
    if (currentStep === 2) {
      return yup.object({
        privacy: yup.boolean().required('errors.required'),
        is_price: yup.boolean().required('errors.required'),
        amount_members: yup
          .number()
          .typeError('errors.type-number')
          .required('errors.required')
          .min(6, 'errors.min6')
          .max(50, 'errors.max50'),
        price: yup
          .number('errors.type-number')
          .nullable()
          .when('is_price', {
            is: true,
            then: yup
              .number()
              .typeError('errors.type-number')
              .required('errors.required')
              .min(1, 'errors.min1')
              .max(32767, 'errors.max32767'),
          }),
        price_description: yup
          .string('errors.required')
          .nullable()
          .when('price', (price, schema) => {
            if (price)
              return schema
                .required('errors.required')
                .max(500, 'errors.max500');
            return schema;
          }),
      });
    }
    if (currentStep === 3) {
      return yup.object({
        description: yup.string().required('errors.required'),
        need_form: yup.string().required('errors.required'),
        is_phone_shown: yup.boolean().nullable(),
        forms: yup.object({}).required('errors.required'),
        contact_number: yup
          .string()
          .nullable()
          .when('is_phone_shown', {
            is: true,
            then: yup
              .string()
              .required('errors.required')
              .min(19, 'errors.invalid-phone'),
          }),
      });
    }
  },
};
