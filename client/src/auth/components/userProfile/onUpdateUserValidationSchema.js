import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTED_FORMAT = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const userValidationSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    phone: yup.string().min(9, 'Phone number should contains 9 digits').max(9, 'Phone number should contains 9 digits').matches(phoneRegExp, 'Phone number is not valid').trim(),
    password: yup.string().min(6, 'This filed should contain at least 6 characters').trim(),
    file: yup.array().of(yup.mixed().test('type', "Unsupported file format", value => value && SUPPORTED_FORMAT.includes(value.type) ))
    .max(1, 'Please select only 1 image')
});

export default userValidationSchema;