import React, {useContext} from 'react';
import {UserContext} from '../../auth/context/UserContext';
import UserDashboard from './UserDashboard';
import UserDetails from '../components/UserDetails';

const UserProfilePage = () => {
    const {userData} = useContext(UserContext);

    return ( 
        <div className="test">
            UserProfilePage
            <UserDetails user={userData}/>
            <UserDashboard />
        </div>
     );
}
 
export default UserProfilePage;