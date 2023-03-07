import * as yup from 'yup';

export default {
  schema: yup.object({
    verify_code: yup.string().required('errors.required').min(5, 'errors.min5'),
  }),
};
