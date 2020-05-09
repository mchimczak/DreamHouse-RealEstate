import * as yup from 'yup';


const allowedChars = /^(?!.*[!@#$%^&*()\-_+={}[\]|\\;:'",<.>\/?]{2}).+$/
const SUPPORTED_FORMAT = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const estateValidationSchema = yup.object().shape({
        title: yup
                .string()
                .min(5, `Title should contain at least 5 characters`)
                .max(25, 'Limit excedeed. Please provide max 25 characters')
                .trim()
                .matches(allowedChars, 'Invalid input')
                .required('Title is required'),
        description: yup
                .string()
                .min(10, 'Description should contain at least 10 characters')
                .max(500, 'Limit excedeed. Please provide max 500 characters')
                .matches(allowedChars, 'Invalid input')
                .trim(),
        city: yup
                .string()
                .min(3, 'City should contain at least 3 characters')
                .max(25, 'Limit excedeed. Please provide max 25 characters')
                .matches(allowedChars, 'Invalid input')
                .trim()
                .required('City name is required'),
        address: yup
                .string()
                .min(5, 'Address should contain at least 5 characters')
                .max(25, 'Limit excedeed. Please provide max 25 characters')
                .matches(allowedChars, 'Invalid input')
                .trim()
                .required('Address is required'),
        area: yup
                .string()
                .matches(/^[1-9]\d{0,4}$/, "Area should be in range a value between 1 - 9999")
                .trim(),
        price: yup
                .string()
                .matches(/(^[1-9])\d{3,6}$/, "Price must be in range 999 - 9 999 999 $")
                .trim()
                .required('Price is required'),
        rooms: yup
                .string()
                .matches(/^[1-9]$/, "Please provide a number in range 1 - 9")
                .trim(),
        year: yup
                .string()
                .matches(/^(19[4-9]\d|20[0-1]\d|2020)$/, "Provide a value in range 1940 - 2020")
                .trim(),
        file: yup
                .array()
                .of(yup.mixed().test('type', "Unsupported file format", value => value && SUPPORTED_FORMAT.includes(value.type) ))
                .max(4, 'Please select up to 4 images')
        });

export default estateValidationSchema;