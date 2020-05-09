import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BackdropWrapper = styled.div`
display: ${({isOpen}) => isOpen ? 'block' : 'none'};
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100vw;
height: 100%;
background-color: #00000091;
z-index: 450;
`

const Backdrop = (props) => ( 
        <BackdropWrapper isOpen={props.isOpen} onClick={props.onClick}/>
);
 
export default Backdrop;

Backdrop.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
};