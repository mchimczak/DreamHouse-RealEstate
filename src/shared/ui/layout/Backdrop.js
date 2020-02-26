import React from 'react'
import styled from 'styled-components';

const BackdropWrapper = styled.div`
display: ${({isOpen}) => isOpen ? 'block' : 'none'};
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100vw;
height: 100vh;
background-color: #00000091;
z-index: 50;
`

const Backdrop = (props) => ( 
        <BackdropWrapper isOpen={props.isOpen} onClick={props.onClick}/>
);
 
export default Backdrop;