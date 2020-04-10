import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Backdrop from '../../ui/layout/Backdrop';

let Aside = styled.aside`
position: fixed;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: ${({theme}) => theme.colors.black};
background-color: ${({theme}) => theme.colors.orange};
bottom: 0;
right: 0;
left: 0;
width: 100vw;
height: auto;
padding: ${({theme}) => theme.size.medium} ${({theme}) => theme.size.medium};
z-index: 100;
transition: .5s ease-in-out;
transform: ${({isOpen}) => isOpen ? '0' : 'translateY(300px)'};

& ul {
    position: relative;
    z-index: 999;
    flex-direction: column;
    padding: 0;
    text-align: center;
    font-size: ${({theme}) => theme.size.medium};

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