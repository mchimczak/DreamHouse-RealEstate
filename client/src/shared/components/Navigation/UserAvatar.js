import React, {useContext} from 'react';
import { UserContext } from '../../../auth/context/UserContext';

import Avatar from '@material-ui/core/Avatar';

const UserAvatar = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);


    const avatar = userData.file && userData.file.length !== 0 
    ? <Avatar alt="Remy Sharp" src={`http://localhost:5000/${userData.file[0]}`} />
    : <Avatar aria-label="user">{userData.name}</Avatar>

    return ( 
        <div>
            { isLoggedIn && userData && avatar }
        </div>
    );

};
 
export default UserAvatar;
