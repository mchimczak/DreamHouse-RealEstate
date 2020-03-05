import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {UserContext} from '../../../auth/context/UserContext';
import UserAvatar from './UserAvatar';


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

    const {userData} = useContext(UserContext);
    const {id} = userData;

    return ( 
        <List>
            <li>
                <StyledNavLink to="/">Home</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/estates">Estates</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/estates/new">Add new estate</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/users">Users</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to={`/profile/${id}`}>My Profile</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/login">Log in</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/signup">Sign up</StyledNavLink>
            </li>
            <li>
                <UserAvatar />
            </li>
        </List>
     );
}
 
export default MainNavigationLinks;