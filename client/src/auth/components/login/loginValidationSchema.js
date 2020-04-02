import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
    email: yup.string().email().trim().required('Email is required'),
    password: yup.string().min(6, 'Password should contain at least 6 characters').trim().required('Password is required')
});

export default userValidationSchema;