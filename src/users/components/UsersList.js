import React from 'react';
import styled from 'styled-components';

// import UserItem from './UserItem';
import UserCard from './UserCard';

const UserListWrapper = styled.div`
display: grid;
grid-template: auto / auto;
gap: 2rem;

${({theme}) => theme.media.tablet} {
    grid-template: auto / 1fr 1fr;
}
${({theme}) => theme.media.desktop} {
    grid-template: auto / 1fr 1fr 1fr;
}
`

const UsersList = ({users}) => {

    let userItem; 
    if(users.length === 0) {
        return userItem = <p>There are no users</p>;
    }
    userItem = users.map( user => (
        <UserCard
            key={user.id}
            id={user.id} 
            name={user.name}
            image={user.image} 
            estates={user.estates}
        />
        ))
    // userItem = users.map( user => (
    //     <UserItem 
    //         key={user.id}
    //         id={user.id} 
    //         name={user.name}
    //         image={user.image} 
    //         estates={user.estates}
    //     />
    //     ))

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