import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
width: 90%;
max-width: 300px;
text-align: center;
max-width: ${({size}) => size === 'small' ? '300px' : '600px'};
padding: 3.2rem 5.2rem;
margin: ${({theme}) => theme.size.xlarge} auto;
border-radius: 3px;
background-color: ${({theme}) => theme.colors.lightgrey};
z-index: 999;
`
const BoxAction = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;
`

const ModalBox = (props) => {
    return ( 
        <Box size={props.size}>
            {props.title && <h4>{props.title}</h4>}
            <BoxAction>
                {props.children}
            </BoxAction>
        </Box>
     );
}
 
export default ModalBox;

ModalBox.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    title: PropTypes.string,
};