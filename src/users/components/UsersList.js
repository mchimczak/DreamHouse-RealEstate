import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import UserItem from './UserItem';
import UserCard from './UserCard';

const UserListWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 2rem;
`

const UsersList = ({users}) => {
console.log(users);
    let userItem; 
    if(users.length === 0) {
        return userItem = <p>There are no users</p>;
    }
    userItem = users.map( user => (
        <UserCard
            key={user.id}
            {...user}
        />
        ))

    return ( 
        <>
            <h3>Users List</h3>
            <UserListWrapper>
                {userItem}
            </UserListWrapper>
        </>
     );
}
 
export default UsersList;

UsersList.propTypes  = {
    users: PropTypes.array
}