import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
width: auto;
max-width: ${({size}) => size === 'small' ? '300px' : '600px'};
padding: ${({theme}) => theme.size.xlarge} ${({theme}) => theme.size.large};
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