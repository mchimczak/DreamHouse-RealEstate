import React, {useContext} from 'react';
import {UserContext} from '../../auth/context/UserContext';
import UserDashboard from './UserDashboard';

const UserProfilePage = () => {
    const {userData} = useContext(UserContext);
    const userObj = Object.entries(userData).map( field => {
        return (
            <p key={field}>{field}</p>
        )
    })
    return ( 
        <div>
            UserProfilePage
            {userObj && userObj}
            <UserDashboard />
        </div>
     );
}
 
export default UserProfilePage;