import * as yup from 'yup';

export default {
  schema: yup.object({
    name: yup.string().max(355, 'errors.max355'),
  }),
};
