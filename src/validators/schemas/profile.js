import * as yup from 'yup';
import userNameValidator from '../methods/userName';

userNameValidator('errors.invalid-name');

export default {
    schema: yup.object({
        last_name: yup
            .string()
            .required('errors.required')
            .userName('errors.invalid-name'),
        name: yup
            .string()
            .required('errors.required')
            .userName('errors.invalid-name'),
        about_me: yup.string().nullable(),
        day: yup.string().required('errors.required'),
        month: yup.string().required('errors.required'),
        year: yup.string().required('errors.required'),
        height: yup
            .number()
            .typeError('errors.type-number')
            .required('errors.required')
            .min(145, 'errors.min145')
            .max(250, 'errors.max250'),
        weight: yup
            .number()
            .typeError('errors.type-number')
            .required('errors.required')
            .min(30, 'errors.min30')
            .max(200, 'errors.max250'),
        working_leg: yup.string().required('errors.required'),
        position: yup.string().nullable().required('errors.required'),
        phone: yup
            .string()
            .required('errors.required')
            .min(19, 'errors.invalid-phone'),
        config_phone: yup.boolean().required('errors.required'),
        config_email: yup.boolean().required('errors.required'),
        show_reviews: yup.boolean().required('errors.required'),
        planned_events: yup.string().required('errors.required'),
    }),
};
