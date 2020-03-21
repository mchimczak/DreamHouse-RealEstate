import React, {useContext, useEffect, useRef, useState} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useFetch } from '../../shared/customHooks/useFetch';


import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';



const UserDashboard = () => {
    const {setEstatesLikes} = useContext(EstatesContext);
    const {setStatus} = useContext(UserContext);

    const init = useRef(false);
    const [fetchedUserEstates, setFetchedUserEstates] = useState(undefined);
    const [isRedirect, setIsRedirect] = useState(false);

    const userId = useParams().userId;
    // const userEstates = estatesData.filter( estate => estate.owner === userId);
    const { userEstates, userLikes, errorStatus, errorMsg }  = useFetch(`http://localhost:5000/users/${userId}`);

    useEffect(() => {
        if(errorStatus) {
            setStatus(errorMsg)
            return setIsRedirect(true)
        }
        if(init.current === true) {
            init.current = false;
            setEstatesLikes(userLikes);
            setFetchedUserEstates(userEstates);
        } else {
            init.current = true
        }
    }, [userLikes, userEstates, errorStatus]);


    return ( 
        <div>
            {
                errorStatus && isRedirect
                ? <Redirect to="/" />
                : (fetchedUserEstates
                    ? <EstatesList items={fetchedUserEstates}/> 
                    : <Center> <Loader/> </Center>  )
            }
        </div>
     );
}
 
export default UserDashboard;