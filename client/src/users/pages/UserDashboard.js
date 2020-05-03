import React, {useContext, useEffect, useRef, useState} from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import { useFetch } from '../../shared/customHooks/useFetch';
import EstatesList from '../../estates/components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

import { EstatesContainer } from '../components/styles/UserComponents.style';


const UserDashboard = () => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);

    const init = useRef(false);
    const [fetchedUserEstates, setFetchedUserEstates] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);

    const userId = useParams().userId;
    const { userEstates, userLikes, errorMsg }  = useFetch(`http://localhost:5000/users/${userId}`);

    useEffect(() => {
        if(errorMsg) {
            setStatus(errorMsg);
            return setIsRedirect(true);
        }

        if(init.current === true) {
            init.current = false;
            setEstatesLikes(userLikes);
            setFetchedUserEstates(userEstates);
        } else init.current = true

    }, [userLikes, userEstates, errorMsg]);


    return ( 
        <>
        {   errorMsg && isRedirect
                ? <Redirect to="/" />
                : fetchedUserEstates
                    ?   <EstatesContainer>
                            <EstatesList items={fetchedUserEstates}/> 
                        </EstatesContainer>
                    :   <Center> <Loader/> </Center>
        }
        </> 
    );
};
 
export default UserDashboard;