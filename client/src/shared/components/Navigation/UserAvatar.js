import React, {useContext} from 'react';
import { UserContext } from '../../../auth/context/UserContext';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = () => {
    const {isLoggedIn, userData} = useContext(UserContext);

    const initials = [...userData.name][0].toUpperCase();

    const avatar = userData.file && userData.file.length !== 0 
    ? <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_BACKEND_URL}${userData.file[0]}`} />
    : <Avatar aria-label="user">{initials}</Avatar>

    return ( 
        <div>
            { isLoggedIn && userData && avatar }
        </div>
    );

};
 
export default UserAvatar;
