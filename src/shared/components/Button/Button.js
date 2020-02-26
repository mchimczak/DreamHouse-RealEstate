import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
width: 150px;
padding: .5rem 1rem;
border-radius: 3px;
background-color: #blue;
color: #white;
`

const Button = (props) => {
    return ( 
        <StyledButton onClick={props.onClick}>
            {props.children}
        </StyledButton>
     );
}
 
export default Button;