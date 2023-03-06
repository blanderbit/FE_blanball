import * as yup from 'yup';

export default {
  schema: yup.object({
    title: yup.string().required('errors.required').max(255, 'errors.max255'),
  }),
};
