import * as yup from 'yup';

export default {
  schema: (selectedTab) => {
    if (selectedTab === 1) {
      return yup.object({
        first_team: yup.object({
          t_shirts: yup.string().required('errors.required'),
          shorts: yup.string().required('errors.required'),
        }),
        second_team: yup.object({
          t_shirts: yup.string().required('errors.required'),
          shorts: yup.string().required('errors.required'),
        }),
      });
    }
    if (selectedTab === 2) {
      return yup.object({
        first_team: yup.object({
          shirtfronts: yup.string().required('errors.required'),
        }),
        second_team: yup.object({
          shirtfronts: yup.string().required('errors.required'),
        }),
      });
    }
  },
};
