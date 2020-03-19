import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Backdrop from '../../ui/layout/Backdrop';

let Aside = styled.aside`
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: ${({theme}) => theme.colors.white};
background-color: ${({theme}) => theme.colors.mobileNav};
top: 0;
right: 0;
width: 200px;
height: 100%;
padding: ${({theme}) => theme.size.small} ${({theme}) => theme.size.medium};
z-index: 100;
transition: .5s ease-in-out;
transform: ${({isOpen}) => isOpen ? null : 'translateX(200px)'};

& ul {
    flex-direction: column;
}

${({theme}) => theme.media.desktop} {
    display: none;
}
`

const MobileNavigation = (props) => {
    const content = (
        <div onClick={props.toggleSideMenu}>
            <Backdrop isOpen={props.isOpen}/>
            <Aside isOpen={props.isOpen}>
                {props.children}
            </Aside>
        </div>
     );

     return ReactDOM.createPortal(content, document.getElementById('sideMenu'));
}
 
export default MobileNavigation;