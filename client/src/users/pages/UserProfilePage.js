import React, {useContext} from 'react';

import {UserContext} from '../../auth/context/UserContext';
import UserDashboard from './UserDashboard';
import UserDetails from '../components/UserDetails';

import { UserProfileWrapper } from '../components/styles/UserComponents.style';

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