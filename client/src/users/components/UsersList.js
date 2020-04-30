import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserCard from './UserCard';
import Center from '../../shared/ui/position/Center';

const UserListWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 2rem;
margin: 3rem 0;
`

const UsersList = ({users}) => ( 
    <UserListWrapper>
        {
            users.length === 0
                ? <Center> <p>Currently there are no users</p> </Center> 
                : users.map( user => <UserCard key={user.id} {...user} /> )
        }
    </UserListWrapper>
);
 
export default UsersList;

UsersList.propTypes  = {
    users: PropTypes.arrayOf(PropTypes.object)
}