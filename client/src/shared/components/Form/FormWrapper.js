import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;

& > div {
    margin-top: 2rem;
}
`

const FormWrapper = (props) => ( 
    <Form>
        {props.children}
    </Form>
);
 
export default FormWrapper;

FormWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};