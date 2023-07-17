import * as yup from 'yup';

export default {
  schema: yup.object({
    name: yup.string().required('errors.required').max(355, 'errors.max355'),
  }),
};
