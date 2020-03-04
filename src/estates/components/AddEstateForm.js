import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

import { withFormik, Field } from "formik";

const StyledForm = styled.form`
display: flex;
flex-direction: column;

${({theme}) => theme.media.tablet} {
    padding: 2rem 0;
}
`
const StyledFieldWrapper = styled.div`
display: flex;
flex-direction: column;
border-radius: 3px;

& label {
    font-weight: ${({theme}) => theme.font.thin};;
    text-transform: capitalize;
    font-size: 12px;
    color: ${({theme}) => theme.colors.dark};
    margin-top: 1.8rem;
}
& input {
    border: none;
    background-color: ${({theme}) => theme.colors.lightgrey};
    padding: 1.25rem 1.4rem;
    &::focus {
        color: red;
    }
}
`
const initFormState = {
    title: '',
    description: '',
    city: '',
    address: '',
    area: '',
    price: '',
    rooms: '',
    year: '',
    file: [],
    test: ''
};

    const MyForm = props => {

        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;

        return (
        <StyledForm onSubmit={handleSubmit}>
            {[
            "title",
            "description",
            "city",
            "address",
            "price$",
            "area$",
            "rooms$",
            "year$"
            ].map(el => {
            if (el.includes("$")) {
                const name = el.slice(0, el.length - 1);
                return (
                <StyledFieldWrapper key={name}>
                    {errors.name && <span>{errors.name}</span>}
                    <label htmlFor={name}>{name}</label>
                    <Field
                        key={name}
                        type="number"
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                    />
                </StyledFieldWrapper>
                );
            } else {
                return (
                <StyledFieldWrapper key={el}>
                    {touched.el && <span>{touched.el}</span>}
                    <label htmlFor={el}>{el}</label>
                    <Field
                        key={el}
                        type="text"
                        id={el}
                        name={el}
                        onChange={handleChange}
                        value={values[el]}
                        onBlur={handleBlur}
                        autoComplete="off"
                    />
                </StyledFieldWrapper>
                );
            }
            })}
            <button type="submit">Submit</button>
        </StyledForm>
        );
    };



    const MyEnhancedForm = withFormik({
        mapPropsToValues: () => initFormState,

        // Custom sync validation
        validate: values => {
        const errors = [];
        const formState = Object.keys(initFormState);
        formState.map(prop => {
            if (!values[prop]) {
            errors[prop] = "Required";
            }
            return errors[prop];
        });
        return errors;
        },

        handleSubmit: (values, bag) => {
            console.log(bag);
            bag.props.createEstate({
                id: uuid(),
                ...values});
            bag.resetForm();
            bag.props.setOnSubmitInfo('New estate added');
        },
        displayName: "BasicForm"
    })(MyForm);

export default MyEnhancedForm;
