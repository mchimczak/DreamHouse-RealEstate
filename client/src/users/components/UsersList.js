import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserCard from './UserCard';

const UserListWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 2rem;
margin: 3rem 0;
`

const UsersList = ({users}) => {
    
    let userItem; 
    users.length === 0
        ? userItem = <p>There are no users</p>
        : userItem = users.map( user => <UserCard key={user.id} {...user} /> )

    return ( 
        <UserListWrapper>
            {userItem}
        </UserListWrapper>
     );
}
 
export default UsersList;

UsersList.propTypes  = {
    users: PropTypes.array
}