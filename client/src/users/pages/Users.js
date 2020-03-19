import React, {useContext} from 'react';
import UsersList from '../components/UsersList';
import Loader from '../../img/loader.gif'

import {UserContext} from '../../auth/context/UserContext';

const Users = () => {

    const {usersList} = useContext(UserContext);

    return ( 
        <> 
        {
            usersList 
            ? <UsersList users={usersList}/>
            : <img src={Loader} alt="loader"/>
        }
            
        </>
     );
}
 
export default Users;