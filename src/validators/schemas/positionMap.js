import * as yup from 'yup';
import { turnEmptyStrIntoUnderfined } from '@/utils/turnEmptyStrIntoUndefined'

export default {
  schema: (isDist) => {
    if (isDist) {
      return yup.object({
        region: yup.string().required('errors.required'),
        city: yup.string().required('errors.required'),
        dist: yup
          .number()
          .transform(turnEmptyStrIntoUnderfined)
          .required('errors.required')
          .typeError('errors.type-number'),
      });
    }
    return yup.object({
      region: yup.string().required('errors.required'),
      city: yup.string().required('errors.required'),
    });
  },
};
