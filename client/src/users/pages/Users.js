import React, {useContext, useEffect, useRef} from 'react';

import {EstatesContext} from '../../estates/context/EstatesContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';

import UsersList from '../components/UsersList';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const Users = () => {
    const {estatesData: [, dispatch]} = useContext(EstatesContext);
    const init = useRef(false);
    const {userList, estatesData} = useFetch(`${process.env.REACT_APP_BACKEND_URL}users`);

    useEffect(() => {
        if(init.current) {
            init.current = false;
            dispatch(setEstates(estatesData));
        } else init.current = true;
        
        return () => dispatch(setEstates([]))
    }, [estatesData]);

    return ( 
        <> 
            {   userList && estatesData
                    ? <UsersList users={userList}/>
                    : <Center cover="true"> <Loader/> </Center> 
            } 
        </>
     );
};
 
export default Users;