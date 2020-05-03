import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './Button.styles';

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