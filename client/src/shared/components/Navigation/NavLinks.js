import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {UserContext} from '../../../auth/context/UserContext';
import UserAvatar from './UserAvatar';


const List = styled.ul`
display: flex;
flex-direction: row;
list-style: none;
align-items: center;

& li {
    padding: .5rem;
    margin-top: .5rem;

    ${({theme}) => theme.media.desktop} {
        margin-top: 0;
    }
}
`
const StyledNavLink = styled(NavLink)`
color: inherit;
text-decoration: none;
font-weight: ${({theme}) => theme.font.thin};
font-size: 1.6rem;
`
const Logout = styled.span`
cursor: pointer;
`
const PrivateLinksWrapper = styled.div`
display: flex;
flex-direction: column;
margin-top: 2rem;
align-items: center;

${({theme}) => theme.media.desktop} {
    flex-direction: row;
    margin: 0 2rem;
}
`

const MainNavigationLinks = (props) => {

    const {userData, token: [token,], logout} = useContext(UserContext);
    const {id} = userData;

    return ( 
        <List onClick={props.toggleSideMenu}>
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
                id && token
                ?   (
                        <PrivateLinksWrapper>
                            <li>
                                <StyledNavLink to="/estates/new">Add new estate</StyledNavLink>
                            </li>
                            <li>
                                <StyledNavLink to={`/users/me/${id}`}>My Profile</StyledNavLink>
                            </li>
                            <li>
                                <Logout onClick={() => logout()}>Logout</Logout>
                            </li>
                            <li>
                                <UserAvatar />
                            </li>
                        </PrivateLinksWrapper>
                    ) 
                :   (
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

MainNavigationLinks.propTypes = {
    toggleModal: PropTypes.func
};