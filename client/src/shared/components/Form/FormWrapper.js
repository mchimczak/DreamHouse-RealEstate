import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;

& > div {
    margin-top: 2rem;
}
`

const FormWrapper = (props) => {
    return ( 
        <Form>
            {props.children}
        </Form>
     );
}
 
export default FormWrapper;