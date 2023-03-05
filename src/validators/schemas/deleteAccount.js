import * as yup from 'yup';

export default {
  schema: (currentStep) => {
    if (currentStep === 2) {
      return yup.object({
        verify_code: yup
          .string()
          .required('errors.required')
          .min(5, 'errors.min5'),
      });
    } else {
      return yup.object({});
    }
  },
};
