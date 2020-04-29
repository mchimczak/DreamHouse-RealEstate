import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import MobileNavigation from './MobileNavigation';

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


const MainNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideMenu = () => setIsOpen(isOpen => !isOpen);

    return ( 
        <>
            <MainHeader>
                <StyledLink to="/" ><Title>DreamHouse</Title></StyledLink>
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