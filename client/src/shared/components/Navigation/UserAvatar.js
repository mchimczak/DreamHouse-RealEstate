import React, {useContext} from 'react';
import { UserContext } from '../../../auth/context/UserContext';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = () => {
    const {isLoggedIn, userData} = useContext(UserContext);

    const initials = [...userData.name[0]].toString().toUpperCase();

    const avatar = userData.file && userData.file.length !== 0 
    ? <Avatar alt="Remy Sharp" src={`http://localhost:5000/${userData.file[0]}`} />
    : <Avatar aria-label="user">{initials}</Avatar>

    return ( 
        <div>
            { isLoggedIn && userData && avatar }
        </div>
    );

};
 
export default UserAvatar;
