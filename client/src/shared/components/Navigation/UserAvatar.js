import React, {useContext} from 'react';
import { UserContext } from '../../../auth/context/UserContext';

import DefaultAvatar from '../../../img/avatar.png';
import Avatar from '@material-ui/core/Avatar';

const UserAvatar = () => {
    const {isLoggedIn, userData} = useContext(UserContext);

    const initials = userData.name.charAt(0).toUpperCase();
    const avatar = userData.file && userData.file[0]
        ?   <Avatar 
                alt={`${userData.name.toUpperCase()}'s profile picture`} 
                src={`${process.env.REACT_APP_BACKEND_URL}${userData.file[0]}`}
                imgProps={{ onError: (e) => { e.target.src = <DefaultAvatar /> } }} 
            />
        :   <Avatar alt={`${userData.name.toUpperCase()}'s profile picture`} >
                {initials}
            </Avatar>

    return ( 
        <>
            { isLoggedIn && userData && avatar }
        </>
    );

};
 
export default UserAvatar;
