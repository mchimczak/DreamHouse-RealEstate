import React, {useContext} from 'react';
import UsersList from '../components/UsersList';

import {UserContext} from '../../auth/context/UserContext';

const Users = () => {

    const {usersList} = useContext(UserContext);

    return ( 
        <>
            <UsersList users={usersList}/>
        </>
     );
}
 
export default Users;