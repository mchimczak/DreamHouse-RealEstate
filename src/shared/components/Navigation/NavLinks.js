import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';


const List = styled.ul`
display: flex;
flex-direction: row;
list-style: none;

& li {
    padding: .5rem;
}
`
const StyledNavLink = styled(NavLink)`
color: inherit;
text-decoration: none;
`

const MainNavigationLinks = () => {
    return ( 
        <List>
            <li>
                <StyledNavLink to="/">Home</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/estates">Estates</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/u1/estates">My Estates</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/estates/new">Add new estate</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/users">Users</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/login">Log in</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/signup">Sign up</StyledNavLink>
            </li>
        </List>
     );
}
 
export default MainNavigationLinks;