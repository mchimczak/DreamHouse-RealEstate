import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import { useFetch } from '../../shared/customHooks/useFetch';
import EstatesList from '../../estates/components/EstatesList';
import Loader from '../../shared/components/Loader/Loader';
import Center from '../../shared/ui/position/Center';
import { Avatar, Tooltip } from '@material-ui/core';
import { EstatesContainer, UserInfoSection, UserInfoHeader, StyledPhoneIcon, StyledMailIcon } from '../components/styles/UserComponents.style';


const UserDashboard = ({isUser}) => {
    const {estatesLikes: [, setEstatesLikes]} = useContext(EstatesContext);
    const {status: [, setStatus]} = useContext(UserContext);
    const [fetchedUserEstates, setFetchedUserEstates] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);

    const userId = useParams().userId;
    const { user, userEstates, userLikes, errorMsg }  = useFetch(`${process.env.REACT_APP_BACKEND_URL}users/${userId}`);

    const initials = user && user.name.charAt(0).toUpperCase();
    const avatar = user && user.file[0]
        ? <Avatar alt="user profile picture" src={`${process.env.REACT_APP_BACKEND_URL}${user.file[0]}`} />
        : <Avatar aria-label="user">{initials}</Avatar>

    useEffect(() => {
        errorMsg && 
        setStatus(errorMsg)
        setIsRedirect(true)

        return () => setIsRedirect(false)
    }, [errorMsg]);

    useEffect(() => {
        setEstatesLikes(userLikes);
        setFetchedUserEstates(userEstates);

        return () => {
            setEstatesLikes([]);
            setFetchedUserEstates([]);
        }
    }, [userLikes, userEstates])


    return ( 
        <>
        {   errorMsg && isRedirect
                ? <Redirect to="/" />
                : fetchedUserEstates && user
                    ?  <EstatesContainer isUser={isUser} >
                        {!isUser &&
                            <UserInfoSection>
                                {avatar}
                                <UserInfoHeader>{user.name}'s profile</UserInfoHeader>
                                { user.phone && 
                                    <Tooltip title={`Call to ${user.name}`} arrow>
                                        <StyledPhoneIcon 
                                            style={{ fontSize: 25 }}
                                            onClick={() => window.open(`tel:${user.phone}`, "_self")}
                                        />
                                    </Tooltip> 
                                }
                                <Tooltip title={`E-mail ${user.name}`} arrow>
                                    <StyledMailIcon 
                                        style={{ fontSize: 25 }}
                                        onClick={() => window.open(`mailto:${user.email}, "_self`)} 
                                    />
                                </Tooltip>
                            </UserInfoSection>}
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