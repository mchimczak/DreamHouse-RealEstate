import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
height: ${({small}) => small ? '30px' : 'auto'};
padding: ${props => props.small ? `.5rem 1rem` : `${props.theme.size.medium} ${props.theme.size.medium}`};
border-radius: 3px;
background-color: ${props => props.primary ? props.theme.colors.orange : props.theme.colors.black};
color: ${({theme}) => theme.colors.white};
text-transform: ${({upc}) => upc ? 'uppercase' : 'none'};
text-decoration: none;
transition: .1s ease-in-out;
cursor: pointer;
border: none;
font-size: ${props => props.small ? '1rem' : '1.6rem'};

:hover {
    box-shadow: inset 0px 1px 9px #7d7d7d94;
}
`

const Btn = (props) => {
    return ( 
        <StyledButton 
            type={props.type || 'button'} 
            primary={props.primary}
            upc={props.upc}
            small={props.small} 
            onClick={props.onClick}
            as={props.as}
            to={props.to}
        >
            {props.children}
        </StyledButton>
     );
}
 
export default Btn;

Btn.propTypes = {
    primary: PropTypes.string,
    upc: PropTypes.string
}