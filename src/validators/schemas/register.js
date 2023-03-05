import * as yup from 'yup'

export default {
    schema: (currentStep) => {
        if (currentStep === 1) {
            return yup.object({
                gender: yup.string().required('errors.required'),
                profile: yup.object({
                    name: yup
                        .string()
                        .required('errors.required')
                        .userName('errors.invalid-name'),
                    last_name: yup
                        .string()
                        .required('errors.required')
                        .userName('errors.invalid-name'),
                }),
            })
        }
        if (currentStep === 2) {
            return yup.object({
                email: yup.string().required('errors.required').email('errors.email'),
                password: yup
                    .string()
                    .required('errors.required')
                    .min(8, 'errors.min8')
                    .max(68, 'errors.max68'),
                re_password: yup
                    .string()
                    .required('errors.required')
                    .min(8, 'errors.min8')
                    .max(68, 'errors.max68')
                    .when('password', (password, field) =>
                        password
                            ? field
                                .required('errors.required')
                                .oneOf([yup.ref('password')], 'errors.same-password')
                            : field
                    ),
                phone: yup
                    .string()
                    .required('errors.required')
                    .min(19, 'errors.invalid-phone'),
            })
        }
        if (currentStep === 8) {
            return yup.object({
                day: yup.string().required('errors.required'),
                month: yup.string().required('errors.required'),
                year: yup.string().required('errors.required'),
            })
        }
        if (currentStep === 9) {
            return yup.object({
                height: yup
                    .number()
                    .typeError('errors.type-number')
                    .required('errors.required')
                    .min(145, 'errors.min145')
                    .max(210, 'errors.max210'),
                weight: yup
                    .number()
                    .typeError('errors.type-number')
                    .required('errors.required')
                    .min(30, 'errors.min30')
                    .max(210, 'errors.max210'),
                position: yup.string().required('errors.required'),
                working_leg: yup.string().required('errors.required'),
            })
        }
        if (currentStep === 10) {
            return yup.object({
                region: yup.string().required('errors.required'),
                city: yup.string().required('errors.required'),
                address: yup.string().required('errors.required'),
            })
        }
        return yup.object({})
    }
}