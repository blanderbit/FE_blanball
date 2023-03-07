import * as yup from 'yup';

export default {
  schema: (currentStep) => {
    if (currentStep === 1) {
      return yup.object({
        email: yup.string().email('errors.email').required('errors.required'),
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
    if (currentStep === 3) {
      return yup.object({
        new_password: yup
          .string()
          .required('errors.required')
          .min(8, 'errors.min8')
          .max(68, 'errors.max68'),
        confirm_new_password: yup
          .string()
          .required('errors.required')
          .min(8, 'errors.min8')
          .max(68, 'errors.max68')
          .oneOf([yup.ref('new_password'), null], 'errors.same-password'),
      });
    }
    return yup.object({});
  },
};
