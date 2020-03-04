import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
width: 150px;
padding: .5rem 1rem;
border-radius: 3px;
background-color: blue;
color: white;
`

const Btn = (props) => {
    return ( 
        <StyledButton type={props.type || 'button'} onClick={props.onClick}>
            {props.children}
        </StyledButton>
     );
}
 
export default Btn;