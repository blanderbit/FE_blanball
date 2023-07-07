import * as yup from 'yup';

export default {
  schema: yup.object({
    message: yup.string().max(500, 'errors.max500'),
  }),
};
