import React, {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {UserContext} from '../../auth/context/UserContext';
import {EstatesContext} from '../../estates/context/EstatesContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import UsersList from '../components/UsersList';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const Users = () => {
    const {userList: [, setUsersList]} = useContext(UserContext);
    const {estatesData: [, dispatch]} = useContext(EstatesContext);
    const init = useRef(false);
    const {userList, estatesData} = useFetch('http://localhost:5000/users');

    useEffect(() => {
        if(init.current) {
            init.current = false;
            dispatch(setEstates(estatesData));
            setUsersList(userList);
        } else init.current = true;
        
    }, [userList, estatesData])

    return ( 
        <> { userList && estatesData
                ? <UsersList users={userList}/>
                : <Center> <Loader/> </Center> 
        } </>
     );
};
 
export default Users;

Users.propTypes = {
    userList: PropTypes.array,
    estatesData: PropTypes.array
}