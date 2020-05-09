import React from 'react';
import PropTypes from 'prop-types';

import UserCard from './UserCard';
import Center from '../../shared/ui/position/Center';
import { UserListWrapper } from './styles/UserComponents.style';

const UsersList = React.memo(({users}) => ( 
    <UserListWrapper>
        {
            users.length === 0
                ? <Center> <p>Currently there are no users</p> </Center> 
                : users.map( user => <UserCard key={user.id} {...user} /> )
        }
    </UserListWrapper>
));
 
export default UsersList;

UsersList.propTypes  = {
    users: PropTypes.arrayOf(PropTypes.object)
}