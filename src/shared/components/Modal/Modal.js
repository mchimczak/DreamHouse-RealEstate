import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import ModalOverlay from './ModalOverlay';
import Backdrop from '../../ui/layout/Backdrop';

import {MapCard} from '../Card/MapCard';

const StyledModal = styled.div`
position: absolute;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
top: 0;
left: 0;
right: 0;
bottom: 0;
`

const Modal = (props) => {
    // return ( 
    //     <StyledModal>
    //         {props.isOpen && <Backdrop onClick={props.toggleModal} isOpen={props.isOpen}/>}
    //         <ModalOverlay {...props}/>
    //     </StyledModal>
    //  );
    const content = ( 
        <StyledModal>
            {props.isOpen && <Backdrop onClick={props.toggleModal} isOpen={props.isOpen}/>}
            {/* <ModalOverlay {...props}/> */}
            <MapCard {...props}/>
        </StyledModal>
     );

     return ReactDOM.createPortal(content, document.getElementById('modal'));
};
 
export default Modal;