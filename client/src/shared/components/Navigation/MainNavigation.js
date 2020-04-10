import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import MobileNavigation from './MobileNavigation';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';

const Nav = styled.nav`
display: none;

${({theme}) => theme.media.desktop} {
    display: inline-block;
}
`
const Title = styled.h1`
display: inline-block;
padding: 1rem 1rem 0 0;
border-top: 2px solid ${({theme}) => theme.colors.white};
border-right: 2px solid ${({theme}) => theme.colors.orange};
`
const StyledLink = styled(Link)`
color: ${({theme}) => theme.colors.white};
`
const SideMenuBtn = styled.span`
position: fixed;
display: flex;
align-items: center;
border-radius: 3px;
padding: ${({theme}) => theme.size.large};
color: ${({theme}) => theme.colors.black};
background-color: ${({theme}) => theme.colors.orange};
width: fit-content;
bottom: 50px;
right: 0;
max-height: 50px;
text-align: right;
z-index: 90;

${({theme}) => theme.media.desktop} {
    display: none;
}
`

const MainNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideMenu = () => setIsOpen(isOpen => !isOpen);

    return ( 
        <>
            <MainHeader>
                <StyledLink to="/" ><Title>DreamHouse</Title></StyledLink>
                <SideMenuBtn onClick={toggleSideMenu} isOpen={isOpen}>
                    {isOpen 
                        ? <CloseIcon style={{ fontSize: 32, zIndex: 999 }} /> 
                        : <ListIcon style={{ fontSize: 32, zIndex: 999 }} />
                    }
                </SideMenuBtn>
                <Nav>
                    <NavLinks />
                </Nav>
            </MainHeader>

            <MobileNavigation isOpen={isOpen} toggleSideMenu={toggleSideMenu}>
                <NavLinks/>
            </MobileNavigation>
        </>
     );
}
 
export default MainNavigation;