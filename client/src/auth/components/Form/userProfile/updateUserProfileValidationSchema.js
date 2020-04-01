import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userValidationSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').trim(),
    password: yup.string().min(6, 'This filed should contain at least 6 characters').trim().required('Password is required'),
    avatar: yup.string().trim()
});

export default userValidationSchema;