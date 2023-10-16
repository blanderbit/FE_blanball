import yup from '../yup'
import { CONSTS } from '@consts'

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
                .durationMustBeRound(time, 'errors.duration-must-be-round');
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
          .transform(turnEmptyStrIntoUnderfined)
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
              .transform((value, originalValue) =>
                typeof originalValue === 'string' &&
                originalValue?.trim() === ''
                  ? undefined
                  : value
              )
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
                .max(265, 'errors.max265');
            return schema;
          }),
      });
    }
    if (currentStep === 3) {
      return yup.object({
        description: yup.string().required('errors.required'),
        need_form: yup.string().required('errors.required'),
        forms: yup.object({}).required('errors.required'),
        contact_number: yup
          .string()
          .required('errors.required')
          .matches(CONSTS.regex.PHONE_NUMBER_UKRAINE, 'errors.invalid-phone'),
      });
    }
    return yup.object({
      gender: yup.string().required('errors.required'),
      type: yup.string().required('errors.required'),
      name: yup.string().required('errors.required').max(255, 'errors.max255'),
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
              .durationMustBeRound(time, 'errors.duration-must-be-round');
          return schema;
        }),
      place: yup.object({
        place_name: yup.string().required(() => 'errors.required'),
        lat: yup.number().required('errors.required'),
        lon: yup.number().required('errors.required'),
      }),
      privacy: yup.boolean().required('errors.required'),
      is_price: yup.boolean().required('errors.required'),
      amount_members: yup
        .number()
        .typeError('errors.type-number')
        .transform(turnEmptyStrIntoUnderfined)
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
            .transform(turnEmptyStrIntoUnderfined)
            .required('errors.required')
            .min(1, 'errors.min1')
            .max(32767, 'errors.max32767'),
        }),
      price_description: yup
        .string('errors.required')
        .nullable()
        .when('price', (price, schema) => {
          if (price)
            return schema.required('errors.required').max(265, 'errors.max265');
          return schema;
        }),
      description: yup.string().required('errors.required'),
      need_form: yup.string().required('errors.required'),
      forms: yup.object({}).required('errors.required'),
      contact_number: yup
        .string()
        .required('errors.required')
        .matches(CONSTS.regex.PHONE_NUMBER_UKRAINE, 'errors.invalid-phone'),
    });
  },
};
