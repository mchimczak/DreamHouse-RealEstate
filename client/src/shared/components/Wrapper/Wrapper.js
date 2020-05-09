import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
// margin: 1rem 0;

${({theme}) => theme.media.tablet} {
margin: ${({theme}) => theme.size.large} 0;
display: ${({flex}) => flex ? 'flex' : null};
flex-direction: ${({column}) =>  column ? 'column' : 'row'};
justify-content: ${({flex}) => flex ? 'space-between' : null};
align-items: ${({flex}) => flex ? 'center' : null};

    & > div {
        padding:  ${({flex}) => flex ? '0' : null};
        margin: ${({flex}) => flex ? '0' : null};
    }
}
}
`

const Wrapper = (props) => ( 
    <StyledWrapper 
        flex={props.flex}
        column={props.column}
    >
        {props.children}
    </StyledWrapper>
);
 
export default Wrapper;

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    flex: PropTypes.bool,
    column: PropTypes.bool
};
