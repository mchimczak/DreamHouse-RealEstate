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
const Logout = styled.span`
cursor: pointer;
`

const MainNavigationLinks = () => {

    const {userData, isLoggedIn, logout} = useContext(UserContext);
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
                <StyledNavLink to="/users">Users</StyledNavLink>
            </li>
            {
                id && isLoggedIn
                ? (
                    <>
                        <li>
                            <StyledNavLink to="/estates/new">Add new estate</StyledNavLink>
                        </li>
                        <li>
                            <StyledNavLink to={`/profile/${id}`}>My Profile</StyledNavLink>
                        </li>
                        <li>
                            <Logout onClick={() => logout(id)}>Logout</Logout>
                        </li>
                        {/* <li>
                            <StyledNavLink to={`/logout/${id}`}>Logout</StyledNavLink>
                        </li> */}
                        <li>
                            <UserAvatar />
                        </li>
                    </>
                ) 
                : (
                    <>
                        <li>
                            <StyledNavLink to="/login">Log in</StyledNavLink>
                        </li>
                        <li>
                            <StyledNavLink to="/signup">Sign up</StyledNavLink>
                        </li>
                    </>
                )
            }

        </List>
     );
}
 
export default MainNavigationLinks;