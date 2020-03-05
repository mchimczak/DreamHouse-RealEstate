import * as yup from 'yup';

const estateValidationSchema = yup.object().shape({
            title: yup.string().min(5, `This filed should contain at least 5 characters`).trim().required('Title is required'),
            description: yup.string().min(10, 'This filed should contain at least 10 characters').trim(),
            city: yup.string().min(3, 'This filed should contain at least 3 characters').trim().required('City name is required'),
            address: yup.string().min(5, 'This filed should contain at least 5 characters').trim().required('Address is required'),
            area: yup.string().matches(/^[1-9]\d{0,4}$/, "Pick a value between 1 - 9999").trim(),
            price: yup.string().matches(/(^[1-9])\d{3,}$/, "Price must be greater than 999").trim().required('Price is required'),
            rooms: yup.string().matches(/^[1-9]$/, "Please select a number in the range of 1-9").trim(),
            year: yup.string().matches(/^(19[4-9]\d|20[0-1]\d|2020)$/, "Provide a value between 1940-2020").trim(),
        });

export default estateValidationSchema;