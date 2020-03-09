import React, {useContext} from 'react';
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
    const {userData} = useContext(UserContext);

    return ( 
        <UserProfileWrapper>
            <UserDashboard />
            <UserDetails user={userData}/>
        </UserProfileWrapper>
     );
}
 
export default UserProfilePage;