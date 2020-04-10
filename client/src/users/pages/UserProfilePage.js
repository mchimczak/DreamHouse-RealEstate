import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {UserContext} from '../../auth/context/UserContext';
import UserDashboard from './UserDashboard';
import UserDetails from '../components/UserDetails';

const UserProfileWrapper = styled.div`
display: grid;
grid-template-columns: auto;
gap: 2rem;
`

const UserProfilePage = () => {
    const {userData, updateUser} = useContext(UserContext);

    return ( 
        <UserProfileWrapper>
            <UserDashboard />
            <UserDetails user={userData} updateUser={updateUser} />
        </UserProfileWrapper>
     );
}
 
export default UserProfilePage;

UserDashboard.propTypes = {
    userData: PropTypes.object
}