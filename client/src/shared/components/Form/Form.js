import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

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
`
const StyledLabel = styled.label`
font-weight: ${({theme}) => theme.font.thin};;
text-transform: capitalize;
font-size: 12px;
color: ${({theme}) => theme.colors.dark};
margin-top: 1.8rem;
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
`


const MyForm = props => {
    const { initState, dirty, touched, errors, handleChange, handleSubmit, isSubmitting } = props;

    return (
        <StyledForm onSubmit={handleSubmit}>
            {
                Object.keys(initState).map(el => (
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
                ))
            }
            <StyledButton type="submit" disabled={isSubmitting} isValid={dirty && Object.keys(errors).length === 0}>Submit</StyledButton>
        </StyledForm>
    );
};



const MyEnhancedForm = withFormik({
    mapPropsToValues: (props) => ({
        ...props.initState
    }),
    validationSchema: (props) => props.validationSchema,
    handleSubmit: (values, bag) => {
        bag.resetForm();
        bag.props.submitAction(values)
    }
})(MyForm);



MyEnhancedForm.propTypes = {
    submitAction: PropTypes.func.isRequired,
    validationSchema: PropTypes.any.isRequired,
    initState: PropTypes.objectOf(PropTypes.string),
}

MyEnhancedForm.defaultProps = {
    initState: {
        title: '',
        description: '',
        city: '',
        address: '',
        area: '',
        price: '',
        rooms: '',
        year: '',
    },
}

export default MyEnhancedForm;