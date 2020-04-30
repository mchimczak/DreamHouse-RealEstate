import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledModalOverlay = styled.div`
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
padding: 2rem 3rem;
width: 40rem;
height: 40rem;
z-index: 70;
`

const ModalOverlay = (props) => {
    return (
        <StyledModalOverlay>
            <h3>{props.title}</h3>
            <div>
                {props.children}
            </div>
            <p>{props.description}</p>
        </StyledModalOverlay>
    );
};
 
export default ModalOverlay;

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};