import React, { useContext, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import { setEstates } from '../../estates/context/EstatesActions';
import { useFetch } from '../../shared/customHooks/useFetch';
import UsersList from '../components/UsersList';
import Center from '../../shared/ui/position/Center';
import Loader from '../../shared/components/Loader/Loader';

const Users = () => {
    const {estatesData: [, dispatch]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);
    const init = useRef(false);

    const {userList, estatesData, errorMsg} = useFetch(`${process.env.REACT_APP_BACKEND_URL}users`);

    useEffect(() => {
        if(init.current) {
            init.current = false;
            dispatch(setEstates(estatesData));
        } else init.current = true;
        
        return () => dispatch(setEstates([]))
    }, [estatesData]);

    useEffect(() => {
        errorMsg && setStatus(errorMsg)
    },[errorMsg])

    return ( <> 
        { errorMsg
            ?   <Redirect to="/"/>
            :   (   userList && estatesData
                    ? <UsersList users={userList}/>
                    : <Center cover="true"> <Loader/> </Center> 
                ) 
        } 
        </> );
};
 
export default Users;