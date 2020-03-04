import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Backdrop from '../../ui/layout/Backdrop';

const StyledModal = styled.div`
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
min-height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
`

const Modal = (props) => {
    const content = ( 
        <StyledModal>
            {props.isOpen && <Backdrop onClick={props.toggleModal} isOpen={props.isOpen}/>}
            {props.children}
        </StyledModal>
     );

     return ReactDOM.createPortal(content, document.getElementById('modal'));
};
 
export default Modal;