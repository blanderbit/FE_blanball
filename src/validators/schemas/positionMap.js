import * as yup from 'yup';

export default {
  schema: yup.object({
    region: yup.string().required('errors.required'),
    city: yup.string().required('errors.required'),
  }),
};
