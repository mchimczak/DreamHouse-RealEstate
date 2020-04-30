import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Backdrop from '../../ui/layout/Backdrop';

import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';

const Aside = styled.aside`
position: fixed;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: ${({theme}) => theme.colors.white};
background-color: ${({theme}) => theme.colors.black};
bottom: 0;
right: 0;
left: 0;
width: 100vw;
height: auto;
padding: ${({theme}) => theme.size.medium} ${({theme}) => theme.size.medium};
z-index: 100;
transition: .5s ease-in-out;
transform: ${({isOpen}) => isOpen ? '0' : 'translateY(100%)'};

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
const Button = styled.span`
display: flex;
align-items: center;
border-radius: 3px 0 0 3px;
padding: .5rem 1rem;
width: fit-content;
max-height: 50px;
z-index: 90;

${({theme}) => theme.media.desktop} {
    display: none;
}
`
const OpenMenuBtn = styled(Button)`
position: fixed;
color: ${({theme}) => theme.colors.black};
background-color: ${({theme}) => theme.colors.orange};
bottom: 50px;
right: 0;
`
const CloseMenuBtn = styled(Button)`
position: absolute;
top: 20px;
right: 0;
color: ${({theme}) => theme.colors.white};
`

const MobileNavigation = (props) => {
    const content = (
        <>
            <Backdrop isOpen={props.isOpen} onClick={props.toggleSideMenu} />
                { !props.isOpen && 
                    <OpenMenuBtn onClick={props.toggleSideMenu}>
                        <ListIcon style={{ fontSize: 32, zIndex: 999 }} />
                    </OpenMenuBtn>
                }
            <Aside isOpen={props.isOpen}>
                { props.isOpen &&   
                    <CloseMenuBtn onClick={props.toggleSideMenu}>
                        <CloseIcon style={{ fontSize: 32, zIndex: 999 }} />
                    </CloseMenuBtn> 
                }
                {props.children}
            </Aside>
        </>
     );

     return ReactDOM.createPortal(content, document.getElementById('sideMenu'));
};
 
export default MobileNavigation;

MobileNavigation.propTypes = {
    children: PropTypes.any.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
  };