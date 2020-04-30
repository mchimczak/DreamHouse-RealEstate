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
box-shadow: ${props => props.shadow ? '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' : 'none' };

:hover:enabled {
    box-shadow: inset 0px 1px 9px #7d7d7d94;
}

:hover {
 box-shadow: ${({as}) => as ? 'none' : null};
}

:disabled {
    background-color: ${props => props.theme.colors.grey};
    cursor: initial;
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
            disabled={props.disabled}
            title={props.title}
            shadow={props.shadow}
        >
            {props.children}
        </StyledButton>
     );
};

export default Btn;

Btn.propTypes = {
    children: PropTypes.any.isRequired,
    primary: PropTypes.string,
    upc: PropTypes.string,
    small: PropTypes.string,
    onClick: PropTypes.func,
    as: PropTypes.object,
    to: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    shadow: PropTypes.string
}