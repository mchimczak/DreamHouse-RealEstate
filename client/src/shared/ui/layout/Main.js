import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMain = styled.main`
padding: 0 2rem;
max-width: 1400px;
margin: 0 auto;
`

const Main = (props) => (  
    <StyledMain>
        {props.children}
    </StyledMain>
);
 
export default Main;

Main.propTypes = {
    children: PropTypes.node.isRequired,
};