import * as yup from 'yup';

export default {
  schema: yup.object({
    email: yup.string().email('errors.email').required('errors.required'),
    save_credentials: yup.boolean(),
    password: yup
      .string()
      .required('errors.required')
      .min(8, 'errors.min8')
      .max(68, 'errors.max68'),
  }),
};
