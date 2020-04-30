import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
margin: ${({theme}) => theme.size.small} 0;

${({theme}) => theme.media.tablet} {
    margin: ${({theme}) => theme.size.large} 0;
}
`

const Wrapper = (props) => {
    return ( 
        <StyledWrapper>
            {props.children}
        </StyledWrapper>
     );
}
 
export default Wrapper;

Wrapper.propTypes = {
    children: PropTypes.node.isRequired
  };