import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

import { withFormik, Field } from "formik";

const StyledForm = styled.form`
display: grid;
z-index: 999;
width: 90%;
max-width: 900px;
padding: 3rem 2rem;
margin-top: 150px;
border-radius: 3px;
background-color: ${({theme}) => theme.colors.white};
align-items: center;

${({theme}) => theme.media.tablet} {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
}
`
const StyledFieldWrapper = styled.div`
display: flex;
flex-direction: column;
border-radius: 3px;
`
const StyledLabel = styled.label`
font-weight: ${({theme}) => theme.font.thin};;
text-transform: capitalize;
font-size: 12px;
color: ${({theme}) => theme.colors.dark};
margin-top: .8rem;
${({theme}) => theme.media.tablet} {
    margin-top: 1.8rem;
}
`
const StyledField = styled(Field)`
border: none;
background-color: ${({theme, background}) => background || theme.colors.lightgrey};
padding: 1.25rem 1.4rem;
border: ${({border}) => border || 'none'};
&::focus {
    color: red;
}
`
const StyledButton = styled.button`
background-color: ${({isValid}) => isValid ? '#ff9925' : 'darkgrey'};
color: ${({isValid}) => isValid ? 'white' : 'black'};
padding: 15px;
margin-top: 4rem;
border: none;
${({theme}) => theme.media.tablet} {
    grid-column: auto / span 3;
}
`


const MyForm = props => {
    const { touched, errors, handleChange, handleSubmit, isSubmitting } = props;
    return (
        <StyledForm onSubmit={handleSubmit}>
            <h4>Edit estate card</h4>
            {[
            "title",
            "description",
            "city",
            "address",
            "price",
            "area",
            "rooms",
            "year"
            ].map(el => {
                    return (
                        <StyledFieldWrapper key={el}>
                            <StyledLabel htmlFor={el}>
                                {(touched[el] && errors[el]) ? errors[el] : el}
                            </StyledLabel>
                            <StyledField
                                type="text"
                                name={el}
                                border={touched[el] && errors[el] && '1px solid #f18080'}
                                background={touched[el] && errors[el] && '#ffacac'}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </StyledFieldWrapper>
                    );
            })}
            <StyledButton type="submit" disabled={isSubmitting} isValid={Object.keys(errors).length === 0}>Submit</StyledButton>
        </StyledForm>
        );
    };



    const MyEnhancedForm = withFormik({
        mapPropsToValues: (props) => ({
                    title: props.title,
                    description: props.description,
                    city: props.city,
                    address: props.address,
                    area: props.area,
                    price: props.price,
                    rooms: props.rooms,
                    year: props.year
                }),
        validationSchema: yup.object().shape({
            title: yup.string().min(5, `This filed should contain at least 5 characters`).trim().required('Title is required'),
            description: yup.string().min(10, 'This filed should contain at least 10 characters').trim(),
            city: yup.string().min(3, 'This filed should contain at least 3 characters').trim().required('City name is required'),
            address: yup.string().min(5, 'This filed should contain at least 5 characters').trim().required('Address is required'),
            area: yup.string().matches(/^[1-9]\d{0,4}$/, "Pick a value between 1 - 9999").trim(),
            price: yup.string().matches(/(^[1-9])\d{3,}$/, "Price must be greater than 999").trim().required('Price is required'),
            rooms: yup.string().matches(/^1\d{0,1}$/, "Number of rooms can't be greater than 19").trim(),
            year: yup.string().matches(/^(19[4-9]\d|20[0-1]\d|2020)$/, "Provide a value between 1940-2020").trim(),
        }) ,

        handleSubmit: (values, bag) => {
            bag.resetForm();
            bag.props.editEstate(bag.props.id, values);
        },
        displayName: "BasicForm"
    })(MyForm);

export default MyEnhancedForm;
