import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { EstatesContext } from '../../estates/context/EstatesContext';
import { UserContext } from '../../auth/context/UserContext';
import Button from '../../shared/components/Button/Button';
import DefaultAvatar from '../../img/avatar.png'

import {Card, Avatar, CardHeader} from '@material-ui/core';
import { CardActionsWrapper } from './styles/UserComponents.style';


const UserCard = React.memo(({ id, name, createdAt, file }) => {
    const {estatesData: [estatesData]} = useContext(EstatesContext);
    const { userData } = useContext(UserContext);
    
    let estates = 0;
    estatesData.map( el => el.owner === id ? estates++ : null );

    const initials = name.charAt(0).toUpperCase();
    const avatar = file && file[0] 
        ?   <Avatar 
                src={`${process.env.REACT_APP_BACKEND_URL}${file[0]}`}
                alt={`${name.toUpperCase()}'s profile picture`} 
                imgProps={{ onError: (e) => { e.target.src = <DefaultAvatar /> } }} 
            />
        :   <Avatar aria-label="user">{initials}</Avatar>

    return (
        <Card>
            <CardHeader
                color="primary"
                avatar={ avatar }
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                subheader={`Joined: ${createdAt}`}
            />
            <CardActionsWrapper>
                { 
                    userData && userData.id === id
                        ?   <Button small="true" upc="true" shadow="true" as={Link} to={`/users/me/${id}`}>
                                view your posts
                            </Button>
                        :   estates > 0 
                                ?   <Button primary="true" shadow="true" small="true" upc="true" as={Link} to={`/users/${id}`}>
                                        View {estates} {estates === 1 ? 'post' : 'posts'}
                                    </Button>
                                :   <Button primary="true" small="true" upc="true" disabled={true}>
                                        View post
                                    </Button>
                }
            </CardActionsWrapper>
        </Card>
    )
});
 
export default UserCard;

UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    file: PropTypes.arrayOf(PropTypes.string).isRequired
}