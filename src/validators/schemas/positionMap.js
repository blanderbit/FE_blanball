import * as yup from 'yup';

export default {
  schema: (isDist) => {
    if (isDist) {
      return yup.object({
        region: yup.string().required('errors.required'),
        city: yup.string().required('errors.required'),
        dist: yup
          .number()
          .transform((value, originalValue) =>
            typeof originalValue === 'string' && originalValue?.trim() === ''
              ? undefined
              : value
          )
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
