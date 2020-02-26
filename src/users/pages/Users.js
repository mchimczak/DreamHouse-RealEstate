import React, {useState} from 'react';
import UsersList from '../components/UsersList';

const Users = () => {

    const [users] = useState([
        { id: 'u1', name: 'Jackie', image: 'jackieimg', estates: 5},
        { id: 'u2', name: 'Andy', image: 'andyimg', estates: 7}
    ])

    return ( 
        <>
            <UsersList users={users}/>
        </>
     );
}
 
export default Users;