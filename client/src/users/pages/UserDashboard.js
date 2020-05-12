import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import { useFetch } from '../../shared/customHooks/useFetch';
import EstatesList from '../../estates/components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';

import { EstatesContainer } from '../components/styles/UserComponents.style';


const UserDashboard = ({isUser}) => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);

    const init = useRef(false);
    const [fetchedUserEstates, setFetchedUserEstates] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);

    const userId = useParams().userId;
    const { userEstates, userLikes, errorMsg }  = useFetch(`${process.env.REACT_APP_BACKEND_URL}users/${userId}`);

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
                    ?  <EstatesContainer isUser={isUser} >
                            <EstatesList items={fetchedUserEstates}/> 
                        </EstatesContainer>
                    :   <Center> <Loader/> </Center>
        }
        </> 
    );
};
 
export default UserDashboard;

UserDashboard.propTypes = {
    isUser: PropTypes.bool
  };