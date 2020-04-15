import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { useFetch } from '../../shared/customHooks/useFetch';


import EstatesList from '../../estates/components/EstatesList';
import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';



const UserDashboard = () => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);

    const init = useRef(false);
    const [fetchedUserEstates, setFetchedUserEstates] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);

    const userId = useParams().userId;
    const { userEstates, userLikes, errorStatus, errorMsg }  = useFetch(`http://localhost:5000/users/${userId}`);

    useEffect(() => {
        if(errorStatus) {
            setStatus(errorMsg);
            return setIsRedirect(true);
        }
        if(init.current === true) {
            init.current = false;
            setEstatesLikes(userLikes);
            setFetchedUserEstates(userEstates);
        } else {
            init.current = true
        }
    }, [userLikes, userEstates, errorStatus]);


    return ( <>
            { errorStatus && isRedirect
                ? <Redirect to="/" />
                : fetchedUserEstates
                    ? <EstatesList items={fetchedUserEstates}/> 
                    : <Center> <Loader/> </Center>
            }
        </> );
}
 
export default UserDashboard;

UserDashboard.propTypes = {
    userEstates: PropTypes.array,
    userLikes: PropTypes.array,
    errorStatus: PropTypes.string,
    errorMsg: PropTypes.string,
}