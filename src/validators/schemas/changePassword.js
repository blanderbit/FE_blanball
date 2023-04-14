import * as yup from 'yup';

export default {
  schema: (currentStep) => {
    if (currentStep === 1) {
      return yup.object({
        old_password: yup
          .string()
          .required('errors.required')
          .min(8, 'errors.min8')
          .max(68, 'errors.max68'),
        new_password: yup
          .string()
          .required('errors.required')
          .min(8, 'errors.min8')
          .max(68, 'errors.max68')
      });
    }
    if (currentStep === 2) {
      return yup.object({
        verify_code: yup
          .string()
          .required('errors.required')
          .min(5, 'errors.min5'),
      });
    }
    return yup.object({});
  },
};
