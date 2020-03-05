import React, {useContext} from 'react';
import { UserContext } from '../../../auth/context/UserContext';

const UserAvatar = (props) => {
    const {isLoggedIn, userData} = useContext(UserContext);

    return ( 
        <div>
            { isLoggedIn && userData ? <span> {userData.name} </span> : <span>Elo</span> }
        </div>
    );

};
 
export default UserAvatar;
