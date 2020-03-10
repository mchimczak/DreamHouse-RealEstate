import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
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
    const {usersList, updateUser} = useContext(UserContext);
    const userId = useParams().userId;
    
    const user = usersList.find(user => user.id === userId);

    return ( 
        <UserProfileWrapper>
            <UserDashboard />
            <UserDetails user={user} updateUser={updateUser} />
        </UserProfileWrapper>
     );
}
 
export default UserProfilePage;