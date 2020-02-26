import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.main`
padding: 0 2rem;
`

const Main = (props) => (  
    <StyledMain>
        {props.children}
    </StyledMain>
);
 
export default Main;