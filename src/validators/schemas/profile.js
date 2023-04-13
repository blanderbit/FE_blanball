import * as yup from 'yup';
import userNameValidator from '../methods/userName';

userNameValidator('errors.invalid-name');

export default {
  schema: yup.object({
    last_name: yup
      .string()
      .required('errors.required')
      .userName('errors.invalid-name')
      .max(20, 'errors.max20'),
    name: yup
      .string()
      .required('errors.required')
      .userName('errors.invalid-name')
      .max(20, 'errors.max20'),
    about_me: yup.string().nullable().max(110, 'errors.max110'),
    day: yup.string().nullable(),
    month: yup.string().nullable(),
    year: yup.string().nullable(),
    height: yup
      .number()
      .typeError('errors.type-number')
      .nullable()
      .min(145, 'errors.min145')
      .max(210, 'errors.max210')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      }),
    weight: yup
      .number()
      .typeError('errors.type-number')
      .nullable()
      .min(30, 'errors.min30')
      .max(210, 'errors.max210')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      }),
    working_leg: yup.string().nullable(),
    position: yup.string().nullable(),
    phone: yup
      .string()
      .required('errors.required')
      .matches(
        /^(\+38|38)?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/,
        'errors.invalid-phone'
      ),
    config_phone: yup.boolean().required('errors.required'),
    config_email: yup.boolean().required('errors.required'),
    show_reviews: yup.boolean().required('errors.required'),
    planned_events: yup.string().required('errors.required'),
  }),
};
