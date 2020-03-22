import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';


import {UserContext} from '../../auth/context/UserContext';
import { useFetch } from '../../shared/customHooks/useFetch';

import UsersList from '../components/UsersList';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const Users = () => {
    const {setUsersList} = useContext(UserContext);
    const {userList} = useFetch('http://localhost:5000/users');

    useEffect(() => {
        setUsersList(userList);
    },[userList]);

    return ( 
        <> {
            userList 
            ? <UsersList users={userList}/>
            : <Center> <Loader/> </Center> 
        } </>
     );
};
 
export default Users;

Users.propTypes = {
    userList: PropTypes.array,
}