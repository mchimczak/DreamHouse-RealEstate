import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ id, name, image, estates }) => {
    return ( 
        <div>
            <h5>User</h5>
            <Link to={`/users/${id}`}> {name} </Link>
            <p>{id}</p>
            <p>{image}</p>
            <p>{estates.toString()} {estates === 1 ? 'Estate' : 'Estates'}</p>
        </div>
     );
}
 
export default UserItem;